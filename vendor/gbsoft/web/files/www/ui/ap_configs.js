
//var gps = new Array('1;配置1;WIFI;0;0;2;5;12345678','2;配置2;WIFI2;1;1;1;10;12345678','3;配置3;WIFI3;1;1;0;30;');
var gps = new Array();
var gpeditidx = -1;
var maxgpid = -1;

var groups = new Array();
var groupsname = new Array();
	function configSubmit(){
		var groupinfo = new Object();
		groupinfo.options = {
			"enable":parseInt($("#acConfigForm input[name='enable']:checked").val()),
			"pureACAuth":$.parseJSON($("#acConfigForm #pureACAuth").val()),
			"priority":parseInt($("#acConfigForm select[name='priority']").val()),
			"default":$("#acConfigForm select[name='default']").val(),
			"pingInterval":parseInt($("#acConfigForm #pingInterval").val()),
			"silentInterval":parseInt($("#acConfigForm #silentInterval").val()),
			"maxDiscoveryInterval":parseInt($("#acConfigForm #maxDiscoveryInterval").val()),
			"maxDiscoveries":parseInt($("#acConfigForm #maxDiscoveries").val()),
			"idleTimeout":parseInt($("#acConfigForm #idleTimeout").val()),
			"maxWTP":parseInt($("#acConfigForm #maxWTP").val()),
			"stationStatusEnable":$.parseJSON($("#acConfigForm input[name='stationStatusEnable']:checked").val()),
			"wtpAutoReboot":$.parseJSON($("#acConfigForm input[name='wtpAutoReboot']:checked").val()),
			"rebooth":$.parseJSON($("#acConfigForm input[name='rebooth']").val()),
			"rebootm":$.parseJSON($("#acConfigForm input[name='rebootm']").val()),
		};
		var D0 = $("#acConfigForm input[name='D0']:checked").val();
		var D1 = $("#acConfigForm input[name='D1']:checked").val();
		var D2 = $("#acConfigForm input[name='D2']:checked").val();
		var D3 = $("#acConfigForm input[name='D3']:checked").val();
		var D4 = $("#acConfigForm input[name='D4']:checked").val();
		var D5 = $("#acConfigForm input[name='D5']:checked").val();
		var D6 = $("#acConfigForm input[name='D6']:checked").val();

		groupinfo.options.wdays = 0;

		if(D0 == "yes") {
			groupinfo.options.wdays += 1;
		}

		if(D1 == "yes") {
			groupinfo.options.wdays += 2;
		}

		if(D2 == "yes") {
			groupinfo.options.wdays += 4;
		}

		if(D3 == "yes") {
			groupinfo.options.wdays += 8;
		}

		if(D4 == "yes") {
			groupinfo.options.wdays += 16;
		}

		if(D5 == "yes") {
			groupinfo.options.wdays += 32;
		}

		if(D6 == "yes") {
			groupinfo.options.wdays += 64;
		}

		var acServers = $("input[class='acServer ipt-text']");
		var acServerValues = new Array();
		for(var j = 0; j < acServers.length; ++j) {
			if(acServers[j].value.length) {
				acServerValues.push(acServers[j].value);
			}
		}
		groupinfo.options.acServers = acServerValues;
		function acConfigCB(json){
			if(json.state == 0) {
				alert("配置保存成功");
			}
		}
		setupACConfig(groupinfo, acConfigCB);
		return false;
	}

	function groupSubmit(){
		var groupinfo = new Object();
		groupinfo.options = {
			"name":$("#groupEditForm #name").val(),
			"macType":$("#groupEditForm #macType").val(),
			"memo":$("#groupEditForm #memo").val(),
		};
		function groupConfigCB() {
			alert("配置保存成功");
			loadGroupTree();
		}
		setupGroup(groupinfo, groupConfigCB);
	}

	function radioSubmit(){
		var radioinfo = new Object();
		radioinfo.options = {
			"groupname":$("#radioEditForm #groupname").val(),
			"wtpname":$("#radioEditForm #wtpname").val(),
			"radioID":parseInt($("#radioEditForm #radioID").val()),
			"hwmode":$("#radioEditForm #hwmode").val(),
			"htmode":$("#radioEditForm #htmode").val(),
			"txpower":parseInt($("#radioEditForm #txpower").val()),
			"minSignal":parseInt($("#radioEditForm #minSignal").val()),
			"channel":parseInt($("#radioEditForm #channel").val()),
		};
		function radioConfigCB(){
			alert("配置保存成功");
			loadGroupTree();
		}
		setupRadio(radioinfo, radioConfigCB);
	}

	function wlanSubmit(){
		var wlaninfo = new Object();
		wlaninfo.options = {
			"groupname":$("#wlanEditForm #groupname").val(),
			"wtpname":$("#wlanEditForm #wtpname").val(),
			"maxStation":parseInt($("#wlanEditForm #maxStation").val() || 0),
			"radioID":parseInt($("#wlanEditForm #radioID").val()),
			"wlanID":parseInt($("#wlanEditForm #wlanID").val()),
			"ssid":$("#wlanEditForm #ssid").val(),
			"encryption":$("#wlanEditForm #encryption").val(),
			"key":$("#wlanEditForm #key").val(),
			"vlanID":parseInt($("#wlanEditForm #vlanID").val() || 0),
			"tunnelMode":parseInt($("#wlanEditForm #tunnelMode").val() || 0),
		};
		function WLanConfigCB(){
			alert("配置保存成功");
			loadGroupTree();
		}
		setupWLan(wlaninfo, WLanConfigCB);
	}

	function wtpSubmit(){
		var wtpinfo = new Object();
		wtpinfo.options = {
			"groupname":$("#wtpEditForm select[name='groupname']").val(),
			"name":$("#wtpEditForm input[name='name']").val(),
			"location":$("#wtpEditForm #location").val(),
			"ipaddr":$("#wtpEditForm #ipaddr").val(),
			"netmask":$("#wtpEditForm #netmask").val(),
			"gateway":$("#wtpEditForm #gateway").val(),
			"dns":[
				$("#wtpEditForm #dns1").val(),
				$("#wtpEditForm #dns2").val(),
			],
		};
		function wtpConfigCB(){
			alert("配置保存成功");
			loadGroupTree();
		}
		setupWTP(wtpinfo, wtpConfigCB);
	}

	function setAddrsSubmit(){
		var wtpinfo = new Object();
		wtpinfo.options = {
			"groupname":$("#setAddrEditForm #groupname").val(),
			"ipaddr":$("#setAddrEditForm #ipaddr").val(),
			"netmask":$("#setAddrEditForm #netmask").val(),
			"gateway":$("#setAddrEditForm #gateway").val(),
			"dns":[
				$("#setAddrEditForm #dns1").val(),
				$("#setAddrEditForm #dns2").val(),
			],
		};
		function autoAddrsCB(json)
		{
			alert("自动设置IP地址成功");
			loadGroupTree();
		}
		setWTPAddrs(wtpinfo, autoAddrsCB);
	}

	function autoChannel(groupname){
		var wtpinfo = new Object();
		wtpinfo.options = {
			"groupname":groupname,
		};
		function autoAdjustCB(json)
		{
			alert("自动优化信道成功");
		}
		wtpChannelAutoAdjust(wtpinfo, autoAdjustCB);
	}

	function showForm(formID)
	{
		$("#configEdit").hide();
		$("#groupEdit").hide();
		$("#radioEdit").hide();
		$("#ssidEdit").hide();
		$("#wtpEdit").hide();
		$("#setAddrsEdit").hide();

		var selector = "#" +formID;
		$(selector).show();
	}

var presubmit = function()
{
	var f = document.forms[0];
	parseSubmitObj(f, "cfgs", gps);
	f.submit();
	$("body input").remove();
}


	function updateForm(data) {
		console.log(data);
		$("#acconfig").forminit(data);
		return;		
	}

	function dumpJsonCB(json, context)
	{
		groups.length = 0;
		groupsname.length = 0;
		var root = [{
			"text": "AP分组",
			"type": "root",
			"children": groups,
		}];

		var groupsObj = json.config.groups;
		for(var key in groupsObj){
			var groupObj = groupsObj[key];
			if(!groupObj)
				continue;
			groupObj.name = key;
			var group = {
				"text": "组:" + key,
				"type": "group",
				"children": [],
				"parameter" : groupObj,
			};
			groups.push(group);
			var groupdefine = {
				"value": key,
			};
			groupsname.push(groupdefine);

			var radiosObj = groupObj.radios;
			var radioID = 0;
			var realRadioID = 0;
			if(!radiosObj) {
				continue;
			}
			for(radioID = 0; radioID < radiosObj.length; ++radioID) {
				var radioObj = radiosObj[radioID];
				if(!radioObj)
					continue;
				radioObj.groupname = key;
				radioObj.wtpname = "";
				var radio = {
					"text": "radio" + (realRadioID),
					"type": "radio",
					"children": [],
					"parameter" : radioObj,
					groupname: key, 
					"radioID": (realRadioID + 1),
				};
				realRadioID = realRadioID + 1;
				group.children.push(radio);
				var wlansObj = radioObj.wlans;
				var wlanID = 0;
				if(!wlansObj) {
					continue;
				}
				for(wlanID = 0; wlanID < wlansObj.length; ++ wlanID) {
					var wlanObj = wlansObj[wlanID];
					var wlan = {
						"text": "wlan" + (wlanID + 1),
						"type": "wlan",
						"children": [],
						"parameter" : wlanObj,
						"groupname": key,
						"radioID": (radioID + 1),
						"wlanID": (wlanID + 1),
					}
					radio.children.push(wlan);
				}
			}
		}
		var wtpsObj = json.config.wtps;
		for(var key in wtpsObj){
			var wtpObj = wtpsObj[key];
			if(!wtpObj)
				continue;
			wtpObj.name = key;
			if(wtpObj.dns && wtpObj.dns[0]) {
				wtpObj.dns1 = wtpObj.dns[0];
			}
			if(wtpObj.dns && wtpObj.dns[1]) {
				wtpObj.dns2 = wtpObj.dns[1];
			}
			var wtp = {
				"text": "AP:" + key,
				"type": "wtp",
				"children": [],
				"parameter" : wtpObj,
			};
			for(var j = 0; j <groups.length; j++) {
				var groupObj = groups[j];
				if(groupObj.parameter.name == wtpObj.groupname) {
					groupObj.children.push(wtp);
				}
			}

			var radiosObj = wtpObj.radios;
			var radioID = 0;
			var realRadioID = 0;
			if(!radiosObj) {
				continue;
			}
			for(radioID = 0; radioID < radiosObj.length; ++radioID) {
				var radioObj = radiosObj[radioID];
				if(!radioObj)
					continue;
				radioObj.wtpname = key;
				radioObj.groupname = "";
				var radio = {
					"text": "radio" + (realRadioID),
					"type": "radio",
					"children": [],
					"parameter" : radioObj,
					"radioID": (realRadioID + 1),
				};
				realRadioID = realRadioID + 1;
				wtp.children.push(radio);
				var wlansObj = radioObj.wlans;
				var wlanID = 0;
				if(!wlansObj)
					continue;
				for(wlanID = 0; wlanID < wlansObj.length; ++ wlanID) {
					var wlanObj = wlansObj[wlanID];
					if(!wlanObj)
						continue;
					var wlan = {
						"text": "wlan" + (wlanID + 1),
						"type": "wlan",
						"children": [],
						"parameter" : wlanObj,
						"groupname": key,
						"radioID": (radioID + 1),
						"wlanID": (wlanID + 1),
					}
					radio.children.push(wlan);
				}
			}
		}

		if(json.config.main) {
			json.config.main.pureACAuth = json.config.main.pureACAuth?"true":"false";
			json.config.main.wtpAutoReboot = json.config.main.wtpAutoReboot?"true":"false";
		}

		var formdata = {
			values: json.config.main,
			domains: {
				default: groupsname,
			},
		};

		var wdays = json.config.main.wdays;

		if(wdays & 64) {
			json.config.main.D6 = "yes";
		} else {
			json.config.main.D6 = "no";
		}

		if(wdays & 32) {
			json.config.main.D5 = "yes";
		} else {
			json.config.main.D5 = "no";
		}

		if(wdays & 16) {
			json.config.main.D4 = "yes";
		} else {
			json.config.main.D4 = "no";
		}

		if(wdays & 8) {
			json.config.main.D3 = "yes";
		} else {
			json.config.main.D3 = "no";
		}

		if(wdays & 4) {
			json.config.main.D2 = "yes";
		} else {
			json.config.main.D2 = "no";
		}

		if(wdays & 2) {
			json.config.main.D1 = "yes";
		} else {
			json.config.main.D1 = "no";
		}

		if(wdays & 1) {
			json.config.main.D0 = "yes";
		} else {
			json.config.main.D0 = "no";
		}

		$("#acConfigForm").forminit2(formdata);

		context.callback.call(context.tree,
				root);
/*
		var j;
		var acServers = json.config.main.acServers;
		if(acServers) {
			for(j = 0; j < acServers.length; ++j) {
				addServerAddr(acServers[j]);
			}
		}
		addServerAddr();
*/
	}

	function acdata(THIS, callback) {
		var context = {
			"callback": callback,
			"tree": THIS,
		};
		//acDump(dumpCB, context);
		acDumpJsonConfig(dumpJsonCB, context);
	}

	function customMenu(node) {
		var items = {};

		var cgroup = {
			"label":"添加组",
			"action":function(data) {
				showForm("groupEdit");
			},
		};

		if(node.type == "root"){
			items.cgroup = cgroup;
		}
		
		var dgroup = {
			"label":"删除组",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);

				console.log(obj);
				var info = {
					name:obj.original.parameter.name,
				}
				groupRemove(info, loadGroupTree);
			}
		};

		if(node.type == "group"){
			items.dgroup = dgroup;
		}

		var egroup = {
			"label":"编辑组",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);

				console.log(obj);
				var data = {
					"title":"编辑组",
				};
				var sectionName = obj.original.parameter.name;

				data.values = obj.original.parameter;
				$("#groupEditForm").forminit2(data);
				showForm("groupEdit");

			},
		};

		if(node.type == "group"){
			items.egroup = egroup;
		}

		var cradio = {
			"label":"添加RADIO",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);

				var data = {
					"title":"添加RADIO",
				};

				data.values = {
					radioID:-1,
				};
				if(node.type == "group")
					data.values.groupname = obj.original.parameter.name;
				else if(node.type == "wtp")
					data.values.wtpname = obj.original.parameter.name;
				$("#radioEditForm").forminit2(data);
				showForm("radioEdit");
			},
		};

		if(node.type == "group" || node.type == "wtp"){
			items.cradio = cradio;
		}

		var dradio = {
			"label":"删除RADIO",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				console.log(obj);
				var groupname = obj.original.parameter.groupname;
				var wtpname = obj.original.parameter.wtpname;
				var radioID = obj.original.radioID;
				var info = {
					options:{
						groupname:groupname,
						wtpname:wtpname,
						radioID:radioID,
					}
				};
				radioRemove(info, loadGroupTree);
				return true;
			},
		};

		if(node.type == "radio"){
			items.dradio = dradio;
		}

		var eradio = {
			"label":"编辑RADIO",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);

				console.log(obj);
				var data = {
					"title":"编辑RADIO",
				};
				var sectionName = obj.original.parameter.name;

				data.values = obj.original.parameter;
				data.values.radioID = obj.original.radioID;
				$("#radioEditForm").forminit2(data);
				showForm("radioEdit");
				
			},
		};

		if(node.type == "radio"){
			items.eradio = eradio;
		}

		var cwlan ={
			"label":"添加SSID",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				var data = {
					"title":"添加SSID",
				};

				data.values = {
						"groupname": obj.original.parameter.groupname,
						"wtpname": obj.original.parameter.wtpname,
						"radioID": obj.original.radioID,
						"wlanID": -1,
					};
				$("#wlanEditForm").forminit2(data);
				showForm("ssidEdit");
			},
		};

		if(node.type == "radio"){
			items.cwlan = cwlan;
		}

		var dwlan = {
			"label":"删除SSID",
			"action":function(data) {
			var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				var info = {
					options: {
						groupname:obj.original.parameter.groupname,
						wtpname:obj.original.parameter.wtpname,
						radioID:obj.original.radioID,
						wlanID:obj.original.wlanID,
					},
				};
				wlanRemove(info, loadGroupTree);
			},
		};
		if(node.type == "wlan"){
			items.dwlan = dwlan;
		}

		var ewlan = {
			"label":"编辑SSID",
			"action":function(data) {
			var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				data.values = obj.original.parameter;
				data.values.radioID = obj.original.radioID;
				data.values.wlanID = obj.original.wlanID;
				$("#wlanEditForm").forminit2(data);
				showForm("ssidEdit");
				console.log(obj);
			},
		};
		if(node.type == "wlan"){
			items.ewlan = ewlan;
		}

		var cwtp ={
			"label":"添加AP配置",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);

				console.log(obj);
				var data = {
					"title":"添加AP配置",
				};
				var formdata = {
					};
				formdata.values = data.values;
				formdata.domains = new Object();
				formdata.domains.groupname = groupsname;
				$("#wtpEditForm").forminit2(formdata);
				data.values = {
						"groupname": obj.original.parameter.name,
					};
				$("#wtpEditForm").forminit2(data);
				showForm("wtpEdit");

			},
		};

		if(node.type == "group"){
			items.cwtp = cwtp;
		}

		
		var addrs ={
			"label":"批量分配地址",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);

				console.log(obj);
				var data = {
					"title":"批量分配地址",
				};

				data.values = {
						"groupname": obj.original.parameter.name,
					};
				$("#setAddrEditForm").forminit2(data);
				showForm("setAddrsEdit");

			},
		};

		if(node.type == "group"){
			items.addrs = addrs;
		}

		var channels ={
			"label":"批量优化信道",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);

				var info = {
					options: {
						groupname: obj.original.parameter.name,
					}
				};
				autoChannel(obj.original.parameter.name);
			},
		};

		if(node.type == "group"){
			items.channels = channels;
		}
		
		var dwtp = {
			"label":"删除AP配置",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				var info = {
					wtpname: obj.original.parameter.name,
				};
				wtpRemove(info, loadGroupTree);
				console.log(obj);
			}
		};

		if(node.type == "wtp" ){
			items.dwtp = dwtp;
		}
		
		var ewtp = {
			"label":"编辑AP配置",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				var sectionName = obj.original.parameter.name;
				var data = {
					"title":"编辑AP配置",
				};
				data.values = obj.original.parameter;
				data.values.section = sectionName;
				$("#wtpEditForm").forminit2(data);
				var formdata = {
					};
				formdata.values = data.values;
				formdata.domains = new Object();
				formdata.domains.groupname = groupsname;
				$("#wtpEditForm").forminit2(formdata);
				showForm("wtpEdit");
			},
		};

		if(node.type == "wtp" ){
			items.ewtp = ewtp;
		}


		return items;
	}

	function loadGroupTree() {
	$('#grouptree').jstree("destroy");
	$('#grouptree').jstree({
		"plugins" : [
			"contextmenu","types"
		],
		"contextmenu":{
			"items":customMenu,
		},
		"types" : {
			"#" : {
				"max_children" : 1, 
				"max_depth" : 4, 
				"valid_children" : ["root"]
			},
			"default": {
			},
			"group" : {
			},
			"wtp" : {
			},
			"radio" : {
			},
			"wlan" : {
			},
			"root" : {
			}
		},
		'core' : {
			'data' :
			function(obj, callback) {
				acdata(this, callback);
			}
		}
	});

	$('#grouptree').on("select_node.jstree", function (e, data) {
		console.log(data);
		if(data.node.type == "group") {
			var info = {};

			info.values = data.node.original.parameter;
			$("#groupEditForm").forminit2(info);

			showForm("groupEdit");
		} else if(data.node.type == "root") {
			showForm("configEdit");
		} else if(data.node.type == "radio") {
			var info = {};
			info.values = data.node.original.parameter;
			info.values.radioID = data.node.original.radioID;
			if(!info.values.minSignal)
				info.values.minSignal = 0;
			$("#radioEditForm").forminit2(info);

			showForm("radioEdit");
		} else if(data.node.type == "wlan") {
			var info = {};
			info.values = data.node.original.parameter;
			info.values.vlanID =  data.node.original.parameter.vlanID || "";
			info.values.radioID = data.node.original.radioID;
			info.values.wlanID = data.node.original.wlanID;
			$("#wlanEditForm").forminit2(info);
			showForm("ssidEdit");
		} else if(data.node.type == "wtp") {
			var info = {};
			info.values = data.node.original.parameter;
			info.domains = {
				groupname:groupsname,
			};
			$("#wtpEditForm").forminit2(info);
			showForm("wtpEdit");
		}
		$("#wifitree").jstree().open_node(data.node);
	});

	}

$(function(){
	loadGroupTree();
});
