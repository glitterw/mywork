var chart_scatter = {
		guide_formulas:[],
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.axis_title = "";//x坐标轴 标题
			setting_obj.axis_title_temp = "";//坐标轴 标题
			setting_obj.axis_unit = "";//坐标轴 单位
			//y轴
			setting_obj.axis2_title = "";//坐标轴 标题
			setting_obj.axis2_title_temp = "";
			setting_obj.axis2_unit = "";//坐标轴 单位
			setting_obj.axis2_max_enabled = true;//坐标轴 最大值自动功能 false 不启用  true  启用
			setting_obj.axis2_max_value = 0;//坐标轴 最大值
			setting_obj.axis2_min_enabled = true;//坐标轴 最小值自动功能false 不启用  true  启用
			setting_obj.axis2_min_value = 0;//坐标轴 最小值
			setting_obj.description = "";//图表备注
			
			//横向辅助线
			setting_obj.x_guide_list = [];
			setting_obj.x_temp_guide_list = [];
			//纵向辅助线
			setting_obj.y_guide_list = [];
			setting_obj.y_temp_guide_list = [];
		},
		render:function(option,structure_obj){
			var _this =  this;
			var x_axisList = structure_obj.container.x_axisList;//x轴字段集合
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var xDataColors = structure_obj.container.xDataColors;
			var chartSetting = structure_obj.chartSetting;//图形设置
			var resultList = structure_obj.result.resultList;
			
			
			option.backgroundColor = "#fff";
			//设置x坐标轴名称
			var default_name2 = "";
			var default_name1 = "";
			if(chartSetting.axis_title_temp){
				default_name1 = chartSetting.axis_title_temp;
			}else{
				if(y_axisList && y_axisList.length > 0){
					default_name1 = y_axisList[0].column_name;
					chartSetting.axis_title = default_name1;
				}
				if(chartSetting.axis_title){
					default_name1 = chartSetting.axis_title;
					if(chartSetting.axis_unit){
						default_name1 = default_name1 + "("+chartSetting.axis_unit+")";
					}
				}
			}
			
			
			//设置y坐标轴名称
			if(chartSetting.axis2_title_temp){
				default_name2 = chartSetting.axis2_title_temp;
			}else{
				if(y_axisList && y_axisList.length > 1){
					default_name2 = y_axisList[1].column_name;
					chartSetting.axis2_title = default_name2;
				}else{
					chartSetting.axis2_title = "";
				}
				if(chartSetting.axis2_title){
					default_name2 = chartSetting.axis2_title;
					if(chartSetting.axis2_unit){
						default_name2 = default_name2 + "("+chartSetting.axis2_unit+")";
					}
				}
			}
			
			var _xAxis = new Object();
			_xAxis.name = default_name1;
		//	_xAxis.nameLocation = "top";
			_xAxis.nameTextStyle = {color:'#333'};
			_xAxis.splitLine = {
					 show:true,//是否显示刻度线
		                lineStyle: {
		                    type: 'dashed'
		                }
			};
			_xAxis.axisLine = {
			        show:true,//是否显示轴线
	                lineStyle:{//坐标轴线的颜色定义
	                    color:'#ccc',
	                }
			};
			_xAxis.axisTick = {show:true};
			_xAxis.axisLabel = {
					  show:true,
		              textStyle: {
		                    color:'#333'
		              }
			};
			
			option.xAxis = _xAxis;
			
			var _yAxis = new Object();
			_yAxis.name = default_name2;
			//_yAxis.nameLocation = "right";
			_yAxis.nameTextStyle = {color:'#333'};
			//_yAxis.nameRotate = 90;
			_yAxis.splitLine = {
	                show:true,//是否显示刻度线
	                lineStyle: {
	                    type: 'dashed'
	                }
			};
			_yAxis.scale = true;
			_yAxis.axisLine = {
					 show:true,//是否显示轴线
		             lineStyle:{//坐标轴线的颜色定义
		                    color:'#ccc',
		             }
			};
			
			_yAxis.axisTick = {
					show:true
			};
			
			_yAxis.axisLabel = {
					show:true,
	                textStyle: {
	                    color:'#333'
	                }
			};
			
			//检查是否设置最大值，最小值
			if(!chartSetting.axis2_max_enabled){
				_yAxis.max = chartSetting.axis2_max_value;
			}
			if(!chartSetting.axis2_min_enabled){
				_yAxis.min = chartSetting.axis2_min_value;
			}
			
			option.yAxis = _yAxis;
			var series = [];
			
			if(x_axisList && x_axisList.length > 0){
				var _data = resultList.data;
				var _names = resultList.names;
				
				for(var key in _data){
					var _color = _this.getColor(xDataColors,key);
					var datas = _data[key];
					var news_datas = [];
					if(datas && datas.length > 0){
						for(var i = 0 ; i < datas.length;i++){
							var d_obj = new Object();
							d_obj.name = _names;
							d_obj.value = datas[i];
							d_obj.formatters = [y_axisList[0].formatter,y_axisList[1].formatter];
							d_obj.units = [y_axisList[0].unit,y_axisList[1].unit];
							d_obj.show_name = "1";
							news_datas.push(d_obj);
						}
					}
					
					var sery  = {
						name:key,
						data:news_datas,
						type:"scatter",
			            label: {
			                emphasis: {
			                    show: false
			                }
			            },
			            itemStyle: {
			                normal: {
			                    shadowBlur: 10,
			                    shadowColor: _color,
			                    shadowOffsetY: 5,
			                    color:_color
			                }
			            }
					};
					sery.markLine = _this.getMarkLineByLine(chartSetting,key);
					series.push(sery);
				}
			}else{
				var datas = resultList;
				var news_datas = [];
				if(datas && datas.length > 0){
					for(var i = 0 ; i < datas.length;i++){
						var d_obj = new Object();
						d_obj.name = [y_axisList[0].alias_name,y_axisList[1].alias_name];
						d_obj.value = datas[i];
						d_obj.formatters = [y_axisList[0].formatter,y_axisList[1].formatter];
						d_obj.units = [y_axisList[0].unit,y_axisList[1].unit];
						d_obj.show_name = "";
						news_datas.push(d_obj);
					}
				}
				
				var color_data = xDataColors[0];
				var sery  = {
						name:"",
						data:news_datas,
						type:"scatter",
			            label: {
			                emphasis: {
			                    show: false
			                }
			            },
			            itemStyle: {
			                normal: {
			                    shadowBlur: 10,
			                    shadowColor:color_data.color || "",
			                    shadowOffsetY: 5,
			                    color:color_data.color || ""
			                }
			            }
					};
					sery.markLine = _this.getMarkLineByLine(chartSetting);
					series.push(sery);
			}
			option.series = series;
			option.tooltip = {
			        trigger: 'item',
			        backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			};
			
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.SCATTER,option);
		},
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
		getMarkLineByLine:function(chartSetting,name){
			var _this = this;
			var markLine = {};
			var data = [];
			var x_guide_list  = chartSetting.x_guide_list;
			var y_guide_list  = chartSetting.y_guide_list;
			if(x_guide_list){
				for(var i = 0;i < x_guide_list.length;i++){
					var _guide = x_guide_list[i];
					if(name){
						var _data = {type:_guide.aggregator,name:_guide.guide_name+"("+name+")",valueDim:'y'};
						data.push(_data);
					}else{
						var _data = {type:_guide.aggregator,name:_guide.guide_name,valueDim:'y'};
						data.push(_data);
					}

				}
			}
			if(y_guide_list){
				for(var i = 0;i < y_guide_list.length;i++){
					var _guide = y_guide_list[i];
					if(name){
						var _data = {type:_guide.aggregator,name:_guide.guide_name+"("+name+")",valueDim:'x'};
						data.push(_data);
					}else{
						var _data = {type:_guide.aggregator,name:_guide.guide_name,valueDim:'x'};
						data.push(_data);
					}

				}
			}
			markLine.symbol =  ['arrow','none'];
			markLine.data = data;
			return markLine;
		}
};