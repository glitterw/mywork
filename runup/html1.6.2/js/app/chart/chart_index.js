var chart_index = {
		init:function(option,structure){
			this.guide_formulas = structure.guide_formulas;
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			//条件格式[{column_id:"",column_name:"",unique_id:"",cal_type:"",cal_name:"",formula:"",value:"",value2:"",color:"",symbol:"",showstyle:false}]	
			setting_obj.index_format_list = [];
			setting_obj.temg_format_list = [];
		},
		render:function(option,structure_obj){
			var _this =  this;
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var resultList = structure_obj.result.resultList;//结果集
			var chartSetting = structure_obj.chartSetting;//图形设置
			var format_list = chartSetting.index_format_list;
			var html = [];
			var firstField_html = [];
			var secondField_html = [];
			if(resultList && resultList.length > 0){
				var r_len = resultList.length;
				if(r_len >= 1){
					var firstField = resultList[0];
					var format = _this.getFormatByUniqueId(firstField.unique_id,firstField.value,format_list);
					firstField_html.push('<div class="chart-text-title">');
					firstField_html.push('<span class="nick-name-value nowrap">');
					firstField_html.push(firstField.name);
					firstField_html.push('</span>');
					firstField_html.push('</div>');
					var firstField_color = "";
					if(format && format.color){
						firstField_color = format.color;
					}else{
						firstField_color = y_axisList[0].color;
					}
					firstField_html.push('<div class="chart-text-value nowrap" style="color:'+firstField_color+'">');	
					var y_axis =  y_axisList[0];
					var firstField_value = chart_option_event.setTooltipFormatterParamsOther(y_axis.formatter,y_axis.unit,firstField.value);
					if(format&&format.showstyle){
						firstField_html.push('<i class="icomoon '+format.symbol+'"></i>'+firstField_value);
					}else{
						firstField_html.push(firstField_value);
					}			
					firstField_html.push('</div>');
					
					
					if(r_len == 2){//第二个数值字段
						var secondField = resultList[1];
						var format2 = _this.getFormatByUniqueId(secondField.unique_id,secondField.value,format_list);
						secondField_html.push('<div class="chart-text-updown nowrap">');
						var secondField_color = "";
						if(format2 && format2.color){
							secondField_color = format2.color;
						}else{
							secondField_color = y_axisList[1].color;
						}
						secondField_html.push('<span class="hd">');
						secondField_html.push(secondField.name);
						secondField_html.push('</span>');
						secondField_html.push('<span class="bd" style="color:'+secondField_color+'">');
						var y_axis =  y_axisList[1];
						var secondField_value = chart_option_event.setTooltipFormatterParamsOther(y_axis.formatter,y_axis.unit,secondField.value);
						if(format2&&format2.showstyle){
							secondField_html.push('<i class="icomoon '+format2.symbol+'"></i>'+secondField_value);
						}else{
							secondField_html.push(secondField_value);
						}	
						secondField_html.push('</span>');
						secondField_html.push('</div>');
					}
					
				}
			}
			
			
			html.push('<div class="chart-text-box">');
			html.push('<div class="chart-text-box-inner">');
			html.push('<div class="chart-text-item">');
			html.push(firstField_html.join(""));
			html.push(secondField_html.join(""));
			html.push('</div>');
			html.push('</div>');
			html.push('</div>');
			option.html = html.join("");
		},
		getFormatByUniqueId:function(uid,val,format_list){
			var temps = [];
			var _format = null;
			var x = val;
			//筛选满足条件的集合
			if(format_list && format_list.length > 0){
				for(var i = 0;i < format_list.length;i++){
					var format = format_list[i];
					if(format.unique_id == uid){
						temps.push(format);
					}
					
				}
			}
			
			if(temps && temps.length > 0){
				for(var i= 0;i < temps.length;i++){
					 var data = temps[i];
					 var formula = data.formula;
					 var value = data.value;
					 value = parseFloat(value);
					 var t = value;
					 var a = value;
					 var b= 0;
					 if(data.cal_type == "6"){//区间
						 b = parseFloat(data.value2);
					 } 
					 //满足表达式
					 if(eval(formula)){
						 _format = data;
						 break;
					 }
					
				}
			}
			return _format;
		}
};