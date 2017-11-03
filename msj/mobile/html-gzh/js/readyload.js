/**
 * Created by Administrator on 2017/4/21.
 */
//页面加载完执行的脚本
$(function() {

    //城市列表页
        $(".scroll-option-box.area>.moption").bind("click",function(){//绑定点击事件
            mySelect.selectedOption($(this),$(".area-select-box"));
        })
        $(".scroll-option-box.price>.moption").bind("click",function(){//绑定点击事件
            mySelect.selectedOption($(this),$(".price-select-box"));
        })


    //区域点击
    $(".select-box.area").bind("click",function(){
            $(this).toggleClass(function(index,oldclass){
                if(oldclass.match("on")){
                    $(".scroll-option-box.area").fadeOut();
                    $("body").removeClass("mengceng");
                }else{
                    $("body").addClass("mengceng");
                    $(".scroll-option-box.area").fadeIn();
                }
                return "on";
            });

        })
       //价格点击
        $(".select-box.price").bind("click",function(){
            $(this).toggleClass(function(index,oldclass){
                if(oldclass.match("on")){
                    $(".scroll-option-box.price").fadeOut();
                    $("body").removeClass("mengceng");

                }else{
                    $("body").addClass("mengceng");
                    //$(".scroll-option-box.area").fadeOut();
                    $(".scroll-option-box.price").fadeIn();

                }
                return "on";
            });

        });

    //民宿描述与房型介绍切换
    $(".detail-content-box .type-name.detail").bind("click",function(){
        $(".detail-content-box .type-detail").hide();
        $(".detail-content-box .type-name.type-info").removeClass("active");
        $(this).addClass("active");
        $(".detail-content-box .content-detail").show();
    });
    $(".detail-content-box .type-name.type-info").bind("click",function(){
        $(".detail-content-box .content-detail").hide();
        $(".detail-content-box .type-name.detail").removeClass("active");
        $(this).addClass("active");
        $(".detail-content-box .type-detail").show();
    });
    //我的订单页面 进行中和已结束按钮切换
    $(".change-new .state1").bind("click",function(){
        $(".list_yjs").hide();
        $(".list_jxz").show();
        $(this).addClass("active");
        $(".change-new .state2").removeClass("active");
    });
    $(".change-new .state2").bind("click",function(){
        $(".list_yjs").show();
        $(".list_jxz").hide();
        $(this).addClass("active");
        $(".change-new .state1").removeClass("active");
    });

    //缩略图预览
    $('#layer13').bind('click',function(){
        var data={
            "title": "", //相册标题
            "id": 123, //相册id
            "start": 0, //初始显示的图片序号，默认0
            "data": [   //相册包含的图片，数组格式
                {
                    //"alt": "高圆圆",
                    "pid": 666, //图片id
                    "src": "images/prop-img/part1-1.jpg", //原图地址
                    //"thumb": "images/prop-img/comment-img1.jpg" //缩略图地址
                }
                ,{
                    //"alt": "李诗诗",
                    "pid": 666, //图片id
                    "src": "images/prop-img/part1-2.jpg", //原图地址
                    //"thumb": "images/prop-img/comment-img2.jpg" //缩略图地址
                }
                ,{
                    //"alt": "高圆圆",
                    "pid": 666, //图片id
                    "src": "images/prop-img/part2-1.jpg", //原图地址
                    //"thumb": "images/prop-img/comment-img3.jpg" //缩略图地址
                }
            ]
        }
        myLayer.showPhotos(data);
    });

    //取消订单 弹出弹窗
    $(".order_detail .detail_cancel").bind("click",function(){
        myLayer.showDom($('.my-layer-cancel'));
    })
   //电话预定 弹窗
    $(".type-price-box .book").bind("click",function(){
        //加载成功后的自定义回调函数
        var callbackFn=function(layerObj,layerIndex){
                $(".phone-reserve-btn").bind("click",function(){
                    layerObj.close(layerIndex);
                });
                $('.layui-layer-shade').bind("click",function(){
                    layerObj.close(layerIndex);
                });
        }
        //['5.33rem','3.8rem'] 对应弹窗的宽和高
        myLayer.showDom2($('.phone-reserve-shade'),['5.33rem','3.8rem'],callbackFn);
    })

    //城市列表 选择菜单绑定鼠标移出位置后收起菜单
    $(".header-title-back").mouseout(function(){
        if($(".scroll-option-box.price")){//如果存在价格下拉菜单则收起，同时删除遮罩
            $(".scroll-option-box.price").fadeOut();
            $("body").removeClass("mengceng");
            $(".select-box.price.on").removeClass("on");
        }
        if($(".scroll-option-box.area")){//如果存在区域下拉菜单则收起，同时删除遮罩
            $(".scroll-option-box.area").fadeOut();
            $("body").removeClass("mengceng");
            $(".select-box.area.on").removeClass("on");
        }

    });

    //明细弹窗
    $(".tijiao .mingxi").bind("click",function(){
        myLayer.showDom2($('.alert_mainback'),['5.36rem','7.6rem'],null,'layer_mingxi');
    })
    //删除图片操作
    $(".comment-img>.img-item>i").bind("click",function(){
        $(this).parent().remove();
    });
    ////窗口改变，刷新页面
    //$(window).resize(function() {
    //    location.reload();
    //});
    //window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    //    if (window.orientation == 180 || window.orientation == 0) {
    //        document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth / 7.50 + "px");
    //    }
    //    if (window.orientation == 90 || window.orientation == -90 ){
    //        document.getElementsByTagName('html')[0].style.fontSize = (document.documentElement.clientWidth / 7.50 + "px");
    //    }
    //}, false);
});

