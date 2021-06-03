
$.fn.tree=function(json){
	var id = this.attr("id");
	
	//获得显示输入框
	var select = json.textSelect;
	//输入框的宽度
	var width = (select.width()+15)+"px";
	//高度
	var height = select.height();
	//输入框的坐标
	var left = (select.position().left)+"px";
	var top = (select.position().top+height)+"px";
	//实际值输入框 
	var valueinput = json.valueSelect;
	//获得数据
	var jsonData = json.jsondata;
	//获得key的转换格式
	var key = json.key;
	
	var t_nodeId = "nodeId";
	var t_nodeName = "nodeName";
	var t_parentNode = "parentNode";
	var t_children = "children";
	if(key){
		if(key.nodeId){
			t_nodeId = key.nodeId;
		}
		if(key.nodeName){
			t_nodeName = key.nodeName;
		}
		if(key.parentNode){
			t_parentNode = key.parentNode;
		}
		if(key.children){
			t_children = key.children;
		}
	}
 
	this.append("<div id='"+id+"_div' style='padding:5px;'></div>");
	$("#"+id+"_div").append("<input  class='' id='"+id+"search' type='text' placeholder='搜索' style='font-size:18px;width:100%'/>");
	$("#"+id+"_div").append("<hr/>");
	$("#"+id+"_div").append("<ul id='"+id+"_box"+jsonData[0][t_parentNode]+"' style='list-style:none;margin:0;padding:0px;'></ul>");
	/*创建树形*/
	function createTree(jsonData){
		for(var i in jsonData){
			var jsonType = $.type(jsonData[i]);
			if(jsonType=="array"){
				createTree(jsonData[i]);
			}else if(jsonType=="object"){
 
				var nodeId = jsonData[i][t_nodeId];
				var nodeName = jsonData[i][t_nodeName];
				var parentNode = jsonData[i][t_parentNode];
				var children = jsonData[i][t_children];
				if(children){
					$("#"+id+"_box"+parentNode).append("<li class='"+id+"_li'><i class='glyphicon glyphicon-minus' style='display:none;'></i><i class='glyphicon glyphicon-plus'></i> <a href='javascript:void(0)' style='text-decoration:none;font-size:14px;display:inline-block;padding:5px 0;color:#000000;' data-id='"+nodeId+"'>"+nodeName+
					"</a><ul id='"+id+"_box"+nodeId+"' style='list-style:none;margin-left:20px;padding:0;display:none;'></ul></li>");
				}else{
					$("#"+id+"_box"+parentNode).append("<li class='"+id+"_li'><a href='javascript:void(0)'  data-id='"+nodeId+"' style='text-decoration:none;font-size:14px;display:inline-block;padding:5px 0;color:#000000;'>"+nodeName+"</a></li>");
				}
				createTree(jsonData[i]);
			}
		}
	}
	createTree(jsonData);
	
	$("."+id+"_li i").css({"border":"1px solid #fff"});
	
	/*节点的鼠标经过样式*/
	$("."+id+"_li a").hover(function(){
		$(this).css({"background":"#ccc"});
	},function(){
		$(this).css({"background":"#fff"});
	});
	/*节点的单击事件*/
	$("."+id+"_li a").click(function(){
		sessionStorage.setItem("orgnName",$(this).html());
		sessionStorage.setItem("orgnId",$(this).attr("data-id"));
		$("#"+id+"_div").find("a").css({"color":"#000000"});
		$(this).css({"color":"red"});
	});
	/*节点图标的单击事件*/
	$("."+id+"_li i").click(function(){
		$(this).siblings("ul,i").toggle();
		$(this).toggle();
	});
	/*节点图标的鼠标经过事件*/
	$("."+id+"_li i").hover(function(){
		$(this).css({"cursor":"pointer","border":"1px solid"});
	},function(){
		$(this).css({"border":"1px solid #fff"});
	});
	
	
	
	/*搜索*/
	$("#"+id+"search").keyup(function(){
		var searchValue = $(this).val();
		if(searchValue==""){
			$("."+id+"_li").each(function(){
				$(this).show();
			});
		}else{
			$("."+id+"_li a").each(function(index){
				var $this = $(this);
				var bool = true;
				$this.parents().each(function(index){
					if(($(this).children("a")).length>0&&($(this).children("a").html()).indexOf(searchValue)>-1){
						bool = false;
					}
				});
				$this.parent().find("."+id+"_li a").each(function(index){
					if(($(this).html()).indexOf(searchValue)>-1){
						bool = false;
					}
				});
				if(($this.html()).indexOf(searchValue)>-1){
					bool = false;
				}
				if(bool){
					$(this).parent().hide();
				}else{
					$(this).parents().show();
				}
				
			});
		}
	});
}

/*创建遮阴层*/
function creat_bg(){
	parent.$("body").append("<div id='oa_bg' style='width:100%;height:100%;background:#000000;position:absolute;z-Index:11000;top:0;left:0;opacity:0.4;'></div>");
}
/*隐藏遮阴层*/
function hide_alert(fun){
	parent.$("#oa_bg,#alert,#error").fadeOut(1000);
	setTimeout("clear_alert("+fun+")",1500);
}
/*清除遮阴层*/
function clear_alert(fun){
	if($.type(fun)=="function"){
		fun();
	}
	parent.$("#oa_bg,#alert,#error").remove();
}
/*成功提示框*/
function alert(text,fun){
	parent.$("#oa_bg,#alert,#error").remove();
	creat_bg();
	parent.$("body").append("<div id='alert' style='width:300px;min-height:175px;background:#fff;position:absolute;z-Index:11100;top:50%;left:50%;margin:-200px 0 0 -150px;border-radius:5px;overflow:hidden;'></div>");
	parent.$("#alert").append("<h3 style='padding:10px;text-align:center;background:green;color:#fff;margin:0;'>成功</h3>");
	parent.$("#alert").append("<table style='min-height:100px;text-align:center; width:100%;'><tr><td>"+text+"</td></tr></table>");
	parent.$("#alert").append("<div style='padding:5px;text-align:center;margin:0;border-top:1px solid #ccc;'><input type='button' value='确定' id='alert_ok' style='border:1px solid #ccc;border-radius:3px;padding:3px 8px;background:#e5e6e5;' /></div>");
	parent.$("#alert_ok").on("click",function(){
		hide_alert(fun);
	});
	setTimeout("hide_alert("+fun+")",1000);
}

/*错误提示框*/
function error(text,fun){
	parent.$("#oa_bg,#alert,#error").remove();
	creat_bg();
	parent.$("body").append("<div id='error' style='width:300px;min-height:175px;background:#fff;position:absolute;z-Index:11100;top:50%;left:50%;margin:-200px 0 0 -150px;border-radius:5px;overflow:hidden;'></div>");
	parent.$("#error").append("<h3 style='padding:10px;text-align:center;background:red;color:#fff;margin:0;'>警告</h3>");
	parent.$("#error").append("<table style='min-height:100px;text-align:center; width:100%;'><tr><td>"+text+"</td></tr></table>");
	parent.$("#error").append("<div style='padding:5px;text-align:center;margin:0;border-top:1px solid #ccc;'><input type='button' value='确定' id='error_ok' style='border:1px solid #ccc;border-radius:3px;padding:3px 8px;background:#e5e6e5;' /></div>");
	parent.$("#error_ok").on("click",function(){
		hide_alert(fun);
	});
}
function confirm(text,fun,option){
	parent.$("#oa_bg,#alert,#error").remove();
	creat_bg();
	parent.$("body").append("<div id='error' style='width:300px;min-height:175px;background:#fff;position:absolute;z-Index:11100;top:50%;left:50%;margin:-200px 0 0 -150px;border-radius:5px;overflow:hidden;'></div>");
	parent.$("#error").append("<h3 style='padding:10px;text-align:center;background:red;color:#fff;margin:0;'>警告</h3>");
	parent.$("#error").append("<table style='min-height:100px;text-align:center; width:100%;'><tr><td>"+text+"</td></tr></table>");
	parent.$("#error").append("<div style='padding:5px;text-align:center;margin:0;border-top:1px solid #ccc;'><input type='button' value='删除' id='error_ok' style='border:1px solid #ccc;border-radius:3px;padding:3px 8px;background:#e5e6e5;' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='取消' id='error_cacell' style='border:1px solid #ccc;border-radius:3px;padding:3px 8px;' /></div>");
	parent.$("#error_ok").on("click",function(){
		hide_alert(fun(option));
	});
	parent.$("#error_cacell").on("click",function(){
		hide_alert();
	});
	
}

(function($){
	var dom=null;
	$.dialog = {
		_op:{url:"",title:"窗口",height:300,width:580,buttons:null,max:false},
		open:function(options){
			var op = $.extend({},$.dialog._op, options);
			var top = -op.height/2;
			var left = -op.width/2;
			creat_bg();
			var mydate = new Date();
			var time = mydate.getTime();
			/*创建模态框最外层及title*/
			parent.$("body").append("<div id='"+time+"frame'><div id='"+time+"title' style='background:#337ab7;font-size:20px;padding:5px;color:#fff;'>"+op.title+"<img class='dialog-close' style='float:right;' src = '/hrms/common/img/close-1.png' /></div></div>");
			/*模态框最外层样式*/
			parent.$("#"+time+"frame").css({"position":"absolute","width":op.width+"px","background":"white","top":"100px","left":"50%","z-Index":11100,"border":"1px solid #337ab7","margin-left":left+"px"});
			/*创建显示内容部分容器*/
			parent.$("#"+time+"frame").append('<div id="'+time+'contentBox"><iframe src="'+op.url+'" id="'+time+'content"></iframe></div>');
			/*内容部分容器样式*/
			parent.$("#"+time+"content").css({"height":op.height+"px","width":"100%","border":"0","border-bottom":"1px solid #337ab7"});
			/*遍历创建按钮*/
			if(op.buttons){
				/*创建按钮的容器*/
				parent.$("#"+time+"frame").append('<div id="'+time+'btn"></div>');
				/*按钮容器的样式*/
				parent.$("#"+time+"btn").css({"border-top":"0","margin":"0 5px 5px 5px","text-align": "right"});
				parent.$(op.buttons).each(function(i,item){
					var btn = '<button style="margin-left:10px;border:1px solid #ccc;border-radius:3px;padding:3px 8px;background:#e5e6e5;">'+item.text+'</button>';
					parent.$("#"+time+"btn").append(btn);
					/*按钮的回调函数*/
					parent.$("#"+time+"btn button:eq("+i+")").on("click",function(){
						item.onclick($.dialog,time);
					})
				})
			}
			parent.$(".dialog-close").click(function(){
				$.dialog.close(time);
			});
			
		},
		/*关闭*/
		close:function(obj){
			clear_alert(null);
			parent.$("#"+obj+"frame").remove();
			parent.$("body").css({"overflow":"auto"});
		},
		/*返回iframe中页面的文档对象*/
		callprame:function(time){
			return $(window.parent.document).contents().find("#"+time+"content")[0].contentWindow;
			//return document.frames['dialogName'];
		}
	}
	
	$.fn.deserialize=function(data){
		for(var key in data){
			if(this.find("[name="+key+"]").attr("type")=="radio"){
				var radios = this.find("[name="+key+"]");
				for(var i=0;i<radios.length;i++){
					if($(radios[i]).val()==data[key]){
						$(radios[i]).attr("checked",true);
					}
				}
			}else if(this.find("[name="+key+"]").attr("type")=="checkbox"){
				var chencboxs = this.find("[name="+key+"]");
				var value = data[key];
				for(var i=0;i<value.length;i++){
					for(var j=0;j<chencboxs.length;j++){
						if(value[i]==$(chencboxs[j]).val()){
							$(chencboxs[j]).attr("checked",true);
						}
					}
				}
				
			}else{
				this.find("[name="+key+"]").val(data[key]);
				/*var tagName = this.find("[name="+key+"]")[0].tagName;
				if(tagName=="INPUT" || tagName=="TEXTAREA" || tagName=="SELECT"){
					this.find("[name="+key+"]").val(data[key]);
				}else{
					this.find("[name="+key+"]").text(data[key]);
				}*/
				
			}
		}
	}
})(jQuery)

