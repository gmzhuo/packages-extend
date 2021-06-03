// JavaScript Document

var QOS_MAX_COUNT = 10;
var STATICIP_MAX_COUNT = 32;
var MAX_VS_NUM = 10;
var SROUTE_MAX_COUNT = 5;
var FILTER_CLIENT_MAX_COUNT = 10;
var FILTER_MAC_MAX_COUNT = 256;
var FILTER_URL_MAX_COUNT = 32;
var QOS_MAX_COUNT = 32;
var MAX_STATIC_RT_NUM = 32;

/*重置父容器高度*/
window.onload = function(){
	if(parent.resizeiframeh != undefined) parent.resizeiframeh($("#mbody").height());
	if(typeof($("#mtable")) == "object") table_style1("mtable");
	set_all_btn_style();
};

var addTableRow = function(){ 
	var tr = document.createElement("tr");
	var patip = /^(0x[0-9A-Fa-f]{8}|[0-9A-Fa-f]{8})$/;
	for(var i=0;i<arguments.length;i++)
	{
		var td = document.createElement("td");
		var te;
		if(arguments[i].indexOf("<input")!=-1)
		{
			//te = document.createTextNode(arguments[i]); 
			td.innerHTML = arguments[i];
		}
		else
		{
			if(patip.test(arguments[i]))
				arguments[i] = dex2ip(arguments[i]);
			te = document.createTextNode(arguments[i]); 
			td.appendChild(te); 
		}
		tr.appendChild(td);
	}
	var tbody= document.getElementById("tablebody"); 
	tbody.appendChild(tr); 
}

var dex2ip = function(dex)
{
	var ip = '';
	dex  = dex.toLowerCase();
	dex = dex.replace(/0x/, "");
	
	var len = dex.length;
	if(len != 8)
	{
		return dex;
	}
	for(var i = (len-1); i>=0; i-=2)
	{
		var code = dex.charCodeAt(i);
		if(code >=97 && code <= 102)
			code = 10+(code-97);
		else if(code >=48 && code <=57)
			code -= 48;
		else
			return;
		var code1 = dex.charCodeAt(i-1);
		if(code1 >=97 && code1 <= 102)
			code1 = 10+(code1-97);
		else if(code1 >=48 && code1 <=57)
			code1 -= 48;
		else
			return;
			
		if(i != 1)
		{
			ip = '.'+eval(code1*16+code)+ip;
		}
		else
		{
			ip = eval(code1*16+code)+ip;
		}
	}
	return ip;
}

var valid_ipaddr = function(ip)
{
	var pat = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
	if(ip=="127.0.0.1"||ip=="0.0.0.0")
		return false;
	if(pat.test(ip))
		return true;
	else
		return false;
}

var valid_internetipaddr = function(ip)
{
	if(!valid_ipaddr(ip))
		return false;
	var ips = ip.split(".");
	if(ips[0]=="10" || (ips[0]=="172" && (ips[1]>="16" && ips[1]<="31")) || (ips[0]=="192" && ips[1]=="168"))
		return false;
	else
		return true;	
}

var valid_ipmask = function(mask)
{
	var allmask = new Array(255, 254, 252, 248, 240, 224, 192, 128, 0);
	var okflag = false, k = 4;
	if(!valid_ipaddr(mask))
		return false;
	var ips = mask.split('.');
	for(var i=3; i>=0; i--)
	{
		if(parseInt(ips[i]) == 0) continue;
		okflag = false;
		for(var j=0; j<8; j++)
		{
			if(ips[i] == allmask[j])
			{
				okflag = true;
				break;
			}
		}
		if(!okflag) return false;
		if(okflag == true)
		{
			for(k = (i-1); k>=0; k--)
			{
				if(parseInt(ips[k])!=255)
					return false;
			}
			return true;
		}
	}
	return okflag;
}
var valid_macaddr = function(mac)
{
	var pat = /^([0-9a-fA-F]{1}[02468aceACE]{1})(:[0-9a-fA-F]{2}){5}$/;
	if(pat.test(mac))
		return true;
	else
		return false;
}
var macFormat = function(obj)
{
	obj.value = obj.value.replace(/-/g, ':');
	obj.value = obj.value.replace(/A/g, 'a');
	obj.value = obj.value.replace(/B/g, 'b');
	obj.value = obj.value.replace(/C/g, 'c');
	obj.value = obj.value.replace(/E/g, 'd');
	obj.value = obj.value.replace(/E/g, 'e');
	obj.value = obj.value.replace(/F/g, 'f');
}
var valid_normalstr = function(str)
{
	var pat = /[0-9a-zA-Z-_\.@#*%]?$/;
	if(pat.test(str))
		return true;
	else
		return false;
}
var new_inputobj = function(name, val)
{
	var input = document.createElement("input"); 
	input.type = "hidden";
	input.id = name;
	input.name = name;
	input.value = val;
	document.body.appendChild(input);
}

var parseSubmitObj = function(f, basename, arr)
{
	var pat = /^\d+$/;
	var input = document.createElement("input"); 
	input.type = "hidden";
	for(var i=0; i< arr.length; i++)
	{
		input.id = basename+'_'+i;
		input.name = basename+'_'+i;
		input.value = arr[i];
	}

	f.appendChild(input);
}

var creatListSubmitObj = function(list, listname)
{
	var input = document.createElement("input"); 
	var i = 0;
	input.type = "hidden";
	input.name = "web_listname";
	input.value = listname;
	document.forms[0].appendChild(input);
	$.each(list, function(key, val)
	{
		if(val != '')
		{
			input = document.createElement("input"); 
			input.type = "hidden";
			input.name = "web_list_"+i;
			input.value = val;
			document.forms[0].appendChild(input);
			i++;
		}
	});
}

var int2dex = function(v)
{
	var n = new Array('0', '1','2','3','4','5','6','7','8','9', 'a', 'b','c','d','e','f');
	return n[v];
}

var ip2dex = function(cip)
{
	var ip = "0x", a = 0, b = 0, c = 0, d = 0;
	var ips = cip.split(".");
	if(ips.length == 4)
	{
		for(var i=0; i<4; i++)
		{
			a = parseInt(parseInt(ips[i])/16);
			b = parseInt(ips[i]) - a*16;
			ip += int2dex(a);
			ip += int2dex(b);
		}
	}
	else
	{
		ip = cip;
	}
	return ip;
}

var ip2int = function(cip)
{
	var ip = 0;
	var ips = cip.split(".");
	if(ips.length == 4)
	{
		for(var i=0; i<4; i++)
		{
			ip = ip*16 + parseInt(ips[i]);
		}
	}
	else
	{
		ip = 0;
	}
	return ip;
}

var validnum = function(num)
{
	var pt = /^[0-9]+$/;
	if(pt.test(num))
		return true;
	else
		return false;
}

var validport = function(port)
{
	var pt = parseInt(port);
	if(!validnum(port))
		return false;
	if(pt<=0 || pt>65535)
		return false;
	return true;
}

var checkdupinlist = function(list, key)
{
	if(list==''||key=='') return false;
	for(var i=0; i<list.length; i++)
	{
		if(list[i] != '' && list[i].indexOf(key) != -1)
		{
			return true;
		}
	}
	return false;
}

var set_all_btn_style = function()
{
	var btn = document.getElementsByTagName("INPUT");
	for (var i=0; i<btn.length; i++){
		if (btn[i].type=="button" || btn[i].type=="submit"){
			$("#"+btn[i].id).addClass("btn");
			$("#"+btn[i].id).mouseover(function(){
				$(this).removeClass("btn");
				$(this).addClass("btn_over");
			}); 
			$("#"+btn[i].id).mouseout(function(){
				$(this).removeClass("btn_over");
				$(this).addClass("btn");
			});
		}
	}
}
var check2i = function(e)
{
	if(e.checked) return "1";
	else return "0";
}