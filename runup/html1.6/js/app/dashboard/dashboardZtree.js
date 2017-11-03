var storage_theme = storageService.getTheme();

//var zTI = {
//	I_1_O: "/js/zTree_v3/img/wenjianjia_2.png",
//	I_1_C: "/js/zTree_v3/img/wenjianjia_1.png",
//	I_2_O: "/js/zTree_v3/img/wenjianjia_4.png",
//	I_2_C: "/js/zTree_v3/img/wenjianjia_3.png",
//	Icon: "/js/zTree_v3/img/wenjianjia_5.png",
//	zuijin: "/js/zTree_v3/img/zuijin.png"
//}

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


var completeZtree = {
	initZtree: function(key){
		var setting = {
			edit: {
				enable: false,
				renameTitle: "",
				removeTitle: ""
			},
			view: {
				dblClickExpand: false,
				showLine: false,
				showTitle: false
			},
			data: {
				simpleData: {
					enable: true
				},
			},
			callback: {
				onClick: worktableMenuZtree.onClick
			}
		};
		$.ajax({
			type: "post",
			url: "/folder/list",
			data: {
				type: 2,
				key: key
			},
			success: function(json){
				var zNodes = [];
				if(json.status == 'success'){
					var jsonDatas = json.data;
					for(var i=0;i<jsonDatas.length;i++){
						if(jsonDatas[i].parent){
							zNodes[i] = {
								id:jsonDatas[i].id,
								pId:jsonDatas[i].pId,
								name:jsonDatas[i].name,
								open:jsonDatas[i].open,
								isParent: jsonDatas[i].parent,
								iconOpen:zTI.I_1_C,
								iconClose:zTI.I_1_O,
								icon:zTI.I_1_C
							};
						}else{
							zNodes[i] = {
								id:jsonDatas[i].id,
								pId:jsonDatas[i].pId,
								name:jsonDatas[i].name,
								xinzeng: jsonDatas[i].xinzeng,
								isParent: jsonDatas[i].parent
							}
						}
					}
					/*静态加载zTree节点树*/
					$.fn.zTree.init($("#worktableTreeDom"), setting, zNodes);
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	onClick : function(e, treeId, treeNode){
		if(treeNode.isParent){
			var zTree = $.fn.zTree.getZTreeObj("worktableTreeDom");
			zTree.expandNode(treeNode);
		}else{
			var worktable_id = treeNode['id'];
			$("#worktable_id").val(worktable_id);
			var name = treeNode['name'];
			$("#worktable_name").val(name);
		}
	}
}

var worktableMenuZtree = {
	initZtree: function(){
		var setting = {
			edit: {
				enable: false,
				renameTitle: "",
				removeTitle: ""
			},
			view: {
				dblClickExpand: false,
				showLine: false,
				showTitle: false
			},
			data: {
				simpleData: {
					enable: true
				},
			},
			callback: {
				onClick: worktableMenuZtree.onClick
			}
		};
		$.ajax({
			type: "post",
			url: "/folder/list",
			data: {
				type: 2
			},
			success: function(json){
				var zNodes = [];
				if(json.status == 'success'){
					var jsonDatas = json.data;
					for(var i=0;i<jsonDatas.length;i++){
						if(jsonDatas[i].parent){
							zNodes[i] = {
								id:jsonDatas[i].id,
								pId:jsonDatas[i].pId,
								name:jsonDatas[i].name,
								open:jsonDatas[i].open,
								isParent: jsonDatas[i].parent,
								iconOpen:zTI.I_1_C,
								iconClose:zTI.I_1_O,
								icon:zTI.I_1_C
							};
						}else{
							zNodes[i] = {
								id:jsonDatas[i].id,
								pId:jsonDatas[i].pId,
								name:jsonDatas[i].name,
								xinzeng: jsonDatas[i].xinzeng,
								isParent: jsonDatas[i].parent
							}
						}
					}
					/*静态加载zTree节点树*/
					$.fn.zTree.init($("#worktableTreeDom"), setting, zNodes);
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	onClick : function(e, treeId, treeNode){
		if(treeNode.isParent){
			var zTree = $.fn.zTree.getZTreeObj("worktableTreeDom");
			zTree.expandNode(treeNode);
		}else{
			var worktable_id = treeNode['id'];
			$("#worktable_id").val(worktable_id);
			var name = treeNode['name'];
			$("#worktable_name").val(name);
			$("#checked_name").val(name);
		}
	}
}


var folerInputMenuZtree = {
	initZtree: function(){
		var setting = {
			view: {
				dblClickExpand: false,
				showLine: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: folerInputMenuZtree.onClick
			}
		};
		$.ajax({
			type: "post",
			url: "/folder/list",
			data: {
				type: 1
			},
			success: function(json){
				if(json.status == "success"){
					var data = json.data;
					var zNodes = [];
					var count = 0;
					if(data != null && data.length > 0){	
						for(var i = 0; i < data.length; i++){
							var flag = data[i].parent;
							if(flag){
								zNodes[count] = {
										id: data[i].id,
										pId: data[i].pId,
										name: cutStr(data[i].name, 8),
										isParent: data[i].parent,
										iconOpen: zTI.I_1_O,
										iconClose: zTI.I_1_C,
										icon: zTI.I_1_C
								};
								count++;
							}
						}
						$.fn.zTree.init($("#folderTreeDom"), setting, zNodes);
						$("#fold_has").show();
						$("#fold_has_no").hide();
					}else{
						$("#fold_has").hide();
						$("#fold_has_no").show();
					}
					
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	onClick : function(e, treeId, treeNode){
		$("#folder_id").val(treeNode['id']);
		$("#viewDashboard").html("<i>选择仪表盘</i>");
		$("#dashboard_id").val("");
		$("#viewFile").html(treeNode['name']);
		dashboardZtree.initZtree();
	}
}

var dashboardZtree = {
	initZtree: function(){
		var folder_id = $("#folder_id").val();
		var setting = {
				view: {
					dblClickExpand: false,
					showLine: false
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: dashboardZtree.onClick
				}
		};
		$.ajax({
			type : "post",
			url : "/dashboard/list",
			data : {
				folder_id : folder_id,
				type : 1
			},
			success : function(json){
				if(json.status == "success"){
					var dashboard = json.data;
					var zNodes = [];
					if(dashboard != null && dashboard.length > 0){
						for(var i = 0; i < dashboard.length; i++){
							zNodes[i] = {
								id: dashboard[i].id,
								pId: dashboard[i].folder_id,
								name: cutStr(dashboard[i].dashboard_name, 10),
								iconOpen: zTI.I_2_O,
								iconClose: zTI.I_2_C,
								icon: zTI.I_2_O
							}
						}
					}
					$.fn.zTree.init($("#dashboardTreeDom"), setting, zNodes);
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	onClick : function(e, treeId, treeNode){
		$("#viewDashboard").html(cutStr(treeNode['name'], 10));
		$("#dashboard_id").val(treeNode['id']);
	}
}

var folderZtree = {
	initZtree: function(flag, type){
		var setting = {
			view: {
				dblClickExpand: false,
				showLine: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: folderZtree.onClick,
			}
		};
		$.ajax({
			type: "post",
			url: "/folder/list",
			data: {
				type : type
			},
			success: function(json){
				if(json.status == "success"){
					var data = json.data;
					var zNodes = [];
					var count = 0;
					if(data != null && data.length > 0){
						for(var i = 0; i < data.length; i++){
							var isParnet = data[i].parent;
							if(isParnet){
								if(flag){
									zNodes[count] = {
											id: data[i].id,
											pId: data[i].pId,
											name: cutStr(data[i].name, 10),
											sourceName: data[i].name,
											iconOpen: zTI.I_1_O,
											iconClose: zTI.I_1_C,
											icon: zTI.I_1_C
									}
									count++;
								}else{
									var pid = data[i].pId
									if(pid == "0"){
										zNodes[count] = {
												id: data[i].id,
												pId: data[i].pId,
												name: cutStr(data[i].name, 10),
												sourceName: data[i].name,
												iconOpen: zTI.I_1_O,
												iconClose: zTI.I_1_C,
												icon: zTI.I_1_C
										}
										count++;
									}
								}
							}
						}
					}
					$.fn.zTree.init($("#folderTreeDom"), setting, zNodes);
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	onClick : function(e, treeId, treeNode){
		$("#viewFolder").html(cutStr(treeNode['name'], 10));
		$("#folder_id").val(treeNode['id']);
	}
};

var dashboardMenuZtree = {
		name: null,
		initZtree: function(){
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
					addHoverDom: dashboardMenuZtree.mouseenterFn,
					removeHoverDom: dashboardMenuZtree.mouseleaveFn
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				callback: {
					onClick: dashboardMenuZtree.onClick,
					beforeDrag: dashboardMenuZtree.beforeDrag,
					beforeRemove: dashboardMenuZtree.beforeRemove,
					onRename: dashboardMenuZtree.onRename,
					beforeRename: dashboardMenuZtree.beforeRename,
					beforeClick: dashboardMenuZtree.beforeClick,
					beforeEditName: dashboardMenuZtree.beforeEditName,
				}
			};
			$.ajax({
				type : "post",
				url : "/folder/list",
				data : {
					type : 1
				},
				success : function(json){
					if(json.status == "success"){
						var data = json.data;
						var zNodes = [];
						if(data && data.length > 0){	
							$("#fold_has").show();
							$("#fold_has_no").hide();
							$("#baseinfo").show();
							$("#gridster_Box").show();
							$("#gridster_Box_no").hide();
							var hasDashboard = false;
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
									hasDashboard = true;
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
							var dashboardId = storageService.getParameter("dashboard_id");
							var folderId = storageService.getParameter("folder_id");
							sign(dashboardId, folderId);
							if(!hasDashboard){
								$("#baseinfo").hide();
								$("#gridster_Box").hide();
								$("#gridster_Box_no").show();
							}
						}else{
							$("#fold_has").hide();
							$("#fold_has_no").show();
							$("#baseinfo").hide();
							$("#gridster_Box").hide();
							$("#gridster_Box_no").show();
							storageService.setParameter("dashboard_id","");
						}	
						dashboardMenuZtree.addMethod();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}	
			});
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
		onClick: function(e, treeId, treeNode) {
			$("#dashboard_name").html(treeNode['sourceName']);
			var id = treeNode['id'];
			var pId = treeNode['pId'];
			storageService.setParameter("dashboard_id", id);
			storageService.setParameter("folder_id", pId);
			$("#gridster_Box").show();
			gridsterTool.initGridster();
		},
		beforeDrag: function(treeId, treeNodes) {
			return false;//禁止拖拽
		},
		beforeRemove: function(treeId, treeNode) {
			if(treeNode.isParent){
				folderDelete.init(treeNode['id'], treeNode['name']);
			}
			return false;
		},
		beforeEditName: function(treeId, treeNode){
			treeNode['name'] = treeNode['sourceName'];
		},
		onRename: function(event, treeId, treeNode, isCancel){
			var id = treeNode.id;
			var folderName = dashboardMenuZtree.name;
			$.ajax({
				type : "post",
				url : "/folder/update",
				data : {
					id: id,
					folderName: folderName,
					type: 1
				},
				success : function(json){
					dashboardMenuZtree.initZtree();
				}
			});
		},
		beforeRename: function(treeId, treeNode, newName, isCancel){
			dashboardMenuZtree.name = newName;
			if(checkNull(newName)){
				layer.msg("名字不能为空");
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
		},
		addMethod: function(){
			var tree_xiangqing_bianji = $('#tree_xiangqing_bianji');
			$('#treeDom').on('mouseover', '.dashboard span.button.remove', function() {
				
				if(tree_xiangqing_bianji.height() + $(this).offset().top + 10 <= $(window).height()) {
					tree_xiangqing_bianji.css({
						'display': 'block',
						'top': $(this).offset().top
					});
					tree_xiangqing_bianji.find('ii').css('display', '');
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
