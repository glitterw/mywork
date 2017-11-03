var chartAdd = {
		init: function(){
			$.ajax({
				typer: "post",
				url: "/chart/addTemplate",
				data: {},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("添加图表", layer_common_size, html, function(){
							$(document).on('click', '.xztbnx a', function() {
								$(this).addClass('on').siblings('a').removeClass('on');
								if($(this).index('.xztbnx a') == 0) {
									$(this).siblings('input').val('普通图表');
								} else {
									$(this).siblings('input').val('地图图表');
								}
							});
							worktableMenuZtree.initZtree();
							$('#worktable').mCustomScrollbar({
								scrollButtons: {
									enable: false,
									scrollType: "continuous",
									scrollSpeed: 20,
									scrollAmount: 40
								},
								horizontalScroll: false,
							});
							
							$('#worktable_name').input(function() {
								setTimeout(function() {
									var key = $("#worktable_name").val();
									completeZtree.initZtree(key);
								}, 30)
							});
						}, function(){
							var worktable_id = $('#worktable_id').val();
							var chart_name = $("#chart_name").val();
							var worktable_name = $("#worktable_name").val();
							var checked_name = $("#checked_name").val();
							var dashboard_id = storageService.getParameter("dashboard_id");
							var type = null;
							var as = $(".xztbnx").find("a");
							var type = null;
							as.each(function(){
								if($(this).hasClass("on")){
									type = $(this).attr("value");
								}
							});
							if(dashboard_id == null || dashboard_id == ""){
									layer.msg("请指定仪表盘");
									return false;
							}
							if(chart_name == null || chart_name == ""){
								layer.msg("图表名称不能为空");
								return false;
							}
							if(worktable_name == null || worktable_name == ""){
								layer.msg("工作表名称不能为空");
								return false;
							}
							if(checked_name != worktable_name){
								layer.msg("工作表不存在");
								return false;
							}
							if(worktable_id == null || worktable_id == ""){
								layer.msg("请选择工作表");
								return false;
							}
							var data = {
									chartName: chart_name,
									worktableId: worktable_id,
									type: type,
									dashboardId: dashboard_id,
							}
							chartAdd.confirm(data);
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		confirm: function(data){
			$.ajax({
				type : "post",
				url : "/chart/add",
				data : data,
				success : function(json){
					if(json.status == "success"){
						var url = json.data;
						window.location.href = url;
						layer.closeAll();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
}

var chartDelete = {
		init: function(){
			var chartId = $("#chart_id").val();
			$.ajax({
				type: "post",
				url: "/chart/deleteTemplate",
				data: {
					chartId : chartId
				},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("删除图表", layer_small_size, html, function(){
							
						}, function(){
							layer.closeAll();
							chartDelete.confirm(chartId);
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		confirm: function(chartId){
			$.ajax({
				type: "post",
				url: "/chart/delete",
				data: {
					id: chartId
				},
				success: function(json){
					if(json.status == "success"){
						dashboardMenuZtree.initZtree();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
}

var chartMove = {
		init: function(){
			$('#tree_tukuai_bianji').css({
				'display': 'none',
			});
			var chart_id = $("#chart_id").val();
			$.ajax({
				type : "post",
				url : "/chart/moveTemplate",
				data : {
					chartId : chart_id
				},
				success : function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("移动图表", layer_small_size, html, function() {
							folerInputMenuZtree.initZtree();
							$('#folder').mCustomScrollbar({
								scrollButtons: {
									enable: false,
									scrollType: "continuous",
									scrollSpeed: 20,
									scrollAmount: 40
								},
								horizontalScroll: false,
							});
							$('#dashboard').mCustomScrollbar({
								scrollButtons: {
									enable: false,
									scrollType: "continuous",
									scrollSpeed: 20,
									scrollAmount: 40
								},
								horizontalScroll: false,
							});
						}, function() {
							var folder_id = $("#folder_id").val();
							var dashboard_id = $("#dashboard_id").val();
							var data = {
									dashboardId: dashboard_id,
									chartId: chart_id,
									folderId: folder_id
							}
							layer.closeAll();
							chartMove.confirm(data);
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		confirm: function(data){
			$.ajax({
				type: "post",
				url: "/chart/move",
				data: data,
				success: function(json){
					if(json.status == "success"){
						storageService.setParameter("dashboard_id", json.data['dashboardId']);
						storageService.setParameter("folder_id", json.data['folderId']);
						dashboardMenuZtree.initZtree();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
}

var chartCopy = {
		init: function(){
			$('#tree_tukuai_bianji').css({
				'display': 'none',
			});
			var chart_id = $("#chart_id").val();
			$.ajax({
				type: "post",
				url: "/chart/copyTemplate",
				data: {
					chartId: chart_id
				},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("复制图表", layer_small_size, html, function() {
							folerInputMenuZtree.initZtree();
							$('#folder').mCustomScrollbar({
								scrollButtons: {
									enable: false,
									scrollType: "continuous",
									scrollSpeed: 20,
									scrollAmount: 40
								},
								horizontalScroll: false,
							});
							$('#dashboard').mCustomScrollbar({
								scrollButtons: {
									enable: false,
									scrollType: "continuous",
									scrollSpeed: 20,
									scrollAmount: 40
								},
								horizontalScroll: false,
							});
						}, function() {
							var dashboard_id = $("#dashboard_id").val();
							var data = {
									dashboardId: dashboard_id,
									chartId: chart_id
							}
							layer.closeAll();
							chartCopy.confirm(data);
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		confirm: function(data){
			$.ajax({
				type: "post",
				url: "/chart/copy",
				data: data,
				success: function(json){
					if(json.status == 'success'){
						storageService.setParameter("dashboard_id", json.data['dashboardId']);
						storageService.setParameter("folder_id", json.data['folderId']);
						dashboardMenuZtree.initZtree();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
}