
	function accessRuleCommit()
	{
		var name = $("input[name='name']").val();
		var rule = new Object;

		rule.status = $("input[name='status']:checked").val();
		rule.action = $("select[name='action']").val();
		rule.prio = $("select[name='prio']").val();
		rule.addr = "0";
		rule.addrInfo = {};
		rule.addrInfo.ipstart = $("input[name='ipstart']").val();
		rule.addrInfo.ipend = $("input[name='ipend']").val();
		rule.time = "0";
		rule.timeInfo = {};
		rule.timeInfo.starth = $("input[name='starth']").val();
		rule.timeInfo.startm = $("input[name='startm']").val();
		rule.timeInfo.endh = $("input[name='endh']").val();
		rule.timeInfo.endm = $("input[name='endm']").val();
		rule.appiden = "0";
		rule.appidenInfo = {};
		rule.appidenInfo.nameCN = $("input[name='nameCN']").val();
		rule.appidenInfo.appID = $("input[name='appID']").val();
		rule.appidenInfo.appIDMask = $("input[name='appIDMask']").val();
		rule.desc = $("input[name='desc']").val();

		var wday = 0;

		if($("input[name='D0']:checked").val() == "yes") {
			wday += 1;
		}

		if($("input[name='D1']:checked").val() == "yes") {
			wday += 2;
		}

		if($("input[name='D2']:checked").val() == "yes") {
			wday += 4;
		}

		if($("input[name='D3']:checked").val() == "yes") {
			wday += 8;
		}
		
		if($("input[name='D4']:checked").val() == "yes") {
			wday += 16;
		}

		if($("input[name='D5']:checked").val() == "yes") {
			wday += 32;
		}
		
		if($("input[name='D6']:checked").val() == "yes") {
			wday += 64;
		}

		rule.timeInfo.wday = wday;

		function configCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			dumpAccessControlRule(accessControlRuleDataCB);
		}
		addAccessControlRule(name, rule, configCB);
		return false;
	}

	var accessControlRules;
	var addrGroupDomain;
	var appidenGroupDomain;
	var timeGroupDomain;

	function accessControlRuleDataCB(json)
	{
		console.log(json);
		$("tr.accessrule").remove();

		var result = {
			"accessrules":new Array(),
		};

		accessControlRules = json.rules;
		if(accessControlRules) {
			for(var key in accessControlRules) {
				var info = accessControlRules[key];
				accessControlRules[key].name = key;
				var ruleinfo = {
					"name":key,
					"prio":info.prio,
					"action":info.action,
					"desc":info.desc,
					"status":info.status
				};

				if(info.addrInfo) {
					accessControlRules[key].ipstart = info.addrInfo.ipstart;
					accessControlRules[key].ipend = info.addrInfo.ipend;
				}

				if(info.appidenInfo) {
					accessControlRules[key].nameCN = info.appidenInfo.nameCN;
					accessControlRules[key].appID = info.appidenInfo.appID;
					accessControlRules[key].appIDMask = info.appidenInfo.appIDMask;
				}

				var wday = 0;
				if(info.timeInfo) {
					accessControlRules[key].starth = info.timeInfo.starth;
					accessControlRules[key].startm = info.timeInfo.startm;
					accessControlRules[key].endh = info.timeInfo.endh;
					accessControlRules[key].endm = info.timeInfo.endm;
					wday = parseInt(info.timeInfo.wday) || 0;
				}

				if(((wday >> 0)%2) == 1) {
					accessControlRules[key].D0 = "yes";
				} else {
					accessControlRules[key].D0 = "no";
				}

				if(((wday >> 1)%2) == 1) {
					accessControlRules[key].D1 = "yes";
				} else {
					accessControlRules[key].D1 = "no";
				}

				if(((wday >> 2)%2) == 1) {
					accessControlRules[key].D2 = "yes";
				} else {
					accessControlRules[key].D2 = "no";
				}

				if(((wday >> 3)%2) == 1) {
					accessControlRules[key].D3 = "yes";
				} else {
					accessControlRules[key].D3 = "no";
				}

				if(((wday >> 4)%2) == 1) {
					accessControlRules[key].D4 = "yes";
				} else {
					accessControlRules[key].D4 = "no";
				}

				if(((wday >> 5)%2) == 1) {
					accessControlRules[key].D5 = "yes";
				} else {
					accessControlRules[key].D5 = "no";
				}

				if(((wday >> 6)%2) == 1) {
					accessControlRules[key].D6 = "yes";
				} else {
					accessControlRules[key].D6 = "no";
				}
				result.accessrules.push(ruleinfo);
			}
		}
		var itemtemp = $("#accessrules").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#accessrules").after(Mustache.render(itemtemp, result));

		$( 'a.rule-edit' ).click(function( e ){
			var name;

			name = $(e.currentTarget).attr('data');

			var data = {
				"title":"添加行为管理规则",
			};
			

			data.values = accessControlRules[name];
			editACLRule(data);
			
			return;
		});
		$( 'a.rule-delete' ).click(function( e ){
			if(!confirm("确定要删除吗")) {
				return;
			}
			var name;

			name = $(e.currentTarget).attr('data');
			function deleteRuleCB(json, context) {
				dumpAccessControlRule(accessControlRuleDataCB);
			}
			delAccessControlRule(name, deleteRuleCB);
			return;
		});
	}

	var appclassify = new Array();

	function parseTreeInfo(node) {
		node.type = "app";
		node.text = node.nameCN;
		var j;
		if(!node)
			return;
		if(node.children) {
			for(j = 0; j <node.children.length; j++) {
				var c = node.children[j];
				parseTreeInfo(c);
			}
		} else {
			node.icon = "jstree-file";
		}
	}

	function updateFormData(info)
	{
		$("#ACLRuleEditForm").forminit2(info);
	}

	function classifyDataCB(json, context)
	{
		console.log(json);
		appclassify.length = 0;

		if(json.classify && json.classify.root) {
			parseTreeInfo(json.classify.root);
			appclassify.push(json.classify.root);
		}

		context.callback.call(context.tree, appclassify);
	}

	function classifydata(THIS, callback) {
		var context = {
			"callback": callback,
			"tree": THIS,
		};
		dumpAppClassify(classifyDataCB, context, new Object());
	}

	function loadAppidenTree() {
		$('#appidentree').jstree({
			"plugins" : [
				"contextmenu","types"
			],
			"contextmenu":{
				"items":{
					"create":null,
					"rename":null,
					"remove":null,
					"ccp":null,
					"cssid":{
						"label":"创建SSID",
						"action":function(data) {
							var inst = jQuery.jstree.reference(data.reference);
							obj = inst.get_node(data.reference);

							console.log(obj);

							var data = {
								radio: obj.original.text,
							};
							updateForm(data);
						},
						"_disabled":function(data) {
							var inst = jQuery.jstree.reference(data.reference);
							var obj = inst.get_node(data.reference);
							if(obj.type == "radio")
								return false;
							return true;
						}
					},
					"dssid":{
						"label":"删除SSID",
						"action":function(data) {
							var inst = jQuery.jstree.reference(data.reference);
							obj = inst.get_node(data.reference);

							console.log(obj);
							delWireless(obj.original.iface, function(json){
								$('#wifitree').jstree("destroy");
								loadWifiTree();
								console.log(json);
							});
						},
						"_disabled":function(data) {
							var inst = jQuery.jstree.reference(data.reference);
							var obj = inst.get_node(data.reference);
							if(obj.type == "ssid")
								return false;
							return true;
						}
					},
				}
			},
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

	function editACLRule(data) {
		var itemtemp = $("#ACLRuleEdit").html();
		$("#dialog-ACLRuleEdit").remove();
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
				$("#ACLRuleEditForm").forminit2(data);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-ACLRuleEdit").remove();
				},

				"确定": function() {
					accessRuleCommit();
					$( this ).dialog( "close" );
					$("#dialog-ACLRuleEdit").remove();
				}
     		}
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
	
(function(){
	$("#addACLRuleBtn").click(
		function() {
			var data = {
				"title":"添加行为管理规则",
			};
			editACLRule(data);
			return false;
		}
	);

	dumpAccessControlRule(accessControlRuleDataCB);
}());