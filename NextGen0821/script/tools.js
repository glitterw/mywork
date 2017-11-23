/**
 *公共方法
 * autor:wpx
 * time:2016/6/6
 */

//设备监听返回键在首页点击返回关掉整个应用，其他地方点击返回关掉当前窗口
function keyBack() {
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        if (ret) {
            if (api.winName == "root" || ret.longPress) { //首页或者长按返回键关闭整个应用
                api.closeWidget({
                    id: api.appId,
                });
            } else {
                api.closeWin();
            }

        }
    });
}


//状态栏设置
function setStatusBar(headerObj) {
    api.setStatusBarStyle({
        style: 'dark'
    });
    $api.fixStatusBar(headerObj);
    $api.fixIos7Bar(headerObj);
}

//返回手机号码保密格式
function getSecretTel(telNo) {
    var secretTel = '';
    if (telNo.length >= 11) {
        //取出前3位
        secretTel = telNo.substring(0, 3);
        secretTel += '****';
        secretTel += telNo.substring(7, 11);
        return secretTel;
    } else {
        return telNo;
    }
}

//返回到上一页
function goBack() {
    api.closeWin();
}

//接口域名
var ajaxAgent = {
    //测试服务器
    serverAction: 'http://test-dt-api.infobigdata.com',
    //serverAction: 'http://192.168.9.69:8080',//曾柯机器
    version: '1.0',
    //生产环境
    //serverAction : 'http://dt-api.infobigdata.com',

};
//获取公共参数
function getCommonParam(userEntity){
  var commonParam={};
   if(userEntity){
     commonParam.id=userEntity.id;
     commonParam.token=userEntity.token;
   }else{
     commonParam.id='0';
     commonParam.token='';
   }
   commonParam.version='1.0';
   commonParam.device=getDevice();
   return commonParam;
}

//返回设备类型号
function getDevice(){
  var systemType = api.systemType;
  if(systemType=="android"){
      return 2;
  }else if(systemType=="ios"){
      return 3;
  }else{
    return 1;
  }

}

//将unicode编码转换为中文
function tranUnicode2Chn(str) {
    if (arguments.length > 0) {
        return unescape(str.replace(/\\/g, "%"));
    } else {
        return null;
    }
}

//错误输出
function toastNetErr(errCode) {
    var errMsg = '';
    if (errCode != null && errCode != "") {
        errMsg = errCode;
    } else {
        errMsg = '网络连接异常，请稍后再试';
    }
    api.toast({
        msg: errMsg,
        duration: 2000,
        location: 'middle'
    });
}

//错误从底部输出
function toastNetErrBottom(errCode) {
    var errMsg = '';
    if (errCode != null && errCode != "") {
        errMsg = errCode;
    } else {
        errMsg = '网络连接异常，请稍后再试';
    }
    api.toast({
        msg: errMsg,
        duration: 2000,
        location: 'bottom'
    });
}

//等待页面
function showProgress(text) {
    if (text == "") text = "先喝杯茶...";
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '努力加载中...',
        text: text,
        modal: false
    });
}
//调试信息打印
function testInfo(ret, err) {
    api.alert({
        "msg": "ret:" + JSON.stringify(ret)
    });
    api.alert({
        "msg": "err:" + JSON.stringify(err)
    });
}

//测试打印数据
function alertInfo(ret) {
    api.alert({
        msg: JSON.stringify(ret)
    });

}
//打开外部链接
function openHttpUrl(webName, httpUrl) {
    var pageParam = {
        frmName: 'httpName',
        frmUrl: httpUrl,
        barTitle: webName,
    }
    openCommonWinNew(pageParam);

}

//设置偏好值
function setPrefs(keyName, keyValue) {
    api.removePrefs({
        key: keyName
    });
    api.setPrefs({
        key: keyName,
        value: keyValue
    });
}
//获取偏好值
function getPrefs(key) {
    var keyValue = api.getPrefs({
        key: key,
        sync: true
    });
    if (null == keyValue || "" == keyValue) return "";
    else return keyValue;
}



/*文本框自动换行，超出字数限制提示
 * thisObj object 当前输入框对象
 * maxSize int  最大字数
 * msg  超出字数限制的提示
 */
function updateHeight(thisObj, maxSize, msg) {
    var height = 20; //一行的高度
    var bytesNum = getStrBytesCount($api.val(thisObj));
    var times = parseInt(bytesNum / 32) + 1; //一行显示36个字节，计算出行数

    thisObj.style.height = (times * height) + 'px';
    //thisObj.style.height=thisObj.scrollHeight + 'px';
    if (thisObj.value.length > maxSize) {
        toastNetErr(msg);
        return false;
    } else {
        return true;
    }

}
/*监听文本框输入的字数是否超出字数限制，如果超出给出提示
 * thisObj object 当前输入框对象
 * maxSize int  最大字数
 * msg  超出字数限制的提示
 */
function getMaxSize(thisObj, maxSize, msg) {
    if (thisObj.value.length > maxSize) {
        toastNetErr(msg);
        return false;
    } else {
        return true;
    }

}

/**
 *无数据显示页面
 */
function loadNothing(y, h) {
    api.openFrame({
        name: 'nothing',
        url: 'frm_nothing.html',
        rect: {
            x: 0,
            y: y,
            w: 'auto',
            h: h
        }
    });
}

//计算字符串的字节数
function getStrBytesCount(str) {
    var bytesCount = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
        {
            bytesCount += 1;
        } else {
            bytesCount += 2;
        }
    }
    return bytesCount;
}

//生成6位随机数字串
function rand6() {
    var randStr = "";
    for (var i = 0; i < 6; i++) {
        randStr += Math.floor(Math.random() * 10);
    }
    return randStr;
}

//生成安全码
function creatSecretCode(webName) {
    var secretCode = "zwy";
    secretCode += "-" + rand6() + "-" + webName;
    return secretCode;
}

//验证属性值是否为空
/*
 *@param  obj 被验证的元素
 * @msg   发送错误时的提醒
 */
function checkEmpty(obj, msg) {
    var value = $api.val(obj);
    //去掉两边的空格
    value = $api.trim(value);
    console.log("value:" + value);
    console.log("msg:" + msg);
    if (value.length <= 0) {
        api.toast({
            msg: msg,
            duration: 2000,
            location: 'middle'
        });
        return false;
    } else {
        return true;
    }

}

//验证手机号码格式
function checkTel(phone) {
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        //      api.alert({
        //		    title: '错误提示',
        //		    msg: '手机号码输入有误,请重新填写！',
        //		}, function(ret, err) {
        //
        //		});
        api.toast({
            msg: '手机号码输入有误,请重新填写！',
            duration: 3000,
            location: 'middle'
        });
        return false;
    } else {
        return true;
    }
}


/**
 *列表页面公用方法
 */
function listenToBottom(){ //拉到底部监听
  api.addEventListener({
      name: 'scrolltobottom',
      extra: {
          threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
      }
  }, function(ret, err) {
      //var sumNum = page * pageNum;
      //showBottomTab(sumNum,totalNum);
      //判断是否还有数据
      if (sumNum >= totalNum) {
           //加入回到顶部事件
           //goTop();
           //加载完了
          //showTheEndTab(totalNum);
          //关闭其他tab
          //hideBottomTab();
          toastNetErrBottom("加载完了！共"+totalNum+"条");
      } else {
        //去加载
         //显示loading
           showLoading();
           setTimeout(function(){
            page++;
           getList();
         },2000);
          api.parseTapmode();
      }

  });

}

//返回顶部
  function goTop(){
    $api.addEvt($api.dom(".the-end"), 'click', function(){
      //var top=document.body.scrollTop;
      //console.log("top:"+top);
      document.body.scrollTop=0;
    });
  }

/*底部tab处理
*@thisNum 已加载的数量
*@totalNum 总共的数量
*/
function showBottomTab(thisNum,totalNum){
  var showNum="已加载 "+thisNum+"/"+totalNum;
   $api.text($api.byId("showNum"), showNum);
   $api.removeCls($api.dom(".on-bottom"), 'hidden');
   hideLoading();
   hideTheEndTab();

}
//隐藏已加载tab
function hideBottomTab(){
   $api.addCls($api.dom(".on-bottom"), 'hidden');
}
/* loading tab
*/
function showLoading(){
  $api.removeCls($api.dom(".loading"), 'hidden');
  hideBottomTab();

}
//隐藏loading
function hideLoading(){
  $api.addCls($api.dom(".loading"), 'hidden');
}
/*加载完成显示总量
*@totalNum 总共的数量
*/
function showTheEndTab(totalNum){
  var showTotalNum="已加载全部"+totalNum+"条数据";
   $api.text($api.byId("showTotalNum"), showTotalNum);
   $api.removeCls($api.dom(".the-end"), 'hidden');
   hideLoading();
   hideBottomTab();
}
function hideTheEndTab(){
  $api.addCls($api.dom(".the-end"), 'hidden');
}

//头部刷新
function setRefreshHeader() {
    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: 'widget://image/refresh.png',
        bgColor: '#ccc',
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function(ret, err) {
        //alert(api.frameName);
        api.refreshHeaderLoadDone();
        page = 1;
        getList();

    });
}

//获取列表内容
/**
 *
 * @param string actionUrl 请求的接口地址
 * @param {Object} values 传递的数据
 */
function getListContent(actionUrl, values) {
    //showProgress();
    console.log(JSON.stringify(values));
    api.ajax({
        async: false,
        url: actionUrl,
        method: 'post',
        timeout: 30,
        dataType: 'json',
        returnAll: false,
        headers: {
            "Authorization": "Bearer [accessToken]",
            "Content-Type": "application/json; charset=utf-8"
        },
        data: {
            body: values
        }
    }, function(ret, err) {
       //$api.addCls($api.dom(".loading"), 'hidden');
       //console.log(JSON.stringify(values));
       //console.log(JSON.stringify(ret));
        if (ret) {
            makelist(ret);
            //showBottomTab(sumNum,totalNum);
            //hideLoading();
            return true;
        } else {
          //接口没有正常返回
            console.log("err:" + JSON.stringify(err));
            hideLoading();
            showBottomTab(sumNum,totalNum);
            toastNetErrBottom('网络异常,请稍后再试哦!');
        }
    });

}


//监听按了返回键操作
function keyBack() {
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        if (api.winName == "myIndex") { //首页点击，直接退出系统
            api.closeWidget();
        }

    });
}
