(function () {
  window.Modal = function () {
    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
    var alr = $("#ycf-alert");
    var ahtml = alr.html();
    var _alert = function (options) {
      alr.html(ahtml);	// 复原
      if(options.success){
    	  alr.find('.ok').removeClass('btn-info').addClass('btn-success');
    	  alr.find('.modal-header').addClass('btn-success');
    	  //此处加style 因为样式被外层框架覆盖掉了
    	  alr.find('.modal-header,.ok').attr('style','background-color: #5cb85c; border-color: #4cae4c;color: #FFF;');
    	  options.title = "成功";
      }else{
    	  alr.find('.ok').removeClass('btn-info').addClass('btn-danger');
    	  alr.find('.modal-header').addClass('btn-danger');
    	  //此处加style 因为样式被外层框架覆盖掉了
    	  alr.find('.modal-header,.ok').attr('style','background-color: #d9534f; border-color: #d43f3a;color: #FFF;');
    	  options.title = "警告";
      }
      
      alr.find('.cancel').hide();
      _dialog(options);

      return {
        on: function (callback) {
          if (callback && typeof callback == "function") {
            alr.find('.ok').click(function () { callback(true) });
          }
        }
      };
    };

    var _confirm = function (options) {
      alr.html(ahtml); // 复原
      alr.find('.ok').removeClass('btn-info').addClass('btn-danger');
      alr.find('.cancel').show();
      _dialog(options);

      return {
        on: function (callback) {
          if (callback && typeof callback == "function") {
            alr.find('.ok').click(function () { callback(true) });
            alr.find('.cancel').click(function () { callback(false) });
          }
        }
      };
    };

    var _dialog = function (options) {
      var ops = {
    	success:false,	  
        msg: "提示内容",
        title: "操作提示",
        btnok: "确定",
        btncl: "取消"
      };

      $.extend(ops, options);
      var html = alr.html().replace(reg, function (node, key) {
        return {
          Title: ops.title,
          Message: ops.msg,
          BtnOk: ops.btnok,
          BtnCancel: ops.btncl
        }[key];
      });
      
      alr.html(html);
      alr.modal({
        width: 500,
        backdrop: 'static'
      });
    }
    
    var _load = function(load){
    	if(load)
    		$("#load_wait_div").css("display","block");
    	else
    		$("#load_wait_div").css("display","none");
    }
    
    var _alerthide=function(ishide,second){
    	if(ishide){
    		alr.find(".modal-content").fadeOut(second*1000);
    	}else{
    		alr.find('.ok').click();
    	}
    }
    return {
      alert: _alert,
      confirm: _confirm,
      load : _load,
      alerthide: _alerthide
    }

  }();
})();