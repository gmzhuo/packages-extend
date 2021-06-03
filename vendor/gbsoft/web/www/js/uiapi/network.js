function interfaceDump(cb, context, parameter)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dump",
		parameter:parameter
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function interfaceLiveDump(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"liveDump",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function interfaceLiveDump2(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"liveDump2",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wirelessDump(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dumpWireless",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wirelessLiveDump(radio, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dumpWirelessLive",
		parameter:{
			radio:radio,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setWireless(winfo, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"setWireless",
		parameter: winfo,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delWireless(ssid, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"delWireless",
		parameter: {
			iface: ssid,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpStation(iface, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dumpStation",
		parameter: {
			iface: iface,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setInterface(info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"setInterface",
		parameter: info,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpDHCP(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"dhcp",
		function:"dumpDHCP",
	};
	function dhcpCB(json, context)
	{
		var parameter = new Array();
		if(json.state == 0) {
			var sections = json.parameter;
			for(var i = 0; i < sections.length; i++) {
				var e = sections[i];
				if(e.type) {
					if(e.type == "dhcp") {
						if(!context.iface || e.options.interface == context.iface) {
							parameter.push(e);
						}
					}
					if(e.type == "pool") {
						if(!context.iface || e.options.interface == context.iface) {
							parameter.push(e);
						}
					}
					if(e.type == "host") {
						if(!context.iface || e.options.interface == context.iface) {
							parameter.push(e);
						}
					}
				}
			}
		}
		json.parameter = parameter;
		context.cb(json, context);
	}
	context.cb = cb;
	uiapi.jsonRPC("/uiapi", data, dhcpCB, context);
}

function setupDHCP(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"dhcp",
		function:"setupDHCP",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupDHCPStatic(option, cb, context)
{
	var uiapi = new uiCore();
	option.type = "host";
	var data = {
		object:"dhcp",
		function:"setupDHCP",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deleteDHCP(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"dhcp",
		function:"deleteDHCP",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}


function dumpDDNS(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ddns",
		function:"dumpDDNS",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupDDNS(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ddns",
		function:"setupDDNS",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deleteDDNS(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ddns",
		function:"delDDNS",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpPortmap(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"dumpPortmap",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupPortmap(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"setupPortmap",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deletePortmap(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"delPortmap",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpNATOut(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"dumpNATOut",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupNATOut(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"setupNATOut",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deleteNATOut(option, cb, context)
{
	var uiapi = new uiCore();
		var data = {
		object:"net.netfilter",
		function:"delNATOut",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpFirewallRule(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"dumpFirewallRule",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupFirewallRule(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"setupFirewallRule",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deleteFirewallRule(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"delFirewallRule",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}
