
function dumpRadiusInfo(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"radius",
		function:"dumpRadiusInfo",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupRadius(info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"radius",
		function:"setupRadius",
		parameter:{
			options:info,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function updateRadiusUser(section, info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"radius",
		function:"updateRadiusUser",
		parameter:{
			section:section,
			options:info,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deleteRadiusUser(section, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"radius",
		function:"deleteRadiusUser",
		parameter:{
			section:section,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpRadiusUser(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"radius",
		function:"dumpRadiusUser",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}
