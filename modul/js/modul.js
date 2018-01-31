
$(function () {

   var ref;
    if ($(".creat-wrap").html() != "" && $(".creat-wrap").html() != null && $(".creat-wrap").html() != undefined) {
        var Height = $(".bg_body").outerHeight();
        if(Height==0){
            ref = setInterval(function(){
                 var _Height = $(".bg_body").outerHeight();
                 if(_Height>0){
         $(".creat-con").height(_Height);
                     clearInterval(ref);
                 }
            },1000);
        }
        else
           $(".creat-con").height(Height);

    }
    var Top = window.screen.availHeight;
    var Left = window.screen.width;
    /*模板中心点定位*/
    var arr = [];
    var hrefs = [];
    var ico = $("#modul_Img img");

    for (var i = 0; i < ico.length; i++) {
        arr.push(ico[i].src);
        hrefs.push($(ico[i]).attr("href"));
    }
    $("#modul_Img li").on("click", function () {
        var index = $(this).index();
        $("body").css({
            height: Top,
            overflow: "hidden"
        })
        $("#modelimg").attr("src", arr[index]);
        $("#modelimg").attr("href", hrefs[index]);
        $("#fix_modul").css({
            width: Left,
            height: Top,
            animation: 'big 1s 1 linear',
            transform: 'scale(1)'
        });
        setTimeout(function () {
            $(".fix").removeClass("hid")
        }, 500);
    })
    $("#use_Mb").on("touchstart", function () {

        $.cookie('hbname', '');
        location.href = $("#modelimg").attr("href");
    });
   

    load();

});
function load() {
   
   
   
    
    $("#close_Mb").on("click", function () {
        $(".fix").addClass("hid")
        $("body").css({
            height: "auto",
            overflow: "auto"
        })
        $("#fix_modul").css({
            animation: 'small 1s 1 linear',
            transform: 'scale(0)'
        });
    })
    // 第一次动画
    setTimeout(function () {
        $(".erwei-tip, .bg-btn-tip, .movebg-tip").addClass("hide");
        $(".edit_box").removeClass("edit-box-ani")
    }, 3000)
    // 上下拖拽
    var drap = {
        init: function () {
            this.drap();
        },
        drap: function (e) {
            if ($("#mode_img").length > 0) {
                var startTop = $("#mode_img").css("transform");
                startTop = parseFloat(startTop.substring(7).split(',')[5]);
                if (startTop) {
                    startTop = (1330 + startTop) / 20;
                } else {
                    startTop = 66;
                };


                var wrap = document.getElementById("J_dragimgwrap");
                var btn = document.getElementById("J_dragimgbtn");
                btn.style.top = startTop + "px";
                btn.addEventListener("touchstart", function (event) {
                    var evt = event || window.event;
                    var mouseY = evt.touches[0].pageY;
                    btn.className = "dragimg-wrap-btn";
                    wrap.className = "dragimg-wrap-con show";
                    disY = mouseY - btn.offsetTop;

                }, false)
                btn.addEventListener("touchmove", function (event) {
                    var evt = event || window.event;
                    if (evt.preventDefault) {
                        evt.preventDefault();
                    } else {
                        evt.returnVale = false;
                    };
                    var endY = evt.touches[0].pageY;
                    var posY = endY - disY;
                    if (posY >= wrap.clientHeight - btn.offsetHeight) {
                        posY = wrap.clientHeight - btn.offsetHeight;
                    };
                    if (posY <= 0) {
                        posY = 1;
                    };
                    console.log(endY)
                    btn.style.top = posY + "px";
                    if (posY < 66) {
                        $("#mode_img").css({
                            "transform": "translate(0,-" + (1330 - posY * 20) + "px)",
                            "-webkit-transform": "translate(0,-" + (1330 - posY * 20) + "px)",
                            "-moz-transform": "translate(0,-" + (1330 - posY * 20) + "px)",
                            "-o-transform": "translate(0,-" + (1330 - posY * 20) + "px)"
                        });
                    } else if (posY == 66) {
                        $("#mode_img").css({
                            "transform": "translate(0," + 0 + "px)",
                            "-webkit-transform": "translate(0," + 0 + "px)",
                            "-moz-transform": "translate(0," + 0 + "px)",
                            "-o-transform": "translate(0," + 0 + "px)"
                        });
                    } else if (posY > 66) {
                        $("#mode_img").css({
                            "transform": "translate(0," + (posY * 20 - 1330) + "px)",
                            "-webkit-transform": "translate(0," + (posY * 20 - 1330) + "px)",
                            "-moz-transform": "translate(0," + (posY * 20 - 1330) + "px)",
                            "-o-transform": "translate(0," + (posY * 20 - 1330) + "px)"
                        });
                    };
                }, false)
                btn.addEventListener("touchend", function (event) {
                    btn.className = "dragimg-start-btn";
                    wrap.className = "dragimg-wrap-con";

                }, false)

            }
        }
    };
    drap.init()

    // 更换背景
    $(".J_bgbtn").on("touchstart", function () {
        $(".J_changeMode").removeClass("hide");
        BtnShow();
    })
    // 取消更换背景
    $(".J_changeModeGoon").on("touchstart", function () {
        $(this).parents(".J_changeMode").addClass("hide")
        BthHiddren();
    })
    // 更换二维码
    $(".erweima_ico").on("touchstart", function () {
        $(".J_codelist").removeClass("hide");
        BtnShow();
    })
    // 输入网址
    $(".J_codetextbtn").on("touchstart", function () {
        $(this).parents(".J_codelist").addClass("hide");
        $(".J_codewrap").removeClass("hide");
        BtnShow();
    })
    // 关闭二维码
    $(".J_cancelcodelist").on("touchstart", function () {
        $(this).parents(".J_codelist").addClass("hide");
        BthHiddren();
    })
    // 取消
    $(".J_closecode").on("touchstart", function () {
        $(this).parents(".J_codewrap").addClass("hide");
        BthHiddren();
    })
    // 输入网址完成
    $(".J_sendCode").on("touchstart", function () {
        $(this).parents(".J_codewrap").addClass("hide");

        $(".erweima_div").html('');
        var qrcode = $(".erweima_div").qrcode({
            render: "canvas", //table方式 
            width: 200, //宽度 
            height: 200, //高度 
            text: $("#code-text").val() //任意内容 
        }).hide();
        var canvas = qrcode.find('canvas').get(0);
        $(".erweima_img").attr('src', canvas.toDataURL('image/jpg'));
        $(".input-con-erwei").attr('src', canvas.toDataURL('image/jpg'));

        BthHiddren();
    })
    // 使用文档
    $(".J_codedocbtn").on("touchstart", function () {
        $(this).parents(".J_codelist").addClass("hide");
        $(".creat-con").addClass("hide").removeClass("blur");
        $(".creat-wrap").removeClass("hiddren");
        $(".bg-btn,.dragimg-start-btn").addClass("hide");
        $(".J_foot1").addClass("hid");
        $(".local-doc-wrap").removeClass("hide")
        $(".J_foot2").removeClass("hid")

    })
    // 文档取消
    $(".J_localdoccancel").on("touchstart", function () {
        $(".J_foot2").addClass("hid");
        $(".local-doc-wrap").addClass("hide");
        $(".creat-con").removeClass("hide");
        $(".J_foot1").removeClass("hid");
        $(".bg-btn,.dragimg-start-btn").removeClass("hide");
    })
    // 海报完成
    $("#success_Mb").on("touchstart", function () {
        $(".bg-btn,.dragimg-start-btn,.erweima_ico,.dragimg-start-btn").addClass("hide");
        $(".J_foot1").addClass("hid");
        $("textarea").removeClass("textarea");
        //生产图片
        var html = $(".creat-wrap").html();
        var content = $(".mode-wrap")[0];

        html2canvas(content, {
            onrendered: function (canvas) {
                //添加属性
                canvas.setAttribute('id', 'thecanvas');
                //读取属性值
                // var value= canvas.getAttribute('id');
                var imgdata64 = canvas.toDataURL('image/jpg');
                $(".save-mode").find("img").attr("src", canvas.toDataURL('image/jpg'));

                savehb(html, imgdata64);
            }
        });
        //
        $(".mode-wrap").addClass("hide");

        $(".save-mode").removeClass("hide");
        $(".J_foot3").removeClass("hid");

    })
    //继续
    $(".J_completeGoon").on("touchstart", function () {
        $(".creat-con").addClass("blur");
        $(".creat-wrap").removeClass("hiddren");
        $(".J_newpic").removeClass("hide");
    })
    // 编辑/取消
    $(".J_cancelnew").on("touchstart", function () {
        $(".creat-con").removeClass("blur");
        $(".creat-wrap").removeClass("hiddren");
        $(".J_newpic").addClass("hide");
    })
    // 再次编辑
    $(".J_newagain").on("touchstart", function () {
        BthHiddren();
        $(".J_newpic").addClass("hide");
        $(".save-mode").addClass("hide");
        $(".J_foot3").addClass("hid");
        $(".mode-wrap").removeClass("hide");
        $(".J_foot1").removeClass("hid");
    })
    // 长按保存
    $(".J_completeSave").on("touchstart", function () {
        $(".creat-con").addClass("blur");
        $(".creat-wrap").addClass("hiddren");
        $(".J_chanang").removeClass("hide");

    })
    // 知道啦
    $(".ok-btn").on("touchstart", function () {
        $(".creat-con").removeClass("blur");
        $(".creat-wrap").removeClass("hiddren");
        $(".J_chanang").addClass("hide");
    })
    // 按钮关闭
    $(".close-btn").on("touchstart", function () {
        $(".creat-con").removeClass("blur");
        $(".creat-wrap").removeClass("hiddren");
        $(".J_chanang").addClass("hide");
    })
    // 舍弃编辑
    $("#close_Mb").on("touchstart", function () {
        $(".J_cancelMode").removeClass("hide");
        BtnShow()
    })
    // 继续编辑
    $(".J_cancelModeGoon").on("touchstart", function () {
        $(".J_cancelMode").addClass("hide");
        $("textarea").addClass("textarea");
        BthHiddren();
    })
    // 图库选择背景
    $(".J_openPic").on("touchstart", function () {
        $(".creat-con").addClass("hide");
        $(".J_foot1").addClass("hid");
        $(".list-wrap").removeClass("hide");
        $(".J_foot4").removeClass("hid");
        $(".J_changeMode").addClass("hide")
    })
    // 关闭图库
    $(".J_openCancel").on("touchstart", function () {
        $(".J_foot4").addClass("hid");
        $(".bg-btn,.dragimg-start-btn").removeClass("hide");
        $(".creat-con").removeClass("hide blur hiddren");
        $(".J_foot1").removeClass("hid");
        $(".list-wrap").addClass("hide");

    })
    // 确认图库
    $(".J_openCancel").on("touchstart", function () {
        $(".J_foot4").addClass("hid");
        $(".bg-btn,.dragimg-start-btn").removeClass("hide");
        $(".creat-con").removeClass("hide blur hiddren");
        $(".J_foot1").removeClass("hid");
        $(".list-wrap").addClass("hide");
    });
    //使用模板
   
    $(".location.href").on("touchstart", function () {
        location.href = "hbmb.html";
    });
    //扫一扫
    $(".J_codesaoyisaobtn").on("touchstart", function () {
        
        wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function (res) {
                //alert(JSON.stringify(res));

                $("#code-text").val(res.resultStr);
                $(".erweima_div").html('');
                var qrcode = $(".erweima_div").qrcode({
                    render: "canvas", //table方式 
                    width: 200, //宽度 
                    height: 200, //高度 
                    text: res.resultStr  //任意内容 
                }).hide();
                var canvas = qrcode.find('canvas').get(0);
                $(".erweima_img").attr('src', canvas.toDataURL('image/jpg'));
                $(".input-con-erwei").attr('src', canvas.toDataURL('image/jpg'));


            }
        });
        BthHiddren();
    });

    //上传背景
    $(".J_localPic").on("touchstart", function () {
        //$(".bg_body")

        chooseImage($("#mode_img"));

        BthHiddren();
    });

    //放弃编辑
    $(".J_giveup").on("touchstart", function () {
        location.href = "hbmb.html";
    });

    $("textarea").on("change", function () {
        $(this).text($(this).val());
    });
}

// 按钮遮罩层显示
function BtnShow() {
    $(".creat-wrap").addClass("hiddren");
    $(".creat-con").addClass("blur");
    $(".bg-btn,.dragimg-start-btn").addClass("hide");
}
// 按钮遮罩层隐藏
function BthHiddren() {
    $(".creat-wrap").removeClass("hiddren");
    $(".creat-con").removeClass("blur");
    $(".bg-btn,.dragimg-start-btn,.erweima_ico").removeClass("hide");
}

//选择上传文件
function chooseImage(img) {
    var images = {
        localId: [],
        serverId: []
    };
    wx.chooseImage({
        success: function (res) {

            //alert(JSON.stringify(res));

            images.localId = res.localIds;

            uploadImage();


        }
    });
    var i = 0, length = 0;
    function uploadImage() {

        if (images.localId.length == 0) {
            alert('请先使用选择图片按钮');
            return;
        }
        length = images.localId.length;
        upload();
        BthHiddren();
    }
    function upload() {
        wx.uploadImage({
            count: 1,
            needResult: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
            localId: images.localId[i],
            success: function (res) {
                i++;
                //alert('已上传：' + i + '/' + length);
                images.serverId.push(res.serverId);

                /*wx.downloadImage({
                serverId: res.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得  
                isShowProgressTips: 1, // 默认为1，显示进度提示  
                success: function (_res) {
                alert(JSON.stringify(_res));
                var localId = _res.localId; // 返回图片下载后的本地ID  
                $(img).attr('src', localId);
                }
                });*/


                downloadImage(res.serverId);
                if (i < length) {
                    upload();
                }
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
    }
    //本地服务器同步附件
    function downloadImage(serverId) {
        $.ajax({
            url: "../poster_ajax.ashx",
            type: 'POST',
            dataType: "json",
            data: { action: "getmultimedia", serverId: serverId, openid: openid },
            error: function () {

            },
            success: function (data) {
                if (data.Result) {

                    var obj = jQuery.parseJSON(data.Msg);

                    $(img).attr('src', obj.fileurl);



                }
            }
        });

    }


}


//保存海报 html 及图片
function savehb(_html, _imgdata64) {

    $.ajax({
        url: "../poster_ajax.ashx",
        type: 'POST',
        dataType: "json",
        data: { action: "savehb", openid: openid, hbhtml: _html, hbimgdata64: _imgdata64, name: hbname },
        error: function () {

        },
        success: function (data) {
            if (data.Result) {
                var obj = jQuery.parseJSON(data.Msg);
                hbname = obj.hbname;
                $.cookie('hbname', hbname);
            }
        }
    });
}


function gethb() {
    $.ajax({
        url: "../poster_ajax.ashx",
        type: 'POST',
        dataType: "json",
        data: { action: "getuserhb", openid: openid, hbname: hbname },
        error: function () {

        },
        success: function (data) {
            if (data.Result) {

                $(".creat-wrap").html(data.Msg);

                $(".J_foot1").removeClass("hid");
                $("textarea").addClass("textarea");
                BthHiddren();

                load();
            }
        }
    });
}
