//地图
var chart_map = {
		guide_formulas:[],
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
			setting_obj.axis_show_number_enabled = false;//显示条目数
			setting_obj.description = "";//图表备注
		},
		render:function(option,structure_obj){
			var _this =  this;
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var result_yAxis = structure_obj.result.yAxis;//y轴 数据

			var chartSetting = structure_obj.chartSetting;//图形设置
			//组装series
			var series = [];
			//series data元素值
			var max = 0;
			var color = _this.getColors(y_axisList);
			if(result_yAxis && result_yAxis.length>0){
				var seriy = new Object();
				seriy.name= result_yAxis[0].name;
				seriy.type= 'map';
				seriy.mapType= 'china';
				seriy.roam= false;
				
				var _data = result_yAxis[0];
				//城市数据转换为省份数据
				var new_data = [];
				for(var i = 0;i<_data.data.length;i++){
					var _name = _data.data[i].name;
					var _value = _data.data[i].value;
					var province_name = _this.getArea(_name);
					if(province_name){
						var province = new Object();
						province.name = province_name; 
						province.value = _value;
						new_data.push(province);
					}
				}
				//相同省份数据合并
				for(var i = 0;i<new_data.length;i++){
					for(var j = i+1;j<new_data.length;j++){
						if(new_data[i].name == new_data[j].name){
							new_data[i].value = parseInt(new_data[i].value) + parseInt(new_data[j].value);
							new_data.splice(j,1);
							--j;
						}
					}
				}
				//省份数据赋值
				for(var i = 0;i<province_data.length;i++){
					for(var j = 0;j<new_data.length;j++){
						if(province_data[i].name == new_data[j].name){
							province_data[i].value = new_data[j].value;
							province_data[i].formatter = y_axisList[0].formatter;
							province_data[i].unit = y_axisList[0].unit;
							province_data[i].color = color;
						}
					}
				}
				seriy.data = province_data;
				//最大值
				for(var j = 0;j<_data.data.length;j++){
					if(parseInt(_data.data[j].value) > max){
						max = _data.data[j].value;
					}
				}
				seriy.show_chart_tag = chartSetting.show_chart_tag;
				seriy.custom_formatter = y_axisList[0].formatter;

				series.push(seriy);
			}

			option.series = series;
			//视觉地图
			option.visualMap = {
					min: 0,
			        max: max,
			        left: 'left',
			        orient:'horizontal',
			        color: [color,'#abcbf4'],
			        top: 'bottom',
			        text: ['高','低'],           // 文本，默认为数值文本
			        calculable: true
			};
			//气泡
			option.tooltip = {
					trigger: 'item',
					backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			};
			//数值显示格式
			option.y_axisLabelFormatterType = chart_util.axisLabelFormatterType(y_axisList);
			//气泡显示格式
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.MAP,option);
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
		getArea:function(name){
			var the_name = "";
			name = name.replace("省","").replace("市","");
			//省
			for(var i = 0;i < province_data.length;i++){
				if(province_data[i].name == name){
					the_name = name;
					break;
				}
			}
			
			//市 （从市查询归属省）
			if(!the_name){
				for(var i = 0;i<province_city.length;i++){
					if(province_city[i].city == name){
						the_name = province_city[i].province
						break;
					}
				}
			}
			
			return the_name;
		}
};

