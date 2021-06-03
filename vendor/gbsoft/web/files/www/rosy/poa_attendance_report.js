

var currentPos = 0;
	var currentTotal = 0;
	var clockOffTable;

	function refreshData()
	{
		currentPos = 0;
		dumpClockOff(dumpClockOffCB);
	}

	function dumpClockOffCB(json, context) {
		if(json.state != 0) {
			return;
		}

		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var workTimeInfo = json.value[j];
			clockOffTable.row.add( [ workTimeInfo.year,
					workTimeInfo.month, workTimeInfo.day,
					workTimeInfo.type,workTimeInfo.info]).draw( false );
			currentPos++;
		}

		currentTotal = json.info.total;
	}


$(function(){
	clockOffTable = $('#wtps').DataTable({"language": {
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
		$('#wtps tbody').on( 'mousedown', 'tr', function (e) {
			if(e.button == 0)
				return;
			if ( $(this).hasClass('selected') ) {
				openWTPEditDialog();
				return true;
			}
		});
		$('#wtps tbody').on( 'mousedown', 'tr', function (e) {
			if(e.button != 0)
				return;
			if ( $(this).hasClass('selected') ) {
				wtpDataTable.$('tr.selected').removeClass('selected');
			} else {
				wtpDataTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
			} );
	dumpClockOff(dumpClockOffCB);
});
