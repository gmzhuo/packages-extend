function dumpQosConfig(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"dumpQoSConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpQosInterface(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"dumpQoSInterface",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupQosConfig(options, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"setQoSConfig",
		parameter: {
			options: options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupQosInterface(iface, options, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"setQoSInterface",
		parameter:{
			iface:iface,
			options:options,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setQoSHost(host, options, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"setQoSHost",
		parameter:{
			options:options,
			section:host,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delQoSHost(host, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"delQoSHost",
		parameter:{
			section:host,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpQoSHost(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"dumpQoSHost",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpAppQos(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"dumpAppQos",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupAppQos(name, options, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"setupAppQos",
		parameter: {
			name:name,
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delAppQos(name, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"delAppQos",
		parameter:{
			name:name,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}
