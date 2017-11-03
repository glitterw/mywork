var chart_wordcloud = {
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.wordcloud_num = 100;//默认100
		},		
		render:function(option,structure_obj){
			var _this =  this;
			var x_axisList = structure_obj.container.x_axisList;//Y轴字段集合
			var resultList = structure_obj.result.wordsList;//结果集
			var xDataColors = structure_obj.container.xDataColors;//Y轴字段集合
			var colors = this.getColors(xDataColors,resultList);
			
			if(resultList && resultList.length > 0){
				
				var series = [];
				var seriy = new Object();
				seriy.name = x_axisList[0].alias_name;
				seriy.size= ['80%', '80%'];  
				seriy.type = "wordCloud";
//				seriy.rotationRange = [0, 90];
//				seriy.rotationStep = 90;
				seriy.textRotation = [0, 45, 90, -45];
				seriy.textPadding = 6;
				seriy.autoSize = {
		            enable: true,
		            minSize: 20
		        };
				var data = [];
				for(var i = 0; i < resultList.length;i++){
					var color = colors[i];
					var textStyle = {
	                    normal: {
	                        color: color
	                    }

	                }
					var _data = {name:resultList[i].name,value:resultList[i].value,textStyle:textStyle};
					data.push(_data);
				}
				seriy.data = data;
				
				series.push(seriy);
				option.series = series;
				option.tooltip = {
						trigger: 'item',
				        backgroundColor:'#FFFFFF',
				        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
				};
				
				option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.WORD_CLOUD,option);
			}
		},
		getColors:function(xDataColors,resultList){
			var colors = [];
			if(resultList && resultList.length > 0){
				for(var i = 0;i < resultList.length;i++){
					var name = resultList[i].name;
					for(var j = 0;j < xDataColors.length;j++){
						if(name == xDataColors[i].name){
							colors.push(xDataColors[i].color);
							break;
						}
					}	
					
				}
			}
			

			return colors;
		}
};