
function certificate(password, files, cb, context)
{
	var uiapi = new uiCore();

	var request = {
		object:"ca",
		function:"certificate",
		parameter: {
			password:password,
		},
		session: getCookie("uiapiSession"),
	};

	var form = new FormData();
	for(var pos = 0; pos < files.length; ++pos) {
		form.append(files[pos].name, files[pos].file);
	}

	form.append("request", JSON.stringify(request));

	uiapi.multiPartRequest("/uiapi", form, cb);
}

function certificateLocal(info, info, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"ca",
		function:"certificateLocal",
		parameter: info,
	};

	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpCAInfo(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"ca",
		function:"dumpCAInfo",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function makeRootCA(info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"ca",
		function:"makeRootCA",
		parameter:info,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function makeKey(info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"ca",
		function:"makeKey",
		parameter:info,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function makeRequest(info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"ca",
		function:"makeRequest",
		parameter:info,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function importCert(pathname, files, cb, context)
{
	var uiapi = new uiCore();

	var request = {
		object:"ca",
		function:"importCert",
		parameter: {
			pathname:pathname,
		},
		session: getCookie("uiapiSession"),
	};

	var form = new FormData();
	for(var pos = 0; pos < files.length; ++pos) {
		form.append(files[pos].name, files[pos].file);
	}

	form.append("request", JSON.stringify(request));

	uiapi.multiPartRequest("/uiapi", form, cb);
}

