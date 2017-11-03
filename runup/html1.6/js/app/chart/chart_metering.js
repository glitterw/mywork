//计量图
var chart_metering = {
		guide_formulas:[],
		default_color:[1,"lightgrey"],
		init:function(option,structure){
			this.guide_formulas = structure.guide_formulas;
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
//			var color_wheel = attribute_obj.color_wheel;
			/*
			 * [{id:"",name:"",formula:"",value:"",color:""}]   
			 */
			setting_obj.format_list = [];//条件格式
			setting_obj.temp_format_list = [];//条件格式 临时容器
			setting_obj.config_title = "";//表盘配置-标题
			setting_obj.config_unit = "";//表盘配置-单位
			setting_obj.target_value = {};//表盘配置-目标值
			setting_obj.temp_target_value = {
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
			setting_obj.config_completion_rate_digit = 0;//表盘配置-完成率小数位数
			//辅助线 
			/*
			 * [{"name":"","type":"2",“fid”:"", "fieldname":"","formula":"",value:""}]   
			 *  type:1.固定值;2.计算值   formula:1.平均值;2.最小值;2.最大值  fieldname 字段名称
			 * */
			setting_obj.guide_list = [];
		},
		render:function(option,structure_obj){
			var _this =  this;
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var y_data = structure_obj.result.y_data;
			var t_data = structure_obj.result.t_data;//目标对象
			var chartSetting = structure_obj.chartSetting;//图形设置
			var colors = this.getColors(y_axisList);
			var format_list = chartSetting.format_list;
			//表盘配置-标题
			var default_name = "";
			if(!chartSetting.config_title){
				if(y_axisList && y_axisList.length > 0){
					default_name = y_axisList[0].column_name;
					chartSetting.config_title = default_name;
				}
			}else{
				default_name = chartSetting.config_title;
			}
			
			var cVal = 0;
			var targetVal = 0;
			var rVal = 0;//最终显示值
			var cId = "";
			var chart_title = "";
			var showVal = 0;
			if(y_data){
				cVal  = parseFloat(y_data.value);
				cId = y_data.id;
				var title_val = chart_option_event.setTooltipFormatterParamsOther(y_axisList[0].formatter,chartSetting.config_unit,cVal);		
				chart_title = title_val;
				var target_value = chartSetting.target_value;
				if(target_value){
					var _rate_digit = target_value.rate_digit;
					if(target_value.value_type == "0"){//固定值
						targetVal = parseFloat(target_value.value);
						targetVal = targetVal.toFixed(_rate_digit);
						rVal = (cVal*100)/targetVal;
					}else if(target_value.value_type == "1"){//计算值
						targetVal = parseFloat(t_data.value);
						targetVal = targetVal.toFixed(_rate_digit);
						rVal = (cVal*100)/targetVal;
					}else{
						targetVal = cVal;		
						rVal = (cVal*100)/targetVal;	
					}
				}else{
					targetVal = cVal;		
					rVal = (cVal*100)/targetVal;	
				}
				
				option.title = {
					text:chart_title,
					
					subtext:default_name,
			        x:'center',
			        y:'top'
				};
				
				var series = [];
				var sery = new Object();
				sery.name = y_data.name;
				sery.type = "gauge";

				sery.splitNumber=1;
				sery.min = 0;
				sery.max = targetVal;
				//sery.markLine = _this.getMarkLineByLine(chartSetting,unique_id);
				
				var axisLine = {};
				var axisLine_lineStyle_color = [];
				axisLine.show = true;
				
				var itemStyle_normal_color = colors[0];//数值字段自带的颜色
				if(format_list && format_list.length > 0){
					var meeting_color = _this.getMeetingColor(format_list,rVal);
					if(meeting_color){
						itemStyle_normal_color = meeting_color;
					}
				}
				var _rVal = rVal/100;
				if(_rVal < 1){
					axisLine_lineStyle_color.push([_rVal.toFixed(2),itemStyle_normal_color]);
					axisLine_lineStyle_color.push(_this.default_color);
				}else{
					axisLine_lineStyle_color.push([_rVal,itemStyle_normal_color]);
				}
				
				if(chartSetting.config_completion_rate_digit < 0){
					chartSetting.config_completion_rate_digit = 0;
				}
				
				var y_axis = y_axisList[0];
				var unique_id = y_axis.unique_id;
				
				sery.rate_digit = chartSetting.config_completion_rate_digit || 0;
				sery.real_val = rVal;
				sery.data = [{value:cVal,real_value:rVal,rate_digit:chartSetting.config_completion_rate_digit || 0}];
				axisLine.lineStyle = {
						color:axisLine_lineStyle_color
				};
				sery.axisLine = axisLine;
				sery.axisLabel = {formatter:'{value} kg'};
				sery.axisTick = {show: false};
				sery.pointer = {length: "52%",width: 18};
				sery.cutom_formatter =  y_axisList[0].formatter;
				
				series.push(sery);
				
				option.series = series;
				
				option.tooltip = {
				        backgroundColor:'#FFFFFF',
				        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
				 };				
				option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.METERING,option);
			}	
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
		getMarkLineByLine:function(chartSetting,unique_id){
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
			markLine.data = data;
			return markLine;
		},
		getMeetingColor:function(format_list,val){
			 var color = "";
			 var x = val;
			 for(var i = 0;i <format_list.length;i++){
				 var data = format_list[i];
				 var formula = data.formula;
				 var value = data.value;
				 var _color = data.color;
				 value = parseFloat(value);
				 var t = value;
				 var a = value;
				 var b= 0;
				 if(data.id == "6"){//区间
					 b = parseFloat(data.value2);
				 } 
				 //满足表达式
				 if(eval(formula)){
					 color = _color;
					 break;
				 }
			 }
			 return color;
		}
		
};