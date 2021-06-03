
	var currentPos = 0;
	var currentTotal = 0;
	var employeeTable;

	function refreshData()
	{
		currentPos = 0;
		dumpAllEmployee();
	}

	function employeeSubmit(){
		var employeeInfo = new Object();
		function refresLocal(json)
		{
			setTimeout("refreshData();", 2000);
		}
		employeeInfo.options = {
			"id":parseInt($("#employeeEditForm input[name='id']").val()),
			"lastName":$("#employeeEditForm input[name='lastName']").val(),
			"firstName":$("#employeeEditForm input[name='firstName']").val(),
			"idNumber":$("#employeeEditForm input[name='idNumber']").val(),
			"departmentID":parseInt($("#employeeEditForm #departmentID").val()),
			"state":parseInt($("#employeeEditForm #state").val()),
			"entryTime":$("#employeeEditForm #entryTime").val(),
			"phoneNo":$("#employeeEditForm #phoneNo").val(),
		};
		updateEmployee(employeeInfo, refreshData);
	}

	var allEmployees;

	function dumpEmployeeCB(json, context) {
		if(json.state != 0) {
			return;
		}

		allEmployees = new Array();

		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var employee = json.value[j];
			allEmployees[employee.employeeID] = employee;
			employeeTable.row.add( [ 
					employee.employeeID, employee.lastName + employee.firstName,
					employee.state, employee.entryTime, ""]).draw( false );
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
			employeeTable.clear();
			employeeTable.draw();
		}

		dumpEmployee(currentPos, dumpEmployeeCB);
	}

	var departmentDomain;

	function dumpDepartmentCB(json, context) {
		if(json.state != 0) {
			return;
		}

		departmentDomain = new Array();

		for(var j = 0; j < json.value.length; ++j){
			var department = json.value[j];
			departmentDomain.push(
				{
					value:department.id,
					text:department.name,
				}
			);
		}

	}

function openEmployeeEditDialog(data) {
	var itemtemp = $("#employeeEdit").html();
	$("#dialog-employeeEdit").remove();
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
				formdata.values.id = data.employeeID;
			}
			formdata.domains = new Object();
			formdata.domains.departmentID = departmentDomain;
			$("#employeeEditForm").forminit2(formdata);
		},
		buttons: {
			"取消": function() {
				$( this ).dialog( "close" );
				$("#dialog-employeeEdit").remove();
			},

			"确定": function() {
				employeeSubmit();
				$( this ).dialog( "close" );
				$("#dialog-employeeEdit").remove();
			}
     	}
	});
}

function executeEditEmployee() {
	var tr = employeeTable.$('tr.selected');
	if(!tr.length) {
		alert("请点击选择员工后执行编辑");
		return false;
	}
	var key = tr[0].firstChild.innerHTML;
	openEmployeeEditDialog(allEmployees[key]);
	return true;
}

function executeDeleteEmployee() {
	var tr = employeeTable.$('tr.selected');
	if(!tr.length) {
		alert("请点击选择员工后执行删除");
		return false;
	}
	var key = tr[0].firstChild.innerHTML;
	deleteEmployee(parseInt(key), refreshData);
	return true;
}
$(function(){
	employeeTable = $('#employees').DataTable({"language": {
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
		$('#employees tbody').on( 'mousedown', 'tr', function (e) {
			if(e.button != 0)
				return;
			if ( $(this).hasClass('selected') ) {
				employeeTable.$('tr.selected').removeClass('selected');
			} else {
				employeeTable.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
			} );
	dumpAllEmployee();
	dumpDepartment(dumpDepartmentCB);
});
