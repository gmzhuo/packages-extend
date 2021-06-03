var tempDir;
var maxFileCount=5;
uploadExtraDataStander={};
 var uploadFiles=[];
$.fn.fileInput = function(uploadUrl,uploadExtraData){
	
	$.ajax({
		url: ctx+"/rest/base/randomDir",
		type: "post",
		dataType: "json",
		async: false, 
		success: function(data){
			tempDir = data.data;
			//init
			uploadExtraData.tempDir=tempDir;
			uploadExtraDataStander=uploadExtraData;
		},
		error: function() {
            top.Modal.alert({ 
        		success:false,
              	msg: "系统错误！",
              	title: '提示',
              	btnok: '确定'});
		}
	});
	
	$(this).fileinput({
		language: 'zh', //设置语言
        textEncoding: 'UTF-8',
        uploadUrl: uploadUrl, //上传的地址
        uploadAsync: true,//异步上传
        uploadExtraData: uploadExtraData,//附加数据
        //allowedPreviewTypes : [ 'image' ],
        //allowedFileTypes: ['image'],
        allowedFileExtensions: ['jpeg','jpg', 'gif', 'png'],//接收的文件后缀,'txt','pdf','docx','doc'
        showUpload: true, //是否显示上传按钮
        showCaption: true,//是否显示标题
        //showBrowse: true,
        //showPreview: true,
        //showRemove: true,
        //showCancel: true,
        //showClose: true,
        //showUploadedThumbs: true,
        browseClass: "btn btn-primary", //按钮样式     
        dropZoneEnabled: false,//是否显示拖拽区域
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        maxFileSize: 2048,//单位为kb，如果为0表示不限制文件大小
        //maxFilePreviewSize: 25600,//25M 预览
        //minFileCount: 0,
        maxFileCount: 5, //表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        //showAjaxErrorDetails: false,
	});
	//导入文件上传完成之后的事件 
	$(this).on("fileuploaded", function (event, data, previewId, index) {
		$(".file-preview .close").css("display","none");
		data=data.response;
		$(".file-live-thumbs .file-preview-success .kv-file-remove").click(function(){
    		var name = $(this).parent().parent().prev().prev().attr("title");
    		var request = {
    				"fileName":name,
    				"tempDir":tempDir,
    				"busyType":uploadExtraData.busyType,
    				"itemType":uploadExtraData.itemType
    		};
    		$.ajax({
			  type: "post",
	          url: ctx+"/rest/base/fileDelete",
	          dataType: "json",
	          data: request,
	          success: function(result){
	          }
		  	});
    	});
		if($(".file-live-thumbs .file-preview-success").length > 5){
			$(".file-live-thumbs .file-uploading").each(function(){
				$(this).remove();
			});
		}
		var successTitles = [];
		$(".file-live-thumbs .file-preview-success").each(function(){
			var title = $(this).find(".file-footer-caption").attr("title");
			//console.log(title);
			var ifrepetition = false;
			for(var index in successTitles){
				if(successTitles[index] == title){
					ifrepetition = true;
					//console.log(ifrepetition);
				}
			}
			if(ifrepetition){
				var $div = $(this);
				top.Modal.alert({
					success: false,
					msg: "相同名字的文件只能上传一个！"
				}).on(function(e){
					$div.remove();
              	});
			}else{
				successTitles.push(title);
			}
		});
	    if(data.code!==200){
	    	//alert(data.content);
		    top.Modal.alert({
				success: false,
				msg: data.content
			});
	    }
	    else
    	{
    		uploadExtraDataStander.files = addFileNames(data.data.files);
    		//console.log(uploadExtraDataStander.tempDir);
    	}
	    	
	});
	$(".file-input .kv-upload-progress").hide();
}


$.fn.fileInputAppr = function(uploadUrl,uploadExtraData){
	
	$.ajax({
		url: ctx+"/rest/base/randomDir",
		type: "post",
		dataType: "json",
		async: false, 
		success: function(data){
			tempDir = data.data;
			//init
			uploadExtraData.tempDir=tempDir;
			uploadExtraDataStander=uploadExtraData;
		},
		error: function() {
            top.Modal.alert({ 
        		success:false,
              	msg: "系统错误！",
              	title: '提示',
              	btnok: '确定'});
		}
	});
	
	$(this).fileinput({
		language: 'zh', //设置语言
        textEncoding: 'UTF-8',
        uploadUrl: uploadUrl, //上传的地址
        uploadAsync: true,//异步上传
        uploadExtraData: uploadExtraData,//附加数据
        //allowedPreviewTypes : [ 'image' ],
        //allowedFileTypes: ['image'],
        //allowedFileExtensions: ['jpeg','jpg', 'gif', 'png'],//接收的文件后缀,'txt','pdf','docx','doc'
        showUpload: true, //是否显示上传按钮
        showCaption: true,//是否显示标题
        //showBrowse: true,
        //showPreview: true,
        //showRemove: true,
        //showCancel: true,
        //showClose: true,
        //showUploadedThumbs: true,
        browseClass: "btn btn-primary", //按钮样式     
        dropZoneEnabled: false,//是否显示拖拽区域
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        maxFileSize: 2048,//单位为kb，如果为0表示不限制文件大小
        //maxFilePreviewSize: 25600,//25M 预览
        //minFileCount: 0,
        maxFileCount: 5, //表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        //showAjaxErrorDetails: false,
	});
	//导入文件上传完成之后的事件 
	$(this).on("fileuploaded", function (event, data, previewId, index) {
		$(".file-preview .close").css("display","none");
		data=data.response;
		//console.log(data);
		$(".file-live-thumbs .file-preview-success .kv-file-remove").click(function(){
			console.log(123131232123);
    		var name = $(this).parent().parent().prev().prev().attr("title");
    		var request = {
    				/*"isAppr":"true",*/
    				"fileName":name,
    				"tempDir":tempDir,
    				"busyType":uploadExtraData.busyType,
    				"itemType":uploadExtraData.itemType
    		};
    		$.ajax({
			  type: "post",
	          url: ctx+"/rest/base/fileDelete",
	          dataType: "json",
	          data: request,
	          success: function(result){
	          }
		  	});
    	});
		if($(".file-live-thumbs .file-preview-success").length > 5){
			$(".file-live-thumbs .file-uploading").each(function(){
				$(this).remove();
			});
		}
		var successTitles = [];
		$(".file-live-thumbs .file-preview-success").each(function(){
			var title = $(this).find(".file-footer-caption").attr("title");
			//console.log(title);
			var ifrepetition = false;
			for(var index in successTitles){
				if(successTitles[index] == title){
					ifrepetition = true;
					//console.log(ifrepetition);
				}
			}
			if(ifrepetition){
				var $div = $(this);
				top.Modal.alert({
					success: false,
					msg: "相同名字的文件只能上传一个！"
				}).on(function(e){
					$div.remove();
              	});
			}else{
				successTitles.push(title);
			}
		});
	    if(data.code!==200){
	    	//alert(data.content);
		    top.Modal.alert({
				success: false,
				msg: data.content
			});
	    }
	    else
    	{
    		uploadExtraDataStander.files = addFileNames(data.data.files);
    		//console.log(uploadExtraDataStander.tempDir);
    	}
	    	
	});
	$(".file-input .kv-upload-progress").hide();
}



$.fn.fileInputAll= function(uploadUrl,uploadExtraData){
	
	$.ajax({
		url: ctx+"/rest/base/randomDir",
		type: "post",
		dataType: "json",
		async: false, 
		success: function(data){
			tempDir = data.data;
			//init
			uploadExtraData.tempDir=tempDir;
			uploadExtraDataStander=uploadExtraData;
		},
		error: function() {
            top.Modal.alert({
        		success:false,
              	msg: "系统错误！",
              	title: '提示',
              	btnok: '确定'});
		}
	});
	
	$(this).fileinput({
		language: 'zh', //设置语言
        textEncoding: 'UTF-8',
        uploadUrl: uploadUrl, //上传的地址
        uploadAsync: true,//异步上传
        uploadExtraData: uploadExtraData,//附加数据
        //allowedPreviewTypes : [ 'image' ],
        //allowedFileTypes: ['image'],
        //allowedFileExtensions: ['jpeg','jpg', 'gif', 'png','txt','pdf','docx','doc'],//接收的文件后缀,'txt','pdf','docx','doc'
        showUpload: true, //是否显示上传按钮
        showCaption: true,//是否显示标题
        //showBrowse: true,
        //showPreview: true,
        //showRemove: true,
        //showCancel: true,
        //showClose: true,
        //showUploadedThumbs: true,
        browseClass: "btn btn-primary", //按钮样式     
        dropZoneEnabled: false,//是否显示拖拽区域
        //minImageWidth: 50, //图片的最小宽度
        //minImageHeight: 50,//图片的最小高度
        //maxImageWidth: 1000,//图片的最大宽度
        //maxImageHeight: 1000,//图片的最大高度
        maxFileSize: 2048,//单位为kb，如果为0表示不限制文件大小
        //maxFilePreviewSize: 25600,//25M 预览
        //minFileCount: 0,
        maxFileCount: 5, //表示允许同时上传的最大文件个数
        enctype: 'multipart/form-data',
        //validateInitialCount:true,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
        //showAjaxErrorDetails: false,
	});
	//导入文件上传完成之后的事件 
	$(this).on("fileuploaded", function (event, data, previewId, index) {
		//console.log(123);
		//console.log(data);
		$(".file-preview .close").css("display","none");
		data=data.response;
		$(".file-live-thumbs .file-preview-success .kv-file-remove").click(function(){
    		var name = $(this).parent().parent().prev().prev().attr("title");
    		var request = {
    				"fileName":name,
    				"tempDir":tempDir,
    				"busyType":uploadExtraData.busyType,
    				"itemType":uploadExtraData.itemType
    		};
    		$.ajax({
			  type: "post",
	          url: ctx+"/rest/base/fileDelete",
	          dataType: "json",
	          data: request,
	          success: function(result){
	          }
		  	});
    	});
	});
	$(".file-input .kv-upload-progress").hide();
}

var addFileNames=function(fileNamesRet)
{
	 
	for(var indexRet in fileNamesRet)
	{
		var hasFile=false;
		for(var index in uploadFiles)
			{
				if(uploadFiles[index]==fileNamesRet[indexRet])
				{
					hasFile=true;
					break;
				}
			}
		if(!hasFile)
			uploadFiles.push(fileNamesRet[indexRet]);	
	}
	return uploadFiles;

}


var popupTip=function(fnc,submitId)
{
	//如果有 还没有上传的附件给出提示
	var allFile = $(".file-live-thumbs .file-preview-frame ").length;
	var successFile = $(".file-live-thumbs .file-preview-success").length;
	var errorFile = $(".file-live-thumbs .file-preview-error").length;
	var NOUPLOAD = allFile-successFile-errorFile;
	
	if(NOUPLOAD != 0){
		top.Modal.confirm({
		    success:false,
        	msg:"还有"+NOUPLOAD+"个附件没有上传，是否不需要上传，继续提交申请？"
		}).on(function(e){
			if(e){
				fnc();
			}else{
				$('#'+submitId).attr("disabled",false);
			}
		});
	} else {
		fnc();
	}
    
}

 
