var semanticZTree = {
		initZTree: function(){
			var folder_type = 5;
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
				edit: {
					enable: true,
					renameTitle: "",
					removeTitle: ""
				},
				view: {
					dblClickExpand: false,
					showLine: false,
					showTitle: false,
					addHoverDom: semanticZTree.mouseenterFn,
					removeHoverDom: semanticZTree.mouseleaveFn
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: semanticZTree.onClick,
					beforeDrag: semanticZTree.beforeDrag,
					beforeClick: semanticZTree.beforeClick,
					beforeRemove: semanticZTree.beforeRemove
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
						var dashboardIsNull = true;
						$("#gridster_Box_no").hide();
						if(data && data.length > 0){			
							for(var i = 0; i < data.length; i++){
								var isParent = data[i].parent;
								if(isParent){
									zNodes[i] = {
										id: data[i].id,
										pId: data[i].pId,
										name: cutStr(data[i].name, 10),
										sourceName: data[i].name,
										isParent: isParent,
										icon: zTI.I_1_C,
										iconOpen: zTI.I_1_O,
										iconClose: zTI.I_1_C,
									}
								}else{
									dashboardIsNull = false;
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
							$.fn.zTree.init($("#treeDom"), setting, zNodes);
							semanticZTree.addMethod();
							completeLi();
							var dashboardId = storageService.getParameter("semantic_dashboard_id");
							var folderId = storageService.getParameter("semantic_folder_id");
							sign(dashboardId, folderId);
						}
						if(dashboardIsNull){
							$("#gridster_Box_no").show();
							storageService.setParameter("dashboard_id","");
						}
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		onClick: function(e, treeId, treeNode) {
			$("#dashboard_id").val(treeNode['id']);
			$("#tamplatebaseName").html(treeNode['sourceName']);
			storageService.setParameter("semantic_dashboard_id", treeNode['id']);
			storageService.setParameter("semantic_folder_id", treeNode['pId']);
			semantic.showTemplatebase(treeNode['id']);
		},
		beforeRemove: function(treeId, treeNode) {
			if(treeNode.isParent){
				folderDelete.init(treeNode['id'], treeNode['name']);
			}
			return false;
		},
		beforeDrag: function(treeId, treeNodes) {
			return false;
		},
		beforeClick: function(treeId, treeNode, clickFlag){
			completeLi();
			if(!treeNode.isParent){
				
			}else{
				var zTree = $.fn.zTree.getZTreeObj("treeDom");
				zTree.expandNode(treeNode);
				completeLi();
				return false;
			}
		},
		mouseenterFn: function(treeId, treeNode) {
			if(treeNode['children'] == undefined) {
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
		},
		addMethod: function(){
			var tree_xiangqing_bianji = $('#tree_xiangqing_bianji');
			$('#treeDom').on('mouseover', '.dashboard span.button.remove', function() {
				
				if(tree_xiangqing_bianji.height() + $(this).offset().top + 10 <= $(window).height()) {
					tree_xiangqing_bianji.css({
						'display': 'block',
						'top': $(this).offset().top
					});
					tree_xiangqing_bianji.find('ii').css('display','');
				} else {
					tree_xiangqing_bianji.css({
						'display': 'block',
						'top': $(this).offset().top - (tree_xiangqing_bianji.height() + 36)
					});
					tree_xiangqing_bianji.find('ii').css('display','block');
				}
				
				var treeObj = $.fn.zTree.getZTreeObj('treeDom'),
					node = treeObj.getNodes(),
					nodes = treeObj.transformToArray(node);
				var thisId = this.parentNode.parentNode.id;

				for(var i = 0, len = nodes.length; i < len; i++) {
					if(nodes[i]['tId'] == thisId) {
						$('#thiszTreeId').val(nodes[i]['id']);
						break;
					}
				}
			});
			var thisTime;
			$('#treeDom').on('mouseout', '.dashboard span.button.remove', function() {
				clearInterval(thisTime);
				thisTime = setTimeout(function() {
					tree_xiangqing_bianji.css('display', 'none')
				}, 30);
			});
			tree_xiangqing_bianji.mouseenter(function() {
				clearInterval(thisTime);
			});

			tree_xiangqing_bianji.mouseleave(function() {
				thisTime = setTimeout(function() {
					tree_xiangqing_bianji.css('display', 'none')
				}, 30);
			});

			tree_xiangqing_bianji.find('p').click(function() {
				tree_xiangqing_bianji.css('display', 'none');
			});
		}
}