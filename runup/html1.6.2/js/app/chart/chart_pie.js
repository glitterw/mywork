//普通饼图
var chart_pie = {
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.chart_style_type = "1";// 1  饼图   2 环形
			setting_obj.show_axis_entry = false;//默认部分显示 false全部 true
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
			setting_obj.top = {type:"",typeName:"项目",reversed:"",reversedName:"前",enabled:"",value:"20"};//条目对象
		},
		render:function(option,structure_obj){
			var _this =  this;
			var x_axisList = structure_obj.container.x_axisList;//Y轴字段集合
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var xDataColors = structure_obj.container.xDataColors;//Y轴字段集合
			var resultList = structure_obj.result.resultList;//结果集
			var chartSetting = structure_obj.chartSetting;//图形设置
			var colors = this.getColors(xDataColors,x_axisList,y_axisList);
			
			var name_container = new Object();
			name_container.distinguished = [];
			name_container.temp = [];
			
			if(colors && colors.length > 0){
				option.color = colors;
			}
			var title = null;
			var series = [];
			var legend_data = [];
			if(resultList && resultList.length > 0){
				for(var i = 0;i < resultList.length;i++){
					var _name = resultList[i].name;
					if(_name == ""){
						_name = "空白";
					}
					
					_name =  chart_option_event.distinguishedName(name_container,_name);
					legend_data.push(_name);
					resultList[i].name = _name;
					
					if(x_axisList.length == 1 && y_axisList.length == 1){
						resultList[i].formatter = y_axisList[0].formatter;
						resultList[i].unit = y_axisList[0].unit;
					}
					
					if(x_axisList.length == 0 && y_axisList.length >= 1){
						resultList[i].formatter = y_axisList[i].formatter;
						resultList[i].unit = y_axisList[i].unit;
					}
					
				}
				
				var data_obj = _this.getMaxObj(resultList);
				var title_text = chart_option_event.setRepeatName(data_obj.name);
				title = {
						text: title_text,
						subtext: data_obj.percent,
					    x: 'center',
					    y: 'center',
					    textStyle : {
				            color : colors[data_obj.index],
				            fontSize : 35,
				            fontWeight : 'bolder'
				        },
				        subtextStyle : {
				            fontSize : 35
				        }
				};
			}
			option.legend = {					
					orient: 'vertical',
			        x: 'right',
			        data:legend_data
			 };
			
			var sery = new Object();
			sery.type = "pie";
			
			if(chartSetting.chart_style_type == "1"){
				sery.radius = '80%';
			}else if(chartSetting.chart_style_type == "2"){
				sery.radius = ['50%', '70%'];
				option.title = title;				
			}
			sery.data = resultList;
			sery.show_chart_tag = chartSetting.show_chart_tag;
			sery.label = { normal: {}};
			sery.itemStyle =  {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	        };
			series.push(sery);
			option.series = series;
			
			option.tooltip = {
			        trigger: 'item',
			        backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			};
				
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.PIE,option);
//			
//			var tbs = chart_option_event.thousandBitSeparator("10000.20");
//			console.log(tbs);
		},
		getColors:function(xDataColors,x_axisList,y_axisList){
			var colors = [];
			var xlen = x_axisList.length;
			var ylen = y_axisList.length;
			
			if(xlen == 1 && ylen == 1){
				
				for(var i = 0;i < xDataColors.length;i++){
					colors.push(xDataColors[i].color);
				}
				
				
			}else if(xlen == 0 && ylen > 0){
				for(var i = 0;i < y_axisList.length;i++){
					var yfield = y_axisList[i];
					colors.push(yfield.color);
				}
			}
			return colors;
		},
		getMaxObj:function(resultList){
			var _this = this;
			var max_data = null;
			var s_data = [];
			s_data = chartDataClone(resultList);
			var total = 0;
			if(s_data && s_data.length > 0){
				var total = _this.getSum(s_data);
				var max = s_data[0];
				max.index = 0;
			    for (var i=1; i<s_data.length; i++){
			    	var data_value = parseFloat(s_data[i].value);
			    	var max_value = parseFloat(max.value);
			        if(data_value>max_value){
			            max = s_data[i];
			            max.index = i;
			        }
			    }		
			    max_data = max;
			    
			    //计算出百分比
			    var cl = 0;
			    if(max_data.value !=0 && total !=0){
			    	cl = (parseFloat(max_data.value)*100)/total;
			    }
				var rs = cl.toFixed(2);
				max_data.percent = rs+"%";

			}
			return max_data;
		},
		getSum:function(jsondata){
			var sum  = 0;
			var nums = [];
			if(jsondata && jsondata.length > 0){
				for(var i = 0;i < jsondata.length;i++){
					nums.push(parseFloat(jsondata[i].value));
				}
			}
			if(nums && nums.length > 0){
				sum = eval(nums.join("+"));
			}
			return sum;
		}
		
		
};