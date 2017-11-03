var app = angular.module("app",["ui.router","ngDragDrop","ui.sortable"]);
var myChart;
app.controller("bodyController", function($scope,$timeout,$state,$location,commonService,chartService,commonData) {	
	//myChart 
	var layercheck = function(value){
		layer.msg(value,{
			time: 2000
		});
		return false;
	}
	
	
	$scope.temp_chart_id = "";
	$scope.chart_nothing_msg = "当前图表无数据";
	$scope.chartOperate = {
			tag_selected:1,//1.图形选择;2.图形设置
			selectChartType:"",//被勾选的图表类型
			selectChartObj:{id:"",icon:""},//被勾选的图表附加对象
			yAxis_chartType:"",
			yAxis_chartObj:{id:"",icon:""},
			y2Axis_chartType:"",
			y2Axis_chartObj:{id:"",icon:""},
			draggableElment:null,//被拖拽的元素
			draggableElmentIndex:0,
			draggableElmentType:"",
			colourElment:{},	
			colourElmentIndex:0,
			color_wheel:commonData.color_wheel,
			color_wheel_id:commonData.color_wheel[0].id,
			color_wheel_name:commonData.color_wheel[0].name,
			apply_colors:[],
			temp_args:[],
			temp_args2:[],
			sort:{type:"",fid:"",unique_id:""}
	};
	
	$scope.chartSetting = new Object();//图形设置参数
	$scope.show_field_method = false;//字段对齐方式默认关闭
	$scope.show_field_sort = true;//字段排序默认开启
	$scope.type_ava_show = false;//数值轴 可选图表 展开效果
	$scope.mask_show = false;//全局遮罩层
	$scope.color_setup_show = false;//颜色选择器框
	$scope.special_color_setup_show = false;//特殊颜色选择器
	$scope.is_special_color =  false;
	$scope.chart_nothing = false;
	
	$scope.edit_filter_show = false;//编辑筛选框
	$scope.save_dia_show = false;//提示框
	$scope.filterDialog_operation = "";//筛选器弹框类型  add, modify
	$scope.show_secondary_axis = false;// 是否显示次轴
	$scope.show_secondary_button = false;
	$scope.axis_set_enable = false;//图形设置默认隐藏
	$scope.mertering_condition_format_show = false;//计量图-条件格式弹框
	$scope.field_condition_list = commonData.field_condition_list1;
	$scope.default_color_wheel = commonData.color_wheel[0].colors;	
	$scope.mertering_set_value_show = false;//计量图-设置目标值弹框
	$scope.value_type_list = commonData.value_type_list;
	$scope.mertering_field_list = [];//计量图-设置目标值的 计算值 的下拉字段集合
	$scope.meter_aggregators = commonData.meter_aggregators;
	$scope.change_height_random = "";
	
	$scope.tb_row_statistic_method_list = commonData.tb_row_statistic_method_list;
	$scope.tb_col_statistic_method_list = commonData.tb_col_statistic_method_list;
	$scope.tb_row_statistic_method = commonData.tb_row_statistic_method;
	$scope.tb_col_statistic_method = commonData.tb_col_statistic_method;
	$scope.tb_row_statistic_pos_list = commonData.tb_row_statistic_pos_list;
	$scope.tb_col_statistic_pos_list = commonData.tb_col_statistic_pos_list;
	$scope.tb_row_statistic_pos = commonData.tb_row_statistic_pos;
	$scope.tb_col_statistic_pos = commonData.tb_col_statistic_pos;
	
	$scope.chart_type_index = false;//图表类型 false  不是指标卡   true 是指标卡
	$scope.chart_type_indexhtml = "";
	$scope.chart_type_index_uuid = "";
	$scope.index_condition_formart_show = false;//指标卡-条件格式弹框
	$scope.index_format_style_list = commonData.index_format_style_list;
	$scope.index_format_style_list2 = commonData.index_format_style_list2;
	$scope.top_reverse_list = commonData.top_reverse_list;
	$scope.top_type_list = commonData.top_type_list;
	$scope.chart_type_table_uuid = "";
	$scope.chart_type_tablehtml = "";
	
	$scope.table_condition_formart_show = false;//指标卡-条件格式弹框
	$scope.table_format_style_list = commonData.table_format_style_list;
	//辅助线
	$scope.y_guide_show = false;
	$scope.y2_guide_show = false;
	$scope.scatter_guide_show = false;
	
	$scope.guide_formulas = commonData.guide_formulas;
	//百分位
	$scope.percentile_list = commonData.percentile_list;
	//高级计算
	$scope.advance_calculation_list = commonData.advance_calculation_list;
	$scope.advance_retention_list = commonData.advance_retention_list;
	$scope.tongbi_huanbi_show = false;
	$scope.tongbi_huanbi_obj = {};
	$scope.tongbi_huangbi_list = commonData.tongbi_huangbi_list;
	$scope.tongbi_huanbi_box_lis = [];
	$scope.tongbi_huanbi_li_show = false;
	$scope.yoyQoqType_list = commonData.yoyQoqType_list;
	
	
	
	//数值显示格式
	$scope.numeric_format_show = false;
	$scope.numeric_format_obj = {};
	$scope.numeric_format_units = commonData.numeric_format_units;
	
	//设置字段名称
	$scope.set_field_name_show = false;
	$scope.set_field_name_obj = {};
	$scope.dragFlag  = "";
	$scope.dragFlag_index = 0;
	$scope.news_drag  = "";
	$scope.is_remove = false;
	$scope.drag_change = false;
	$scope.is_change = false;
	$scope.sortableOptions = {
		start:function(t, a) {
			$scope.dragFlag = t.target.id.replace("drag", "").toLowerCase();	
			$scope.dragFlag_index = a.item.sortable.index;
			$scope.drag_change = false;
			$scope.is_change = false;
        },
        sort: function(e, t) {
        },
		update:function(t, a) {
			var i = a.item.sortable.model;
			var l = a.item.sortable.dropindex;
			var dragFlag_index = $scope.dragFlag_index;
			if($scope.is_change){
				return false;
			}	
			if($scope.dragFlag != $scope.news_drag){
				if($scope.news_drag == "x"){
					$scope.container.x_axisList.splice(l, 0, i); 
				}else if($scope.news_drag == "y"){
					$scope.container.y_axisList.splice(l, 0, i); 
				}else if($scope.news_drag == "y2"){
					$scope.container.y2_axisList.splice(l, 0, i); 
				}
				
				a.item.sortable.cancel();
				
				if($scope.dragFlag == "x"){
					$scope.container.x_axisList.splice(dragFlag_index,1);
				}else if($scope.dragFlag == "y"){
					$scope.container.y_axisList.splice(dragFlag_index,1);
				}else if($scope.dragFlag == "y2"){
					$scope.container.y2_axisList.splice(dragFlag_index,1);
				}
				$scope.drag_change = true;
			}
			
			$scope.is_change  = true;
			$scope.container.xDataColors = [];
			
			if($scope.drag_change && $scope.is_remove){
				if($scope.dragFlag == "x"){
					if($scope.news_drag == "y"){
						$scope.container.y_axisList.splice(l,1);
					}else if($scope.news_drag == "y2"){
						$scope.container.y2_axisList.splice(l,1);
					}
				}
			}
			$scope.fn.modify();
			
			return false;
		},
        out:function(t,a){
        	a.item.sortable.model.remove = true;
        },
        over: function(t,a) {
        	a.item.sortable.model.remove = false;
        },
        beforeStop: function(t, a) {
        	$scope.news_drag =  angular.element(".ui-sortable-placeholder").parent()[0].id.replace("drag", "").toLowerCase();//落地位置
			var i = a.item.sortable.model;
            var is_remove = i.remove;
			var news_drag = $scope.news_drag;
			$scope.is_remove = is_remove;
			if(!is_remove && $scope.dragFlag != news_drag){						
				var column_id = i.column_id;
				var data_type = i.data_type;
				var args = [];			
				var field = $scope.fn.traceBackFieldByColumnList(column_id, data_type);
				if(news_drag == "x"){
					commonService.addXaxis(args,field);
					a.item.sortable.model = args[0];
					a.item.sortable.model.remove = is_remove;
				}else if(news_drag == "y"){					
					commonService.addYaxis(args,field);
					a.item.sortable.model = args[0];
					a.item.sortable.model.remove = is_remove;
				}else if(news_drag == "y2"){
					commonService.addY2axis(args,field);
					a.item.sortable.model = args[0];
					a.item.sortable.model.remove = is_remove;
				}
			}else{
				$scope.drag_change = false;
			}
        },
		stop: function(t, a) {
			var dragFlag_index = $scope.dragFlag_index;
			$scope.is_change = false;
			if(!$scope.drag_change && $scope.is_remove){
				if($scope.dragFlag == "x"){
					$scope.container.x_axisList.splice(dragFlag_index,1);
				}else if($scope.dragFlag == "y"){
					$scope.container.y_axisList.splice(dragFlag_index,1);
				}else if($scope.dragFlag == "y2"){
					$scope.container.y2_axisList.splice(dragFlag_index,1);
				}
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.SCATTER){
					var xData = [];
					if($scope.container.x_axisList.length == 0){
						if($scope.container.xDataColors && $scope.container.xDataColors.length >= 1){
							var xDataColors = $scope.container.xDataColors[0];
							if(!xDataColors){
								xDataColors = new Object();
								xDataColors.color = commonService.randomColor();
								xDataColors.unique_id = commonService.getUniqueId();
							}
							xDataColors.name = "颜色";
							xData.push(xDataColors);
						}else{
							var data = new Object();
							data.name = "颜色";
							data.color = commonService.randomColor();
							data.unique_id = commonService.getUniqueId();
							xData.push(xDataColors);
						}
					
						$scope.container.xDataColors = xData;
					}else{
						$scope.container.xDataColors = [];
					}
				}else{
					$scope.container.xDataColors = [];
				}
				$scope.fn.cleanUpFormat();
				$scope.container.xLen = $scope.container.x_axisList.length;
				$scope.container.yLen = $scope.container.y_axisList.length;
				$scope.container.y2Len = $scope.container.y2_axisList.length;
				var current = $scope.fn.getMeetCharts($scope.container.xLen,
						$scope.container.yLen,
						$scope.container.y2Len,
						$scope.chartOperate.selectChartType);
				if(current){
					$scope.fn.chartSelect(current);
				}
				$scope.fn.modify();
			}
		},
		zIndex :1000,
        opacity: .6,
        connectWith: ".drag-target-list-dimension"
	};
	
	//图表tip
	//$scope.tool_tip_show = false;
	
	$scope.edit_filter_data = {
			select_filter_condition_type:"",
			select_filter_condition_typename:"请选择条件",
			select_filter_condition_value1:"",
			select_filter_condition_value2:""
	};//编辑筛选框对象
	$scope.container ={
			chartList:[],//所有图表集合
			yAxis_chartList:[],//数值轴 可选图表
			columnList:[],//字段集合	
			x_axisList:[],//被确定的维度集合
			y_axisList:[],//被确定的数值集合
			y2_axisList:[],//被确定的次轴数值集合
			color_fileds:[],
			xDataColors:[],
			xLen:0,//维度集合的长度
			yLen:0,//数值集合的长度
			y2Len:0,//次轴数值集合的长度
			filterList:[]//筛选器的集合
	};
	
	$scope.chart_option = {};
	
	$scope.fn = {
			loadInfo:function(){
				var _this = this;
				var table_id =  $("#base_table_id").val();
				$scope.temp_chart_id = $("#base_chart_id").val();
				$("#chartEdit").show();//防止页面闪烁
				$scope.container.chartList = [];
				commonService.post({
					url:'/chart/baseinfo',
					params :{ table_id : table_id,id:$scope.temp_chart_id}
				}).success(function(res){				
					if(res.status == "success"){
						var data = res.data;
						var chartList = data.chartList;
						var yAxisCharts = data.yAxisCharts;
						var columnList = data.columnList;
						$scope.chartSetting.chart_name = data.chart_name || "";
						if(chartList && chartList.length > 0){
							for(var i= 0;i<chartList.length;i++){
								var o = chartList[i];
								o.show = false;
								o.show_icon = o.icon+"-disable";
							}
						}
						
						if(columnList && columnList.length > 0){
							for(var i = 0;i<columnList.length;i++){
								commonService.fieldHandler(columnList[i]);
							}
						}
						$scope.container.columnList = columnList;
						$scope.container.chartList = chartList;
						$scope.container.yAxis_chartList = yAxisCharts;
						_this.initChartData();
						_this.initFieldDraggable();
					}else{
						
					}
				});
			},
			//清理格式
			cleanUpFormat:function(){
				var _this = this;
				//if($scope.chartOperate.selectChartType == commonData.chart_type_set.TABLE){
				var table_delete_list = [];
				var table_format_list = $scope.chartSetting.table_format_list;
				if(table_format_list && table_format_list.length > 0){
					for(var i = 0;i < table_format_list.length;i++){
						if(!_this.checkYaxisList(table_format_list[i].unique_id)){
							table_delete_list.push(i);
						}
					}
					if(table_delete_list && table_delete_list.length > 0){
						for(var i = 0;i < table_delete_list.length;i++){
							table_format_list.splice(table_delete_list[i],1);
						}
					}
				}
				
				var guide_delete_list1 = [];
				var guide_list = $scope.chartSetting.guide_list;
				if(guide_list && guide_list.length > 0){
					for(var i = 0;i < guide_list.length;i++){
						if(!_this.checkYaxisList(guide_list[i].unique_id)){
							guide_delete_list1.push(i);
						}
					}
					
					if(guide_delete_list1 && guide_delete_list1.length > 0){
						for(var i = 0;i < guide_delete_list1.length;i++){
							guide_list.splice(guide_delete_list1[i],1);
						}
					}
				}
				var guide_delete_list2 = [];
				var guide_list2 = $scope.chartSetting.guide_list2;
				if(guide_list2 && guide_list2.length > 0){
					for(var i = 0;i < guide_list2.length;i++){
						if(!_this.checkYaxisList2(guide_list2[i].unique_id)){
							guide_delete_list2.push(i);
						}
					}
					
					if(guide_delete_list2 && guide_delete_list2.length > 0){
						for(var i = 0;i < guide_delete_list2.length;i++){
							guide_list2.splice(guide_delete_list2[i],1);
						}
					}
				}
				
			},
			checkYaxisList:function(unique_id){
				var flag = false;
				var y_axisList = $scope.container.y_axisList;
				if(y_axisList && y_axisList.length > 0){
					for(var i = 0 ;i < y_axisList.length;i++){
						if(y_axisList[i].unique_id == unique_id){
							flag = true;
							break;
						}
					}
				}
				return flag;
			},
			checkYaxisList2:function(unique_id){
				var flag = false;
				var y_axisList = $scope.container.y2_axisList;
				if(y_axisList && y_axisList.length > 0){
					for(var i = 0 ;i < y_axisList.length;i++){
						if(y_axisList[i].unique_id == unique_id){
							flag = true;
							break;
						}
					}
				}
				return flag;
			},
			traceBackFieldByColumnList:function(column_id,data_type){
				var _obj = null;
				var columnList = $scope.container.columnList;
				if(columnList && columnList.length > 0){
					for(var i = 0;i < columnList.length;i++){
						var c = columnList[i];
						if(c.column_id == column_id){
							if(data_type == commonData.data_type_set.SUB_DATE){
								var  dateList = c.dateList;
								if(dateList && dateList.length > 0){
									for(var j = 0; j < dateList.length;j++){
										var d = dateList[j];
										if(d.column_id == column_id){
											return d;
										}
									}
								}
							}else{
								_obj = c;
								break;
							}
						}
					}
				}
				return _obj;
			},
			chartSelect:function(obj){
				if(!obj.show){
					return;
				}
				$scope.chartOperate.selectChartType = obj.type;
				
				if($scope.chartOperate.selectChartType != commonData.chart_type_set.TABLE){//不是表格则 清除 排序
					$scope.chartOperate.sort = {type:"",fid:"",unique_id:"",data_type:""};
				}
				
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.SANKEY){
					if(!$scope.chartSetting.processMain){
						var columnList = $scope.container.columnList;
						if(columnList && columnList.length > 0){
							for(var i = 0;i < columnList.length;i++){
								var column = columnList[i];
								if(column.data_type !=commonData.data_type_set.DATE){
									var args = [];
									commonService.addXaxis(args,column);
									$scope.chartSetting.processMain = args[0];
									break;
								}
							}
						}
						
					}

					$scope.chartOperate.his_selectChartType = commonData.chart_type_set.SANKEY;
					$scope.container.xDataColors = [];
				}else{
					$scope.chartSetting.processMain = {};
					if($scope.chartOperate.selectChartType != commonData.chart_type_set.RECTANGLE_TREE){
						$scope.chartOperate.his_selectChartType = "";
					}
				}
				
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.RECTANGLE_TREE &&
						$scope.chartOperate.his_selectChartType == commonData.chart_type_set.SANKEY){
					$scope.container.xDataColors = [];
				}

				//智能识别  如果 1不是双轴图 且y2存在字段， 则将y2的字段 追加到 y中 ，2如果不是双轴图，y的字段超过2个，则获取最后一个 并追加到y2中
				this.intelligentAxis();
				this.modify();
			},
			intelligentAxis:function(){
				var y_axisList = $scope.container.y_axisList;
				var y2_axisList = $scope.container.y2_axisList;
				
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.BIAXIAL){
					if(!y2_axisList || y2_axisList.length == 0){//次轴没有字段时
						var _ylen = y_axisList.length;
						if(y_axisList && _ylen > 1){//y轴字段数量超过一个时
							var field = y_axisList[_ylen-1];
							var moveField = {};
							angular.copy(field, moveField);
							y_axisList.splice(_ylen-1,1);
							y2_axisList.push(moveField);	
							$scope.container.yLen = y_axisList.length;
							$scope.container.y2Len = y2_axisList.length;
						}
					}
				}else{
					if(y2_axisList && y2_axisList.length > 0){
						var copy_list = [];
						angular.copy(y2_axisList, copy_list);
						for(var i = 0;i < copy_list.length;i++){
							y_axisList.push(copy_list[i]);
						}
						$scope.container.y2_axisList = [];//次轴清空
						$scope.container.yLen = y_axisList.length;
						$scope.container.y2Len = y2_axisList.length;
					}
				}
				
			},	
			showColorSet:function(){
				var show = true;
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.TABLE){
					show = false;
				}	
				return show;
			},
			yAxisChartSelect:function(type,obj){
				if(type == 'y'){
					$scope.chartOperate.yAxis_chartType = obj.type;
					$scope.chartOperate.yAxis_chartObj = {id:obj.type,icon:obj.icon};
				}else if(type == 'y2'){
					$scope.chartOperate.y2Axis_chartType = obj.type;
					$scope.chartOperate.y2Axis_chartObj = {id:obj.type,icon:obj.icon};
				}
				this.modify();
			}, 
			showTypeAva:function(){
				$scope.type_ava_show = $scope.type_ava_show === false ? true: false;
			},
			renderChartList:function(){
				var chartList = $scope.container.chartList;
				var x = $scope.container.xLen;
				var y = $scope.container.yLen;
				var y2 = $scope.container.y2Len;
				if(chartList){
					for(var i = 0;i < chartList.length;i++){
						var o = chartList[i];
						var expression = o.expression;
					 	var show_o =  o.show = eval(expression);
						o.show_icon = show_o?o.icon:o.icon+"-disable";
					}
				}

				if($scope.chartOperate.selectChartType == commonData.chart_type_set.BIAXIAL){
					$scope.show_secondary_axis = true;
				}else{
					$scope.show_secondary_axis = false;
				}
				
				if(x > 0 && y>=2){
					if($scope.chartOperate.selectChartType == commonData.chart_type_set.SCATTER){
						$scope.show_secondary_button = false;
					}else{
						$scope.show_secondary_button = true;
					}
					
				}else{
					$scope.show_secondary_button = false;
				}
				
				
				$scope.change_height_random = commonService.getUniqueId();
				
				if(x == 0 && y ==0 && y2 ==0){
					$scope.chartOperate.selectChartType = "";
					$("#chart").html("");
					$scope.chart_nothing = true;
				}
				
				if(x>0 || y>0 || y2>0){
					$scope.axis_set_enable = true;
				}else{
					$scope.axis_set_enable = false;
				}
				
				this.checkColorSetUp();
			},
			initChartData:function(){
				this.getChartInfo();
			},
			clearNoNum:function(obj,attr){		
				if(!obj[attr] || obj[attr] == undefined ){
					obj[attr] = 0;
				}else{	
					if(parseFloat(obj[attr]) < 0){
						obj[attr] = 0;
					}else{
						obj[attr] = obj[attr] + "";
						var temp = obj[attr].replace(/^\./g,"");
						obj[attr] = parseInt(temp);
					}	
				}

			},
			getChartInfo:function(){
				var _this = this;
				var chart_id = $("#base_chart_id").val();
				layer.load(0, {shade: false});
				commonService.post({
					url:'/chart/query',
					params :{ id : chart_id}
				}).success(function(res){
					layer.closeAll('loading');
					if(res.status == "success"){
						var data = res.data;
						var json_params = data.params?eval('(' + data.params + ')'):{};
						if(Object.keys(json_params).length ==0){
							$scope.chart_nothing = true;
							return;
						}
						$scope.chart_nothing_msg = "当前图表无数据";
						var option = _this.renderChartStructure(data.chart_type,json_params,data.querydata);
						_this.relatedAction();
						_this.renderChartList();
						_this.cacheChartOption(chart_id,option);
					}else{
						$scope.chart_nothing = true;
						$scope.chart_nothing_msg = "当前图表无数据";
					}	
//					}else{
//						$("#chart").html("");
//						$scope.chart_nothing = true;
//						$scope.chart_nothing_msg = res.message;
//					}
				});
			},
			//缓存chart_option
			cacheChartOption:function(chartid,option){				
				var data = {chart_id:chartid,option:option};
				commonService.http({
					url:'/chart/cacheOption',
					data:data
				}).success(function(res){
					if(res.status == "success"){}
				});
			},
			modify:function(){
				var _this = this;
				this.modifyAction(function(){
					_this.getChartInfo();
				});
			},
			modifyAction:function(fn){
				var _this = this;
				var data = new Object();
				data.chart_id = $("#base_chart_id").val();
				data.chart_name = $scope.chartSetting.chart_name;
				data.chart_type = $scope.chartOperate.selectChartType;
				data.description = $scope.chartSetting.description || "";
				var main = new Object();
				main.x_axisList = $scope.container.x_axisList;
				main.y_axisList = $scope.container.y_axisList;
				main.y2_axisList = $scope.container.y2_axisList;
				main.color_fileds = $scope.container.color_fileds;
				main.xDataColors = $scope.container.xDataColors;
				
				$scope.container.xLen = $scope.container.x_axisList.length;
				$scope.container.yLen = $scope.container.y_axisList.length;
				$scope.container.y2Len = $scope.container.y2_axisList.length;
				main.xLen = $scope.container.xLen;
				main.yLen = $scope.container.yLen;
				main.y2Len = $scope.container.y2Len;
				main.filterList = $scope.container.filterList;
				main.target_value = $scope.chartSetting.target_value;
				data.params = {chartSetting:$scope.chartSetting,
						chartOperate:$scope.chartOperate,
						main:main};

				layer.load(0, {shade: false});
				commonService.http({
					url:'/chart/modify',
					data:data
				}).success(function(res){
					layer.closeAll('loading');
					if(res.status == "success"){
						fn();
					}else{
						
					}
				});
			},
			//不刷新图表的修改动作
			noRereshModify:function(){
				this.modifyAction(function(){
				});
			},
			//附加的细节处理
			relatedAction:function(){
				//维度，数值 对齐方式  只有 图表为表格时才会显示
				var chart_type_set  = commonData.chart_type_set;
				if($scope.chartOperate.selectChartType == chart_type_set.TABLE){
					$scope.show_field_method = true;
				}else{
					$scope.show_field_method = false;
				}
			},
			//获取满足条件的图表
			getMeetCharts:function(xLen,yLen,y2Len,default_chart_type){
				var current = null;
				var chartList = $scope.container.chartList;
				var x = xLen;
				var y = yLen;
				var y2 = y2Len;
				var meetCharts = [];
				if(chartList){
					for(var i = 0;i < chartList.length;i++){
						var o = chartList[i];
						var expression = o.expression;
					 	var show =  eval(expression);
					 	if(show){
					 		meetCharts.push(o);
					 	}
					}
				}	
				
				if(meetCharts && meetCharts.length > 0){
					var matching = false;
					for(var i = 0; i < meetCharts.length;i++){
						var meet = meetCharts[i];
						if(default_chart_type == meet.type){
							matching = true;
							current = meet;
							break;
						}
						
					}
					
					if(!matching){//默认没有匹配到 则默认 获取第一个可使用的图表
						current = meetCharts[0];
					}
					
				}
				return current;
			},
			specialColorSetUp:function(selectChartType,structure){
				var _this = this;
				var xData = [];
				$scope.is_special_color =  false;
				if(selectChartType == commonData.chart_type_set.PIE || 
						selectChartType == commonData.chart_type_set.FUNNEL ||
						selectChartType == commonData.chart_type_set.WORD_CLOUD ){
					if($scope.container.x_axisList && $scope.container.x_axisList.length > 0){
						if(!$scope.container.xDataColors || $scope.container.xDataColors.length ==0){//如果没有颜色，则给与随机色
							var resultList = structure.result.resultList || structure.result.yAxis ||structure.result.wordsList;
							if(resultList && resultList.length > 0){
								for(var i = 0;i < resultList.length;i++){
									var data = new Object();
									data.name = resultList[i].name;
									data.color = commonService.randomColor();
									data.unique_id = commonService.getUniqueId();
									data.x_unique_id = resultList[i].unique_id;
									xData.push(data);
								}
							}						
							$scope.container.xDataColors = xData;
						}
					}
					$scope.is_special_color =  true;
					_this.noRereshModify();
				}else if(selectChartType == commonData.chart_type_set.RECTANGLE_TREE){
					if($scope.container.x_axisList && $scope.container.x_axisList.length > 0){
						if(!$scope.container.xDataColors || $scope.container.xDataColors.length ==0){//如果没有颜色，则给与随机色
							var resultList = structure.result.resultList ;
							if(resultList && resultList.length > 0){
								var temp_data = [];
								for(var i = 0;i < resultList.length;i++){
									var _data = resultList[i];
									var flag = false;
									for(var j = 0;j<temp_data.length;j++){
										if(temp_data[j] == _data.name){
											 flag = true;
										}
									}
									if(!flag){
										temp_data.push(_data.name);
										var data = new Object();
										data.name = resultList[i].name;
										data.color = commonService.randomColor();
										data.unique_id = commonService.getUniqueId();
										data.x_unique_id = resultList[i].unique_id;
										xData.push(data);
									}
								}
							}								
							$scope.container.xDataColors = xData;
						}
					}
					$scope.is_special_color =  true;
					_this.noRereshModify();
				}else if(selectChartType == commonData.chart_type_set.RISING_SUN){
					
					if($scope.container.x_axisList && $scope.container.x_axisList.length > 0){
						if(!$scope.container.xDataColors || $scope.container.xDataColors.length ==0){//如果没有颜色，则给与随机色
							var resultList = structure.result.resultList;
							if(resultList && resultList.length > 0){
								var result = resultList[0];
								var _data = result.data;
								var _unique_id = result.unique_id;
								for(var key in _data){
									var data = new Object();
									data.name = key;
									data.color = commonService.randomColor();
									data.unique_id = commonService.getUniqueId();
									data.x_unique_id = _unique_id;
									xData.push(data);
								}
							}
							$scope.container.xDataColors = xData;
						}
					}
					$scope.is_special_color =  true;
					_this.noRereshModify();
				}else if(selectChartType == commonData.chart_type_set.SCATTER){
					if($scope.container.x_axisList && $scope.container.x_axisList.length > 0){
						if(!$scope.container.xDataColors || $scope.container.xDataColors.length ==0){//如果没有颜色，则给与随机色
							var resultList = structure.result.resultList;
							var _data = resultList.data;
							for(var key in _data){
								var data = new Object();
								data.name = key;
								data.color = commonService.randomColor();
								data.unique_id = commonService.getUniqueId();
								data.x_unique_id = _unique_id;
								xData.push(data);
							}
							$scope.container.xDataColors = xData;
						}
					}else{
						if($scope.container.xDataColors && $scope.container.xDataColors.length >= 1){
							var xDataColors = $scope.container.xDataColors[0];
							if(!xDataColors){
								xDataColors = new Object();
								xDataColors.color = commonService.randomColor();
								xDataColors.unique_id = commonService.getUniqueId();
							}
							xDataColors.name = "颜色";
							xData.push(xDataColors);
						}else{
							var data = new Object();
							data.name = "颜色";
							data.color = commonService.randomColor();
							data.unique_id = commonService.getUniqueId();
							xData.push(xDataColors);
						}
					
						$scope.container.xDataColors = xData;
					}
					
					
					
					$scope.is_special_color =  true;
					_this.noRereshModify();
				}else if(selectChartType == commonData.chart_type_set.SANKEY){
					if($scope.container.x_axisList && $scope.container.x_axisList.length > 0){
						if(!$scope.container.xDataColors || $scope.container.xDataColors.length ==0){//如果没有颜色，则给与随机色
							var nodes = structure.result.nodes;
							var nodes_names = [];
							if(nodes && nodes.length > 0){
								for(var i =0;i < nodes.length;i++){
									var name  = nodes[i].name;
									var names = name.split("@@");
									name =  names[1];
									if(nodes_names.indexOf(name) == -1){
										nodes_names.push(name);
									}
								}
							}
							
							if(nodes_names && nodes_names.length > 0){
								for(var i = 0;i < nodes_names.length;i++ ){
									var data = new Object();
									data.name = nodes_names[i];
									data.color = commonService.randomColor();
									data.unique_id = commonService.getUniqueId();
									xData.push(data);
								}
							}
							

							$scope.container.xDataColors = xData;
						}
					}
				}else{
					$scope.container.xDataColors  = [];
					_this.noRereshModify();
				}	
			},
			//检查颜色设置
			checkColorSetUp:function(){
				$scope.is_special_color =  false;
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.PIE || 
						$scope.chartOperate.selectChartType == commonData.chart_type_set.FUNNEL||
						$scope.chartOperate.selectChartType == commonData.chart_type_set.WORD_CLOUD ||
						$scope.chartOperate.selectChartType == commonData.chart_type_set.RISING_SUN||
						$scope.chartOperate.selectChartType == commonData.chart_type_set.RECTANGLE_TREE ||
						$scope.chartOperate.selectChartType == commonData.chart_type_set.SANKEY){
					if($scope.container.x_axisList && $scope.container.x_axisList.length > 0){
						$scope.is_special_color =  true;
					}
				}	
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.SCATTER){
					$scope.is_special_color =  true;
				}
				
				$scope.is_special_color_random = commonService.getUniqueId();
			},
			//渲染编辑图表数据
			renderChartStructure:function(chart_type_param,result,querydata){
				var option;
				var _this = this;
				var data = result.chartOperate;
				var main = result.main;
				var chartSetting = result.chartSetting;
				var chart_type = chart_type_param;
				$scope.chartOperate = data;
				$scope.chartSetting  = chartSetting;
				if(main){
					$scope.container.x_axisList = main.x_axisList || [];
					$scope.container.y_axisList = main.y_axisList|| [];
					$scope.container.y2_axisList = main.y2_axisList|| [];
					$scope.container.color_fileds = main.color_fileds|| [];
					$scope.container.xLen = main.xLen || 0;
					$scope.container.yLen = main.yLen || 0;
					$scope.container.y2Len = main.y2Len || 0;
					$scope.container.filterList = main.filterList || [];
					$scope.container.xDataColors = main.xDataColors || [];
				}
				//根据维度和数值的个数判断 优先选择哪个图表,如果默认类型 符合 维度和数值的个数 则不做任何改变
				var meet_chart = this.getMeetCharts($scope.container.xLen,
						$scope.container.yLen,$scope.container.y2Len,chart_type);
				if(!meet_chart){
					$("#chart").html("");
					$scope.chart_nothing = true;
					return;//无法渲染图表 
				}else{
					if(meet_chart.type != chart_type){ //不是默认的图表 则进行自动选择
						_this.chartSelect(meet_chart);
						return;
					}
				}
				//图表属性的不存在 则赋值
				var _chartSetting = new Object();
				//if(Object.keys($scope.chartSetting).length == 0){
					commonService.initChartSetting(chart_type,_chartSetting);
				//}
				for(key in _chartSetting){
					if($scope.chartSetting[key] == null || $scope.chartSetting[key] == undefined){
						$scope.chartSetting[key] = _chartSetting[key];
					}
				}
				$scope.chartOperate.selectChartType = chart_type;
				//  yAxis_chartType(数值y轴),y2Axis_chartType(数值y2轴) 被选择的图表类型 
				if(!data.yAxis_chartType){//
					var _chart = $scope.container.yAxis_chartList[0];
					$scope.chartOperate.yAxis_chartType = _chart.type;
					$scope.chartOperate.yAxis_chartObj = {id:_chart.type,icon:_chart.icon};
				}else{
					var _chart = _this.findChartByType(data.yAxis_chartType);				
					$scope.chartOperate.yAxis_chartType = _chart.type;
					$scope.chartOperate.yAxis_chartObj = {id:_chart.type,icon:_chart.icon};
				}
				if(!data.y2Axis_chartType){
					var _chart = $scope.container.yAxis_chartList[0];
					$scope.chartOperate.y2Axis_chartType = _chart.type;
					$scope.chartOperate.y2Axis_chartObj = {id:_chart.type,icon:_chart.icon};
				}else{
					var _chart = _this.findChartByType(data.y2Axis_chartType);		
					$scope.chartOperate.y2Axis_chartType = _chart.type;
					$scope.chartOperate.y2Axis_chartObj = {id:_chart.type,icon:_chart.icon};
				}	
				var structure = new Object();
				structure.chartSetting = $scope.chartSetting;
				structure.chartOperate = $scope.chartOperate;
				structure.container = $scope.container;
				structure.result = querydata? querydata.data:{};
				structure.theme = storageService.getTheme();
				$scope.chart_type_index = false;
				$scope.chart_type_indexhtml = "";
				$scope.chart_type_tablehtml = "";
				if(structure.result && Object.keys(structure.result).length > 0){
					//个别图例 颜色选择器渲染（饼图、漏斗图 x轴取值）
					_this.specialColorSetUp($scope.chartOperate.selectChartType,structure);
					
					var chart_type = $scope.chartOperate.selectChartType;
					if(chart_type == commonData.chart_type_set.SANKEY){//桑基图
						var length = structure.result.lines.length;
						if(length == 0){
							$("#chart").html("");
							//$scope.chart_nothing_msg = "当前图表无数据";
							$scope.chart_nothing = true;
							return {};
						}
						if(length > 600){
							$("#chart").html("");
							layercheck("数据量太大，无法显示");
							//$scope.chart_nothing_msg = "当前图表无数据";
							$scope.chart_nothing = true;
							return {};
						}
					}
					option = chartService.getChartOption($scope.chartOperate.selectChartType,structure);
					if(Object.keys(option).length > 0){
						$scope.chart_nothing = false;
						if($scope.chartOperate.selectChartType == commonData.chart_type_set.TABLE){
							$scope.chart_type_index = false;
							$scope.chart_type_tablehtml = option.html;
							$scope.chart_type_table_uuid = commonService.getUniqueId();//监听值的变化刷新图表
						}else if($scope.chartOperate.selectChartType == commonData.chart_type_set.INDEX){
							$scope.chart_type_tablehtml = option.html;
							$scope.chart_type_index = true;	
							$scope.chart_type_table_uuid = commonService.getUniqueId();//监听值的变化刷新图表
						}else{
							$scope.chart_type_index = false;
							setTimeout(function(){
								myChart = echarts.init(document.getElementById('chart'));
								myChart.setOption(option);
							},100);
						}
					}else{
						$("#chart").html("");
						$scope.chart_nothing = true;
					}				
				}else{
					$("#chart").html("");
					$scope.chart_nothing = true;
				}
				return option;
			},
			findChartByType:function(type){
				var obj = {};
				var chartList = $scope.container.chartList;
				if(chartList){
					for(var i = 0 ;i < chartList.length;i++){
						var _o = chartList[i];
						if(_o.type == type){
							obj = _o;
							break;
						}
					}
				}
				return obj;
			},
			dateFieldActive:function(obj){
				if(obj.data_type != "date"){
					return;
				}
				obj.active = !obj.active;
			},
			initFieldDraggable:function(){
			},
			dragTbFunc:function(t,a,i){
				$scope.chartOperate.draggableElment = i;	
			},
			dragSubDateFunc:function(t,a,i){
				i.column_name = i.name + "("+i.original_name+")";
				$scope.chartOperate.draggableElment = i;
			},
			stopDragField:function(){
			},
			//清楚所有Y轴字段的高级计算-同比环比
			clearYaxisAdvance:function(){
				var y_axisList = $scope.container.y_axisList;
				var y2_axisList = $scope.container.y2_axisList;
				if(y_axisList && y_axisList.length > 0){
					for(var i = 0; i < y_axisList.length;i++){		
						if(y_axisList[i].advance_id && y_axisList[i].advance_id =="1"){//同步、环比
							y_axisList[i].advance_id = "";
							y_axisList[i].advance_aggregator = {};
							y_axisList[i].advance_name = "";
						}
					}
				}
				
				if(y2_axisList && y2_axisList.length > 0){
					for(var i = 0; i < y2_axisList.length;i++){
						if(y2_axisList[i].advance_id && y2_axisList[i].advance_id =="1"){//同步、环比
							y2_axisList[i].advance_id = "";
							y2_axisList[i].advance_aggregator = {};
							y2_axisList[i].advance_name = "";
						}
					}
				}
				
			},
			checkXaxisFirstFieldIsDate:function(){
				var flag = false;
				var  x_axisList = $scope.container.x_axisList;
				if(x_axisList && x_axisList.length > 0){
					var field = x_axisList[0];
					if(field.data_type == commonData.data_type_set.DATE){
						flag = true;
					}	
				}
				return flag;
			},
			//维度和数值接收字段
			onDropAdd:function(t,a,i){
				var _this = this;
				if(i=="x"){
					commonService.addXaxis($scope.container.x_axisList,$scope.chartOperate.draggableElment);
					$scope.container.xLen = $scope.container.x_axisList.length;
					if($scope.container.xLen  == 1){
						//检查第一个字段 是否是date类型
						if(_this.checkXaxisFirstFieldIsDate()){
							_this.clearYaxisAdvance();
						}	
					}
					$scope.container.xDataColors = [];
					
					var meet_chart = _this.getMeetCharts($scope.container.xLen,
							$scope.container.yLen,$scope.container.y2Len,$scope.chartOperate.selectChartType);
					if(meet_chart.type != $scope.chartOperate.selectChartType){ //不是默认的图表 则进行自动选择
						$scope.chartOperate.selectChartType = meet_chart.type;
					}
				}else if(i=="y"){
					$scope.chartOperate.draggableElment.yaxis_type = "y";
					commonService.addYaxis($scope.container.y_axisList,$scope.chartOperate.draggableElment);
					$scope.container.yLen = $scope.container.y_axisList.length;
				}else if(i=="y2"){
					if(!$scope.chartOperate.selectChartType){
						return;
					}
					$scope.chartOperate.draggableElment.yaxis_type = "y2";
					commonService.addY2axis($scope.container.y2_axisList,$scope.chartOperate.draggableElment);
					$scope.container.y2Len = $scope.container.y2_axisList.length;
				} 
				//颜色区域显示的字段				
				this.renderChartList();
				this.modify();
			},
			overField:function(obj){
				var a = obj.ui;
				var t = obj.event;	
	            var $draggable = a.draggable;	   
	            var field_index = $draggable.data('field-index');
	            var field_axis = $draggable.data('field-axis');
	            if(field_axis == "x"){
	            	$scope.container.x_axisList[field_index].remove = false;
	            }else if(field_axis == "y"){
	            	$scope.container.y_axisList[field_index].remove = false;
	            }else if(field_axis == "y2"){
	            	$scope.container.y2_axisList[field_index].remove = false;
	            }else if(field_axis == "filter"){
	            	$scope.container.filterList[field_index].remove = false;
	            }
			},
			outField:function(obj){
				var a = obj.ui;
				var t = obj.event;	
	            var $draggable = a.draggable;
	            var field_index = $draggable.data('field-index');
	            var field_axis = $draggable.data('field-axis');
	            if(field_axis == "x"){
	            	$scope.container.x_axisList[field_index].remove = true;
	            }else if(field_axis == "y"){
	            	$scope.container.y_axisList[field_index].remove = true;
	            }else if(field_axis == "y2"){
	            	$scope.container.y2_axisList[field_index].remove = true;
	            }else if(field_axis == "filter"){
	            	$scope.container.filterList[field_index].remove = true;
	            }
			},
			//添加次轴
			addSecondaryAxis:function(){
				if(!$scope.chartOperate.selectChartType){
					layercheck("请选择图表类型");
					return;
				}
				
				if($scope.chartOperate.selectChartType == commonData.chart_type_set.TABLE && $scope.container.xLen > 2){
					return;
				}
				
				if(!$scope.chartOperate.y2Axis_chartType){
					var _chart = $scope.container.yAxis_chartList[0];
					$scope.chartOperate.y2Axis_chartType = _chart.type;
					$scope.chartOperate.y2Axis_chartObj = {id:_chart.type,icon:_chart.icon};
				}
				$scope.chartOperate.selectChartType = commonData.chart_type_set.BIAXIAL;	
				this.intelligentAxis();
				$scope.show_secondary_axis = true;
				this.modify();
			},
			//移除次轴
			deleteSecondaryAxis:function(){
				$scope.show_secondary_axis = false;
				$scope.container.y2_axisList = [];
				$scope.container.y2Len = 0;
				$scope.chartOperate.y2Axis_chartType = "";
				$scope.chartOperate.y2Axis_chartObj = {};
				$scope.chartOperate.selectChartType = "";
				this.modify();
			},
			//筛选器接收字段
			onDropFilter:function(t,a){
				//打开弹框
				$scope.filterDialog_operation  = "add";
				this.openFilterDialog();
			},
			restEditFilterData:function(){
				var data = {
						select_filter_condition_type:"",
						select_filter_condition_typename:"请选择条件",
						select_filter_condition_value1:"",
						select_filter_condition_value2:"",
						field_data:{},
						show_active:false
				};
				$scope.edit_filter_data = data;
				
			},
			//筛选器字段展开效果
			filter_show_active:function(){
				$scope.edit_filter_data.show_active = $scope.edit_filter_data.show_active=== false ? true: false;
			},
			//字段名称展示
			yFieldNameShow:function(item){
				var name = "";
				if(item.new_alias_name){
					return item.new_alias_name;
				}
				if(item.alias_name){
					name = item.alias_name;
					if(item.select_calculation && item.select_calculation.name){					
						var otherhtml = [];
						otherhtml.push("(");
						otherhtml.push(item.select_calculation.name);
						if(item.advance_name){
							otherhtml.push("-");
							otherhtml.push(item.advance_name);
						}
						otherhtml.push(")");
						name = name + otherhtml.join("");
					}				
				}					
				return 	name;
			},
			xFieldNameShow:function(item){
				var name = "";
				if(item.new_alias_name){
					return item.new_alias_name;
				}
				if(item.alias_name){
					name = item.alias_name;			
				}					
				return 	name;
			},
			//修改筛选器编辑框
			editFilter:function(index,obj,e){
				$scope.filterDialog_operation  = "modify";
				obj.data_type = obj.field_data.data_type;
				obj.column_name = obj.field_data.column_name;
				obj.operation_index = index;
				obj.id = obj.field_data.id;
				$scope.chartOperate.draggableElment = obj;
				this.openFilterDialog();
				e.stopPropagation();
			},
			//检索当前拖拽的字段在筛选器中是否存在
			isExistFilterList:function(id){
				var flag = false;
				var filterList = $scope.container.filterList;
				for(var i = 0;i <filterList.length;i++){
					var field_data = filterList[i].field_data;
					if(id == field_data.id){
						flag = true;
						break;
					}
				}
				return 	flag;
			},
			//打开筛选器编辑框
			openFilterDialog:function(){
				var _this = this;
				var _NewObj = new Object();
				angular.copy($scope.chartOperate.draggableElment, _NewObj);	
				if($scope.filterDialog_operation == "add"){
					var flag = _this.isExistFilterList(_NewObj.id);//存在添加过的元素则不再重复添加
					if(flag){
						return false;
					}
				}
				this.restEditFilterData();//重置	
				if(_NewObj.data_type == "string" || _NewObj.data_type == "sub_date"){
					$scope.edit_filter_data.condition_type = 1; //条件筛选类型
					$scope.edit_filter_data.fieldConditionList  = commonService.findFieldConditionList(1);
				}else if(_NewObj.data_type == "num"){
					$scope.edit_filter_data.condition_type = 2;
					$scope.edit_filter_data.fieldConditionList  = commonService.findFieldConditionList(2);
				}else if(_NewObj.data_type == "date"){
					$scope.edit_filter_data.condition_type = 3;
				}			
				
				$scope.edit_filter_data.showFieldName = _NewObj.column_name;
				if($scope.filterDialog_operation  == "add"){
					$scope.edit_filter_data.field_data = _NewObj;
				}else if($scope.filterDialog_operation  == "modify"){
					$scope.edit_filter_data.field_data = _NewObj.field_data;
					$scope.edit_filter_data.field_data.operation_index = _NewObj.operation_index;
				}
				if(_NewObj.filter_condition){
					//给筛选对象赋值条件类型
					$scope.edit_filter_data.select_filter_condition_type = _NewObj.filter_condition.type;
					$scope.edit_filter_data.select_filter_condition_typename = _this.
					findfieldConditionTypeName($scope.edit_filter_data.fieldConditionList,_NewObj.filter_condition.type);
					//判断被选中的数组的长度
					if(_NewObj.filter_condition.value && _NewObj.filter_condition.value.length > 0){
						var val_len = _NewObj.filter_condition.value.length;
						$scope.edit_filter_data.select_filter_condition_value1 = _NewObj.filter_condition.value[0];
						if(val_len == 2){//区间值
							$scope.edit_filter_data.select_filter_condition_value2 = _NewObj.filter_condition.value[1];
						}
					}
				}else{
					_NewObj.filter_condition = {
							type:"",
							value:null
					}
				}
				$scope.mask_show = true;
				$scope.edit_filter_show = true;
			},
			colseFilterDialog:function(){	
				$scope.mask_show = false;
				$scope.edit_filter_show = false;
			},
			findfieldConditionTypeName:function(list,type){
				var name = "";
				if(list){
					for(var i =0;i<list.length;i++){
						var _o = list[i];
						if(type == _o.id){
							name = _o.name;
							break;
						}
					}
				}
				
				return name;
			},
			setFieldMethod:function(i,method){
				i.select_field_method = method.id;
				this.modify();
			},
			setFieldSort:function(axis,i,sort){
				$scope.chartOperate.sort = {type:sort.id,axis:axis,fid:i.column_id,data_type:i.data_type,unique_id:i.unique_id};
				this.modify();
			},
			setDateGranularity:function(index,i,additem){
				var _this = this;
				i.select_date_granularity = additem.granularity;
				i.alias_name = i.column_name + "("+commonService.findDateTypeName(additem.granularity)+")";
				$scope.container.xDataColors  = [];
				if(index == 0 && i.data_type == commonData.data_type_set.DATE){
					if(i.select_date_granularity == "hour" || 
						i.select_date_granularity == "minute" ||
						i.select_date_granularity == "second"){
						_this.clearYaxisAdvance();
					}else{
						var box = commonService.findTongbiHuangbiBox(i.select_date_granularity);
						_this.checkAdvanceGranularity(box,i.select_date_granularity);
					}
					
				}
				this.modify();
			},
			checkAdvanceGranularity:function(box,date_field_type){
				var _this = this;
				var contrast = box.contrast;
				var y_axisList = $scope.container.y_axisList;
				var y2_axisList = $scope.container.y2_axisList;
				if(y_axisList && y_axisList.length > 0){
					for(var i = 0; i < y_axisList.length;i++){		
						if(y_axisList[i].advance_id && y_axisList[i].advance_id =="1"){//同步、环比
							var field = y_axisList[i];
							var advance_t_h_id = field.advance_aggregator.advance_t_h_id;
							if(!_this.isExistTongbihuanbiContrast(advance_t_h_id,contrast)){//没有匹配到 则清除
								y_axisList[i].advance_id = "";
								y_axisList[i].advance_aggregator = {};
								y_axisList[i].advance_name = "";
							}else{
								y_axisList[i].advance_aggregator.date_field_type = date_field_type;
								
							}
						}
					}
				}
				
				if(y2_axisList && y2_axisList.length > 0){
					for(var i = 0; i < y2_axisList.length;i++){
						if(y2_axisList[i].advance_id && y2_axisList[i].advance_id =="1"){//同步、环比
							var field = y_axisList[i];
							var advance_t_h_id = field.advance_aggregator.advance_t_h_id;
							if(!_this.isExistTongbihuanbiContrast(advance_t_h_id,contrast)){//没有匹配到 则清除
								y_axisList[i].advance_id = "";
								y_axisList[i].advance_aggregator = {};
								y_axisList[i].advance_name = "";
							}else{
								y_axisList[i].advance_aggregator.date_field_type = date_field_type;
								
							}
						}
					}
				}
			},
			isExistTongbihuanbiContrast:function(id,contrast){
				var flag = false;
				for(var i = 0;i < contrast.length;i++){
					if(contrast[i].id == id){
						flag = true;
						break;
					}
				}
				return flag;
			},
			exchangeXField:function(t,a,i){
			},
			//移除维度字段
			stopDragXField:function(t,a,i){
				var _this = this;			
				var active = $scope.container.x_axisList[i].remove;		
				if(!active){
					return;
				}
				$scope.$apply(function(){
					var  drag_field = $scope.container.x_axisList[i];
					var bak_drag_field = new Object();
					angular.copy(drag_field, bak_drag_field);	
					_this.checkXData(drag_field.unique_id);
					$scope.container.x_axisList.splice(i,1);
					$scope.container.xLen = $scope.container.x_axisList.length;
					$scope.chartOperate.sort = {type:"",fid:"",unique_id:"",data_type:""};
					_this.renderChartList();
					if(i == 0 && bak_drag_field.data_type == commonData.data_type_set.DATE){//当前删除的是首个字段 且date类型
						_this.clearYaxisAdvance();
					}else{
						if(_this.checkXaxisFirstFieldIsDate()){
							_this.clearYaxisAdvance();
						}	
					}					
					_this.modify();
				});
			},
			checkXData:function(x_unique_id){
				var xDataColors = $scope.container.xDataColors;
				var flag = false;
				if(xDataColors && xDataColors.length> 0){
					for(var i = 0;i < xDataColors.length;i++){
						if(xDataColors[i].x_unique_id == x_unique_id){
							flag = true;
							break;
						}
					}
				}
				if(flag){
					$scope.container.xDataColors = [];
				}
			},
			startDragField:function(t,a,i,index){
//				console.log("startDragField");
//				if(i == "x"){
//					$scope.chartOperate.draggableElment = $scope.container.x_axisList[index];
//					console.log($scope.chartOperate.draggableElment);
//				}else if(i == "y"){
//					$scope.chartOperate.draggableElment = $scope.container.y_axisList[index];
//				}else if(i == "y2"){
//					$scope.chartOperate.draggableElment = $scope.container.y2_axisList[index];
//				}
			},
			//移除数值字段
			stopDragYField:function(t,a,i){
				var _this = this;
				var active = $scope.container.y_axisList[i].remove;		
				if(!active){
					return;
				}
				$scope.$apply(function(){
					$scope.container.y_axisList.splice(i,1);
					$scope.container.yLen = $scope.container.y_axisList.length;
					$scope.chartOperate.sort = {type:"",fid:"",unique_id:"",data_type:""};
					_this.renderChartList();	
				});
				commonService.decColorIndex();
				this.modify();
			},
			//移除次轴数值字段
			stopDragY2Field:function(t,a,i){
				var _this = this;
				var active = $scope.container.y2_axisList[i].remove;		
				if(!active){
					return;
				}
				$scope.$apply(function(){
					$scope.container.y2_axisList.splice(i,1);
					$scope.container.y2Len = $scope.container.y2_axisList.length;
					$scope.chartOperate.sort = {type:"",fid:"",unique_id:"",data_type:""};
					_this.renderChartList();
				});
				this.modify();
			},
			stopDragfilterCondition:function(t,a,i){
				var active = $scope.container.filterList[i].remove;
				if(!active){
					return;
				}
				$scope.$apply(function(){
					$scope.container.filterList.splice(i,1);
				});
				this.modify();
			},
			setFieldAggregate:function(level,i,cal_item){
				if(cal_item.id == "percentile"){
					return;
				}
				
				i.select_calculation = {level:level,
						value:cal_item.id,
						name:commonService.findCalculationName(cal_item.id)};
				this.modify();
			},
			setFieldAggregatePercent:function(level,i,p){
				var cal_item_id = "percentile";
				i.select_calculation = {level:level,
						value:[cal_item_id,p].join(":"),
						name:commonService.findCalculationName(cal_item_id)+p};
				this.modify();
			},
			isPercentSelected:function(item,p){
				var flag = false;
				var value = item.select_calculation.value;
				if(value.indexOf("percentile")>-1){
					var args = value.split(":");
					var val = args[1];
					if(p == val){
						flag = true;
					}
				}
				return flag;
			},
			disappearShow:function(obj){
				var flag = false;
				if(obj.condition_type == 2 
						&& obj.select_filter_condition_type =='6'){
					flag = true;
				}
				return flag;
			},
			setFilterCondition:function(item){
				$scope.edit_filter_data.select_filter_condition_type = item.id;
				$scope.edit_filter_data.select_filter_condition_typename = item.name;	
			},
			//编辑筛选框确认
			confirmFilterCondition:function(){
				var _obj = new Object();
				angular.copy($scope.edit_filter_data, _obj);
				var arg_value = [];
				
				if(_obj.condition_type == 3){//date 日期类型
					_obj.select_filter_condition_type = "6";//区间
					//var _condition  = commonService.findFieldCondition(1,_obj.select_filter_condition_type);
					if(!_obj.select_filter_condition_value1){
						layercheck("选择时间");
						return;
					}
					arg_value.push(_obj.select_filter_condition_value1);
					if(!_obj.select_filter_condition_value2){
						layercheck("选择时间");
						return;
					}
					arg_value.push(_obj.select_filter_condition_value2);
					
					
					if(commonService.compareDate(_obj.select_filter_condition_value1,
							_obj.select_filter_condition_value2)){
						layercheck("请重新选择开始时间");
						return;
					}
					
				}
				
				
				if(!_obj.select_filter_condition_type){
					layercheck("请选择条件");
					return;
				}

				if(_obj.condition_type == 2){//数值类型  
					if(!angular.isNumber(_obj.select_filter_condition_value1)){
						layercheck("请输入数值");
						return;
					}
					arg_value.push(_obj.select_filter_condition_value1);
					//检查是否选择了区间
					if(_obj.select_filter_condition_type == "6"){//选择了区间必须填第二个数值
						if(!angular.isNumber(_obj.select_filter_condition_value2)){
							layercheck("请输入数值");
							return;
						}
						arg_value.push(_obj.select_filter_condition_value2);
					}
				}
				if(_obj.condition_type == 1){//字符串或者截取过的日期类型
					if(!_obj.select_filter_condition_value1){
						layercheck("请输入条件");
						return;
					}
					arg_value.push(_obj.select_filter_condition_value1);
				}

				
				
				_obj.filter_condition = {};
				_obj.filter_condition.type = _obj.select_filter_condition_type;
				_obj.filter_condition.value = arg_value;
				
				if($scope.filterDialog_operation == "add"){
					$scope.container.filterList.push(_obj);
				}else if($scope.filterDialog_operation == "modify"){
					$scope.container.filterList[_obj.field_data.operation_index] = _obj;
				}
				
				this.colseFilterDialog();
				this.modify();
			},
			//打开颜色设置框
			openColorSetupDialog:function(index,obj,yaxis_type){
				$scope.chartOperate.temp_args = [];//重置
				$scope.chartOperate.temp_args2 = [];
				$scope.chartOperate.colourElment = {};
				$scope.chartOperate.colourElmentIndex = index;
				angular.copy(obj, $scope.chartOperate.colourElment);//复制对象
				$scope.chartOperate.colourElment.yaxis_type = yaxis_type || "";
				angular.copy($scope.container.y_axisList, $scope.chartOperate.temp_args);//复制y轴集合
				angular.copy($scope.container.y2_axisList, $scope.chartOperate.temp_args2);//复制y2轴集合	
				var applyColors = commonService.findApplyColors($scope.chartOperate.color_wheel_id);
				$scope.chartOperate.apply_colors = applyColors.colors;
				$scope.mask_show = true;
				$scope.color_setup_show = true;
			},
			//打开特殊颜色设置框
			openSpecialColorSetupDialog:function(index,obj){
				$scope.chartOperate.temp_args = [];//重置
				$scope.chartOperate.colourElment = {};
				$scope.chartOperate.colourElmentIndex = index;
				angular.copy(obj, $scope.chartOperate.colourElment);//复制对象
				angular.copy($scope.container.xDataColors, $scope.chartOperate.temp_args);//复制y轴集合
				var applyColors = commonService.findApplyColors($scope.chartOperate.color_wheel_id);
				$scope.chartOperate.apply_colors = applyColors.colors;
				$scope.mask_show = true;
				$scope.special_color_setup_show = true;
			},
			//色系应用 默认选中第一个
			colorWheelApply:function(){
				$scope.chartOperate.colourElment.color = $scope.chartOperate.apply_colors[0];
				this.toTempArgs();
			},
			specialColorWheelApply:function(){
				$scope.chartOperate.colourElment.color = $scope.chartOperate.apply_colors[0];
				$scope.chartOperate.temp_args[$scope.chartOperate.colourElmentIndex] = $scope.chartOperate.colourElment;
			},
			toTempArgs:function(){
				if($scope.chartOperate.colourElment.yaxis_type == 'y'){
					$scope.chartOperate.temp_args[$scope.chartOperate.colourElmentIndex] = $scope.chartOperate.colourElment;
				}else if($scope.chartOperate.colourElment.yaxis_type == 'y2'){
					$scope.chartOperate.temp_args2[$scope.chartOperate.colourElmentIndex] = $scope.chartOperate.colourElment;
				}
			},
			setColorWheel:function(applyid){
				var applyColors = commonService.findApplyColors(applyid);
				$scope.chartOperate.color_wheel_id = applyColors.id;
				$scope.chartOperate.color_wheel_name = applyColors.name;
				$scope.chartOperate.apply_colors = applyColors.colors;
			},
			//选择设置颜色的字段
			selectSetColorField:function(index,obj,yaxis_type){
				$scope.chartOperate.colourElment = obj;
				$scope.chartOperate.colourElmentIndex = index;
				$scope.chartOperate.colourElment.yaxis_type = yaxis_type || "";
			},
			//色系颜色勾选
			setFieldColor:function(obj){
				$scope.chartOperate.colourElment.color = obj;
				this.toTempArgs();
			},
			setSpecialFieldColor:function(obj){
				$scope.chartOperate.colourElment.color = obj;
				$scope.chartOperate.temp_args[$scope.chartOperate.colourElmentIndex] = $scope.chartOperate.colourElment;
			},
			//确认颜色设置
			confirmColorSetup:function(){
				$scope.container.y_axisList = $scope.chartOperate.temp_args;
				$scope.container.y2_axisList = $scope.chartOperate.temp_args2;
				this.colseColorSetupDialog();
				this.modify();
			},
			confirmSpecialColorSetup:function(){
				$scope.container.xDataColors = $scope.chartOperate.temp_args;
				this.colseSpecialColorSetupDialog();
				this.modify();
			},
			//关闭弹框
			colseColorSetupDialog:function(){	
				$scope.mask_show = false;
				$scope.color_setup_show = false;
			},
			colseSpecialColorSetupDialog:function(){	
				$scope.mask_show = false;
				$scope.special_color_setup_show = false;
			},
			//颜色选择器回调方法
			callbackColor:function(obj){
				var _this = this;
				$scope.$apply(function(){
					$scope.chartOperate.colourElment.color = "#"+obj.toHex();
					_this.toTempArgs();
				});
			},
			callbackSpecialColor:function(obj){
				var _this = this;
				$scope.$apply(function(){
					$scope.chartOperate.colourElment.color = "#"+obj.toHex();
					$scope.chartOperate.temp_args[$scope.chartOperate.colourElmentIndex] = $scope.chartOperate.colourElment;
				});
			},
			//计量图 条件格式设置
			openMeterConditionFormatDialog:function(){
				var format_list = $scope.chartSetting.format_list;
				if(format_list && format_list.length > 0){//如果条件格式集合存在数据 则复制到临时容器中
					$scope.chartSetting.temp_format_list = [];
					angular.copy(format_list, $scope.chartSetting.temp_format_list);	
				}else{
					$scope.chartSetting.temp_format_list = [];
				}
				$scope.mask_show = true;
				$scope.mertering_condition_format_show = true;
			},
			closeMeterConditionFormatDialog:function(){
				$scope.mask_show = false;
				$scope.mertering_condition_format_show = false;
			},
			addMeterConditionFormat:function(){
				var color_wheel = commonData.color_wheel;
				var temp_format = new Object();
				temp_format.id = "";
				temp_format.name = "请选择条件";
				temp_format.formula = "";
				temp_format.value = "";
				temp_format.value2 = "";
				temp_format.color = color_wheel[0].colors[0];//给与默认颜色	
				temp_format.showstyle = false;
				$scope.chartSetting.temp_format_list.push(temp_format);		
			},
			delMeterConditionFormat:function(index){
				$scope.chartSetting.temp_format_list.splice(index,1);
			},
			setMeterColor:function(item,color,e){
				item.color = color;
				this.closeMeterShowStyle(item,e);
			},
			openMeterShowStyle:function(item){
				item.showstyle = true;
			},
			closeMeterShowStyle:function(item,e){
				item.showstyle = false;
				e.stopPropagation();
			},
			setMeterformat:function(item,citem){
				item.name = citem.name;
				item.id = citem.id;
				item.formula = citem.formula;
			},
			meterFormatColor:function(obj){
				var _this = this;
				$scope.$apply(function(){
					var color = "#"+obj.color.toHex();
					$scope.chartSetting.temp_format_list[obj.index].color = color;
				});
			},
			confrimMeterFormat:function(){
				var temp_format_list  = $scope.chartSetting.temp_format_list;
				var flag = true;
				var msg = "";
				if(temp_format_list && temp_format_list.length > 0){
					//如果存在条件格式 则检查 是否 满足必填项
					var _len = temp_format_list.length;
					for(var i = 0;i < _len;i++){
						var temp = temp_format_list[i];
						if(!temp.id){
							msg = _len > 1? "第"+(i+1)+"行条件格式，请选择条件":"请选择条件";
							flag = false;
							break;
						}

						if(temp.id == "6"){
							if(!temp.value || !temp.value2){
								msg = _len > 1?"第"+(i+1)+"行条件格式，请输入区间数值":"请输入区间数值";
								flag = false;
								break;
							}
						}else{
							if(!temp.value){
								msg = _len > 1?"第"+(i+1)+"行条件格式，请输入数值":"请输入数值";
								flag = false;
								break;
							}
						}
					}
				}
				
				if(!flag){
					layercheck(msg);
					return;
				}
				
				$scope.chartSetting.format_list = temp_format_list;
				this.closeMeterConditionFormatDialog();
				this.modify();
			},
			//计量图 目标值设置
			openMeterSetValueDialog:function(){
				var target_value = $scope.chartSetting.target_value;
				if(target_value){
					$scope.chartSetting.temp_target_value = {};
					angular.copy(target_value, $scope.chartSetting.temp_target_value);
				}else{
					$scope.chartSetting.temp_target_value = {
							column_id:"",
							column_name:"请选择字段",
							unique_id:"",
							value_type:"",
							value_type_name:"请选择类型",
							aggregator:"",
							aggregator_name:"请选择函数",
							value:"",
							rate_digit:0
					};
				}		
				//得到数值类型的字段
				$scope.mertering_field_list = commonService.findFieldsByDataType(commonData.data_type_set.NUM,
						$scope.container.columnList);			
				$scope.mask_show = true;
				$scope.mertering_set_value_show = true;
			},
			setMeterValueType:function(item){
				$scope.chartSetting.temp_target_value.value_type = item.id;
				$scope.chartSetting.temp_target_value.value_type_name = item.name;
			},
			setMeterValueTypeField:function(item){
				if(!item.select_calculation){
					item.select_calculation = {};
				}
				
				$scope.chartSetting.temp_target_value.column_id = item.column_id;
				$scope.chartSetting.temp_target_value.column_name =  item.select_calculation.name? 
						item.alias_name+"("+item.select_calculation.name+")":item.alias_name;
				$scope.chartSetting.temp_target_value.unique_id = item.unique_id;
			},
			setMeterValueTypeAggregator:function(item){
				$scope.chartSetting.temp_target_value.aggregator = item.id;
				$scope.chartSetting.temp_target_value.aggregator_name = item.name;
			},
			closeMeterSetValueDialog:function(){
				$scope.mask_show = false;
				$scope.mertering_set_value_show = false;
			},
			confrimMeterSetValue:function(){
				var temp = $scope.chartSetting.temp_target_value;	
				var flag = true;
				if(!temp.value_type){
					layercheck("请选择类型");
					return;
				}
				
				if(temp.value_type == "1"){//计算值
					if(!temp.column_id){
						layercheck("请选择字段");
						return;
					}
					
					if(!temp.aggregator){
						layercheck("请选择函数");
						return;
					}
				}else if(temp.value_type == "0"){
					var value = temp.value;
					if(!value){
						flag = false;
					}
				}
				
				$scope.chartSetting.target_value = temp;
				
				if(!flag){
					$scope.chartSetting.target_value = {
							column_id:"",
							column_name:"请选择字段",
							unique_id:"",
							value_type:"",
							value_type_name:"请选择类型",
							aggregator:"",
							aggregator_name:"请选择函数",
							value:"",
							rate_digit:0
					};
				}
				
				this.closeMeterSetValueDialog();
				this.modify();
			},
			//指标卡 条件格式弹出框
			openIndexFormartDialog:function(){
				var format_list = $scope.chartSetting.index_format_list;
				if(format_list && format_list.length > 0){//如果条件格式集合存在数据 则复制到临时容器中
					$scope.chartSetting.temp_format_list = [];
					angular.copy(format_list, $scope.chartSetting.temp_format_list);	
					var temp_format_list = $scope.chartSetting.temp_format_list;
					if(temp_format_list && temp_format_list.length > 0){
						for(var i = 0;i < temp_format_list.length;i++){
							temp_format_list[i].itemshow = false;
							temp_format_list[i].itemshow2 = false;
						}
					}
				}else{
					$scope.chartSetting.temp_format_list = [];
				}
				$scope.mask_show = true;
				$scope.index_condition_formart_show = true;
			},
			closeIndexFormartDialog:function(){
				$scope.mask_show = false;
				$scope.index_condition_formart_show = false;
			},
			indexFormatColor:function(obj){
				var _this = this;
				$scope.$apply(function(){
					var color = "#"+obj.color.toHex();
					$scope.chartSetting.temp_format_list[obj.index].color = color;
				});
			},
			indexNoStyle:function(item,e){
				item.showstyle = false;
				item.symbol = "";
			},
			setIndexSymbol:function(item,obj,e){
				item.symbol = obj.symbol;
				item.showstyle = obj.showstyle;
				this.closeIndexShowStyle2(item,e);
			},
			setIndexFormat:function(item,obj){
				item.symbol = obj.symbol;
				item.color = obj.color;
				item.showstyle = obj.showstyle;
			},
			openIndexShowStyle:function(item){
				item.itemshow = true;
			},
			openIndexShowStyle2:function(item){
				item.itemshow2 = true;
			},
			closeIndexShowStyle:function(item,e){
				item.itemshow = false;
				e.stopPropagation();
			},
			closeIndexShowStyle2:function(item,e){
				item.itemshow2 = false;
				e.stopPropagation();
			},
			addIndexConditionFormat:function(){
				var index_format_style_list = commonData.index_format_style_list;
				var temp_format = new Object();
				temp_format.column_id = "";
				temp_format.column_name = "请选择字段";
				temp_format.unique_id = "";
				temp_format.cal_type = "";
				temp_format.cal_name = "请选择条件";
				temp_format.formula = "";
				temp_format.value = "";
				temp_format.itemshow = false;
				temp_format.itemshow2 = false;
				temp_format.value2 = "";
				temp_format.color = index_format_style_list[0].color;//给与默认颜色	
				temp_format.symbol = index_format_style_list[0].symbol;
				temp_format.showstyle = true;
				$scope.chartSetting.temp_format_list.push(temp_format);		
			},
			delIndexConditionFormat:function(index){
				$scope.chartSetting.temp_format_list.splice(index,1);
			},
			setIndexField:function(item,field){
				item.column_id = field.column_id;
				item.column_name = field.select_calculation.name? 
						field.alias_name+"("+field.select_calculation.name+")":field.alias_name;
				item.unique_id = field.unique_id;
			},
			setIndexCondition:function(item,condition){
				item.cal_type = condition.id;
				item.cal_name = condition.name;
				item.formula = condition.formula;
			},
			confrimIndexFormart:function(){
				var temp_format_list  = $scope.chartSetting.temp_format_list;
				var flag = true;
				var msg = "";
				if(temp_format_list && temp_format_list.length > 0){
					//如果存在条件格式 则检查 是否 满足必填项
					var _len = temp_format_list.length;
					for(var i = 0;i < _len;i++){
						var temp = temp_format_list[i];
						
						if(!temp.column_id){
							msg = _len > 1? "第"+(i+1)+"行条件格式，请选择字段":"请选择字段";
							flag = false;
							break;
						}

						
						if(!temp.cal_type){
							msg = _len > 1? "第"+(i+1)+"行条件格式，请选择条件":"请选择条件";
							flag = false;
							break;
						}

						if(temp.id == "6"){
							if(!temp.value || !temp.value2){
								msg = _len > 1?"第"+(i+1)+"行条件格式，请输入区间数值":"请输入区间数值";
								flag = false;
								break;
							}
						}else{
							if(!temp.value){
								msg = _len > 1?"第"+(i+1)+"行条件格式，请输入数值":"请输入数值";
								flag = false;
								break;
							}
						}
					}
				}else{
					layercheck("请添加条件格式");
					return;
				}
				
				if(!flag){
					layercheck(msg);
					return;
				}
				
				$scope.chartSetting.index_format_list = temp_format_list;
				this.closeIndexFormartDialog();
				this.modify();
			},
			//表格 条件格式
			openTableFormartDialog:function(){
				var format_list = $scope.chartSetting.table_format_list;
				if(format_list && format_list.length > 0){//如果条件格式集合存在数据 则复制到临时容器中
					$scope.chartSetting.temp_format_list = [];
					angular.copy(format_list, $scope.chartSetting.temp_format_list);	
					var temp_format_list = $scope.chartSetting.temp_format_list;
					if(temp_format_list && temp_format_list.length > 0){
						for(var i = 0;i < temp_format_list.length;i++){
							temp_format_list[i].itemshow = false;
						}
					}
				}else{
					$scope.chartSetting.temp_format_list = [];
				}
				$scope.mask_show = true;
				$scope.table_condition_formart_show = true;
			},
			closeTableFormartDialog:function(){
				$scope.mask_show = false;
				$scope.table_condition_formart_show = false;
			},
			tableFormatColor:function(obj){
				var _this = this;
				$scope.$apply(function(){
					var color = "#"+obj.color.toHex();
					$scope.chartSetting.temp_format_list[obj.index].color = color;
				});
			},
			tableFormatBgColor:function(obj){
				var _this = this;
				$scope.$apply(function(){
					var color = "#"+obj.color.toHex();
					$scope.chartSetting.temp_format_list[obj.index].bgcolor = color;
				});
			},
			setTableFormat:function(item,obj){
				item.color = obj.color;
				item.bgcolor = obj.bgcolor;
			},
			openTableShowStyle:function(item){
				item.itemshow = true;
			},
			closeTableShowStyle:function(item,e){
				item.itemshow = false;
				e.stopPropagation();
			},
			setTableField:function(item,field){
				item.column_id = field.column_id;
				item.column_name = field.select_calculation.name? 
						field.alias_name+"("+field.select_calculation.name+")":field.alias_name;
				item.unique_id = field.unique_id;
			},
			setTableCondition:function(item,condition){
				item.cal_type = condition.id;
				item.cal_name = condition.name;
				item.formula = condition.formula;
			},
			addTableConditionFormat:function(){
				var table_format_style_list = commonData.table_format_style_list;
				var temp_format = new Object();
				temp_format.column_id = "";
				temp_format.column_name = "请选择字段";
				temp_format.unique_id = "";
				temp_format.cal_type = "";
				temp_format.cal_name = "请选择条件";
				temp_format.formula = "";
				temp_format.value = "";
				temp_format.itemshow = false;
				temp_format.value2 = "";
				temp_format.color = table_format_style_list[0].color;//给与默认颜色	
				temp_format.bgcolor = table_format_style_list[0].bgcolor;
				$scope.chartSetting.temp_format_list.push(temp_format);		
			},
			delTableConditionFormat:function(index){
				$scope.chartSetting.temp_format_list.splice(index,1);
			},
			confrimTableFormart:function(){
				var temp_format_list  = $scope.chartSetting.temp_format_list;
				var flag = true;
				var msg = "";
				if(temp_format_list && temp_format_list.length > 0){
					//如果存在条件格式 则检查 是否 满足必填项
					var _len = temp_format_list.length;
					for(var i = 0;i < _len;i++){
						var temp = temp_format_list[i];
						
						if(!temp.column_id){
							msg = _len > 1? "第"+(i+1)+"行条件格式，请选择字段":"请选择字段";
							flag = false;
							break;
						}

						
						if(!temp.cal_type){
							msg = _len > 1? "第"+(i+1)+"行条件格式，请选择条件":"请选择条件";
							flag = false;
							break;
						}

						if(temp.id == "6"){
							if(!temp.value || !temp.value2){
								msg = _len > 1?"第"+(i+1)+"行条件格式，请输入区间数值":"请输入区间数值";
								flag = false;
								break;
							}
						}else{
							if(!temp.value){
								msg = _len > 1?"第"+(i+1)+"行条件格式，请输入数值":"请输入数值";
								flag = false;
								break;
							}
						}
					}
				}
				
				if(!flag){
					layercheck(msg);
					return;
				}
				
				$scope.chartSetting.table_format_list = temp_format_list;
				this.closeTableFormartDialog();
				this.modify();
			},
			//y轴辅助线
			openGuideDialog:function(){
				var guide_list = $scope.chartSetting.guide_list;
			
				if(guide_list && guide_list.length > 0){//如果条件格式集合存在数据 则复制到临时容器中
					$scope.chartSetting.temp_guide_list = [];
					angular.copy(guide_list, $scope.chartSetting.temp_guide_list);	
				}else{
					$scope.chartSetting.temp_guide_list = [];
				}
				$scope.mask_show = true;
				$scope.y_guide_show = true;
			},
			closeGuideDialog:function(){
				$scope.mask_show = false;
				$scope.y_guide_show = false;
			},
			addYGuide:function(){
				var temp_guide = new Object();
				temp_guide.guide_name = "";
				temp_guide.name = "请选择类型";
				temp_guide.type = "";
				temp_guide.column_id = "";
				temp_guide.column_name = "请选择字段";
				temp_guide.show_name = "";
				temp_guide.unique_id = "";
				temp_guide.aggregator = "";
				temp_guide.aggregator_name = "请选择函数";
				temp_guide.value = 0;
				$scope.chartSetting.temp_guide_list.push(temp_guide);		
			},
			delYGuide:function(index){
				$scope.chartSetting.temp_guide_list.splice(index,1);
			},
			setGuideValueType:function(item,obj){
				item.type = obj.id;
				item.name = obj.name;
			},
			setGuideField:function(item,field){
				item.column_id = field.column_id;
				item.show_name = field.column_name;
				item.column_name = field.select_calculation.name? 
						field.alias_name+"("+field.select_calculation.name+")":field.alias_name;
				item.unique_id = field.unique_id;
			},
			setGuideFormulas:function(item,obj){
				item.aggregator_name = obj.name;
				item.aggregator = obj.aggregator;
			},
			confrimGuide:function(){
				var _this = this;
				var temp_guide_list  = $scope.chartSetting.temp_guide_list;
				var flag = true;
				var msg = "";
				if(temp_guide_list && temp_guide_list.length > 0){
					//如果存在条件格式 则检查 是否 满足必填项
					var _len = temp_guide_list.length;
					for(var i = 0;i < _len;i++){
						var temp = temp_guide_list[i];
						if(!temp.guide_name){
							msg = _len > 1? "第"+(i+1)+"行，请输入辅助线名称":"请输入辅助线名称";
							flag = false;
							break;
						}

						
						if(!temp.type){
							msg = _len > 1? "第"+(i+1)+"行，请选择类型":"请选择类型";
							flag = false;
							break;
						}
						
						if(!temp.column_id){
							msg = _len > 1? "第"+(i+1)+"行，请选择字段":"请选择字段";
							flag = false;
							break;
						}
						
						if(temp.type == "1"){//计算值类型
							if(!temp.aggregator){
								msg = _len > 1? "第"+(i+1)+"行，请选择函数":"请选择函数";
								flag = false;
								break;
							}
							
						}else{
							if(!temp.value){
								msg = _len > 1?"第"+(i+1)+"行，请输入数值":"请输入数值";
								flag = false;
								break;
							}
						}
					}
				}else{
					$scope.chartSetting.guide_list = null;
					this.closeGuideDialog();
					_this.modify();
					return;
				}
				
				if(!flag){
					layercheck(msg);
					return;
				}
				$scope.chartSetting.guide_list = temp_guide_list;
				_this.closeGuideDialog();
				_this.modify();
			},
			openGuide2Dialog:function(){
				var guide_list = $scope.chartSetting.guide_list2;
			
				if(guide_list && guide_list.length > 0){//如果条件格式集合存在数据 则复制到临时容器中
					$scope.chartSetting.temp_guide_list2 = [];
					angular.copy(guide_list, $scope.chartSetting.temp_guide_list2);	
				}else{
					$scope.chartSetting.temp_guide_list2 = [];
				}
				$scope.mask_show = true;
				$scope.y2_guide_show = true;
			},
			closeGuide2Dialog:function(){
				$scope.mask_show = false;
				$scope.y2_guide_show = false;
			},
			addY2Guide:function(){
				var temp_guide = new Object();
				temp_guide.guide_name = "";
				temp_guide.name = "请选择类型";
				temp_guide.type = "";
				temp_guide.column_id = "";
				temp_guide.column_name = "请选择字段";
				temp_guide.show_name = "";
				temp_guide.unique_id = "";
				temp_guide.aggregator = "";
				temp_guide.aggregator_name = "请选择函数";
				temp_guide.value = 0;
				$scope.chartSetting.temp_guide_list2.push(temp_guide);	
			},
			delY2Guide:function(index){
				$scope.chartSetting.temp_guide_list2.splice(index,1);
			},
			confrimGuide2:function(){
				var _this = this;
				var temp_guide_list  = $scope.chartSetting.temp_guide_list2;
				var flag = true;
				var msg = "";
				if(temp_guide_list && temp_guide_list.length > 0){
					//如果存在条件格式 则检查 是否 满足必填项
					var _len = temp_guide_list.length;
					for(var i = 0;i < _len;i++){
						var temp = temp_guide_list[i];
						if(!temp.guide_name){
							msg = _len > 1? "第"+(i+1)+"行，请输入辅助线名称":"请输入辅助线名称";
							flag = false;
							break;
						}

						
						if(!temp.type){
							msg = _len > 1? "第"+(i+1)+"行，请选择类型":"请选择类型";
							flag = false;
							break;
						}
						
						if(!temp.column_id){
							msg = _len > 1? "第"+(i+1)+"行，请选择字段":"请选择字段";
							flag = false;
							break;
						}
						
						if(temp.type == "1"){//计算值类型
							if(!temp.aggregator){
								msg = _len > 1? "第"+(i+1)+"行，请选择函数":"请选择函数";
								flag = false;
								break;
							}
							
						}else{
							if(!temp.value){
								msg = _len > 1?"第"+(i+1)+"行，请输入数值":"请输入数值";
								flag = false;
								break;
							}
						}
					}
				}else{
					$scope.chartSetting.guide_list2 = null;
					this.closeGuide2Dialog();
					_this.modify();
					return;
				}
				
				if(!flag){
					layercheck(msg);
					return;
				}
				$scope.chartSetting.guide_list2 = temp_guide_list;
				_this.closeGuide2Dialog();
				_this.modify();
			},
			checkFieldAdvanceStatus:function(id){
				var flag = false;
				if(id == "1"){//同比/环比  检查 x轴的 首个字段是否是 date类型
					var x_axisList = $scope.container.x_axisList;
					if(x_axisList && x_axisList.length > 0){
						var field = x_axisList[0];
						if(field.data_type == commonData.data_type_set.DATE){
							var granularity = field.select_date_granularity;
							if(granularity == "hour" || 
								granularity == "minute" ||
								granularity == "second"){
								$scope.tongbi_huanbi_li_show  = false;
							}else{
								$scope.tongbi_huanbi_li_show  = true;
							}
							var box = commonService.findTongbiHuangbiBox(granularity);
							$scope.tongbi_huanbi_box_lis = box.contrast;
							flag = true;
						}
					}	
				}
				return flag;
			},
			setFieldAdvance:function(type,index,item,obj){
				var flag = this.checkFieldAdvanceStatus(obj.id);
				if(flag && $scope.tongbi_huanbi_li_show){
					return;
				}
				item.advance_id = obj.id;
				$scope.chartOperate.draggableElmentIndex = index;
				$scope.chartOperate.draggableElmentType = type;
				if(obj.id == "1"){
					this.openTongbiHuanbiDialog(item);
				}else if(obj.id == "0"){
					item.advance_id = "";
					item.advance_aggregator = {};
					item.advance_name = "";
					this.modify();
				}
			},
			setAdvanceFunc:function(advance_id,item,p){
				if(advance_id == "1"){
					item.advance_aggregator = {};
					item.advance_id = advance_id;
					item.advance_aggregator.advance_t_h_id = p.id;
					item.advance_aggregator.type = p.type;
					item.advance_aggregator.type_name = p.name;
					item.advance_aggregator.granularity = p.granularity || "";
					item.advance_name = p.name;
					var xfield = this.getXDateField();
					item.advance_aggregator.date_field_type = xfield.select_date_granularity;
					item.advance_aggregator.date_field_fid = xfield.column_id;
					item.advance_aggregator.yoyQoqType = p.cal;
					this.modify();
				}else if(advance_id == "3"){
					item.advance_aggregator = {};
					item.advance_id = advance_id;
					item.advance_aggregator.type = "remain";
					item.advance_aggregator.advance_t_h_id = p.id;
					item.advance_aggregator.day = p.id;
					item.advance_name = p.name;
					this.modify();
				}
			},
			getXDateField:function(){
				var xfield = null;
				var x_axisList = $scope.container.x_axisList;
				if(x_axisList && x_axisList.length > 0){
					var field = x_axisList[0];
					if(field.data_type == commonData.data_type_set.DATE){
						//var granularity = field.select_date_granularity;
						xfield = field;
					}
				}
				return xfield;
			},
			openTongbiHuanbiDialog:function(item){
				$scope.tongbi_huanbi_obj = {};
				var columnList = commonService.findFieldsByDataType(commonData.data_type_set.DATE,
						$scope.container.columnList);
				var advance_aggregator = item.advance_aggregator;
				if(advance_aggregator){
					angular.copy(advance_aggregator, $scope.tongbi_huanbi_obj);	
				}
				advance_aggregator = $scope.tongbi_huanbi_obj;
				
				advance_aggregator.columnList = columnList;
				
				
				if(!advance_aggregator.type){
					advance_aggregator.type = "";
					advance_aggregator.granularity = "";
					advance_aggregator.type_name = "请选择类型";
				}
				
				
				if(!advance_aggregator.date_field_type){//日期类型为空则默认赋值
					var tongbi_huangbi = commonData.tongbi_huangbi_list[0];
					var contrast_list = tongbi_huangbi.contrast;
					advance_aggregator.date_field_type = tongbi_huangbi.id;
					advance_aggregator.date_field_type_name = tongbi_huangbi.name;
					advance_aggregator.contrast_list = contrast_list;
					advance_aggregator.type = contrast_list[0].type;
					advance_aggregator.granularity = contrast_list[0].granularity;
					advance_aggregator.type_name = contrast_list[0].name;
				}
				
				if(!advance_aggregator.date_field_fid){
					if(columnList && columnList.length > 0){
						advance_aggregator.date_field_fid  = columnList[0].column_id;
						advance_aggregator.date_field_column_name = columnList[0].column_name;
					}else{
						advance_aggregator.date_field_fid = "";
						advance_aggregator.date_field_column_name = "请选择字段";
					}
				}
				
				if(!advance_aggregator.yoyQoqType){
					var _obj =  commonData.yoyQoqType_list[0];
					advance_aggregator.yoyQoqType = _obj.id;
					advance_aggregator.yoyQoqType_name = _obj.name;
				}
				
				
				if(!advance_aggregator.selected_date_type){
					var tongbi_huangbi = commonData.tongbi_huangbi_list[0];
					advance_aggregator.selected_date_type = tongbi_huangbi.id;
					advance_aggregator.selected_date_confirm = tongbi_huangbi.select_date[0].id;
					advance_aggregator.selected_date_obj = tongbi_huangbi.select_date;
					advance_aggregator.selected_date_value = 0;
				}

				$scope.mask_show = true;
				$scope.tongbi_huanbi_show = true;
			},
			closeTongbiHuanbiDialog:function(){
				$scope.mask_show = false;
				$scope.tongbi_huanbi_show = false;
			},
			setTongbiHuanbiField:function(item){
				$scope.tongbi_huanbi_obj.date_field_fid = item.column_id;
				$scope.tongbi_huanbi_obj.date_field_column_name = item.column_name;
			},
			setTongbiHuanbiDateType:function(item){
				$scope.tongbi_huanbi_obj.date_field_type = item.id;
				$scope.tongbi_huanbi_obj.date_field_type_name = item.name;
				$scope.tongbi_huanbi_obj.contrast_list = item.contrast;
				$scope.tongbi_huanbi_obj.type = item.contrast[0].type;
				$scope.tongbi_huanbi_obj.granularity = item.contrast[0].granularity;
				$scope.tongbi_huanbi_obj.type_name = item.contrast[0].name;
				var _tb = commonService.findTongbiHuangbiElement(item.id,commonData.tongbi_huangbi_list);
				var _select_date = _tb.select_date;
				$scope.tongbi_huanbi_obj.selected_date_type = item.id;
				$scope.tongbi_huanbi_obj.selected_date_confirm = _select_date[0].id;
				$scope.tongbi_huanbi_obj.selected_date_obj = _select_date;
				
			},
			setTongbiHuanbiContrast:function(item){
				$scope.tongbi_huanbi_obj.type = item.type;
				$scope.tongbi_huanbi_obj.granularity = item.granularity;
				$scope.tongbi_huanbi_obj.type_name = item.name;
			},
			setTongbiHuanbiYoyQoq:function(item){
				$scope.tongbi_huanbi_obj.yoyQoqType = item.id;
				$scope.tongbi_huanbi_obj.yoyQoqType_name = item.name;
			},
			confrimTongbiHuanbi:function(){
				var data = $scope.tongbi_huanbi_obj;
				if(!data.date_field_fid){
					layercheck("请选择字段");
					return;
				}
				var index = $scope.chartOperate.draggableElmentIndex;
				if($scope.chartOperate.draggableElmentType == "y"){
					$scope.container.y_axisList[index].advance_aggregator = data;
					$scope.container.y_axisList[index].advance_name = data.date_field_type_name + data.type_name;
				}else if($scope.chartOperate.draggableElmentType == "y2"){
					$scope.container.y2_axisList[index].advance_aggregator = data;
					$scope.container.y2_axisList[index].advance_name = data.date_field_type_name + data.type_name;
				}
				this.closeTongbiHuanbiDialog();
				this.modify();
			},
			//数值显示格式
			setNumericFormat:function(type,index,item){
				$scope.chartOperate.draggableElmentIndex = index;
				$scope.chartOperate.draggableElmentType = type;
				this.openNumericFormatDialog(item);
			},
			openNumericFormatDialog:function(item){
				$scope.numeric_format_obj = {};
				var formatter = item.formatter;
				if(formatter){
					angular.copy(formatter, $scope.numeric_format_obj);	
				}else{
					var numeric_format_units = commonData.numeric_format_units;
					$scope.numeric_format_obj.check = "num";
					$scope.numeric_format_obj.percent = {digit:2};
					$scope.numeric_format_obj.num = {
							millesimal:true,
							digit:2,
							unit:numeric_format_units[0].name,
							unit_id:numeric_format_units[0].id,
							unit_value:numeric_format_units[0].value
					};
				}
				$scope.mask_show = true;
				$scope.numeric_format_show = true;
			},
			numericFormatSwitch:function(){
				$scope.numeric_format_obj.num.millesimal = !$scope.numeric_format_obj.num.millesimal;
			},
			setNumericFormatUnit:function(obj){
				$scope.numeric_format_obj.num.unit = obj.name;
				$scope.numeric_format_obj.num.unit_id = obj.id;
				$scope.numeric_format_obj.num.unit_value = obj.value;
			},
			closeNumericFormatDialog:function(){
				$scope.mask_show = false;
				$scope.numeric_format_show = false;
			},
			confirmNumericFormat:function(){
				var data = $scope.numeric_format_obj;
				var index = $scope.chartOperate.draggableElmentIndex;
				if($scope.chartOperate.draggableElmentType == "y"){
					$scope.container.y_axisList[index].formatter = data;
				}else if($scope.chartOperate.draggableElmentType == "y2"){
					$scope.container.y2_axisList[index].formatter = data;
				}
				this.closeNumericFormatDialog();
				this.modify();
			},
			//设置字段名称
			setFieldName:function(type,index,item){
				$scope.chartOperate.draggableElmentIndex = index;
				$scope.chartOperate.draggableElmentType = type;
				this.openSetFieldNameDialog(type,item);
			},
			openSetFieldNameDialog:function(type,item){
				$scope.set_field_name_obj.alias_name = item.new_alias_name || "";
				$scope.set_field_name_obj.unit = item.unit || "";
				$scope.set_field_name_obj.remark = item.remark || "";
				if(type == 'x'){
					$scope.set_field_name_obj.hide_unit = true;
				}else{
					$scope.set_field_name_obj.hide_unit = false;
				}
				$scope.mask_show = true;
				$scope.set_field_name_show = true;
			},
			closeSetFieldNameDialog:function(){
				$scope.mask_show = false;
				$scope.set_field_name_show = false;
			},
			confirmFieldName:function(){
				var data = $scope.set_field_name_obj;
				var index = $scope.chartOperate.draggableElmentIndex;
				if($scope.chartOperate.draggableElmentType == "x"){
					$scope.container.x_axisList[index].new_alias_name = data.alias_name;
					$scope.container.x_axisList[index].unit = data.unit;
					$scope.container.x_axisList[index].remark = data.remark;
				}else if($scope.chartOperate.draggableElmentType == "y"){
					$scope.container.y_axisList[index].new_alias_name = data.alias_name;
					$scope.container.y_axisList[index].unit = data.unit;
					$scope.container.y_axisList[index].remark = data.remark;
				}else if($scope.chartOperate.draggableElmentType == "y2"){
					$scope.container.y2_axisList[index].new_alias_name = data.alias_name;
					$scope.container.y2_axisList[index].unit = data.unit;
					$scope.container.y2_axisList[index].remark = data.remark;
				}
				this.closeSetFieldNameDialog();
				this.modify();
			},
			callbackSort:function(obj){
				var unique_id = obj.unique_id;
				var type = obj.type;
				var axis = obj.axis;
				var field = null;
				if(axis == "x"){
					field = commonService.getField($scope.container.x_axisList,unique_id);
				}else if(axis == "y"){
					field = commonService.getField($scope.container.y_axisList,unique_id);
				}
				if(field){
					$scope.chartOperate.sort = {};
					$scope.chartOperate.sort.type = type;
					$scope.chartOperate.sort.axis = axis;
					$scope.chartOperate.sort.fid = field.column_id;
					$scope.chartOperate.sort.unique_id = unique_id;
					$scope.chartOperate.sort.data_type = field.data_type;
					this.modify();
				}
			},
			//散点图辅助线弹框
			openScatterGuideDialog:function(){
				var x_guide_list = $scope.chartSetting.x_guide_list;
				var y_guide_list = $scope.chartSetting.y_guide_list;
				if(x_guide_list && x_guide_list.length > 0){//如果条件格式集合存在数据 则复制到临时容器中
					$scope.chartSetting.x_temp_guide_list = [];
					angular.copy(x_guide_list, $scope.chartSetting.x_temp_guide_list);	
				}else{
					$scope.chartSetting.x_temp_guide_list = [];
				}
				if(y_guide_list && y_guide_list.length > 0){//如果条件格式集合存在数据 则复制到临时容器中
					$scope.chartSetting.y_temp_guide_list = [];
					angular.copy(y_guide_list, $scope.chartSetting.y_temp_guide_list);	
				}else{
					$scope.chartSetting.y_temp_guide_list = [];
				}
				$scope.mask_show = true;
				$scope.scatter_guide_show = true;
			},
			closeScatterGuideDialog:function(){
				$scope.mask_show = false;
				$scope.scatter_guide_show = false;
			},
			addScatterXGuide:function(){
				var temp_guide = new Object();
				temp_guide.guide_name = "";
				temp_guide.name = "请选择类型";
				temp_guide.type = "";
				temp_guide.column_id = "";
				temp_guide.column_name = "请选择字段";
				temp_guide.show_name = "";
				temp_guide.unique_id = "";
				temp_guide.aggregator = "";
				temp_guide.aggregator_name = "请选择函数";
				temp_guide.value = 0;
				$scope.chartSetting.x_temp_guide_list.push(temp_guide);
			},
			addScatterYGuide:function(){
				var temp_guide = new Object();
				temp_guide.guide_name = "";
				temp_guide.name = "请选择类型";
				temp_guide.type = "";
				temp_guide.column_id = "";
				temp_guide.column_name = "请选择字段";
				temp_guide.show_name = "";
				temp_guide.unique_id = "";
				temp_guide.aggregator = "";
				temp_guide.aggregator_name = "请选择函数";
				temp_guide.value = 0;
				$scope.chartSetting.y_temp_guide_list.push(temp_guide);
			},
			delScatterXGuide:function(index){
				$scope.chartSetting.x_temp_guide_list.splice(index,1);
			},
			delScatterYGuide:function(index){
				$scope.chartSetting.y_temp_guide_list.splice(index,1);
			},
			confrimScatterGuide:function(){
				var _this = this;
				var x_temp_guide_list  = $scope.chartSetting.x_temp_guide_list;
				var y_temp_guide_list  = $scope.chartSetting.y_temp_guide_list;
				var flag = true;
				var msg = "";
				if(x_temp_guide_list && x_temp_guide_list.length > 0){
					//如果存在条件格式 则检查 是否 满足必填项
					var _len = x_temp_guide_list.length;
					for(var i = 0;i < _len;i++){
						var temp = x_temp_guide_list[i];
						if(!temp.guide_name){
							msg = _len > 1? "横向辅助线第"+(i+1)+"行，请输入辅助线名称":"请输入辅助线名称";
							flag = false;
							break;
						}

						
						if(!temp.type){
							msg = _len > 1? "横向辅助线第"+(i+1)+"行，请选择类型":"请选择类型";
							flag = false;
							break;
						}
//						
//						if(!temp.column_id){
//							msg = _len > 1? "横向辅助线第"+(i+1)+"行，请选择字段":"请选择字段";
//							flag = false;
//							break;
//						}
						
						if(temp.type == "1"){//计算值类型
							if(!temp.aggregator){
								msg = _len > 1? "横向辅助线第"+(i+1)+"行，请选择函数":"请选择函数";
								flag = false;
								break;
							}
							
						}
					}
				}else{
					$scope.chartSetting.x_guide_list = null;
				}
				if(y_temp_guide_list && y_temp_guide_list.length > 0){
					//如果存在条件格式 则检查 是否 满足必填项
					var _len = y_temp_guide_list.length;
					for(var i = 0;i < _len;i++){
						var temp = y_temp_guide_list[i];
						if(!temp.guide_name){
							msg = _len > 1? "纵向辅助线第"+(i+1)+"行，请输入辅助线名称":"请输入辅助线名称";
							flag = false;
							break;
						}

						
						if(!temp.type){
							msg = _len > 1? "纵向辅助线第"+(i+1)+"行，请选择类型":"请选择类型";
							flag = false;
							break;
						}
						
//						if(!temp.column_id){
//							msg = _len > 1? "纵向辅助线第"+(i+1)+"行，请选择字段":"请选择字段";
//							flag = false;
//							break;
//						}
						
						if(temp.type == "1"){//计算值类型
							if(!temp.aggregator){
								msg = _len > 1? "纵向辅助线第"+(i+1)+"行，请选择函数":"请选择函数";
								flag = false;
								break;
							}
							
						}
					}
					
				}else{
					$scope.chartSetting.y_guide_list = null;
				}
				if(!flag){
					layercheck(msg);
					return;
				}
				$scope.chartSetting.x_guide_list = x_temp_guide_list;
				$scope.chartSetting.y_guide_list = y_temp_guide_list;
				_this.closeScatterGuideDialog();
				_this.modify();
			}
			
	};
	//图表设置方法对象
	$scope.setFn = {
			chartStyleTypeRadio:function(value){
				$scope.chartSetting.chart_style_type = value;
				$scope.fn.modify();
			},
			chartStyleRadio:function(type){
				if(type == 'zx'){
					$scope.chartSetting.chart_style = 1;					
				}else if(type == 'qx'){
					$scope.chartSetting.chart_style = 2;
				}
				$scope.fn.modify();
			},
			chartLayoutRadio:function(type){
				if(type == 'sp'){
					$scope.chartSetting.layout_style = 1;					
				}else if(type == 'cz'){
					$scope.chartSetting.layout_style = 2;
				}
				$scope.fn.modify();
			},
			chartTagSwitch:function(){
				$scope.chartSetting.show_chart_tag = !$scope.chartSetting.show_chart_tag;
				$scope.fn.modify();
			},
			cumulativeSwitch:function(){
				$scope.chartSetting.cumulative_enabled = !$scope.chartSetting.cumulative_enabled;
				$scope.fn.modify();
			},
			axisMaxSwitch:function(){
				$scope.chartSetting.axis_max_enabled = !$scope.chartSetting.axis_max_enabled;
				$scope.fn.modify();
			},
			axis2MaxSwitch:function(){
				$scope.chartSetting.axis2_max_enabled = !$scope.chartSetting.axis2_max_enabled;
				$scope.fn.modify();
			},
			axisMinSwitch:function(){
				$scope.chartSetting.axis_min_enabled = !$scope.chartSetting.axis_min_enabled;
				$scope.fn.modify();
			},
			axis2MinSwitch:function(){
				$scope.chartSetting.axis2_min_enabled = !$scope.chartSetting.axis2_min_enabled;
				$scope.fn.modify();
			},
			axisShowNumberSwitch:function(){
				$scope.chartSetting.axis_show_number_enabled = !$scope.chartSetting.axis_show_number_enabled;
				$scope.chartSetting.top = {type:"items",typeName:"项目",reversed:"0",reversedName:"前",enabled:"",value:"20"};
				$scope.chartSetting.top.value = 20;
				$scope.chartSetting.top.enabled = $scope.chartSetting.axis_show_number_enabled;
				$scope.container.xDataColors = [];
				$scope.fn.modify();
			},
			setTopValue:function(){
				var top_value = $scope.chartSetting.top.value;
				if(!commonService.isPositiveNum(top_value)){
					$scope.chartSetting.top.value = 0;
				}
				$scope.container.xDataColors = [];
				$scope.fn.modify();
			},
			chartShortaxisSwitch:function(){
				$scope.chartSetting.show_chart_shortaxis = !$scope.chartSetting.show_chart_shortaxis;
				$scope.fn.modify();
			},
			changeWordcloudNum:function(){
				var wordcloud_num = $scope.chartSetting.wordcloud_num;
				if(wordcloud_num  > 0){
					$scope.container.xDataColors = [];
				}
				$scope.fn.modify();
			},
			setAxisTitle:function(){
				$scope.chartSetting.axis_title_temp = $scope.chartSetting.axis_title;
				$scope.chartSetting.axis_title = '';
				$scope.fn.modify();
			},
			setAxis2Title:function(){
				$scope.chartSetting.axis2_title_temp = $scope.chartSetting.axis2_title;
				$scope.chartSetting.axis2_title = '';
				$scope.fn.modify();
			},
			axisUnifiedSwitch:function(){
				$scope.chartSetting.axis_unified = !$scope.chartSetting.axis_unified;
				$scope.fn.modify();
			},
			axisEntrySwitch:function(){
				$scope.chartSetting.show_axis_entry = !$scope.chartSetting.show_axis_entry;
				$scope.fn.modify();
			},
			setTopReverse:function(item){
				$scope.chartSetting.top.reversed = item.id;
				$scope.chartSetting.top.reversedName = item.name;
				$scope.container.xDataColors = [];
				$scope.fn.modify();
			},
			setTopType:function(item){
				$scope.chartSetting.top.type = item.id;
				$scope.chartSetting.top.typeName = item.name;
				$scope.container.xDataColors = [];
				$scope.fn.modify();
			},
			tbMergeCellSwitch:function(){
				$scope.chartSetting.tb_merge_cell = !$scope.chartSetting.tb_merge_cell;
				$scope.fn.modify();
			},
			tbStatisticSwitch:function(type){
				if(type == "row"){
					$scope.chartSetting.tb_statistic.row = !$scope.chartSetting.tb_statistic.row;
				}
				if(type == "col"){
					$scope.chartSetting.tb_statistic.col = !$scope.chartSetting.tb_statistic.col;
				}
				$scope.fn.modify();
			},
			tbRowStatisticMethod:function(obj){
				$scope.chartSetting.tb_statistic.row_formula = obj.method;
				$scope.fn.modify();
			},
			tbColStatisticMethod:function(item,obj){
				item.statistic_method = obj.method;
				$scope.fn.modify();
			},
			getStatisticMethod:function(type,obj){
				if(type == "row"){
					return $scope.tb_row_statistic_method[obj];
				}
			},
			tbStatisticPos:function(type,obj){
				if(type == "row"){
					$scope.chartSetting.tb_statistic.row_pos = obj.pos;
				}
				if(type == "col"){
					$scope.chartSetting.tb_statistic.col_pos = obj.pos;
				}
				$scope.fn.modify();
			},
			getStatisticPos:function(type,obj){
				if(type == "row"){
					return $scope.tb_row_statistic_pos[obj];
				}
				if(type == "col"){
					return $scope.tb_col_statistic_pos[obj];
				}
			},
			checkProcessMain:function(obj){
				var args = [];
				commonService.addXaxis(args,obj);
				$scope.chartSetting.processMain = args[0];
				$scope.fn.modify();
			}
	};
	
	$scope.fn.loadInfo();
});
//公共接口
app.factory('commonService',['$http','$location','commonData', function($http,$location,commonData){
	var commonService = {
			//post 提交 类似 ajax
			post:function(obj){
				return $http({
					method : 'POST',
					url:obj.url,
					params :obj.params,
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			},
			http:function(obj){
				return $http.post(obj.url,obj.data);
			},
			//初始化图表设置的默认选项
			initChartSetting:function(chart_type,setting_obj){
				var flag = true;
				if(chart_type == commonData.chart_type_set.TABLE){//表格
					chart_table.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.LINE){//折线图
					chart_line.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.FUNNEL){//漏斗图
					chart_funnel.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.T_BAR){//条形图
					chart_tbar.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.Z_BAR){//柱状图
					chart_zbar.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.D_BAR){//堆积柱状图
					chart_dbar.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.P_BAR){//百分比堆积柱状图
					chart_pbar.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.DT_BAR){//堆积条形图
					chart_dtbar.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.PDT_BAR){//百分比堆积条形图
					chart_pdtbar.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.BIAXIAL){//双轴图
					chart_biaxial.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.METERING){//计量图
					chart_metering.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.PIE){//饼图
					chart_pie.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.A_LINE){//面积图
					chart_aline.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.RADAR){//雷达图
					chart_radar.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.INDEX){//指标卡
					chart_index.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.MAP){//地图
					chart_map.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.WORD_CLOUD){//词云
					chart_wordcloud.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.SANKEY){//桑基图
					chart_sankey.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.RISING_SUN){
					chart_risingsun.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.SCATTER){
					chart_scatter.settingObj(setting_obj);
				}
				if(chart_type == commonData.chart_type_set.WATERFALL){
					chart_waterfall.settingObj(setting_obj);
				}
				return flag
			},
			//1. 处理string ,sub_date 2.处理 num
			findFieldConditionList:function(type){
				var list = [];
				if(type == 1){
					list = commonData.field_condition_list2;
				}else if(type == 2){
					list = commonData.field_condition_list1;
				}
				return list;
			},
			findTongbiHuangbiElement(id,list){
				var _obj = {};
				if(list && list.length > 0){
					for(var i =0;i < list.length;i++){
						var d = list[i];
						if(d.id == id){
							_obj = d;
							break;
						}
					}
				}
				return _obj;
			},
			findTongbiHuangbiBox:function(id){
				var _obj = null;
				var boxs = commonData.tongbi_huangbi_boxs;
				for(var i = 0;i < boxs.length;i++){
					if(boxs[i].id == id){
						_obj = boxs[i];
						break;
					}
				}
				return _obj;
			},
			//字段处理方法
			fieldHandler:function(obj){
				if(obj.data_type == commonData.data_type_set.DATE){
					obj.icon = commonData.field_icons.date;
					obj.active = false;
					//追加日期颗粒度
					var dateList= [];
					var temps = commonData.date_granularity;
					for(var i = 0;i < temps.length;i++){
						var _date = new Object();
						_date.data_type = commonData.data_type_set.SUB_DATE;
						_date.id = obj.id +"_" +temps[i].id;
						_date.granularity = temps[i].granularity;
						_date.name = temps[i].name;
						_date.original_name = obj.column_name;
						_date.column_id  = obj.column_id;
						dateList.push(_date);
					}			
					obj.dateList = dateList;				
				}else if(obj.data_type == commonData.data_type_set.STRING){
					obj.icon = commonData.field_icons.text;
				}else if(obj.data_type == commonData.data_type_set.NUM){
					obj.icon = commonData.field_icons.number;
				}
			},
			//通过数据类型来遍历字段集合.并给与unique_id
			findFieldsByDataType:function(data_type,columnList){
				var _this = this;
				var _fields = [];
				if(columnList && columnList.length > 0){
					for(var i = 0 ;i < columnList.length; i++){
						var field = columnList[i];
						field.unique_id = _this.getUniqueId();
						if(field.data_type == data_type){
							_fields.push(field);
						}
					}
				}
				return _fields;
			},
			//添加维度展示的元素
			addXaxis:function(args,elment){
				var _this = this;
				var _NewObj = new Object();
				angular.copy(elment, _NewObj);
				if(elment.data_type == commonData.data_type_set.SUB_DATE){
					_NewObj.alias_name = elment.name+"("+elment.original_name+")";
				}else if(elment.data_type == commonData.data_type_set.DATE){
					_NewObj.additional_granularity = commonData.date_granularity;
					_NewObj.select_date_granularity = "day"//默认按日
					_NewObj.alias_name = elment.alias_name + "("+_this.findDateTypeName(_NewObj.select_date_granularity)+")";
				}else{
					_NewObj.alias_name = elment.alias_name;
				}
				_NewObj.field_method = commonData.field_method;
				_NewObj.field_sort = commonData.field_sort;
				_NewObj.select_field_method = "";
//				_NewObj.select_field_sort = "";
				_NewObj.unique_id = _this.getUniqueId();
				_NewObj.drag = true;
				args.push(_NewObj);
				
				
			},
			findDateTypeName:function(granularity){
				var name = "";
				var list = commonData.date_granularity;
				if(list){
					for(var i = 0;i<list.length;i++){
						if(granularity == list[i].granularity){
							name = list[i].alias_name;
							break;
						}
					}
				}
				return name;
			},
			findCalculationName:function(value){
				var name = "";
				var q = commonData.field_level2_general_calculation;
				var b = commonData.field_calculation_more;
				var list = q.concat(b);
				if(list){
					for(var i = 0;i<list.length;i++){
						if(value == list[i].id){
							name = list[i].name;
							break;
						}
					}
				}
				return name;
			},
			
			//添加数值展示的元素
			addYaxis:function(args,elment){
				var _this = this;
				var _NewObj = new Object();
				angular.copy(elment, _NewObj);
				if(elment.data_type == commonData.data_type_set.SUB_DATE){
					_NewObj.alias_name = elment.name+"("+elment.original_name+")";
				}else{
					_NewObj.alias_name = elment.column_name;
				}
				_NewObj.show_advanced = true;//显示高级计算
				if(elment.data_type == commonData.data_type_set.DATE 
					||elment.data_type == commonData.data_type_set.SUB_DATE
					||elment.data_type == commonData.data_type_set.STRING){//只能计数，去重复计数
					_NewObj.general_calculation_list = commonData.field_level1_general_calculation;
					_NewObj.show_more = false;
					var select_calculation_value = "count";
					_NewObj.select_calculation = {level:"normal",
							value:select_calculation_value,
							name:_this.findCalculationName(select_calculation_value)};
				}else{
					_NewObj.general_calculation_list = commonData.field_level2_general_calculation;
					_NewObj.more_calculation_list = commonData.field_calculation_more;
					_NewObj.show_more = true;
					var select_calculation_value = "sum";
					_NewObj.select_calculation = {level:"normal",
							value:select_calculation_value,
							name:_this.findCalculationName(select_calculation_value)};
					
				}
				
				
				_NewObj.field_method = commonData.field_method;
				_NewObj.field_sort = commonData.field_sort;
				_NewObj.select_field_method = "";
//				_NewObj.select_field_sort = "";
				_NewObj.unique_id = _this.getUniqueId();	
				_NewObj.formatter = {
						check:"num",
						percent:{digit:0},
						num:{
							millesimal:true,
							digit:0,
							unit:commonData.numeric_format_units[0].name,
							unit_id:commonData.numeric_format_units[0].id,
							unit_value:commonData.numeric_format_units[0].value
						}
				};
				_NewObj.drag = true;
				//着色
				this.putColourOn(_NewObj);
//				this.incColorIndex();
				args.push(_NewObj);
			},
			//添加次轴元素
			addY2axis:function(args,elment){
				var _this = this;
				var _NewObj = new Object();
				angular.copy(elment, _NewObj);
				if(elment.data_type == commonData.data_type_set.SUB_DATE){
					_NewObj.alias_name = elment.name+"("+original_name+")";
				}else{
					_NewObj.alias_name = elment.column_name;
				}
				_NewObj.show_advanced = true;//显示高级计算
				if(elment.data_type == commonData.data_type_set.DATE 
					||elment.data_type == commonData.data_type_set.SUB_DATE
					||elment.data_type == commonData.data_type_set.STRING){//只能计数，去重复计数
					_NewObj.general_calculation_list = commonData.field_level1_general_calculation;
					_NewObj.show_more = false;
					var select_calculation_value = "count";
					_NewObj.select_calculation = {level:"normal",
							value:select_calculation_value,
							name:_this.findCalculationName(select_calculation_value)};
				}else{
					_NewObj.general_calculation_list = commonData.field_level2_general_calculation;
					_NewObj.more_calculation_list = commonData.field_calculation_more;
					_NewObj.show_more = true;
					var select_calculation_value = "sum";
					_NewObj.select_calculation = {level:"normal",
							value:select_calculation_value,
							name:_this.findCalculationName(select_calculation_value)};
				}
				_NewObj.field_method = commonData.field_method;
				_NewObj.field_sort = commonData.field_sort;
				_NewObj.select_field_method = "";
//				_NewObj.select_field_sort = "";
				_NewObj.unique_id = _this.getUniqueId();
				_NewObj.formatter = {
						check:"num",
						percent:{digit:0},
						num:{
							millesimal:true,
							digit:0,
							unit:commonData.numeric_format_units[0].name,
							unit_id:commonData.numeric_format_units[0].id,
							unit_value:commonData.numeric_format_units[0].value
						}
				};
				_NewObj.drag = true;
				//着色
				this.putColourOn(_NewObj);
//				this.incColorIndex();
				args.push(_NewObj);
			},
			//给元素着色
			putColourOn:function(obj){
				var _this = this;
				if(!obj.color){//如果没有颜色，给默认颜色
//					var color_wheel  = commonData.color_wheel;
//					var color_index = commonData.color_index;
					obj.color = _this.randomColor();
				}
			},
			//增加颜色索引
			incColorIndex(){
				var color_index = commonData.color_index;
				color_index ++;
				commonData.color_index = color_index;
			},
			//减少元素索引
			decColorIndex(){
				var color_index = commonData.color_index;
				if(color_index > 0){
					color_index --;
					commonData.color_index = color_index;
				}
			},
			findApplyColors:function(id){
				var obj = {};
				var list = commonData.color_wheel;
				if(list){
					for(var i=0;i<list.length;i++){
						var _o = list[i];
						if(id == _o.id){
							obj = _o;
							break;
						}
					}
				}
				return obj;
			},	
			getUniqueId:function(){
				 return this.uuid(16, 32);
			},
			//来自常量的颜色值
			randomColor:function(){
				var random_color = "";
				var colors = [];
				var color_wheel = commonData.color_wheel;
				for(var i = 0;i < color_wheel.length;i++){
					var _colors =  color_wheel[i].colors;
					if(_colors && _colors.length > 0){
						for(var j = 0;j < _colors.length;j++){
							colors.push(_colors[j]);
						}
					}
				}
				if(colors && colors.length > 0){
					var len  = colors.length;
					var randomNum = Math.random()*(len-1);
					var num = Math.floor(randomNum);
					random_color = colors[num];
				}
				return random_color;
			},
			findFieldCondition:function(type,id){
				var condition = {};
				var b =  [];
				if(type == 1){
					b = commonData.field_condition_list1;		
				}else if(type == 2){
					b = commonData.field_condition_list2;	
				}
				for(var i = 0;i < b.length;i++){
					var _obj = b[i];
					if(id == _ojb.id){
						condition = _obj;
						break;
					}					
				}
				return condition;
			},
			getField:function(axisList,unique_id){
				var field = null;
				if(axisList && axisList.length>0){
					for(var i = 0;i< axisList.length;i++){
						if(axisList[i].unique_id == unique_id){
							field = axisList[i];
							break;
						}
					}
				}
				return field;
			},
			uuid:function(len, radix){
				 var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
				 var uuid = [], i;
				 radix = radix || chars.length;
				 if (len) {
				      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
				 } else {
				      var r;
				      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
				      uuid[14] = '4';
				      for (i = 0; i < 36; i++) {
				        if (!uuid[i]) {
				          r = 0 | Math.random()*16;
				          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				        }
				      }
				 }
				 return "u"+uuid.join('');
			},
			compareDate:function(DateOne, DateTwo) {
			  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
			  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf("-") + 1);
			  var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
			  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
			  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf("-") + 1);
			  var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
			  if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
			    return true;
			  } else {
			    return false;
			  }
			},
			isPositiveNum:function(s){
				var re = /^[0-9]*[1-9][0-9]*$/ ;  
				return re.test(s);  
			}

	}
	return commonService;
}]);
//
app.factory('chartService',['$http','$location','commonData', function($http,$location,commonData){
	var chartService  = {
			getChartOption:function(chart_type,structure_obj){
				var option = {};
				structure_obj.guide_formulas = commonData.guide_formulas;
				var theme = structure_obj.theme;
				option.theme = theme;
				if(chart_type == commonData.chart_type_set.LINE){
					chart_line.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.FUNNEL){
					chart_funnel.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.BIAXIAL){
					chart_biaxial.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.T_BAR){
					chart_tbar.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.Z_BAR){
					chart_zbar.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.RADAR){
					chart_radar.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.TABLE){
					chart_table.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.METERING){
					chart_metering.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.D_BAR){
					chart_dbar.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.P_BAR){
					chart_pbar.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.DT_BAR){
					chart_dtbar.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.PDT_BAR){
					chart_pdtbar.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.PIE){
					chart_pie.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.A_LINE){
					chart_aline.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.INDEX){
					chart_index.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.MAP){
					chart_map.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.WORD_CLOUD){
					chart_wordcloud.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.RECTANGLE_TREE){
					chart_rectangletree.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.SANKEY){
					chart_sankey.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.RISING_SUN){
					chart_risingsun.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.SCATTER){
					chart_scatter.init(option,structure_obj);
				}else if(chart_type == commonData.chart_type_set.WATERFALL){
					chart_waterfall.init(option,structure_obj);
				}
				chart_option_event.renderTheme(chart_type,option); 
				return option;
			}	
	};
	return chartService;
}]);


app.directive("commonDroppable", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  	localModel:'=dropTarget',
    	  	overFn:'&overFn',
    	  	outFn:'&outFn'
      },
	  link: function(scope,ele,attrs){  
			//离开容器
			$(ele).droppable({
				accept: "."+scope.localModel,
				out: function (event, ui) {
					var args = new Object();
					args.event = event;
					args.ui = ui;
					scope.outFn({args:args});
				},
				over: function (event, ui) {
					var args = new Object();
					args.event = event;
					args.ui = ui;
					scope.overFn({args:args});
				}
			});
 	  }
	};
});

app.directive("chartArgsDroppable", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  	overFn:'&overFn',
    	  	outFn:'&outFn'
      },
	  link: function(scope,ele,attrs){  
		  
			//离开容器
			$(ele).droppable({
				accept: ".target",
				out: function (event, ui) {
					var args = new Object();
					args.event = event;
					args.ui = ui;
					scope.outFn({args:args});
				},
				over: function (event, ui) {
					var args = new Object();
					args.event = event;
					args.ui = ui;
					scope.overFn({args:args});
				}
			});
 	  }
	};
});

app.directive("dragContainerDroppable", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  	overFn:'&overFn',
    	  	outFn:'&outFn'
      },
	  link: function(scope,ele,attrs){  
		  
			//离开容器
			$(ele).droppable({
				accept: ".filter-item",
				out: function (event, ui) {
					var args = new Object();
					args.event = event;
					args.ui = ui;
					scope.outFn({args:args});
				},
				over: function (event, ui) {
					var args = new Object();
					args.event = event;
					args.ui = ui;
					scope.overFn({args:args});
				}
			});
 	  }
	};
});

//展开收缩动作
app.directive("clickActive", function () {
	return {
	  restrict: 'AE',
      scope: {
			localModel: '=clickActive'//初始值
      },
	  link: function(scope,ele,attrs){  	

            ele.on('click',function(){
            	$(this).toggleClass('active');
            }).on('mouseleave',function(){
            	$(this).removeClass("active");
            });
	  }
	};
});


//展开收缩动作
app.directive("clickActivescroll", function () {
	return {
	  restrict: 'AE',
      scope: {
			localModel: '=clickActive'//初始值
      },
	  link: function(scope,ele,attrs){  	

            ele.on('click',function(){
            	$(this).toggleClass('active');
            	$(ele).find(".MScroll").mCustomScrollbar({
					scrollButtons: {
						enable: false,
						scrollType: "continuous",
						scrollSpeed: 20,
						scrollAmount: 40
					},
					horizontalScroll: false,
				});
            	
            }).on('mouseleave',function(){
            	$(this).removeClass("active");
            });
	  }
	};
});


//展开收缩动作
app.directive("targetActive", function () {
	return {
	  restrict: 'AE',
      scope: {
			localModel: '=targetActive'//初始值
      },
	  link: function(scope,ele,attrs){  	
            ele.on('click',function(){
            	$(this).parent().css("overflow","visible");
            	$(this).toggleClass('active');
            }).on('mouseleave',function(){
            	$(this).parent().css("overflow","hidden");
            	$(this).removeClass("active");
            });
	  }
	};
});

//监听添加次轴，移除次轴动作。更新 div chart-box 的高度
app.directive("changeHight", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  changeHight: '=changeHight'//初始值
      },
	  link: function(scope,ele,attrs){  	
		  scope.$watch('changeHight', function(v) {
			    var OFFSET = 10;//下偏移
			    var $chartwrap = $('.chart-args-wrap');
			    var h = $chartwrap.outerHeight() + parseFloat($chartwrap.css('marginBottom')) + OFFSET;
			    $('.chart-box').css({ top: h });
			    if(myChart){
				    myChart.resize();
			    }
		  });
	  }
	};
});

app.directive("suitHight", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  localModel: '=suitHight'//初始值
      },
	  link: function(scope,ele,attrs){  	
		  scope.$watch('localModel', function(v) {
			  var OFFSET = 10;//下偏移
			  setTimeout(function(){
				  var $chartwrap = $('.chart-args-wrap');
				  var h = $chartwrap.outerHeight() + parseFloat($chartwrap.css('marginBottom')) + OFFSET;
				    $('.chart-box').css({ top: h });
				    if(myChart){
					    myChart.resize();
				    }
			  },400);
		  });
	  }
	};
});


app.directive("addIndexhtml", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  localModel: '=addIndexhtml',
    	  localObj: '=objHtml'//初始值
      },
	  link: function(scope,ele,attrs){  	
		  scope.$watch('localModel', function(v) {
			  $("#chart").html(scope.localObj);
		  });
	  }
	};
});


app.directive("renderMscroll", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  localModel: '=renderMscroll',
      },
	  link: function(scope,ele,attrs){  	
		  scope.$watch('localModel', function(v) {
			  setTimeout(function(){
				  $(ele).mCustomScrollbar({
						scrollButtons: {
							enable: false,
							scrollType: "continuous",
							scrollSpeed: 20,
							scrollAmount: 40
						},
						horizontalScroll: false,
					});
			  },200);

		  });
	  }
	};
});



app.directive("chartTips", function () {
	return {
	  restrict: 'AE',
      scope: {
    	  localModel: '=chartTips'
      },
	  link: function(scope,ele,attrs){  	
		 var item = scope.localModel;
		 $(ele).on('mouseenter',function () {
			 	$('.tool-tip').find("#chart_name").html(item.name);
			 	$('.tool-tip').find("#chart_tip1").html(item.tip1);
			 	$('.tool-tip').find("#chart_tip2").html(item.tip2);
				var top = $(this).offset().top;
				var left = $(this).offset().left;
				$('.tool-tip').show().css({
					top: top - 20,
					left: left + 80
				}).stop(true, false).animate({
					top: top - 20,
					left: left + 50
				})
			});
		 
		 $(ele).on('mouseleave',function () {
				$('.tool-tip').hide()
		 });
	  }
	};
});

app.directive("addTablehtml", function ($timeout) {
	return {
	  restrict: 'AE',
      scope: {
    	  localModel: '=addTablehtml',
    	  localObj: '=objHtml'//初始值
      },
	  link: function(scope,ele,attrs){  	
		  scope.$watch('localModel', function(v) {
			  $("#chart").html(scope.localObj);
				chart_table.initScroll();
				$timeout(chart_table.tableFixed,100);		 
		  });
		  

	  }
	};
});
//颜色选择器
app.directive("spectRum", function () {
	return {
	  restrict: 'AE',
      scope: {
    	    localFn:'&outerFn',
			localModel:'=spectRum'//初始值
      },
	  link: function(scope,ele,attrs){  
	        $(ele).spectrum({
	            color: scope.localModel,
	            showButtons:false,
	            preferredFormat: "hex",
	            containerClassName: 'Mydefine',
	            showInput: true,
	            chooseText: "确定",
	            cancelText: "取消",
	            move: function (color) {	
	            	scope.localFn({args:color});
	            }
	        });
 	  }
	};
});

//颜色选择器 加强版
app.directive("upspectRum", function () {
	return {
	  restrict: 'AE',
      scope: {
    	    localFn:'&outerFn',
			localModel:'=upspectRum',//初始值
			localIndex:'=objIndex'
      },
	  link: function(scope,ele,attrs){  
	        $(ele).spectrum({
	            color: scope.localModel,
	            showButtons:false,
	            preferredFormat: "hex",
	            containerClassName: 'Mydefine',
	            showInput: true,
	            chooseText: "确定",
	            cancelText: "取消",
	            move: function (color) {	
	            	var data = {};
	            	data.color = color;
	            	data.index = scope.localIndex;
	            	scope.localFn({args:data});
	            }
	        });
 	  }
	};
});
//日期选择器
app.directive("zebraDatepicker", function () {
	return {
	  restrict: 'AE',
	  require : "ngModel",
	  link: function(scope,ele,attrs,ctrl){  
	        $(ele).Zebra_DatePicker({
				default_position: 'below',
				offset: [-180, 40],
				days:["周日","周一","周二","周三","周四","周五","周六"],
				months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
				show_select_today:"今天",
				show_clear_date: false,
	        	onSelect:function(dateText,inst){
	        		ctrl.$setViewValue(dateText);
	        	}
	        });
 	  }
	};
});


//切字符串补...
app.filter("cutStr",function(){
    return function(input,len){
        if(!input || input.length <= len ){
        	return input;
        }
        return input.substring(0,len)+"...";
    }
});


app.factory('sessionInjector',function(){
    var sessionInjector = {
        request: function(config){
            return config;
        },
        response: function(response){
            if(response.data){
            	if(typeof response.data == "string" && response.data.indexOf('<!DOCTYPE html>') > -1){
                	window.location = "/login";
                	return;
            	}

            }
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    
    return sessionInjector;
})

app.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('sessionInjector');
}])

app.constant("commonData", {
	"field_icons":{"date":"icon-date","text":"icon-nianfen","number":"icon-qita"},
	date_granularity:[{"id":"year","name":"年","granularity":"year","alias_name":"按年"},
	                  {"id":"quarter","name":"季","granularity":"quarter","alias_name":"按季"},
	                  {"id":"month","name":"月","granularity":"month","alias_name":"按月"},
	                  {"id":"week","name":"周","granularity":"week","alias_name":"按周"},
	                  {"id":"day","name":"日","granularity":"day","alias_name":"按日"},
	                  {"id":"hour","name":"时","granularity":"hour","alias_name":"按时"},
	                  {"id":"minute","name":"分","granularity":"minute","alias_name":"按分"},
	                  {"id":"second","name":"秒","granularity":"second","alias_name":"按秒"}],
	 guide_formulas:[{id:"1",name:"平均值",aggregator:"average"},{id:"2",name:"最小值",aggregator:"min"},{id:"3",name:"最大值",aggregator:"max"}],                  
	 field_method:[{id:"left",name:"左对齐"},{id:"center",name:"居中"},{id:"right",name:"右对齐"}],
	 field_sort:[{id:"",name:"默认"},{id:"asc",name:"升序"},{id:"desc",name:"降序"}],
	 meter_aggregators:[{id:"sum",name:"求和"},{id:"avg",name:"平均值"},{id:"min",name:"最小值"},{id:"max",name:"最大值"}],	 
	 advance_calculation_list:[{id:"1",name:"同比/环比",show:true},
	                           {id:"2",name:"百分比",show:false},
	                           {id:"3",name:"留存率",show:true},
	                           {id:"0",name:"无",show:true}],
	 advance_retention_list:[{id:"1",name:"1日留存"},{id:"3",name:"3日留存"},{id:"5",name:"5日留存"}
	 ,{id:"7",name:"7日留存"},{id:"15",name:"15日留存"},{id:"30",name:"30日留存"}],                          
	 field_level1_general_calculation:[{id:"count",name:"计数"},{id:"count_distinct",name:"去重计数"}],
	 field_level2_general_calculation:[{id:"sum",name:"求和"},{id:"avg",name:"平均值"},{id:"count",name:"计数"},{id:"count_distinct",name:"去重计数"}],
	 field_calculation_more:[{id:"max",name:"最大值"},{id:"min",name:"最小值"},{id:"median",name:"中位数"},{id:"percentile",name:"百分位"}],
	 field_condition_list1:[{id:"0",name:"等于",formula:"x==t"},{id:"1",name:"不等于",formula:"x!=t"},
	                        {id:"2",name:"大于",formula:"x>t"},{id:"3",name:"小于",formula:"x<t"},
	                        {id:"4",name:"大于等于",formula:"x<t"},{id:"5",name:"小于等于",formula:"x<=t"},{id:"6",name:"区间",formula:"x>=a && x<=b"}],
	 field_condition_list2:[{id:"0",name:"等于"},{id:"1",name:"不等于"},
	                	                        {id:"7",name:"包含"},{id:"10",name:"不包含"},{id:"8",name:"开头包含"},{id:"9",name:"结尾包含"}],
	 value_type_list:[{id:"0",name:"固定值"},{id:"1",name:"计算值"}],    
	 top_reverse_list:[{id:"0",name:"前"},{id:"1",name:"后"}],
	 top_type_list:[{id:"items",name:"项目"},{id:"percent",name:"%"}],
	 color_wheel:[
	     {id:"default",name:"默认颜色",colors:["#5c82dd","#a5ca73","#61af82","#f0cc62","#ea9257","#e15e58","#c06ad0","#8159cd","#5258b2","#6bb3ec","#84d2d9"," #c33e6b"]},
	     {id:"shuoguo",name:"硕果累累",colors:["#aa4a46","#db7968","#e56941","#eda255","#c35d67","#d9625e","#d89a78","#a38a70","#b27876","#b1afa1","#92ab83","#94985b"]},
	     {id:"fugu",name:"复古调",colors:["#914176","#b9426c","#ef834a","#cf4b3f","#eb4a7f","#e66976","#ce6482","#a92857","#6589c5","#6f759b","#616fc1","#6256a4"]},
	     {id:"gaodiao",name:"高调红",colors:["#772929","#c70904","#98220e","#c4572f","#e91f1a","#ff5800","#ffb400","#ffd200","#d42965","#ff5e93","#8bb4f7","#2361d7"]},
	     {id:"shangwu",name:"商务蓝",colors:["#0059ce","#095086","#94d7f1","#0086e6","#006593","#2e77d7","#74a4e4","#a2c3ed","#a3a314","#0049a9","#17afb7","#ce0059"]},
	     {id:"shishang",name:"时尚绿",colors:["#69c28f","#405942","#6a8b5b","#77a656","#abbf7e","#557514","#41a774","#4cd964","#51c2c2","#d92332","#707dcc","#6accba"]},
	     {id:"lengse",name:"冷色灰",colors:["#88ada6","#83818e","#808080","#bacac6","#c2ccd0","#bbcdc5","#c0ebd7","#999999","#75664d","#6d6d6d","#50616d","#758a99"]}
		 ],
	tb_row_statistic_method_list:[{name:"行总计",method:"SUM"},{name:"行平均",method:"AVERAGE"}],
	tb_col_statistic_method_list:[{name:"列总计",method:"SUM"},{name:"列平均",method:"AVERAGE"}],
	tb_row_statistic_method:{"":"行总计","SUM":"行总计","AVERAGE":"行平均"},
	tb_col_statistic_method:{"":"列总计","SUM":"列总计","AVERAGE":"列平均"},
	tb_row_statistic_pos_list:[{name:"右侧显示",pos:"right"},{name:"左侧显示",pos:"left"}],
    tb_col_statistic_pos_list:[{name:"底部显示",pos:"bottom"},{name:"顶部显示",pos:"top"}],
    tb_row_statistic_pos:{"":"右侧显示","right":"右侧显示","left":"左侧显示"},
    tb_col_statistic_pos:{"":"底部显示","bottom":"底部显示","top":"顶部显示"},
	data_type_set:{
		DATE:"date",
		SUB_DATE:"sub_date",
		STRING:"string",
		NUM:"num"
	},	 
	color_index:0,//颜色索引值
	chart_type_set:{
		TABLE:'c001',//表格
		INDEX:'c002',//指标卡
		LINE:'c003',//折线图
		Z_BAR:'c004',//簇状柱形图
		D_BAR:'c005',//堆积柱形图	
		T_BAR:'c006',//条形图
		SCATTER:'c007',//散点图
		PIE:'c008',//普通饼图
		FUNNEL:'c009',//漏斗图
		MAP:'c010',//地图（面积）
		WORD_CLOUD:'c011',//词云
		RADAR:'c012',//雷达图
		BIAXIAL:'c013',//双轴图	
		P_BAR:'c014',//百分比堆积柱状图
		METERING:'c015',//计量图
		DT_BAR:'c016',//堆积条形图
		PDT_BAR:'c017',//百分比堆积条形图
		A_LINE:'c018',//面积图
		TEXT:'c100',
		RISING_SUN:'c030',
		WATERFALL:'c031',
		SANKEY:'c032',
		RECTANGLE_TREE:'c033'
	},
	percentile_list:["5","10","25","50","75","90","95"],
	numeric_format_units:[{id:"1",name:"无",value:1},
	                      {id:"2",name:"万",value:10000},
	                      {id:"3",name:"亿",value:100000000},
	                      {id:"4",name:"K",value:1000},
	                      {id:"5",name:"M",value:1000000},
	                      {id:"6",name:"G",value:100000000}],
	tongbi_huangbi_boxs:[
	                                       	{id:"day",contrast:[
	                                       		{id:"1",type:"qoq",name:"环比增长值",cal:"value"},
	                                       		{id:"2",type:"qoq",name:"环比增长率",cal:"rate"},
	                                       		{id:"3",type:"yoy",name:"上周同比值",granularity:"week",cal:"value"},
	                                       		{id:"4",type:"yoy",name:"上周同比率",granularity:"week",cal:"rate"},
	                                       		{id:"5",type:"yoy",name:"上月同比值",granularity:"month",cal:"value"},
	                                       		{id:"6",type:"yoy",name:"上月同比率",granularity:"month",cal:"rate"},
	                                       		{id:"7",type:"yoy",name:"去年同比值",granularity:"year",cal:"value"},
	                                       		{id:"8",type:"yoy",name:"去年同比率",granularity:"year",cal:"rate"}
	                                       	]},
	                                       	{id:"week",contrast:[
	                                       			{id:"1",type:"qoq",name:"环比增长值",cal:"value"},
	                                       			{id:"2",type:"qoq",name:"环比增长率",cal:"rate"},
	                                       			{id:"7",type:"yoy",name:"去年同比值",granularity:"year",cal:"value"},
	                                       			{id:"8",type:"yoy",name:"去年同比率",granularity:"year",cal:"rate"}	
	                                       	]},
	                                       	{id:"month",contrast:[
	                                       			{id:"1",type:"qoq",name:"环比增长值",cal:"value"},
	                                       			{id:"2",type:"qoq",name:"环比增长率",cal:"rate"},
	                                       			{id:"7",type:"yoy",name:"去年同比值",granularity:"year",cal:"value"},
	                                       			{id:"8",type:"yoy",name:"去年同比率",granularity:"year",cal:"rate"}	
	                                       	]},
	                                       	{id:"quarter",contrast:[
	                                       			{id:"1",type:"qoq",name:"环比增长值",cal:"value"},
	                                       			{id:"2",type:"qoq",name:"环比增长率",cal:"rate"},
	                                       			{id:"7",type:"yoy",name:"去年同比值",granularity:"year",cal:"value"},
	                                       			{id:"8",type:"yoy",name:"去年同比率",granularity:"year",cal:"rate"}	
	                                       	]},
	                                       	{id:"year",contrast:[
	                                       			{id:"1",type:"qoq",name:"环比增长值",cal:"value"},
	                                       			{id:"2",type:"qoq",name:"环比增长率",cal:"rate"},
	                                       			{id:"7",type:"yoy",name:"去年同比值",granularity:"year",cal:"value"},
	                                       			{id:"8",type:"yoy",name:"去年同比率",granularity:"year",cal:"rate"}	
	                                       	]}
	                                       ],
	tongbi_huangbi_list:[{id:"day",name:"按日",
		select_date:[{id:"current",name:"今天"},
		             {id:"previous",name:"昨天"},
		             {id:"before",name:"前",name2:"日"}],contrast:[
	                                                   {type:"qoq",name:"环比增长",granularity:""},
	                                                   {type:"yoy",name:"上周同比",granularity:"week"},
	                                                   {type:"yoy",name:"上月同比",granularity:"month"},
	                                                   {type:"yoy",name:"去年同比",granularity:"year"}]},
	                     {id:"week",name:"按周",select_date:[{id:"current",name:"本周"},
	                                  		             {id:"previous",name:"上周"},
	                                		             {id:"before",name:"前",name2:"周"}],contrast:[
		                                                   {type:"qoq",name:"环比增长",granularity:""},
		                                                   {type:"yoy",name:"去年同比",granularity:"year"}]},
	                     {id:"month",name:"按月",select_date:[{id:"current",name:"本月"},
		                                  		             {id:"previous",name:"上月"},
		                                		             {id:"before",name:"前",name2:"月"}],contrast:[
		                                                   {type:"qoq",name:"环比增长",granularity:""},
		                                                   {type:"yoy",name:"去年同比",granularity:"year"}]},
	                     {id:"quarter",name:"按季",select_date:[{id:"current",name:"本季度"},
			                                  		             {id:"previous",name:"上季度"},
			                                		             {id:"before",name:"前",name2:"季"}],contrast:[
		                                                   {type:"qoq",name:"环比增长",granularity:""},
		                                                   {type:"yoy",name:"去年同比",granularity:"year"}]},
	                     {id:"year",name:"按年",select_date:[{id:"current",name:"今年"},
		                                  		             {id:"previous",name:"去年"},
		                                		             {id:"before",name:"前",name2:"年"}],contrast:[{type:"qoq",name:"环比增长",granularity:""}]}],
	yoyQoqType_list:[{id:"value",name:"增长值"},{id:"rate",name:"增长率"}],
	index_format_style_list:[{color:'#c54440',showstyle:true,symbol:'icomoon-arrow-up'},
	                         {color:'#33aa65',showstyle:true,symbol:'icomoon-arrow-down'},
	                         {color:'#a6aaae',showstyle:true,symbol:'icomoon-arrow-equal'},
	                         {color:'#a6aaae',showstyle:false,symbol:''},
	                         {color:'#ef834a',showstyle:false,symbol:''},
	                         {color:'#6689c5',showstyle:false,symbol:''},
	                         {color:'#6f749b',showstyle:false,symbol:''},
	                         {color:'#d9540e',showstyle:false,symbol:''},
	                         {color:'#87ad81',showstyle:false,symbol:''}],             
	index_format_style_list2:[{showstyle:true,symbol:'icomoon-arrow-down'},
	                          {showstyle:true,symbol:'icomoon-arrow-up'},
	                          {showstyle:true,symbol:'icomoon-arrow-equal'},
	                          {showstyle:true,symbol:'icomoon-ok'},
	                          {showstyle:true,symbol:'icomoon-remove'},
	                          {showstyle:true,symbol:'icomoon-attention'}],
	table_format_style_list:[{bgcolor:'#f4d9d7',color:'#aa4a46'},
	                         {bgcolor:'#cce7bc',color:'#4d8d68'},
	                         {bgcolor:'#f9cfb8',color:'#c6532f'},
	                         {bgcolor:'#daeaf6',color:'#6689c5'},
	                         {bgcolor:'#e66976',color:'#fffefe'},
	                         {bgcolor:'#6689c5',color:'#fffefe'},
	                         {bgcolor:'#ef834a',color:'#fffefe'},
	                         {bgcolor:'#87ad81',color:'#fffefe'},
	                         {bgcolor:'#aa4a46',color:'#fffefe'},
	                         {bgcolor:'#6f749b',color:'#fffefe'},
	                         {bgcolor:'#a6aaae',color:'#fffefe'},
	                         {bgcolor:'#c8cbce',color:'#fffefe'}]                         
});