	var intervalID = -1; 
	var progressDilagInstance;
	var unLogin = true;
	var waitCloseProgress = false;
	var fakeProgress = 1;
	
	function loginStatusCB(json) {
		if(json.state == 0) {
			unLogin = false;
		} else if(json.state == -3) {
			unLogin = true;
			if(waitCloseProgress) {
				progressDilagInstance.dialog( "close" );
				waitCloseProgress = false;
			}
			window.location.href = "/ui/index.html";
		}
	}

	function checkLoginStatus()
	{
		loginStatus(loginStatusCB);
		if(waitCloseProgress) {
			$("#upgradeProgressbarContainer").progressbar({value: fakeProgress});
			fakeProgress += 2;
		}
	}

	setInterval("checkLoginStatus()", 2000);

	function upgradePosCB(json) {
		if(json.state != 0) {
			$("#dialog-upgradeProgressbar").remove();
			window.clearInterval(intervalID);
			}
		$("#upgradeProgressbarContainer").progressbar({value: json.upgradePos});
		if(json.upgradePos >= 100) {
			//progressDilagInstance.dialog( "close" );
			$("#upgradeProgressbarImfo").text("固件写入成功，等待系统重启");
			clearInterval(intervalID);
			waitCloseProgress = true;
			fakeProgress = 1;
		} else {
			$("#upgradeProgressbarImfo").text("固件正在写入，进度" + json.upgradePos + "%");
		}
	}
	function updatePos() {
		upgradePos(upgradePosCB);
	}

	function commitFirmware()
	{
		var firmwareInfo = new Object();
		firmwareInfo.keep = $('input[name="keep"]:checked').val();
		firmwareInfo.firmware = "firmwareFile";

		var files = new Array();
		var file = {
			name:"firmwareFile",
			file:"firmware",
		}

		var fileObj = document.getElementById("firmwareFile").files[0];
		file.file = fileObj;
		files.push(file);
		function executeCB(json) {
			json = json;
			var itemtemp = $("#upgradeProgressbarScript").html();
			$("#dialog-upgradeProgressbar").remove();
			var data = new Object();
			data.title = "系统升级中...";
			itemtemp = Mustache.render(itemtemp, data);
			console.log(itemtemp);
			$(itemtemp).dialog({
				resizable: false,
				width: 450,
				modal: true,
				open:function(a, b) {
					
					$("#upgradeProgressbarContainer").progressbar({value: 1});
					updatePos();
	
					if(intervalID == -1) {
						intervalID = setInterval("updatePos()", 1000);
					}
					progressDilagInstance = $( this );
				},
				close:function(a, b) {
				},
			});
		}
		function prepareCB(json) {
			if(json.state != 0) {
				alert("升级固件失败");
				return;
			}
			if(json.md5sum2 && (json.md5sum2 != json.md5sum)) {
				alert("检测到文件损坏，放弃升级");
				return;
			}
			var itemtemp = $("#upgradeAssureFormScript").html();
			$("#dialog-upgradeAssure").remove();
			var data = new Object();
			itemtemp = Mustache.render(itemtemp, json);
			console.log(itemtemp);
			$(itemtemp).dialog({
				resizable: false,
				width: 500,
				modal: true,
				open:function(a, b) {
			
				},
				buttons: {
					"取消": function() {
						$( this ).dialog( "close" );
						$("#dialog-login").remove();
					},

					"确定": function() {
						upgradeExecute(executeCB, new Object());
						$( this ).dialog( "close" );
						$("#dialog-upgradeAssure").remove();
					}
     			}
			});
		}
		upgradePrepare(firmwareInfo, files, prepareCB);
		//}
		return false;
	}

	function commitConfig()
	{
		var configInfo = new Object();
		configInfo.config = "config";

		var files = new Array();
		var file = {
			name:"config",
			file:"config",
		}

		var fileObj = document.getElementById("configFile").files[0];
		file.file = fileObj;
		files.push(file);
		function resoreCB(json) {
			json = json;
			if(json.state == 0) {
				showRebootProgress("系统重启中...", "恢复配置文件成功，请使用配置中的地址访问");
			} else {
				alert("恢复配置文件失败");
			}
		}
		configRestore(configInfo, files, resoreCB);
		return false;
	}
	
	function commitConfigBackup()
	{
		function backupCB(json){
			json = json;
			if(json.state == 0) {
				var elemIF = document.createElement("iframe");   
            	elemIF.src = "/conf.bin";   
            	elemIF.style.display = "none";   
            	document.body.appendChild(elemIF);
			}
		}
		configBackup(backupCB);
	}

	function restoredefault()
	{
		function clearConfigCB(json)
		{
			showRebootProgress("系统重启中...", "配置已经清空，请使用缺省地址访问");
		}
		configClear(clearConfigCB);
	}

	function showRebootProgress(title, info)
	{
		var itemtemp = $("#upgradeProgressbarScript").html();
		$("#dialog-upgradeProgressbar").remove();
		var data = new Object();
		data.title = title;
		itemtemp = Mustache.render(itemtemp, data);
		console.log(itemtemp);
		$(itemtemp).dialog({
			resizable: false,
			width: 450,
			modal: true,
			open:function(a, b) {
				$("#dialog-upgradeProgressbar").attr("title", "系统重启...");
				$("#upgradeProgressbarContainer").progressbar({value: 100});
	
				if(intervalID == -1) {
					intervalID = setInterval("updatePos()", 1000);
				}
				progressDilagInstance = $( this );
				$("#upgradeProgressbarImfo").text(info);
				waitCloseProgress = true;
				fakeProgress = 1;
			},
			close:function(a, b) {
			},
		});
	}

	function confirmreboot()
	{
		function rebootCB(json)
		{
			showRebootProgress("系统重启中...", "命令发送成功，等待系统重启");
		}
		rebootSystem(rebootCB);
	}

	function commitFirmwareUI()
	{
		var uiInfo = new Object();
		uiInfo.ui = "ui";
		uiInfo.keep = $('input[name="keepui"]:checked').val();

		var files = new Array();
		var file = {
			name:"ui",
			file:"ui",
		}

		var fileObj = document.getElementById("uiFile").files[0];
		file.file = fileObj;
		files.push(file);

		function CB(json)
		{
			if(json.state == 0) {
				alert("界面成功升级，请刷新显示新的界面");
			}
		}

		uiUpdate(uiInfo, files, CB);
	}

	function commitBackupUI()
	{
		function backupCB(json){
			json = json;
			if(json.state == 0) {
				var elemIF = document.createElement("iframe");   
            	elemIF.src = "/ui.tgz";   
            	elemIF.style.display = "none";   
            	document.body.appendChild(elemIF);
			}
		}
		uiBackup(backupCB);
	}

	function commitBackupFirmware()
	{
		var elemIF = document.createElement("iframe");   
        elemIF.src = "/uiapi/global/backupFirmware/";   
        elemIF.style.display = "none";   
        document.body.appendChild(elemIF);
	}
