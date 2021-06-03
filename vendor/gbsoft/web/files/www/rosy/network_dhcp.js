var dhcpPoolList = new Object();
dhcpPoolList.pool = new Object();

var dhcpHostList = new Object();
dhcpHostList.host = new Object();

var REG =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		

	function ipToInt(IP){
    	var xH = "",result = REG.exec(IP);
    	if(!result) return -1;
    	return (parseInt(result[1]) << 24 
        	| parseInt(result[2]) << 16
        	| parseInt(result[3]) << 8
        	| parseInt(result[4])) >>> 0;
	}

	function intToIp(INT){
    	return (INT>>>24) + "." + (INT>>16 & 0xFF) + "." + (INT>>8 & 0xFF) + "." + (INT & 0xFF);
	}

	function commitDhcpPoolSetup()
	{
		var dhcpinfo = new Object();
		dhcpinfo.iface = $("#sectionName").val();
		var startip = $("#startipaddr").val();
		var network = $("#network").val();
		var netmask = $("#netmask").val();
		var dnsmain = $("#dnsmain").val();
		var dnsbackup = $("#dnsbackup").val();
		dhcpinfo.options = {
			"start":  (ipToInt(startip) - ipToInt(network)),
			"limit": $("#limit").val(),
			"leasetime": $("#leasetime").val(),
			"name": $("#name").val(),
			"network": network,
			"netmask": netmask,
			"router": [$("#gateway").val()],
			"interface": "lan",
		};
		dhcpinfo.options.dns = new Array();
		if(dnsmain) {
			dhcpinfo.options.dns.push(dnsmain);
		}
		if(dnsbackup) {
			dhcpinfo.options.dns.push(dnsbackup);
		}
		function dhcpSetupCB(json, context) {
			dumpDHCP(dhcpDataCB, new Object());
		}
		setupDHCP(dhcpinfo, dhcpSetupCB);
		return false;
	}

	function commitDhcpStaticSetup()
	{
		var dhcpinfo = new Object();
		dhcpinfo.iface = $("#section").val();
		dhcpinfo.options = {
			"devname": $("#devname").val(),
			"ipaddr": $("#ipaddr").val(),
			"macaddr": $("#macaddr").val(),
		};
		function dhcpSetupCB(json, context) {
			dumpDHCP(dhcpDataCB, new Object());
		}
		setupDHCPStatic(dhcpinfo, dhcpSetupCB);
		return false;
	}
		

	function dhcpDataCB(json, context) {
		$("tr.dhcppool").remove();
		$("tr.staticaddr").remove();

		var result = {
			"dhcppools":new Array(),
			"staticaddrs":new Array(),
		};

		dhcpPoolList.pool = new Object();
		dhcpHostList.host = new Object();
		
		for(var j = 0; j < json.parameter.length; ++j) {
			var e = json.parameter[j];
			if(e.type == "pool") {
				var poolinfo = {
					"section":e.name,
					"name":e.options.name,
					"network":e.options.network,
					"netmask":e.options.netmask,
					"startipaddr":intToIp(parseInt(e.options.start) + ipToInt(e.options.network)),
					"limit":e.options.limit || "100",
					"leasetime":e.options.leasetime || "12h",
					"gateway":(e.options.router && e.options.router[0])?e.options.router[0]:"",
				};

				if(e.options.dns) {
					poolinfo.dnsmain = e.options.dns[0];
					poolinfo.dnsbackup = e.options.dns[1];
				}

				dhcpPoolList.pool[poolinfo.section] = poolinfo;
				result.dhcppools.push(poolinfo);
			} else if(e.type == "host") {
				var hostinfo = {
					"section":e.name,
					"devname":e.options.devname,
					"ipaddr":e.options.ipaddr,
					"macaddr":e.options.macaddr,
				};

				dhcpHostList.host[hostinfo.section] = hostinfo;
				result.staticaddrs.push(hostinfo);
			}
		}
		var itemtemp = $("#dhcppools").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#dhcppools").after(Mustache.render(itemtemp, result));

		var itemtemp = $("#staticaddrs").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#staticaddrs").after(Mustache.render(itemtemp, result));
		$( 'a.pool-section-edit' ).click(function( e ){
			var data = {
				"title":"编辑扩展地址池",
			};
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			data.sectionName = sectionName;
			data.poolinfo = dhcpPoolList.pool[sectionName];
			data.poolinfo.sectionName = sectionName;
			setupDHCPPool(data);
			return;
		});
		$( 'a.pool-section-delete' ).click(function( e ){
			if(!confirm("确定要删除该条地址池吗")) {
				return;
			}
			var dhcpinfo = new Object();
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			function dhcpDeleteCB(json, context) {
				dumpDHCP(dhcpDataCB, new Object());
			}
			dhcpinfo.iface = sectionName;
			deleteDHCP(dhcpinfo, dhcpDeleteCB, context)
			return;
		});
		$( 'a.static-section-edit' ).click(function( e ){
			var data = {
				"title":"编辑静态地址",
			};
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			data.sectionName = sectionName;
			data.staticinfo = dhcpHostList.host[sectionName];
			data.staticinfo.section = sectionName;
			editDHCPStatic(data);
			return;
		});
		$( 'a.static-section-delete' ).click(function( e ){
			if(!confirm("确定要删除该条静态地址吗")) {
				return;
			}
			var dhcpinfo = new Object();
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			function dhcpDeleteCB(json, context) {
				dumpDHCP(dhcpDataCB, new Object());
			}
			dhcpinfo.iface = sectionName;
			deleteDHCP(dhcpinfo, dhcpDeleteCB, context)
			return;
		});
	}
	function staticAddrDataCB(json, context) {
		$("div").remove(".staticaddr");
    var itemtemp = $("#staticaddrs").html();

		var result = {
			"pools":new Array(),
		};

		console.log(Mustache.render(itemtemp, result));
    $("#staticaddrs").after(Mustache.render(itemtemp, result));
	}


	function setupDHCPPool(data){
		
		var itemtemp = $("#dhcpPoolEdit").html();
		$("#dialog-dhcpPoolEdit").remove();
		$("#dialog-dhcpStaticEdit").remove();

		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);

		$(itemtemp).dialog({
			resizable: false,
			width: 420,
			modal: true,
			open:function(a, b) {
				var formdata = {
				};
				formdata.values = data.poolinfo;
				$("#dhcppoolForm").forminit(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-dhcpPoolEdit").remove();
				},

				"确定": function() {
					commitDhcpPoolSetup();
					$( this ).dialog( "close" );
					$("#dialog-dhcpPoolEdit").remove();
				}
     	}
		});

	}

	function editDHCPStatic(data){
		var itemtemp = $("#dhcpStaticEdit").html();
		$("#dialog-dhcpPoolEdit").remove();
		$("#dialog-dhcpStaticEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 420,
			modal: true,
			open:function(a, b) {
				var formdata = {
				};
				formdata.values = data.staticinfo;
				$("#dhcpstaticForm").forminit(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-dhcpStaticEdit").remove();
				},

				"确定": function() {
					commitDhcpStaticSetup();
					$( this ).dialog( "close" );
					$("#dialog-dhcpStaticEdit").remove();
				}
     		}
		});
	}

	function addDHCPSpool(){
		var data = {
			"title":"添加扩展地址池",
		};
		setupDHCPPool(data);
		return;
	}

	function addDHCPStatic(){
		var data = {
			"title":"添加静态IP分配",
		};
		editDHCPStatic(data);
	}


$(function(){
	dumpDHCP(dhcpDataCB, new Object());
});

