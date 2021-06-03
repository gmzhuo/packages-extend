function dumpDeviceInfo(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"dumpDeviceInfo",
		parameter:null
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpCurrentSysinfo(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"dumpCurrentSysinfo",
		parameter:null
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpSysinfo(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"dumpSysinfo",
		parameter:null
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function throughputDump(parameter, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"throughputDump",
		parameter:parameter
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function conntrackInfoDump(parameter, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"hostinfo",
		function:"dumpConntrackInfo",
		parameter:parameter
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function hostInfoDump(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"hostinfo",
		function:"dumpHostInfo",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

