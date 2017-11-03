//柱状图
var chart_zbar = {
		guide_formulas:[],
		init:function(option,structure){
			this.guide_formulas = structure.guide_formulas;
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
			setting_obj.axis_title = "";//坐标轴 标题
			setting_obj.axis_title_temp = "";
			setting_obj.axis_unit = "";//坐标轴 单位
			setting_obj.axis_max_enabled = true;//坐标轴 最大值自动功能 false 不启用  true  启用
			setting_obj.axis_max_value = 0;//坐标轴 最大值
			setting_obj.axis_min_enabled = true;//坐标轴 最小值自动功能false 不启用  true  启用
			setting_obj.axis_min_value = 0;//坐标轴 最小值
			setting_obj.guide_list = [];
			setting_obj.show_chart_shortaxis_start = 0;
			setting_obj.show_chart_shortaxis_end = 100;
			setting_obj.axis_show_number_enabled = false;//显示条目数
			setting_obj.description = "";//图表备注
			setting_obj.top = {type:"",typeName:"项目",reversed:"",reversedName:"前",enabled:"",value:"20"};//条目对象
		},
		//坐标轴 的标题  默认是根据数值第一个字段的名称来获取的
		render:function(option,structure_obj){
			var _this =  this;
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var result_xAxis = structure_obj.result.xAxis;//x轴 数据
			var result_yAxis = structure_obj.result.yAxis;//y轴 数据

			var chartSetting = structure_obj.chartSetting;//图形设置
			
			var name_container = new Object();
			name_container.distinguished = [];
			name_container.temp = [];
			
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
			//检查是否有维度
			if(result_xAxis && result_xAxis.length > 0){
				option.xAxis = result_xAxis;
			}else{
				var xAxis_data = [];
				var obj_xAxis = new Object();
				if(result_yAxis && result_yAxis.length>0){
					obj_xAxis.type = "category";
					for(var i = 0; i<result_yAxis.length;i++){
						var data = result_yAxis[i];
						if(data_name == ""){
							data_name = "空白";
						}
						xAxis_data.push(data.name);
					}
					obj_xAxis.data = xAxis_data;
				}
				option.xAxis = obj_xAxis;
			}
			//y轴属性
			var _yAxis = [];
			var obj_yAxis = new Object();
			obj_yAxis.type = "value";
			if(default_name){
				obj_yAxis.name = default_name;
				obj_yAxis.nameTextStyle = {
						color: '#666666'
				};
			}
			//检查是否设置最大值，最小值
			if(!chartSetting.axis_max_enabled){
				obj_yAxis.max = chartSetting.axis_max_value;
			}
			if(!chartSetting.axis_min_enabled){
				obj_yAxis.min = chartSetting.axis_min_value;
			}
			_yAxis.push(obj_yAxis);
			option.yAxis = _yAxis;
			//组装series
			var series = [];
			var legend_data = [];
			//颜色
			var colors = _this.getColors(y_axisList);
			//检查是否有维度
			if(result_xAxis && result_xAxis.length > 0){
				if(result_yAxis && result_yAxis.length>0){
					for(var i = 0; i<result_yAxis.length;i++){
						var y_axis = y_axisList[i];
						var unique_id = y_axis.unique_id;
						var _data = result_yAxis[i];
						var seriy = new Object();
						var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
						//序列名称
						var data_name = chart_option_event.distinguishedName(name_container,_data.name);
						if(data_name == ""){
							data_name = "空白";
						}
						
						seriy.name = data_name;
						seriy.type ='bar';
						seriy.data = seriy_data;
						seriy.show_chart_tag = chartSetting.show_chart_tag;
						seriy.custom_formatter = y_axis.formatter;
						//辅助线
						seriy.markLine = _this.getMarkLineByLine(_data.data.length,chartSetting,unique_id);
						seriy.itemStyle = {normal: {color:colors[i]}};
						series.push(seriy);
						legend_data.push(data_name);
					}
				}
			}else{
				if(result_yAxis && result_yAxis.length>0){
					var seriy = new Object();
					seriy.type = 'bar';
					var seriy_name = [];
					var seriy_datas = [];
					var markLines = {};
					var markLines_data = [];
					for(var i = 0; i<result_yAxis.length;i++){
						var seriy_obj = new Object();
						var y_axis = y_axisList[i];
						var unique_id = y_axis.unique_id;
						var _data = result_yAxis[i];
						var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
						//序列名称
						var data_name = chart_option_event.distinguishedName(name_container,_data.name);
						if(data_name == ""){
							data_name = "空白";
						}
						
						seriy_obj.value = _data.data[0].value;
						seriy_obj.itemStyle = {normal: {color:colors[i]}};
						seriy_datas.push(seriy_obj);
						seriy_name.push(data_name);
						legend_data.push(data_name);
						//辅助线
						var markLine = _this.getMarkLineByLine(_data.data.length,chartSetting,unique_id);
						if(markLine.data.length > 0){
							markLine.data[0].lineStyle = {normal:{color:colors[i]}};
							if(i == 0){
								markLines.data = markLine.data;
							}else{
								markLines.data.push(markLine.data[0]);
							}
						}
					}
				
					seriy.name = seriy_name;
					seriy.data = seriy_datas;
					seriy.markLine = markLines;
					seriy.show_chart_tag = chartSetting.show_chart_tag;
					seriy.itemStyle ={normal: {color:colors}};
					series.push(seriy);
				}
			}
			
			option.series = series;
			//图例
			option.legend = {
				orient:'horizontal',
				data:legend_data
			};
			//气泡
			option.tooltip = {
		        trigger: 'axis',
		        backgroundColor:'#FFFFFF',
		        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
		    };
			//数值显示格式
			option.y_axisLabelFormatterType = chart_util.axisLabelFormatterType(y_axisList);
			//气泡显示格式
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.Z_BAR,option);
		},
		//生成辅助线
		getMarkLineByLine:function(data_len,chartSetting,unique_id){
			var _this = this;
			var markLine = {};
			var data = [];
			var guide_list  = chartSetting.guide_list;
			if(guide_list){
				for(var i = 0;i < guide_list.length;i++){
					var _guide = guide_list[i];
					if(_guide.unique_id == unique_id){
						var _data = new Object();
						if(_guide.type =="0"){
							_data = {name: _guide.guide_name,yAxis: _guide.value};	
						}else if(_guide.type =="1"){
							_data = {type:_guide.aggregator,name:_guide.guide_name};
						}
						data.push(_data);
					}
				}
			}
			markLine.symbol =  ['arrow','none'];
			markLine.itemStyle = {
                normal: {
                    label:{
                        position:'left'
                    }
                }
            };
			markLine.data = data;
			return markLine;
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