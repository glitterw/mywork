//矩形树图
var chart_rectangletree = {
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
		},
		//坐标轴 的标题  默认是根据数值第一个字段的名称来获取的
		render:function(option,structure_obj){
			var _this =  this;
			var x_axisList = structure_obj.container.x_axisList;//X轴字段集合
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var xDataColors = structure_obj.container.xDataColors;//x轴字段集合
			var resultList = structure_obj.result.resultList;//y轴 数据
			var chartSetting = structure_obj.chartSetting;//图形设置
		
			var yAxis = [];
			if(y_axisList && y_axisList.length > 0){
				yAxis.push(chart_util.getShowName(y_axisList[0]));
			}
			option.yAxisName = yAxis;
			//父节点去重
			var temp_data = [];
			if(resultList && resultList.length > 0){
				for(var i = 0;i < resultList.length;i++){
					var _data = resultList[i];
					var flag = false;
					for(var j = 0;j<temp_data.length;j++){
						if(temp_data[j].name == _data.name){
							 flag = true;
						}
					}
					if(!flag){
						temp_data.push(_data);
					}
				}
			}	
			resultList = temp_data;
			
			var series = [];//组装series
			//数据处理，增加颜色、格式
			if(resultList && resultList.length > 0){
				for(var i = 0;i < resultList.length;i++){
					var _name = resultList[i].name;
					if(_name == ""){
						_name = "空白";
					}
					resultList[i].name = _name;
					var _color = _this.getColor(xDataColors,_name);
					resultList[i].itemStyle = {normal:{color:_color,borderColor:'#fff'}};
				}
			}
		
			if(y_axisList && y_axisList.length > 0){
				option.visual_extend = new Object();
				option.visual_extend.formatter = y_axisList[0].formatter;
				option.visual_extend.unit = y_axisList[0].unit;
			}

			
			//拼装series
			var seriy = new Object();
			seriy.name= x_axisList[0].column_name;
			seriy.type='treemap';
			seriy.data = resultList;
			seriy.leafDepth = 2;
			//面包屑
			seriy.breadcrumb = {left:0,itemStyle:{normal:{color:'#fff',borderColor:'#0066ff',borderWidth:1,shadowColor:'#fff',textStyle:{color:'#0066ff'}}}};
			seriy.levels = _this.getLevelOption();
			series.push(seriy);
			seriy.show_chart_tag = chartSetting.show_chart_tag;
			option.series = series;
			//气泡  
			option.tooltip = {
			        trigger: 'item',
			        backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			    };
			//气泡显示格式
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.RECTANGLE_TREE,option);
			
		},
		//获取字段颜色
		getColor:function(xDataColors,name){
			var color = "";
			if(xDataColors && xDataColors.length > 0){
				for(var i = 0;i < xDataColors.length;i++){
					var data = xDataColors[i];
					if(name == data.name){
						color = data.color;
						break;
					}
				}
			}
			return color;
		},
		//获取层级option
		getLevelOption:function () {
	        return [
	            {
	                itemStyle: {
	                    normal: {
	                        gapWidth: 1
	                    }
	                }
	            },
	            {
	                itemStyle: {
	                    normal: {
	                        gapWidth: 1
	                    }
	                }
	            },
	            {
	                itemStyle: {
	                    normal: {
	                        gapWidth: 1
	                    }
	                }
	            }
	        ];
	    }
};