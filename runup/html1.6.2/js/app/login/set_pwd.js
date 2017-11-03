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
	$scope.data = {};
	
	
	$scope.fn={
			checkPassword:function(str){
				var reg = /^[\w]{6,12}$/;
				return reg.test(str);
			},
			active:function(){
				var _this = this;
				if(!$scope.data.news_password || !this.checkPassword($scope.data.news_password)){
					$scope.error1 = true;
					$scope.error1_msg = "请输入6-12位字符或数字";
					return;
				}
				
				if(!$scope.data.confirm_password || $scope.data.news_password != $scope.data.confirm_password){
					$scope.error2 = true;
					$scope.error2_msg = "两次输入密码不一致";
					return;
				}
				
				post({url:"/resetpwd/update",params:{password:$scope.data.confirm_password}}).
				success(function(json){
					if(json.status == "success"){						
						window.location.href = "/resetpwd/success";
					}else{
						alert(json.message);
					}
				});
				
			}
	};
	
});
