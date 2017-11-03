var semantic = {
		tableid:null,
		initPage: function(){
			$('#tipContent').css('display', 'none');
			semanticZTree.initZTree();
			$('#keyword').input(function() {
				setTimeout(function() {
					var key = $("#keyword").val();
					semantic.autocomplete(key);
					$('#tipContent').css('display', 'block');
				}, 30)
			});
		},
		autocomplete: function(key){
			$.ajax({
				type: "post",
				url: "/dashboard/completeTemplate",
				data: {
					key: $.trim(key),
					type: 5,
					showchart: 1,
					dashboardType: 4
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
		replaceData:function(){
			//replaceAid
			if(!this.tableid){
				layer.msg("请选择一个智能语义");
				return;
			}
			
			window.location.href = "/datasources/replacestep1/"+this.tableid+"?from=semantic";
		},
		showTemplatebase: function(id){
			var _this = this;
			var myindex = null;
			$.ajax({
				type: "post",
				url: "/dashboard/gridsterTemplate",
				data: {
					dashboardId: id,
					showTemplatebase: 1
				},
				beforeSend: function(){
					myindex = layer.load(0, {shade: false}); 
				},
				success: function(json){
					if(myindex != null){
						layer.close(myindex);
					}
					if(json.status == "success"){
						var html = json.data['html'];
						var chartsids = json.data['chartsids'];
						var semantic_table_id  = json.data['semantic_table_id'];
						_this.tableid = semantic_table_id;
						$("#charts").html(html);
						if(chartsids){
							gridsterTool.initGridster();
						}else{
							$("#gridster_Box").hide();
							$("#gridster_Box_no").show();
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
		}
}

var semaniticEdit = {
		init: function(){
			var dashboardId = $("#thiszTreeId").val();
			$.ajax({
				type : "post",
				url : "/dashboard/editTemplate",
				data : {
					dashboardId : dashboardId,
				},
				success : function(json) {
					if (json.status == "success") {
						var html = json.data;
						layer_content("编辑仪表盘", layer_common_size, html, function() {
							tag();
						}, function() {
							var dashboard_id = $("#thiszTreeId").val();
							var dashboard_name = $("#edit_dashboard_name").val();
							var tag_id = $("#tag_id").val();
							var description = $("#description").val();
							var nameFlag = checkLen(dashboard_name, 1, 100, "仪表盘名称不可为空", "仪表盘名称不可超过100个字");
							var descriptionFlag = checkLen(description, 0, 100, "", "仪表盘备注不可超过100个字");
							if(!nameFlag || !descriptionFlag){
								return false;
							}
							var data = {
								id: dashboard_id,
								name: dashboard_name,
								tagId: tag_id,
								description: description,
							}
							layer.closeAll();
							semaniticEdit.confirm(data, dashboard_id);
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		confirm : function(data, dashboard_id) {
			$.ajax({
				type: "post",
				url: "/dashboard/update",
				data: data,
				success: function(json) {
					if (json.status == "success") {
						storageService.setParameter("dashboard_id", dashboard_id);
						storageService.setParameter("folder_id", json.data);
						semanticZTree.initZTree();
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		}
};

var semanticDelete = {
		init: function(){
			var dashboard_id = $("#thiszTreeId").val();
			$.ajax({
				type : "post",
				url : "/dashboard/deleteTemplate",
				data : {
					dashboardId : dashboard_id,
				},
				success : function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("删除仪表盘", layer_common_size, html, function(){
							
						}, function(){
							layer.closeAll();
							semanticDelete.confirm(dashboard_id);
						});
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		confirm: function(dashboard_id){
			$.ajax({
				type: "post",
				url: "/dashboard/delete",
				data: {
					id: dashboard_id
				},
				success: function(json){
					if(json.status == "success"){
						/*暂时先这样处理*/
						semanticZTree.initZTree();
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		}
};