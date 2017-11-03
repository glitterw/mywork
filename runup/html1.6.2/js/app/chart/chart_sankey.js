var chart_sankey = {
		init:function(option,structure){
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
		},		
		render:function(option,structure_obj){
			var _this = this;
			var nodes = structure_obj.result.nodes;
			var lines = structure_obj.result.lines;
			var length = lines.length;
			var xDataColors = structure_obj.container.xDataColors;
			var tooltip = {
				trigger: 'item',
		        triggerOn: 'mousemove'
			}
			option.tooltip = tooltip;
			var series = [];
			var seriesObject = new Object();
			seriesObject.type = 'sankey';
			seriesObject.layout = 'none';
			if(nodes && nodes.length > 0){
				for(var i =0 ;i < nodes.length;i++){
					var node = nodes[i];
					var name = node.name;
					var names = name.split("@@");
					var color = _this.getColor(xDataColors, names[1]);
					node.itemStyle = {normal:{color:color}};
					node.name = name.replace("@@","-");
				}
			}
			
			seriesObject.data = nodes;
			seriesObject.links = lines;
			var t_color  = chart_option_event.checkThemeColor(option);
			var normal = {
                borderWidth: 1,
                borderColor: '#aaa'
            }
			seriesObject.itemStyle = {
				normal: {
                    borderWidth: 1,
                    borderColor: '#aaa'
                }
			};
			seriesObject.label = {
					normal:{
						show:true,
						textStyle:{
							color:t_color
						}
					}
			};
			
			seriesObject.lineStyle = {
				normal: {
					color: 'source',
                    curveness: 0.5
                }
			};
			option.series = seriesObject;
			//气泡  
			option.tooltip = {
			        trigger: 'item',
			        backgroundColor:'#FFFFFF',
			        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
			};
			//气泡显示格式
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.SANKEY,option);
			
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
}