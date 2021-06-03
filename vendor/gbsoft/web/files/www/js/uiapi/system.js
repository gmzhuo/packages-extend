function dumpSystemConfig(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"system",
		function:"dump",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpSystemTime(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"system",
		function:"dumpSysTime",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupSystemConfig(mainOptions, timeOptions, rebootOptions, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"system",
		function:"setConfig",
		parameter:{
			mainOptions:mainOptions,
			timeOptions:timeOptions,
			rebootOptions:rebootOptions,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}
