var chartFullScreen = {
		scan: function(chart_id){
			$.ajax({
				type: "post",
				url: "/dashboard/fullscreenTemplate",
				data: {
					chart_id: chart_id
				},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						
						/*填充全屏模板*/
						$("#fullscreen").html(html);
						$('.quanpingyulan').css('display', 'block');
						$(document).on('click', '#exitFullscreen', function() {
							$('.quanpingyulan').css('display', 'none');
							if(auto != null){
								window.clearInterval(auto);
							}
							return false;
						});
						
						/*存储点开全屏的图表，默认不显示tag，不打开更新图表*/
						storageService.setParameter("tmp_chart_id", chart_id);
						storageService.setParameter("tag", false);
						storageService.setParameter("update", false);
						
						/*绘图*/
						chartFullScreen.drawChart();
						
						/*自动播放、停止自动播放*/
						var auto;
						$(document).on('click', '.yulan_footer .bofang', function() {
							$(this).toggleClass('not');
							if($(this).is('.not')) {
								auto = chartFullScreen.autoPlayStart();
							} else {
								if(auto != null){
									window.clearInterval(auto);
								}
							}
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		drawChart: function(){
			var chartId = storageService.getParameter("tmp_chart_id");
			$.ajax({
				type: "post",
				url: "/chart/fill",
				data: {
					id: chartId
				},
				success: function(json){
					if(json.status == "success"){
						var data = json.data['option'];
						var chartName = json.data['chartName'];
						var updateTime = json.data['updateTime'];
						var chartType = json.data['chartType'];
						var description = json.data['description'];
						$("#tmp_chart_name").html(chartName);
						$("#tmp_updateTime").html(updateTime);
						$("#tmp_description").html(description);
						var flag = storageService.getParameter("update");
						if(flag){
							$("#updata_data_div").css("display","block");
							$("#chart_div").css("width","calc(100% - 216px)");
						}else{
							$("#updata_data_div").css("display","none");
							$("#chart_div").css("width","100%");
						}
						
						if(data != null){
							var option = eval('(' + data + ')');
							if(chart_option_event.chart_type_set.TABLE == chartType){
								$("#ifShowTag").css("display","none");
								var html = option.html;
								$('#chart_div').html(html);
								initScroll();
								tableFixed();
							}else if(chart_option_event.chart_type_set.INDEX == chartType){
								$("#ifShowTag").css("display","none");
								var html = option.html;
								$('#chart_div').html(html);
							}else if (chart_option_event.is_semantic_chart(chartType)){
								var html = option.html;
								$("#chart_div").html(html);
							}else{
								$("#ifShowTag").css("display","block");
								option.theme = storageService.getTheme();
								option = chart_option_event.addTooltipFormatter(chartType, option);
								option = chart_option_event.setLabelShow(storageService.getParameter("tag"), option);
								chart_option_event.renderTheme(chartType,option);
								var chart = echarts.init(document.getElementById('chart_div'));
								if(option != null){
									chart.setOption(option);
								}

							}
						}
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		nextChart: function(){
			$("#chart_div").html('');
			var chart_id = storageService.getParameter("tmp_chart_id");
			var lis = $("#charts").find("li");
			var len = lis.length;
			var array = [];
			for(var i = 0; i < len; i++){
				array[i] = $(lis[i]).attr("id");
			}
			var id = null;
			for(var j = 0; j < len; j++){
				if(array[j] == chart_id){
					id = array[(j + 1)%len];
				}
			}
			storageService.setParameter("tmp_chart_id", id);
			chartFullScreen.drawChart();
		},
		preChart: function(){
			$("#chart_div").html('');
			var chart_id = storageService.getParameter("tmp_chart_id");
			var lis = $("#charts").find("li");
			var len = lis.length;
			var array = [];
			for(var i = 0; i < len; i++){
				array[i] = $(lis[i]).attr("id");
			}
			var id = null;
			for(var j = 0; j < len; j++){
				if(array[j] == chart_id){
					if(j == 0){
						id = array[len - 1];
					}else{
						id = array[j - 1];
					}
				}
			}
			storageService.setParameter("tmp_chart_id", id);
			chartFullScreen.drawChart();
		},
		autoPlayStart: function(){
			var auto = window.setInterval(function(){
				chartFullScreen.nextChart();
			}, 5000); 
			return auto;
		},
		showUpdate:function(){
			var flag = $("#showUpdate").prop("checked");
			storageService.setParameter("update", flag);
			chartFullScreen.drawChart();
		},
		showTag: function(){
			var flag = $("#echartTag").prop("checked");
			storageService.setParameter("tag", flag);
			chartFullScreen.drawChart();
		},
		exportChartFull: function(){
			var downloadName = $("#tmp_chart_name").html();
			html2canvas($("#chart_div"), {
				onrendered: function(canvas) {
					var url = canvas.toDataURL();
					//以下代码为下载此图片功能
					var triggerDownload = $("<a>").attr("href", url).attr("download", downloadName + ".png").appendTo("body");
					triggerDownload[0].click();
					triggerDownload.remove();
					$('html').css('height', '100%');
				}
			});
		}
}