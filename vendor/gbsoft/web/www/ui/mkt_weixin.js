
//var cfgs = new Array('user|pass|20|100|1|mark','user2|pass|20|100|1|mark','user3|pass|20|100|1|mark');
	function configSubmit(){
		var options = {
			"enable":$("input[name='enable']:checked").val(),
			"storeName":$("#storeName").val(),
			"SSID":$("#SSID").val(),
			"shopID":$("#shopID").val(),
			"appID":$("#appID").val(),
			"secretKey":$("#secretKey").val(),
		};
		function configCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
		}
		setWeixin(options, configCB);
		return false;
	}

	function weixinConfigCB(json)
	{
		var info = new Object();
		info.values = json.parameter[0].options;
		$("#weixinForm").forminit2(info);
	}

$(function(){
	dumpWeixin(weixinConfigCB);
});

