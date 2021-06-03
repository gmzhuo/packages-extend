
var ddnsServerList = new Object();
ddnsServerList.List = new Object();

	function commitDDNSServerSetup()
	{
		var serverinfo = new Object();
		serverinfo.section = $("#sectionName").val();
		serverinfo.options = {
			"name":$("#name").val(),
			"service_name":$("#service_name").val(),
			"username":$("#username").val(),
			"password":$("#password").val(),
			"check_interval":$("#check_interval").val(),
			"check_unit":"mintues",
			"force_interval":$("#force_interval").val(),
			"force_unit":"hours",
			"interface":$("#interface").val(),
			"enabled":$("input[name='enabled']:checked").val(),
			"domain":$("#domain").val(),
			"interface":$("#interface").val(),
		};
		function ddnsSetupCB(json, context) {
			dumpDDNS(ddnsDataCB, new Object());
		}
		setupDDNS(serverinfo, ddnsSetupCB);
		return false;
	}

	var ifacedomain = new Array();
	function ifacedatacb(json, context)
	{
		console.log(json);
		ifacedomain.length = 0;
		json.parameter.forEach(function(e) {
			if(e.type == "interface") {
				if(e.options && e.options.index 
					&& parseInt(e.options.index) > 0) {
					ifacedomain.push({"value":e.name, "text":e.name});
				}
			}
		});
	}

	var result = {
		"ddnsservers":new Array(),
	};

	function update_ddns_server_list(result) {
		$("tr.ddnsserver").remove();

		var itemtemp = $("#ddnsservers").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#ddnsservers").after(Mustache.render(itemtemp, result));

		$( 'a.server-edit' ).click(function( e ){
			var data = {
				"title":"编辑动态域名服务器",
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
			data.sectionName = sectionName;
			data.serverinfo = ddnsServerList.List[sectionName];
			addDDNSServer(data);
			return;
		});
		$( 'a.server-delete' ).click(function( e ){
			if(!confirm("确定要删除动态域名吗")) {
				return;
			}
			var serverinfo = new Object();
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			function serverDeleteCB(json, context) {
				dumpDDNS(ddnsDataCB, new Object());
			}
			serverinfo.section = sectionName;
			deleteDDNS(serverinfo, serverDeleteCB, context)
			return;
		});
	}


	function ip_interface_cb(data, status, context) {
		data = data.ParameterList["Device.IP.Interface."]
		for (var key in data) {
			var key1 =  "Device.IP.Interface." + key + ".";
			var key2 =  "Device.IP.Interface.[" + data[key].Alias + "].";
			for (var kddns in ddnsServerList.List) {
				var info = ddnsServerList.List[kddns];
				if(info.Interface == key1 || info.Interface == key2) {
					info.interface = data[key].Alias;
				}
			}
		}
		update_ddns_server_list(result);
	}

	function ddns_server_cb(data, status, context) {
		data = data.ParameterList["Device.Service.DDNS.Server."]
		for (var key in data) {
			var key1 =  "Device.Service.DDNS.Server." + key + ".";
			var key2 =  "Device.Service.DDNS.Server.[" + data[key].Alias + "].";
			for (var kddns in ddnsServerList.List) {
				var info = ddnsServerList.List[kddns];
				if(info.Server == key1 || info.Server == key2) {
					info.service_name = data[key].Alias;
				}
			}
		}
		update_ddns_server_list(result);
	}

	function ddnsDataCB(data, status, context) {
		$("tr.ddnsserver").remove();
		result.ddnsservers.length = 0;
		data = data.ParameterList["Device.Service.DDNS.Client."]

		ddnsServerList.List = new Object();

		for (var key in data) {
			var info = data[key];
			var serverinfo = {
				"sectionName": key,
				"Interface": info.Interface,
				"section": key,
				"name": info.Name,
				"domain": info.Hostname,
				"Server": info.Server,
				"username":info.Username,
				"password":info.Password,
				"check_interval":info.Period,
				"force_interval":info.ForceTime,
				"interface":info.Interface,
				"enabled":info.Enable,
			};

			ddnsServerList.List[key] = serverinfo;
			result.ddnsservers.push(serverinfo);
			ddnsServerList.List[key].values = serverinfo;

			TR069_RPC("DumpObject", {ObjectName:"Device.IP.Interface."}, ip_interface_cb);
			TR069_RPC("DumpObject", {ObjectName:"Device.Service.DDNS.Server."}, ddns_server_cb);
		}

		update_ddns_server_list(result);
	}

	function addDDNSServer(data){
		var itemtemp = $("#ddnsServerEdit").html();
		$("#dialog-ddnsServerEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 500,
			modal: true,
			open:function(a, b) {
				var formdata = {
					"domains": {
						"interface": ifacedomain,
					},
				};
				if(data.sectionName) {
					formdata.values = ddnsServerList.List[data.sectionName].values;
				}
				$("#ddnsServerForm").forminit(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-ddnsServerEdit").remove();
				},

				"确定": function() {
					commitDDNSServerSetup();
					$( this ).dialog( "close" );
					$("#dialog-ddnsServerEdit").remove();
				}
     		}
		});
	}

	function btnAddServer(){
		var data = {
			"title":"添加动态域名服务器",
		};
		addDDNSServer(data);
		return;
	}
$(function(){
	TR069_RPC("DumpObject", {ObjectName:"Device.Service.DDNS.Client."}, ddnsDataCB);
});

