/**
 *公共方法
 * autor:wpx
 * time:2016/6/6
 */

//设备监听返回键在首页点击返回关掉整个应用，其他地方点击返回关掉当前窗口
function keyBack(){  
	api.addEventListener({
	    name:'keyback'
	}, function(ret, err){  
	    if( ret ){
	        if(api.winName=="root" || ret.longPress){//首页或者长按返回键关闭整个应用 
				api.closeWidget({
				    id: api.appId, 
				});	        	
	        }
	        else{ 
	        	api.closeWin();
	        } 
	        
	    } 
	});
}

//状态栏设置
function setStatusBar(headerObj) { 
	api.setStatusBarStyle({
		style : 'dark' 
	}); 
    $api.fixStatusBar(headerObj);
	$api.fixIos7Bar(headerObj); 
}

//返回手机号码保密格式
function getSecretTel(telNo){ 
	var secretTel=''; 
	if(telNo.length>=11){
		//取出前3位
		secretTel=telNo.substring(0,3);
		secretTel+='****';
		secretTel+=telNo.substring(7,11); 
		return secretTel;
	}
	else{
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
	//serverAction : 'http://192.168.11.180:8087', 
	serverAction : 'http://test.dhbigdata.cn',
	//生产环境
	//serverAction : 'http://bookadmin.jiupaicn.com', 
};
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
	} else{
		errMsg = '网络连接异常，请稍后再试';
	}
	api.toast({
		msg : errMsg,
		duration : 2000,
		location : 'middle'
	});
}

//错误从底部输出
function toastNetErrBottom(errCode) {
	var errMsg = ''; 
	if (errCode != null && errCode != "") {
		errMsg = errCode;
	} else{
		errMsg = '网络连接异常，请稍后再试';
	}
	api.toast({
		msg : errMsg,
		duration : 2000,
		location : 'bottom'
	});
}

//打开登录界面
function openWinLogin() { 
	api.openWin({
		name : 'userLogin',
		url : 'win_userLogin.html',
		bounces : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		allowEdit:true,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		}
	});
}

//打开公共的带返回的窗口
function openCommonWin(title, frmName, frmUrl) {
	api.openWin({
		name : "common_" + frmName,
		url : "win_common.html",
		bounces : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		allowEdit:true,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		},
		pageParam : {
			barTitle : title,
			frmName : frmName,
			frmUrl : frmUrl
		}
	});

}

//打开公共的带返回的窗口
function openCommonWinNew(pageParam) { 
	api.openWin({
		name : "common_" + pageParam.frmName,
		url : "win_common.html",
		bounces : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		allowEdit:true,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		},
		reload:true,
		pageParam : pageParam
	});

}

//打开指定窗口名的窗口
function openWin(winName, winUrl) {
	api.openWin({
		name : winName,
		url : winUrl,
		bounces : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		allowEdit:true,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		}
	});

}

//打开指定fram
function openFram(frmInfo){
	api.openFrame({
	    name: frmInfo.name,
	    url: frmInfo.url,
	    allowEdit:true,
	    rect: {
		    x:0,
		    y:frmInfo.pageParam.headerH,
		    w:'auto',
		    h:"auto"
	    },
	    pageParam:frmInfo.pageParam
	    
    });
}

function rand6() {
	var randStr = "";
	for (var i = 0; i < 6; i++) {
		randStr += Math.floor(Math.random() * 10);
	}
	return randStr;
}

//注册流程发送验证码下一步
function next(telNo, codeStr) {
	var pageParam = {
		frmName : "userRegister2",
		frmUrl : "frm_userRegister2.html",
		barTitle : "注册新用户",
		telNo : telNo,
		codeStr : codeStr
	}
	openCommonWinNew(pageParam); 
}

//等待页面
function showProgress(text){
 	if(text=="") text="先喝杯茶...";
	api.showProgress({
	    style: 'default',
	    animationType: 'fade',
	    title: '努力加载中...',
	    text: text,
	    modal: false
    });
}
//调试信息打印
function testInfo(ret,err){
	api.alert({"msg":"ret:"+JSON.stringify(ret)});
	api.alert({"msg":"err:"+JSON.stringify(err)});  
}

//测试打印数据
function alertInfo(ret){
	api.alert({msg:JSON.stringify(ret)
    });

}
//打开外部链接
function openHttpUrl(webName,httpUrl){
 var pageParam={
 	frmName:'httpName',
 	frmUrl:httpUrl,
 	barTitle:webName,
 }
 openCommonWinNew(pageParam);  

}

//设置偏好值
function setPrefs(keyName,keyValue){
	api.removePrefs({key:keyName });
	api.setPrefs({ key: keyName, value: keyValue });
}
//获取偏好值
function getPrefs(key){
    var keyValue=api.getPrefs({key:key,sync:true}); 
    if(null==keyValue || ""==keyValue) return "";
    else return keyValue;
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

/*文本框自动换行，超出字数限制提示
 * thisObj object 当前输入框对象
 * maxSize int  最大字数
 * msg  超出字数限制的提示
 */
function updateHeight(thisObj,maxSize,msg){  
 var height=20; //一行的高度
 var bytesNum=getStrBytesCount($api.val(thisObj)); 
 var times=parseInt(bytesNum/32)+1; //一行显示36个字节，计算出行数
  
 thisObj.style.height=(times*height)+'px';
 //thisObj.style.height=thisObj.scrollHeight + 'px'; 
 if(thisObj.value.length>maxSize){ 
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
function getMaxSize(thisObj,maxSize,msg){  
 if(thisObj.value.length>maxSize){ 
     toastNetErr(msg); 
  	 return false;   	
 } else {
 	return true;
 }
 
}

/**
 *无数据显示页面 
 */
function loadNothing(y,h){
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
function getStrBytesCount(str){
   var bytesCount=0;
	for (var i = 0; i < str.length; i++)
	{
	  var c = str.charAt(i);
	  if (/^[\u0000-\u00ff]$/.test(c)) //匹配双字节
	  {
	  bytesCount += 1;
	  }
	  else
	  {
	  bytesCount += 2;
	  }
	}
    return bytesCount;
}

 
