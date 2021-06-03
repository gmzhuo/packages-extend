function dumpPPPOEConfig(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"vpn",
		function:"dumpPPPOEConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setPPPOEConfig(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"vpn",
		function:"setPPPOEConfig",
		parameter:{
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpPPTPConfig(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"vpn",
		function:"dumpPPTPConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setPPTPConfig(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"vpn",
		function:"setPPTPConfig",
		parameter:{
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpUser(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"vpn",
		function:"dumpUser",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addUser(section, options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"vpn",
		function:"addUser",
		parameter:{
			section:section,
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delUser(section, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"vpn",
		function:"delUser",
		parameter:{
			name:section,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}