// JavaScript Document

(function($) {

// 插件的定义
	$.fn.forminit2 = function(options) {
		var obj = this[0];
		for (var key in options.domains) {
			var items = obj[key];
			if(!items) {
				continue;
			}
			if(items.nodeName != "SELECT") {
				continue;
			}
			$(items).empty();
			var domain = options.domains[key]
			domain.forEach(function(e) {
				var option = "<option value='";
				option += e.value + "' ";

				option += ">";
				if(e.text) {
					option += e.text;
				} else {
					option += e.value;
				}

				option += "</option>";
				$(items).append(option);
			});
		}

		for (var key in options.values) {
			var value = options.values[key];
			var items = obj[key];
			if(!items)
				continue;
			var item;
			if(items[0]) {
				item = items[0];
			} else {
				item = items;
			}
			if(items.type == "select-one") {
				for(var j = 0; j < items.length; ++j) {
					if(items[j].value == value) {
						items[j].selected = true;
					} else {
						items[j].selected = false;
					}
				}
			} else if(item.type == "hidden" ||
				item.type == "text" ||
				item.type == "textarea" ||
				item.type == "password") {
				item.value = value;
			} else if(item.type == "radio") {
				for(var j = 0; j < items.length; ++j) {
					if(items[j].value == value) {
						items[j].checked = true;
					} else {
						items[j].checked = false;
					}
				}
			} else if(item.type == "checkbox") {
				if(item.value == value) {
					item.checked = true;
				} else {
					item.checked = false;
				}
			}
		}
	}



	// 插件的定义
	$.fn.forminit = function(options) {
		var obj = this[0];
		for (var p in obj){
			if(!p || !obj[p])
				continue;
			e = obj[p];
			if(e.nodeName) {
				if(e.nodeName == "INPUT") {
					console.log("got a input");
					if(e.type == "hidden" ||
						e.type == "text" ||
						e.type == "password") {
						if(options.values && options.values[e.name]) {
							e.value = options.values[e.name];
						}
					} else if(e.type == "radio") {
						console.log(e);
						e.checked = false;
						if(options.values && options.values[e.name]) {
							if(e.value == options.values[e.name]) {
								e.checked = true;
							}
						}
					} else if(e.type == "checkbox") {
						if(options.values && options.values[e.name]) {
							var value = options.values[e.name];
							if(typeof(value) == "string") {
								if(e.value == value) {
									e.attributes["checked"] = true;
								}
							} else {
								for(var v in value) {
									if(value[v] == e.value) {
										e.attributes["checked"] = true;
									}
								}
							}
						}
					}
					console.log("finish a input");
				} else if(e.nodeName == "SELECT"){
					console.log("got a select");
					var se = $(e);
					console.log(se);
					var value;
					if(options.values && options.values[e.name]) {
						value = options.values[e.name];
					}
					if(options.domains && options.domains[e.name]) {
						var domain = options.domains[e.name];
						se.children().remove();
						domain.forEach(function(e) {
							var option = "<option value='";
							option += e.value + "' ";
							if(e.value == value) {
								option += "selected";
							}

							option += ">";
							if(e.text) {
								option += e.text;
							} else {
								option += e.value;
							}

							option += "</option>";
							se.append(option);
						});
					} else {
						for (var p in se[0]){
							if(!p || !se[0][p])
								continue;
							var option = se[0][p];
							if(option.nodeName && option.nodeName == "OPTION") {
								if(option.value == value) {
									option.selected = true;
								} else {
									option.selected = false;
								}
							}
							se.change();
						}
					}
					console.log("we finish a select");
					console.log(e);
				} else if(e.nodeName == "BUTTON"){
					console.log("we got button");
					console.log(e);
				}
			}
		}
	}

	function debug($obj) {
		if (window.console && window.console.log) {
			window.console.log('hilight selection count: ' + $obj.size());
		};
	}
})(jQuery);
