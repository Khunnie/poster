$(function(){
   // 退出/文档
  var User = "";
  $(".user-img").on("click",function(){
      var _this = $(this);
      var top = _this.offset().top- 120 - $(window).scrollTop();
      var left = _this.offset().left;
      User = layer.open({
          type: 1,
          offset: [top, left],
          area: ['auto'],
          title: false,
          closeBtn: 0,
          shadeClose: true,
          shade: [0.001, '#000'],
          content: '<div class="ui-dialog-box"><div class="ui-dialog-btnbox"><a href="制作记录.html" class="ui-col-btn">制作记录</a><a href="行程文档.html" class="ui-col-btn">行程文档</a><a href="javascript:;" class="ui-col-btn J_exit">退出登录</a></div></div>'
      })
  })
})