var chart_risingsun = {
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.chart_style_type = "1";// 1  文字
			setting_obj.show_axis_entry = false;//默认部分显示 false全部 true
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
			setting_obj.top = {type:"",typeName:"项目",reversed:"",reversedName:"前",enabled:"",value:"20"};//条目对象
		},
		render:function(option,structure_obj){
			var _this =  this;
			var x_axisList = structure_obj.container.x_axisList;//x轴字段集合
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var xDataColors = structure_obj.container.xDataColors;
			var chartSetting = structure_obj.chartSetting;//图形设置
			var resultList = structure_obj.result.resultList;
			var xLen =  x_axisList.length;
			
			var series = [];
			var handleList = [];
			if(resultList && resultList.length > 0){
				for(var i = 0;i<resultList.length;i++){
					var result = resultList[i];
					var unique_id = result.unique_id;
					var _data = result.data;
					var _list = [];
					for(var key in _data){
						var obj = new Object();
						obj.name = key;
						obj.value = _data[key];
						var _name = key.split("@@")[0];
						var _color = _this.getColor(xDataColors,_name);
						if(i!=0){
							var ratio =  (1-i/xLen*1.0);
							ratio = ratio.toFixed(2);
							obj.itemStyle = {normal:{color:_color,borderColor:'#fff',opacity:ratio}};
						}else{
							obj.itemStyle = {normal:{color:_color,borderColor:'#fff'}};
						}
						obj.formatter = y_axisList[0].formatter;
						obj.unit = y_axisList[0].unit;
						obj.alias_name = chart_util.getShowName(y_axisList[0]);
						obj.chart_style_type = chartSetting.chart_style_type;
						_list.push(obj);
					}
					handleList.push(_list);
				}
			}
			
			if(handleList && handleList.length > 0){
				var handleList_len = handleList.length;
				var start_size = 60;
				var end_size = 280;
				var max_size = end_size/0.8;
				
				var difference = end_size - start_size;
				var equal_division = difference/handleList_len*1.0
				equal_division = equal_division.toFixed(0);
				for(var i = 0 ;i < handleList.length;i++){
					var sery = new Object();
					sery.name = "";
					sery.type = "pie";
					if(i==0){
						var scale = start_size + (i+1)*equal_division;
						sery.radius = [(start_size/max_size*1.0).toFixed(1)*100 +'%',(scale/max_size*1.0).toFixed(1)*100+'%'];
						console.log(sery.radius);
					}else if(i == handleList_len-1){
						var scale = start_size + (i)*equal_division;
						sery.radius = [(scale/max_size*1.0).toFixed(1)*100 +'%',(end_size/max_size*1.0).toFixed(1)*100+'%'];
					}else{
						var scale1 = start_size + i*equal_division;
						var scale2 = start_size + (i+1)*equal_division;
						sery.radius = [(scale1/max_size*1.0).toFixed(1)*100+'%',(scale2/max_size*1.0).toFixed(1)*100+'%'];
					}
					sery.center = ['50%', '55%'];
					sery.zlevel = i;
					sery.label =  {
		                    normal: {
		                        position: 'inner'
		                    }
		                };
					sery.labelLine = {
		                   normal: {
		                	   show: false
		                   }
					};
					
					sery.show_chart_tag = chartSetting.show_chart_tag;
					sery.chart_type = chart_option_event.chart_type_set.RISING_SUN;
					sery.data = handleList[i];
					series.push(sery);
				}
			}
			//console.log(series);
			option.tooltip = {
			        trigger: 'item',
			        backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			};
			option.series = series;
			
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.RISING_SUN,option);
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
		}
};