function upgradePrepare(param, files, cb)
{
	var uiapi = new uiCore();
	
	var request = {
		object:"global",
		function:"upgradePrepare",
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

function upgradeExecute(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"upgradeExecute",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function upgradePos(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"getUpgradePos",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function configRestore(param, files, cb)
{
	var uiapi = new uiCore();
	
	var request = {
		object:"global",
		function:"configRestore",
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

function configClear(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"configClear",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function configBackup(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"configBackup",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function hostPing(host, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"ping",
		parameter:{
			host:host,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function showLog(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"showLog",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function uiUpdate(param, files, cb)
{
	var uiapi = new uiCore();

	var request = {
		object:"global",
		function:"uiUpdate",
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

function uiBackup(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"uiBackup",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function uiClear(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"uiClear",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function rebootSystem(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"reboot",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}
