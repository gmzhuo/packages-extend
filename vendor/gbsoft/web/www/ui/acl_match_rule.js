// JavaScript Document
/**Builds the figure panel*/
	function initLight(id){
    	init(id);
	}
	function buildPanel(){
	//var first = true;
	var firstPanel = true;
	for(var setName in figureSets){                            
		var set = figureSets[setName];
                            
		//creates the div that will hold the figures
		var eSetDiv = document.createElement('div');
		eSetDiv.setAttribute('id', setName);
		//eSetDiv.style.border = '1px solid green';
		if(firstPanel) {
			firstPanel = false;
		}
		else{
			eSetDiv.style.display = 'none';
		}
		document.getElementById('figures').appendChild(eSetDiv);
                            
		//add figures to the div
		for(var figure in set['figures']){
			figure = set['figures'][figure];
                                
			var figureFunctionName = 'figure_' + figure.figureFunction;                                
			var figureThumbURL = 'editor/lib/sets/' + setName + '/' + figure.image;
                                
			var eFigure = document.createElement('img');
			eFigure.setAttribute('src', figureThumbURL);
                                
			eFigure.addEventListener('mousedown', function (figureFunction, figureThumbURL){
				return function(evt) {
					evt.preventDefault();
					//Log.info("editor.php:buildPanel: figureFunctionName:" + figureFunctionName);

					createFigure(window[figureFunction], figureThumbURL);
				};
			} (figureFunctionName, figureThumbURL)
				, false);

			//in case use drops the figure
			eFigure.addEventListener('mouseup', function (){
				createFigureFunction = null;    
				selectedFigureThumb = null;
				state = STATE_NONE;
				}
				, false);                                                                                                
                                
                                
				eFigure.style.cursor = 'pointer';
				eFigure.style.marginRight = '5px';
				eFigure.style.marginTop = '2px';
                                
				eSetDiv.appendChild(eFigure);
			}
		}
	}

	function graphDataCB(json) {
		try{
			if(!json.graph)
				return;
			var graph = json.graph;
			STACK = Stack.load(graph['s']);
			canvasProps = CanvasProps.load(graph['c']);
			canvasProps.sync();
			setUpEditPanel(canvasProps);

			CONNECTOR_MANAGER = ConnectorManager.load(graph['m']);
			CONTAINER_MANAGER = ContainerFigureManager.load(graph['p']);
			draw();
		} catch(error) {
			alert("main.js:load() Exception: " + error);
		}
	}

	function reloadGraph() {
		dumpGraph(graphDataCB);
	}

	function graphStoreCB(json) {
		alert("已保存");
	}
	function uploadGraph() {
		if (state == STATE_TEXT_EDITING) {
        	currentTextEditor.destroy();
        	currentTextEditor = null;
        	state = STATE_NONE;
    	}


		var diagram = { c: canvasProps, s:STACK, m:CONNECTOR_MANAGER, p:CONTAINER_MANAGER, v: DIAGRAMO.fileVersion };
		storeGraph(diagram, graphStoreCB);
	}

	var matchArrays = [{Text:'未定义', Value:'undef'}];
	function getMatchArrays()
	{
		return matchArrays;
	}

	function definitionInfoCB(json) {
		json = json;
		matchArrays = [{Text:'未定义', Value:'undef'}];
		if(json.definition) {
			if(json.definition.matchs) {
				matchArrays.length = 0;
				var matchInfos = json.definition.matchs;
				for (var key in matchInfos){
					matchArrays.push({Text:key, Value:key});
				}
			}

		}
	}

	function testGraph()
	{
		function cb(json)
		{
			json = json;
		}
		dumpGraphStateMachine(cb);
	}

	var appclassify = new Array();

	function parseTreeInfo(node) {
		node.type = "line";
		node.text = node.nameCN;
		var j;
		if(node.children) {
			for(j = 0; j <node.children.length; j++) {
				var c = node.children[j];
				parseTreeInfo(c);
			}
			node.type = "app"
		} else {
			node.icon = "jstree-file";
			node.type = "app"
		}
	}

	function classifyDataCB(json, context)
	{
		console.log(json);
		appclassify.length = 0;
/*
		json.classify.root.type = "line";
		json.classify.root.text = json.classify.root.nameCN;

		var j;
		for(j = 0; j < json.classify.root.children.length; j++) {
			var c = json.classify.root.children[j];
			c.type = "line";
			c.text = c.nameCN;
			c.icon = "jstree-file";
		}
*/
		parseTreeInfo(json.classify.root);
		appclassify.push(json.classify.root);

		context.callback.call(context.tree, appclassify);
	}

	function classifydata(THIS, callback) {
		var context = {
			"callback": callback,
			"tree": THIS,
		};
		//wifidatacb(context, context);
		dumpAppClassify(classifyDataCB, context, new Object());
	}

	var currentAppInfo = new Object();
	function loadAppidenTree() {
		$('#appidentree').jstree({
			"plugins" : [
				"contextmenu","types"
			],
			"contextmenu":{
				"items":{
					"create":null,
					"rename":null,
					"remove":null,
					"ccp":null,
				}
			},
			"types" : {
				"#" : {
					"max_children" : 1, 
					"max_depth" : 4, 
					"valid_children" : ["root"]
				},
				"default": {
				},
				"radio" : {
				},
				"ssid" : {
				}
			},
			'core' : {
				'data' : function(obj, callback) {
					//wifidata(this, callback);
					classifydata(this, callback);
				}
			}
		});
		$('#appidentree').on("select_node.jstree", function (e, data) {
			$("#appidentree").jstree().get_container();
			console.log(data);
			if(data.node.original.appID) {
				currentAppInfo = new Object();
				currentAppInfo.appID = data.node.original.appID;
				currentAppInfo.name = data.node.original.name;
				currentAppInfo.nameCN = data.node.original.nameCN;
			}
			$("#appidentree").jstree().open_node(data.node);
		});
	}

	function showAppIDSelectDialog(figureId,property,text){
		var data = {
			"title":"选择APPID",
		};
		var itemtemp = $("#appIDSelect").html();
		$("#dialog-appIDSelect").remove();
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 420,
			modal: true,
			open:function(){
				loadAppidenTree();
			},
			buttons: {
				"取消": function() {
					$( this ).dialog( "close" );
					$("#dialog-appIDSelect").remove();
				},

				"确定": function() {
					updateShape(figureId, property, currentAppInfo);
					if(text)
					text.value = currentAppInfo.nameCN;
					$( this ).dialog( "close" );
					$("#dialog-appIDSelect").remove();
				}
     		}
		});
	}

(function(){
		initLight('');
		buildPanel();
		setFigureSet("appidenstate");
		reloadGraph();
		dumpDefinition(definitionInfoCB);
}());
