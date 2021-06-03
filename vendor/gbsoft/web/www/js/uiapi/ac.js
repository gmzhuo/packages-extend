function acDump(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"dump",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function acDumpJsonConfig(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"dumpJsonConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wtpDump(start, groupname, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"liveDump",
		parameter:{
			start:start,
			group:groupname,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function historyDump(start, groupname, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"historyDump",
		parameter:{
			start:start,
			group:groupname,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function stationDump(start, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"stationDump",
		parameter:{
			start:start,
			limit:50,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function stationDelete(station, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"stationDelete",
		parameter:{
			station:station,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupACConfig(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"setConfig",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupGroup(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"setGroup",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function groupRemove(group, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"deleteGroup",
		parameter:group,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setupRadio(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"setRadio",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function radioRemove(radio, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"deleteRadio",
		parameter:radio,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setupWLan(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"setWLan",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wlanRemove(wlan, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"deleteWLan",
		parameter:wlan,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setupWTP(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"setWTP",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wtpRemove(wtp, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"deleteWTP",
		parameter:wtp,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addFirmware(param, files, cb)
{
	var uiapi = new uiCore();
	
	var request = {
		object:"net.ac",
		function:"addFirmware",
		parameter: param,
		session: getCookie("uiapiSession"),
	};

	var form = new FormData();
	for(var pos = 0; pos < files.length; ++pos) {
		form.append(files[pos].name, files[pos].file);
	}
	form.append("request", JSON.stringify(request));

	uiapi.multiPartRequest("/uiapi", form, cb);
}


function delFirmware(index, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"deleteFirmware",
		parameter:{
			index:index,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpFirmware(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"firmwareDump",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setWTPAddrs(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"setWTPAddrs",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wtpChannelAutoAdjust(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"wtpChannelAutoAdjust",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delHistory(serial, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"delHistory",
		parameter:{
			serial:serial,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

