var radiusUserTable;
var userList;

function radiusSetupCommit()
{
	var configInfo = new Object();

	configInfo.radiusMode = $("#radiusSetupForm select[name='radiusMode']").val();
	configInfo.tls = $("#radiusSetupForm input[name='tls']:checked").val();
	configInfo.authServer = $("#radiusSetupForm #authServer").val();
	configInfo.authPort = parseInt($("#radiusSetupForm #authPort").val());
	configInfo.authPassword = $("#radiusSetupForm #authPassword").val();
	configInfo.accountingServer = $("#radiusSetupForm #accountingServer").val();
	configInfo.accountingPort = parseInt($("#radiusSetupForm #accountingPort").val());
	configInfo.accountingPassword = $("#radiusSetupForm #accountingPassword").val();

	if(configInfo.radiusMode == "local") {
		configInfo.authServer = "local";
		configInfo.accountingServer = "local";
		configInfo.useRadius = true;
	} else if(configInfo.radiusMode == "external") {
		configInfo.useRadius = true;
	} else {
		configInfo.useRadius = false;
	}

	function acConfigCB(json){	
	}

	function jsonCB(json) {
		var groupinfo = {
			options: json.config.main,
		}
		groupinfo.options.radius = configInfo;
		setupACConfig(groupinfo, acConfigCB);
	}

	acDumpJsonConfig(jsonCB);

	function setupCB(json) {
		dumpRadiusInfo(radiusInfoCB);
		//alert("参数保存成功");
	}
	setupRadius(configInfo, setupCB);

	

	return false;
}

function radiusUserCommit()
{
	var userInfo = new Object();

	var section = $("#userInfoEditForm #section").val();
	userInfo.name = $("#userInfoEditForm #name").val();
	userInfo.username = $("#userInfoEditForm #username").val();
	userInfo.password = $("#userInfoEditForm #password").val();
	userInfo.memo = $("#userInfoEditForm #memo").val();

	function addCB(json) {
		dumpAllUserInfo();
	}
	updateRadiusUser(section, userInfo, addCB);

	return false;
}

function addRadiusUser(data)
{
		var itemtemp = $("#userInfoEdit").html();
		$("#dialog-userInfoEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 450,
			modal: true,
			open:function(a, b) {
				var formdata = {};
				if(data.section) {
					formdata.values = userList[data.section];
					formdata.values.section = data.section;
				}
				$("#userInfoEditForm").forminit2(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-userInfoEdit").remove();
				},

				"确定": function() {
					radiusUserCommit();
					$( this ).dialog( "close" );
					$("#dialog-userInfoEdit").remove();
				}
     		}
		});
}

function applyEditUser(THIS)
{
	var key = $(THIS).attr("data");
	var data = {};
	data.section = key;
	addRadiusUser(data);
}

function dumpAllUserInfo()
{
	radiusUserTable.clear();
	radiusUserTable.draw();
	dumpRadiusUser(radiusUserCB);
}

function applyDeleteUser(THIS)
{
	var key = $(THIS).attr("data");
	deleteRadiusUser(key, dumpAllUserInfo);
}

function radiusInfoCB(json)
{
	var formdata = {};
	formdata.values = json.parameter[0].options;
	$("#radiusSetupForm").forminit2(formdata);
	radiusModeChange();
	return;
}

function radiusUserCB(json)
{
	if(json && json.parameter) {
		userList = new Object();

		json.parameter.forEach(function(e) {
			if(e.type == "user") {
				var userInfo = e.options;
				userInfo.section = e.name;
				userList[e.name] = userInfo;
				var editInfo = '<a data="'+ e.name +'" onClick="applyEditUser(this)"><img src="images/edit.gif" width="16" height="16"/></a>';
				var deleteInfo = '<a data="'+ e.name +'" onClick="applyDeleteUser(this)"><img src="images/remove.gif" width="16" height="16"/></a>';
				radiusUserTable.row.add( [ 
					userInfo.name, userInfo.username, "", userInfo.memo || "", editInfo, deleteInfo]).draw( false );
			}
		});
	}

	return;
}

function radiusModeChange(e)
{
	if($("#radiusMode").val() != "external") {
		$(".externalParam").hide();
		$(".innerParam").show();
	} else {
		$(".externalParam").show();
		$(".innerParam").hide();
	}
}
      

$(function(){
	radiusUserTable = $('#users').DataTable({"language": {
				"lengthMenu": "每页 _MENU_ 条记录",
				"zeroRecords": "没有找到记录",
				"info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
				"infoEmpty": "无记录",
				"infoFiltered": "(从 _MAX_ 条记录过滤)",
				"search": "查找",
				"paginate": {
        			"first":      "第一页",
					"last":      "最后一页",
					"next":       "下一页",
					"previous":   "上一页"
    			},
		},});

	$("#radiusMode").change(radiusModeChange);
	dumpRadiusInfo(radiusInfoCB);
	dumpRadiusUser(radiusUserCB);
});