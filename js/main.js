var openid = "";
var appId = "";
var hbname = "";
var accesstokenls = ""; //临时k
function getQueryString(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}

$(document).ready(function () {

    openid = $.cookie('openid');
    accesstokenls = $.cookie('accesstokenls');
    hbname = $.cookie('hbname');


    var _pageurl = window.location.href;
    var _code = getQueryString("code");
    
    $.ajax({
        url: "../poster_ajax.ashx",
        type: 'POST',
        dataType: "json",
        data: { action: "getwxconfig", pageurl: _pageurl, code: _code, openid: openid },
        error: function () {

        },
        success: function (data) {
            if (data.Result) {
                var obj = jQuery.parseJSON(data.Msg);
                //微信AppId， 时间戳，随机码，签名,Openid
                //AppId，Timestamp，NonceStr，Signature,Openid
                appId = obj.AppId;

                if ((openid == "" || openid == null || openid == undefined) && (_code == null || _code == "" || _code == undefined)) {

                    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + _pageurl + "&&response_type=code&scope=snsapi_userinfo&m=oauth2#wechat_redirect";

                    location.href = url;

                }
                else {

                    if (obj.Openid != "" && obj.Openid != null && obj.Openid != undefined) {
                        openid = obj.Openid;
                        $.cookie('openid', openid);
                    }
                    if (obj.accesstokenls != "" && obj.accesstokenls != null && obj.accesstokenls != undefined) {
                        accesstokenls = obj.accesstokenls;
                        $.cookie('accesstokenls', accesstokenls);
                    }




                    if (openid == "" || openid == null || openid == undefined) {
                        //没有获得openid 重新加载
                        location.href = window.location.href.replace(window.location.search, '');
                    }
                    else {


                        wx.config({
                            debug: false,
                            appId: obj.AppId,
                            timestamp: obj.Timestamp,
                            nonceStr: obj.NonceStr,
                            signature: obj.Signature,
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
                        wx.error(function (res) {
                            alert("出错了：" + res.errMsg);
                        });

                        if (window.location.pathname.indexOf("userindex.html") > 0) {
                            getWxinfo();
                        }
                    }
                }


            }
        }

    });



});
function getWxinfo() {
    $.ajax({
        url: "../poster_ajax.ashx",
        type: 'POST',
        dataType: "json",
        data: { action: "getwxinfo", openid: openid, accesstokenls: accesstokenls },
        error: function () {

        },
        success: function (data) {
            if (data.Result) {
                var obj = jQuery.parseJSON(data.Msg);
                $(".userName").text(obj.nickname);
                $("#toux").attr("src", obj.headimgurl);
            }
        }
    });
}

function getuserhblist() {

    $.ajax({
        url: "../poster_ajax.ashx",
        type: 'POST',
        dataType: "json",
        data: { action: "getuserhblist", openid: openid },
        error: function () {

        },
        success: function (data) {
            if (data.Result) {

                if (data.Msg != "") {
                    var obj = data.Msg.split(',');

                    $(".list-inner").find("li").remove();

                    var html = "";
                    for (var i = 0; i < obj.length; i++) {

                        html += '<li hbname="' + obj[i] + '"><div><img src="../file/' + openid + '/' + obj[i] + '/img.png" data-original="../file/' + openid + '/' + obj[i] + '/img.png" alt="" hbname="' + obj[i] + '"></div></li>';
                    }

                    $(".list-inner").append(html);

                    $(".list-inner").find("li").on("click", function () {
                        edithb(this);
                    });
                }

            }
        }
    });
}

function edithb(obj) {
    location.href = "edithb.html?hbname=" + $(obj).attr("hbname");
}




        