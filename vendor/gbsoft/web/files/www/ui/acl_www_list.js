// JavaScript Document

	function wwwWhiteDomainCommit()
	{
		var wwwDomain = $("#wwwWhiteForm input[name='wwwDomain']").val();
		var memo = $("#wwwWhiteForm input[name='memo']").val();

		function whiteCommitCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			dumpWWWWhite(wwwWhiteNoDumpCB);
		}
		addWWWWhite(wwwDomain, memo, whiteCommitCB);
		return false;
	}

	function wwwBlackDomainCommit()
	{
		var wwwDomain = $("#wwwBlackForm input[name='wwwDomain']").val();
		var memo = $("#wwwBlackForm input[name='memo']").val();

		function blackCommitCB(json)
		{
			if(json.state == 0) {
				alert("配置已保存");
			}
			dumpWWWBlack(qqBlackNoDumpCB);
		}
		addWWWBlack(wwwDomain, memo, blackCommitCB);
		return false;
	}

	function wwwWhiteDomainDumpCB(json)
	{
		console.log(json);
		$("tr.wwwWhite").remove();

		var result = {
			"wwwWhites":new Array(),
		};

		var wwwWhites = json.wwwWhites;
		if(wwwWhites) {
			for(var key in wwwWhites) {
				var memo = wwwWhites[key];
				var wwwinfo = {
					"wwwDomain":key,
					"memo":memo,
				};

				result.wwwWhites.push(wwwinfo);
			}
		}
		var itemtemp = $("#wwwWhites").html();
		console.log(Mustache.render(itemtemp, result));
    		$("#wwwWhites").after(Mustache.render(itemtemp, result));

		$( 'a.www-white-delete' ).click(function( e ){
			if(!confirm("确定要删除吗")) {
					return;
			}
			var name;

			name = $(e.currentTarget).attr('data');
			function deleteWhiteCB(json, context) {
				dumpWWWWhite(wwwWhiteDomainDumpCB);
			}
			delWWWWhite(name, deleteWhiteCB);
			return;
			}
		);
	}
	function wwwBlackDomainDumpCB(json)
	{
		console.log(json);
		$("tr.wwwBlack").remove();

		var result = {
			"wwwBlacks":new Array(),
		};

		var wwwBlacks = json.wwBlacks;
		if(wwwBlacks) {
			for(var key in wwwBlacks) {
				var memo = wwwBlacks[key];
				var wwwinfo = {
					"wwwDomain":key,
					"memo":memo,
				};

				result.wwwBlacks.push(wwwinfo);
			}
		}
		var itemtemp = $("#wwwBlacks").html();
		console.log(Mustache.render(itemtemp, result));
	    	$("#wwwBlacks").after(Mustache.render(itemtemp, result));

		$( 'a.www-black-delete' ).click(function( e ){
				if(!confirm("确定要删除吗")) {
					return;
				}
				var name;

				name = $(e.currentTarget).attr('data');
				function deleteBlackCB(json, context) {
					dumpWWWBlack(wwwBlackDomainDumpCB);
				}
				delWWWBlack(name, deleteBlackCB);
				return;
			}
		);
	}
(function(){
	dumpWWWWhite(wwwWhiteDomainDumpCB);
	dumpWWWBlack(wwwBlackDomainDumpCB);

	$('#wwwWhiteForm').bind('submit', wwwWhiteDomainCommit);
	$('#wwwBlackForm').bind('submit', wwwBlackDomainCommit);
}());

