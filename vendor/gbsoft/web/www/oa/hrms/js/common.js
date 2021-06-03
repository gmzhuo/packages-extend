jQuery.oa=(function($){
	var mcOA={};
	mcOA.timestamp=function(){
		return Date.parse(new Date());
	}
	 
	mcOA.isEmpty=function(value)
	{
		if(!value) 
			return true;
		if(value=="" || value==null) 
			return true;
		return false;
	}
	mcOA.isEmptyByObj=function(obj)
	{
		for(var index in obj)
		{
			if(this.isEmpty(obj[index].value))
			{
				alert($("#"+index).attr("item")+"不能为空!");
				return true;	
			}
		}
	}
	mcOA.compareDate=function(d1,d2){
		  return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
	}
	
	mcOA.modelPop=function(content,fn){
		$("#finishedProcessInstanceModal").modal({show: true, backdrop: 'static'});
		//console.log(content);
		$("#finishedProcessInstanceModal").html(content);
	}
	return mcOA;
	
})($);
 
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

