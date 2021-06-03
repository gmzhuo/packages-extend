function dumpApplication(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"dumpApplication",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function clearApplication(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"clearApplication",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function addApplication(cb, parameter, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"addApplication",
		parameter:parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delApplication(cb, parameter, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"delApplication",
		parameter:parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpSource(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"dumpSource",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function clearSource(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"clearSource",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function addSource(cb, parameter, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"addSource",
		parameter:parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delSource(cb, parameter, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"delSource",
		parameter:parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpStatic(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"dumpStatic",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function clearStatic(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"clearStatic",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function addStatic(cb, parameter, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"addStatic",
		parameter:parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delStatic(cb, parameter, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.route",
		function:"delStatic",
		parameter:parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

