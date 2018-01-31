$(function(){
	 	var code = jQuery.getQueryString("code");
        var oid = localStorage.getItem("openid");
        var shopId = localStorage.getItem("shopid");
        var shopphone = localStorage.getItem("shopphone");
        var tmpUrl1 = "";
        var tmpUrl2 = "";
        var innerHtmlgn = "";
        var innerHtmljw = "";
        var arrArea = new Array();
        var arrAreaid = new Array();
        var arrAreasubid = new Array();
        var areatype = "";
        $(document).ready(function () {
            if (jQuery.debug == "1") {
                jQuery.SetUserOpenidLocalStorage(jQuery.testoid);
                oid = jQuery.testoid;
            }
           /* getareainfo();*/
           // GetUserInfo();
        });

        function onrigs() {
            if (window.confirm('是否发布您的询价单？')) {
                $("#btnsaveuser").css("display", "none");
                $("#btnShowtip").css("display", "");
                var ContactName = $.trim($("#txtContactName").val());
                var fbfw = $.trim($("#fbfw").val());
                var nr = $.trim($("#nr").val());
                var strZzzs = $.trim($("#strZzzs").val());

                var fbfwid = $.trim($("#fbfwid").val());

                if (ContactName == "") {
                    $("#txtContactName").focus();
                    ShowMsg("标题不能为空。");
                    $("#btnsaveuser").css("display", "");
                    $("#btnShowtip").css("display", "none");
                    return false;
                }

                if (areatype == "") {

                    ShowMsg("请选择出游类型");
                    $("#btnsaveuser").css("display", "");
                    $("#btnShowtip").css("display", "none");
                }

                if (fbfw == "") {
                    $("#fbfw").focus();
                    ShowMsg("发布范围不能为空。");
                    $("#btnsaveuser").css("display", "");
                    $("#btnShowtip").css("display", "none");
                }

                if (nr == "") {
                    $("#nr").focus();
                    ShowMsg("内容不能为空");
                    $("#btnsaveuser").css("display", "");
                    $("#btnShowtip").css("display", "none");
                }




                jQuery.FxsRequest("action=askprice", { strBt: ContactName, strCylx: areatype, strXjnr: nr, strFbfw: fbfw, strFbfwid: fbfwid, strPic: strZzzs, oid: oid, shopId: shopId }, function (data) {
                    if (data.Result) {


                        window.location = "inquiry.html";
                        return;
                    }
                    alert(data.Msg);
                    $("#btnsaveuser").css("display", "");
                    $("#btnShowtip").css("display", "none");
                });
            }
        }


        function GetUserInfo() {
            jQuery.FxsRequest("action=jssdkInit&url=" + encodeURIComponent(location.href), "", function (data) {

                var status = data.Msg.split('|');

                if (data.Result) {
                    //alert("appid:" + status[0] + " timestamp:" + status[1] + " nonce:" + status[2] + " signature:" + status[4] + " :" + status[4]);
                    wx.config({
                        debug: false,
                        appId: status[0],
                        timestamp: status[1],
                        nonceStr: status[2],
                        signature: status[4],
                        jsApiList: [
                                        'checkJsApi',
                                        'onMenuShareTimeline',
                                        'onMenuShareAppMessage',
                                        'onMenuShareQQ',
                                        'onMenuShareWeibo',
                                        'onMenuShareQZone',
                                        'hideMenuItems',
                                        'showMenuItems',
                                        'hideAllNonBaseMenuItem',
                                        'showAllNonBaseMenuItem',
                                        'translateVoice',
                                        'startRecord',
                                        'stopRecord',
                                        'onVoiceRecordEnd',
                                        'playVoice',
                                        'onVoicePlayEnd',
                                        'pauseVoice',
                                        'stopVoice',
                                'shareTimeline',
                                        'uploadVoice',
                                        'downloadVoice',
                                        'chooseImage',
                                        'previewImage',
                                        'uploadImage',
                                        'downloadImage',
                                        'getNetworkType',
                                        'openLocation',
                                        'getLocation',
                                        'hideOptionMenu',
                                        'showOptionMenu',
                                        'closeWindow',
                                        'scanQRCode',
                                        'chooseWXPay',
                                        'openProductSpecificView',
                                        'addCard',
                                        'chooseCard',
                                        'openCard'
                                      ]
                    });
                }
                else {

                    //alert(data.Msg);
                }
            });
        }

/*
        function getareainfo() {
            jQuery.FxsRequest("action=getareainfo", "", function (data) {
                var status = data.Msg.split('|');

                if (data.Result) {

                    innerHtmlgn = data.Msg;

                    innerHtmljw = data.Tag;
                }
                else {
                    alert(data.Msg);
                }
            });
        }*/


        function filter() {
            var tmpUrl = "";
            var tmpUrlid = "";
            arrArea = [];
            arrAreaid = [];
            arrAreasubid = [];
            var areatype = $("#jw .pagetitle b").attr("data-cbo");
            var nCount = 0;
            if (areatype == "jn") {
                $(".mjd ul li a.this").each(function () {
                    arrArea.push($(this).attr("title"));
                    arrAreaid.push($(this).attr("rcid"));
                    arrAreasubid.push($(this).attr("subid"));
                    tmpUrl1 = $(this).attr("title") + tmpUrl1;

                })


                if (tmpUrl1.length > 0) {
                    $(".ca-destination-block").show();
                    $(".select-tc .combo_box[data-cbo=" + areatype + "]").addClass("selected");

                }
            }
            else {
                $(".mjd ul li a.this").each(function () {
                    arrArea.push($(this).attr("title"));
                    arrAreaid.push($(this).attr("rcid"));
                    arrAreasubid.push($(this).attr("subid"));
                    tmpUrl2 = $(this).attr("title") + tmpUrl2;

                })


                if (tmpUrl2.length > 0) {
                    $(".ca-destination-block").show();
                    $(".select-tc .combo_box[data-cbo=" + areatype + "]").addClass("selected");
                }
            }
            uniqueArray(arrArea);
            uniqueArray(arrAreaid);
            uniqueArray(arrAreasubid);
            
            for (var i = 0; i < arrArea.length; i++) {

                tmpUrl = tmpUrl + arrArea[i] + ",";
                tmpUrlid = tmpUrlid + arrAreaid[i]  + ",";

            }
            debugger;
            var vMdds = "";
            vMdds = tmpUrl.substring(0, tmpUrl.length - 1);

            //            if (vOldMdd != "") {
            //                vMdds = FormatString($("#fbfw").val().substring(0, $("#fbfw").val().length - 1), tmpUrl.substring(0, tmpUrl.length - 1));
            //            }
            nCount = vMdds.split(',').length;
            if (nCount > 5) {
                alert("发布范围最多只能选择5个目的地。");
                return;
            }
            $("#fbfw").val(tmpUrl);
            $("#fbfwid").val(tmpUrlid);
            $("#selmdd").text(tmpUrl);
            $(".ca-destination").css("color", "#333").html(tmpUrl);
            $('.order2-2').show();
            $('#jw').hide();
        }

      

      
        function uniqueArray(data) {
            data = data || [];
            var a = {};
            for (var i = 0; i < data.length; i++) {
                var v = data[i];
                if (typeof (a[v]) == 'undefined') {
                    a[v] = 1;
                }
            };
            data.length = 0;
            for (var i in a) {
                data[data.length] = i;
            }
            return data;
        }

        $("#area-clear").click(function () {
            $(".select-tc .combo_box").removeClass("selected");
            arrArea = [];
            arrAreaid = [];
            arrAreasubid = [];
            tmpUrl = "";
            tmpUrlid = "";
            tmpUrl1 = "";
            tmpUrl2 = "";
            $(".ca-destination-block").hide();
            $(".ca-destination").css("color", "#b4b4b4").html("目的地");
        })

        $(".select-tc .combo_box").click(function () {
            //$(this).addClass("selected");
            areatype = $(this).attr("data-cbo");

            $("#jw").show();
            $("#jw .pagetitle b").attr("data-cbo", areatype).text($(this).text());
            $('.order2-2').hide();
            switch (areatype) {
                case "jn":
                    $("#mdd-block").html(innerHtmlgn);
                    break;
                case "jw":
                    $("#mdd-block").html(innerHtmljw);
                    break;
            }

            var vOldMdd = $("#fbfw").val().substring(0, $("#fbfw").val().length - 1).split(',');
            for (var i = 0; i < vOldMdd.length; i++) {
                $(".mjd>ul>li:not(.second-attractions) a[title='" + vOldMdd[i] + "']").addClass("this");
            }


            $(".mjd>ul>li:not(.second-attractions) a").click(function () {
                //$(".contentFilter:eq(0) a.this").removeClass("this");
                if ($(this).hasClass("this")) {
                    $(this).removeClass("this");
                }
                else {

                    $(this).addClass("this");
                }
                var rcid = $(this).attr('rcid');
                //                $(".mjd>ul>li.second-attractions:visible").hide();
                //                var li = $(".contentFilter li").filter("[rcid=" + rcid + "]");
                //                $(".filter-arrow-top").css('left', $($(this), $(this).parent()).index() * 33 + "%");
                //                li.insertAfter($(this).parent());
                //                li.show();
                //                if (li.find(".this").length == 0)
                //                    li.find("a[data-all=all]").addClass("this");
            });
            $(".mjd>ul>li.second-attractions a:not([data-all=all])").click(function () {
                $(this).toggleClass("this").siblings("a[data-all=all]").removeClass("this");
                var rcid = $(this).parent().attr('rcid');
                var li = $(".mjd>ul>li:not(.second-attractions) a").filter("[rcid=" + rcid + "]");
                var lia_this = $(this).parent().find(".this").length;
                if (lia_this == 0)
                    li.removeClass("this");

            });
            $(".mjd>ul>li.second-attractions a[data-all=all]").click(function () {
                $(this).addClass("this").siblings(".this").removeClass("this");
                var rcid = $(this).attr('rcid');
                var li = $(".mjd>ul>li:not(.second-attractions) a").filter("[rcid=" + rcid + "]");
                li.addClass("this");
            })
        })
})