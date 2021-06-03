
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

	function classifyDataCB(json, context)
	{
		console.log(json);
		appclassify.length = 0;
/*
		json.classify.root.type = "line";
		json.classify.root.text = json.classify.root.nameCN;

		var j;
		for(j = 0; j < json.classify.root.children.length; j++) {
			var c = json.classify.root.children[j];
			c.type = "line";
			c.text = c.nameCN;
			c.icon = "jstree-file";
		}
*/

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
		//wifidatacb(context, context);
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

	loadAppidenTree();
(function(){

}());