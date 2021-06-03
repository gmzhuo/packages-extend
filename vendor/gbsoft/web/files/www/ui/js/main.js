var mainactidx = -1;
var subactidx = -1;
var mainmenucount = 0;

/*根据iframe内容高度设置iframe的高度,保证iframe中不出现垂直滚动条*/
var resizeiframeh = function(ht){
	$("#mframe").height(parseInt(ht)<500?500:parseInt(ht));
};
var relogin = function()
{
	top.window.location = "login.html";
}
function logoutCB(ctx)
{
	relogin()
}

var dologout = function()
{
	//call logout
	logout(logoutCB);
}

function checkLoginStatusCB(json)
{
	if(json.result &&  json.result == "failed") {
		relogin();
	}
}

window.onload = function(){
	loginStatus(checkLoginStatusCB);
	$(window).trigger("resize");
	$("#mm1 span:eq(0)").trigger("click");
};

$(function(){
	$("body").fadeIn(2000);
	mainmenucount = $("#mm1 li").length;
	
	//隐藏所有子菜单
	function hiddenallsubmenu(idx)
	{
		var submenus = $("#menu").children();
		for(var j = 0; j < submenus.length; ++j) {
			var submenu = $(submenus[j]);
			submenu.css("display", "none");
		}
	};
	
	//清除所有子菜单背景
	function clearallsubmenubg(submenu_id){
		$("#"+submenu_id+" li").each(function(idx, elm){
			var menuitmid = $("#"+submenu_id+" li:eq("+idx+")").attr("id");
			if(menuitmid==undefined) return;
			$("#"+menuitmid).removeClass("menuclick");
		});
	};
	
	$("#alogo a").click(function(){
		if($(this).attr("id")=="logout")
		{
			dologout();
			return;
		}
	});
	
	//$("#mm1 span").each(function(index, element){
	//	$(this).removeClass("mainmenuover");
	//	$(this).addClass("mainmenuout");
	//});
	
	function allmenuout(i)
	{
		$("#mm1 span").each(function(index, element){
			if(i==index)
			{
				try{
				$(this).removeClass("mainmenuout");
				$(this).addClass("mainmenuover");
				} catch(e) {
				}
			} else {
				try{
				$(this).removeClass("mainmenuover");
				$(this).addClass("mainmenuout");
				} catch(e) {
				}
			}
		});
	}

	$("#mm1 span").click(function(){
		var mm1span = $("#mm1 span")
		var index = 0;
		for(;index < mm1span.length; ++index) {
			if($(this).attr("id") == $(mm1span[index]).attr("id")) {
				break;
			}
		}
		allmenuout(index);
		hiddenallsubmenu(index);
		$("#submenu_" + $(this).attr("id")).css("display", "block");
		$("#"+$($("#submenu_"+$(this).attr("id"))).attr("id")+" li:eq(0)").trigger("click");
		loginStatus(checkLoginStatusCB);
	});

	//鼠标移入移出改变子菜单按钮样式
	$("#menu li").addClass("menumouseout");
	
	$("#menu li").mouseover(function(){
		$(this).removeClass("menumouseout");
		$(this).addClass("menumouseover");
	});
	
	$("#menu li").mouseout(function(){
		$(this).removeClass("menumouseover");
		$(this).addClass("menumouseout");
	});

	//注册子菜单点击事件
	for(var i = 0; i < mainmenucount; i++)
	{
		var submenuid = $("#mm1 span:eq("+i+")").attr("id");
		var submenuname = "#submenu_"+submenuid+" li";
		var submenulen = $(submenuname).length;
		for(var j = 0; j < submenulen; j++)
		{
			var linkobj_name = "#"+$(submenuname+":eq("+j+")").attr("id");
			$(linkobj_name).click(function(){
				
				top.mframe.location.href = $(this).attr("id")+".html";
				var submenus = $("#menu").children();
				loginStatus(checkLoginStatusCB);
				for(var j = 0; j < submenus.length; ++j) {
					var submenu = submenus[j];
					var id = $(submenu).attr("id");
					clearallsubmenubg(id);
				}
				$(this).addClass("menuclick");
			});
		}
	}
});
