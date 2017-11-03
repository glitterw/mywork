var reportingZTree = {
		initZTree: function(){
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
				},
				data: {
					simpleData: {
						enable: true
					},
				},
				callback: {
					onClick: reportingZTree.onClick
				}
			};
			$.ajax({
				type: "post",
				url: "/folder/list",
				data: {
					type: 7
				},
				success: function(json){
					if(json.status == "success"){
						var data = json.data;
						var zNodes = [];
						var count = 0;
						if(data != null && data.length > 0){
							$("#treeDom").show();
							$("#no_folder").hide();
							for(var i = 0; i < data.length; i++){
								var isParent = data[i].parent;
								var pId = data[i].pId;
								if(isParent){
									if(pId == "0"){
										zNodes[i] = {
												id: data[i].id,
												pId: data[i].pId,
												name: cutStr(data[i].name, 10),
												sourceName: data[i].name,
												isParent: isParent,
												icon: zTI.I_1_C,
										}
									}else{
										zNodes[i] = {
												id: data[i].id,
												pId: data[i].pId,
												name: cutStr(data[i].name, 10),
												sourceName: data[i].name,
												isParent: isParent,
												icon: zTI.I_1_C,
										}
									}
								}
							}
							/*静态加载zTree节点树*/
							$.fn.zTree.init($("#treeDom"), setting, zNodes);
							var folderId = storageService.getParameter("reporting_folder_id");
							if(!signFolder("treeDom", folderId)){
								signFirstFolder("treeDom");
							}
						}else{
							//没有文件夹的状态
							storageService.setParameter("reporting_folder_id", "");
							$("#treeDom").hide();
							$("#no_folder").show();
							//没有文件夹要显示创建报告的图表,同时隐藏右上角创建报告按钮
							$("#no_dashboard").show();
							$("#create_report").hide();
						}
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		onClick: function(e, treeId, treeNode) {
			$("#reportingName").html(treeNode['sourceName']);
			var zTree = $.fn.zTree.getZTreeObj("treeDom");
			zTree.expandNode(treeNode);
			var folderId = treeNode['id'];
			storageService.setParameter("reporting_folder_id", folderId);
			reporting.getList();
		}
}

//var folderZtree = {
//	initZtree: function(){
//		var setting = {
//			view: {
//				dblClickExpand: false,
//				showLine: false
//			},
//			data: {
//				simpleData: {
//					enable: true
//				}
//			},
//			callback: {
//				onClick: folderZtree.onClick,
//			}
//		};
//		$.ajax({
//			type: "post",
//			url: "/folder/list",
//			data: {
//				type : 6
//			},
//			success: function(json){
//				if(json.status == "success"){
//					var data = json.data;
//					var zNodes = [];
//					var count = 0;
//					if(data != null && data.length > 0){
//						for(var i = 0; i < data.length; i++){
//							var isParnet = data[i].parent;
//							if(isParnet){
//								var pid = data[i].pId
//								if(pid == "0"){
//									zNodes[count] = {
//											id: data[i].id,
//											pId: data[i].pId,
//											name: cutStr(data[i].name, 10),
//											sourceName: data[i].name,
//											iconOpen: zTI.I_1_O,
//											iconClose: zTI.I_1_C,
//											icon: zTI.I_1_C
//									}
//									count++;
//								}
//							}
//						}
//					}
//					$.fn.zTree.init($("#folderTreeDom"), setting, zNodes);
//				}
//				if(json.status == "error"){
//					layer.msg(json.message);
//				}
//			}
//		});
//	},
//	onClick : function(e, treeId, treeNode){
//		$("#viewFolder").html(cutStr(treeNode['name'], 10));
//		$("#folder_id").val(treeNode['id']);
//	}
//};