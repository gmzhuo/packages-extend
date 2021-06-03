
function commitMakeRootCA()
{
	var info = {};
	info.C = $('#CAForm #CU').val();
	info.ST = $('#CAForm #PR').val();
	info.L = $('#CAForm #city').val();
	info.O = $('#CAForm #company').val();
	info.OU = $('#CAForm #unit').val();
	info.CN = $('#CAForm #name').val();
	info.emailAddress = $('#CAForm #email').val();
	info.password = $('#CAForm #password').val();

	function crtCertificateCB(json) {
		json = json;
	}

	makeRootCA(info, crtCertificateCB);
	return false;
}

function caInfoCB(json)
{
	json = json;
	if(json.status.rootCrt) {
		$("#rootCrt").text("已导入");
		if(json.status.rootKey) {
			$("#rootKey").text("在本地");
		} else {
			$("#rootKey").text("不在本地");
		}
	} else {
		$("#rootCrt").text("未导入");
		$("#rootKey").text("不在本地");
	}
}

$(function(){
	dumpCAInfo(caInfoCB);
});
