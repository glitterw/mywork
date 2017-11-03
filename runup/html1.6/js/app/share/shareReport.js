var shareReport = {
		initPage : function(){
			var shareId = $("#shareId").val();
			shareReport.fill(shareId);
		},
		fill : function(shareId){
			$("#dashboard_name").html('');
			$("#fenxiang_content").html('');
			$.ajax({
				type : "post",
				url : "/share/fill",
				data : {
					shareId: shareId
				},
				success : function(json){
					if(json.status == "success"){
						var charts = json.data['charts'];
						var chartIds = json.data['chartId'];
						var dashboard_name = json.data['dashboard_name'];
						var nickname = json.data['username'];
						var update_time = json.data['update_time'];
						var type = json.data['type'];
						var theme = json.data['theme'];
						$("#type").val(type);
						$("#dashboard_name").html(dashboard_name);
						$("#fenxiang_content").html(charts);
						$("#nickname").html(nickname);
						$("#update_time").html(update_time);
						initScroll();
						tableFixed();
						shareReport.gridster();
						for(var i = 0; i < chartIds.length; i++){
							var id = chartIds[i];
							shareReport.flushChart(id);
						}
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		gridster: function(){
			var newsize_x, newsize_y;
			var gridsterW = $('.gridster').width();
			var newStyle = "";
			var lieshu = 1528 / (50 + 5);
			newsize_x = 50;
			newsize_y = 20;

			for (var i = 0, len = lieshu * 100; i < len; i++) {
				newStyle += "[data-sizex='" + (i + 1) + "']{ width:"
						+ (newsize_x + (newsize_x + 20) * i) + "px; }   "
				newStyle += "[data-sizey='" + (i + 1) + "']{ height:"
						+ (newsize_y + (newsize_y + 10) * i) + "px; }  "
				newStyle += "[data-col='" + (i + 1) + "']{ left:"
						+ (10 + (newsize_x + 20) * i) + "px; }  "
				newStyle += "[data-row='" + (i + 1) + "']{ top:"
						+ (5 + (newsize_y + 10) * i) + "px; }  "
			}
			if (!document.getElementById('newStyle')) {
				var d = document;
				var tag = d.createElement('style');
				d.getElementsByTagName('head')[0].appendChild(tag);
				tag.id = 'newStyle';
				tag.setAttribute('type', 'text/css');
			}
			var tag = document.getElementById('newStyle');
			if (tag.styleSheet) {
				tag.styleSheet.cssText = newStyle;
			} else {
				tag.appendChild(document.createTextNode(newStyle));
			}
			var _thisH = document.getElementById('fenxiang_content').scrollHeight;
			$('#fenxiang_content').css('height', _thisH);
		},
		flushChart: function(chart_id){
			$.ajax({
				type : "post",
				url : "/share/fillChart",
				data : {
					id : chart_id
				},
				success : function(json){
					if(json.status == "success"){
						$("#chart_" + chart_id).html('');
						var data = json.data['option'];
						var theme = json.data['theme'];
						if(data != null){
							var chartType = json.data['chartType'];
							var option = eval('(' + data + ')');
							if(chart_option_event.chart_type_set.TABLE == chartType){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
								tableFixed();
								initScroll();
							}else if(chart_option_event.chart_type_set.TEXT == chartType){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
							}else if(chart_option_event.chart_type_set.INDEX == chartType){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
							}else if (chart_option_event.is_semantic_chart(chartType)){
								var html = option.html;
								$("#chart_" + chart_id).html(html);
								var _width = $('.semantic-view-22').parent().width() / $('.semantic-view-22').width() / 1.12;
								var _height = $('.semantic-view-22').parent().height() / $('.semantic-view-22').height() / 1.12;
								var _scale = _width<_height?_width:_height;
								$('.semantic-view-22').css('transform', 'scale(' + _scale + ')');
							}else{
								option.theme = theme;
								option = chart_option_event.addTooltipFormatter(chartType, option);
								chart_option_event.renderTheme(chartType,option);
								var chart = echarts.init(document.getElementById('chart_' + chart_id));
								if(option != null){
									chart.setOption(option);
								}
							}
						}
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		back: function(){
			var type = $("#type").val();
			var url = "/dashboard/index";
			if(type == 6){
				url = "/reporting"
			}
			window.location.href=url;
		}
}