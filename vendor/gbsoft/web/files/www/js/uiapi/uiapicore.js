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
					if(onSystemNeedLogin) {
						onSystemNeedLogin();
					} else {
						top.document.location.href="index.html";
					}
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

