
//var cfgs = new Array('user|pass|20|100|1|mark','user2|pass|20|100|1|mark','user3|pass|20|100|1|mark');

	var prioDomains = [
		"实时低流量",
		"高等优先低流量",
		"较高优先级",
		"中等优先高流量",
		"较低优先级",
		"最低优先级",
	];
	function qosConfigCommit()
	{
		var options = {
			"enable":$("input[name='enable']:checked").val(),
			"p2psuppress":$("input[name='p2psuppress']:checked").val(),
			
		};
		function configCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
		}
		setupQosConfig(options, configCB);
		return false;
	}

	function commitSpecialAppSetup()
	{
		var options = {
			appiden:{
				appID:parseInt($("#specialAppEditForm input[name='appID']").val()),
				appIDMask:parseInt($("#specialAppEditForm input[name='appIDMask']").val()),
				stateName:$("#specialAppEditForm select[name='stateName']").val(),
			},
			"prio":parseInt($("#specialAppEditForm select[name='prio']").val()),
			"wan":parseInt($("#specialAppEditForm select[name='wan']").val()),
			"nameCN":$("#specialAppEditForm input[name='nameCN']").val()
		};
		var name = $("input[name='name']").val();
		if(name == "") {
			name = $("#specialAppEditForm select[name='stateName']").val();
		}
		function configCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			dumpAppQos(appQosDataCB);
		}
		setupAppQos(name, options, configCB);
		return false;
	}

	function commitHostSpeedSetup()
	{
		var options = {
			"hostipstart":$("#specialHostEditForm input[name='hostipstart']").val(),
			"hostipend":$("#specialHostEditForm input[name='hostipend']").val(),
			"wan":$("#specialHostEditForm select[name='wan']").val(),
			"uprate":$("#specialHostEditForm input[name='uprate']").val(),
			"downrate":$("#specialHostEditForm input[name='downrate']").val(),
			"scalable":$("#specialHostEditForm input[name='scalable']:checked").val(),
		};
		var host = $("#specialHostEditForm input[name='section']").val();
		function configCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			dumpQoSHost(hostQosDataCB);
		}
		setQoSHost(host, options, configCB);
		return false;
	}

	var ifacedomain = new Array();
	function interfaceDumpCB(json)
	{
		ifacedomain.length = 0;
		json.parameter.forEach(function(e) {
			if(e.type == "interface") {
				if(e.options && e.options.index 
					&& parseInt(e.options.index) > 0 && e.options.auto == "1") {
					ifacedomain.push({"value":e.options.index, "text":e.name});
				}
			}
		});
		ifacedomain.push({"value":"256", "text":"所有接口"});
		wanInterfaceInfos = json.parameter;
	}

	var hostSpeedInfos = new Object();

	function editSpecialHost(data) {
		var itemtemp = $("#specialHostEdit").html();
		$("#dialog-specialHostEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		$(itemtemp).dialog({
			resizable: false,
			width: 400,
			modal: true,
			open: function(){
				var formdata = new Object();
				formdata.values = data.info;
				formdata.domains = {
					"wan": ifacedomain,
				};

				$("#specialHostEditForm").forminit2(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-specialHostEdit").remove();
				},

				"确定": function() {
					commitHostSpeedSetup();
					$( this ).dialog( "close" );
					$("#dialog-specialHostEdit").remove();
				}
     		}
		});
	}

	function QosConfigDataCB(json, context) {
		var info = new Object();
		info.values = json.parameter[0].options;
		$("#smartqosMainConfig").forminit2(info);
	}

	var hostSpeedInfos = new Object();
	function hostQosDataCB(json, context) {
		$("tr").remove(".hostinfo");
    	var itemtemp = $("#hostinfos").html();
		var result = {
			"hostinfos":new Array(),
		};
		
		for(var j = 0; j < json.parameter.length; ++j) {
			var e = json.parameter[j];
			if(e.type == "host") {
				var hostinfo = {
					hostipstart:e.options.hostipstart,
					hostipend:e.options.hostipend,
					wan:e.options.wan,
					uprate:e.options.uprate,
					downrate:e.options.downrate,
					scalable:e.options.scalable,
					section:e.name,
				};
				result.hostinfos.push(hostinfo);
				hostSpeedInfos[e.name] = hostinfo;
			}
		}

    	$("#hostinfos").after(Mustache.render(itemtemp, result));
		$( 'a.host-section-edit' ).click(function( e ){
			var data = {
				"title":"编辑例外主机",
			};
			var sectionName;

			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			data.section = sectionName;
			data.info = hostSpeedInfos[sectionName];
			editSpecialHost(data);
			return;
		});
		$( 'a.host-section-delete' ).click(function( e ){
			var data = {
				"title":"删除例外主机",
			};
			var sectionName;
			function deletHostCB(json) {
				dumpQoSHost(hostQosDataCB);
			}

			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					delQoSHost(sectionName, deletHostCB);
					break;
				}
			}
			
			return;
		});
	}

	var appQosInfos = new Object();
	function appQosDataCB(json, context) {
		$("tr").remove(".qppqos");
    	var itemtemp = $("#appqoss").html();
		var result = {
			"appqoss":new Array(),
		};
		for(var key in json.defines){
			var e = json.defines[key];
			if(!e)
				continue;

			var appinfo = e;
			appinfo.appID = e.appiden.appID;
			appinfo.appIDMask = e.appiden.appIDMask;
			appinfo.name = key;
			appinfo.nameCN = e.nameCN;
			if(!appinfo.nameCN || appinfo.nameCN == "") {
				appinfo.nameCN = key;
			}
			appinfo.stateName = e.appiden.stateName;
			appinfo.prioInfo = prioDomains[e.prio];
			appinfo.prio = e.prio;
			if(e.wan < 17) {
				appinfo.wanInfo = "wan" + e.wan;
			} else {
				appinfo.wanInfo = "未指定";
			}
			appinfo.wan = e.wan;

			result.appqoss.push(appinfo);
			appQosInfos[key] = appinfo;
		}

    	$("#appqoss").after(Mustache.render(itemtemp, result));
		$( 'a.app-section-edit' ).click(function( e ){
			var data = {
				"title":"编辑应用规则",
			};
			var sectionName;

			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			data.section = sectionName;
			data.info = appQosInfos[sectionName];
			editSpecialApp(data);
			return;
		});
		$( 'a.app-section-delete' ).click(function( e ){
			var data = {
				"title":"删除应用规则",
			};
			var sectionName;
			function deletAppCB(json) {
				dumpAppQos(appQosDataCB);
			}

			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					delAppQos(sectionName, deletAppCB);
					break;
				}
			}
			
			return;
		});
	}

	function addSpecialHost()
	{
		var data = {
			"title":"添加例外主机规则",
		};
		editSpecialHost(data);
	}

	function editSpecialApp(data) {
		var itemtemp = $("#specialAppEdit").html();
		$("#dialog-specialAppEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		$(itemtemp).dialog({
			resizable: false,
			width: 400,
			modal: true,
			open: function(){
				$("#nameCN").click(
					function() {
						selectApplication(data);
						return false;
					}
				);

				var formdata = new Object();
				formdata.values = data.info;
				formdata.domains = {
					"wan": ifacedomain,
				};
				var stateDomain = new Array();

				stateDomain.push({value: "", text: "匹配应用"});
				for(var key in graphStates) {
					stateDomain.push({value: key, text: key});
				}

				formdata.domains.stateName = stateDomain;
				$("#specialAppEditForm").forminit2(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-specialAppEdit").remove();
				},

				"确定": function() {
					commitSpecialAppSetup();
					$( this ).dialog( "close" );
					$("#dialog-specialAppEdit").remove();
				}
     		}
		});
	}

	function addSpecialApp()
	{
		var data = {
			"title":"添加应用优先与调度规则",
		};
		editSpecialApp(data);
	}

	function updateFormData(info)
	{
		$("#specialAppEditForm").forminit2(info);
	}

	function classifyFilter(node, context)
	{
		for(var key in graphStates) {
			var state = graphStates[key];
			if(state.appiden == 0)
				continue;

			var highIDTarget = node.appID / 0x100000000;
			var highIDMask = node.appIDMask / 0x100000000;
			var highValue = state.appiden / 0x100000000;
			if((highValue & highIDMask) != (highIDTarget & highIDMask))
				continue;

			if((state.appiden & node.appIDMask) == (node.appID & node.appIDMask))
				return true;
		}
		return false;
	}

	function classifydata(THIS, callback) {
		return uniformClassifyData(THIS, callback, classifyFilter);
	}

	function loadAppidenTree() {
		$('#appidentree').jstree({
			"plugins" : [
				"contextmenu","types"
			],
			
			"types" : {
				"#" : {
					"max_children" : 1, 
					"max_depth" : 4, 
					"valid_children" : ["root"]
				},
				"default": {
				},
				"radio" : {
				},
				"ssid" : {
				}
			},
			'core' : {
				'data' : function(obj, callback) {
					//wifidata(this, callback);
					classifydata(this, callback);
				}
			}
		});
		$('#appidentree').on("select_node.jstree", function (e, data) {
			$("#appidentree").jstree().get_container();
			console.log(data);
			if(data.node.original.type == "app") {
				var info = {
					values: {
						name:data.node.original.name,
						nameCN:data.node.original.nameCN,
						appID:data.node.original.appID,
						appIDMask:data.node.original.appIDMask,
					}
				}
				updateFormData(info);
			}
			$("#appidentree").jstree().open_node(data.node);
		});
	}
	function selectApplication(data) {
		var itemtemp = $("#selectApplication").html();
		$("#dialog-selectApplication").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 420,
			modal: true,
			open:function() {
				loadAppidenTree();
			},
			buttons: {
				"确定": function() {
					$( this ).dialog( "close" );
					$("#dialog-selectApplication").remove();
				}
     		}
		});
	}

	var graphStates;
	function graphStatesCB(json)
	{
		graphStates = json.states;
	}
$(function(){
	dumpQosConfig(QosConfigDataCB);
	interfaceDump(interfaceDumpCB);
	dumpQoSHost(hostQosDataCB);
	$('#smartqosMainConfig').bind('submit', qosConfigCommit);
	dumpAppQos(appQosDataCB);
	dumpGraphStates(graphStatesCB);
});

