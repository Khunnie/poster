$(function(){
  var arr = [];
  var ico = $(".modul-list img");
  
  for(var i =0;i<ico.length;i++){
    arr.push(ico[i].src);
  }
  var Bigpic = "";
  $(".modul-list li").on("click",function(){
    var index = $(this).index();
      $(".modul-pic").attr("src", arr[index]);
      $(".main-wrap").addClass('blur');
      Bigpic = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shade: [0.8, '#000'],
          area: ['auto'], //宽高
          content: '<div class="pic-box clearfix"><img src="../images/modul/m1.jpg" alt="" class="modul-pic"><div class="btn-box"><h2 class="btn-box-tit">免费</h2><a class="button blue J_sureCreate" href="javascript:;">使用</a><div class="button J_cancelBigImg">取消</div></div></div>',
           end: function() {
                    $(".main-wrap").removeClass('blur');
                  }
        });
    })

  // 取消
  $("body").on("click",".J_cancelBigImg",function(){
      layer.close(Bigpic);
      $(".main-wrap").removeClass('blur');
  });
  // 动画
  setTimeout(function(){
        $(".erwei-tip, .bg-btn-tip, .movebg-tip").addClass("hide");
        $(".edit_box").removeClass("edit-box-ani")
    },3000)
   var drap = {
       init: function(){
          this.drap();
       },
       drap: function(e){
          var startTop = $("#mode_img").css("transform");
          startTop = parseFloat(startTop.substring(7).split(',')[5]);
          if(startTop){
            startTop = (1330+startTop)/20;
          }else {
            startTop = 66;
          };
          var wrap = document.getElementById("J_dragimgwrap");
          var btn = document.getElementById("J_dragimgbtn");
            btn.style.top = startTop + "px";
          btn.onmousedown = function(event){
            //鼠标点击的坐标
            var evt = event || window.event;
            var mouseY = evt.clientY;
            btn.className = "dragimg-wrap-btn";
            wrap.className = "dragimg-wrap-con show";
            var disY = mouseY - btn.offsetTop;
            document.onmousemove = function(event){
              var evt = event || window.event;
              if(evt.preventDefault){
                evt.preventDefault();
              } else{
                evt.returnVale = false;
              };
              var endY = evt.clientY;
              var posY = endY - disY;
              if(posY >= wrap.clientHeight - btn.offsetHeight){
                posY = wrap.clientHeight - btn.offsetHeight;
              };
              if (posY <= 0) {
                posY = 1;
              };
              btn.style.top = posY + "px";
              if(posY < 66){
                $("#mode_img").css({
                    "transform":"translate(0,-"+ (1330-posY*20) +"px)",
                    "-webkit-transform":"translate(0,-"+ (1330-posY*20) +"px)",
                    "-moz-transform":"translate(0,-"+ (1330-posY*20) +"px)",
                    "-o-transform":"translate(0,-"+ (1330-posY*20) +"px)"
                });
              }else if(posY == 66) {
                $("#mode_img").css({
                    "transform":"translate(0,"+0+"px)",
                    "-webkit-transform":"translate(0,"+ 0 +"px)",
                    "-moz-transform":"translate(0,"+ 0 +"px)",
                    "-o-transform":"translate(0,"+ 0 +"px)"
                });
              }else if(posY > 66){
                $("#mode_img").css({
                    "transform":"translate(0,"+(posY*20-1330)+"px)",
                    "-webkit-transform":"translate(0,"+ (posY*20-1330) +"px)",
                    "-moz-transform":"translate(0,"+ (posY*20-1330) +"px)",
                    "-o-transform":"translate(0,"+ (posY*20-1330) +"px)"
                });
              };
            }
          }
          $(document).on("mouseup",function(){
                btn.className = "dragimg-start-btn";
                wrap.className = "dragimg-wrap-con";
                document.onmousemove = null;
          })
            // document.onmouseup = function(){
            //   //清除鼠标事件
            //   document.onmousemove = null;
            // }
       }
    };  
   drap.init();
  // 背景点击
  var bgModul = "";
  $(".J_bgbtn").on("click",function(){
    var _this = $(this);
    var top = _this.offset().top;
    var left = _this.offset().left - 60;
    bgModul = layer.open({
      type:1,
          offset: [top, left],
          area: ['auto'],
          title: false,
          closeBtn: 0,
          shadeClose: true,
          shade: [0.001, '#000'],
          content: '<div class="ui-dialog-box"><div class="ui-dialog-btnbox"><div class="ui-col-btn J_opengallery">从图库中选择</div><div class="ui-col-btn"><div class="J_openlocalgallery">从电脑中选择</div><div class="ui-col-agree J_agreementbtn">[√]接受<span>《使用协议》</span></div></div></div></div>'
           
        });
  })
  // 二维码点击
  var Eeweima = "";
  $(".erweima_ico").on("click",function(){
    var _this = $(this);
    var top = _this.offset().top- $(".erweima").height();
    var left = _this.offset().left - 60;
    Eeweima = layer.open({
      type: 1,
      offset: [top, left],
      area: ['auto'],
      title: false,
      closeBtn: 0,
      shadeClose: true,
      shade: [0.001, '#000'],
      content: '<div class="ui-dialog-box"><div class="ui-dialog-btnbox"><div class="ui-col-btn J_inputcode">输入网址</div><div class="ui-col-btn J_inputlocal">扫一扫</div><div class="ui-col-btn J_inputdoc">使用文档</div></div></div>'
    })
  })
  // 取消编辑
  var Editpage = "";
  $(".J_cancel").on("click",function(){
      $(".main-wrap").addClass('blur');
      Editpage = layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shade: [0.8, '#000'],
        area: ['auto'], //宽高
        content: '<div class="dialog-info-box"><div class="dialog-info-tit">舍弃此次编辑</div><div class="dialog-info-con">内容将被清空</div><div class="dialog-info-btn red J_giveup">舍弃</div><div class="dialog-info-btn Blue J_cancelModeGoon">继续编辑</div></div>'
      })
  })
 // 点击继续
 var  ZaiCi = "";
  $(".J_zaici").on("click",function(){
    $(".main-wrap").addClass('blur');
    ZaiCi = layer.open({
        type: 1,
        title: false,
        closeBtn: 0,
        shade: [0.8, '#000'],
        area: ['auto'], //宽高
        content: '<div class="dialog-info-box"><div class="dialog-info-tit">接下来要做的是？</div><div class="dialog-info-btn Blue J_zaicisure"><a href="PC模板.html">制作新图</a></div><div class="dialog-info-btn Blue J_newagain"><a href="PC编辑.html">再次编辑</a></div><div class="dialog-info-btn Blue J_zaicicancle">取消</div></div>'
      })
  })
  // 编辑完成后的取消
  $("body").on("click",".J_zaicicancle",function(){
    $(".main-wrap").removeClass('blur');
    layer.close(ZaiCi)
  });
  $(".edit-wrap").on("blur", "textarea", function(){

        var _this = $(this);
        var textCla = _this.attr("class").split(" ", 1);
        var val = _this.val();
        val = val.replace(/\n/g, "<br />");
            if(val.length == 0) {
                _this.val("点击输入文字");console.log(1)
            };
       
    });
  //继续编辑
  $("body").on("click",".J_cancelModeGoon",function(){
    layer.close(Editpage);
    $(".main-wrap").removeClass('blur');
    $(".mode-wrap").removeClass("hide");
    $(".save-mode").addClass("hide");
  });
  //舍弃
  $("body").on("click",".J_giveup",function(){
    layer.close(Editpage);
    $(".main-wrap").removeClass('blur');
  });
  // 图库
  $("body").on("click",".J_opengallery",function(){
     layer.close(bgModul);
       $(".Imglist").removeClass("hide");
    });
  // 输入网址
     $("body").on("click",".J_inputcode",function(){
        layer.close(Eeweima);
        $(".main-wrap").addClass('blur');
        $(".J_codewrap ").removeClass("hide");
    })
     // 输入网址取消
     $(".J_closecode").on("click",function(){
        $(".main-wrap").removeClass('blur');
        $(".J_codewrap ").addClass("hide");
     })
     // 使用文档
      $("body").on("click",".J_inputdoc",function(){
        layer.close(Eeweima);
        $(".J_localdoc").removeClass("hide");
        $(".edit-wrap").addClass('hide');
        $("creat-tool-wrap").addClass("hide");
    })
    // 返回编辑
    $(".J_exitdocbtn").on("click",function(){
        $(".J_localdoc").addClass("hide");
        $(".edit-wrap").removeClass('hide');
        $("creat-tool-wrap").removeClass("hide");
    })
})