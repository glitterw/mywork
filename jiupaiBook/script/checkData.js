/**
 *数据验证公用方法 
 */
//判断value值是否为空（去掉前后空格），为空或者null返回true,否则返回false
function isEmpty(value){
	if(value!=null){
		value=$api.trim(value);
		if(value.length==0){
			return true;
		}
		else{
		 return false;
		}
	}
	else{
		return true;
	}

}

//是否符合电话号码格式
function isCellPhone (cellphone){
	var Pattern=/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i;
	if(Pattern.test(cellphone)==false){
		return false;
	}else{
		return true;
	}
}

//验证密码的规则是否符合
function goodPassword(password){ 
     
	var reg= /^[a-zA-Z0-9!@#$%^&*()?~]{6,18}$/; //6-18位字母数字组合   
	//var reg2=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;//必须包含至少一个字母和一个数字6-18位组合 
	if(reg.test(password)==false){
		return false;
	}else {
		return true;
	} 
}