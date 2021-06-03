// JavaScript Document
	function ifacedata_submit(data){
		var alias = $("input[name='Alias']").val();
		TR069_RPC_COMPLETE("DumpObject", {ObjectName:"Device.PPP.Interface.[" + alias + "]."}).then(
			function(value) {
				var lowerlayers = $("input[name='LowerLayers']").val();

				var values = {};
				var ipifacepathname = "Device.IP.Interface.[" + alias + "].";
				var forwardpathname = "Device.Routing.Router.[Interface].IPv4Forwarding.[" + alias + "].";
				var pppifacepathname = "Device.PPP.Interface.[" + alias + "].";

				values[ipifacepathname + "Enable"] = $("input[name='Enable']:checked").val();
				values[ipifacepathname + "SpeedType"] = $("#SpeedType").val();
				values[ipifacepathname + "IPv4Address.1.IPAddress"] = $("input[name='IPAddress']").val();
				values[ipifacepathname + "IPv4Address.1.SubnetMask"] = $("input[name='SubnetMask']").val();
				values[ipifacepathname + "SpeedType"] = $("#SpeedType").val();
				if(options.speedtype == "A1M") {
					values[ipifacepathname + "Download"] = 1000;
					values[ipifacepathname + "Upload"] = 400;
				} else if(options.speedtype == "A2M") {
					values[ipifacepathname + "Download"] = 2000;
					values[ipifacepathname + "Upload"] = 400;
				} else if(options.speedtype == "A3M") {
					values[ipifacepathname + "Download"] = 3000;
					values[ipifacepathname + "Upload"] = 400;
				} else if(options.speedtype == "A3M") {
					values[ipifacepathname + "Download"] = 3000;
					values[ipifacepathname + "Upload"] = 400;
				} else if(options.speedtype == "A4M") {
					values[ipifacepathname + "Download"] = 3000;
					values[ipifacepathname + "Upload"] = 400;
				} else if(options.speedtype == "A6M") {
					values[ipifacepathname + "Download"] = 6000;
					values[ipifacepathname + "Upload"] = 400;
				} else if(options.speedtype == "A8M") {
					values[ipifacepathname + "Download"] = 8000;
					values[ipifacepathname + "Upload"] = 400;
				} else if(options.speedtype == "F4M") {
					values[ipifacepathname + "Download"] = 4000;
					values[ipifacepathname + "Upload"] = 3800;
				} else if(options.speedtype == "F6M") {
					values[ipifacepathname + "Download"] = 6000;
					values[ipifacepathname + "Upload"] = 5600;
				} else if(options.speedtype == "F8M") {
					values[ipifacepathname + "Download"] = 8000;
					values[ipifacepathname + "Upload"] = 7600;
				} else if(options.speedtype == "F10M") {
					values[ipifacepathname + "Download"] = 10000;
					values[ipifacepathname + "Upload"] = 9000;
				} else if(options.speedtype == "F15M") {
					values[ipifacepathname + "Download"] = 15000;
					values[ipifacepathname + "Upload"] = 13800;
				} else if(options.speedtype == "F20M") {
					values[ipifacepathname + "Download"] = 20000;
					values[ipifacepathname + "Upload"] = 18000;
				} else if(options.speedtype == "F30M") {
					values[ipifacepathname + "Download"] = 30000;
					values[ipifacepathname + "Upload"] = 28000;
				} else if(options.speedtype == "F50M") {
					values[ipifacepathname + "Download"] = 50000;
					values[ipifacepathname + "Upload"] = 47000;
				} else if(options.speedtype == "F100M") {
					values[ipifacepathname + "Download"] = 100000;
					values[ipifacepathname + "Upload"] = 95000;
				} else if(options.speedtype == "H20M") {
					values[ipifacepathname + "Download"] = 20000;
					values[ipifacepathname + "Upload"] = 1800;
				} else if(options.speedtype == "H50M") {
					values[ipifacepathname + "Download"] = 50000;
					values[ipifacepathname + "Upload"] = 4800;
				} else if(options.speedtype == "H60M") {
					values[ipifacepathname + "Download"] = 60000;
					values[ipifacepathname + "Upload"] = 5600;
				} else if(options.speedtype == "H80M") {
					values[ipifacepathname + "Download"] = 80000;
					values[ipifacepathname + "Upload"] = 7500;
				} else if(options.speedtype == "H100M") {
					values[ipifacepathname + "Download"] = 100000;
					values[ipifacepathname + "Upload"] = 9000;
				} else if(options.speedtype == "H200M") {
					values[ipifacepathname + "Download"] = 200000;
					values[ipifacepathname + "Upload"] = 18000;
				} else {
					values[ipifacepathname + "Download"] = $("input[name='Download']").val();
					values[ipifacepathname + "Upload"] = $("input[name='Upload']").val();
				}

				values[forwardpathname + "GatewayIPAddress"] = $("input[name='GatewayIPAddress']").val();

				if($("#proto").val() == "pppoe") {
					values[pppifacepathname + "Enable"] = "true";
					values[pppifacepathname + "Username"] = $("input[name='Username']").val();
					values[pppifacepathname + "Password"] = $("input[name='Password']").val();
					values[ipifacepathname + "LowerLayers"] = pppifacepathname;
				} else {
					values[pppifacepathname + "Enable"] = "false";
					values[ipifacepathname + "LowerLayers"] = lowerlayers;
					var dhcppathname = "Device.DHCPv4.Client.[" + alias + "].";

					if($("#proto").val() == "dhcp") {
						values[dhcppathname + "Enable"] = "true";
						values[dhcppathname + "Interface"] = ipifacepathname;
					} else {
						values[dhcppathname + "Enable"] = "false";
					}
				}

				var parameters = {
					ParameterList: values,
					SID: 2
				};

				TR069_RPC_COMPLETE("SetParameterValues", parameters).then(
					function(value) {
						return 0;
					}
				);
			}
		);
		return false;
	}
		
		


	function speedChange() {
		var x = $("#speedtype").val();
		if(x == "manul") {
			$(".form-item-speed").show();
		} else {
			$(".form-item-speed").hide();
		}
	}

	$("#speedtype").change(speedChange);
	$(".form-item-speed").hide();
	$(".form-item-pppoe").hide();
	$(".form-item-static").hide();
	$(".form-item-natvpn").hide();

	function protoChange() {
		var x = $("#proto").val();
		if(x == "pppoe") {
			$(".form-item-pppoe").show();
			$(".form-item-static").hide();
			$(".form-item-pptp").hide();
			$(".form-item-natvpn").hide();
		}
		if(x == "static") {
			$(".form-item-pppoe").hide();
			$(".form-item-static").show();
			$(".form-item-pptp").hide();
			$(".form-item-natvpn").hide();
		}
		if(x == "dhcp") {
			$(".form-item-pppoe").hide();
			$(".form-item-static").hide();
			$(".form-item-pptp").hide();
			$(".form-item-natvpn").hide();
		}
		if(x == "pptp") {
			$(".form-item-pppoe").show();
			$(".form-item-static").hide();
			$(".form-item-pptp").show();
			$(".form-item-natvpn").hide();
		}
		if(x == "natvpn") {
			$(".form-item-pppoe").hide();
			$(".form-item-static").hide();
			$(".form-item-pptp").hide();
			$(".form-item-natvpn").show();
		}
	}

	function advanceChange()
	{
		var x = $("input[name='advance']:checked").val();
		if(x == "1") {
			$(".form-item-advance").show();
		} else {
			$(".form-item-advance").hide();
		}
	}

	$("#proto").change(protoChange);
	$(".form-item-pppoe").hide();
	$(".form-item-static").hide();
	$(".form-item-pptp").hide();
	$(".form-item-advance").hide();

	
	var ifaceInfo = new Object();



	var ifaces = new Array();

	function ppp_interface_cb(data, status, context)
	{
		var alias = this;
		var interfaceInfo;
		for (var key in data.ParameterList) {
			interfaceInfo = data.ParameterList[key];
		}

		if(!interfaceInfo)
			return;

		var info = ifaceInfo[alias];

		info.values.username = interfaceInfo.Username;
		info.values.password = interfaceInfo.Username;
		info.values.LowerLayers = interfaceInfo.LowerLayers;
		$("#ifaceset").forminit2(info);
	}

	function dhcp_client_cb(data, status, context)
	{
		var alias = this;

		var values = ifaceInfo[alias];

		
	}

	function ifacedatacb(json, status, context)
	{
		console.log(json);
		ifaces.length = 0;
		var line = {
			"text": "宽带线路",
			"type": "line",
			"children": [],
		};
		ifaces.push(line);

		var vpn = {
			"text": "VPN",
			"type": "vpn",
			"children": [],
		};
		ifaces.push(vpn);

		var natvpn = {
			"text": "一键通",
			"type": "natvpn",
			"children": [],
		};

		var interfaceInfos = json.ParameterList["Device.IP.Interface."]
		for(var key in interfaceInfos) {
			var interfaceInfo = interfaceInfos[key];
			if(!interfaceInfo)
				continue;
			if (interfaceInfo.Alias.indexOf("wan") < 0) {
				continue;
			}
			var iface = {
				"text": interfaceInfo.Alias,
				"type": "iface",
				"icon" : "jstree-file",
			};
			line.children.push(iface);
			var values = {}

			TR069_RPC("DumpObject", {ObjectName:"Device.PPP.Interface.[" + interfaceInfo.Alias + "]."}, ppp_interface_cb, interfaceInfo.Alias);
			TR069_RPC("DumpObject", {ObjectName:"Device.DHCPv4.Client.[" + interfaceInfo.Alias + "]."}, dhcp_client_cb, interfaceInfo.Alias);

			if(interfaceInfo.IPv4Address && interfaceInfo.IPv4Address["1"]) {
				values.ipaddr = interfaceInfo.IPv4Address["1"].IPAddress
				values.netmask = interfaceInfo.IPv4Address["1"].SubnetMask
			}

			if(interfaceInfo.LowerLayers.indexOf("Device.PPP.Interface") >= 0) {
				values.proto = "pppoe"
			}
			ifaceInfo[interfaceInfo.Alias] = {
				"values": values,
			}
			
		}

		this.callback.call(this.tree, ifaces);
		updateForm("wan1");
	}

	function ifacedata(THIS, callback) {
		var context = {
			"callback": callback,
			"tree": THIS,
		};
		//wifidatacb(context, context);
		TR069_RPC("DumpObject", {ObjectName:"Device.IP.Interface.", Recurse:true}, ifacedatacb, context);
	}

	

	function updateForm(data) {
		console.log(data);
		var domainInfo = {
			domains: {
				proto: [
					{value:"static", text:"Static(静态IP)"},
					{value:"dhcp", text:"DHCP(动态IP)"},
					{value:"pppoe", text:"PPPOE(ADSL拨号)"},
				]
			}
		}

		if(ifaceInfo[data].values.proto == "pptp") {
			domainInfo.domains.proto = [{value:"pptp", text:"PPTP"},];
		}
		if(ifaceInfo[data].values.proto == "openvpn") {
			domainInfo.domains.proto = [{value:"openvpn", text:"OPENVPN"},];
		}
		if(ifaceInfo[data].values.proto == "natvpn") {
			domainInfo.domains.proto = [{value:"natvpn", text:"一键通"},];
		}
		$("#linename").text(ifaceInfo[data].values["iface"] + "配置");
		$("#ifaceset").forminit2(domainInfo);
		if(data)
			$("#ifaceset").forminit2(ifaceInfo[data]);
		speedChange();
		protoChange();
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
	$("#proto").change(protoChange);
	$("#speedtype").change(speedChange);
	$("input[name='advance']").change(advanceChange);
	advanceChange();
	
});
