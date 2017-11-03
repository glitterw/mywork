var dashboard = {
	initPage : function() {
		/*初始化左边文件夹树结构*/
		dashboardMenuZtree.initZtree();
		
		/*补全浮层默认隐藏*/
		$('#tipContent').css('display', 'none');
		
		/*gridster空间自适应方法*/
		gridsterTool.resizeChart();
		
		$(document).on('click', '.xg_gengduo', function() {
			$("#chart_id").val($(this).parent().parent().parent().parent().attr("id"));
			$('#tree_tukuai_bianji').css({
				'display' : 'block',
				'left' : $(this).offset().left + 13,
				'top' : $(this).offset().top + 20
			});
		});

		/*补全功能：根据key查询关联仪表盘*/
		$('#keyword').input(function() {
			setTimeout(function() {
				var key = $("#keyword").val();
				dashboard.autocomplete(key);
				$('#tipContent').css('display', 'block');
			}, 30)
		});
	},
	autocomplete: function(key) {
		$.ajax({
			type: "post",
			url: "/dashboard/completeTemplate",
			data: {
				key: $.trim(key),
				type: 1,
				dashboardType: 1
			},
			success: function(json) {
				if (json.status == "success") {
					var html = json.data;
					$("#content").html(html);
					$('#tipContent').mCustomScrollbar({
						scrollButtons : {
							enable : false,
							scrollType : "continuous",
							scrollSpeed : 20,
							scrollAmount : 40
						},
						horizontalScroll : false,
					});
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	showTemplatebase: function(id){
		$.ajax({
			type: "post",
			url: "/dashboard/gridsterTemplate",
			data: {
				dashboardId: id,
				showTemplatebase: 1
			},
			success: function(json){
				if(json.status == "success"){
					var html = json.data['html'];
					var chartsids = json.data['chartsids'];
					$("#charts").html(html);
					gridsterTool.initGridster(chartsids);
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	exportDashbaord: function(dashboard_id) {
		$.ajax({
			type : "post",
			url : "/dashboard/exportTemplate",
			data : {
				dashboardId : dashboard_id
			},
			success : function(json) {
				if(json.status == "success"){
					var html = json.data['html'];
					var dashboard_name = json.data['dashboardName'];
					layer_content("导出", layer_small_size, html, function() {
						$('.daochuybp_a').click(function() {
							$(this).addClass('on').siblings().removeClass('on');
							$(this).siblings('input').val($(this).index('.daochuybp_a') + 1);
						});
					}, function() {
						var downloadName = dashboard_name;
						
						var chart = $("#charts");
						var height = $("#charts").height();
						var width = $("#charts").width();
						if(height != 0 && width != 0){
							$('html').css('height', 'auto');
							html2canvas(chart, {
								onrendered: function(canvas) {
									$('html').css('height', '100%');
									var iscale = $("#dashboard_size").find("a.on").attr("value"); //缩放倍数
									var url = canvas.toDataURL();
									var img = document.createElement("img");
									img.src = url;
									img.onload=function () {
										var canvas2 = document.createElement("canvas");
										canvas2.width = (canvas.width) * iscale;
										canvas2.height = (canvas.height) * iscale;
										var ctx2 = canvas2.getContext("2d");
										ctx2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
										var img2 = document.createElement("img");
										img2.src = canvas2.toDataURL();
										img2.onload=function () {
											//以下代码为下载此图片功能
											var triggerDownload = $("<a>").attr("href", url).attr("download", downloadName + ".png").appendTo("body");
											triggerDownload[0].click();
											triggerDownload.remove();
											layer.closeAll();
											console.log(111)
										}
									}
									//document.removeChild(img);
									//document.removeChild(img2);
								}
							});
						}else{
							layer.closeAll();
							layer.msg("仪表为空，无法导出");
						}
					});
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	sharedDashboard: function() {
		var storage_theme = storageService.getTheme();

		var dashboardId = storageService.getParameter("dashboard_id");
		var data = {
			dashboardId: dashboardId
		}
		$.ajax({
			type: "post",
			url: "/share/sharedTemplate",
			data: data,
			success: function(json) {
				if(json.status == "success"){
					var shareId = json.data['shareId'];
					var url = window.location.origin + "/share/get?type=dashboard&shareId=" + shareId;
					$('#fenxiangybp').css('display', 'block');
					$("#check_shared").attr("href", url);
					$('body').addClass('mengceng');
					window._bd_share_config = {
						//此处添加分享具体设置
						common: {
							bdText: '分享的内容',
							bdDesc: '分享的摘要',
							bdUrl: url, //分享的Url地址
							onBeforeClick: function(cmd, config) { /*在用户点击分享按钮时执行代码，更改配置。cmd为分享目标id， config为当前设置， 返回值为更新后的设置。*/
								var share_textarea = document.getElementById('share_textarea');
								var _bdText, _bdDesc;
								if((share_textarea.value != '') && (share_textarea.value != undefined)) {
									_bdText = _bdDesc = share_textarea.value;
								};
								if('条件') {
									return {
										bdText: _bdText ? _bdText : '分享的内容',
										bdDesc: _bdDesc ? _bdDesc : '分享的摘要',
										bdUrl: url,
									}
								}
							}
						},
						share: { bdCustomStyle: "/css/"+storage_theme+"/common.css" },
					}
					//以下为js加载部分
					with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	flushCharts: function(charts){
		$.ajax({
			type: "post",
			url: "/chart/fills",
			data: {
				id: charts
			},
			success: function(json){
				if(json.status == "success"){
					var charts = json.data;
					for(var i = 0; i < charts.length; i++){
						var chart = charts[i];
						var chart_id = chart['id']
						var chart_option = chart['option']
						$("#chart_" + chart_id).html('');
						var chartType = charts[i]['chartType'];
						if(chart_option == null || chart_option == ""){
							continue;
						}
						var option = eval('(' + chart_option + ')');
						if(chart_option_event.chart_type_set.TABLE == chartType){
							var html = option.html;
							$("#chart_" + chart_id).html(html);
							initScroll();
							tableFixed();
							$("#chart_" + chart_id).find(".tbbj_px").removeClass("tbbj_px");
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
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	flushChart: function(chart_id){
		$.ajax({
			type: "post",
			url: "/chart/fill",
			data: {
				id: chart_id
			},
			success: function(json){
				if(json.status == "success"){
					$("#chart_" + chart_id).html('');
					var data = json.data['option'];
					if(data != null && data != ""){
						var chartType = json.data['chartType'];
						var option = eval('(' + data + ')');
						if(chart_option_event.chart_type_set.TABLE == chartType){
							var html = option.html;
							$("#chart_" + chart_id).html(html);
							initScroll();
							tableFixed();
							$("#chart_" + chart_id).find(".tbbj_px").removeClass("tbbj_px");
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
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	exportChart: function(){
		var chart_id = $("#chart_id").val();
		$.ajax({
			type: "post",
			url: "/chart/exportTemplate",
			data: {
				chartId: chart_id
			},
			success: function(json){
				var html = json.data['html'];
				var chart_name = json.data['chartName'];
				if (json.status == "success") {
					layer_content("导出图片", '500px', html, function() {
						$('.daochuybp_a').click(function() {
							$(this).addClass('on').siblings().removeClass('on');
							$(this).siblings('input').val($(this).index('.daochuybp_a') + 1);
						});
						$(document).on('click', '.xzz_jia', function() {
							var thisSiblings = $(this).siblings('.xzz');
							thisSiblings.val(parseInt(thisSiblings.val()) + 1);
						});
						$(document).on('click', '.xzz_jian', function() {
							var thisSiblings = $(this).siblings('.xzz');
							thisSiblings.val(parseInt(thisSiblings.val()) - 1);
						});
					}, function() {
						var downloadName = chart_name;
						var width = null;
						var height = null;
						var value = $("#chart_size").find("a.on").attr('value');
						if(value == "width"){
							width = $("#width").val();
						}
						if(value == "height"){
							height = $("#height").val();
						}
						$('html').css('height', 'auto');
						html2canvas($("#" + chart_id), {
							onrendered: function(canvas) {
								var iscale = 1; //缩放倍数
								if(width != null){
									iscale = canvas.width  / width;
								}else if(height != null){
									iscale = canvas.height / height;
								}else{
									iscale = value;
								}
								var url = canvas.toDataURL();
								var img2 = document.createElement("img");
								img2.src = url;
								$('body').append(img2);
								img2.onload=function(){
									var canvas2 = document.createElement("canvas");
									canvas2.width = (canvas.width) * iscale;
									canvas2.height = (canvas.height) * iscale;
									var ctx2 = canvas2.getContext("2d");
									ctx2.drawImage(img2, 0, 0, canvas2.width, canvas2.height);
									var url2 = canvas2.toDataURL();
									
									//以下代码为下载此图片功能
									var triggerDownload = $("<a>").attr("href", url2).attr("download", downloadName + ".png").appendTo("body");
									triggerDownload[0].click();
									triggerDownload.remove();
									$('html').css('height', '100%');
								};
							}
						});
						layer.closeAll();
					});
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	}
}

//解决链接复制只能复制当前页面链接问题
var myCopyShare = function(mcopy) {
	/*
	 * 
	 */
	(function() {
		var cmd = mcopy.id,
			config = window._bd_share_config.common,
			onBeforeClick = window._bd_share_config.common.onBeforeClick,
			_config, _bdUrl;
		if(onBeforeClick) {
			_config = onBeforeClick(cmd, config), _bdUrl = _config.bdUrl ? _config.bdUrl : config.bdUrl
		} else {
			_bdUrl = config.bdUrl ? config.bdUrl : window.location.href
		};
		var Url2 = document.createElement("textarea");
		Url2.value = _bdUrl, Url2.style.opacity = '0', Url2.style.position = 'absolute', Url2.style.left = '0', Url2.style.top = '0', Url2.style.zIndex = '-100', document.getElementsByTagName('body')[0].appendChild(Url2);
		Url2.select();
		document.execCommand("Copy");
		document.getElementsByTagName('body')[0].removeChild(Url2);
	})();
	/*
	 * 
	 */
	alert("链接复制好啦，可以贴粘粘贴啦");
};
