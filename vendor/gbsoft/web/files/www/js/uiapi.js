/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function( $ ) {

	var o = $( {} );

	$.sub = function() {
		o.on.apply( o, arguments );
	};

	$.unsub = function() {
		o.off.apply( o, arguments );
	};

	$.pub = function() {
		o.trigger.apply( o, arguments );
	};

}( jQuery ));



uiCore = function()
{
	this.reinit = function()
	{
		if( window.XMLHttpRequest ) {
			this._xmlHttp = new XMLHttpRequest();
		}
		else if( window.ActiveXObject ) {
			this._xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		else {
			alert("uiapi.js: XMLHttpRequest is not supported by this browser!");
		}
	}

	this.busy = function() {
		switch( this._xmlHttp.readyState )
		{
			case 1:
			case 2:
			case 3:
				return true;

			default:
				return false;
		}
	}

	this.abort = function() {
		if( this.busy() )
			this._xmlHttp.abort();
	}

	this.get = function(url,data,callback)
	{
		this.reinit();

		var uiapi  = this._xmlHttp;
		var code = this._encode( data );

		url = location.protocol + '//' + location.host + url;

		if( code )
			if( url.substr(url.length-1,1) == '&' )
				url += code;
			else
				url += '?' + code;

		uiapi.open( 'GET', url, true );

		uiapi.onreadystatechange = function()
		{
			if( uiapi.readyState == 4 ) {
				var json = null;
				if( uiapi.getResponseHeader("Content-Type") == "application/json" ) {
					try {
						json = eval('(' + uiapi.responseText + ')');
					}
					catch(e) {
						json = null;
					}
				}

				callback( uiapi, json );
			}
		}

		uiapi.send( null );
	}

	this.gets = function(url,data,callback)
	{
		this.reinit();

		var uiapi  = this._xmlHttp;
		var code = this._encode( data );

		url = location.protocol + '//' + location.host + url;

		if( code )
			if( url.substr(url.length-1,1) == '&' )
				url += code;
			else
				url += '?' + code;

		uiapi.open( 'GET', url, false );

		uiapi.onreadystatechange = function()
		{
			if( uiapi.readyState == 4 ) {
				var json = null;
				if( uiapi.getResponseHeader("Content-Type") == "application/json" ) {
					try {
						json = eval('(' + uiapi.responseText + ')');
					}
					catch(e) {
						json = null;
					}
				}

				callback( uiapi, json );
			}
		}

		uiapi.send( null );
	}

	this.post = function(url,data,callback)
	{
		this.reinit();

		var uiapi  = this._xmlHttp;
		var code = this._encode( data );

		uiapi.onreadystatechange = function()
		{
			if( uiapi.readyState == 4 )
				callback( uiapi );
		}

		uiapi.open( 'POST', url, true );
		uiapi.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
		uiapi.setRequestHeader( 'Content-length', code.length );
		uiapi.setRequestHeader( 'Connection', 'close' );
		uiapi.send( code );
	}

	this.jsonRPC = function(url,data,callback,context)
	{
		this.reinit();

		var uiapi  = this._xmlHttp;
		data.session = getCookie("uiapiSession");
		jsonData = JSON.stringify(data);

		uiapi.onreadystatechange = function()
		{
			if( uiapi.readyState == 4 ) {
				var json = null;
				if( uiapi.getResponseHeader("Content-Type") == "application/json" ) {
					try {
						json = eval('(' + uiapi.responseText + ')');
					}
					catch(e) {
						json = null;
					}
				}

				if(json.state == -4) {
					onSystemNeedLogin();
					return;
				}
				callback( json, context );
			}
		}

		uiapi.open( 'POST', url, true);
		uiapi.setRequestHeader( 'Content-type', 'application/json' );
		uiapi.setRequestHeader( 'Content-length', jsonData.length );
		uiapi.setRequestHeader( 'Connection', 'close' );
		uiapi.send(jsonData);
	}

	this.multiPartRequest = function(url,data,callback,context)
	{
		this.reinit();

		var uiapi  = this._xmlHttp;

		uiapi.onreadystatechange = function()
		{
			if( uiapi.readyState == 4 ) {
				var json = null;
				if( uiapi.getResponseHeader("Content-Type") == "application/json" ) {
					try {
						json = eval('(' + uiapi.responseText + ')');
					}
					catch(e) {
						json = null;
					}
				}

				callback( json, context );
			}
		}

		uiapi.open( 'POST', url, true);
		uiapi.send(data);
	}

	this.jsonRPCSync = function(url,data,callback,context)
	{
		this.reinit();

		var uiapi  = this._xmlHttp;
		jsonData = JSON.stringify(data);
		data.session = getCookie("uiapiSession");

		uiapi.onreadystatechange = function()
		{
			if( uiapi.readyState == 4 ) {
				var json = null;
				if( uiapi.getResponseHeader("Content-Type") == "application/json" ) {
					try {
						json = eval('(' + uiapi.responseText + ')');
					}
					catch(e) {
						json = null;
					}
				}

				callback( json, context );
			}
		}

		uiapi.open( 'POST', url, false);
		uiapi.setRequestHeader( 'Content-type', 'application/json' );
		uiapi.setRequestHeader( 'Content-length', jsonData.length );
		uiapi.setRequestHeader( 'Connection', 'close' );
		uiapi.send(jsonData);
	}

	this.cancel = function()
	{
		this._xmlHttp.onreadystatechange = function(){};
		this._xmlHttp.abort();
	}

	this.send_form = function(form,callback,extra_values)
	{
		var code = '';

		for( var i = 0; i < form.elements.length; i++ )
		{
			var e = form.elements[i];

			if( e.options )
			{
				code += ( code ? '&' : '' ) +
					form.elements[i].name + '=' + encodeURIComponent(
						e.options[e.selectedIndex].value
					);
			}
			else if( e.length )
			{
				for( var j = 0; j < e.length; j++ )
					if( e[j].name ) {
						code += ( code ? '&' : '' ) +
							e[j].name + '=' + encodeURIComponent( e[j].value );
					}
			}
			else
			{
				code += ( code ? '&' : '' ) +
					e.name + '=' + encodeURIComponent( e.value );
			}
		}

		if( typeof extra_values == 'object' )
			for( var key in extra_values )
				code += ( code ? '&' : '' ) +
					key + '=' + encodeURIComponent( extra_values[key] );

		return(
			( form.method == 'get' )
				? this.get( form.getAttribute('action'), code, callback )
				: this.post( form.getAttribute('action'), code, callback )
		);
	}

	this._encode = function(obj)
	{
		obj = obj ? obj : { };
		obj['_'] = Math.random();

		if( typeof obj == 'object' )
		{
			var code = '';
			var self = this;

			for( var k in obj )
				code += ( code ? '&' : '' ) +
					k + '=' + encodeURIComponent( obj[k] );

			return code;
		}

		return obj;
	}
}

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

function interfaceDump(cb, context, parameter)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dump",
		parameter:parameter
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function interfaceLiveDump(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"liveDump",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function interfaceLiveDump2(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"liveDump2",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wirelessDump(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dumpWireless",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function wirelessLiveDump(radio, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dumpWirelessLive",
		parameter:{
			radio:radio,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setWireless(winfo, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"setWireless",
		parameter: winfo,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function delWireless(ssid, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"delWireless",
		parameter: {
			iface: ssid,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpStation(iface, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"dumpStation",
		parameter: {
			iface: iface,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setInterface(info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.interface",
		function:"setInterface",
		parameter: info,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function addCookie(name,value,expireHours){ 
      var cookieString=name+"="+escape(value); 
      //判断是否设置过期时间 
      if(expireHours>0){ 
             var date=new Date(); 
             date.setTime(date.getTime+expireHours*3600*1000); 
             cookieString=cookieString+"; expire="+date.toGMTString(); 
      } 
      document.cookie=cookieString; 
}

function getCookie(name){
      var strCookie=document.cookie;
      var arrCookie=strCookie.split("; ");
      for(var i=0;i<arrCookie.length;i++){
            var arr=arrCookie[i].split("=");
            if(arr[0]==name)return arr[1];
      }
      return "";
}

function deleteCookie(name){
       var date=new Date();
       date.setTime(date.getTime()-10000);
       document.cookie=name+"=v; expire="+date.toGMTString();
}

function changePWD(info, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"loginer",
		function:"changePassword",
		parameter: info,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function login(user, password, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"loginer",
		function:"login",
		parameter: {
			user:user,
			password:password,
		},
	};

	var localContext = {
		cb:cb,
		context:context
	};

	function localCallback(json, context) {
		if(json.state == 0) {
			addCookie("uiapiSession", json.session, 0);
		}
		context.cb(json, context.context);
	}
	uiapi.jsonRPC("/uiapi", data, localCallback, localContext);
}

function logout(cb, context)
{
	deleteCookie("uiapiSession")
	cb(context);
}

function loginStatus(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"loginer",
		function:"status",
		parameter: {
			sid:getCookie("uiapiSession"),
		},
	};

	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpDHCP(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"dhcp",
		function:"dumpDHCP",
	};
	function dhcpCB(json, context)
	{
		var parameter = new Array();
		if(json.state == 0) {
			var sections = json.parameter;
			for(var i = 0; i < sections.length; i++) {
				var e = sections[i];
				if(e.type) {
					if(e.type == "dhcp") {
						if(!context.iface || e.options.interface == context.iface) {
							parameter.push(e);
						}
					}
					if(e.type == "pool") {
						if(!context.iface || e.options.interface == context.iface) {
							parameter.push(e);
						}
					}
					if(e.type == "host") {
						if(!context.iface || e.options.interface == context.iface) {
							parameter.push(e);
						}
					}
				}
			}
		}
		json.parameter = parameter;
		context.cb(json, context);
	}
	context.cb = cb;
	uiapi.jsonRPC("/uiapi", data, dhcpCB, context);
}

function setupDHCP(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"dhcp",
		function:"setupDHCP",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupDHCPStatic(option, cb, context)
{
	var uiapi = new uiCore();
	option.type = "host";
	var data = {
		object:"dhcp",
		function:"setupDHCP",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deleteDHCP(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"dhcp",
		function:"deleteDHCP",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpQosConfig(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"dumpQoSConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpQosInterface(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"dumpQoSInterface",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupQosConfig(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"setQoSConfig",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupQosInterface(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.smartqos",
		function:"setQoSInterface",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpDDNS(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ddns",
		function:"dumpDDNS",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupDDNS(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ddns",
		function:"setupDDNS",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deleteDDNS(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ddns",
		function:"delDDNS",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function dumpPortmap(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"dumpPortmap",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function setupPortmap(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"setupPortmap",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function deletePortmap(option, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.netfilter",
		function:"delPortmap",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function acDump(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"dump",
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

function stationDump(radio, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"stationDump",
		parameter:{
			radio:radio,
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
		parameter:{
			section:group,
		},
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
		parameter:{
			section:radio,
		},
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
		parameter:{
			section:wlan,
		},
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
		parameter:{
			section:wtp,
		},
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

function configBackup(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"global",
		function:"configBackup",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delFirmware(imageID, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"net.ac",
		function:"deleteFirmware",
		parameter:{
			imageID:imageID,
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

function dumpWebPortal(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpWebPortal",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setWebPortal(option, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setWebPortal",
		parameter:option,
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

function setWeixin(option, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setWeixin",
		parameter:option,
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

function setSMS(option, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setSMS",
		parameter:option,
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

function setNoauth(option, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setNoauth",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpNoauth(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"dumpWebadv",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setNoauth(option, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"webportal",
		function:"setWebadv",
		parameter:option,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

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

function createCpuChart(parameter)
{
	return new Highcharts.Chart({
			chart: {
				renderTo: parameter.container,
				height: parameter.height,
				width: parameter.width,
				type: 'spline',
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			xAxis: {
				type: 'datetime',
			},
			yAxis: {
				title: {
					text: 'CPU负荷 (%)'
				},
				min: 0,
				max: 100,
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%d %H:%M:%S', this.x) +': '+ this.y +' %';
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: '1分钟平均',
				data: [
					
				]
				}, {
				name: '5分钟平均',
				data: [
					
				]
				}]
		});
}


function createMemChart(parameter)
{
	return new Highcharts.Chart({
			chart: {
				renderTo: parameter.container,
				height: parameter.height,
				width: parameter.width,
				type: 'spline',
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			xAxis: {
				type: 'datetime',
			},
			yAxis: {
				floor: 0,
				ceiling: 100,
				title: {
					text: '内存空闲 (%)'
				},
				min: 0,
				max: 100,
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%d %H:%M:%S', this.x) +': '+ Highcharts.numberFormat(this.y, 2) +' %';
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: '内存空闲',
				data: [
					
				]
				}, {
				name: '缓存空闲',
				data: [
					
				]
				}]
		});
}

function createThroughputChart(parameter)
{
	function bandwidth_label(bytes, br)
	{
		var uby = 'KByte';
		var kby = (bytes / 1024);

		if (kby >= 1024)
		{
			uby = 'MByte';
			kby = kby / 1024;
		}

		var ubi = 'KBit';
		var kbi = (bytes * 8 / 1024);

		if (kbi >= 1024)
		{
			ubi = 'MBit';
			kbi = kbi / 1024;
		}

		return Highcharts.numberFormat(kby, 2) + " " + uby + "/s";
	}

	return new Highcharts.Chart({
			chart: {
				renderTo: parameter.container,
				height: parameter.height,
				width: parameter.width,
				type: 'spline',
			},
			title: {
				text: null
			},
			subtitle: {
				text: null
			},
			xAxis: {
				type: 'datetime',
			},
			yAxis: {
				title: {
					text: '网络流量 (KB)'
				},
				min: 0
			},
			tooltip: {
				formatter: function() {
					return '<b>'+ this.series.name +'</b><br/>'+
						Highcharts.dateFormat('%d %H:%M:%S', this.x) +'<br/>'+ 
						bandwidth_label(this.y, 0);
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: '上行流量',
				data: [
					
				]
				}, {
				name: '下行流量',
				data: [
					
				]
				}]
		});
}

function createHostPieChart(parameter)
{
	var dp = [
		['主机1', 1.0], ['主机2', 1.0], 
		['主机3', 1.0], ['主机4', 1.0], ['其他主机', 1.0]];

	//return null;
	return new Highcharts.Chart({
		chart: {
			renderTo: parameter.container,
			height: parameter.height,
			width: parameter.width,
		},
		title: {
			text:null
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.point.name +'</b>: '+ 
					Highcharts.numberFormat(this.percentage, 2) +' %';
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
						return '<b>' + this.point.name + '</b>: ' + 
						Highcharts.numberFormat(this.percentage, 2) + ' %';
					}
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'Browser share',
			data: (function() {
				// generate an array of random data
				var data = [];
				data = dp;
				return data;
			})()
		}]
	});
	return Highcharts.Chart({
		chart: {
			renderTo: parameter.container,
			height: parameter.height,
			width: parameter.width
		},
	});
	/*
		title: {
			text:null
		},
		tooltip: {
			formatter: function() {
				return '<b>'+ this.point.name +'</b>: '+ 
					Highcharts.numberFormat(this.percentage, 2) +' %';
			}
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					color: '#000000',
					connectorColor: '#000000',
					formatter: function() {
						return '<b>' + this.point.name + '</b>: ' + 
						Highcharts.numberFormat(this.percentage, 2) + ' %';
					}
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'Browser share',
			data: (function() {
				// generate an array of random data
				var data = [];
				data = dp;
				return data;
			})()
		}]
	*/
}
