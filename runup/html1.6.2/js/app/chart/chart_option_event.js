//图表事件公共绑定js
var chart_option_event = {
		dark_color:"#909199",
		chart_type_set:{
			TABLE:'c001',//表格
			INDEX:'c002',//指标卡
			LINE:'c003',//折线图
			Z_BAR:'c004',//簇状柱形图
			D_BAR:'c005',//堆积柱形图
			T_BAR:'c006',//条形图
			SCATTER:'c007',//散点图
			PIE:'c008',//普通饼图
			FUNNEL:'c009',//漏斗图
			MAP:'c010',//地图（面积）
			WORD_CLOUD:'c011',//词云
			RADAR:'c012',//雷达图
			BIAXIAL:'c013',//双轴图
			P_BAR:'c014',//百分比堆积柱状图
			METERING:'c015',//计量图
			DT_BAR:'c016',//堆积条形图
			PDT_BAR:'c017',//百分比堆积条形图
			A_LINE:'c018',//面积图
			TEXT:'c100',
			RISING_SUN:'c030',
			WATERFALL:'c031',
			SANKEY:'c032',//桑吉图
			RECTANGLE_TREE:'c033'//矩形树图
		},
		chart_type_semantic_set:{
			COMPLAINTS_PATH:'c019',//投诉路径图
			COMPLAINTS_HOT_EVENT:'c020',//投诉热门事件分析图
			COMPLAINTS_DEMAND:'c021',//投诉图谱分析图
			COMPLAINTS_SENTIMENT:'c022',//投诉情绪分析图
			COMPLAINTS_LEADER:'c023',//投诉意见领袖分析图
			COMPLAINTS_SENTIMENT_BIG:'c024'//投诉情绪分析图(大图)
		},
		is_semantic_chart:function(chart_type){
			var _chart_type_semantic_set = this.chart_type_semantic_set;
			for(key in _chart_type_semantic_set){
				var v = _chart_type_semantic_set[key];
				if(v == chart_type){
					return true;
				}
			}
			return false;
		},
		distinguishedName:function(container,name){
			var distinguished = container.distinguished;
			var temp = container.temp;
			var rsName = "";
			if(temp.indexOf(name) > -1){
				for(var i = 0;i < distinguished.length;i++){
					if(distinguished[i].name == name){
						var count = distinguished[i].count;
						count = count + 1;
						distinguished[i].count = count;
						rsName = name + "_repeat_"+ count;
						break;
					}
				}	
			}else{
				temp.push(name);//第一次记录
				var _obj = new Object();
				_obj.name = name;
				_obj.count = 1;
				distinguished.push(_obj);
				rsName = name;
			}
			return rsName;
		},
		scale_format_unit:{
			K:"K",
			K_VALUE:1000,
			M:"M",
			M_VALUE:1000000
		},
		scaleValueConvert:function(value){
			var _this = this;
			var scaleValue = "";
			var _value = parseFloat(value);
			
			if(_value > 0){
				if(_value >= _this.scale_format_unit.M_VALUE){
					scaleValue = (_value/_this.scale_format_unit.M_VALUE) + _this.scale_format_unit.M;
				}else if(_value >= _this.scale_format_unit.K_VALUE){
					scaleValue = (_value/_this.scale_format_unit.K_VALUE) + _this.scale_format_unit.K;
				}else{
					scaleValue = _value;
				}
			}else{
				if(_value <= (_this.scale_format_unit.M_VALUE*-1)){
					scaleValue = (_value/_this.scale_format_unit.M_VALUE) + _this.scale_format_unit.M;
				}else if(_value <= (_this.scale_format_unit.K_VALUE*-1)){
					scaleValue = (_value/_this.scale_format_unit.K_VALUE) + _this.scale_format_unit.K;
				}else{
					scaleValue = _value;
				}
			}

			return scaleValue;
		},
		setRepeatName:function(name){
			var rs = "";
			if(name.indexOf("_repeat_") > -1){
				var temp = name.split("_repeat_");
				rs = temp[0];
			}else{
				rs = name;
			}
			return rs;
		},
		setLegendFormatter:function(option){
			var _this = this;	
			if(option.legend){
				option.legend.formatter = function(name){
					name = _this.setRepeatName(name);
					return name;
				}
				
				//_this.setOptionLegendData(option);
			}

		},
		setCountFormatter:function(val){
			val = val.toFixed(0);
			return this.thousandBitSeparator(val);
		},
		setLabelNormal:function(option,position){
			var _this = this;
			var series = option.series;
			var _position = "top";
			if(position){
				_position = position;
			}
			
			if(series && series.length > 0){
				for(var i = 0;i<series.length;i++){
					var show_chart_tag = series[i].show_chart_tag;
					var chart_type = series[i].chart_type;
					if(chart_type == chart_option_event.chart_type_set.RISING_SUN){
						series[i].label = { 
								normal: {
									position: 'inner',
									show: show_chart_tag,
									formatter:function(params){
										var value = 0;
										var chart_style_type = params.data.chart_style_type;
										if(chart_style_type == "1"){
											var name = params.name;
											var args = name.split("@@");
											value = args[args.length -1];
										}else if(chart_style_type == "2"){
											value = params.percent+"%";
										}
										return value;
									}
						  }};
					}else{
						series[i].label = { 
								normal: {
									position: _position,
									show: show_chart_tag,
									formatter:function(params){
										var value = 0;
										if(params.data.showPercent){
											value = params.data.real_value;
										}else{
											value = params.value;
										}
										if(value == null || value == ""){
											return 0;
										}
										var formatter = params.data.formatter;
										value = chart_option_event.getFormatterValue(formatter,value);
										return value;
									}
								}};
					}
				}
			}
		},
		setMapLabelNormal:function(option,position){
			var _this = this;
			var series = option.series;
			var _position = "top";
			if(position){
				_position = position;
			}
			
			if(series && series.length > 0){
				for(var i = 0;i<series.length;i++){
					var show_chart_tag = series[i].show_chart_tag;
					series[i].label = { 
						normal: {
							position: _position,
							show: true,
							formatter:function(params){
								var value = 0;
								if(params.data.showPercent){
									value = params.data.real_value;
								}else{
									value = params.value;
								}
								if(value == null || value == ""){
									return 0;
								}
								var formatter = params.data.formatter;
								value = chart_option_event.getFormatterValue(formatter,value);
								
								var show_name = params.data.name;
								if(show_chart_tag){
									show_name =  value+"\n"+show_name;
								}
								
								
								return show_name;
							}
						}};
				}
			}
		},
		setLabelNormalMiddle:function(option){
			var _this = this;
			var series = option.series;
			var color = this.checkThemeColor(option);
			
			if(series && series.length > 0){
				for(var i = 0;i<series.length;i++){
					var show_chart_tag = series[i].show_chart_tag;
					series[i].label = { 
						normal: {
							show: show_chart_tag,
							textStyle:{
								color:color
							},
							formatter:function(params){
								var value = 0;
								if(params.data.showPercent){
									value = params.data.real_value;
								}else{
									value = params.value;
								}
								if(value == null || value == ""){
									return 0;
								}
								var formatter = params.data.formatter;
								value = chart_option_event.getFormatterValue(formatter,value);
								return value;
							}
						}};
				}
			}
		},
		setYAxisLabelFormatter:function(option){
			var _this = this;
			var yAxis  = option.yAxis;
			var y_axisLabelFormatterType = option.y_axisLabelFormatterType;
			if(y_axisLabelFormatterType && y_axisLabelFormatterType == "percent"){
				if(yAxis && yAxis.length > 0){
					for(var i = 0;i < yAxis.length;i++){
						yAxis[i].axisLabel = {
								formatter:function(value){
									var _value =  _this.thousandBitSeparator(value)+"%";
									return _value;
								}	
						};
					}
				}
				
			}else{
				//如果 正常数值显示
				if(yAxis && yAxis.length > 0){
					for(var i = 0;i < yAxis.length;i++){
						yAxis[i].axisLabel = {
								formatter:function(value){
									return _this.scaleValueConvert(value);
								}	
						};
					}
				}
			}
		},
		setSpecialYAxisLabelFormatter:function(option){
			var _this = this;
			var yAxis  = option.yAxis;
			if(yAxis && yAxis.length > 0){
				for(var i = 0;i < yAxis.length;i++){
					var show = yAxis[i].show;// 堆积图
					var axisLabelFormatterType = yAxis[i].axisLabelFormatterType;
					if(!show){	
						if(axisLabelFormatterType == "num"){
							yAxis[i].axisLabel = {
									formatter:function(value){
										return _this.scaleValueConvert(value); 
									}	
							};
						}else if(axisLabelFormatterType == "percent"){
							yAxis[i].axisLabel = {
									formatter:function(value){
										return _this.thousandBitSeparator(value)+"%";
									}	
							};
						}
					}

				}
			}
		},
		setXAxisLabelFormatter:function(option){
			var _this = this;
			var xAxis  = option.xAxis;
			var x_axisLabelFormatterType = option.x_axisLabelFormatterType;
			if(x_axisLabelFormatterType && x_axisLabelFormatterType == "percent"){
				if(xAxis && xAxis.length > 0){
					for(var i = 0;i < xAxis.length;i++){
						xAxis[i].axisLabel = {
								formatter:function(value){
									var _value =  _this.thousandBitSeparator(value)+"%";
									return _value;
								}	
						};
					}
				}
				
			}else{
				//如果 正常数值显示
				if(xAxis && xAxis.length > 0){
					for(var i = 0;i < xAxis.length;i++){
						xAxis[i].axisLabel = {
								formatter:function(value){
									return _this.scaleValueConvert(value);
								}	
						};
					}
				}
			}
		},
		setTooltipFormatterParams:function(params){
    		var formatter = params.data.formatter;
			if(!formatter){
				formatter = {
						check:"num",
						percent:{digit:0},
						num:{
							millesimal:true,
							digit:0,
							unit:"无",
							unit_id:"1",
							unit_value:1
						}	
				};
			}
    		var unit = params.data.unit;
    		var _value = params.value;
    		_value = this.getFormatterValue(formatter,_value);
    		if(unit){
    			_value = _value + unit;
    		}
    		return _value;
		},
		setTooltipFormatterParamsOther:function(formatter,unit,value){
			if(!formatter){
				formatter = {
						check:"num",
						percent:{digit:0},
						num:{
							millesimal:true,
							digit:0,
							unit:"无",
							unit_id:"1",
							unit_value:1
						}	
				};
			}
    		var _value = value;
    		_value = this.getFormatterValue(formatter,_value);
    		if(unit){
    			_value = _value + unit;
    		}
    		return _value;
		},
		setTooltipFormatterParamsPercent:function(params){
    		var formatter = params.data.formatter;
    		var unit = params.data.unit;
    		var _value = params.data.real_value;
    		_value = this.getFormatterValue(formatter,_value);
    		if(unit){
    			_value = _value + unit;
    		}
    		return _value;
		},
		getFormatterValue:function(formatter,value){
			var _this = this;
			if(!formatter){
				formatter = {
						check:"num",
						percent:{digit:0},
						num:{
							millesimal:true,
							digit:0,
							unit:"无",
							unit_id:"1",
							unit_value:1
						}	
				};
			}
			
			
			if(formatter.check == "num"){
				value = _this.setFormatterNum(formatter,value);
			}else if(formatter.check == "percent"){
				value = _this.setFormatterPercent(formatter,value);
			}
			return value;
		},
		setFormatterNum:function(formatter,current_value){
			var _this = this;
			var rest_value = "";
			var millesimal = formatter.num.millesimal;
			var digit = formatter.num.digit;
			var unit = formatter.num.unit;
			var unit_id = formatter.num.unit_id;
			var unit_value = formatter.num.unit_value;
			if(!current_value){
				current_value = 0;
			}		
			current_value = parseFloat(current_value);
			if(digit < 0){
				digit = 0;
			}
			if(unit_id != "1"){//数值单位 存在
				current_value = (current_value*1.0)/unit_value;	//单位值转换
				current_value = current_value.toFixed(digit);//保留小数位
				if(millesimal){
					current_value = _this.thousandBitSeparator(current_value);
				}
				current_value = current_value + unit;
				rest_value = current_value;
			}else{
				current_value = current_value.toFixed(digit);//保留小数位
				if(millesimal){
					current_value = _this.thousandBitSeparator(current_value);
				}
				rest_value = current_value;
			}
			return rest_value;
		},
		setFormatterPercent:function(formatter,current_value){
			var rest_value = "";
			var digit = formatter.percent.digit;
			if(digit < 0){
				digit = 0;
			}
			if(!current_value){
				current_value = 0;
			}
			current_value = parseFloat(current_value) * 100;
			current_value = current_value.toFixed(digit);//保留小数位
			rest_value = current_value +"%";
			return rest_value;
		},
		setOptionLegendData:function(option){
			var legend = option.legend;
			if(legend && legend.data){
				var legend_data = legend.data;
				var new_data = [];
				if(legend_data.length > 0){
					for(var i = 0;i < legend_data.length;i++){
						new_data.push({name:legend_data[i],icon:'rect'});
					}
					
					legend.data = new_data;
				}	
			}
		},
		addTooltipFormatter:function(chart_type,option){
			var _this = this;
			//lengend 图例形状修改
            var com_color = this.checkThemeColor(option);
			if(chart_type == this.chart_type_set.LINE){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var data_name = chart_option_event.setRepeatName(params[0].data.name);
			            	html.push('<font color="'+com_color+'">'+data_name+'</font><br/>');	
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _value = chart_option_event.setTooltipFormatterParams(params[i]);
			            		var _name = chart_option_event.setRepeatName(params[i].seriesName);
			            		var _font = '<font color="'+params[i].color+'">'+_name+'：'+_value+'</font>';
			            		font.push(_font);
			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            }
		            return html.join("");
		        }
				_this.setYAxisLabelFormatter(option);
				_this.setLabelNormal(option);
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.FUNNEL){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	var _value = chart_option_event.setTooltipFormatterParams(params);
		            	var name = chart_option_event.setRepeatName(params.name);
		            	var _font = '<font color="'+params.color+'">'+name+'：'+_value+'</font>';
		            	html.push(_font);
		            }
		            return html.join("");
		        }	
				var show_chart_tag  = option.series[0].show_chart_tag;
				option.series[0].label.normal = {
						formatter:function(obj){
							var _value = chart_option_event.setTooltipFormatterParams(obj)
							var name = chart_option_event.setRepeatName(obj.name);
							return name+"："+_value;
						},
						show:show_chart_tag
				};
				//_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.BIAXIAL){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	    
		            		var name = chart_option_event.setRepeatName(params.name);
		            		html.push('<font color="'+com_color+'">'+name+'：'+params.value+'</font>');
		            	}else{
		            		var name = chart_option_event.setRepeatName(params[0].data.name);
			            	html.push('<font color="'+com_color+'">'+name+'</font><br/>');
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		if(params[i].data.showPercent){
			            			var _value = chart_option_event.setTooltipFormatterParamsPercent(params[i]);
			            			var seriesName = chart_option_event.setRepeatName(params[i].seriesName);
				            		var _font = '<font color="'+params[i].color+'">'+seriesName+'：'+_value+"("+params[i].value+'%)</font>';
				            		font.push(_font);
			            		}else{
			            			var _value = chart_option_event.setTooltipFormatterParams(params[i]);
			            			var seriesName = chart_option_event.setRepeatName(params[i].seriesName);
				            		var _font = '<font color="'+params[i].color+'">'+seriesName+'：'+_value+'</font>';
				            		font.push(_font);
			            		}
	
			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            }

		            return html.join("");
		        }
				_this.setSpecialYAxisLabelFormatter(option);
				_this.setLabelNormal(option);	
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.METERING){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	var data = params.data;
		            	var real_value = data.real_value;
		            	var value = data.value;
		            	var rate_digit = data.rate_digit;
		            	real_value = real_value.toFixed(rate_digit);
		            	var _font = '<font color="'+com_color+'">'+params.seriesName+'-完成率：'+real_value+'%</font>';
		            	html.push(_font);
		            }
		            return html.join("");
		        }	
				var rate_digit = option.series[0].rate_digit;
				var real_val = option.series[0].real_val;	
				var formatter = option.series[0].cutom_formatter;
				option.series[0].detail = {
						formatter:function(value){
							value=	real_val.toFixed(rate_digit);
							return value+"%";
						}
				};
				
				option.series[0].axisLabel= {
						formatter:function(value){
							var _value = 0;
							if(!parseFloat(value) ==0){
								_value = chart_option_event.setTooltipFormatterParamsOther(formatter,"",value);
							}
							return _value;
						}
				};
				
			}else if(chart_type == this.chart_type_set.T_BAR){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var _name = chart_option_event.setRepeatName(params[0].name);
			            	html.push('<font color="'+com_color+'">'+_name+'</font><br/>');
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _value = chart_option_event.setTooltipFormatterParams(params[i]);
			            		var seriesName = params[i].seriesName;
			            		seriesName = seriesName.split(",");
			            		if(seriesName.length > 1){
			            			var p_name = chart_option_event.setRepeatName(params[0].name);
			            			var _font = '<font color="'+params[i].color+'">'+p_name+'：'+_value+'</font>';
			            		}else{
			            			var p_name = chart_option_event.setRepeatName(params[i].seriesName);
			            			var _font = '<font color="'+params[i].color+'">'+p_name+'：'+_value+'</font>';
			            		}
			            		font.push(_font);
			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            }
		            return html.join("");
		        }
				_this.setXAxisLabelFormatter(option);
				_this.setLabelNormal(option,'right');
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.Z_BAR){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var name = chart_option_event.setRepeatName(params[0].name);
			            	html.push('<font color="'+com_color+'">'+name+'</font><br/>');

			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _value = chart_option_event.setTooltipFormatterParams(params[i]);
			            		var seriesName = params[i].seriesName;
			            		seriesName = seriesName.split(",");
			            		if(seriesName.length > 1){
			            			var p_name = chart_option_event.setRepeatName(params[i].name);
			            			var _font = '<font color="'+params[i].color+'">'+p_name+'：'+_value+'</font>';
			            		}else{
			            			var p_name = chart_option_event.setRepeatName(params[i].seriesName);
			            			var _font = '<font color="'+params[i].color+'">'+p_name+'：'+_value+'</font>';
			            		}
			            		font.push(_font);
			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            } 

		            return html.join("");
		        }
				
				_this.setYAxisLabelFormatter(option);
				_this.setLabelNormal(option);
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.D_BAR){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var _name = chart_option_event.setRepeatName(params[0].name);
			            	html.push('<font color="'+com_color+'">'+_name+'</font><br/>');
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _value = chart_option_event.setTooltipFormatterParams(params[i]);
			            		var p_name = chart_option_event.setRepeatName(params[i].seriesName);
			            		var _font = '<font color="'+params[i].color+'">'+p_name+'：'+_value+'</font>';
			            		font.push(_font);
			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            } 

		            return html.join("");
		        }
				_this.setYAxisLabelFormatter(option);
				_this.setLabelNormalMiddle(option);
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.RADAR){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	var p_name = chart_option_event.setRepeatName(params.data.name);
		            	html.push('<font color="'+com_color+'">'+params.data.name+'</font><br/>');
		            	var font = [];
		            	for(var i = 0 ;i <params.data.seriesName.length;i++){
		            		var _name = chart_option_event.setRepeatName(params.data.seriesName[i]);
		            		var _value = chart_option_event.setTooltipFormatterParamsOther(params.data.formatter,params.data.unit,params.data.value[i]);
		            		var _font = '<font color="'+params.color+'">'+_name+'：'+_value+'</font>';
		            		font.push(_font);
		            	}
		            	html.push(font.join("<br/>"));
		            }

		            return html.join("");
		        }
				_this.setLabelNormal(option);
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.P_BAR){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var d_name = chart_option_event.setRepeatName(params[0].data.name);
			            	html.push('<font color="'+com_color+'">'+d_name+'</font><br/>');
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _name = chart_option_event.setRepeatName(params[i].seriesName);
			            		if(params[i].data.showPercent){
			            			var _value = chart_option_event.setTooltipFormatterParamsPercent(params[i]);
				            		var _font = '<font color="'+params[i].color+'">'+_name+'：'+_value+"("+params[i].value+'%)</font>';
				            		font.push(_font);
			            		}else{
			            			var _value = chart_option_event.setTooltipFormatterParams(params[i]);
				            		var _font = '<font color="'+params[i].color+'">'+_name+'：'+_value+'</font>';
				            		font.push(_font);
			            		}

			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            }

		            return html.join("");
		        }
				_this.setLabelNormalMiddle(option);
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.DT_BAR){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var d_name = chart_option_event.setRepeatName(params[0].data.name);
			            	html.push('<font color="'+com_color+'">'+d_name+'</font><br/>');
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _name = chart_option_event.setRepeatName(params[i].seriesName);
			            		var _value = chart_option_event.setTooltipFormatterParams(params[i]);
			            		var _font = '<font color="'+params[i].color+'">'+_name+'：'+_value+'</font>';
			            		font.push(_font);
			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            }
    
		            return html.join("");
		        }
				_this.setXAxisLabelFormatter(option);
				_this.setLabelNormalMiddle(option);
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.PDT_BAR){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var d_name = chart_option_event.setRepeatName(params[0].data.name);
			            	html.push('<font color="'+com_color+'">'+d_name+'</font><br/>');
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _name = chart_option_event.setRepeatName(params[i].seriesName);
			            		if(params[i].data.showPercent){
			            			var _value = chart_option_event.setTooltipFormatterParamsPercent(params[i]);
				            		var _font = '<font color="'+params[i].color+'">'+_name+'：'+_value+"("+params[i].value+'%)</font>';
				            		font.push(_font);
			            		}else{
			            			var _value = chart_option_event.setTooltipFormatterParams(params[i]);
				            		var _font = '<font color="'+params[i].color+'">'+_name+'：'+_value+'</font>';
				            		font.push(_font);
			            		}

			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            }

		            return html.join("");
		        }
				_this.setLabelNormalMiddle(option);
				_this.setLegendFormatter(option);
			}else if(chart_type == this.chart_type_set.PIE){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	var color = params.color;
		            	var data = params.data;
		            	var _value = chart_option_event.setTooltipFormatterParams(params);
		            	var name = chart_option_event.setRepeatName(params.name);
		            	html.push('<font color="'+color+'">'+name+'：'+_value+'</font><br/>');
		            	html.push('<font color="'+com_color+'">占比：'+params.percent+'%</font>');
		            }

		            return html.join("");
		        }
				var show_chart_tag  = option.series[0].show_chart_tag;
				option.series[0].label.normal = {
						formatter:function(obj){
							var name = chart_option_event.setRepeatName(obj.name);
							return name+"："+obj.percent+"%";
						},
						show:show_chart_tag
				};
				_this.setLegendFormatter(option);		
			}else if(chart_type == this.chart_type_set.A_LINE){
				var xAxis_data = option.xAxis;
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	            		
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
		            		var _name = chart_option_event.setRepeatName(params[0].name);
		            		html.push('<font color="'+com_color+'">'+_name+'</font><br/>');
		            		//无维度时不显示维度名称
		            		if(xAxis_data.data){
		            			html.pop();
		            		}
			            	var font = [];
			            	for(var i = 0 ;i <params.length;i++){
			            		var _value = chart_option_event.setTooltipFormatterParams(params[i]);
		            			var p_name = chart_option_event.setRepeatName(params[i].name);
		            			var _font = '<font color="'+params[i].color+'">'+params[i].seriesName+'：'+_value+'</font>';
			            		font.push(_font);
			            	}
			            	html.push(font.join("<br/>"));
		            	}
		            }

		            return html.join("");
		        }
				_this.setYAxisLabelFormatter(option);
				_this.setLabelNormal(option);
				_this.setLegendFormatter(option);	
			}else if(chart_type == this.chart_type_set.WORD_CLOUD){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
			            	html.push('<font color="'+com_color+'">'+params.name+'</font><br/>');
			            	//var font = [];
//			            	for(var i = 0 ;i <params.length;i++){
			            		var _font = '<font color="'+params.color+'">词频：'+params.data.value+'</font>';
			            		html.push(_font);
//			            	}
//			            	html.push(font.join("<br/>"));
		            	
		            }

		            return html.join("");
		        }
			}else if(chart_type == this.chart_type_set.MAP){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
			            	html.push('<font color="'+com_color+'">'+params.data.name+'</font><br/>');	
			            	var font = [];
//			            	for(var i = 0 ;i <params.length;i++){
			            	var _value = 0;
			            	var _color = "";
			            	if(params.data.formatter){
			            		_value = chart_option_event.setTooltipFormatterParams(params);
			            		_color = params.data.color;
			            	}else{
			            		_value = 0;
			            		_color = com_color;
			            	}
			            	var _font = '<font color="'+_color+'">'+params.seriesName+'：'+_value+'</font>';
			            	font.push(_font);
			            	html.push(font.join("<br/>"));
		            }
		            return html.join("");
		        }
				_this.setMapLabelNormal(option);
			}else if(chart_type == this.chart_type_set.RECTANGLE_TREE){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            var yAxisName = option.yAxisName;
		            var visual_extend = option.visual_extend;
					if(!visual_extend){
						visual_extend = {};
						visual_extend.formatter = null;
						visual_extend.unit = '';
					}
		            if(params){
			            	html.push('<font color="'+com_color+'">'+params.data.name+'</font><br/>');
			            	var _value = chart_option_event.setTooltipFormatterParamsOther(visual_extend.formatter,visual_extend.unit,params.data.value);
			            	if(yAxisName && yAxisName.length > 0){
			            		html.push('<font color="'+params.color+'">'+yAxisName+'：'+_value+'</font><br/>');
			            	}else{
			            		html.push('<font color="'+params.color+'">数值：'+_value+'</font><br/>');
			            	}
			            	html.push('<font color="'+params.color+'">占比：'+params.data.percent+'%</font>');
		            }
		            return html.join("");
		        }
				_this.setLabelNormalMiddle(option);
			}else if(chart_type == this.chart_type_set.RISING_SUN){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	var color = params.color;
		            	var data = params.data;
		            	var _value = chart_option_event.setTooltipFormatterParams(params);
		            	var name = params.name;
		            	name = name.split("@@").join('>');
		            	html.push('<font color="'+color+'">'+name+'</font><br/>');
		            	html.push('<font color="'+com_color+'">'+data.alias_name+'：'+_value+'</font><br/>');
		            	html.push('<font color="'+com_color+'">占比：'+params.percent+'%</font>');
		            }

		            return html.join("");
		        }
				
				_this.setLabelNormal(option);
			}else if(chart_type == this.chart_type_set.SCATTER){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.componentType == 'markLine'){	        
		            		html.push('<font color="'+com_color+'">'+params.name+'：'+params.value+'</font>');
		            	}else{
			            	var color = params.color;
			            	var data = params.data;
			            	var show_name = data.show_name;
			            	var seriesName = params.seriesName;
			            	if(show_name){
				            	html.push('<font color="'+com_color+'">'+seriesName+'</font><br/>');
			            	}
			            	var names = params.name;
			            	var formatters = data.formatters;
			            	var units = data.units;
			            	var values = params.value;
			            	
			            	var value1 = values[0];
			            	var value2 = values[1];
			            	value1 = chart_option_event.setTooltipFormatterParamsOther(formatters[0],units[0],value1);
			            	value2 = chart_option_event.setTooltipFormatterParamsOther(formatters[1],units[1],value2);
			            	html.push('<font color="'+color+'">'+names[0]+'：'+value1+'</font><br/>');
			            	html.push('<font color="'+color+'">'+names[1]+'：'+value2+'</font><br/>');
			            	if(values && values.length > 2){
			            		for(var i = 2;i < values.length;i++){
			            			html.push('<font color="'+color+'">'+names[i]+'：'+values[i]+'</font><br/>');
			            		}
			            	}
		            	}

		            }

		            return html.join("");
		        }
				
				//_this.setLabelNormal(option);
			}else if(chart_type == this.chart_type_set.WATERFALL){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
		            	if(params.length > 1){
		            		var data_name = params[1].data.name;
			            	html.push('<font color="'+com_color+'">'+data_name+'</font><br/>');	
			            	var font = [];
		            		var _value = chart_option_event.setTooltipFormatterParams(params[1]);
		            		var _name = params[1].seriesName;
		            		var _font = '<font color="'+params[1].color+'">'+_name+'：'+_value+'</font>';
		            		font.push(_font);
			            	html.push(font.join("<br/>"));
		            	}
		            }

		            return html.join("");
		        }
				_this.setLabelNormal(option);
				_this.setYAxisLabelFormatter(option);
			}else if(chart_type == this.chart_type_set.SANKEY){
				option.tooltip.formatter = function (params, ticket, callback) {
		            var html = [];
		            if(params){
			            	var font = [];
		            		var _value = chart_option_event.setTooltipFormatterParams(params);
		            		var _name = params.name;
		            		var color = com_color;
		            		if(params.color){
		            			color = params.color;
		            		}	            		
		            		var _font = '<font color="'+color+'">'+_name+'：'+_value+'</font>';
		            		font.push(_font);
			            	html.push(font.join("<br/>"));
		            }

		            return html.join("");
		        }
				//_this.setLabelNormal(option);
				//_this.setYAxisLabelFormatter(option);
			}
			
			return option;
		},
		renderTheme:function(chart_type,option){
			var _this = this;
			var common_color = _this.checkThemeColor(option);//#fff
			var legend  = option['legend'];
			if(legend){
				legend.textStyle =  {
			            color: common_color
		        }
			}
			
			var tooltip = option['tooltip'];
			if(tooltip){
				tooltip.backgroundColor = _this.checkThemetooltipColor(option);
			}
			
			var xAxis = option['xAxis'];
			
			if(xAxis instanceof Array){
				if(xAxis && xAxis.length >0){
					for(var i = 0;i < xAxis.length;i++){
						var _x = xAxis[i];
						
						if(_x){
							if(!_x.axisLabel){
								_x.axisLabel = {};
							}
							_x.axisLabel.textStyle = {color:common_color};
							
							if(!_x.axisLine){
								_x.axisLine = {};
							}
							_x.axisLine.lineStyle = {color:common_color};
							if(_x.nameTextStyle){
								_x.nameTextStyle.color = common_color;
							}
						}
					}
				}
			}else{
				if(xAxis){
					if(!xAxis.axisLabel){
						xAxis.axisLabel = {};
					}
					xAxis.axisLabel.textStyle = {color:common_color};
					
					if(!xAxis.axisLine){
						xAxis.axisLine = {};
					}
					xAxis.axisLine.lineStyle = {color:common_color};
					if(xAxis.nameTextStyle){
						xAxis.nameTextStyle.color = common_color;
					}
				}
			}

			var yAxis = option['yAxis'];
			if(yAxis instanceof Array){
				if(yAxis && yAxis.length >0){
					for(var i = 0;i < yAxis.length;i++){
						var _x = yAxis[i];
						if(_x){
							if(!_x.axisLabel){
								_x.axisLabel = {};
							}
							_x.axisLabel.textStyle = {color:common_color};
							
							if(!_x.axisLine){
								_x.axisLine = {};
							}
							_x.axisLine.lineStyle = {color:common_color};
							
							if(_x.nameTextStyle){
								_x.nameTextStyle.color = common_color;
							}
						}
					}
				}
			}else{
				if(yAxis){
					if(!yAxis.axisLabel){
						yAxis.axisLabel = {};
					}
					yAxis.axisLabel.textStyle = {color:common_color};
					
					if(!yAxis.axisLine){
						yAxis.axisLine = {};
					}
					yAxis.axisLine.lineStyle = {color:common_color};
					if(yAxis.nameTextStyle){
						yAxis.nameTextStyle.color = common_color;
					}
				}
			}
			var visualMap = option['visualMap'];
			
			if(visualMap){
				visualMap.textStyle = {color:common_color};
			}
			
			if(chart_type == chart_option_event.chart_type_set.METERING){	
				common_color = _this.checkThemeMeteringColor(option);
				option.title.textStyle={
		      	     color:common_color
		      	};
				option.title.subtextStyle={
		      	    color:common_color
		      	};
			}
		},
		//是否显示标签 isShow(true/false)
		setLabelShow:function(isShow,option){
			var series  = option.series;
			if(series && series.length > 0){
				for(var i = 0;i < series.length;i++){
					if(!series[i].label){
						series[i].label = {normal:{}};
					}
					series[i].label.normal.show = isShow;
				}
			}
			return option; 
		},
		//千分位分隔符
		thousandBitSeparator:function(num) {
			var source = String(num).split(".");//按小数点分成2部分
		        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");//只将整数部分进行都好分割
		    return source.join(".");
		},
		checkThemeColor:function(option,default_color){
			var theme = option['theme'];
			var com_color = "#000000";
			if(theme == "dark"){
				com_color = this.dark_color;
			}
			return com_color;
		},
		checkThemeMeteringColor:function(option){
			var theme = option['theme'];
			var com_color = "#000000";
			if(theme == "dark"){
				com_color = this.dark_color;
			}
			return com_color;
		},
		checkThemetooltipColor:function(option){
			var theme = option['theme'];
			var com_color = "#FFFFFF";
			if(theme == "dark"){
				com_color =  "#222633";
			}
			return com_color;
		}
}