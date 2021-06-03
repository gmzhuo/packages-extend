
function addCookie(name,value,expireHours){
      var cookieString=name+"="+escape(value) + "; SameSite=None; Secure";
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

function TR069_RPC(FunctionName, Parameters, CB, context)
{
	var parameterData = {
			FunctionName:FunctionName,
			Parameters:Parameters,
			accessToken:getCookie("uiapiSession")
	};

	$.ajax({
		type: 'POST',
		url: "cgi-bin/test.cgi",
		dataType:"json",
		contentType:'application/json;charset=UTF-8',
		data:JSON.stringify(parameterData),
		success: CB,
		processData: false,
		context: context
	});
}

function TR069_RPC_COMPLETE(FunctionName, Parameters, context)
{
	return new Promise(
		function(resolve, reject) {
			var parameterData = {
				FunctionName:FunctionName,
				Parameters:Parameters,
				accessToken:getCookie("uiapiSession")
			};

			$.ajax({
				type: 'POST',
				url: "cgi-bin/test.cgi",
				dataType:"json",
				contentType:'application/json;charset=UTF-8',
				data:JSON.stringify(parameterData),
				success: function(data) {
					data.context = this;
					resolve(data);
				},
				error: function(xhr, info, e, context) {
					reject(context);
				},
				processData: false,
				context: context
			});
		}
	);
}

function SAVE_PARAMETER_VALUES(values, context)
{
	var parameters = {
		ParameterList: values,
		SID: 2
	};

	return TR069_RPC_COMPLETE("SetParameterValues", parameters, context);
}

