//柱状图
var chart_table = {
		guide_formulas:[],
		init:function(option,structure){
			this.guide_formulas = structure.guide_formulas;
			this.render(option, structure);
		},
		settingObj:function(setting_obj){
			setting_obj.table_format_list = [];
			setting_obj.temg_format_list = [];
			setting_obj.tb_merge_cell = true;// 合并同类单位格   true 合并，  false 不合并
			setting_obj.description = "";//图表备注
			setting_obj.top = {type:"",typeName:"项目",reversed:"",reversedName:"前",enabled:"",value:"20"};//条目对象
			setting_obj.tb_statistic = {"col":false,"row":false,"row_pos":"right","col_pos":"bottom","row_formula":"SUM"};
		},
		//坐标轴 的标题  默认是根据数值第一个字段的名称来获取的
		render:function(option, structure_obj){
			var _this =  this;
			var is_tb_merge_cell = structure_obj.chartSetting.tb_merge_cell;
			var x_axisList = structure_obj.container.x_axisList;//Y轴字段集合
			var y_axisList = structure_obj.container.y_axisList;//Y轴字段集合
			var headList = structure_obj.result.headList;
			var columnList = structure_obj.result.columnList;
			var row_statistic = structure_obj.result.row_statistic;
			var col_statistic = structure_obj.result.col_statistic;
			var format_list = structure_obj.chartSetting.table_format_list;
			var tb_statistic = structure_obj.chartSetting.tb_statistic;
			if(x_axisList.length > 0 && y_axisList.length == 0){
				tb_statistic = {"col":false,"row":false,"row_pos":"right","col_pos":"bottom","row_formula":"SUM"};
			}
			
			if(x_axisList.length == 0 && y_axisList.length > 0){
				tb_statistic.col = false;
				tb_statistic.col_pos = "bottom";
			}
			
			var is_row_statistic = !tb_statistic ? false : tb_statistic.row; 
			var is_col_statistic = !tb_statistic ? false : tb_statistic.col; 
			var row_pos = !tb_statistic ? false : tb_statistic.row_pos; 
			var col_pos = !tb_statistic ? false : tb_statistic.col_pos; 
			var rowCount = 0;
			var _sort = structure_obj.chartOperate.sort;
			if(columnList && columnList.length > 0){
				var colList = [];
				var lastVal = "";
				var lastMergeColumDataList = [];
				for(var curColumnNo = 0; curColumnNo < columnList.length; curColumnNo++){
					var _data = columnList[curColumnNo];
					var column_name = _data.column_name;
					var column_unique_id = _data.unique_id;
					var axis = _data.axis;
					rowCount = rowCount == 0 ? _data.data.length : rowCount;
					var curDataList = [];
					var curMergeColumDataList= [];
					if(curColumnNo == 0){
						curMergeColumDataList = _data.data;
					}else{
						for(r = 0; r <　rowCount; r++){
							curMergeColumDataList[r] = lastMergeColumDataList[r] + _data.data[r];
						}
					}
					var hist = {}
					curMergeColumDataList.map( function (a) { if (a in hist) hist[a] ++; else hist[a] = 1; } );
					var col = new Object();
					col.axis = axis;
					col.name = column_name;
					col.dataList = [];
					col.unique_id = column_unique_id;
					var lastVal = "";
					for(d in _data.data){
						var curColumnVal = _data.data[d];
						var td = {};
						var rowspan = 0;
						var lastMergeColumnVal = lastMergeColumDataList.length == 0 ? "" : lastMergeColumDataList[d]; 
						var curMergeColumnVal = lastMergeColumnVal + curColumnVal;
						if(curMergeColumnVal != lastVal){
							rowspan = hist[curMergeColumnVal];
						}
						td.rowspan = rowspan;
						td.value = curColumnVal;
						col.dataList.push(td);
						lastVal = curMergeColumnVal;
					}
					colList.push(col);
					lastMergeColumDataList = curMergeColumDataList;
				}
			}
			var tb = [];
			tb.push("<div class='chart-table' id='表格编辑'>");
			tb.push("<div id='table_box' class='MScroll MScrollyx table_box'>");
			tb.push("<div id='table_content' class='table_content'>");
			tb.push("<table>");
			tb.push("<thead><tr id='fixed_top'>");
			for(c in headList){
				var head = headList[c]; 
				var name = head.name;
				var axis = head.axis;
				var unique_id = head.unique_id;
				if(axis == 'x'){
					var px_class = "";
					var next_type = "";
					var sort_data_type = "";
					if(_sort && _sort.unique_id == unique_id){
						var type = _sort.type;
						if(type == ""){
							px_class = "tbbj_px";
							next_type = "asc";
						}else if(type == "asc"){
							px_class = "tbbj_px tbbj_sx";
							next_type = "desc";
						}else if(type == "desc"){
							px_class = "tbbj_px";
							next_type = "asc";
						}
						sort_data_type  = _sort.data_type;
					}else{
						px_class = "tbbj_px";
						next_type = "asc";
					}
					tb.push("<th class='tb_sort' data-uniq-id='"+unique_id+"' data-axis='x'  data-datatype='"+sort_data_type+"' data-type='"+next_type+"'>"+name+"<i class='"+px_class+"' ></i></th>");
				}
			}
			if(is_row_statistic && "left" == row_pos){
				tb.push("<th>总计</th>");
			}
			for(c in headList){
				var head = headList[c]; 
				var name = head.name;
				var axis = head.axis;
				var unique_id = head.unique_id;
				if(axis == 'y'){
					var px_class = "";
					var next_type = "";
					var sort_data_type = "";
					if(_sort && _sort.unique_id == unique_id){
						var type = _sort.type;
						if(type == ""){
							px_class = "tbbj_px";
							next_type = "asc";
						}else if(type == "asc"){
							px_class = "tbbj_px tbbj_sx";
							next_type = "desc";
						}else if(type == "desc"){
							px_class = "tbbj_px";
							next_type = "asc";
						}
						sort_data_type  = _sort.data_type;
					}else{
						px_class = "tbbj_px";
						next_type = "asc";
					}
					tb.push("<th class='tb_sort' data-uniq-id='"+unique_id+"' data-axis='y' data-datatype='"+sort_data_type+"' data-type='"+next_type+"'>"+name+"<i  class='"+px_class+"' ></i></th>");
				}
			}
			if(is_row_statistic && "right" == row_pos){
				tb.push("<th>总计</th>");
			}
			tb.push("</tr></thead>");
			tb.push("<tbody>");
			if(is_col_statistic && "top" == col_pos){
				var unique_ids = col_statistic.unique_ids;
				tb.push("<tr>");
				tb.push("<td colspan='"+x_axisList.length+"'>总计</td>");
				if(is_row_statistic && "left" == row_pos){
					var col_stat_stat = col_statistic.col_stat_stat;
					col_stat_stat = parseFloat(col_stat_stat);
					var val = chart_option_event.setCountFormatter(col_stat_stat);
					if(val == ""){
						val = "--";
					}
					tb.push("<td>"+val+"</td>");
				}
				
				if(col_statistic.data && col_statistic.data.length > 0){
					for(var i = 0; i < col_statistic.data.length; i++){
						var unique_id =  unique_ids[i];
						var col_statistic_data = col_statistic.data[i];
						if(col_statistic_data != '--'){
							col_statistic_data = parseFloat(col_statistic_data);
							var field = _this.getField(y_axisList,unique_id);
							var fieldMethod =  _this.getSelectFieldMethod(field);
							var val = chart_option_event.setTooltipFormatterParamsOther(field.formatter,field.unit,col_statistic_data);
							tb.push("<td class='"+fieldMethod+"'>"+val+"</td>");
						}else{
							if(col_statistic_data == ""){
								col_statistic_data = "--";
							}
							tb.push("<td >"+col_statistic_data+"</td>");
						}
	
					}
				}
				if(is_row_statistic && "right" == row_pos){
					var col_stat_stat = col_statistic.col_stat_stat;
					col_stat_stat = parseFloat(col_stat_stat);
					var val = chart_option_event.setCountFormatter(col_stat_stat);
					if(val == ""){
						val = "--";
					}
					tb.push("<td>"+val+"</td>");
				}
				tb.push("</tr>");
			}
			for(var i = 0; i < rowCount; i++){
				tb.push("<tr>");
				for(c in colList){
					var col = colList[c]; 
					var axis = col.axis;
					var unique_id = col.unique_id;
					var rowspan = col.dataList[i].rowspan;
					var val = col.dataList[i].value;
					if(axis == 'x'){
						var field = _this.getField(x_axisList,unique_id);
						var fieldMethod =  _this.getSelectFieldMethod(field);
						tb.push("<td class='"+fieldMethod+"' ");
						if(is_tb_merge_cell == true){
							if(rowspan == 0){
								tb.push(" style='display: none;'");	
							}
							if(rowspan > 1){
								tb.push(" rowspan='"+rowspan+"'");	
							}
						}
						if(val == ""){
							val = "--";
						}
						
						tb.push(">" + val + "</td>");
					}
				}
				if(is_row_statistic && "left" == row_pos){
					if(row_statistic && Object.keys(row_statistic).length > 0){
						var  row_statistic_data = row_statistic.data[i];
						row_statistic_data = parseFloat(row_statistic_data);
						var val = chart_option_event.setCountFormatter(row_statistic_data);
						if(val == ""){
							val = "--";
						}
						tb.push("<td>" + val + "</td>");
					}

				}
				for(c in colList){
					var col = colList[c]; 
					var axis = col.axis;
					var val = col.dataList[i].value;
					var yuanshi_val = col.dataList[i].value;
					var unique_id = col.unique_id;
					if(axis == 'y'){
						if( yuanshi_val != '--' && yuanshi_val !=""){
							var field = _this.getField(y_axisList,unique_id);
							var fieldMethod =  _this.getSelectFieldMethod(field);
							val = chart_option_event.setTooltipFormatterParamsOther(field.formatter,field.unit,val);
							var format  = _this.getMeetingFormat(format_list,unique_id,yuanshi_val);
							var style_format = "";
							if(format){
								style_format = "style='background-color:"+format.bgcolor+";color:"+format.color+"'";
							}					
							tb.push("<td class='"+fieldMethod+"' "+style_format+">" + val + "</td>");
						}else{
							if(yuanshi_val == ""){
								val = "--";
							}
							tb.push("<td >" + val + "</td>");
						}
					}
				}
				if(is_row_statistic && "right" == row_pos){
					if(row_statistic && Object.keys(row_statistic).length > 0){
						var  row_statistic_data = row_statistic.data[i];
							row_statistic_data = parseFloat(row_statistic_data);
							var val = chart_option_event.setCountFormatter(row_statistic_data);
							if(val == ""){
								val = "--";
							}
						tb.push("<td>" + val + "</td>");
					}
				}
				tb.push("</tr>");
			}
			if(is_col_statistic && "bottom" == col_pos){
				var unique_ids = col_statistic.unique_ids;
				tb.push("<tr>");
				tb.push("<td colspan='"+x_axisList.length+"'>总计</td>");
				if(is_row_statistic && "left" == row_pos){
					var col_stat_stat = col_statistic.col_stat_stat;
					var val = chart_option_event.setCountFormatter(col_stat_stat);
					if(val == ""){
						val = "--";
					}
					tb.push("<td>"+val+"</td>");
				}
			
				if(col_statistic.data && col_statistic.data.length > 0){
					for(var i = 0; i < col_statistic.data.length; i++){
						var unique_id =  unique_ids[i];
						var col_statistic_data = col_statistic.data[i];
						if(col_statistic_data !='--'){
							col_statistic_data = parseFloat(col_statistic_data);
							var field = _this.getField(y_axisList,unique_id);
							var fieldMethod =  _this.getSelectFieldMethod(field);
							var val = chart_option_event.setTooltipFormatterParamsOther(field.formatter,field.unit,col_statistic_data);
							tb.push("<td class='"+fieldMethod+"'>"+val+"</td>");
						}else{
							if(col_statistic_data == ""){
								col_statistic_data = "--";
							}
							tb.push("<td>"+col_statistic_data+"</td>");
						}
	
					}
				}
				if(is_row_statistic && "right" == row_pos){
					var col_stat_stat = col_statistic.col_stat_stat;
					var val = chart_option_event.setCountFormatter(col_stat_stat);
					if(val == ""){
						val = "--";
					}
					tb.push("<td>"+val+"</td>");
				}
				tb.push("</tr>");
			}
			tb.push("</tbody>");
			tb.push("</table>");
			tb.push("</div>");
			tb.push("<div id='table_fixed_top' class='fixed_top'></div>");
			tb.push("<div id='table_fixed_left' class='fixed_left'></div>");
			tb.push("<div id='table_fixed_left_top' class='fixed_top fixed_left'></div>");
			tb.push("</div>");
			tb.push("</div>");
			option.html = tb.join("");
		},
		tableFixed: function () {
			$('#table_content').css({
				'width': parseFloat($('#table_content table').css('width')) + 24,
				'height': parseFloat($('#table_content table').css('height')) + 24
			})
			$('#table_box').css('height', $('#table_content').css('height'));
			if(document.getElementById('fixed_top')) {
				$('#table_fixed_top').html('<table><tr>' + $('#fixed_top').html() + '</tr></table>');
				var fixed_top_th = $('#fixed_top th,#fixed_top td');
				var table_fixed_top_th = $('#table_fixed_top th,#table_fixed_top td');
				table_fixed_top_th.each(function(i) {
					$(this).css('width', fixed_top_th.eq(i).outerWidth());
				});
			}
			if(document.getElementById('fixed_left')) {
				var fixed_left_table = '<table>';
				var td_left = $('#fixed_left').position().left;
				$('#table_content tr').each(function(i) {
					var fixed_left_table_td = '';
					$(this).children().each(function() {
						if($(this).position().left <= td_left) {
							fixed_left_table_td += this.outerHTML;
						}
					});
					fixed_left_table += '<tr>' + fixed_left_table_td + '</tr>';
					if(i == 0) {
						$('#table_fixed_left_top').html(fixed_left_table + '</table>');
					}
				});
				fixed_left_table += '</table>';
				$('#table_fixed_left').html(fixed_left_table);

				var fixed_left_P_C = $('#fixed_left').parent().children();
				$('#table_fixed_left tr:eq(0)').children().each(function(i) {
					$(this).css({
						'width': fixed_left_P_C.eq(i).css('width'),
						'height': fixed_left_P_C.eq(i).css('height')
					});
				});

				$('#table_fixed_left tr').children().each(function(i) {
					if($(this).attr('rowspan') >= 2) {
						var thisHeight = 36 * $(this).attr('rowspan');
						$(this).css('height', thisHeight);
					}
				});

				$('#table_fixed_left_top tr').children().each(function(i) {
					$(this).css({
						'width': fixed_left_P_C.eq(i).css('width'),
						'height': fixed_left_P_C.eq(i).css('height')
					});
				});
			}
			
			
			$(".tb_sort").click(function(){
				var unique_id = $(this).attr("data-uniq-id");
				var type = $(this).attr("data-type");
				var axis = $(this).attr("data-axis");
				var datatype = $(this).attr("data-datatype");
				var datas = {};
				datas.unique_id = unique_id;
				datas.type = type;	
				datas.axis = axis;
				datas.data_type = datatype;
				$('body[ng-controller="bodyController"]').scope().fn.callbackSort(datas);
			});
		},
		initScroll: function(){
			$("#table_box").mCustomScrollbar({
				axis: "yx",
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				theme: "light-thick",
				callbacks: {
					whileScrolling: function() {
						if($(this).find('.fixed_top').size() > 0) {
							var containerLT = $(this).find('.mCSB_container');
							var top = parseFloat(containerLT.css('top')) * -1;
							$(this).find('.fixed_top').css('top', top);
						}
						if($(this).find('.fixed_left').size() > 0) {
							var containerLT = $(this).find('.mCSB_container');
							var left = parseFloat(containerLT.css('left')) * -1;
							$(this).find('.fixed_left').css('left', left);
						}
					}
				}
			});
			
		},
		getField:function(axisList,unique_id){
			var field = null;
			if(axisList && axisList.length>0){
				for(var i = 0;i< axisList.length;i++){
					if(axisList[i].unique_id == unique_id){
						field = axisList[i];
						break;
					}
				}
			}
			return field;
		},
		getSelectFieldMethod:function(field){
			var class_style= "";
			var select_field_method = field.select_field_method;
			if(select_field_method){
				if(select_field_method == "left"){
					class_style = "text-left";
				}else if(select_field_method == "center"){
					class_style = "text-center";
				}else if(select_field_method == "right"){
					class_style = "text-right";
				}		
			}
			return class_style;
		},
		getMeetingFormat:function(format_list,unique_id,val){
			 var format = {};
			 var x = val;
			 for(var i = 0;i <format_list.length;i++){
				 var data = format_list[i];
				 var formula = data.formula;
				 var _unique_id = data.unique_id;
				 var value = data.value;
				 value = parseFloat(value);
				 var t = value;
				 var a = value;
				 var b= 0;
				 if(data.cal_type == "6"){//区间
					 b = parseFloat(data.value2);
				 } 
				 //满足表达式
				 if(_unique_id == unique_id && eval(formula)){
					 format = data;
					 break;
				 }
			 }
			 return format;
		}
};