/**
 *注册相关函数
 * @param {Object} telNo
 */


/**
 * 发送验证码失败
 * @param string telNo 发送验证码的手机号
 * @param int opType 操作类型，0:注册操作，1：忘记密码操作
 */
function sendError(telNo,opType) { 
	var barTitle="";
	if(opType==0) {
	barTitle="注册新用户";
	}else if(opType==1){
		barTitle="忘记密码";
	}else{
		toastNetErr("error!");
		return false;
	}
	var pageParam = {
		frmName : "sendCodeFail",
		frmUrl : "frm_sendCodeFail.html",
		barTitle : barTitle,
		telNo : telNo,
		opType:opType
	}
	openCommonWinNew(pageParam);

} 
//忘记密码第二步
function nextUserRepasswd2(telNo,codeStr){ 
	var pageParam = {
		frmName : "userRepasswd2",
		frmUrl : "frm_userRepasswd2.html",
		barTitle : "忘记密码",
		telNo : telNo,
		seviceCode : codeStr
	}
	openCommonWinNew(pageParam);
}
 

//获取图片
function loadCellImg(sourceType,w,h) {
	api.getPicture({
		sourceType : sourceType,
		encodingType : 'png',
		mediaValue : 'pic',
		destinationType : 'url',
		allowEdit : true,
		quality : 80,
		targetWidth:w,
		targetHeight:h,
		saveToPhotoAlbum : false
	}, function(ret, err) {
		if (ret) { 
			if(ret.data) {
			    saveImg(ret.data);
			}else {
				toastNetErr("图片选取失败！");
			}
			
		} else { 
			toastNetErr(err.msg); 
		}
	});
}

//调取相机和相册
function selectImg(w,h) {  
	var selImgLocation = '';
	api.actionSheet({
		title : '设置头像',
		cancelTitle : '取消',
		buttons : ['拍照', '相册']
	}, function(ret, err) {
		var clkChoose = ret.buttonIndex;
		if ('1' == clkChoose) {//拍照
			loadCellImg('camera',w,h);
		} else if ('2' == clkChoose) {//相册
			loadCellImg('album',w,h);
		}
	});
	 
}

//保存图片，并返回服务器地址加载到页面上 
function saveImg(imgUrl){ 
	var actionUrl = ajaxAgent.serverAction + '/jpjs/userinfo/updateUserHead';
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data: {
			files : {
				file: imgUrl
			}
		}
	}, function(ret, err) { 
	//alertInfo(err);
		if (ret) {   
			//页面加载书的图片
			if(ret.result==1){
				if(ret.file){
				  var sevicePath=ret.file;
				  loadImg(sevicePath);
				}else{
					toastNetErr(ret.msg);
				} 
			}else{
				toastNetErr("网络错误！");
			}  
		}else{
		  toastNetErr("上传图片失败！");
		}
	});  

}

//记录性别选项
function selectSex(sexValue){  
	  $api.val($api.byId("sex"),sexValue);
	if (sexValue== 2) {
	    $api.removeCls($api.byId("sex1"), 'active');
		$api.addCls($api.byId("sex2"), 'active'); 
	} else if (sexValue == 1) {
		$api.removeCls($api.byId("sex2"), 'active');
		$api.addCls($api.byId("sex1"), 'active'); 
	}
	
}


//打开我要推荐窗口 pageType来源入口，0：全民荐书，1：我的荐书
function publishBook(pageType) {
	var userEntity=sessionAgent.getLoginInfo(); 
	if (sessionAgent.isLogin(userEntity)) { 
		/*
		if(userEntity.isVerify==0){
			toastNetErrBottom("该账号已经被冻结，请联系管理员");
			return false;
	    }*/	
		
		//openCommonWin("我要荐书", "myPublishBook", "frm_myPublishBook.html");
		api.openWin({
			name : "common_myPublishBook",
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
				barTitle : "我要荐书",
				frmName : "myPublishBook",
				frmUrl : "frm_myPublishBook.html",
				pageType:pageType
			}
		});

		return true;
	
	}else{ 
		openWinLogin();
		return false;
	}
	
 
}

