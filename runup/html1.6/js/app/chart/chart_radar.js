//雷达图
var chart_radar = {
		guide_formulas:[],
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
			setting_obj.axis_show_number_enabled = false;//显示条目数
			setting_obj.description = "";//图表备注
			setting_obj.top = {type:"",typeName:"项目",reversed:"",reversedName:"前",enabled:"",value:"20"};//条目对象
		},
		render:function(option,structure_obj){
			var _this =  this;
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var result_xAxis = structure_obj.result.xAxis;//x轴 数据
			var result_yAxis = structure_obj.result.yAxis;//y轴 数据
			var chartSetting = structure_obj.chartSetting;//图形设置
			
			var name_container = new Object();
			name_container.distinguished = [];
			name_container.temp = [];
			var series = [];//组装series
			var seriy_data = [];//series data元素值
			var legend_data = [];//图例
			var indicator_name = [];//雷达指标名称
			var max = 0;
			var seriy_name = "";
			
			if(result_yAxis && result_yAxis.length>0){
				var seriy = new Object();
				seriy.type='radar';

				for(var i = 0; i<result_yAxis.length;i++){
					var y_axis = y_axisList[i];
					var seriy_data_value = [];//series 值,一个y轴数值名称对应一套value值
					var seriy_data_name = [];
					var seriyObject = new Object();//一套y轴数据对应一个data对象值
					var _data = result_yAxis[i];			
					var data_name = chart_option_event.distinguishedName(name_container,_data.name);
					//组装序列数据及指标名称
					for(var j = 0;j<_data.data.length;j++){
						var indicator = new Object();
						//多套y轴数据共用一套雷达指标
						if(i==0){
							indicator.name = _data.data[j].name;
							indicator_name.push(indicator);
						}
						//指标max
						if(parseInt(_data.data[j].value) > max){
							max = _data.data[j].value;
						}
						seriy_data_name.push(_data.data[j].name);
						seriy_data_value.push(_data.data[j].value);
					}
					seriyObject.seriesName = seriy_data_name;
					seriyObject.name = data_name;
					seriyObject.value = seriy_data_value;
					seriyObject.formatter =  y_axis.formatter; 
					seriyObject.unit =  y_axis.unit;
					seriy_data.push(seriyObject);
					legend_data.push(data_name);
					seriy_name = seriy_name+result_yAxis[i].name+"-";
				}
				seriy.name= seriy_name;
				seriy.data = seriy_data;
				seriy.show_chart_tag = chartSetting.show_chart_tag;
				series.push(seriy);
			}
			
			option.series = series;
			//填充指标max
			for(var i=0;i<indicator_name.length;i++){
				indicator_name[i].max = max;
			}
			//雷达图指标
			option.radar = {
				indicator:indicator_name
			};
			//图例
			option.legend = {
				x:'right',
				orient:'vertical',
				data:legend_data
			};
			//字段颜色
			option.color = _this.getColors(y_axisList);
			//气泡
			option.tooltip = {
					backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			};
			//气泡显示格式
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.RADAR,option);
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
		}
};

