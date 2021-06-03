
// JavaScript Document
	var ip_iface = {}

	var ruleInfos;
	var result = {
		"firewallrules":new Array(),
	};

	function update_rule_table(result)
	{
		console.log(json);
		$("tr.firewallrule").remove();

		var itemtemp = $("#firewallrules").html();
		console.log(Mustache.render(itemtemp, result));
		$("#firewallrules").after(Mustache.render(itemtemp, result));

		$( 'a.rule-edit' ).click(function( e ){
			var data = {
				"title":"编辑动态域名服务器",
			};
			var sectionName;

			sectionName = $(e.currentTarget).attr('data');

			var info = {
				values: ruleInfos[sectionName].values,
			};
			info.values.section = sectionName;
			updateFormData(info);
			$("#configsave").val("保存");
			return;
		});
		$( 'a.rule-delete' ).click(function( e ){
			if(!confirm("确定要删除吗")) {
				return;
			}
			var ruleinfo = new Object();
			var sectionName;
			ruleinfo.name = $(e.currentTarget).attr('data');
			function deleteFirewallRuleCB(json, context) {
				dumpFirewallRule(filewallRuleDataCB, new Object());
			}
			deleteFirewallRule(ruleinfo, deleteFirewallRuleCB);
			return;
		});
	}

	function firewall_rule_cb(data, status, context) {
		result.firewallrules.length = 0;

		data = data.ParameterList["Device.Firewall.Chain.Rule."];
		for(var keyChain in data) {
			var chainRule = data[keyChain]
			for(var key in chainRule) {
				var rule = chainRule[key]
				var ruleinfo = rule;
				result.firewallrules.push(ruleinfo);
			}
		}

		update_rule_table(result)
	}

	function ip_interface_cb(data, status, context) {
		data = data.ParameterList["Device.IP.Interface."]
		ip_iface = data;
		ifacedomain.length = 0;
		for(var key in data) {
			ifacedomain.push({"value":"Device.IP.Interface." + key + ".", "text":data[key].Alias});
		}
		TR069_RPC("DumpObject", {ObjectName:"Device.Firewall.Chain.Rule."}, firewall_rule_cb);
	}

	function firewallRuleSubmit() {
		var pathname = "Device.Firewall.Chain.[Firewall].Rule.[" + $("input[name='Alias']").val() + "].";
		TR069_RPC_COMPLETE("AddObject", {ObjectName:pathname, SID:2}).then(
			function(value) {
				var values = {};
				values[pathname + "Alias"] = $("input[name='Alias']").val();
				values[pathname + "Enable"] = $("input[name='Enable']:checked").val();
				values[pathname + "Target"] = $("select[name='Target']").val();
				values[pathname + "Order"] = $("select[name='Order']").val();
				values[pathname + "SourceInterface"] = $("select[name='SourceInterface']").val();
				values[pathname + "DestInterface"] = $("select[name='DestInterface']").val();
				values[pathname + "Protocol"] = $("select[name='Protocol']").val();
				values[pathname + "DestIP"] = $("input[name='DestIP']").val();
				values[pathname + "DestIPEnd"] = $("input[name='DestIPEnd']").val();
				values[pathname + "SourceIP"] = $("input[name='SourceIP']").val();
				values[pathname + "SourceIPEnd"] = $("input[name='SourceIPEnd']").val();
				values[pathname + "SourceIP"] = $("input[name='SourceIP']").val();
				values[pathname + "SourcePort"] = $("input[name='SourcePort']").val();
				values[pathname + "SourcePortEnd"] = $("input[name='SourcePortEnd']").val();
				values[pathname + "DestPort"] = $("input[name='DestPort']").val();
				values[pathname + "DestPortEnd"] = $("input[name='DestPortEnd']").val();
				values[pathname + "Description"] = $("input[name='Description']").val();
				var parameters = {
					ParameterList: values,
					SID: 2
				};
				TR069_RPC_COMPLETE("SetParameterValues", parameters).then(
					function(value) {
						return 0;
					}
				);
			}
		);

		return false;
	}

	var ruleInfos;
	function firewall_rule_cb(data)
	{
		var rules = data.ParameterList["Device.Firewall.Chain.[Firewall].Rule."];
		$("tr.firewallrule").remove();

		var result = {
			"firewallrules":new Array(),
		};

		ruleInfos = new Object();

		for(var k in rules) {
			var rule = rules[k];
			result.firewallrules.push(rule);
		}

		var itemtemp = $("#firewallrules").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#firewallrules").after(Mustache.render(itemtemp, result));

		$( 'a.rule-edit' ).click(function( e ){
			var data = {
				"title":"编辑防火墙规则",
			};
			var sectionName;

			sectionName = $(e.currentTarget).attr('data');

			var info = {
				values: ruleInfos[sectionName],
			};

			info.values.section = sectionName;
			updateFormData(info);
			$("#configsave").val("保存");
			return;
		});
		$( 'a.rule-delete' ).click(function( e ){
			if(!confirm("确定要删除吗")) {
				return;
			}

			function deleteFirewallRuleCB(json) {
				TR069_RPC("DumpObject", {ObjectName:"Device.Firewall.Chain.[Firewall].Rule.", Recurse:true}, firewall_rule_cb);
			}

			TR069_RPC("DeleteObject", {ObjectName:$(e.currentTarget).attr('data'), Recurse:true}, filewallRuleDataCB);
			return;
		});
	}

	function updateFormData(info)
	{
		$("#firewallRuleEdit").forminit2(info);
	}
	function onFirewallRuleAdd() {
		var info = {
			Alias:"#",
		};
		updateFormData(info);
		$("#configsave").val("添加");
	}

$(function(){
	TR069_RPC("DumpObject", {ObjectName:"Device.Firewall.Chain.[Firewall].Rule.", Recurse:true}, firewall_rule_cb);
	TR069_RPC_COMPLETE("DumpObject", {ObjectName:"Device.IP.Interface.", Recurse:true}).then(
		function(value) {
			var ifacedomain = [];
			var ifaces = values.ParameterList["Device.IP.Interface."];
			for(var k in ifaces) {
				var ifaceinfo = ifaces[k];
				ifacedomain.push({"value":"Device.IP.Interface.[" + ifaceinfo.Alias + "].", "text":ifaceinfo.Alias});
			}

			var formdata = new Object();
			formdata.domains = {
				"SourceInterface": ifacedomain,
				"SourceInterface": ifacedomain,
			};
			$("#firewallRuleEdit").forminit2(formdata);
		});
});

