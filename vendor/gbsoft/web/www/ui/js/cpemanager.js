var modalData;
var dataProvider ={
	devices:[],
	currentDevice:{},
	currentAccessPath:[],
	currentNodes:[],
	currentFields:[],
	attributes:{},
};

function addField(thisApp, fieldInfo)
{
	thisApp.currentFields.push(fieldInfo);
}

function handleEnumFieldWithInstance(thisApp, fieldInfo)
{
	var options = fieldInfo.Attribute.enum.split(',');
	var enumPromises = [];
	var thisField = fieldInfo;
	for(i = 0; i < options.length; i++) {
		var enumPromise = TR069_RPC_COMPLETE("DumpObject", {ObjectName:options[i]}, fieldInfo);
		enumPromises.push(enumPromise);
	}
	Promise.all(enumPromises).then(
		function(enumResults) {
			var optionInfo = [];
			for(i = 0; i < enumResults.length; ++i) {
				var objectSets = enumResults[i].ParameterList;
				for(key1 in objectSets) {
					if(key1 == "context")
						continue;
					var objects = objectSets[key1]
					for(key2 in objects) {
						var object = objects[key2];
						var pathname = key1 + key2 + ".";
						optionInfo.push({Value:pathname,
							Content:(typeof(object.Alias) == "string" && object.Alias.length > 0) ?
								object.Alias + "("+ pathname + ")": pathname})
	
					}
				}
			}
			if(thisField.Value.length > 0) {
				optionInfo.push({Value:thisField.Value, Content:thisField.Value})
			}
			enumResults[0].context.Attribute.optionInfo = optionInfo;
			addField(thisApp, fieldInfo);
		}
	);
}

function handleEnumFieldWithInstanceValue(thisApp, fieldInfo)
{
	var options = fieldInfo.Attribute.enum.split(',');
	var parameters = [];
	var thisField = fieldInfo;
	for(i = 0; i < options.length; i++) {
		var parameter = options[i];
		var pathsegs = parameter.split('/');
		var level = 0;
		var pathname = ""
		if(pathsegs.length == 1) {
			pathname = pathsegs[0];
		} else {
			for(k = 0; k < pathsegs.length; ++k) {
				if(pathsegs[k] == ".") {
					level = 0;
					break;
				}
				level += 1;
			}

			var length = thisApp.currentAccessPath.length - level;
			for(k = 0; k < length; ++k) {
				pathname = pathname + thisApp.currentAccessPath[k].key + ".";
			}
			pathname += pathsegs[pathsegs.length - 1];
		}
		parameters.push(pathname);
	}
	TR069_RPC_COMPLETE("GetParameterValues", {ParameterNames:parameters}, fieldInfo).then(
		function(result) {
			var values = result.ParameterList;
			var optionInfo = [];
			for (var val in values) {
				var subvalues = values[val].Value.split(',');
				for(k = 0; k < subvalues.length; ++k) {
					if(subvalues[k].length > 0) {
						optionInfo.push({Value:subvalues[k],
							Content:subvalues[k]});
					}
				}
			}
			result.context.Attribute.optionInfo = optionInfo;
			addField(thisApp, fieldInfo);
		}
	);
}

function handleEnumField(thisApp, fieldInfo)
{
	if(fieldInfo.Attribute.mselect === "true") {
		fieldInfo.Value = fieldInfo.Value.split(',');
	}

	if(fieldInfo.Attribute.enumType === "instance") {
		handleEnumFieldWithInstance(thisApp, fieldInfo);
	} else if(fieldInfo.Attribute.enumType === "instanceValue") {
		handleEnumFieldWithInstanceValue(thisApp, fieldInfo);
	} else {
		var options = fieldInfo.Attribute.enum.split(',');
		var optionInfo = [];
		if(options.length > 1) {
			for(index in options) {
				var option = options[index];
				if(option && option.length)
					optionInfo.push({Value:option, Content:option})
			}
		}
		fieldInfo.Attribute.optionInfo = optionInfo;
		addField(thisApp, fieldInfo);
	}
}

function contentUpdate()
{
	var thisApp = this;
	//first we form object path
	var pathname = this.getCurrentPathname();

	//then we dump object path
	var object = TR069_RPC_COMPLETE("DumpObject", {ObjectName:pathname});
	var objectAttributes = TR069_RPC_COMPLETE("DumpObjectAttributes", {ObjectName:pathname});
	this.currentNodes.splice(0);
	this.currentFields.splice(0);
	Promise.all([object, objectAttributes]).then(
		function(result) {
			//update this.currentNodes
			//update this.currentFields
			var object = result[0];
			var attributes = result[1];
			var parameterList = object.ParameterList[pathname];

			if(attributes && attributes.ParameterList && attributes.ParameterList[pathname])
				attributes = attributes.ParameterList[pathname];
			else
				attributes = {};
			thisApp.attributes = attributes.attrs;
			var currentFields = [];

			if(!parameterList)
				return;

			if(thisApp.attributes.multiInst == "yes" && typeof(parameterList["__Instance"]) != "number"){
				for(var key in parameterList) {
					var item = parameterList[key];
					var attribute = attributes[key];
					if(typeof(item) == "object") {
						thisApp.currentNodes.push({key:key, Alias:(typeof(item.Alias) == "string" && item.Alias.length > 0)?item.Alias:""});
					}
				}
				return;
			}

			for(var key in attributes) {
				if(key == "attrs") {
					continue;
				}
				var item = parameterList[key]||"";
				var attribute = attributes[key];
				if(attribute.type == "object") {
					thisApp.currentNodes.push({key:key, Alias:(typeof(item.Alias) == "string" && item.Alias.length > 0)?item.Alias:""});
				} else {
					var fieldInfo = {};
					fieldInfo.Name = key;
					fieldInfo.Value = item;
					fieldInfo.Attribute = attribute;
					if(fieldInfo.Attribute.enum) {
						handleEnumField(thisApp, fieldInfo);
					} else {
						addField(thisApp, fieldInfo);
					}
				}
			}
		}
	);
}

function submitChange()
{
	var pathname = this.getCurrentPathname();
	var values = {}

	for(key in this.currentFields) {
		var row = this.currentFields[key];
		var keypath = pathname + row.Name;
		values[keypath] = row.Value;
		if(this.currentFields[key].Attribute.mselect === "true") {
			var value = ""
			for(i = 0; i < row.Value.length; ++i) {
				value = value + row.Value[i] + ",";
			}
			values[keypath] = value;
		}
	}

	var parameters = {
		ParameterList: values,
		SID: 2
	};

	TR069_RPC_COMPLETE("SetParameterValues", parameters, this).then(
		function(value, context) {
			value.context.pathClick(value.context.currentAccessPath.length);
		}
	);
}


document.addEventListener('frame-loaded', function (ev) {
	var myDate = new Date();
	login("admin", "admin", myDate.getTime()/1000).then(function(data){});
	let lang = "zh";

	jQuery.i18n.properties({
		name: 'strings',
		path: '/ui/language/',
		language: lang,
		cache: false,
		mode: 'map',
		callback: function () {
			for (let i in $.i18n.map) {
				$('[data-lang="' + i + '"]').text($.i18n.map[i]);
			}
			if($.i18n.map['title']) {
				document.title = $.i18n.map['title'];
			}
		}
	});

	modalApp = new Vue({
		el: '#cpeManager',
		data: dataProvider,
		created: function() {
			this.currentAccessPath.push({key:"Device"});
			this.contentUpdate();
		},
		updated: function() {
			jQuery.i18n.properties({
				name: 'strings',
				path: '/ui/language/',
				language: lang,
				cache: false,
				mode: 'map',
				callback: function () {
					for (let i in $.i18n.map) {
						$('[data-lang="' + i + '"]').text($.i18n.map[i]);
					}
					if($.i18n.map['title']) {
						document.title = $.i18n.map['title'];
					}
				}
			});
		},
		methods: {
			getCurrentPathname: function() {
				var pathname = "";
				for(i = 0; i < this.currentAccessPath.length; ++i) {
					pathname = pathname + this.currentAccessPath[i].key + ".";
				}
				return pathname;
			},
			contentUpdate:contentUpdate,
			submitChange:submitChange,
			abortChange:function() {
				this.contentUpdate();
			},
			pathClick:function(index) {
				//splice the currentAccessPath from click position to tail
				this.currentAccessPath.splice(index + 1, 65535);
				//update the content
				this.contentUpdate();
			},
			itemClick:function(index) {
				//update the accessPath to the item clicked
				this.currentAccessPath.push(this.currentNodes[index]);
				//update the content
				this.contentUpdate();
			},
			itemType:function(attribute) {
				if(!attribute)
					return "undefined";
				if(attribute.mselect)
					return "checkbox";
				if(attribute.enum)
					return "enum";
				return attribute.type;
			},
			isWritable:function(attribute) {
				if(attribute.write == "false")
					return false;
				return true;
			},
			itemOptions:function(attribute) {
				var options = attribute.enum.split(',');
				var optionInfo = [];
				if(options.length > 1) {
					for(index in options) {
						var option = options[index];
						if(option && option.length)
							optionInfo.push({Value:option, Content:option})
					}
					return optionInfo;
				}
				return [{Value:"aa", Content:"aac"}, {Value:"bb", Content:"bbc"}];
			},
			isDeletableInstance:function() {
				if(this.attributes.multiInst != "yes")
					return false;
				var length = this.currentAccessPath.length;
				var lastNode = this.currentAccessPath[length - 1];
				var code = lastNode.key.charAt(0);
				if(code >= '0' && code <='9')
					return true;
				return false;
			},
			isMultiInstance:function() {
				if(this.attributes.multiInst != "yes")
					return false;
				var length = this.currentAccessPath.length;
				var lastNode = this.currentAccessPath[length - 1];
				var code = lastNode.key.charAt(0);
				if(code >= '0' && code <='9')
					return false;
				return true;
			},
			addObject: function() {
				var pathname = this.getCurrentPathname();
				TR069_RPC_COMPLETE("AddObject", {ObjectName:pathname, SID:2}, this).then(
						function(value, context) {
							value.context.pathClick(value.context.currentAccessPath.length);
						}
					);
			},
			deleteObject: function() {
				var pathname = this.getCurrentPathname();
				TR069_RPC_COMPLETE("DeleteObject", {ObjectName:pathname, SID:2}, this).then(
						function(value, context) {
							value.context.pathClick(value.context.currentAccessPath.length - 2);
						}
					);
			},
			itemInfo: function(row) {
				var info = row.key;
				if(typeof(row.Alias) == "string" && row.Alias.length > 0)
					info = row.Alias + "(:" + info + ")";
				return info;
			},
			itemNode: function(row) {
				var info = row.key;
				if(typeof(row.Alias) == "string" && row.Alias.length > 0)
					info = "[" + row.Alias + ":" + info + "]";
				return info;
			}
		}
	});
	loginStatus(function(data){
		if(!data.result) {
			var myDate = new Date();
			login("admin", "admin", myDate.getTime()/1000).then(
				function(data) {
				
				}
			);
		}
	});
});