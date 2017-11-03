$(function(){
	//点击回车键登陆
	$("body").bind('keyup',function(event) {  
	    if(event.keyCode==13){  
	    	 formsubmit();
	    }     
	});   
 
	/*$("#rememberme").click(function(){
		var _this = this;
		var username = $("#username").val();
		var passwd = $("#passwd").val();
		if($(_this).is(':checked')){//选中 记住密码
			if(username  &&  passwd){
				var isrememberme = true;
				storageService.setStoragePool("userdata",
						{username:username,passwd:passwd,isrememberme:isrememberme});
			}else{
				cwtx_fn("请输入账号和密码！");
			}
			

			
		}else{
			var isrememberme = false;
			storageService.setStoragePool("userdata",
					{username:"",passwd:"",isrememberme:isrememberme});
		}
	});*/

});

function renderStorage(){
	var userdata = storageService.getStoragePool("userdata");
	if(userdata){
		$("#username").val(userdata.username);
		$("#passwd").val(userdata.passwd);
		if(userdata.isrememberme){
			$("#rememberme").prop("checked",true);
		}
	}else{
		$("#username").val("");
		$("#passwd").val("");
	}
}

function showLoginPop(){
	$('#TX').html('');
	renderStorage();
	refreshCaptcha();
	$("#loginPop").show();
	
}

function cloesLogin(){
	$("#loginForm")[0].reset();
	$("#loginPop").hide();
}

function refreshCaptcha(){//刷新验证码
	var _url = "/getCaptcha?time="+new Date().getTime();
	$("#yzm").attr('src',_url);
}

//错误提醒函数
function cwtx_fn(cwtx_txt){
	$('#TX').html(cwtx_txt).slideDown('fast');
}
//提醒隐藏函数
function cwtx_fn_off(cwtx_txt){
	$('#TX').slideUp('fast');
}

function slayercheck(value){
	layer.msg(value,{
		time: 2000
	});
}

function formsubmit(){
	if($("#username").val()==""||$("#username").val()=="账号"||$("#username").val()=="账号/手机号"){
		//alert("请输入账号!");
		slayercheck("请输入账号!");
		$("#username").val("");
		return false;
	}
	
	if($("#passwd").val()==""||$("#passwd").val()=="密码"){
		//alert("请输入密码!");
		//$("#TX").text("请输入密码!");
		slayercheck("请输入密码!");
		return false;
	}
//	if($("#captcha").val()==""||$("#captcha").val()=="验证码"){
//		//alert("请输入验证码!");
//		$("#TX").text("请输入验证码!");
//		return false;
//	}
	$.ajax({
		　　url : '/login',
		　　data : $("#loginForm").serialize(),
		　　type : "POST",
		   async : false,
		　　success:function(json){
			  if(json.status == "success"){
				  var data = json.data;
				  var id = $("#username").val();
				  storageService.setStoragePool("id",id);
				  storageService.setStoragePool(id+"_theme",data.theme);
				  window.location.href = "/templatebase/index";
		     }else{
		    	 slayercheck(json.message);
					 $("#captcha").val("");
					 refreshCaptcha();//刷新验证码
		     }
		 }
	});
}
