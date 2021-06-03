function wtpDumpState(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"wtp",
		function:"dumpState",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function wtpConfig(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"wtp",
		function:"setConfig",
		parameter:{
			options:options
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function wtpDumpConfig(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"wtp",
		function:"dumpConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function wtpDumpStation(radioID, wlanID, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"wtp",
		function:"dumpStation",
		parameter: {
			radioID:radioID,
			wlanID:wlanID,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function wtpDeleteStation(radioID, wlanID, macaddr, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"wtp",
		function:"deleteStation",
		parameter: {
			radioID:radioID,
			wlanID:wlanID,
			macaddr:macaddr,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

