var app = angular.module("app",[]);
app.controller("bodyController", function($scope,$interval,$http) {
	var post = function(obj){
		return $http({
			method : 'POST',
			url:obj.url,
			params :obj.params,
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		});
	};

	$scope.error1 = false;
	$scope.error1_msg = "";
	$scope.error2 = false;
	$scope.error2_msg = "";
	$scope.error3 = false;
	$scope.error3_msg = "";
	$scope.sms_button_name = "获取验证码";
	$scope.data = {};
	
	
  $scope.sms_button_name = "获取验证码";  
  $scope.paraclass = "but_null";  
  $scope.paraevent = true;  
  var second = 60,  
          timePromise = undefined;  
	$scope.fn = {
			isSubmit:true,
			isTelPhone:function(str){
				var reg = /^1\d{10}$/; 
				return reg.test(str); 
			},
			clear:function(){
				$scope.error1 = false;
				$scope.error1_msg = "";
				$scope.error2 = false;
				$scope.error2_msg = "";
				$scope.error3 = false;
				$scope.error3_msg = "";
			},
			refreshCaptcha:function(e){
				var _url = "/getCaptcha?time="+new Date().getTime();
				$(e.target).attr('src',_url);
			},
			_refreshCaptcha:function(){
				var _url = "/getCaptcha?time="+new Date().getTime();
				$("#img_yzm").attr('src',_url);
			},
			timeCount:function(){
			       timePromise = $interval(function(){  
			           if(second<=0){  
			             $interval.cancel(timePromise);  
			             timePromise = undefined;  
			   
			             second = 60;  
			             $scope.sms_button_name = "重发验证码";  
			             $scope.paraevent = true;  
			  	     }else{  
			  	       $scope.sms_button_name = "稍等"+second + "秒";  
			  	       $scope.paraevent = false; 
			  	       second--;  
			  	        
			  	     }  
			     },1000,10); 
			},
			getSmsCode:function(){	
				var _this = this;
				if(!this.isTelPhone($scope.data.phone)){
					$scope.error1 = true;
					$scope.error1_msg = "请输入正确的手机号";
					return;
				}
				
				if(!$scope.data.code){
					$scope.error2 = true;
					$scope.error2_msg = "请输入验证码";
					return;
				}
				post({url:"/resetpwd/sendsms",params:{phone:$scope.data.phone,code:$scope.data.code}}).
				success(function(json){
					if(json.status == "success"){
						//倒计时
						_this.timeCount();
						$scope.error3 = true;
						$scope.error3_msg = "短信已发送";
						
					}else{
						if(json.data == "error_1"){
							$scope.error1 = true;
							$scope.error1_msg = json.message;
						}else if(json.data == "error_2"){
							$scope.error2 = true;
							$scope.error2_msg = json.message;
						}else{
							alert(json.message);
						}
					}
				});
				
			},
			active:function(){
				if(!this.isTelPhone($scope.data.phone)){
					$scope.error1 = true;
					$scope.error1_msg = "请输入正确的手机号";
					return;
				}
				
				if(!$scope.data.code){
					$scope.error2 = true;
					$scope.error2_msg = "请输入验证码";
					return;
				}
				
				if(!$scope.data.smscode){
					$scope.error3 = true;
					$scope.error3_msg = "请输入验证码";
					return;
				}
				
				post({url:"/resetpwd/phone",params:{phone:$scope.data.phone,code:$scope.data.code,smscode:$scope.data.smscode}}).
				success(function(json){
					if(json.status == "success"){
						window.location.href = "/resetpwd/update";
					}else{
						if(json.data == "error_1"){
							$scope.error1 = true;
							$scope.error1_msg = json.message;
						}else if(json.data == "error_2"){
							$scope.error2 = true;
							$scope.error2_msg = json.message;
						}else if(json.data == "error_3"){
							$scope.error3 = true;
							$scope.error3_msg = json.message;
						}else{
							alert(json.message);
						}
					}
				});
				
			}
	};
	
});
