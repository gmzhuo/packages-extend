
	var devicesTable;
	var deviceCurrentPos = 0;
	var employeeCurrentPos = 0;

	function refreshData()
	{
		deviceCurrentPos = 0;
		dumpAllDevice();
	}

	function deviceSubmit(){
		var deviceInfo = new Object();
		deviceInfo.options = {
			"deviceID":parseInt($("#deviceEditForm #deviceID").val()),
			"employeeID":parseInt($("#deviceEditForm select[name='employeeID']").val()),
			"certNo":$("#deviceEditForm #certNo").val(),
			"memo":$("#deviceEditForm #memo").val(),
		};
		updateDevice(deviceInfo, refreshData);
	}

	var allDevice;
	function dumpDeviceCB(json, context) {
		if(json.state != 0) {
			return;
		}
		
		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var device = json.value[j];
			allDevice[device.deviceID] = device;
			devicesTable.row.add( [ 
					device.deviceID, allEmployee[device.employeeID].lastName + allEmployee[device.employeeID].firstName, device.employeeID,
					device.certNo,"",
					'<a data="'+ device.deviceID +'" onClick="applyEditDevice(this)"><img src="images/edit.gif" width="16" height="16"/></a>',
					'<a data="'+ device.deviceID +'" onClick="applyDeleteDevice(this)"><img src="images/remove.gif" width="16" height="16"/></a>']).draw( false );
			deviceCurrentPos++;
		}

		if(json.value.length == 0){
			return;
		}

		//dumpAllDevice();
	}

	function dumpAllDevice() {
		var request = {};

		if(deviceCurrentPos == 0) {
			devicesTable.clear();
			devicesTable.draw();
			allDevice = new Object();
		}

		dumpDevice(deviceCurrentPos, dumpDeviceCB);
	}

	var employeeDomain = new Array();
	var allEmployee = new Object();

	function dumpEmployeeCB(json, context) {
		if(json.state != 0) {
			return;
		}

		if(employeeCurrentPos == 0) {
			dumpAllDevice();
		}

		for(var j = 0; j < json.value.length; ++j){
			//添加一行
			var employee = json.value[j];
			allEmployee[employee.employeeID] = employee;
			employeeDomain.push( {
				value:employee.employeeID,
				text:employee.lastName + employee.firstName,
			});
			employeeCurrentPos++;
		}

		currentTotal = json.info.total;
		if(json.value.length == 0){
			return;
		}

		dumpAllEmployee();
	}

	function dumpAllEmployee() {
		var request = {};
		if(employeeCurrentPos == 0) {
			employeeDomain = new Array();
		}

		dumpEmployee(employeeCurrentPos, dumpEmployeeCB);
	}

	function applyEditDevice(t)
	{
		var info = allDevice[$(t).attr("data")];
		currentPos = 0;
		openDeviceEditDialog(info);
	}

	function applyDeleteDevice(t)
	{
		var key = $(t).attr("data");
		deviceCurrentPos = 0;
		deleteDevice(parseInt(key), dumpAllDevice);
	}

function openDeviceEditDialog(data) {
	var itemtemp = $("#deviceEdit").html();
	$("#dialog-deviceEdit").remove();
	itemtemp = Mustache.render(itemtemp, {});
	$(itemtemp).dialog({
		resizable: false,
		width: 450,
		modal: true,
		open:function(a, b) {
			var formdata = {
			};
			var tr = devicesTable.$('tr.selected');
			formdata.values = data;
			formdata.domains = new Object();
			formdata.domains.employeeID = employeeDomain;
			$("#deviceEditForm").forminit2(formdata);
		},
		buttons: {
			"取消": function() {
				$( this ).dialog( "close" );
				$("#dialog-deviceEdit").remove();
			},

			"确定": function() {
				deviceSubmit();
				//commitPortmapSetup();
				$( this ).dialog( "close" );
				$("#dialog-deviceEdit").remove();
			}
     	}
	});
}
$(function(){
	devicesTable = $('#devices').DataTable({"language": {
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
		
	dumpAllEmployee();
});
