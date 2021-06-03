var interface = "";
var ifaceInfo = new Object();

function ifacedata_submit(data){
		var values = {};
		var alias = $("input[name='Alias']").val();
		var ipifacepathname = "Device.IP.Interface.[" + alias + "].";
		var dhcppathname = "Device.DHCPv4.Client.[" + alias + "].";
		var forwardpathname = "Device.Routing.Router.[Interface].IPv4Forwarding.[" + alias + "].";

		values[dhcppathname + "MACAddress"] = $("input[name='MACAddress']").val();
		values[dhcppathname + "MaxMTUSize"] = $("input[name='MaxMTUSize']").val();
		values[forwardpathname + "GatewayIPAddress"] = $("input[name='GatewayIPAddress']").val();

		if($("#proto").val() == "static") {
			values[dhcppathname + "Enable"] = "false";
			values[dhcppathname + "Interface"] = ipifacepathname;

			values[ipifacepathname + "IPv4Address.1.IPAddress"] = $("input[name='IPAddress']").val();
			values[ipifacepathname + "IPv4Address.1.Netmask"] = $("input[name='Netmask']").val();
		} else if($("#proto").val() == "dhcp") {
			values[dhcppathname + "Enable"] = "true";
			values[dhcppathname + "Interface"] = ipifacepathname;
		}

		var parameters = {
			ParameterList: values,
			SID: 2
		};

		TR069_RPC_COMPLETE("SetParameterValues", parameters).then(
			function(value) {
				alert("配置保存成功");
				$('#ifacetree').jstree("destroy");
				loadInterfaceTree();
			}
		);

		if($("input[name='dns1']").val().length > 0) {
			var objname = "Device.DNS.Client.Server.[" + alias + "-" + "dns1].";
			TR069_RPC_COMPLETE("AddObject", {"ObjectName":objname}).then(
				function(value) {
					return TR069_RPC_COMPLETE("SetParameterValues", {
								ParameterList:{
									["Device.DNS.Client.Server.[" + alias + "-" + "dns1]."]:$("input[name='dns1']").val()
								},
								SID: 2
								});
				}).then(function (value) {
					
				});
		}

		if($("input[name='dns2']").val().length > 0) {
			var objname = "Device.DNS.Client.Server.[" + alias + "-" + "dns2].";
			TR069_RPC_COMPLETE("AddObject", {"ObjectName":objname}).then(
				function(value) {
					return TR069_RPC_COMPLETE("SetParameterValues", {
								ParameterList:{
									["Device.DNS.Client.Server.[" + alias + "-" + "dns2]."]:$("input[name='dns2']").val()
								},
								SID: 2
								});
				}).then(function (value) {
					
				});
		}

		return false;
	}

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

	function dhcpdata_submit(data){
		var values = {};
		var dhcppathname = "Device.DHCPv4.Server.Pool.[lan].";
		values[dhcppathname + "Enable"] = $("#ifacedhcp input[name='Enable']:checked").val();
		values[dhcppathname + "MinAddress"] = $("#ifacedhcp #MinAddress").val();
		values[dhcppathname + "MaxAddress"] = $("#ifacedhcp #MaxAddress").val();
		values[dhcppathname + "LeaseTime"] = $("#ifacedhcp #LeaseTime").val();
		values[dhcppathname + "IllegalKiller"] = $("#ifacedhcp input[name='illegalKiller']:checked").val();
		
		var parameters = {
			ParameterList: values,
			SID: 2
		};

		TR069_RPC_COMPLETE("SetParameterValues", parameters).then(
			function(value) {
				alert("配置保存成功");
				$('#ifacetree').jstree("destroy");
				loadInterfaceTree();
			}
		);
		return false;
	}

	var ifaces = new Array();
	function ifacedatacb(json, status, context)
	{
		console.log(json);
		console.log($(this));
		ifaces.length = 0;
		var line = {
			"text": "内网线路",
			"type": "line",
			"children": [],
		};
		ifaces.push(line);

		var interfaceInfos = json.ParameterList["Device.IP.Interface."]
		for(var key in interfaceInfos) {
			var interfaceInfo = interfaceInfos[key];
			if(!interfaceInfo)
				continue;
			if (interfaceInfo.Alias.indexOf("lan") < 0 && interfaceInfo.Alias.indexOf("guest") < 0) {
				continue;
			}
			var iface = {
				"text": interfaceInfo.Alias,
				"type": "iface",
				"icon" : "jstree-file",
			};
			line.children.push(iface);
			var values = {}

			values.IPAddress = interfaceInfo.IPv4Address["1"].IPAddress
			values.SubnetMask = interfaceInfo.IPv4Address["1"].SubnetMask
			ifaceInfo[interfaceInfo.Alias] = {
				"values": values,
			}
			
		}
		this.callback.call(this.tree, ifaces);
		updateForm("lan");
	}

	function ifacedata(THIS, callback) {
		var context = {
			"callback": callback,
			"tree": THIS,
		};
		//wifidatacb(context, context);

		TR069_RPC("DumpObject", {ObjectName:"Device.IP.Interface."}, ifacedatacb, context);
		//interfaceDump(ifacedatacb, context, new Object());
	}

	function updateForm(data) {
		console.log(data);
		$("#linename").text(data + "配置");
		if(data) {
			interface = data;
			$("#ifaceset").forminit2(ifaceInfo[data]);
			var dnsp = TR069_RPC_COMPLETE("DumpObject", {ObjectName:"Device.DNS.Client.Server."});
			var poolp = TR069_RPC_COMPLETE("DumpObject", {ObjectName:"Device.DHCPv4.Server.Pool.[" + data + "]."});
			
			Promise.all([dnsp, poolp]).then(function(values) {
  			var dnss = values[0].ParameterList["Device.DNS.Client.Server."];
  			var poolp = values[1].ParameterList["Device.DHCPv4.Server.Pool.[" + data + "]."];
  			var info = {
  				values:{}
  			};
  			for(var k in dnss) {
  				var dns = dnss[k];
  				if(dns.Alias.indexOf(data) > 0) {
  					info.values[dns.Alias.substr(data.length + 1, dns.Alias.length - data.length - 1)] = dns.DNSServer;
  				}
  			}
  			$("#ifaceset").forminit2(info);

				info.values = poolp;
				$("#ifacedhcp").forminit2(info);
			});
		}
		return;
		
	}


	function loadInterfaceTree() {
		$('#ifacetree').jstree({
			"plugins" : [
				"contextmenu","types"
			],
			"types" : {
			"#" : {
				"max_children" : 1, 
				"max_depth" : 4, 
				"valid_children" : ["root"]
			},
			"default": {
			},
			"radio" : {
			},
			"ssid" : {
			}
		},
		'core' : {
			'data' : function(obj, callback) {
				//wifidata(this, callback);
				ifacedata(this, callback);
			}
		}
	});
	$('#ifacetree').on("select_node.jstree", function (e, data) {
			$("#ifacetree").jstree().get_container();
			console.log(data);
			if(data.node.original.type == "iface") {
				updateForm(data.node.text);
			}
			$("#ifacetree").jstree().open_node(data.node);
		});
	}

$(function(){
	loadInterfaceTree();
});
