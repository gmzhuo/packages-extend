function dumpWebPortal(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpWebPortal",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setWebPortal(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setWebPortal",
		parameter:{
			options:options
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpWifiDog(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpWifiDog",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setWifiDog(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setWifiDog",
		parameter:{
			options:options
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpWeixin(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpWeixin",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setWeixin(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setWeixin",
		parameter:{
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpSMS(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpSMS",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setSMS(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setSMS",
		parameter:{
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpNoauth(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpNoauth",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setNoauth(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setNoauth",
		parameter:{
			options:options
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addWhiteMACAddr(macaddr, memo, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"addWhiteMACAddr",
		parameter:{
			macaddr:macaddr,
			memo:memo,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delWhiteMACAddr(macaddr, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"delWhiteMACAddr",
		parameter:{
			macaddr:macaddr
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpWhiteMACAddr(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpWhiteMACAddr",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpWebadv(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpWebadv",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setWebadv(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setWebadv",
		parameter: {
			options:options,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function requestWeixinSign(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"requestWeixinSign",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function weixinAuthBackround(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"weixinAuthBackround",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function webCheck(parameter, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"webCheck",
		parameter: parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setPluginConfig(parameter, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setPluginConfig",
		parameter : {
			options:parameter,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function getPluginConfig(parameter, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"getPluginConfig",
		parameter: parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function showPluginInfo(parameter, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"showPluginInfo",
		parameter: parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function forwardPluginURL(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"forwardPluginURL",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}
