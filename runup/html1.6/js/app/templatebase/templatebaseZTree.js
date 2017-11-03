var templatebaseZTree = {
		initZTree: function(){
			var folder_type = $("#folder_type").val();
			var storage_theme = storageService.getTheme();
			var zTI = {
					I_1_O: "/css/"+storage_theme+"/zTree_v3/img/wenjianjia_2.png",
					I_1_C: "/css/"+storage_theme+"/zTree_v3/img/wenjianjia_1.png",
					I_2_O: "/css/"+storage_theme+"/zTree_v3/img/wenjianjia_4.png",
					I_2_C: "/css/"+storage_theme+"/zTree_v3/img/wenjianjia_3.png",
					Icon: "/css/"+storage_theme+"/zTree_v3/img/wenjianjia_5.png",
					Izuijin: "/css/"+storage_theme+"/zTree_v3/img/zuijin.png",
					I_Child_O: "/img/"+storage_theme+"/gzb_sj_on.png",
					I_Child_C: "/img/"+storage_theme+"/gzb_sj.png",
			};
			var setting = {
				view: {
					dblClickExpand: false,
					showLine: false,
					showTitle: false,
					addHoverDom: templatebaseZTree.mouseenterFn,
					removeHoverDom: templatebaseZTree.mouseleaveFn,
				},
				data: {
					simpleData: {
						enable: true
					},
				},
				callback: {
					onClick: templatebaseZTree.onClick,
					beforeDrag: templatebaseZTree.beforeDrag,
					beforeClick: templatebaseZTree.beforeClick
				}
			};
			$.ajax({
				type: "post",
				url: "/folder/list",
				data: {
					type: folder_type
				},
				success: function(json){
					if(json.status == "success"){
						var data = json.data;
						var zNodes = [];
						var count = 0;
						for(var i = 0; i < data.length; i++){
							var isParent = data[i].parent;
							if(isParent){
								zNodes[i] = {
									id: data[i].id,
									pId: data[i].pId,
									name: cutStr(data[i].name, 10),
									sourceName: data[i].name,
									isParent: isParent,
									icon: zTI.I_1_O,
									iconOpen: zTI.I_1_O,
									iconClose: zTI.I_1_C,
								}
							}else{
								zNodes[i] = {
									id: data[i].id,
									pId: data[i].pId,
									name: cutStr(data[i].name, 10),
									sourceName: data[i].name,
									isParent: isParent,
									iconOpen: zTI.I_2_O,
									iconClose: zTI.I_2_C,
									icon: zTI.I_2_O,
								}
							}
						}
						/*静态加载zTree节点树*/
						$.fn.zTree.init($("#treeDom"), setting, zNodes);
						completeLi();
						var dashboardId = storageService.getParameter("templatebase_dashboard_id");
						var folderId = storageService.getParameter("templatebase_folder_id");
						sign(dashboardId, folderId);
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		onClick: function(e, treeId, treeNode) {
			$("#tamplatebaseName").html(treeNode['sourceName']);
			storageService.setParameter("templatebase_dashboard_id", treeNode['id']);
			storageService.setParameter("templatebase_folder_id", treeNode['pId']);
			$("#gridster_Box").show();
			templatebase.showTemplatebase(treeNode['id']);
		},
		beforeDrag: function(treeId, treeNodes) {
			return false;
		},
		beforeClick: function(treeId, treeNode, clickFlag){
			var zTree = $.fn.zTree.getZTreeObj("treeDom");
			if(!treeNode.isParent){
			}else{
				zTree.expandNode(treeNode);
				completeLi();
				return false;
			}
		},
		mouseenterFn: function(treeId, treeNode) {
			if(!treeNode.isParent) {
				var thisLi = $(document.getElementById(treeNode['tId']));
				var name = treeNode['sourceName'];
				$("#tree_xiangqing_nc").html(name);
				$('#tree_xiangqing').css({
					'display': 'block',
					'top': thisLi.offset().top
				});
			}
		},
		mouseleaveFn: function(treeId, treeNode) {
			$('#tree_xiangqing').css('display', 'none');
		}
}