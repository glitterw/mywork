var dashboardAdd = {
		init: function(){
			$.ajax({
				type: "post",
				url: "/dashboard/addTemplate",
				data: {},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("新建仪表盘", layer_common_size, html, function(){
							folderZtree.initZtree(true, 1);
							$('#add_dashboard').mCustomScrollbar({
								scrollButtons: {
									enable: false,
									scrollType: "continuous",
									scrollSpeed: 20,
									scrollAmount: 40
								},
								horizontalScroll: false,
							});
							tag();
						}, function(){
							var folderId = $("#folder_id").val();
							var dashboardName = $("#add_boardname").val();
							var tagId = $("#tag_id").val();
							var description = $("#description").val();
							if(checkNull(folderId)){
								layer.msg("请选择文件夹");
								return false;
							}
							var nameFlag = checkLen(dashboardName, 1, 100, "仪表盘名称不可为空", "仪表盘名称不可超过100个字");
							var descriptionFlag = checkLen(description, 0, 100, "", "仪表盘备注不可超过100个字");
							if(!nameFlag || !descriptionFlag){
								return false;
							}
							
							var data = {
								folderId: folderId,
								dashboardName: dashboardName,
								tagId: tagId,
								description: description
							}
							dashboardAdd.confirm(data);
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
				url: "/dashboard/add",
				data: data,
				success: function(json){
					if(json.status == "success"){
						layer.closeAll();
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

var dashboardDelete = {
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
							dashboardDelete.confirm(dashboard_id);
						});
					}
					if(json.status == "error"){
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
						dashboardMenuZtree.initZtree();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
};

var dashboardMove = {
		init: function(){
			var dashboard_id = $("#thiszTreeId").val();
			$.ajax({
				type: "post",
				url: "/dashboard/moveTemplate",
				data: {
					dashboardId: dashboard_id
				},
				success: function(json){
					if (json.status == "success") {
						var html = json.data;
						layer_content("移动仪表盘", layer_small_size, html, function() {
							folderZtree.initZtree(true, 1);
							$('#scroll').mCustomScrollbar({
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
							var dashboard_name = $("#new_dashboard_name").val();
							if(checkNull(folder_id)){
								layer.msg("请选择文件夹");
								return false;
							}
							var flag = checkLen(dashboard_name, 1, 100, "仪表盘名称不可为空", "仪表盘名称不可超过100个字");
							if(!flag){
								return false;
							}
							var data = {
									dashboardId: dashboard_id,
									dashboardName: dashboard_name,
									folderId: folder_id
							}
							dashboardMove.confirm(data);
						});
					}
				}
			});
		},
		confirm: function(data){
			$.ajax({
				type: "post",
				url: "/dashboard/move",
				data: data,
				success : function(json){
					if(json.status == "success"){
						layer.closeAll();
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

var dashboardCopy = {
		init: function(){
			var dashboard_id = $("#thiszTreeId").val();
			$.ajax({
				type: "post",
				url: "/dashboard/copyTemplate",
				data: {
					dashboardId : dashboard_id
				},
				success: function(json){
					if (json.status == "success") {
						var html = json.data;
						layer_content("复制仪表盘", layer_small_size, html, function() {
							folderZtree.initZtree(true);
							$('#scroll').mCustomScrollbar({
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
							var dashboard_name = $("#new_dashboard_name").val();
							if(checkNull(folder_id)){
								layer.msg("请选择文件夹");
								return false;
							}
							var flag = checkLen(dashboard_name, 1, 100, "仪表盘名称不可为空", "仪表盘名称不可超过100个字");
							if(!flag){
								return false;
							}
							var data = {
									dashboardId : dashboard_id,
									dashboardName : dashboard_name,
									folderId : folder_id
							}
							dashboardCopy.confirm(data);
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
				url : "/dashboard/copy",
				data : data,
				success : function(json){
					if(json.status == "success"){
						layer.closeAll();
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
};

var dashboardEdit = {
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
							var dashboard_id = $("#dashboard_id").val();
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
							dashboardEdit.confirm(data, dashboard_id);
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
						dashboardMenuZtree.initZtree();
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		}
};