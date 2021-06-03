
	var radios = new Array();
	radios.radioinfo = new Object();
	var wifiInfo = new Object();
	wifiInfo.radio = new Object();
	wifiInfo.iface = new Object();

	function radioSubmit()
	{
		var PathName = $("input[name='RadioPathName']").val();
		var values = {};
		values[PathName + ".Enable"] = $("#radioEditForm input[name='Enable']:checked").val();
		values[PathName + ".Channel"] = $("#radioEditForm select[name='channel']").val();
		values[PathName + ".OperatingChannelBandwidth"] = $("#radioEditForm select[name='OperatingChannelBandwidth']").val();
		values[PathName + ".OperatingStandards"] = $("#radioEditForm select[name='OperatingStandards']").val();
		values[PathName + ".TransmitPower"] = $("#radioEditForm select[name='TransmitPower']").val();

		function setWirelessCb(data, context) {
			alert("无线参数保存成功,无线需要重新设置，请稍后连接无线");
			$('#wifitree').jstree("destroy");
			loadWifiTree();
		}
		var parameters = {
			ParameterList: values,
			SID: 2
		};

		TR069_RPC("SetParameterValues", parameters, setWirelessCb);
		return false;
	}

	function wlanSubmit()
	{
		var PathName = $("input[name='AccessPointPathName']").val();
		var SSIDReference = $("input[name='SSIDReference']").val();

		var values = {};

		values[PathName + ".Enable"] = $("#wlanEditForm input[name='Enable']:checked").val();
		values[PathName + ".SSIDAdvertisementEnabled"] = $("#wlanEditForm input[name='SSIDAdvertisementEnabled']:checked").val();
		values[SSIDReference + ".SSID"] = $("#wlanEditForm input[name='SSID']").val();
		values[PathName + ".encryption"] = $("#wlanEditForm select[name='encryption']").val();
		values[PathName + ".KeyPassphrase"] = $("#wlanEditForm input[name='KeyPassphrase']").val();
		values[SSIDReference + ".VLAN"] = $("#wlanEditForm input[name='VLAN']").val();
		values[SSIDReference + ".MaxAssociatedDevices"] = $("#wlanEditForm input[name='MaxAssociatedDevices']").val();

		function setWirelessCb(data, context) {
			alert("SSID保存成功,无线需要重新设置，请稍后连接无线");
			$('#wifitree').jstree("destroy");
			loadWifiTree();
				
		}

		var parameters = {
			ParameterList: values,
			SID: 2
		};

		TR069_RPC("SetParameterValues", parameters, setWirelessCb);
		return false;
	}

	function showForm(formID)
	{
		$("#radioEdit").hide();
		$("#ssidEdit").hide();

		var selector = "#" +formID;
		$(selector).show();
	}

	function updateForm(data) {
		console.log(data);
		$("#acconfig").forminit(data);
		return;		
	}

	function customMenu(node) {
		var items = {};

		var eradio = {
			"label":"编辑RADIO",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				var info = {
					radio: obj.original.parameter.name,
				};
				updateForm(info);

				showForm("radioEdit");
				
			},
		};

		if(node.type == "radio"){
			items.eradio = eradio;
		}

		var cwlan ={
			"label":"添加SSID",
			"action":function(data) {
				function accesspointcb(data)
				{
					var pathname = data.Parameter.Instance;
					function ssidcb(data)
					{
						var cvalues = {}
						cvalues[this.pathname + "SSIDReference"] = "Device.WiFi.SSID." + data.Parameter.Instance + ".";
						var parameters = {
							ParameterList: cvalues,
							SID: 2
						};

						function setssidreferenceCb(data)
						{
							showForm("ssidEdit");
							var info = {
								iface: {
									values: {
										SSIDReference: this.SSIDReference,
										pathname: this.pathname,
									}
								}
							};
							updateForm(info);
						}

						TR069_RPC("SetParameterValues", parameters, setssidreferenceCb, 
							{
								pathname:this.pathname,
								SSIDReference:"Device.WiFi.SSID." + data.Parameter.Instance + "."
							});
					}
					TR069_RPC("AddObject", {ObjectName:"Device.WiFi.SSID.", Recurse:true}, accesspointcb, {pathname:pathname});
				}
				TR069_RPC("AddObject", {ObjectName:"Device.WiFi.AccessPoint.", Recurse:true}, accesspointcb, {});
			},
		};

		if(node.type == "access"){
			items.cwlan = cwlan;
		}

		var dwlan = {
			"label":"删除SSID",
			"action":function(data) {
			var inst = jQuery.jstree.reference(data.reference);
				var obj = inst.get_node(data.reference);
				var parameter = obj.original.parameter
				var ssidreference = obj.original.parameter.SSIDReference
				TR069_RPC("DeleteObject", {ObjectName:parameter.pathname, Recurse:true}, loadWifiTree);
				TR069_RPC("DeleteObject", {ObjectName:ssidreference, Recurse:true}, loadWifiTree);
			},
		};
		if(node.type == "ssid"){
			items.dwlan = dwlan;
		}

		var ewlan = {
			"label":"编辑SSID",
			"action":function(data) {
				var inst = jQuery.jstree.reference(data.reference);
				obj = inst.get_node(data.reference);
				var info = {
					radio: obj.original.radio,
					iface: obj.original.iface,
				};
				updateForm(info);
				showForm("ssidEdit");
			},
		};
		if(node.type == "ssid"){
			items.ewlan = ewlan;
		}


		return items;
	}

	function updateForm(data) {
		if(data.radio)
			$("#radioEditForm").forminit2(data.radio);
		if(data.iface)
			$("#wlanEditForm").forminit2(data.iface);
		return;
		
	}

	var radioids = new Array();

	function radiodatacb(json)
	{
		radioids.length = 0;
		var radioinfos = json.ParameterList["Device.WiFi.Radio."];
		for(var k in radioinfos) {
			var radioinfo = radioinfos[k];
			radioids.push(radioinfo);
		}
	}

	function wifidata(THIS, obj, callback) {
		if(obj.id == "#") {
			var node = {
				"text": "无线配置",
				"id": "#",
				"icon": "folder",
				"state": {
					"opened": true,
					"disabled": false,
				},
				"children":[
					{
						"text": "接入点",
						"state": {
							"opened": false,
							"disabled": false,
						},
						"id":"Device.WiFi.AccessPoint.",
						children:true,
						"type":"access",
					},
					{
						"text": "无线设备",
						"state": {
							"opened": false,
							"disabled": false,
						},
						"id":"Device.WiFi.Radio.",
						children:true
					}
				]
			};
			callback.call(obj, node);
			return;
		} else {
			function wifidatacb(data)
			{
				var nodes = [];
				var infos = data.ParameterList[obj.id];
				for(var k in infos) {
					var info = infos[k];
					var node = {
						"text": info.Alias,
						"state": {
							"opened": false,
							"disabled": false,
						},
						"id": obj.id + k + ".",
						"parameter" : info
					};
					nodes.push(node);
					if(obj.id.indexOf("AccessPoint") >= 0) {
						node.type = "ssid";
						node.parameter.pathname = "Device.WiFi.AccessPoint." + k + ".";
						node.parameter.KeyPassphrase = info.Security.KeyPassphrase;
						node.parameter.ModeEnabled = info.Security.ModeEnabled;
						var context = {
							"node": node,
							"id": info.SSIDReference,
							"pid": node.id,
							"parent": obj,
						};
						function ssiddatacb(data) {
							var node = this.node;
							var ssidinfo = data.ParameterList[this.id];
							var parameters = $('#wifitree').jstree().get_node(this.pid).original.parameter;
							for(var k in ssidinfo) {
								if(parameters[k] == undefined) {
									parameters[k] = ssidinfo[k];
								}
							}
						}
						TR069_RPC("DumpObject", {ObjectName:node.parameter.SSIDReference, Recurse:false}, ssiddatacb, context);
					} else {
						node.parameter.pathname = "Device.WiFi.Radio." + k + ".";
						node.type = "radio";
					}
				}
				this.callback.call(this.object, nodes);
			}
			var context = {
				"callback": callback,
				"tree": THIS,
				"object": obj
			};
			TR069_RPC("DumpObject", {ObjectName:obj.id, Recurse:false}, wifidatacb, context);
		}
		
	}

	function loadWifiTree() {
	$('#wifitree').jstree({
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
			"radio" : {
			},
			"ssid" : {
			},
			"access" : {
			}
		},
		'core' : {
			'data' : function(obj, callback) {
				wifidata(this, obj, callback);
			}
		}
	});
	$('#wifitree').on("select_node.jstree", function (e, data) {
		$("#wifitree").jstree().get_container();
		console.log(data);
		if(data.node.type == "radio") {
			showForm("radioEdit");
			var info = {
				radio: {
					values: data.node.original.parameter
				}
			};
			updateForm(info);
		}

		if(data.node.type == "ssid") {
			$("tr.radioid").remove();
			var itemtemp = $("#radios").html();
			console.log(Mustache.render(itemtemp, {radioids: radioids}));
			$("#radios").after(Mustache.render(itemtemp, {radioids: radioids}));

			showForm("ssidEdit");
			var info = {
				iface: {
					values: data.node.original.parameter
				}
			};
			updateForm(info);
		}
		$("#wifitree").jstree().open_node(data.node);
	});
	}

$(function(){
	loadWifiTree();
	TR069_RPC("DumpObject", {ObjectName:"Device.WiFi.Radio.", Recurse:true}, radiodatacb, {});
});
