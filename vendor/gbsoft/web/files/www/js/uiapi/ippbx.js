function dumpIPPBXConfig(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"dumpConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setIPPBXConfig(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"setConfig",
		parameter: {
			options:options
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpInnerLines(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"dumpInnerLines",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addInnerLine(section, options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"addInnerLine",
		parameter: {
			section:section,
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delInnerLine(section, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"delInnerLine",
		parameter: {
			name:section,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addOuterLine(section, options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"addOuterLine",
		parameter: {
			section:section,
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delOuterLine(section, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"delOuterLine",
		parameter: {
			name:section,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpOuterLines(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"dumpOuterLines",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addQueue(section, options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"addQueue",
		parameter: {
			section:section,
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delQueue(section, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"delQueue",
		parameter: {
			name:section,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpQueues(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ippbx",
		function:"dumpQueues",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}