function dumpClockOff(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"poa",
		function:"dumpClockOff",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function generalFunction(request, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"poa",
		function:"generalFunction",
		parameter:request,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpPOAConfig(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"poa",
		function:"dumpConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setupPOAGlobal(parameter, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"poa",
		function:"setupGlobal",
		parameter:parameter,
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function updateDepartment(departmentInfo, cb)
{
	var request = {};

	request.func = "updateDepartment";
	request.parameter = departmentInfo;
	generalFunction(request, cb);
}

function deleteDepartment(id, cb)
{
	var request = {};

	request.func = "updateDepartment";
	var departmentInfo = {
		options:{
			delflag:1,
			id:id,
		},
	};
	request.parameter = departmentInfo;
	generalFunction(request, cb);
}

function dumpDepartment(cb) {
	var request = {};
	request.func = "dumpDepartment";
	generalFunction(request, cb);
}

function dumpEmployee(pos, cb) {
	var request = {};

	request.func = "dumpEmployee";
	request.parameter = {
		"start":pos,
	};

	generalFunction(request, cb);
}

function deleteEmployee(id, cb)
{
	var request = {};

	request.func = "updateEmployee";
	var employeeInfo = {
		options:{
			delflag:1,
			id:id,
		},
	}
	request.parameter = employeeInfo;
	generalFunction(request, cb);
}

function updateEmployee(employeeInfo, cb)
{
	var request = {};

	request.func = "updateEmployee";
	request.parameter = employeeInfo;
	generalFunction(request, cb);
}

function dumpMACOwner(pos, cb) {
	var request = {};

	request.func = "dumpMACOwner";
	request.parameter = {
		"start":pos,
	};

	generalFunction(request, cb);
}

function updateMACOwner(macOwnerInfo, cb)
{
	var request = {};

	request.func = "updateMACOwner";
	request.parameter = macOwnerInfo;
	generalFunction(request, cb);
}

function deleteMACOwner(macaddr, cb)
{
	var request = {};

	request.func = "updateMACOwner";
	var macOwnerInfo = {
		options:{
			delflag:1,
			macaddr:macaddr,
		},
	};

	request.parameter = macOwnerInfo;
	generalFunction(request, cb);
}

function dumpWorkTime(pos, cb)
{
	var request = {};

	request.func = "dumpWorkTime";
	request.parameter = {
		"start":pos,
	};

	generalFunction(request, cb);
}

function updateWorkTime(workTimeInfo, cb)
{
	var request = {};

	request.func = "updateWorkTime";
	request.parameter = workTimeInfo;
	generalFunction(request, cb);
}

function deleteWorkTime(year, month, day, cb)
{
	var request = {};

	request.func = "updateWorkTime";
	request.parameter = {
		options: {
			year:year,
			month:month,
			day:day,
			delflag:1,
		},
	};

	generalFunction(request, cb);
}

function dumpClockOff(year, month, cb)
{
	var request = {};

	request.func = "dumpClockOff";
	request.parameter = {
		year:year,
		month:month,
	};

	generalFunction(request, cb);
}

function dumpPlansSum(year, month, cb)
{
	var request = {};

	request.func = "dumpPlansSum";
	request.parameter = {
		year:year,
		month:month,
	};

	generalFunction(request, cb);
}


function dumpDevice(pos, cb) {
	var request = {};

	request.func = "dumpDevice";
	request.parameter = {
		"start":pos,
	};

	generalFunction(request, cb);
}

function updateDevice(deviceInfo, cb)
{
	var request = {};

	request.func = "updateDevice";
	request.parameter = deviceInfo;
	generalFunction(request, cb);
}

function deleteDevice(id, cb)
{
	var request = {};

	request.func = "updateDevice";
	var deviceInfo = {
		options:{
			delflag:1,
			deviceID:id,
		},
	}
	request.parameter = deviceInfo;
	generalFunction(request, cb);
}

function deleteEmployee(id, cb)
{
	var request = {};

	request.func = "updateEmployee";
	var employeeInfo = {
		options:{
			delflag:1,
			id:id,
		},
	}
	request.parameter = employeeInfo;
	generalFunction(request, cb);
}

function updateEmployee(employeeInfo, cb)
{
	var request = {};

	request.func = "updateEmployee";
	request.parameter = employeeInfo;
	generalFunction(request, cb);
}