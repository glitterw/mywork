
var sessionAgent = {

	keyMap:{
		userAuthInfo: 'userAuth', //用户权限信息
	},
	setLoginInfo : function(userEntity){
		var userEntityStr=$api.jsonToStr(userEntity);
		sessionAgent.setPrefs('userEntity',userEntityStr);
		sessionAgent.setPrefs('userId',userEntity.id);
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
		var userId = userEntity.id;
		if(userId != null && userId != "" && userId>0){
			return true;
        }else{
         return false ;
        }
    },
 
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
