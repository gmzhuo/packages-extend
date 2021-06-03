
//var cfgs = new Array('user|pass|20|100|1|mark','user2|pass|20|100|1|mark','user3|pass|20|100|1|mark');
	var userInfos = new Object;
	function pppoeSubmit() {
		var options = {
			ip_min: $("#pppoeipStart").val(),
			ip_max: $("#pppoeipEnd").val(),
			dns1: $("#pppoeDNS1").val(),
			dns2: $("#pppoeDNS2").val(),
			enabled: $("input[name='pppoeEnable']:checked").val(),
		};
		function pppoeSetupCB(json, context) {
			dumpPPPOEConfig(pppoeConfigCB);
		}
		setPPPOEConfig(options, pppoeSetupCB);
		return false;
	}

	function pptpSubmit() {
		var options = {
			ip_min: $("#pptpipStart").val(),
			ip_max: $("#pptpipEnd").val(),
			dns1: $("#pptpDNS1").val(),
			dns2: $("#pptpDNS2").val(),
			enabled: $("input[name='pptpEnable']:checked").val(),
		};
		function pptpSetupCB(json, context) {
			dumpPPTPConfig(pptpConfigCB);
			alert("配置已保存");
		}
		setPPTPConfig(options, pptpSetupCB);
		return false;
	}

	function openvpnSubmit() {
		var options = {
			enable: $("input[name='openvpnEnable']:checked").val(),
		};
		function pptpSetupCB(json, context) {
			dumpPPTPConfig(pptpConfigCB);
		}
		setOpenVPNConfig(options, pptpSetupCB);
		return false;
	}

	function vpnSubmit()
	{
		pppoeSubmit();
		pptpSubmit();
		openvpnSubmit();
	}

	function pppUserSubmit() {
		var options = new Object();
		var section = $("#pppUser input[name='section']").val();
		options = {
			username: $("#pppUser input[name='username']").val(),
			password: $("#pppUser input[name='password']").val(),
			duplicate: $("#pppUser select[name='duplicate']").val(),
			expireDate: $("#pppUser input[name='expireDate']").val(),
			ipaddr: $("#pppUser input[name='ipaddr']").val(),
			network: $("#pppUser input[name='network']").val(),
			netmask: $("#pppUser input[name='netmask']").val(),
			downrate: $("#pppUser input[name='downrate']").val(),
			memo: $("#pppUser input[name='memo']").val(),
		};
		function addPPPUserCb(data, context) {
			alert("配置已保存");
			dumpUser(pppUserInfoCB);
		}
		addUser(section, options, addPPPUserCb);
		return false;
	}

	function pppoeConfigCB(json, context)
	{
		var info = new Object();
		if(!json.parameter[0])
			return;
		var formdata = new Object();
		formdata.values = new Object();
		if (json.parameter.length == 0)
			return;

		formdata.values.pppoeipStart = json.parameter[0].options.ip_min || "";
		formdata.values.pppoeipEnd = json.parameter[0].options.ip_max || "";
		formdata.values.pppoeDNS1 = json.parameter[0].options.dns1 || "";
		formdata.values.pppoeDNS2 = json.parameter[0].options.dns2 || "";
		formdata.values.pppoeEnable = json.parameter[0].options.enabled || "off";
		
		$("#vpnForm").forminit2(formdata);
		return;
		
	}

	function pptpConfigCB(json, context)
	{
		var info = new Object();
		if(!json.parameter[0])
			return;
		var formdata = new Object();
		formdata.values = new Object();
		if (json.parameter.length == 0)
			return;

		formdata.values.pptpipStart = json.parameter[0].options.ip_min || "";
		formdata.values.pptpipEnd = json.parameter[0].options.ip_max || "";
		formdata.values.pptpDNS1 = json.parameter[0].options.dns1 || "";
		formdata.values.pptpDNS2 = json.parameter[0].options.dns2 || "";
		formdata.values.pptpEnable = json.parameter[0].options.enabled || "off";
		
		$("#vpnForm").forminit2(formdata);
		return;
	}

	function vpn_info_cb(data, status, context)
	{
		var info = data.ParameterList["Device.VPN."]
		var formdata = new Object();
		formdata.values = new Object();
		if (json.parameter.length == 0)
			return;

		formdata.values.pppoeipStart = info.PPPoE.IPAddressStart || "";
		formdata.values.pppoeipEnd = info.PPPoE.IPAddressEnd || "";
		formdata.values.pppoeDNS1 = info.PPPoE.DNS1 || "";
		formdata.values.pppoeDNS2 = info.PPPoE.DNS1 || "";
		formdata.values.pppoeEnable = info.PPPoE.Enable == "true";

		formdata.values.pptpipStart = info.PPTP.IPAddressStart || "";
		formdata.values.pptpipEnd = info.PPTP.IPAddressEnd || "";
		formdata.values.pptpDNS1 = info.PPTP.DNS1 || "";
		formdata.values.pptpDNS2 = info.PPTP.DNS1 || "";
		formdata.values.pptpEnable = info.PPTP.Enable == "true";
		
		$("#vpnForm").forminit2(formdata);
		
		userInfos = new Object();
		$("tr").remove(".pppuser");
    	var itemtemp = $("#pppusers").html();
		var result = {
			"pppusers":new Array(),
		};
		
		for(var key in info.User) {
			var user = info.User[key];
			var userinfo = user;
			userinfo.section = "Device.VPN.User." + key + ".";
			result.pppusers.push(userinfo);
			userInfos[key] = userinfo;
		}

    	$("#pppusers").after(Mustache.render(itemtemp, result));
		$( 'a.section-edit' ).click(function( e ){
			var data = {
				"title":"编辑PPP用户",
			};
			var sectionName = $(e.currentTarget).attr("data");
			data.section = sectionName;
			data.info = userInfos[sectionName];
			addPPPUser(data);
			return;
		});
		$( 'a.section-del' ).click(function( e ){
			var sectionName = $(e.currentTarget).attr("data");
			function delUserCB(json) {
				dumpUser(pppUserInfoCB);
			}
			delUser(sectionName, delUserCB);
			return;
		});
		return;
	}

	function addPPPUser(data){
		var itemtemp = $("#pppUserEdit").html();
		$("#dialog-pppUserEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 450,
			modal: true,
			open:function(a, b) {
				var formdata = new Object();
				formdata.values = data.info;

				$("#pppUser").forminit2(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-pppUserEdit").remove();
				},

				"确定": function() {
					pppUserSubmit();
					$( this ).dialog( "close" );
					$("#dialog-pppUserEdit").remove();
				}
     		}
		});
	}
	
	function addOnePPPUser()
	{
		var data = {
			"title":"添加PPP拨号用户",
		};
		addPPPUser(data);
		return;
	}


$(function(){
	TR069_RPC("DumpObject", {ObjectName:"Device.VPN."}, vpn_info_cb, data);
	$('#vpnSubmit').bind('submit', pppoeSubmit);
});

