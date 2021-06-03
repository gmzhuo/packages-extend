	var snatList = new Object();
	snatList.List = new Object();

	function commitSNATSetup()
	{
		var portmapinfo = new Object();
		portmapinfo.section = $("#section").val();
		portmapinfo.options = {
			"enable":$("#enable").val(),
			"oipstart":$("#oipstart").val(),
			"oipend":$("#oipend").val(),
			"nipstart":$("#nipstart").val(),
			"nipend":$("#nipend").val(),
			"oif":$("#oif").val(),
			"nportstart":$("#nportstart").val(),
			"memo":$("#memo").val(),
		};
		function snatSetupCB(json, context) {
			dumpNATOut(snatDataCB, new Object());
		}
		setupNATOut(portmapinfo,  snatSetupCB);
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
					ifacedomain.push({"value":e.options.index, "text":e.name});
				}
			}
		});
		ifacedomain.push({"value":0, "text":"LAN口"});
		ifacedomain.push({"value":256, "text":"所有接口"});
		ifacedomain.push({"value":255, "text":"所有WAN口"});
	}

	function snatDataCB(json, context) {
		$("tr.snat").remove();

		var result = {
			"snats":new Array(),
		};

		snatList.List = new Object();
		
		if(json)
		json.parameter.forEach(function(e) {
			if(e.type == "natout") {
				var snatinfo = e.options;
				snatinfo.section = e.name;
				if(snatinfo.oif == 0) {
					snatinfo.interface = "lan";
				} else if(snatinfo.oif == 256) {
					snatinfo.interface = "所有接口";
				} else if(snatinfo.oif == 255) {
					snatinfo.interface = "所有WAN口";
				} else {
					snatinfo.interface = "WAN" + Snatinfo.oif;
				}

				snatList.List[snatinfo.section] = snatinfo;
				result.snats.push(snatinfo);
			}
		});
		var itemtemp = $("#snats").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#snats").after(Mustache.render(itemtemp, result));

		$( 'a.section-edit' ).click(function( e ){
			var data = {
				"title":"编辑源地址转换",
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
			data.snatinfo = snatList.List[sectionName];
			addSNAT(data);
			return;
		});
		$( 'a.section-delete' ).click(function( e ){
			if(!confirm("确定要删除该规则吗")) {
				return;
			}
			var snatinfo = new Object();
			var sectionName;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					sectionName = attribute.nodeValue;
					break;
				}
			}
			function snatDeleteCB(json, context) {
				dumpNATOut(snatDataCB, new Object());
			}
			snatinfo.section = sectionName;
			var context = new Object();
			deleteNATOut(snatinfo, snatDeleteCB, context)
			return;
		});
	}

	function addSNAT(data)
	{
		var itemtemp = $("#snatEdit").html();
		$("#dialog-snatEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 450,
			modal: true,
			open:function(a, b) {
				var formdata = {
					"domains": {
						"oif": ifacedomain,
					},
				};
				if(data.section) {
					formdata.values = snatList.List[data.section];
				}
				$("#snatEditForm").forminit(formdata);
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-snatEdit").remove();
				},

				"确定": function() {
					commitSNATSetup();
					$( this ).dialog( "close" );
					$("#dialog-snatEdit").remove();
				}
     		}
		});
	}

	function addNATSNAT()
	{
		var data = {
				"title":"添加源地址转换",
			};
			addSNAT(data);
			return;
	}

$(function(){
	dumpNATOut(snatDataCB, new Object());
	interfaceDump(ifacedatacb, new Object());
});

