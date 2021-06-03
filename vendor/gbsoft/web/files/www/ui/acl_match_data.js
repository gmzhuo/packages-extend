	var matchInfos;
	var matchDomain = new Array();

	var matchFunctionDomain = new Array();
	function matchCommit()
	{
		var matchName;
		var match;

		matchName = $("#matchName").val();
		match = {
			matchName:$("#matchName").val(),
			funcName:$("select[name='funcName']").val(),
			memo:$("#memo").val(),
		}

		if(match.funcName == "bpf") {
			var bpfInstruction = new Object();
			bpfInstruction.query = $("#BPF").val();
			match.matchData = bpfInstruction;
		} else if (match.funcName == "l4port") {
			var l4portInfo = new Object();
			l4portInfo.type = $("select[name='portType']").val();
			l4portInfo.dir = $("select[name='portDir']").val();
			var ports = "[" + $("#ports").val() + "]";
			l4portInfo.ports = $.parseJSON(ports);
			match.matchData = l4portInfo;
		} else if (match.funcName == "regular") {
			var regular = new Object();
			regular.regular = $("#regular").val();
			regular.format = $("#format").val();
			match.matchData =regular;
		}

		function matchCommitCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			reloadInfo();
		}

		function bpfCompileCB(json, context)
		{
			if(json.state == 0 && json.insn.length != 0) {
				addMatch(context.matchName, context.match, matchCommitCB);
			} else {
				alert("无效的BPF规则");
			}
		}

		if(match.funcName == "bpf") {
			var context = {
				"matchName":matchName,
				"match": match,
			};
			bpfCompile(match.matchData.query, bpfCompileCB, context);
			return false;
		}
		addMatch(matchName, match, matchCommitCB);
		return false;
	}

	function editMatchData(data) {
		var itemtemp = $("#matchDataEdit").html();
		$("#dialog-matchDataEdit").remove();
		itemtemp = Mustache.render(itemtemp, data);
		$(itemtemp).dialog({
			resizable: false,
			width: 400,
			modal: true,
			open: function(){
				function hideAll()
				{
					$("tr[class='l4portEdit']").hide();
					$("tr[class='bpfEdit']").hide();
					$("tr[class='regularEdit']").hide();
				}
				function funcNameChanged()
				{
					var newFuncName = $("#funcName").val();
					hideAll();
					if(newFuncName == "bpf") {
						$("tr[class='bpfEdit']").show();
					} else if (newFuncName == "l4port") {
						$("tr[class='l4portEdit']").show();
					} else if (newFuncName == "regular") {
						$("tr[class='regularEdit']").show();
					}
				}
				$("#funcName").change(funcNameChanged);
				var formdata = new Object();
				formdata.values = data.info;
				formdata.domains = {
					funcName:matchFunctionDomain,
				};
				$("#matchDataEditForm").forminit2(formdata);
				funcNameChanged();
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-matchDataEdit").remove();
				},

				"确定": function() {
					matchCommit();
					$( this ).dialog( "close" );
					$("#dialog-matchDataEdit").remove();
				}
     		}
		});
	}

	function addSectionEvent() {
		$( 'a.match-section-edit' ).click(function( e ){
			var data = {
				"title":"编辑匹配定义",
			};
			var matchName = $(e.currentTarget).attr("data");
			data.info = matchInfos[matchName];
			editMatchData(data);
			return;
		});
		$( 'a.match-section-delete' ).click(function( e ){
			var data = {
				"title":"删除匹配定义",
			};
			var matchName = $(e.currentTarget).attr("data");
			function delMatchCB(json) {
				json = json;
				reloadInfo();
			}

			delMatch(matchName, delMatchCB);
			return;
		});
	}

	function metaInfoCB(json) {
		json = json;
		var info = {
			states:[],
			matchs:[],
			actions:[],
		};

		$("tr").remove(".match");

		for (var key in matchInfos){
			var data = matchInfos[key];
			if(data.funcName == "bpf") {
				data.BPF = data.matchData.query;
			} else if(data.funcName == "l4port") {
				data.ports = "";
				for(var j = 0; j < data.matchData.ports.length; ++j) {
					data.ports += data.matchData.ports[j];
					if(j < (data.matchData.ports.length - 1))
						data.ports += ","
				}
				data.portType = data.matchData.type;
				data.portDir = data.matchData.dir;
			} else if(data.funcName == "regular") {
				data.regular = data.matchData.regular;
				data.format = data.matchData.format;
			}
			info.matchs.push(matchInfos[key]);
			matchDomain.push({"value":key, "text":key});
		}

    		var itemtemp = $("#matchs").html();
		$("#matchs").after(Mustache.render(itemtemp, info));

		for(var j = 0; j < json.metainfo.matchFunctions.length; j++) {
			var matchFunction = json.metainfo.matchFunctions[j];
			matchFunctionDomain.push({value:matchFunction.funcName, text:matchFunction.funcName, });
		}

		addSectionEvent();
	}
	function definitionInfoCB(json) {
		json = json;

		if(json.definition) {

			if(json.definition.matchs) {
				$.extend(matchInfos, json.definition.matchs);
			}

		}
		dumpMeta(metaInfoCB);
	}

	function clearAll()
	{
		$("tr").remove(".match");
		matchInfos = new Object();
	}
	function reloadInfo()
	{
		clearAll();
		dumpDefinition(definitionInfoCB);
	}
(function(){
	$("#addMathDataBtn").click(
		function() {
			var data = {
				"title":"添加识别数据定义",
			};
			editMatchData(data);
			return false;
		}
	);

	reloadInfo();
}());
