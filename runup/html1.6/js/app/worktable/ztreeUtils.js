// JavaScript Document
/*树状图图标*/
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

var worktableMenuTree = {
	setting:{
		edit: {
			enable: true,
			renameTitle: "",
			removeTitle: ""
		},
		view: {
			dblClickExpand: false,
			showLine: false,
			showTitle: false,
			addHoverDom: this.mouseenterFn,
			removeHoverDom: this.mouseleaveFn
		},
		data: {
			simpleData: {
				enable: true
			},
		},
		callback: {
			onClick: this.onClick,
			beforeDrag: this.beforeDrag,
			beforeRemove: this.beforeRemove,
			beforeEditName: this.zTreeBeforeEditName,
			onRename: this.zTreeOnRename,
			beforeClick: this.beforeClick
		}
	},
	mouseenterFn:function(treeId, treeNode){/*鼠标移入树状图节点*/
		if(treeNode['isParent']) {
		}else{
			//当前节点对象
			var thisLi = $(document.getElementById(treeNode['tId']));
			//子节点默认编辑按钮隐藏
			thisLi.find("span").eq(3).css('display', 'none');
			//子节点默认删除按钮样式改变
			thisLi.find("span").eq(4).css("background-image","url(/img/"+storage_theme+"/xiangqing_z.png)");
			$("#tree_xiangqing_nc").html(treeNode['xiangqing']['name']);
			$("#tree_xiangqing_bq").html(treeNode['xiangqing']['tag']);
			$("#tree_xiangqing_bz").html(treeNode['xiangqing']['bz']);
			$('#tree_xiangqing').css({
				'display': 'block',
				'top': thisLi.offset().top
			});
		}
	},
	mouseleaveFn:function(treeId, treeNode) {/*鼠标移出树状图节点*/
		$('#tree_xiangqing').css('display', 'none');
	},
	onClick:function(e, treeId, treeNode){/*双击展开改单击展开*/
		var zTree = $.fn.zTree.getZTreeObj("treeDom");
		if(treeNode['isParent']) {
			zTree.expandNode(treeNode);
		}else{
			/*删除新增标识*/
			treeNode['xinzeng'] = false;
			$("#datatitle").html(treeNode['name']);
			worktable.worktable_id = treeNode['id'];
			worktable.orderColType="";
			worktable.orderColName="";
			worktable.orderType="asc";
			worktable.cxtj1 = "";
			worktable.cxtj2 = "";
			worktable.pageIndex = 1;
			worktable.pageNum = 20;
			worktable.initCxtj();
			worktable.initPage();
			storageService.setParameter("default_worktable_id", treeNode['id']);
			storageService.setParameter("default_folder_id", treeNode['pId']);
		}
		/*是否有新增项*/
		var zTree = $.fn.zTree.getZTreeObj('treeDom'),
			node = zTree.getNodes(),
			nodes = zTree.transformToArray(node);
		for(var i = 0, len = nodes.length; i < len; i++) {
			$('#' + nodes[i]['tId'] + '_a').removeClass('xinzeng');
			if(nodes[i]['xinzeng']) {
				$('#' + nodes[i]['tId'] + '_a').addClass('xinzeng');
				$('#' + nodes[i]['parentTId'] + '_a').addClass('xinzeng');
			}
		}
	},
	beforeClick:function(treeId, treeNode, clickFlag){
		var zTree = $.fn.zTree.getZTreeObj("treeDom");
		if(treeNode.pId != null && treeNode.pId != 0){
			
		}else{
			zTree.expandNode(treeNode);
			return false;
		}
	},
	beforeDrag:function(treeId, treeNodes){/*不可拖拽移动移动*/
		return false;
	},
	beforeRemove:function(treeId, treeNode){/*父节点删除按钮/子节点操作按钮*/
		var zTree = $.fn.zTree.getZTreeObj("treeDom");
		var thisLi = $(document.getElementById(treeNode['tId']));
		if(treeNode['isParent']) {
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : {
					ftl_type:"deleteFolder_ftl"
				},
				success : function(json){
					var html = json.data;
					layer_content("删除文件夹", layer_common_size, html, function(){
						$("#dqname").html(treeNode['name']);
					}, function(){
						var mycheckval = document.getElementById("mycheckval").checked;
						$.ajax({
							type : "post",
							url : "/worktable/deleteFolderTable",
							data : {
								id:treeNode['id'],
								deleteType:mycheckval
							},
							success : function(json){
								if (json.status == "success") {
									worktable.initLeftDatas();
									layer.closeAll();
								}
								if (json.status == "error") {
									layer.msg(json.message);
								}
							}
						});
					});
				}
			});
		} else {
			$('#tree_xiangqing_bianji').css({
				'display': 'block',
				'top': thisLi.offset().top
			});
			//给编辑弹出层赋值
			$("#bjgzbid").val(treeNode['id']);
			$("#xjwjjname").attr("value",treeNode['name']);
			$("#tjtk_bq").attr("value",treeNode['xiangqing']['tag']);
			$("#tjtk_bz").html(treeNode['xiangqing']['bz']);
			//移动工作表显示字段
			$("#gzbxsname").html(treeNode['name']);
			
			$("#isyidongmokuai").unbind();
			//动态绑定移动子节点方法
			$("#isyidongmokuai").click(function(){
				$.ajax({
					type : "post",
					url : "/worktable/moveWorkTable",
					data : {
						id:$("#bjgzbid").val(),
						folderid:$("#selectedFolderId").val(),
						tableName:$("#renameval").val()
					},
					success : function(json){
						if (json.status == "success") {
							worktable.initLeftDatas();
							$("#yidongmokuai").css('display', 'none');
							$('body').removeClass('mengceng');
							$('.xiala_d').css('display', 'none');
							$('.xiala_p').removeClass('on');
						}
						if (json.status == "error") {
							layer.msg(json.message);
						}
					}
				});
			}); 
		}
		return false;
	},
	zTreeBeforeEditName:function(treeId, treeNode){/*父节点进入编辑状态*/
		$('#' + treeNode['tId'] + '_a').append("<i class='tree_qd'></i><i class='tree_qx'></i>");
	},
	zTreeOnRename:function(event, treeId, treeNode, isCancel){/*编辑结束*/
		$.ajax({
			type : "post",
			url : "/folder/update",
			data : {
				id:treeNode['id'],
				folderName:treeNode['name']
			},
			success : function(json){
				
			}
		});
		$('.tree_qd,.tree_qx').remove();
	},
	addMethods:function(){
		/*确定取消编辑*/
		$(document).on('click', '.tree_qd,.tree_qx', function() {
			$('.tree_qd,.tree_qx').remove();
		})

		$('#tree_xiangqing_bianji p').click(function() {
			$('#tree_xiangqing_bianji').css('display', 'none');
			$('body').removeClass('mengceng');
		});

		/*删除按钮按下*/
		$('#oShanchu').click(function() {
			$('#quedingshanchu2').css('display', 'block'); //有关联项时
			$('#quedingshanchu2_2').css('display', 'block'); //无关联项时
			$('body').addClass('mengceng');
		});

		/*复制按钮按下*/
		$('#ofuzhi').click(function() {
			$('#fuzhimokuai').css('display', 'block');
			$('body').addClass('mengceng');
		});

		/*移动工作表弹出层*/
		$('#oyidong').click(function() {
			$('#yidongmokuai').css('display', 'block');
			$('body').addClass('mengceng');
		});
	}
}

//=======================批量操作左边ztree树数据===================
var Nodes2 = [
];
/*批量删除和批量移动下拉样式*/
var settingXL2 = {
	check: {
		enable: true
	},
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
		onClick: onClickRootXL2
	}
};
//radio选中事件
function onClickRootXL2(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDomXL12");
	if(zTree == null){
	}else{
		//zTree.destroy();
		var allnodes = worktable.zNodes;
		var k = 0;
		Nodes3 = [];
		var ids = layer_cz.plIds;
		for(var i=0;i<allnodes.length;i++){
			if(treeNode.id == allnodes[i].pId 
				|| (treeNode.id == "specialRootId" && allnodes[i].pId == "0" && !allnodes[i].isParent)){
				if(ids.indexOf(allnodes[i].id) >= 0){
					Nodes3[k] = {
						id:allnodes[i].id,
						pId:0,
						checked:true,
						name:allnodes[i].name
					}
				}else{
					Nodes3[k] = {
						id:allnodes[i].id,
						pId:0,
						name:allnodes[i].name
					}
				}
				k = k+1;
			}
		}
		$.fn.zTree.init($("#treeDomXL12"), settingXL3, Nodes3);
	}
}
//=========================================================
//=================批量操作右边框框中的ztree数据====================
var Nodes3 = [
];
/*下拉复选样式，用于批量删除和移动*/
var settingXL3 = {
	check: {
		enable: true,
		chkStyle: "checkbox",
		radioType: "all"
	},
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
		onClick: onClickXL2,
		onCheck: onClickXLCheck
	}
};
//radio选中事件
function onClickXLCheck(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	zTree.checkNode(treeNode,treeNode.checked,true);
	if(treeNode.checked){
		layer_cz.plIds = layer_cz.plIds + treeNode.id +"@@@";
	}else{
		layer_cz.plIds = layer_cz.plIds.replace(treeNode.id +"@@@", "");
	}
}
//单击节点事件
function onClickXL2(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	zTree.checkNode(treeNode,!treeNode.checked,true);
	if(treeNode.checked){
		layer_cz.plIds = layer_cz.plIds + treeNode.id +"@@@";
	}else{
		layer_cz.plIds = layer_cz.plIds.replace(treeNode.id +"@@@", "");
	}
};
//=========================================================================

//=================批量操作右边框框中的ztree数据====================
var Nodes4 = [
];
/*下拉复选样式，用于批量删除和移动*/
var settingXL4 = {
	check: {
		enable: true,
		chkStyle: "checkbox",
		radioType: "all"
	},
	view: {
		dblClickExpand: false,
		showLine: false
	},
	data: {
		simpleData: {
			enable: true
		}
	}
};
//=========================================================================

//仪表盘文件夹
var NodesFolder = [];
//当前用户所有仪表盘
var NodesDashBoard = [];
//级联文件夹下仪表盘
var dashNodes = [];
/*==============================单条移动下拉树样式=============================*/
var settingXL5 = {
	check: {
		enable: true
	},
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
		onClick: onClickRootXL5
	}
};
//radio选中事件
function onClickRootXL5(e, treeId, treeNode) {
	if($("#selectTargetFoldId").size()>0){
		$("#selectTargetFoldId").val(treeNode['id']);
	}
	if($("#myselected").size()>0){
		$("#myselected").html(treeNode['name']);
		$("#selectedFolderId").val(treeNode['id']);
	}
	if($("#selectedFold").size()>0){
		$("#selectedFold").html(treeNode['name']);
		$("#selectedFoldId").val(treeNode['id']);
		$("#selectedDashBoardId").val("");
		$("#selectedDashBoard").html("<i>选择仪表盘</i>");
		dashNodes = [];
		var k = 0;
		for(var i=0;i<NodesDashBoard.length;i++){
			if(NodesDashBoard[i].note == treeNode['id']){
				dashNodes[k] = NodesDashBoard[i];
				k++;
			}
		}
		$.fn.zTree.init($("#treeDomXLdash"), settingXL6, dashNodes);
	}
	$('.xiala_p').removeClass('on');
	$('.xiala_d').hide();
}
//=======================================================
/*==============================单条移动下拉树样式=============================*/
var settingXL6 = {
	check: {
		enable: true
	},
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
		onClick: onClickRootXL6
	}
};
function onClickRootXL6(e, treeId, treeNode) {
	if($("#selectedDashBoard").size()>0){
		$("#selectedDashBoard").html(treeNode['name']);
		$("#selectedDashBoardId").val(treeNode['id']);
	}
	$('.xiala_p').removeClass('on');
	$('.xiala_d').hide();
}
//================================================================

$(document).ready(function() {

	/*全部节点展开*/
	$("#expandAllBtn").click(function() {
		$.fn.zTree.getZTreeObj('treeDom').expandAll(true);
	});
	/*全部节点折叠 */
	$("#collapseAllBtn").click(function() {
		$.fn.zTree.getZTreeObj('treeDom').expandAll(false);
	});

	/*新建文件夹*/
	$(document).on('click', '#xjwjj', function() {
		$('#xingjianwenjianjia').css('display', 'block');
		$('body').addClass('mengceng');
	});

	/*添加图表*/
	$(document).on('click', '.xztbnx a', function() {
		$('.xztbnx a').removeClass('on');
		$(this).addClass('on');
	});

	/*新建仪表盘*/
	$(document).on('click', '#xjybp', function() {
		$('#xingjianyibiaopan').css('display', 'block');
		$('body').addClass('mengceng');
	});
	/*编辑工作表*/
	$(document).on('click', '#obianji', function() {
		$('#bianjiyibiaopan').css('display', 'block');
		$('body').addClass('mengceng');
	});

});