/**
 *第三方登录和分享
 */
/*QQ接口*******************************************************************************/
//判断是否安装qq
function isInstalledQQ() {
	qq.installed(function(ret, err) {
		if (ret.status) {//布尔类型
			//已安装去登录
			loginQQ();
		} else {
			api.toast({
				msg : '您没有安装QQ客户端！',
				duration : 2000,
				location : 'bottom'
			});
		}
	});
}

//登录QQ授权
function loginQQ() {
	qq.login(function(ret, err) {
	}, function(ret, err) {
		//alert(JSON.stringify(ret));
		if (ret.status) {//成功登录  生成本站用户
			var values = {
				accessToken : ret.accessToken,
				openId : ret.openId,
				from : 'qq'
			}
			//加为本站用户
			addUser(values,"qq");
		} else {
			//alert(JSON.stringify(err));
			api.toast({
				msg : '登录授权失败！',
				duration : 2000,
				location : 'bottom'
			});
		}
	});
}

//加为本站用户
function addUser(values, sdkType) {
	var actionUrl = ajaxAgent.serverAction + '/jpjs/userinfo/checkIfHaveThisOuterUser'; 
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : values
		}
	}, function(ret, err) { 
	if(ret){
		if (ret.result == 1) {//生成成功
			if (ret.isNew == 1) {//新用户去获取qq资料
				if (sdkType == 'qq') {//qq用户
					getUserInfoQQ(ret.user.id, values.openId);
				} else if (sdkType == 'wx') {
					getUserInfoWX(ret.user.id, values.openId, values.accessToken);
				}
			} else {//老用户完成登录
				savesession(ret.user,0);
				//记录session
				api.closeWin();
				//关闭当前窗口
			}
		} else { 
			api.toast({
				msg : ret.msg,
				duration : 2000,
				location : 'bottom'
			});
		}
	  }else{  
			api.toast({
				msg : '登录失败！',
				duration : 2000,
				location : 'bottom'
			});	  
	  }
	});

}

//获取qq资料
function getUserInfoQQ(userId, openId) {
	qq.getUserInfo(function(ret, err) {
		var sex = 0;
		if (ret.info.gender == "女") {
			sex = 1;
		} else if (ret.info.gender == "男") {
			sex = 2;
		}
		if (ret.status) {//资料获取成功
			var values = {
				userId : userId,
				openId : openId,
				nickName : ret.info.nickname,
				sex : sex,
				icon : ret.info.figureurl_2
			}
			saveUserInfo(values);
		} else {
			api.toast({
				msg : '登录失败！',
				duration : 2000,
				location : 'bottom'
			});
		}
	});
}
var saveNum=0;
//保存资料
function saveUserInfo(values) {
   
	var actionUrl = ajaxAgent.serverAction + '/jpjs/userinfo/saveOuterInfo';
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : values
		}
	}, function(ret, err) {
		if (ret.result == 1) {//资料保存成功 记录session  
			//关闭当前窗口
			api.closeWin(); 
			//openCommonWin('个人资料', 'userEditInfo', 'frm_userEditInfo.html');   
			savesession(ret.user,1);  
		} else {//资料保存失败 
		   var valuesNew = {
				userId : values.userId,
				openId : values.openId, 
				sex : values.sex,
				icon : values.icon,
				nickName:'九派荐书用户',
			}
			saveNum++;
			if( saveNum<2){
			 saveUserInfo(valuesNew);//可能是保存昵称出现错误，所以把昵称去掉重新提交
			}else{
				api.toast({
					msg : '登录失败！',
					duration : 2000,
					location : 'bottom'
				});
			}
		}

	});
}

function shareQFriend(url, title, description, imgUrl) { 
	//首先判断是否
	qq.shareNews({
		type : 'QFriend',
		url : url, //'http://china.huanqiu.com/article/2016-05/8967850.html?from=bdwz',
		title : title, // '习近平总书记考察黑龙江 首站到伊春',
		description : description, //'5月23日上午，习近平总书记来到黑龙江省伊春市考察调研。伊春是全国重点国有林区，素有“祖国林都”“红松故乡”美誉。总书记十分关心林区全面停止商业性采伐后，产业转型发展和职工就业安置情况。他深入上甘岭林业局林区，实地察看天然林保护情况；走进林场职工家庭，了解转岗就业和生活状况；到伊春生态经济开发区和友好林业局蓝莓产业园，了解接续产业发展情况。习近平强调，林区转型发展既要保护好生态，也要保障好民生',
		imgUrl : imgUrl//'http://test.dhbigdata.cn/attached/test/cnjs.jpg', //imgUrl,//'http://news.baidu.com/resource/img/logo_news_276_88.png?date=20150104'
	}, function(ret, err) {
		if (ret.status) {//分享成功
			//关闭分享对话框
			api.closeFrame({
				name : 'shareBox'
			});
		} else {
			api.toast({
				msg : '分享失败！',
				duration : 2000,
				location : 'middle'
			});
		}
	});
}

//分享网页
function shareWebByQQ(qq) {
	qq.shareNews({
		type : 'QFriend',
		url : 'http://china.huanqiu.com/article/2016-05/8967850.html?from=bdwz',
		title : '习近平总书记考察黑龙江 首站到伊春',
		description : '5月23日上午，习近平总书记来到黑龙江省伊春市考察调研。伊春是全国重点国有林区，素有“祖国林都”“红松故乡”美誉。总书记十分关心林区全面停止商业性采伐后，产业转型发展和职工就业安置情况。他深入上甘岭林业局林区，实地察看天然林保护情况；走进林场职工家庭，了解转岗就业和生活状况；到伊春生态经济开发区和友好林业局蓝莓产业园，了解接续产业发展情况。习近平强调，林区转型发展既要保护好生态，也要保障好民生',
		imgUrl : 'http://news.baidu.com/resource/img/logo_news_276_88.png?date=20150104'
	}, function(ret, err) {
		if (ret.status) {//分享成功
			//关闭分享对话框
			api.closeFrame({
				name : 'shareBox'
			});
		} else {
			api.toast({
				msg : '分享失败！',
				duration : 2000,
				location : 'middle'
			});
		}
	});
}

/*微信接口*************************************************************************************************/

//判断是否安装了微信客户端
function isInstalledWX() {
	wx.isInstalled(function(ret, err) {
		if (ret.installed) {
			//alert("当前设备已安装微信客户端");
			getLSTokenWX();
		} else {
			api.alert({'msg':'当前设备未安装微信客户端'});
		}
	});
}

//获取临时令牌
function getLSTokenWX() {
	wx.auth({
		apiKey : ''
	}, function(ret, err) {
		if (ret.status) {
			//alert(JSON.stringify(ret));
			var lsToken = ret.code; 
			getTokenWX(lsToken);

		} else {
			api.toast({
				msg : '登录失败！',
				duration : 2000,
				location : 'bottom'
			});
		}
	});
}

//获取令牌
function getTokenWX(lsToken) {
	wx.getToken({
		apiKey : '',
		apiSecret : '',
		code : lsToken
	}, function(ret, err) {
		if (ret.status) {
			var accessToken = ret.accessToken;
			openId = ret.openId;
			dynamicToken = ret.dynamicToken;
			//刷新令牌
			var values = {
				accessToken : ret.accessToken,
				openId : ret.openId,
				from : 'wx'
			} 
			//加为本站用户
			addUser(values,"wx");
		} else {
			api.toast({
				msg : '登录失败！',
				duration : 2000,
				location : 'bottom'
			});
		}
	});
}

//获取用户信息
function getUserInfoWX(userId, openId, accessToken) {
	wx.getUserInfo({
		accessToken : accessToken,
		openId : openId
	}, function(ret, err) {
		if (ret.status) { 
			var sex = 0;
			if (ret.sex == 2) {//转化为本站性别值
				sex = 1;
			} else if (ret.sex == 1) {
				sex = 2;
			}
			//处理昵称为 
			var values = {
				userId : userId,
				openId : openId,
				nickName : ret.nickname,
				sex : sex,
				icon : ret.headimgurl
			} 
			saveUserInfo(values);

		} else {
			api.toast({
				msg : '登录失败！',
				duration : 2000,
				location : 'bottom'
			});
		}
	});
}

 
 

//刷新令牌
function refreshTokenWX() {
	wx.refreshToken({
		apiKey : '',
		dynamicToken : dynamicToken
	}, function(ret, err) {
		if (ret.status) {
			api.alert({'msg':JSON.stringify(ret)});
		} else {
			api.alert({'msg':err.code});
		}
	});
}

//分享网页
function shareWebpageWX(title,description,imgPath,url,scene) { 
	//根据文件路径获取图片类型
	var strList = imgPath.split("/"); 
	var fileName= strList.pop();//获取图片的名称 
	var splitArr =fileName.split(".");
	var exeName='';
	if(splitArr.length>0){ 
	 exeName=splitArr[0]+'.png';
	 }
	//alert('exeName:'+exeName);
	//定义图片保存的相对路径
	var savePath = 'fs://cache/shareBook/' + exeName;
	api.download({
		url : imgPath,
		savePath : savePath,
		report : true,
		cache : true,
		allowResume : true
	}, function(ret1, err1) {
		if (ret1.state == 1) {
			//下载成功
			//alert("下载成功："+savePath);
			wx.shareWebpage({
				apiKey : '',
				scene : scene, //session（会话）/timeline（朋友圈）/favorite（收藏）
				title : title,
				description : description,
				thumb : savePath,//imgPath,
				contentUrl : url
			}, function(ret, err) {
				if (ret.status) {
					//关闭分享对话框
					api.closeFrame({
						name : 'shareBox'
					});
				} else {
					api.toast({
						msg : '分享失败！',
						duration : 2000,
						location : 'middle'
					});
				}
			});
		}
		
		/*else{ 
			api.toast({
				msg : '分享失败2！',
				duration : 2000,
				location : 'bottom'
			});		
		}*/

	});

}

//远程图片缓存到手机上，并返回缓存地址
function imagePathChange(imgPath) {
	//根据文件路径获取图片类型
	var strList = imgPath.split("/"); 
	var fileName= strList.pop();//获取图片的名称 
	var splitArr =fileName.split(".");
	var exeName='';
	if(splitArr.length>0){ 
	 exeName=splitArr[0]+'.png';
	 }
	//alert('exeName:'+exeName);
	//定义图片保存的相对路径
	var savePath = 'fs://cache/shareBook/' + exeName;
	api.download({
		url : imgPath,
		savePath : savePath,
		report : true,
		cache : true,
		allowResume : true
	}, function(ret, err) {
		if (ret.state == 1) {
			//下载成功
			//alert("下载成功："+savePath);
			
			//var tagName = "img_" + no;
			//$api.setStorage(tagName, savePath);
		}

	});
}

