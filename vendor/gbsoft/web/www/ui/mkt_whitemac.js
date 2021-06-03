
	function macWhiteAddrDumpCB(json)
	{
		console.log(json);
		$("tr.macWhite").remove();

		var result = {
			"macWhites":new Array(),
		};

		var macWhites = json.whiteMACAddrs;
		if(macWhites) {
			for(var key in macWhites) {
				var memo = macWhites[key];
				var macinfo = {
					"macaddr":key,
					"memo":memo,
				};

				result.macWhites.push(macinfo);
			}
		}
		var itemtemp = $("#macWhites").html();
		console.log(Mustache.render(itemtemp, result));
    	$("#macWhites").after(Mustache.render(itemtemp, result));

		$( 'a.mac-white-delete' ).click(function( e ){
			if(!confirm("确定要删除吗")) {
				return;
			}
			var name;

			name = $(e.currentTarget).attr('data');
			function deleteWhiteCB(json, context) {
				dumpWhiteMACAddr(macWhiteAddrDumpCB);
			}
			delWhiteMACAddr(name, deleteWhiteCB);
			return;
		});
	}

(function(){
	dumpWhiteMACAddr(macWhiteAddrDumpCB);
}());
