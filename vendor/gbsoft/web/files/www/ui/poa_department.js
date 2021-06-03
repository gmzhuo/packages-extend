	var departmentTable;

	function refreshData()
	{
		dumpDepartment(dumpDepartmentCB);
	}

	function departmentSubmit(){
		var departmentInfo = new Object();
		departmentInfo.options = {
			"id":parseInt($("#departmentEditForm #id").val()),
			"name":$("#departmentEditForm input[name='name']").val(),
			"charger":parseInt($("#departmentEditForm select[name='charger']").val()),
			"memo":$("#departmentEditForm input[name='memo']").val(),
		};
		updateDepartment(departmentInfo, refreshData);
	}

	var allDepartments;
	var departmentDomain;

	function dumpDepartmentCB(json, context) {
		if(json.state != 0) {
			return;
		}

		allDepartments = new Array();
		departmentDomain = new Array();
		allDepartments[0] = {
			id:0,
			name:"公司",
			charger:0,
			memo:"",
		};
		departmentDomain.push(
			{
				value:0,
				text:"公司"
			}
		);

		for(var j = 0; j < json.value.length; ++j){
			var department = json.value[j];
			allDepartments[department.id] = department;
			departmentDomain.push(
			{
				value:department.id,
				text:department.name,
			}
		);
		}

		departmentTable.clear();
		departmentTable.draw();

		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var department = json.value[j];
			departmentTable.row.add( [ 
					department.id || 0, department.name || "",
					allDepartments[department.charger].name || "", 
					department.memo || ""]).draw( false );
		}

	}

function openDepartmentEditDialog(data) {
	var itemtemp = $("#departmentEdit").html();
	$("#dialog-departmentEdit").remove();
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
			formdata.domains.charger = departmentDomain;
			$("#departmentEditForm").forminit2(formdata);
		},
		buttons: {
			"取消": function() {
				$( this ).dialog( "close" );
				$("#dialog-departmentEdit").remove();
			},

			"确定": function() {
				departmentSubmit();
				$( this ).dialog( "close" );
				$("#dialog-departmentEdit").remove();
			}
     	}
	});
}

function executeEditDepartment() {
	var tr = departmentTable.$('tr.selected');
	if(!tr.length) {
		alert("请点击选择部门后执行编辑");
		return false;
	}
	var key = tr[0].firstChild.innerHTML;
	openDepartmentEditDialog(allDepartments[key]);
	return true;
}

function executeDeleteDepartment() {
	var tr = departmentTable.$('tr.selected');
	if(!tr.length) {
		alert("请点击选择部门后执行删除");
		return false;
	}
	var key = tr[0].firstChild.innerHTML;
	deleteDepartment(parseInt(key), refreshData);
	return true;
}

$(function(){
	departmentTable = $('#departments').DataTable({"language": {
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
		$('#departments tbody').on( 'mousedown', 'tr', function (e) {
			if(e.button != 0)
				return;
			if ( $(this).hasClass('selected') ) {
				departmentTable.$('tr.selected').removeClass('selected');
			} else {
				departmentTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
			} );
	dumpDepartment(dumpDepartmentCB);
});
