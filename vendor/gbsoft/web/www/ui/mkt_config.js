
//var cfgs = new Array('user|pass|20|100|1|mark','user2|pass|20|100|1|mark','user3|pass|20|100|1|mark');
	function configSubmit(){
		var values = {}

		values["Device.Service.WebAuth.Enable"] = $("input[name='enable']:checked").val() == "on"?"true":"false";
		values["Device.Service.WebAuth.LeaseTime"] = parseInt($("input[name='expireTime']").val()) * 60;
		values["Device.Service.WebAuth.VIPCode"] = $("#specialID").val();
		values["Device.Service.WebAuth.VIPEnable"] = $("input[name='specialEnable']:checked").val() == "on"?"true":"false";

		function callCb(data, context) {
			alert("配置成功");
		}

		var parameters = {
			ParameterList: values,
			SID: 2
		};

		TR069_RPC("SetParameterValues", parameters, callCb);
	}

function webPortalMainConfigCB(json)
{
	var ParameterList = json.ParameterList;
	var info = new Object();
	info.values = {};
	info.values.enable = ParameterList["Device.Service.WebAuth.Enable"].Value == "true"?"on":"off";
	info.values.specialEnable = ParameterList["Device.Service.WebAuth.VIPEnable"].Value == "true"?"on":"off";
	info.values.specialID = ParameterList["Device.Service.WebAuth.VIPCode"].Value;
	info.values.expireTime = parseInt(ParameterList["Device.Service.WebAuth.LeaseTime"].Value || "0")/60;
	info.values.expireTime = info.values.expireTime.toFixed(0);
	$("#portalForm").forminit2(info);
	json = json;
}

$(function(){
	var parameters ={ ParameterNames: [
		"Device.Service.WebAuth.Enable",
		"Device.Service.WebAuth.LeaseTime",
		"Device.Service.WebAuth.VIPCode",
		"Device.Service.WebAuth.VIPEnable"
	]};
	TR069_RPC("GetParameterValues", parameters, webPortalMainConfigCB);
});

