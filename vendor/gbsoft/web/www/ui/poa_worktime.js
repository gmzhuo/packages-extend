
	var currentPos = 0;
	var currentTotal = 0;
	var holidaysTable;

	function refreshData()
	{
		currentPos = 0;
		dumpAllWorkTime();
	}

	function workTimeSubmit(){
		var workTimeInfo = new Object();
		workTimeInfo.options = {
			"year":parseInt($("#specialDayEditForm input[name='year']").val()),
			"month":parseInt($("#specialDayEditForm select[name='month']").val()),
			"day":parseInt($("#specialDayEditForm select[name='day']").val()),
			"type":parseInt($("#specialDayEditForm select[name='type']").val()),
			"info":$("#specialDayEditForm select[name='info']").val(),
		};
		updateWorkTime(workTimeInfo, refreshData);
	}
	
	var allWorkTime;

	function dumpWorkTimeCB(json, context) {
		if(json.state != 0) {
			return;
		}
		allWorkTime = new Object();
		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var workTimeInfo = json.value[j];
			var dayinfo = workTimeInfo.year + '-' + workTimeInfo.month + '-' + workTimeInfo.day;
			allWorkTime[dayinfo] = workTimeInfo;
			holidaysTable.row.add( [ workTimeInfo.year,
					workTimeInfo.month, workTimeInfo.day,
					workTimeInfo.type,workTimeInfo.info,
					'<a data="'+ dayinfo +'" onClick="applyEditWorkTime(this)"><img src="images/edit.gif" width="16" height="16"/></a>',
					'<a data="'+ dayinfo +'" onClick="applyDeleteWorkTime(this)"><img src="images/remove.gif" width="16" height="16"/></a>'
				]).draw( false );
			currentPos++;
		}
		currentTotal = json.info.total;
		if(json.value.length == 0){
			return;
		}

		dumpAllWorkTime();
	}

	function dumpAllWorkTime() {
		if(currentPos == 0) {
			holidaysTable.clear();
			holidaysTable.draw();
		}

		dumpWorkTime(currentPos, dumpWorkTimeCB);
	}

function applyEditWorkTime(t)
{
	openSpecialDayEditDialog(allWorkTime[$(t).attr("data")]);
	return true;
}


function applyDeleteWorkTime(t)
{
	var info = allWorkTime[$(t).attr("data")];
	currentPos = 0;
	deleteWorkTime(info.year, info.month, info.day, dumpAllWorkTime);
	return true;
}

function openSpecialDayEditDialog(data) {
	var itemtemp = $("#specialDayEdit").html();
	$("#dialog-specialDayEdit").remove();
	itemtemp = Mustache.render(itemtemp, {});
	$(itemtemp).dialog({
		resizable: false,
		width: 450,
		modal: true,
		open:function(a, b) {
			var formdata = {
			};
			formdata.values = data;
			formdata.domains = new Object();
			$("#specialDayEditForm").forminit2(formdata);
		},
		buttons: {
			"取消": function() {
				$( this ).dialog( "close" );
				$("#dialog-specialDayEdit").remove();
			},

			"确定": function() {
				workTimeSubmit();
				//commitPortmapSetup();
				$( this ).dialog( "close" );
				$("#dialog-specialDayEdit").remove();
			}
     	}
	});
}
$(function(){
	holidaysTable = $('#holidays').DataTable({"language": {
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
		
	dumpAllWorkTime();
});
