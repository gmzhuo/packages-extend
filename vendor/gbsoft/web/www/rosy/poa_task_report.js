
	var currentPos = 0;
	var currentTotal = 0;
	var plansTable;

	function dumpPlansCB(json, context) {
		if(json.resultCode != 0) {
			return;
		}

		for(var j = 0; j < json.info.wtps.length; ++j){
			//添加一行
			var wtp = json.info.wtps[j];
			holidaysTable.row.add( [ 
					json.info.wtps[j].serial, json.info.wtps[j].totalStationNum,
					json.info.wtps[j].model,
					wtp.vendorID + "-" + wtp.boardID + "-" + wtp.boardReversion,
					json.info.wtps[j].runImageID]).draw( false );
			currentPos++;
		}

		currentTotal = json.info.total;
		if(currentPos >= currentTotal){
			return;
		}

		dumpPlans();
	}

	function dumpPlans() {
		if(currentPos == 0) {
			plansTable.clear();
			plansTable.draw();
		}

		var request = {
			func:"dumpPlans",
			parameter:{
				start:currentPos,
			},
		};

		generalFunction(request, dumpPlansCB);
	}

$(function(){
	plansTable = $('#plans').DataTable({"language": {
				"lengthMenu": "每页 _MENU_ 条记录",
				"zeroRecords": "没有找到记录",
				"info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
				"infoEmpty": "无记录",
				"infoFiltered": "(从 _MAX_ 条记录过滤)",
				"search": "查找",
				"paginate": {
        			"first":      "第一页",
					"last":      "最后一页",
					"next":       "下一页",
					"previous":   "上一页"
    			},
		},});
		$('#plans tbody').on( 'mousedown', 'tr', function (e) {
			if(e.button == 0)
				return;
			if ( $(this).hasClass('selected') ) {
				openWTPEditDialog();
				return true;
			}
		});
		$('#plans tbody').on( 'mousedown', 'tr', function (e) {
			if(e.button != 0)
				return;
			if ( $(this).hasClass('selected') ) {
				plansTable.$('tr.selected').removeClass('selected');
			} else {
				plansTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
			} );
	dumpPlans();
});
