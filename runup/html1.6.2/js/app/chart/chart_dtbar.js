//堆积条形图
var chart_dtbar = {
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
			option.yAxis = result_xAxis;
			
			//x轴属性
			var _xAxis = [];
			var obj_xAxis = new Object();
			obj_xAxis.type = "value";
			if(default_name){
				obj_xAxis.name = default_name;
				obj_xAxis.nameTextStyle = {
						color: '#666666'
				};
			}
			//x轴数据
			var _yAxis_data = [];
			if(result_yAxis && result_yAxis.length>0){
				for(var i = 0; i<result_yAxis.length;i++){
					var _data = result_yAxis[i];
					_yAxis_data.push(_data.name);
				}
			}
			//检查是否设置最大值，最小值
			if(!chartSetting.axis_max_enabled){
				obj_xAxis.max = chartSetting.axis_max_value;
			}
			if(!chartSetting.axis_min_enabled){
				obj_xAxis.min = chartSetting.axis_min_value;
			}
			obj_xAxis.data = _yAxis_data;
			_xAxis.push(obj_xAxis);
			option.xAxis = _xAxis;
			//组装series
			var series = [];
			var legend_data = [];
			//字段颜色
			var colors = _this.getColors(y_axisList);

			if(result_yAxis && result_yAxis.length>0){
				for(var i = 0; i<result_yAxis.length;i++){
					var y_axis = y_axisList[i];
					var unique_id = y_axis.unique_id;
					var _data = result_yAxis[i];
					var seriy = new Object();
					var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
					var data_name = chart_option_event.distinguishedName(name_container,_data.name);
					seriy.name= data_name;
					seriy.type='bar';
					seriy.stack = obj_xAxis.name;
					seriy.data = seriy_data;
					seriy.show_chart_tag = chartSetting.show_chart_tag;
					seriy.custom_formatter = y_axis.formatter;
					seriy.markLine = _this.getMarkLineByLine(_data.data.length,chartSetting,unique_id);
					seriy.itemStyle ={normal: {color:colors[i]}};
					series.push(seriy);
					legend_data.push(data_name);
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
			//图形边距，防止字段名称被覆盖
			option.grid = {
					x:200
			};
			//数值显示格式
			option.x_axisLabelFormatterType = chart_util.axisLabelFormatterType(y_axisList);
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.DT_BAR,option);
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
							_data = {name: _guide.guide_name,xAxis: _guide.value};						
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

