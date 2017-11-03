var templatebase = {
		initPage: function(){
			$('#tipContent').css('display', 'none');
			templatebaseZTree.initZTree();
			$('#keyword').input(function() {
				setTimeout(function() {
					var key = $("#keyword").val();
					templatebase.autocomplete(key);
					$('#tipContent').css('display', 'block');
				}, 30)
			});
		},
		autocomplete: function(key){
			var folder_type = $("#folder_type").val();
			var type = 3;
			var dashboardType = 2;
			if(folder_type == "4"){//智能语义模版类型
				type = 4;
				dashboardType = 3;
			}
			$.ajax({
				type: "post",
				url: "/dashboard/completeTemplate",
				data: {
					key: $.trim(key),
					type: type,
					dashboardType: dashboardType
				},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						$("#content").html(html);
						$('#tipContent').mCustomScrollbar({
							scrollButtons: {
								enable: false,
								scrollType: "continuous",
								scrollSpeed: 20,
								scrollAmount: 40
							},
							horizontalScroll: false,
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
		createCharts: function(charts){
			if(charts != null){
				for(var i = 0; i < charts.length; i++){
					var id = charts[i];
					templatebase.flushChart(id);
				}
			}
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
								var id = "chart_" + chart_id;
								initScroll();
								tableFixed();
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
							}
						}
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		useTemplate: function(){
			var folder_type = $("#folder_type").val();
			var type = "dashboard";
			if(folder_type == "4"){//智能语义模版类型
				type = "semantic";
			}
			$.ajax({
				type: "post",
				url: "/templatebase/useTemplate",
				data: {type:type},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("使用模板方式", layer_common_size, html, function(){
							
						}, function(){
							var operation = $("input[type='radio']:checked").val();
							if(operation == undefined){
								layer.msg("请选择使用方式");
								return false;
							}
							var dashboard_id = storageService.getParameter("templatebase_dashboard_id");
							console.log("使用:" + dashboard_id);
							var data = {
								operation: operation,
								dashboardId: dashboard_id,
								type: type
							}
							layer.closeAll();
							templatebase.doOperation(data);
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		doOperation: function(data){
			var myindex = layer.load(0, {shade: false}); 
			$.ajax({
				type: "post",
				url: "/templatebase/useAndChange",
				data: data,
				success: function(json){
					if(myindex != null){
						layer.close(myindex);
					}
					if(json.status == "success"){
						var type = json.data['type'];
						var tableId = json.data['tableId'];
						
						var html = json.data['html'];
						var dashboardId = json.data['dashboardId'];
						var folderId = json.data['folderId'];
						var attachs = json.data['attachs'];
						if(type == 'use_and_change'){
							layer.open({
								title: "上传填充数据",
								type: 1,
								area: "500px", //宽高
								content: html,
								btn: ['立即上传替换', '稍后上传替换'],
								success: function(){
									if(attachs != null){
										for(var i = 0;i < attachs.length; i++){
											var fileName = attachs[i].file_name;
											var path = attachs[i].file_path;
											var id = attachs[i].id;
											var html = '<a id="file_' + id + '" href="/common/download?fileName='+encodeURI(encodeURI(fileName))+'&path=' + path + '"><p>下载</p></a>';
											$("#download").append(html);
											$("#file_" + id + ">p").trigger('click');
										}
									}
								},
								yes: function(index, layero){
									window.location.href="/dashboard/changTableData?tableid=" + tableId;
								},
								btn2: function(index, layero){
									var folder_type = $("#folder_type").val();
									if(folder_type == "4"){//智能语义模版类型
										storageService.setParameter("semantic_dashboard_id", dashboardId);
										storageService.setParameter("semantic_folder_id", folderId);
										window.location.href="/semantic/index";
									}else{
										storageService.setParameter("dashboard_id", dashboardId);
										storageService.setParameter("folder_id", folderId);
										window.location.href="/dashboard/index";
									}
								},
								end: function(index, layero){
									layer.close(index);
								}
							});
						}else{
							var folder_type = $("#folder_type").val();
							if(folder_type == "4"){//智能语义模版类型
								storageService.setParameter("semantic_dashboard_id", dashboardId);
								storageService.setParameter("semantic_folder_id", folderId);
								window.location.href="/semantic/index";
							}else{
								storageService.setParameter("dashboard_id", dashboardId);
								storageService.setParameter("folder_id", folderId);
								window.location.href="/dashboard/index";
							}
						}
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
}