function appidenSetConfig(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"setConfig",
		parameter: {
			options:options,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function appidenDumpConfig(options, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpConfig",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpMeta(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpMeta",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpDefinition(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpDefinition",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addState(stateName, state, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addState",
		parameter:{
			stateName:stateName,
			state:state,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delState(stateName, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delState",
		parameter:{
			stateName:stateName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addMatch(matchName, match, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addMatch",
		parameter:{
			matchName:matchName,
			match:match,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delMatch(matchName, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delMatch",
		parameter:{
			matchName:matchName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addAction(actionName, action, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addAction",
		parameter:{
			actionName:actionName,
			action:action,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delAction(actionName, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delAction",
		parameter:{
			actionName:actionName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addStateMatch(stateName, matchName, newStateName, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addStateMatch",
		parameter:{
			stateName:stateName,
			matchName:matchName,
			newStateName:newStateName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delStateMatch(stateName, matchName,cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delStateMatch",
		parameter:{
			stateName:stateName,
			matchName:matchName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}


function addStateAction(stateName, actionName, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addStateAction",
		parameter:{
			stateName:stateName,
			actionName:actionName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delStateAction(stateName, actionName, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delStateAction",
		parameter:{
			stateName:stateName,
			actionName:actionName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function setStartState(stateName, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"setStartState",
		parameter:{
			stateName:stateName,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function reloadStateMachine(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"reloadStateMachine",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpGraphStateMachine(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpGraphStateMachine",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpGraphStates(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpGraphStates",
	};
        uiapi.jsonRPC("/uiapi", data, cb);
}

function bpfCompile(e, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"bpfCompile",
		parameter: {
			expression:e
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function addTimeGroup(name, times, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addTimeGroup",
		parameter: {
			name:name,
			times:times,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delTimeGroup(name, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delTimeGroup",
		parameter: {
			name:name,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpTimeGroup(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpTimeGroup",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addAppidenGroup(name, appidens, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addAppidenGroup",
		parameter: {
			name:name,
			appidens:appidens,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delAppidenGroup(name, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delAppidenGroup",
		parameter: {
			name:name,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpAppidenGroup(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpAppidenGroup",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addAddrGroup(name, addrs, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addAddrGroup",
		parameter: {
			name:name,
			addrs:addrs,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delAddrGroup(name, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delAddrGroup",
		parameter: {
			name:name,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpAddrGroup(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpAddrGroup",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addAccessControlRule(name, rule, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addAccessControlRule",
		parameter: {
			name:name,
			rule:rule,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delAccessControlRule(name, cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delAccessControlRule",
		parameter: {
			name:name,
		}
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpAccessControlRule(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpAccessControlRule",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function reloadAccessControlRule(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"reloadAccessControlRule",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpGraph(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpGraph",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function storeGraph(graph, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"storeGraph",
		parameter: {
			graph:graph,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}



function addQQWhite(qqNo, memo, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addQQWhite",
		parameter: {
			qqNo:qqNo,
			memo:memo,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function addQQBlack(qqNo, memo, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"addQQBlack",
		parameter: {
			qqNo:qqNo,
			memo:memo,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delQQWhite(qqNo, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delQQWhite",
		parameter: {
			qqNo:qqNo,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function delQQBlack(qqNo, cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"delQQBlack",
		parameter: {
			qqNo:qqNo,
		},
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpQQWhite(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpQQWhite",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpQQBlack(cb)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpQQBlack",
	};
	uiapi.jsonRPC("/uiapi", data, cb);
}

function dumpAppClassify(cb, context)
{
	var uiapi = new uiCore();
	var data = {
		object:"appiden",
		function:"dumpAppClassify",
	};
	uiapi.jsonRPC("/uiapi", data, cb, context);
}

function cloneObject(obj)
{
	var retValue ={};
	for (var key in obj){
		if(obj.hasOwnProperty(key)) {
			retValue[key] = obj[key];
		}
	}

	return retValue;
}

function uniformClassifyParseTreeInfo(parentNode, node, filter, filterContext) {
	if(!node)
		return;

	if(filter && !filter(node, filterContext))
		return;

	var field = {};
	field = cloneObject(node);
	field.children = new Array();
	field.type = "app";
	field.text = node.nameCN;

	var j;

	if(node.children) {
		for(j = 0; j <node.children.length; j++) {
			var c = node.children[j];
			uniformClassifyParseTreeInfo(field.children, c, filter, filterContext);
		}
	} else {
		field.icon = "jstree-file";
	}

	parentNode.push(field);
}

function uniformClassifyDataCB(json, context)
{
	var appclassify = new Array();
	appclassify.length = 0;

	if(json.classify && json.classify.root) {
		uniformClassifyParseTreeInfo(appclassify, json.classify.root,
				context.filter, context.filterContext);
	}

	context.callback.call(context.tree, appclassify);
}

function uniformClassifyData(THIS, callback, filter, filterContext) {
	var context = {
		"callback": callback,
		"tree": THIS,
		"filter": filter,
		"filterContext": filterContext,
	};

	dumpAppClassify(uniformClassifyDataCB, context, new Object());
}
