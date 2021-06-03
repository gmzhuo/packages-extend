	var portmapList = new Object();
	portmapList.List = new Object();

	function commitPortmapSetup()
	{
		var portmapinfo = new Object();
		portmapinfo.section = $("#section").val();
		portmapinfo.options = {
			"name":$("#name").val(),
			"wanif":$("#wanif").val(),
			"status":$("#status").val(),
			"internetip":$("#internetip").val(),
			"internetportstart":$("#internetportstart").val(),
			"internetportend":$("#internetportend").val(),
			"proto":$("#proto").val(),
			"intranetip":$("#intranetip").val(),
			"intranetportstart":$("#intranetportstart").val(),
			"intranetportend":$("#intranetportend").val(),
		};
		function portmapSetupCB(json, context) {
			dumpPortmap(portmapDataCB, new Object());
		}
		setupPortmap(portmapinfo,  portmapSetupCB);
		return false;
	}

	var snatList = new Object();
	snatList.List = new Object();
	var result = {
		"portmaps":new Array(),
	};

	function update_portmap_table(result) {
		$("tr.portmap").remove();
		
		var itemtemp = $("#portmaps").html();
		console.log(Mustache.render(itemtemp, result));
    $("#portmaps").after(Mustache.render(itemtemp, result));

		$( 'a.section-edit' ).click(function( e ){
			var data = {
				"title":"编辑端口映射",
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
			data.section = sectionName;
			data.portinfo = portmapList.List[sectionName];
			addPortmap(data);
			return;
		});
		$( 'a.section-delete' ).click(function( e ){
			if(!confirm("确定要删除该规则吗")) {
				return;
			}
			var portmapinfo = new Object();
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			function portmapDeleteCB(json, context) {
				dumpPortmap(portmapDataCB, new Object());
			}
			portmapinfo.section = sectionName;
			var context = new Object();
			deletePortmap(portmapinfo, portmapDeleteCB, context)
			return;
		});
	}

	function get_interface_alias(portmap)
	{
		for(var key in ip_iface) {
			var iface = ip_iface[key];
			var key1 = "Device.IP.Interface." + key + ".";
			var key2 = "Device.IP.Interface.[" + iface.Alias + "].";
			if(portmap.Interface == key1 || portmap.Interface == key2) {
				return iface.Alias;
			}
		}
	}

	function port_mapping_cb(data, status, context) {
		result.portmaps.length = 0;
		portmapList.List = new Object();

		var portmaps = data.ParameterList["Device.NAT.PortMapping."];
		for(var key in portmaps) {
			var portmapinfo = {};
			var portmap = portmaps[key];
			portmapinfo.section = portmap.Alias;
			portmapinfo.proto = portmap.Protocol;
			portmapinfo.iface =get_interface_alias(portmap)
			portmapinfo.proto = portmap.Protocol;
			portmapinfo.internetportstart = portmap.ExternalPort;
			portmapinfo.internetportend = portmap.ExternalPortEndRange;
			portmapinfo.intranetip = portmap.InternalClient;
			portmapinfo.intranetportstart = portmap.InternalPort;
			portmapinfo.intranetportend = portmap.InternalPort;
			portmapList.List[portmap.Alias] = portmapinfo;
			result.portmaps.push(portmapinfo);
		}

		update_portmap_table(result)
	}

	function ip_interface_cb(data, status, context) {
		data = data.ParameterList["Device.IP.Interface."]
		ip_iface = data;
		ifacedomain.length = 0;
		for(var key in data) {
			ifacedomain.push({"value":"Device.IP.Interface." + key + ".", "text":data[key].Alias});
		}
		TR069_RPC("DumpObject", {ObjectName:"Device.NAT.PortMapping."}, port_mapping_cb);
	}

	function commitSNATSetup()
	{
		var portmapinfo = new Object();
		portmapinfo.section = $("#section").val();
		portmapinfo.options = {
			"status":$("#status").val(),
			"oipstart":$("#oipstart").val(),
			"oipend":$("#oipend").val(),
			"nipstart":$("#nipstart").val(),
			"nipend":$("#nipend").val(),
			"oif":$("#oif").val(),
			"nportstart":$("#nportstart").val(),
			"memo":$("#memo").val(),
		};
		function snatSetupCB(json, context) {
			dumpNATOut(snatDataCB, new Object());
		}
		setupNATOut(portmapinfo,  snatSetupCB);
		return false;
	}

	var ifacedomain1 = new Array();
	var ifacedomain2 = new Array();
	function ifacedatacb(json, context)
	{
		console.log(json);
		ifacedomain1.length = 0;
		ifacedomain2.length = 0;
		json.parameter.forEach(function(e) {
			if(e.type == "interface") {
				if(e.options && e.options.index 
					&& parseInt(e.options.index) > 0) {
					ifacedomain1.push({"value":e.options.index, "text":e.name});
					ifacedomain2.push({"value":e.options.index, "text":e.name});
				}
			}
		});
		ifacedomain1.push({"value":256, "text":"所有接口"});
		ifacedomain1.push({"value":255, "text":"所有WAN口"});
		ifacedomain2.push({"value":0, "text":"LAN口"});
		ifacedomain2.push({"value":256, "text":"所有接口"});
		ifacedomain2.push({"value":255, "text":"所有WAN口"});
	}

	function portmapDataCB(json, context) {
		$("tr.portmap").remove();

		var result = {
			"portmaps":new Array(),
		};

		portmapList.List = new Object();
		
		if(json)
		json.parameter.forEach(function(e) {
			if(e.type == "natpmp") {
				var portmapinfo = e.options;
				portmapinfo.section = e.name;

				portmapList.List[portmapinfo.section] = portmapinfo;
				result.portmaps.push(portmapinfo);
			}
		});
		var itemtemp = $("#portmaps").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#portmaps").after(Mustache.render(itemtemp, result));

		$( 'a.section-edit' ).click(function( e ){
			var data = {
				"title":"编辑端口映射",
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
			data.section = sectionName;
			data.portinfo = portmapList.List[sectionName];
			addPortmap(data);
			return;
		});
		$( 'a.section-delete' ).click(function( e ){
			if(!confirm("确定要删除该规则吗")) {
				return;
			}
			var portmapinfo = new Object();
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			function portmapDeleteCB(json, context) {
				dumpPortmap(portmapDataCB, new Object());
			}
			portmapinfo.section = sectionName;
			var context = new Object();
			deletePortmap(portmapinfo, portmapDeleteCB, context)
			return;
		});
	}

	function addPortmap(data)
	{
		var itemtemp = $("#portmapEdit").html();
		$("#dialog-portmapEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 450,
			modal: true,
			open:function(a, b) {
				var formdata = {
					"domains": {
						"wanif": ifacedomain1,
					},
				};
				if(data.section) {
					formdata.values = portmapList.List[data.section];
				}
				$("#portmap").forminit(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-portmapEdit").remove();
				},

				"确定": function() {
					commitPortmapSetup();
					$( this ).dialog( "close" );
					$("#dialog-portmapEdit").remove();
				}
     		}
		});
	}

	function addNATPMP()
	{
		var data = {
				"title":"添加端口映射",
			};
			addPortmap(data);
			return;
	}

	function snatDataCB(json, context) {
		$("tr.snat").remove();

		var result = {
			"snats":new Array(),
		};

		snatList.List = new Object();
		
		if(json)
		json.parameter.forEach(function(e) {
			if(e.type == "natout") {
				var snatinfo = e.options;
				snatinfo.section = e.name;
				if(snatinfo.oif == 0) {
					snatinfo.interface = "lan";
				} else if(snatinfo.oif == 256) {
					snatinfo.interface = "所有接口";
				} else if(snatinfo.oif == 255) {
					snatinfo.interface = "所有WAN口";
				} else {
					snatinfo.interface = "WAN" + snatinfo.oif;
				}

				snatList.List[snatinfo.section] = snatinfo;
				result.snats.push(snatinfo);
			}
		});
		var itemtemp = $("#snats").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#snats").after(Mustache.render(itemtemp, result));

		$( 'a.section-edit' ).click(function( e ){
			var data = {
				"title":"编辑源地址转换",
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
			data.section = sectionName;
			data.snatinfo = snatList.List[sectionName];
			addSNAT(data);
			return;
		});
		$( 'a.section-delete' ).click(function( e ){
			if(!confirm("确定要删除该规则吗")) {
				return;
			}
			var snatinfo = new Object();
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			function snatDeleteCB(json, context) {
				dumpNATOut(snatDataCB, new Object());
			}
			snatinfo.section = sectionName;
			var context = new Object();
			deleteNATOut(snatinfo, snatDeleteCB, context)
			return;
		});
	}

	function addSNAT(data)
	{
		var itemtemp = $("#snatEdit").html();
		$("#dialog-snatEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 450,
			modal: true,
			open:function(a, b) {
				var formdata = {
					"domains": {
						"oif": ifacedomain2,
					},
				};
				if(data.section) {
					formdata.values = snatList.List[data.section];
				}
				$("#snatEditForm").forminit(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-snatEdit").remove();
				},

				"确定": function() {
					commitSNATSetup();
					$( this ).dialog( "close" );
					$("#dialog-snatEdit").remove();
				}
     		}
		});
	}

	function addNATSNAT()
	{
		var data = {
				"title":"添加源地址转换",
			};
			addSNAT(data);
			return;
	}

$(function(){
	TR069_RPC("DumpObject", {ObjectName:"Device.IP.Interface."}, ip_interface_cb);
});

