var gridster;
var report_preview = {
		initPage:function(){
			var base_dashboardid =  $("#base_dashboardid").val();
			layer.load(0, {shade: false});
			$.ajax({
				type: "post",
				url: "/reporting/findReporting",
				data: {
					dashboardid:base_dashboardid
				},
				success: function(json){
					layer.closeAll('loading');
					if(json.status == "success"){
						var data = json.data;
						var chartIds = data.chartIds;
						$("#fill_box").html(data.templateContent);
						$("gridster_Box").mCustomScrollbar({
							scrollButtons : {
								enable : false,
								scrollType : "continuous",
								scrollSpeed : 20,
								scrollAmount : 40
							},
							horizontalScroll : false,
						});
						
						gridster = $(".gridster ul").gridster({ //通过jquery选择DOM实现gridster  
							widget_base_dimensions: [50, 20], //模块的宽高 [宽,高]  
							widget_margins: [10, 5], //模块的间距 [上下,左右] 
							resize: {
								min_size: [12, 5],
								max_size: [12, 400],
								enabled: false,
								stop: function(e, ui,$widget) {
									//拖拽缩放结束相关点
									v//ar chart_id = $widget.attr("id");
									//$scope.fn.flushChart(chart_id);
									//$scope.fn.updatePosition(dashboard_id);
								}
							}
						}).data('gridster');
						gridster.disable();
						if(chartIds){
							for(var i = 0; i < chartIds.length; i++){
								var id = chartIds[i];
								report_preview.flushChart(id);
							}
	
							
						}
						
					}else{
						
					}
					
				}
			});	
		},
		back:function(){
			var base_dashboardid =  $("#base_dashboardid").val();
			window.location.href ="/reporting/editing/"+base_dashboardid;
		},
		flushChart:function(chart_id){
			layer.load(0, {shade: false});
			$.ajax({
				type: "post",
				url: "/reporting/edit/fill",
				data: {
					id: chart_id
				},
				success: function(json){
					layer.closeAll('loading');
					if(json.status == "success"){
						$("#chart_" + chart_id).html('');
						var data = json.data['option'];
						if(data != null){
							var chartType = json.data['chartType'];
							var option = eval('(' + data + ')');
							if(chart_option_event.chart_type_set.TABLE == chartType){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
								initScroll();
								tableFixed();
								$("#chart_" + chart_id).find(".tbbj_px").removeClass("tbbj_px");
								var height = $("#chart_"+chart_id).height();
								var h = Math.ceil((height+20)/30);
								gridster.resize_widget($('#'+chart_id),12, h);
							}else if(chart_option_event.chart_type_set.TEXT == chartType){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
								var height = $("#chart_"+chart_id).height();
								var h = Math.ceil((height+20)/30);
								gridster.resize_widget($('#'+chart_id),12, h);
							}else if(chart_option_event.chart_type_set.INDEX == chartType){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
								var height = $("#chart_"+chart_id).height();
								var h = Math.ceil((height+20)/30);
								gridster.resize_widget($('#'+chart_id),12, h);
							}else if (chart_option_event.is_semantic_chart(chartType)){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
								var _width = $('.semantic-view-22').parent().width() / $('.semantic-view-22').width() / 1.12;
								var _height = $('.semantic-view-22').parent().height() / $('.semantic-view-22').height() / 1.12;
								var _scale = _width<_height?_width:_height;
								$('.semantic-view-22').css('transform', 'scale(' + _scale + ')');
							}else{
								option.theme = storageService.getTheme();
								option = chart_option_event.addTooltipFormatter(chartType, option);
								chart_option_event.renderTheme(chartType,option);
								var chart = echarts.init(document.getElementById('chart_' + chart_id));
								if(option != null){
									chart.setOption(option);
								}
								$(window).resize(function() {
									chart.resize();
								});
							}
						}
					}
				}
			});
		}
};


$(function(){
	report_preview.initPage();
});