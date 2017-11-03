var app = angular.module("app",["ui.router"]);
app.controller("bodyController", function($scope,$timeout,$state,$location,$http) {
	
	$scope.new_num = 0;
	$scope.total = 0;
	$scope.pageIndex = 1;
	$scope.pageSize = 40;
	$scope.headList = [];
	$scope.tableList = [];
	$scope.pageCount = 0;
	$scope.isInitNextPage = true;
	$scope.fn = {
			loadData:function(){
				var _this = this;
				var table_id = $("#table_id").val();
				$("#table-mb").show();
				layer.load(0, {shade: false});
				this.post({
					url:"/chart/worktable/init",
					params:{table_id:table_id,pageIndex:$scope.pageIndex,pageSize:$scope.pageSize}
				}).success(function(res){
					layer.closeAll('loading');
					if(res.status == "success"){
						var data = res.data;
						var page = res.page
						var tableList = [];
						var _headList = [];
						if(data && data.length > 3){
							var headList = data[2];
							_headList = headList;
							var start = 3;
							for(var i = start;i<data.length;i++){
								tableList.push(data[i]);
							}
						}
						$scope.tableList  = tableList;
						$scope.new_num = tableList.length;
						$scope.total = page.totalCount;
						$scope.pageCount = page.pageCount;
						$scope.headList = _headList;
						_this.loadScrollJs();
					}else{
						
					}
				});
			},
			next:function(){
				var table_id = $("#table_id").val();
				if(!$scope.isInitNextPage){
					return;
				}
				
				if($scope.pageIndex > $scope.pageCount){
					return;
				}
				$scope.isInitNextPage = false;
				$scope.pageIndex++;
				layer.load(0, {shade: false});
				this.post({
					url:"/chart/worktable/next",
					params:{table_id:table_id,pageIndex:$scope.pageIndex,pageSize:$scope.pageSize}
				}).success(function(res){
					layer.closeAll('loading');
					$scope.isInitNextPage = true;
					if(res.status == "success"){
						var tableList = res.data;
						if(tableList && tableList.length>0){
							for(var i = 3;i < tableList.length;i++){
								$scope.tableList.push(tableList[i]);
							}
						}
						$scope.new_num = $scope.new_num+tableList.length;
					}else{
						
					}
				});
			},
			post:function(obj){
				return $http({
					method : 'POST',
					url:obj.url,
					params :obj.params,
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			},
			loadScrollJs : function(){  //��Ⱦscroll����js
				var _this = this;
				$(".MScroll").not('.MScrollyx').mCustomScrollbar({
					scrollButtons: {
						enable: false,
						scrollType: "continuous",
						scrollSpeed: 20,
						scrollAmount: 40
					},
					horizontalScroll: false
				});

				$(".MScrollyx").mCustomScrollbar({
					axis: "yx",
					scrollButtons: {
						enable: false,
						scrollType: "continuous",
						scrollSpeed: 20,
						scrollAmount: 40
					},
					theme: "light-thick",
					callbacks: {
						whileScrolling: function() {
							if($(this).find('.fixed_top').size() > 0) {
								var containerLT = $(this).find('.mCSB_container');
								var top = parseFloat(containerLT.css('top')) * -1;
								$(this).find('.fixed_top').css('top', top);
							}
							if($(this).find('.fixed_left').size() > 0) {
								var containerLT = $(this).find('.mCSB_container');
								var left = parseFloat(containerLT.css('left')) * -1;
								$(this).find('.fixed_left').css('left', left);
							}
							/*if($('.gzb_table').size() > 0) {
								var biaoti_tr = $('.biaoti_tr').eq(1);
								var biaoti_trLT = $('.gzb_table').parent('.mCSB_container');
								var top = parseFloat(biaoti_trLT.css('top')) * -1;
								biaoti_tr.css('top', top);
							}*/
							if($('.excel-table').size() > 0) {
								var biaoti_tr = $('.excel-table .thead').eq(1);
								var biaoti_trLT = $('.excel-table').parent('.mCSB_container');
								var top = parseFloat(biaoti_trLT.css('top')) * -1;
								biaoti_tr.css('top', top);
							}
							if($('.chart-table .table-mb').size() > 0) {
								var biaoti_tr = $('.chart-table .thead').eq(1);
								var biaoti_trLT = $('.chart-table .table-mb').parent('.mCSB_container');
								var top = parseFloat(biaoti_trLT.css('top')) * -1;
								biaoti_tr.css('top', top);
							}
							if (this.mcs.topPct >= 90) { //������������90%����
								if($scope.isInitNextPage){
									$scope.fn.next();
								}
							}
						}
					}
				});
			}
	};
	
	$scope.fn.loadData();
});

