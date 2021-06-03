function commitFirmware()
	{
		var firmwareInfo = new Object();
		firmwareInfo.imageID = $("#imageID").val();
		var hardwareInfo = $("#hardwareInfo").val();
		firmwareInfo.memo = $("#memo").val();
		firmwareInfo.pathfile = "firmware"

		var files = new Array();
		var file = {
			name:"firmware",
			file:"aa",
		}

		var reg = /.*-([0-9]{4}-(beta|test|build)-[0-9]{10})-.*/;
		var fileObj = document.getElementById("firmwareFile").files[0];
		var fileImageName = fileObj.name.match(reg);
		if (fileImageName && fileImageName[1])
			firmwareInfo.imageID = fileImageName[1];
		reg = /(.*)-(.*)-(.*)/;
		var hinfos = hardwareInfo.match(reg);
		if(hinfos && hinfos[0] && hinfos[1] && hinfos[2] && hinfos[3]) {
			firmwareInfo.vendorID = parseInt(hinfos[1]);
			firmwareInfo.boardID = hinfos[2];
			firmwareInfo.boardReversion = hinfos[3];
		} else {
			alert("非标准的硬件信息，请参照运行状态-AP列表中的硬件信息填写");
			return false;
		}
		file.file = fileObj;
		files.push(file);
		function addCB(json) {
			dumpFirmware(firmwareCB, new Object());
		}
		addFirmware(firmwareInfo, files, addCB);
		//}
		return false;
	}
	function firmwareCB(json, context) {
		$("tr.firmware").remove();

		if(json) {
			for(var j = 0; j < json.firmwares.length; ++j) {
				json.firmwares[j].index = j;
			}
			var itemtemp = $("#firmwares").html();
			console.log(Mustache.render(itemtemp, json));
			$("#firmwares").after(Mustache.render(itemtemp, json));
		}

		$( 'a.firmware-delete' ).click(function( e ){
			if(!confirm("确定要删除固件吗")) {
				return;
			}
			var index;
			var attributes = e.currentTarget.attributes;
			for(var key =0; key < attributes.length; ++key) {
				var attribute = attributes[key];
				if(attribute.nodeName == "data") {
					index = attribute.nodeValue;
					break;
				}
			}
			function firmwareDeleteCB(json, context) {
				dumpFirmware(firmwareCB, new Object());
			}
			delFirmware(parseInt(index), firmwareDeleteCB)
			return;
		});
	}


(function(){
	dumpFirmware(firmwareCB, new Object());
}());