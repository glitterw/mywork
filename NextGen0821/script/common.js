

//关闭启动图
function close_start_page(callback)//config.xml中的autoLaunch设置为false;
{
    if(is_define(callback))
    {
        callback();
    }
    setTimeout(function()
    {
        api.removeLaunchView(
            {
                animation:
                {
                    type : 'push',
                    duration : 500
                }
            });
    }, 2000);
}

//ajax函数封装
var locked = false;
function r_ajax(serverURL,data,callback)
{
    if(!locked){
        locked = true;
    }else{
        return
    }

    var datas = new Object()
    if (!is_json(data))
    {
        data = str2json(data);
        datas.body.app_version = app_version;
    }else{
        datas.body = data
    }
    //show_doing();
      if(document.getElementById('nont_find')){

          document.getElementById('nont_find').style.display = 'none'
      }

    //var html='<div id="pushup_trip" class="h15e" style="color:#666;display:flex;justify-content: center;align-items: center;padding:0.3rem 0;font-size: 0.18rem;">' +
    //    '<img class="w15e h15e" style="width:0.4rem;height:0.4rem;margin-right:0.1rem" src="../image/loading.svg">' +
    //    '<span>数据载入中...</span>' +
    //    '</div>';
    //    $api.append($api.dom('body'), html);
    api.ajax({
        headers:{
            "Authorization":"Bearer [accessToken]",
            "content-Type":"application/json"
          },
        url : serverURL,
        method : 'post',
        timeout : 30,
        dataType : 'json',
        returnAll : false,
        data : datas

    }, function(ret, err)
    {
       // hide_doing();
        if (ret)
        {
            callback(ret)
        }
        else
        {
            //alert(JSON.stringify(err))
            net_error();//请求失败
        }
        locked = false;
       // push_up_over() ;
    });
}

//start_welcome
function start_welcome(callback)
{
    var data = "{values :{service:'index',act:'welcome'}}";
    r_ajax(serverURL,data,function(ret)
    {
        if(ret.error==0)
        {
            if(is_define(ret.adv))
            {
                var old_welcome=get_local("welcome");
                if(is_define(old_welcome))
                {
                    if(old_welcome!=json2str(ret.adv))
                    {
                        set_local("welcome",json2str(ret.adv));
                        close_start_page(function()
                        {
                            set_welcome(0,ret.adv,callback);
                        })
                    }
                    else
                    {
                        if(is_define(callback))
                        {
                            close_start_page(callback);
                        }
                        else
                        {
                            close_start_page();
                        }
                    }
                }
                else
                {
                    set_local("welcome",json2str(ret.adv));
                    close_start_page(function()
                    {
                        set_welcome(0,ret.adv,callback);
                    })
                }
            }
            else
            {
                if(is_define(callback))
                {
                    close_start_page(callback);
                }
                else
                {
                    close_start_page();
                }
            }
        }
        else
        {
            if(is_define(callback))
            {
                close_start_page(callback);
            }
            else
            {
                close_start_page();
            }
        }
    })
}

//set_welcome

function set_welcome(index,adv,callback)
{
    download(adv[index],function(ret)
    {
        arr_wel.push(ret);
        if((index+1)<adv.length)
        {
            set_welcome(index+1,adv,callback);
        }
        else
        {
            var obj=api.require('UIScrollPicture');
            obj.open(
                {
                    rect:{x:0,y:0,w:api.winWidth,h:api.winHeight},
                    data:{paths:arr_wel},
                    placeholderImg:arr_wel[0],
                    contentMode:'scaleToFill',
                    interval:10000,
                    auto:false,
                    loop: false,
                    fixedOn:'',
                    fixed: true,
                    styles:
                    {
                        indicator:
                        {
                            align:'center',
                            color:'#393939',
                            activeColor:'#f39915'
                        }
                    },
                },
                function(ret, err)
                {
                    if(ret.status)
                    {
                        if(ret.eventType=='click')
                        {
                            if(ret.index==(arr_wel.length-1))
                            {
                                var obj = api.require('UIScrollPicture');
                                obj.close();
                                if(is_define(callback))
                                {
                                    callback();
                                }
                            }
                        }
                    }
                });
        }
    })
}

//open_f_mask

function open_f_mask(url,pageParam)
{
    if(is_define(pageParam))
    {
        var pageParam=pageParam;
    }
    else
    {
        var pageParam=new Object();
    }
    api.openFrame(
        {
            name : 'mask',
            url : url,
            rect :
            {
                x : 0,
                y : 0,
                w : 'auto',
                h : 'auto'
            },
            bounces : true,
            opaque : false,
            pageParam:pageParam,
            allowEdit : true,
            bgColor : 'rgba(0,0,0,0.5)',//主要是这里起作用哦
            vScrollBarEnabled : true,
            hScrollBarEnabled : true,
            reload : false
        });
}


//打开新窗口
function open_w(name,url,pageParam)
{
    if(is_define(pageParam))
    {
        var pageParam=pageParam;
    }
    else
    {
        var pageParam=new Object();
    }
    api.openWin({
        name : name,
        url : url,
        pageParam:pageParam,
        reload:true
    });
}

//关闭窗口
function close_w()
{
    api.closeWin();
}

//关闭指定页面
function close_name_w(name)
{
    if (api.systemType == 'ios')
    {
        setTimeout
        (
            function()
            {
                api.execScript(
                    {
                        name: "root",
                        script: "api.closeWin({name:'"+name+"'});"
                    });
            },500
        )
    }
    else
    {
        api.closeWin({name:name});
    }
}


//打开浮动窗口
function open_f(name,url,pageParam)
{
    if(is_define(pageParam))
    {
        var pageParam=pageParam;
    }
    else
    {
        var pageParam=new Object();
    }
    var $header = $api.dom('#header');
    $api.fixIos7Bar($header);
    var $body = $api.dom('body');
    var header_h = $api.offset($header).h;
    api.openFrame(
        {
            name:name,
            url:url,
            rect:
            {
                x : 0,
                y : header_h,
                w : 'auto',
                h : 'auto'
            },
            bounces : true,
            //opaque : true,
            allowEdit : true,
            pageParam:pageParam,
            bgColor : 'rgba(0,0,0,0)',
            vScrollBarEnabled : true,
            hScrollBarEnabled : true,
            reload : false
        });
}

function open_slide()
{
    api.openSlidPane({type : 'left'});
}

//关闭侧滑
function close_slide()
{
    api.closeSlidPane();
}

//隐藏frame
function hide_f(name)
{
    api.setFrameAttr(
        {
            name:name,
            hidden:true,
        });
}

//关闭frame
function close_f(name)
{
    api.closeFrame(
        {
            name:name
        });
}

//得到frame的高度
function get_f_h()
{
    return api.frameHeight;
}

//页面滚动
function scroll_page(type,callback)
{
    if(type=="up")
    {
        api.pageUp
        (
            {"top":true},
            function(ret)
            {
                if(is_define(callback))
                {
                    callback();
                }
            }
        );
    }
    else if(type=="down")
    {
        api.pageDown
        (
            {"bottom":true},
            function(ret)
            {
                if(is_define(callback))
                {
                    callback();
                }
            }
        )
    }
}

//提示框
function $toast(txt,duration,location)
{
    if (!is_define(txt))
    {
        txt='Loading...';
    }
    if (!is_define(duration))
    {
        //duration=toast_time;
    }
    if (!is_define(location))
    {
        location='middle';
    }
    api.toast({
        msg : txt,
       // duration : duration,
        location : location
    });
}


//警告框
function $alert(txt,title,button)
{
    if(!is_define(title))
    {
        var title="";
    }
    if(!is_define(button))
    {
        var button="确定";
    }
    api.alert(
        {
            title : title,
            msg : txt,
            buttons:[button]
        });
}

//type=date选择日期，type=date_time选择日期时间,type=time选择时间
function open_datetime(type,title,datetime,callback)
{
    if(get_os()=="android"&&type=="date_time")
    {
        var true_type="date";
    }
    else
    {
        var true_type=type;
    }
    if(!is_define(title))
    {
        var title="";
    }
    if(!is_define(datetime))
    {
        var datetime="";
    }
    api.openPicker({
        type: true_type,
        date: datetime,
        title:title
    },function(ret,err)
    {
        if(type=="date")
        {
            var back_str=ret.year+"-"+num_two(ret.month)+"-"+num_two(ret.day);
            if(is_define(callback))
            {
                callback(back_str);
            }
        }
        else if(type=="time")
        {
            var back_str=num_two(ret.hour)+":"+num_two(ret.minute);
            if(is_define(callback))
            {
                callback(back_str);
            }
        }
        else if(type=="date_time")
        {
            if(get_os()=="ios")
            {
                var back_str=ret.year+"-"+num_two(ret.month)+"-"+num_two(ret.day)+" "+num_two(ret.hour)+":"+num_two(ret.minute);
                if(is_define(callback))
                {
                    callback(back_str);
                }
            }
            else
            {
                var back_str=ret.year+"-"+num_two(ret.month)+"-"+num_two(ret.day);
                api.openPicker(
                    {
                        type: 'time',
                        title:'选择时间'
                    },function(rets,errs)
                    {
                        back_str=back_str+" "+num_two(rets.hour)+":"+num_two(rets.minute);
                        if(is_define(callback))
                        {
                            callback(back_str);
                        }
                    })
            }
        }
    });
}


//下拉刷新
function push_down(callbak) {
    api.setRefreshHeaderInfo({
        visible : true,
        loadingImg : 'widget://image/refresh.png',
        bgColor : '#f1f1f1',
        textColor : '#4d4d4d',
        textDown : '下拉刷新...',
        textUp : '松开刷新...',
        showTime : true
    }, function(ret, err)
    {
        if (callbak)
        {
            callbak();
        }
    });
}

//下拉刷新恢复
function push_down_over()
{
    api.refreshHeaderLoadDone();
}

//上拉加载
function push_up(serverURL,data,callback)
{
    api.addEventListener(
        {
            name:'scrolltobottom',
            extra:
            {
                threshold:30           //设置距离底部多少距离时触发，默认值为0，数字类型
            }
        },function(ret,err)
        {
            data.pageNum++;
            var datas = new Object();
            //var loadingtotals = document.getElementById('loadingState')
            //    loadingtotals.style.display = "none"
            //   var html='<div id="pushup_trip" class="h15e" style="color:#666;display:flex;justify-content: center;align-items: center;padding:0.3rem 0;font-size: 0.18rem;">' +
            //        '<img class="w15e h15e" style="width:0.4rem;height:0.4rem;margin-right:0.1rem" src="../image/loading.svg">' +
            //        '<span>数据载入中...</span>' +
            //        '</div>';
                $api.append($api.dom('body'), html);

              if (!is_json(data))
               {
                   data = str2json(data);
                   datas.body.app_version = app_version
               }else{
                   datas.body = data
              }
              // alert(JSON.stringify(datas))


                api.ajax({
                    headers:{
                        "Authorization":"Bearer [accessToken]",
                        "content-Type":"application/json"
                    },
                url : serverURL,
                method : 'post',
                timeout : 5,
                dataType : 'json',
                returnAll : false,
                data : datas
            }, function(ret, err)
              {
                if (ret)
                {
                    if(is_define(callback))
                    {
                        callback(ret);
                    }
                    //push_up_over();
                    //loadingtotals.style.display = "block"
                }
                else
                {
                    net_error();//请求失败
                }
            })

        });
}

function apiAjax(serverURL,data,callback,errCallback){
console.log(serverURL);
console.log(JSON.stringify(data));
    var datas = new Object();
    if (!is_json(data))
    {
        data = str2json(data);
        datas.body.app_version = app_version
    }else{
        datas.body = data
    }
      api.ajax({
        headers:{
            "Authorization":"Bearer [accessToken]",
            "content-Type":"application/json"
        },
        url : serverURL,
        method : 'post',
        timeout : 5,
        dataType : 'json',
        returnAll : false,
        data : datas
    }, function(ret, err){
console.log(JSON.stringify(ret));
        if(ret){
            if(is_define(callback))
            {
                callback(ret);
            }
        }else{
            if(is_define(errCallback)){
                errCallback(err)
            }else{
                net_error(function(){
                    $toast('请求失败，请重试')
                });//请求失败
            }

        }
    })
}

//上拉加载恢复
function push_up_over()
{
    //$api.bodyi("#pushup_trip").remove();
    $api.remove($api.byId('pushup_trip'));
}

//拨打电话
function call_tel(tel)
{
    api.call(
        {
            type : 'tel_prompt',
            number : tel
        });
}

//发送短息
function send_sms(tel,text,c1,c2)
{
    api.sms(
        {
            numbers:[tel],
            text:text
        },function(ret, err)
        {
            if(ret.status)
            {
                if(is_define(c1))
                {
                    c1();
                }
                else
                {
                    $toast('发送成功');
                }
            }
            else
            {
                if(is_define(c2))
                {
                    c2();
                }
                else
                {
                    $toast('发送失败');
                }
            }
        });
}


//加载网页
function open_url(url)
{
    if (get_os()=='ios')
    {
        api.openApp({
            iosUrl : url
        },function(ret, err)
        {
        });
    }
    else
    {
        api.openApp(
            {
                androidPkg : 'android.intent.action.VIEW',
                mimeType : 'text/html',
                uri : url
            },function(ret, err)
            {
            });
    }
}


//获得设备编号
function get_osid(callback)
{
    var deviceId = api.deviceId;
    deviceId = deviceId.replace(/\-/g, "");
    if(is_define(callback))
    {
        callback(deviceId);
    }
    else
    {
        return deviceId;
    }
}

//显示模态加载
function show_doing(title,text,styles)
{
    if(!is_define(title))
    {
        var title='';
    }
    if(!is_define(text))
    {
        var text='';
    }
    if(!is_define(styles)){
        var styles = 'default'
    }
    api.showProgress(
        {
            style: styles,
            animationType: 'fade',
            title:title,
            text:text
        });
}

//关闭模态加载
function hide_doing()
{
    api.hideProgress();
}


//检测版本更新
function check_update()
{
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err)
    {
        if (ret)
        {
            var result = ret.result;
            if(ret.status==1)
            {
                if(result.update)
                {
                    api.confirm(
                        {
                            title:'版本更新',
                            msg : '发现新版本：'+result.version+','+result.updateTip,
                            buttons : ['确定更新', '稍后再说']
                        },
                        function(ret, err)
                        {
                            if (ret.buttonIndex==1)
                            {
                                if (api.systemType=='ios')
                                {
                                    api.installApp(
                                        {
                                            appUri:result.source       //安装包对应plist地址
                                        });
                                    exit_app();
                                }
                                else
                                {
                                    location.href=result.source;
                                }
                            }
                        })
                }
                else
                {
                    $toast('暂无新版本','1000');
                }
            }
            else
            {
                $toast('暂无新版本','1000');
            }
        }
        else
        {
            api.alert({msg:err.msg});
        };
    });
}

//静默更新
function update_widget()
{
    api.addEventListener({
            name:'smartupdatefinish'
        },
        function(ret,err)
        {
            if(is_define(ret.value[0].extra))
            {
                $confirm(ret.value[0].extra,'请重启应用','',new Array('',exit_app));
            }
        });
}

//退出APP
function exit_app()
{
    api.closeWidget(
        {
            id: appid,
            retData: {name:'closeWidget'},
            animation:
            {
                type: 'flip',
                subType: 'from_bottom',
                duration: 500
            },
            silent:true
        });
}

//退出App
function android_exit()
{
    api.addEventListener(
        {
            name:'keyback'
        },
        function(ret,err)
        {
            api.toast(
                {
                    msg : '再按一次返回键退出'+api.appName,
                    duration : 2000,
                    location : 'bottom'
                });
            api.addEventListener(
                {
                    name:'keyback'
                },
                function(ret, err)
                {
                    exit_app();
                });
        });
}

//执行指定窗口界面
function ue_script(winname,fun)
{
    api.execScript(
        {
            name:winname,
            script:fun
        });
}

//执行指定窗口界面
function ue_script_f(winname,framename,fun)
{
    api.execScript(
        {
            name:winname,
            frameName:framename,
            script:fun
        });
}

//清除缓存
function clear_cache(callback)
{
    api.clearCache
    (
        function(ret,err)
        {
            $toast('已清除',1000);
            if(is_define(callback))
            {
                callback();
            }
        }
    );
}

//网络不好的情况
function net_error(callback)
{
    $toast('网络开小差',1000);
    if(is_define(callback))
    {
        callback();
    }
}


//选择图片
function select_img(callback)
{
    if(!is_define(callback))
    {
        var callback='';
    }
    api.actionSheet(
        {
            title : '上传头像',
            cancelTitle : '关闭',
            buttons : ['打开相机', '本地图库']
        }, function(ret, err)
        {
            if(ret.buttonIndex==3)
            {
                return false;
            }
            else
            {
                var type_arr=new Array('camera','library');
                api.getPicture(
                    {
                        sourceType : type_arr[ret.buttonIndex-1],
                        encodingType : 'jpg',
                        mediaValue : 'pic',
                        destinationType : 'url',
                        allowEdit : true,
                        quality : 50,
                        targetWidth : 300,
                        targetHeight : 300,
                        saveToPhotoAlbum : false
                    },function(ret, err)
                    {
                        if (ret)
                        {
                            if(is_define(callback))
                            {
                                callback(ret.data);
                            }
                        }
                    })
            }
        });
}

//获取页面参数
function get_par()
{
    return api.pageParam;
}


//下载
function download(url,callback)
{
    var file_arr=url.split(".");
    var file_arr_len=file_arr.length;
    var ext_name=file_arr[file_arr_len-1];//得到扩展名
    var filename=new Date().getTime()+"."+ext_name;
    var savepath='fs://'+filename;
    api.download(
        {
            url: url,
            savePath: savepath,
            report: true,
            cache: true,
            allowResume:true
        },function(ret,err)
        {
            if (ret.state==1)
            {
                if(is_define(callback))
                {
                    callback(ret.savePath);
                }
            }
        });
}


//获取系统类型
function get_os(callback)
{
    var os=api.systemType;
    if(is_define(callback))
    {
        callback(os);
    }
    else
    {
        return os;
    }
}


//获取位置
function get_location(callback)
{
    api.getLocation
    (
        function(ret,err)
        {
            if(ret.status)
            {
                api.stopLocation();
                if(is_define(callback))
                {
                    callback(ret.latitude,ret.longitude);
                }
            }
            else
            {
                $toast('定位失败');
            }
        }
    );
}


//获取网络情况
function get_net()
{
    //如果unknown-未知，ethernet-以太网，wifi-wifi，2g-2G网络，3g-3G网络，4g-4G网络，none-无网络
    return api.connectionType;
}

//事件消息广番

function set_send(name,josnStr){
    api.sendEvent({
        name: name,
        extra: josnStr //必须为json对象的key:value键值对的形式；
    });
}
//在任何页面监听 sendEvent的传播；
function get_eventObj(name,callback){
    api.addEventListener({
        name: name
    }, function (ret, err) {
        if(ret){
            if(is_define(callback)){
                callback(ret.value)
            }

        }
    });
}

//电话监听
 function phoneListener (callback){
     var phoneListener = api.require('phoneListener');
         phoneListener.callStateListener({
             enable : true
         },
         function(ret) {
             //alert(JSON.stringify(ret));
             if(ret){
                 if(is_define(callback)){
                     callback(ret)          // state： IDLE        字符串类型；IDLE 挂断；OFFHOOK 接通电话；RINGING 来电
                 }
             }
         });
 }
