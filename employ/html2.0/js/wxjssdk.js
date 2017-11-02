/**
 * Created by Administrator on 2017/9/25.
 */
/**
 * @action 封装了调用微信js-sdk 的方法
 * @author wpx
 * @date  2017/9/25
 */

//获取签名数据
function getWXData(){
    //当前调用接口的地址
    var pageUrl=location.href.split('#')[0];
    //alert(pageUrl);
     var param = {"url":pageUrl};
    $.ajax({
        type: 'post',
        url: 'http://zp-api.infobigdata.com/share',
        data: JSON.stringify(param),
        contentType:'application/json', 
        dataType: 'json',
        success: function(data){
            //alert(JSON.stringify(data));
            if(data.errorcode==0){//签名成功
                //console.log(data.data.timestamp);
                //console.log(data.data.noncestr);
                //console.log(data.data.signature);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wx3aafc72febec6760',//'wx2c4f1571db180b48', // 必填，公众号的唯一标识
                    timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr:  data.data.noncestr, // 必填，生成签名的随机串
                    signature: data.data.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'checkJsApi',
                        'scanQRCode',
                        'closeWindow',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone',
                        //图像接口 拍照或从手机相册中选图接口
                        'chooseImage',
                        //预览图片
                        'previewImage'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function(){
                    //生成分享的json内容
                    var shareContent={
                        title:'中润普达(集团)公司',
                        desc: '国内领先的基于中文认知计算的大数据应用专业服务机构。', // 分享描述
                        link: pageUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://zp.infobigdata.com/images/banner_share.jpg', // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    };
                    wx.onMenuShareAppMessage(shareContent );//分享到微信朋友
                    wx.onMenuShareTimeline(shareContent);//分享到朋友圈
                    wx.onMenuShareQQ(shareContent);//分享到qq
                    wx.onMenuShareWeibo(shareContent);//分享到微博
                    wx.onMenuShareQZone(shareContent);//分享到QQ空间

//             wx.error(function(res){
//               // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//               alert("errorMSG:"+res);
//             });

                });
            }//end if
            else{
                console.log(data.data.errormsg);
            }
        },
        error: function(xhr, type){
            console.log('Ajax error!');
           // alert('Ajax error!');
        }
    });//ajax end
}
