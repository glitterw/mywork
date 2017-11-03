// JavaScript Document
$(function () {
    $(".input").focus(function () {
        $(this).parent().addClass("ipt-focus");
    });
    $(".input").blur(function () {
        $(this).parent().removeClass("ipt-focus");
    });    
});


var index_apply = {
		loading:false,
		layercheck:function(value){
			layer.msg(value,{
				time: 2000
			});
		},
		layerfn:function(value,fn){
			layer.msg(value, {
				  time: 2000 
			}, function(){
				  fn();
			});
		},
		isEmail:function(str){
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
			return reg.test(str); 
		},
		isTelPhone:function(str){
			var reg = /^1\d{10}$/; 
			return reg.test(str); 
		},
		active:function(){
			var _this = this;
			var username = $("#username").val();
			var phone = $("#phone").val();
			var email = $("#email").val();
			var job_title = $("#job_title").val();
			var job_function = $("#job_function").val();
			
			if(!username){
				_this.layercheck("请输入姓名");
				return;
			}
			
			if(!_this.isTelPhone(phone)){
				_this.layercheck("请输入正确的手机号");
				return;
			}
			
			if(!_this.isEmail(email)){
				_this.layercheck("请输入正确的邮箱");
				return;
			}
			
			if(!job_title){
				_this.layercheck("请输入职位");
				return;
			}
			
			
			if(!job_function){
				_this.layercheck("请输入职位");
				return;
			}
			
			
			if(_this.loading){		
				_this.layercheck("提交中请稍等...");
				return;
			}
			
			_this.loading = true;
			$.ajax({
				type : "post",
				url : "/apply",
				data :{username:username,phone:phone,email:email,job_title:job_title,job_function:job_function},
				success : function(json){
					_this.loading = false;
					if(json.status =="success"){
						_this.layerfn("申请成功，请等待联系。",function(){
							window.location.reload();
						});
					}
					if (json.status == "error") {
						_this.layercheck(json.message);
					}
				}
			});
		}
};