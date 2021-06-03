// JavaScript Document

/*MAC Address*/
function checkMac(mac)
{   
	var t = /^[0-9a-fA-F]{2}(?::[0-9a-fA-F]{2}){5}$/;
    if (!t.test(mac))
    {
        return false;
    }
    return true;
}

/*IP Address*/
function checkIp(ip)
{
	var t = /((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)/;
	if (!t.exec(ip))
    {
        return false;
    }
    return true;
}

/*NetMask*/
function checkMask(mask)
{
	var t = /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/;
	if (!t.exec(mask))
    {
        return false;
    }
    return true;
}

/*Number*/
function checkDigital(val)
{
	var t = /^[0-9]{1,}$/;
	var value = val;
	if(typeof(val) == 'object')
		value = val.value;
	if (!t.exec(value))
	{
		if(typeof(val) == 'object')
			val.focus();
		return false;
	}
	else
	{
		return true;
	}
}

/*English Char*/
function checkAlpha(val)
{
	var t = /^[a-zA-Z]{1,}$/;
	var value = val;
	if(typeof(val) == 'object')
		value = val.value;
	if (!t.exec(value))
	{
		if(typeof(val) == 'object')
			val.focus();
		return false;
	}
	else
	{
		return true;
	}
}

function isalphanumber(val) 
{	
	var t = /^[a-zA-Z0-9]+$/;
	if (!t.exec(val))
        return false;
    return true;
} 

function isnumber(val) 
{	
	var t = /^[0-9]+$/;
	if (!t.exec(val))
        return false;
    return true;
} 

function checkASCII(val)
{
	var i;
	for (i = 0; i < val.length; i++)
	{
		if (val.charCodeAt(i)>255)
		{
			return false;
		}
	}
	return true;
}

/* Email Address */
function isemail(str) 
{ 
	var result = str.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/); 
	if(result == null)
		return false; 
	return true; 
} 
// 去除字符串的首尾的空格 
function trim(val)
{
	return val.replace(/(^\s*)|(\s*$)/g, ""); 
} 
// 返回字符串的实际长度, 一个汉字算2个长度 
function strlen(val){ 
	return val.replace(/[^\x00-\xff]/g, "**").length; 
} 
