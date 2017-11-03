//漏斗图
var chart_funnel = {
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.layout_style = 1;//1.水平;2.垂直
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
		},
		//坐标轴 的标题  默认是根据数值第一个字段的名称来获取的
		render:function(option,structure_obj){
			var _this =  this;
			var x_axisList = structure_obj.container.x_axisList;//Y轴字段集合
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var xDataColors = structure_obj.container.xDataColors;//Y轴字段集合
			var resultList = structure_obj.result.yAxis;//y轴 数据
			var chartSetting = structure_obj.chartSetting;//图形设置
			var name_container = new Object();
			name_container.distinguished = [];
			name_container.temp = [];
			
			var series = [];//组装series
			var legend = [];//组装图例
			//字段颜色
			var colors = this.getColors(xDataColors,x_axisList,y_axisList);
			
			if(colors && colors.length > 0){
				option.color = colors;
			}
			//拼装series
			if(resultList && resultList.length > 0){
				for(var i = 0;i < resultList.length;i++){
					var _name = resultList[i].name;
					if(_name == ""){
						_name = "空白";
					}
					_name =  chart_option_event.distinguishedName(name_container,_name);
					resultList[i].name = _name;
					legend.push(_name);
					//一个维度、一个数值
					if(x_axisList.length == 1 && y_axisList.length == 1){
						resultList[i].formatter = y_axisList[0].formatter;
						resultList[i].unit = y_axisList[0].unit;
					}
					//0个维度、多个数值
					if(x_axisList.length == 0 && y_axisList.length >= 1){
						resultList[i].formatter = y_axisList[i].formatter;
						resultList[i].unit = y_axisList[i].unit;
					}
				}
			}
			var seriy = new Object();
			seriy.name= chartSetting.chart_name;
			seriy.type='funnel';
			seriy.width= '75%';
			seriy.gap= 5;
			seriy.data = resultList;
			seriy.show_chart_tag = chartSetting.show_chart_tag;
			seriy.label = { normal: {}};
			series.push(seriy);
			
			option.series = series;
			//图例
			option.legend = {   
					orient: 'vertical',
			        x: 'right',
			        data:legend
			};
			//气泡
			option.tooltip = {
			        trigger: 'item',
			        backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			    };
			//气泡显示格式
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.FUNNEL,option);
		},
		//获取字段颜色
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
		}
};