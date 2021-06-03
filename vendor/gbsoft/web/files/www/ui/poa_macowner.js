
	var currentPos = 0;
	var currentTotal = 0;
	var macOwnerTable;

	function refreshData()
	{
		currentPos = 0;
		dumpAllMACOwner();
	}

	function macOwnerSubmit(){
		var macOwnerInfo = new Object();
		macOwnerInfo.options = {
			"macaddr":$("#macOwnerEditForm input[name='macaddr']").val(),
			"employeeID":parseInt($("#macOwnerEditForm select[name='employeeID']").val()),
		};
		updateMACOwner(macOwnerInfo, refreshData);
	}

	var allMACInfos;
	function dumpMACOwnerCB(json, context) {
		if(json.state != 0) {
			return;
		}

		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var macInfo = json.value[j];
			allMACInfos[macInfo.macaddr] = macInfo;
			macOwnerTable.row.add( [ 
					macInfo.macaddr, macInfo.employeeID, macInfo.name]).draw( false );
			currentPos++;
		}

		currentTotal = json.info.total;
		if(json.value.length == 0){
			return;
		}

		dumpMACOwner();
	}

	function dumpAllMACOwner() {
		var request = {};
		if(currentPos == 0) {
			macOwnerTable.clear();
			macOwnerTable.draw();
			allMACInfos = new Array();
		}

		dumpMACOwner(currentPos, dumpMACOwnerCB);
	}

	var employeeDomain = new Array();

	function dumpEmployeeCB(json, context) {
		if(json.state != 0) {
			return;
		}

		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var employee = json.value[j];
			employeeDomain.push( {
				value:employee.employeeID,
				text:employee.lastName + employee.firstName,
			});
			currentPos++;
		}

		currentTotal = json.info.total;
		if(json.value.length == 0){
			return;
		}

		dumpAllEmployee();
	}

	function dumpAllEmployee() {
		var request = {};
		if(currentPos == 0) {
			employeeDomain = new Array();
		}

		dumpEmployee(currentPos, dumpEmployeeCB);
	}

function openMACOwnerEditDialog(data) {
	var itemtemp = $("#macOwnerEdit").html();
	$("#dialog-macOwnerEdit").remove();
	itemtemp = Mustache.render(itemtemp, {});
	$(itemtemp).dialog({
		resizable: false,
		width: 450,
		modal: true,
		open:function(a, b) {
			var formdata = {
			};
			if(data) {
				formdata.values = data;
			}
			formdata.domains = new Object();
			formdata.domains.employeeID = employeeDomain;
			$("#macOwnerEditForm").forminit2(formdata);
		},
		buttons: {
			"取消": function() {
				$( this ).dialog( "close" );
				$("#dialog-macOwnerEdit").remove();
			},

			"确定": function() {
				macOwnerSubmit();
				//commitPortmapSetup();
				$( this ).dialog( "close" );
				$("#dialog-macOwnerEdit").remove();
			}
     	}
	});
}

function executeEditMACOwner() {
	var tr = macOwnerTable.$('tr.selected');
	if(!tr.length) {
		alert("请点击选择地址后执行编辑");
		return false;
	}
	var key = tr[0].firstChild.innerHTML;
	openMACOwnerEditDialog(allMACInfos[key]);
	return true;
}

function executeDeleteMACOwner() {
	var tr = macOwnerTable.$('tr.selected');
	if(!tr.length) {
		alert("请点击选择MAC地址后执行删除");
		return false;
	}
	var key = tr[0].firstChild.innerHTML;
	deleteMACOwner(key, refreshData);
	return true;
}
$(function(){
	macOwnerTable = $('#macOwners').DataTable({"language": {
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
		$('#macOwners tbody').on( 'mousedown', 'tr', function (e) {
			if(e.button != 0)
				return;
			if ( $(this).hasClass('selected') ) {
				macOwnerTable.$('tr.selected').removeClass('selected');
			} else {
				macOwnerTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
			} );
	dumpAllMACOwner();
	dumpAllEmployee();
});
