(function($){
	/*form表单校验*/
	$.fn.validation=function(options){
		var isResult = true;
		for(var key1 in options){
			var isEmpty = options[key1].isempty;
			var reg = new RegExp(options[key1].regexp);
			var text = options[key1].text;
			
			if(this.find("[name="+key1+"]").next("span").length>0){
				this.find("[name="+key1+"]").next("span:eq(0)").remove();
			}
			var tips = '<span style="color:#d45252;font-size:12px;">'+text+'</span>';
			if(!isEmpty){
				if(options[key1].code==undefined){
					if(this.find("[name="+key1+"]").val()==""){
						this.find("[name="+key1+"]").after(tips);
						isResult = false;
					}
				}else{
					if(this.find("[name="+key1+"]").val()==""){
						this.find("[name="+key1+"]").after('<span style="style:color:red;font-size:12px;">不能为空</span>');
						isResult = false;
					}else if(!reg.test(this.find("[name="+key1+"]").val())){
						this.find("[name="+key1+"]").after(tips);
						isResult = false;
					}
				}
			}else{
				if(this.find("[name="+key1+"]").val()==""){
				}else if(!reg.test(this.find("input[name="+key1+"]").val())){
					this.find("[name="+key1+"]").after(tips);
					isResult = false;
				}
			}
		}
		return isResult;
	}
})(jQuery);




