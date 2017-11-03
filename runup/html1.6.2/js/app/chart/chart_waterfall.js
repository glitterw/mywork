var chart_waterfall = {
		guide_formulas:[],
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.cumulative_enabled = true;//默认启用累计值
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
			setting_obj.accumulated_value_name = "";
			setting_obj.axis_title = "";//坐标轴 标题
			setting_obj.axis_title_temp = "";//坐标轴 标题
			setting_obj.axis_unit = "";//坐标轴 单位
			setting_obj.description = "";//图表备注
		},
		render:function(option,structure_obj){
			var _this =  this;
			var x_axisList = structure_obj.container.x_axisList;
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var result_xAxis = structure_obj.result.xAxis;//x轴 数据
			var result_yAxis = structure_obj.result.yAxis;//y轴 数据

			var chartSetting = structure_obj.chartSetting;//图形设置
			
			var name_container = new Object();
			name_container.distinguished = [];
			name_container.temp = [];
			
			var colors = _this.getColors(y_axisList);
			option.xAxis = result_xAxis;
			//option.xAxis.
			
			//设置坐标轴名称
			var default_name = "";
			
			if(chartSetting.axis_title_temp){
				default_name = chartSetting.axis_title_temp;
			}else{
				if(y_axisList && y_axisList.length > 0){
					default_name = y_axisList[0].column_name;
					chartSetting.axis_title = default_name;
				}
				if(chartSetting.axis_title){
					default_name = chartSetting.axis_title;
					if(chartSetting.axis_unit){
						default_name = default_name + "("+chartSetting.axis_unit+")";
					}
				}
			}
			option.yAxis = {
	            type: 'value',
	            name:default_name,
	            nameTextStyle:{color: '#666666'}
	        };
			
			var nums = [];
			var total = 0;
			var auxiliary_nums = [];
			var series = [];
			if(x_axisList && x_axisList.length > 0){
				var  y_axis =  y_axisList[0]; 
				if(result_yAxis && result_yAxis.length > 0){
					for(var i = 0;i < result_yAxis.length;i++){
						var _data = result_yAxis[i];
						nums.push(_data.value);
						total += _data.value;
					}
				}
				
				auxiliary_nums = _this.getAuxiliaryData(nums);
				if(chartSetting.cumulative_enabled){
					chartSetting.accumulated_value_name = chartSetting.accumulated_value_name || "累计值";
					result_yAxis.push({name:chartSetting.accumulated_value_name,value:total});
					_this.setXAxisData(option);
					auxiliary_nums.push(0);
					
					var _xAxis =  option.xAxis[0];
					var xAxis_data = _xAxis.data;
					xAxis_data.push(chartSetting.accumulated_value_name);
				}
				
				var seriy_data = chart_util.setFormatterAndUnit(y_axis,result_yAxis);
				
				var sery1 = new Object();
				sery1.name = "辅助";
				sery1.type = "bar";
				sery1.stack = "总量";
				sery1.itemStyle = {
	                    normal: {
	                        barBorderColor: 'rgba(0,0,0,0)',
	                        color: 'rgba(0,0,0,0)'
	                    },
	                    emphasis: {
	                        barBorderColor: 'rgba(0,0,0,0)',
	                        color: 'rgba(0,0,0,0)'
	                    }
	                
				};
				sery1.data = auxiliary_nums;
				//sery1.show_chart_tag = chartSetting.show_chart_tag;
				
				var sery2 = new Object();
				sery2.name = chart_util.getShowName(y_axis);
				sery2.type = "bar";
				sery2.stack = "总量";
				sery2.label = {
	                    normal: {
	                        show: true,
	                        position: 'inside'
	                    }
	            };
				sery2.itemStyle =  {
		                normal: {
		                    color:colors[0]
		                }
		         };
				sery2.data = seriy_data;
				sery2.show_chart_tag = chartSetting.show_chart_tag;
				series.push(sery1);
				series.push(sery2);
			}else{
				var  y_axis =  y_axisList[0]; //数值格式，单位取第一个字段的属性
				if(result_yAxis && result_yAxis.length > 0){
					for(var i = 0;i < result_yAxis.length;i++){
						var _data = result_yAxis[i];
						nums.push(_data.value);
						_data.itemStyle = {normal:{color:y_axisList[i].color}};
						total += _data.value;
					}
				}
				auxiliary_nums = _this.getAuxiliaryData(nums);
				if(chartSetting.cumulative_enabled){
					chartSetting.accumulated_value_name = chartSetting.accumulated_value_name || "累计值";
					result_yAxis.push({name:chartSetting.accumulated_value_name,value:total,itemStyle:{normal:{color:y_axisList[y_axisList.length-1].color,opacity:0.7}}});
					_this.setXAxisData(option);
					auxiliary_nums.push(0);
					
					var _xAxis =  option.xAxis[0];
					var xAxis_data = _xAxis.data;
					xAxis_data.push(chartSetting.accumulated_value_name);
				}
				var seriy_data = chart_util.setFormatterAndUnit(y_axis,result_yAxis);
				
				var sery1 = new Object();
				sery1.name = "辅助";
				sery1.type = "bar";
				sery1.stack = "总量";
				sery1.itemStyle = {
	                    normal: {
	                        barBorderColor: 'rgba(0,0,0,0)',
	                        color: 'rgba(0,0,0,0)'
	                    },
	                    emphasis: {
	                        barBorderColor: 'rgba(0,0,0,0)',
	                        color: 'rgba(0,0,0,0)'
	                    }
	                
				};
				sery1.data = auxiliary_nums;
				
				var sery2 = new Object();
				sery2.name = "数量";
				sery2.type = "bar";
				sery2.stack = "总量";
				sery2.label = {
	                    normal: {
	                        show: true,
	                        position: 'inside'
	                    }
	            };
				sery2.data = seriy_data;
				sery2.show_chart_tag = chartSetting.show_chart_tag;
				series.push(sery1);
				series.push(sery2);
			}
			
			//图形边距
//			option.grid = {
//					x:200
//			};
			
			option.series = series;
			//气泡
			option.tooltip = {
		        trigger: 'axis',
		        backgroundColor:'#FFFFFF',
		        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
		    };
			//数值显示格式
			option.y_axisLabelFormatterType = chart_util.axisLabelFormatterType(y_axisList);
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.WATERFALL,option);
		},
		//获取字段选取的颜色
		getColors:function(y_axisList){
			var colors = [];
			if(y_axisList){
				for(var i = 0; i< y_axisList.length;i++){
					var yfield = y_axisList[i];
					colors.push(yfield.color);
				}
			}
			return colors;
		},
		setXAxisData:function(option){
			var xAxis = option.xAxis;
			var data = xAxis[0];
			if(data && data.length > 0){
				data.push("总计");
			}
		},
		getAuxiliaryData:function(nums){
			var b = new Array(nums.length);
			for( var i = (nums.length-1) ; i > 0;i--){
				if(i == (nums.length-1)){
					b[i] = 0;
				}
				b[i-1] = b[i] + nums[i];
			}
			return b;
		}
};