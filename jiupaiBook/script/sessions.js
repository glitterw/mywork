var sessionAgent = {
	
	keyMap:{ 
		userAuthInfo: 'userAuth', //用户权限信息 
	},
	/* 
	setLoginInfo : function(userEntity){
		sessionAgent.setStorage(sessionAgent.keyMap.userAuthInfo, userEntity); 
		
		api.setPrefs({ key: 'userId', value: userEntity.userId });
		api.setPrefs({ key: 'userCellPhone', value: userEntity.cellPhone });
		api.setPrefs({ key: 'userNickName', value: userEntity.nickName });
	}, 

	getLoginInfo : function(){
		var userEntity = sessionAgent.getStorage(sessionAgent.keyMap.userAuthInfo);
		if(null==userEntity || ""==userEntity){
			userEntity= {};
		}
		return userEntity;
	},
	clearLoginInfo: function(){
		$api.rmStorage( sessionAgent.keyMap.userAuthInfo);	
		api.removePrefs({ key: 'userId'});
		api.removePrefs({ key: 'userCellPhone'});
		api.removePrefs({ key: 'userNickName'});
	},	
	 */
	
	setLoginInfo : function(userEntity){ 
		var userEntityStr=$api.jsonToStr(userEntity); 
		sessionAgent.setPrefs('userEntity',userEntityStr);
		sessionAgent.setPrefs('userId',userEntity.userId); 
	}, 
	getLoginInfo : function(){
		  var userEntity;
          var userEntityStr=sessionAgent.getPrefs('userEntity');
          if(""==userEntityStr){
            userEntity= {};
          }else{
          	userEntity=$api.strToJson(userEntityStr); 
          }
          return userEntity;
	},
	clearLoginInfo: function(){
		api.removePrefs({key:'userEntity' });
		api.removePrefs({key:'userId' });
	},
	setPrefs:function(keyName,keyValue){
		api.removePrefs({key:keyName });
		api.setPrefs({ key: keyName, value: keyValue });
	},
	getPrefs:function(key){
	    var keyValue=api.getPrefs({key:key,sync:true}); 
	    if(null==keyValue || ""==keyValue) return "";
	    else return keyValue;
	},
	  
	setStorage: function(key, obj){
		if(!!$api){
			$api.rmStorage( key)
			$api.setStorage(key, obj);
		}
	}, 
	getStorage: function(key){
		if(!!$api){
			return $api.getStorage(key);
		}else{
			return null;
		}
	},
  

  	isLogin: function(userEntity){//判断登录不跳转  
		var userId = userEntity.userId; 
		if(userId != null && userId != "" && userId>0){  
			return true;
        }else{  
         return false ; 
        }
    },  
    setNightTime: function(linkTagId, tag){//设置夜景模式
    	var linkObj= document.getElementById(linkTagId);
    	if(null!= linkObj && ""!=linkObj){
    		if(tag==1){
    			linkObj.setAttribute('href', '../css/nightStyle.css');
    		}else{
	    		linkObj.setAttribute('href', '');
    		}
    	}
    } 
}

//修改用户昵称
function updateNickName(){ 
	var userEntity = sessionAgent.getLoginInfo();
	var userNickName=userEntity.nickName; 
	if (userNickName!=null  && userNickName != ''){ 
		$api.html($api.byId("userNick"),userNickName);
	}
		
}

//退出系统
function loginOut() { 
	sessionAgent.clearLoginInfo();
	//alert("loginOUt:"+sessionAgent.getLoginInfo());
	api.execScript({
		name : 'root',
		frameName : 'userIndex',
		script : 'updateUserInfo()'
	});	
	api.closeWin();	
	 
}


//记录登录信息 user:用户对象
function savesession(user,isNew){ 
	var userEntity = {
		userId : user.id,
		nickName : user.nickName,
		sex : user.sex,
		iconPath : user.icon
	};
	sessionAgent.setLoginInfo(userEntity);  
	if(isNew){//第一次登陆的第三方用户跳转到编辑资料页面 
		openCommonWin('个人资料', 'userEditInfo', 'frm_userEditInfo.html');   
	} 
	//修改用户首页资料并跳转到修改资料的页面 
	api.execScript({
		name : 'root',
		frameName : 'userIndex',
		script : 'updateUserInfo();'
	}); 
	 
}

//询问服务器用户账号是否被冻结
function reLoadUserEntity(userEntity){
    var userId=userEntity.userId;
    if(userId != null && userId != "" && userId>0){
	  	var  actionUrl=ajaxAgent.serverAction+'/jpjs/userinfo/if_lock'; 
		api.ajax({
			url : actionUrl,
			method : 'post',
			timeout : 50,
			dataType : 'json',
			returnAll : false,
			data : {
				values : { 
					userId:userId
				}
			}
		}, function(ret, err) {  
				if (ret.result == 1) { //账号合法
				    if(ret.if_verify==1){
					    if(userEntity.isVerify==null || userEntity.isVerify==0){//如果之前的账号被冻结，现在解冻，重写session
							var userEntityNew = {
								userId : userEntity.userId,
								nickName : userEntity.nickName,
								sex : userEntity.sex,
								iconPath : userEntity.iconPath,
								isVerify :1
							};
							sessionAgent.setLoginInfo(userEntityNew); 
					    }
				    }else if(ret.if_verify==0){
					    if(userEntity.isVerify==null || userEntity.isVerify==1){//如果之前的账号被冻结，现在解冻，重写session
							var userEntityNew = {
								userId : userEntity.userId,
								nickName : userEntity.nickName,
								sex : userEntity.sex,
								iconPath : userEntity.iconPath,
								isVerify :0
							};
							sessionAgent.setLoginInfo(userEntityNew); 
					    }				    	
				    
				    }
				   return true; 
				}else {//没有正确返回   
			       return false;
				}  
		});	        
    	
    }else{//未登陆
       return false;
    
    }

}


