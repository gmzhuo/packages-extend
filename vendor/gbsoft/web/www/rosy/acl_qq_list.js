// JavaScript Document

	function qqWhiteNoCommit()
	{
		var qqNo = $("#qqWhiteForm input[name='qqNo']").val();
		var memo = $("#qqWhiteForm input[name='memo']").val();

		function whiteCommitCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			dumpQQWhite(qqWhiteNoDumpCB);
		}
		addQQWhite(qqNo, memo, whiteCommitCB);
		return false;
	}

	function qqBlackNoCommit()
	{
		var qqNo = $("#qqBlackForm input[name='qqNo']").val();
		var memo = $("#qqBlackForm input[name='memo']").val();

		function blackCommitCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			dumpQQBlack(qqBlackNoDumpCB);
		}
		addQQBlack(qqNo, memo, blackCommitCB);
		return false;
	}

	function qqWhiteNoDumpCB(json)
	{
		console.log(json);
		$("tr.qqWhite").remove();

		var result = {
			"qqWhites":new Array(),
		};

		var qqWhites = json.qqWhites;
		if(qqWhites) {
			for(var key in qqWhites) {
				var memo = qqWhites[key];
				var qqinfo = {
					"qqNo":key,
					"memo":memo,
				};

				result.qqWhites.push(qqinfo);
			}
		}
		var itemtemp = $("#qqWhites").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#qqWhites").after(Mustache.render(itemtemp, result));

		$( 'a.qq-white-delete' ).click(function( e ){
			if(!confirm("确定要删除吗")) {
				return;
			}
			var name;

			name = $(e.currentTarget).attr('data');
			function deleteWhiteCB(json, context) {
				dumpQQWhite(qqWhiteNoDumpCB);
			}
			delQQWhite(name, deleteWhiteCB);
			return;
		});
	}
	function qqBlackNoDumpCB(json)
	{
		console.log(json);
		$("tr.qqBlack").remove();

		var result = {
			"qqBlacks":new Array(),
		};

		var qqBlacks = json.qqBlacks;
		if(qqBlacks) {
			for(var key in qqBlacks) {
				var memo = qqBlacks[key];
				var qqinfo = {
					"qqNo":key,
					"memo":memo,
				};

				result.qqBlacks.push(qqinfo);
			}
		}
		var itemtemp = $("#qqBlacks").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#qqBlacks").after(Mustache.render(itemtemp, result));

		$( 'a.qq-black-delete' ).click(function( e ){
			if(!confirm("确定要删除吗")) {
				return;
			}
			var name;

			name = $(e.currentTarget).attr('data');
			function deleteBlackCB(json, context) {
				dumpQQBlack(qqBlackNoDumpCB);
			}
			delQQBlack(name, deleteBlackCB);
			return;
		});
	}
(function(){
	dumpQQWhite(qqWhiteNoDumpCB);
	dumpQQBlack(qqBlackNoDumpCB);

	$('#qqWhiteForm').bind('submit', qqWhiteNoCommit);
	$('#qqBlackForm').bind('submit', qqBlackNoCommit);
}());
