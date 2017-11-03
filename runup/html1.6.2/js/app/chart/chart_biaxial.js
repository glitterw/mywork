var chart_biaxial = {
		guide_formulas:[],
		init:function(option,structure){
			this.guide_formulas = structure.guide_formulas;
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.chart_style = 1;//1.直线;2.曲线
			setting_obj.show_chart_tag = false;// 显示图表标签   true 显示  false隐藏
			setting_obj.axis_title = "";//坐标轴 标题
			setting_obj.axis_title_temp = "";//坐标轴 标题
			setting_obj.axis_unit = "";//坐标轴 单位
			setting_obj.axis_max_enabled = true;//坐标轴 最大值自动功能 false 不启用  true  启用
			setting_obj.axis_max_value = 0;//坐标轴 最大值
			setting_obj.axis_min_enabled = true;//坐标轴 最小值自动功能false 不启用  true  启用
			setting_obj.axis_min_value = 0;//坐标轴 最小值
			
			//次轴
			setting_obj.axis2_title = "";//坐标轴 标题
			setting_obj.axis2_title_temp = "";
			setting_obj.axis2_unit = "";//坐标轴 单位
			setting_obj.axis2_max_enabled = true;//坐标轴 最大值自动功能 false 不启用  true  启用
			setting_obj.axis2_max_value = 0;//坐标轴 最大值
			setting_obj.axis2_min_enabled = true;//坐标轴 最小值自动功能false 不启用  true  启用
			setting_obj.axis2_min_value = 0;//坐标轴 最小值
			//辅助线 
			/*
			 * [{"name":"","type":"2",“fid”:"", "fieldname":"","formula":"",value:""}]   
			 *  type:1.固定值;2.计算值   formula:1.平均值;2.最小值;2.最大值  fieldname 字段名称
			 * */
			setting_obj.guide_list = [];
			setting_obj.temp_guide_list = [];
			//辅助线 (次轴)
			setting_obj.guide_list2 = [];
			setting_obj.temp_guide_list2 = [];
			
			setting_obj.axis_unified = false;//主次坐标轴统一
			
			setting_obj.show_chart_total = false;//显示图内总计  true 显示  false隐藏
			setting_obj.show_chart_shortaxis = false;//显示缩略轴 true 显示  false隐藏
			setting_obj.show_chart_shortaxis_start = 0;
			setting_obj.show_chart_shortaxis_end = 100;
			setting_obj.description = "";//图表备注
			
			setting_obj.top = {type:"",typeName:"项目",reversed:"",reversedName:"前",enabled:"",value:"20"};//条目对象
		},
		render:function(option,structure_obj){
			var _this =  this;
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var y2_axisList = structure_obj.container.y2_axisList;//次轴-Y轴字段集合
			var result_xAxis = structure_obj.result.xAxis;//x轴 数据
			var result_yAxis = structure_obj.result.yAxis;//y轴 数据
			var chartSetting = structure_obj.chartSetting;//图形设置
			var	chartOperate = structure_obj.chartOperate;//图表操作
			var name_container = new Object();
			name_container.distinguished = [];
			name_container.temp = [];


			option.xAxis = result_xAxis;
			var default_name = "";
			//设置坐标轴名称
			var default_name1 = "";
			if(chartSetting.axis_title_temp){
				default_name1 = chartSetting.axis_title_temp;
			}else{
				if(y_axisList && y_axisList.length > 0){
					default_name1 = y_axisList[0].column_name;
					chartSetting.axis_title = default_name1;
				}
				if(chartSetting.axis_title){
					default_name1 = chartSetting.axis_title;
					if(chartSetting.axis_unit){
						default_name = default_name1 + "("+chartSetting.axis_unit+")";
					}
				}
			}
			
			//设置次坐标轴名称
			var default_name2 = "";
//			if(!chartSetting.axis2_title){
//				if(y2_axisList && y2_axisList.length > 0){
//					default_name2 = y2_axisList[0].column_name;
//					chartSetting.axis2_title = default_name2;
//				}
//			}else{
//				default_name2 = chartSetting.axis2_title;
//				if(chartSetting.axis2_unit){
//					default_name2 = default_name2 + "("+chartSetting.axis2_unit+")";
//				}
//			}
//			
			if(chartSetting.axis2_title_temp){
				default_name2 = chartSetting.axis2_title_temp;
			}else{
				if(y2_axisList && y2_axisList.length > 0){
					default_name2 = y2_axisList[0].column_name;
					chartSetting.axis2_title = default_name2;
				}else{
					chartSetting.axis2_title = "";
				}
				if(chartSetting.axis2_title){
					default_name2 = chartSetting.axis2_title;
					if(chartSetting.axis2_unit){
						default_name = default_name2 + "("+chartSetting.axis2_unit+")";
					}
				}
			}
			
			var _yAxis = [];
			var obj_yAxis = new Object();
			obj_yAxis.type = "value";
			if(default_name1){
				obj_yAxis.name = default_name1;
				obj_yAxis.nameTextStyle = {
						color: '#666666'
				};
			}
			
			var mode1 = _this.getYaxisMode(chartOperate.yAxis_chartType);
			if(mode1 == 3){
				obj_yAxis.axisLabel = {show: true,interval: 'auto',formatter: '{value} %'};
				obj_yAxis.show = true;
				obj_yAxis.max = 100;
			}else{
				if(!chartSetting.axis_max_enabled){
					obj_yAxis.max = chartSetting.axis_max_value;
				}
				if(!chartSetting.axis_min_enabled){
					obj_yAxis.min = chartSetting.axis_min_value;
				}
				
			}
			

			obj_yAxis.axisLabelFormatterType = chart_util.axisLabelFormatterType(y_axisList);
			
			_yAxis.push(obj_yAxis);
			
			var obj_yAxis2 = new Object();
			obj_yAxis2.type = "value";
			if(default_name2){
				obj_yAxis2.name = default_name2;
				obj_yAxis2.nameTextStyle = {
						color: '#666666'
				};
			}
			
			var mode2 = _this.getYaxisMode(chartOperate.y2Axis_chartType);
			if(mode2 == 3){
				obj_yAxis2.axisLabel = {show: true,interval: 'auto',formatter: '{value} %'};
				obj_yAxis2.show = true;
				obj_yAxis2.max = 100;
			}else{
				if(!chartSetting.axis2_max_enabled){
					obj_yAxis2.max = chartSetting.axis2_max_value;
				}
				if(!chartSetting.axis2_min_enabled){
					obj_yAxis2.min = chartSetting.axis2_min_value;
				}
			}
			

			
			obj_yAxis2.axisLabelFormatterType = chart_util.axisLabelFormatterType(y2_axisList);
			
			//主次轴合并
			if(!chartSetting.axis_unified && y2_axisList.length > 0){
				_yAxis.push(obj_yAxis2);
			}
			
			
			option.yAxis = _yAxis;
			
			//组装series
			var series = [];
			var legend_data = [];
			
			var r1_yAxis = [];
			var r2_yAxis = [];
			if(result_yAxis && result_yAxis.length>0){
				for(var i = 0;i <result_yAxis.length;i++){
					var _data = result_yAxis[i];
					if(_data.yAxisIndex == 0){
						r1_yAxis.push(_data);
					}else if(_data.yAxisIndex == 1){
						r2_yAxis.push(_data);
					}
				}
				
				
				
				//Y轴 的 图例选择
				var mode1 = _this.getYaxisMode(chartOperate.yAxis_chartType);
				if(r1_yAxis && r1_yAxis.length > 0){
					var colors  = _this.getYColors(y_axisList);
					if(mode1 == 0){//折线图效果
						for(var i = 0;i < r1_yAxis.length;i++){
							var y_axis = y_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r1_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
							seriy.name= data_name;
							seriy.type='line';
							seriy.data = seriy_data;
							seriy.show_chart_tag = chartSetting.show_chart_tag;
							//seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag}};//是否显示标签
							seriy.markLine = _this.getMarkLineByLine(chartSetting,unique_id);
							seriy.itemStyle ={normal: {color:colors[i]}};
							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}
					}else if(mode1 == 1){//簇状柱形图效果
						for(var i = 0;i < r1_yAxis.length;i++){
							var y_axis = y_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r1_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
							seriy.name= data_name;
							seriy.type='bar';
							seriy.data = seriy_data;
							seriy.show_chart_tag = chartSetting.show_chart_tag;
							//seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag}};//是否显示标签
							seriy.markLine = _this.getMarkLineByLine(chartSetting,unique_id);
							seriy.itemStyle ={normal: {color:colors[i]}};
							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}
					}else if(mode1 == 2){//堆积柱形图效果
						for(var i = 0;i < r1_yAxis.length;i++){
							var y_axis = y_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r1_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
							seriy.name= data_name;
							seriy.type='bar';
							seriy.stack='duiji';
							seriy.data = seriy_data;
							seriy.itemStyle ={normal: {color:colors[i]}};
							seriy.show_chart_tag = chartSetting.show_chart_tag;
//							if( i == (r1_yAxis.length-1)){
//								seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag}};//是否显示标签
//							}
							seriy.markLine = _this.getMarkLineByLine(chartSetting,unique_id);
							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}
					}else if(mode1 == 3){//百分比堆积柱形图效果
						var result_yAxis_new = [];
						result_yAxis_new = chartDataClone(result_yAxis);
						var r1_yAxis = _this.toPercentDataList(result_yAxis_new,r1_yAxis);
						for(var i = 0;i < r1_yAxis.length;i++){
							var y_axis = y_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r1_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
							seriy.name= data_name;
							seriy.type='bar';
							seriy.stack='duiji';
							seriy.data = seriy_data;
							seriy.show_chart_tag = chartSetting.show_chart_tag;
							seriy.itemStyle ={normal: {color:colors[i]}};
//							if( i == (r1_yAxis.length-1)){
//								seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag, formatter: '{c}%'}};//是否显示标签
//							}
							seriy.markLine = _this.getMarkLineByLine(chartSetting,unique_id);
							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}					
					}
				}
				
				//次Y轴的图例选择
				var mode2 = _this.getYaxisMode(chartOperate.y2Axis_chartType);				
				if(r2_yAxis && r2_yAxis.length > 0){
					var colors  = _this.getY2Colors(y2_axisList);
					
					if(mode2 == 0){//折线图效果
						for(var i = 0;i < r2_yAxis.length;i++){
							var y_axis = y2_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r2_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
					
							seriy.name= data_name;
							seriy.type='line';
							seriy.data = seriy_data;
							seriy.show_chart_tag = chartSetting.show_chart_tag;
							//seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag}};//是否显示标签
							seriy.itemStyle ={normal: {color:colors[i]}};
							seriy.markLine = _this.getMarkLineByLine2(chartSetting,unique_id);

							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}else{
								seriy.yAxisIndex = 0;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}
					}else if(mode2 == 1){//簇状柱形图效果
						for(var i = 0;i < r2_yAxis.length;i++){
							var y_axis = y2_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r2_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
							seriy.name= data_name;
							seriy.type='bar';
							seriy.data = seriy_data;
							seriy.show_chart_tag = chartSetting.show_chart_tag;
							//seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag}};//是否显示标签
							seriy.itemStyle ={normal: {color:colors[i]}};
							seriy.markLine = _this.getMarkLineByLine2(chartSetting,unique_id);

							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}else{
								seriy.yAxisIndex = 0;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}
					}else if(mode2 == 2){//堆积柱形图效果
						for(var i = 0;i < r2_yAxis.length;i++){
							var y_axis = y2_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r2_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
							seriy.name= data_name;
							seriy.type='bar';
							seriy.stack='duiji2';
							seriy.data = seriy_data;
							seriy.show_chart_tag = chartSetting.show_chart_tag;
							//seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag}};//是否显示标签
							seriy.itemStyle ={normal: {color:colors[i]}};
							seriy.markLine = _this.getMarkLineByLine2(chartSetting,unique_id);

							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}else{
								seriy.yAxisIndex = 0;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}
					}else if(mode2 == 3){//百分比堆积柱形图效果
						var result_yAxis_new = [];
						result_yAxis_new = chartDataClone(result_yAxis);
						var r2_yAxis = _this.toPercentDataList(result_yAxis_new,r2_yAxis);
						for(var i = 0;i < r2_yAxis.length;i++){
							var y_axis = y2_axisList[i];
							var unique_id = y_axis.unique_id;
							var _data = r2_yAxis[i];
							var seriy = new Object();
							var seriy_data = chart_util.setFormatterAndUnit(y_axis,_data.data);
							
							var data_name = chart_option_event.distinguishedName(name_container,_data.name);
							
							seriy.name= data_name;
							seriy.type='bar';
							seriy.stack='duiji2';
							seriy.data = seriy_data;
							seriy.show_chart_tag = chartSetting.show_chart_tag;
							seriy.itemStyle ={normal: {color:colors[i]}};
//							if( i == (r2_yAxis.length-1)){
//								seriy.label = { normal: {position: 'top',show: chartSetting.show_chart_tag, formatter: '{c}%'}};//是否显示标签
//							}
							seriy.markLine = _this.getMarkLineByLine2(chartSetting,unique_id);

							//主次轴合并
							if(!chartSetting.axis_unified){
								seriy.yAxisIndex = _data.yAxisIndex;
							}else{
								seriy.yAxisIndex = 0;
							}
							series.push(seriy);
							legend_data.push(data_name);
						}		
					}
				}
				
			}
			
			option.legend = {data:legend_data};
			option.series = series;
						
			if(result_xAxis.length > 1){
				option.grid = {
						y2:90
				};
			}

			// 缩略轴
			option.dataZoom={
		        show : chartSetting.show_chart_shortaxis,
		        realtime : true,
		        start : chartSetting.show_chart_shortaxis_start,
		        end : chartSetting.show_chart_shortaxis_end
		    };

			
			option.tooltip = {
		        trigger: 'axis',
		        backgroundColor:'#FFFFFF',
		        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
		    };
			
			option = chart_option_event.addTooltipFormatter(chart_option_event.chart_type_set.BIAXIAL,option);
		},
		//得到数值的展示模式
		getYaxisMode:function(axis_chartType){
			var mode  = 0;
			if(axis_chartType == this.axis_chartType_set.LINE){
				mode = 0;
			}else if(axis_chartType == this.axis_chartType_set.Z_BAR){
				mode = 1;
			}else if(axis_chartType == this.axis_chartType_set.D_BAR){
				mode = 2;
			}else if(axis_chartType == this.axis_chartType_set.P_BAR){
				mode = 3;
			}
			return mode;
		},
		//数值内的图表展示
		axis_chartType_set:{
			LINE:'c003',//折线图
			Z_BAR:'c004',//簇状柱形图
			D_BAR:'c005',//堆积柱形图
			P_BAR:'c014'//百分比堆积柱形图
		},
		//给一个标记  说明每个元素 需要显示百分比
		toPercentDataList:function(result_yAxis,list){
			var decimal_len = 1;//小数点保留一位
			var _this = this;
			var data_list = [];
			if(list && list.length > 0){
				for(var i = 0;i<list.length;i++){
					var cdata = list[i];
					var _data = cdata.data;
					var new_data = [];
					if(_data && _data.length > 0){
						for(var j = 0;j < _data.length;j++){
							var d = _data[j];
							var total = _this.getResultyAxisTotalByIndex(result_yAxis,j,cdata.yAxisIndex);      
							var val = d.value;
							var old_val = d.value;
							val = parseFloat(val);
							var cl = 0;
							if(val != 0  && total !=0){
								cl = (val*100)/total;
							}
							var rs = cl.toFixed(decimal_len);
							d.value = rs;
							d.real_value = old_val;
							d.showPercent = true;
							new_data.push(d);
						}
					}	
					cdata.data = new_data;
					data_list.push(cdata);
				}
			}
			return data_list;
		},
		getResultyAxisTotalByIndex:function(result_yAxis,index,yAxisIndex){
			var total = 0;
			if(result_yAxis && result_yAxis.length > 0){
				for(var i = 0;i < result_yAxis.length;i++){
					var result = result_yAxis[i];
					var datas = result.data;
					if(result.yAxisIndex != yAxisIndex){
						continue;
					}					
					if(datas && datas.length > 0){
						var _data = datas[index];
						if(_data){
							var value = parseFloat(_data.value);
							total+=value;
						}
						
					}
					
				}
			}
			return total;
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
		getMarkLineByLine2:function(chartSetting,unique_id){
			var _this = this;
			var markLine = {};
			var data = [];
			var guide_list  = chartSetting.guide_list2;
			if(guide_list){
				for(var i = 0;i < guide_list.length;i++){
					var _guide = guide_list[i];
					if(_guide.unique_id == unique_id){
						var _data = new Object();
						if(_guide.type =="0"){
							_data = {name: _guide.guide_name, xAxis: -1,yAxis: _guide.value};						
						}else if(_guide.type =="1"){
							_data = {type:_guide.aggregator,name:_guide.guide_name};
						}
						data.push(_data);
					}
				}
			}
			markLine.symbol =  ['none','arrow'];
			markLine.data = data;
			return markLine;
		},
		getYColors:function(y_list){
			var colors = [];
			if(y_list){
				for(var i = 0; i< y_list.length;i++){
					var yfield = y_list[i];
					colors.push(yfield.color);
				}
			}
			return colors;
		},
		getY2Colors:function(y2_list){
			var colors = [];
			if(y2_list){
				for(var i = 0; i< y2_list.length;i++){
					var yfield = y2_list[i];
					colors.push(yfield.color);
				}
			}
			return colors;
		}
};