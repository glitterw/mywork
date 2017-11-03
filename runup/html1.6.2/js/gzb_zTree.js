// JavaScript Document
/*树状图图标*/
var storage_theme = storageService.getTheme();
var zTI = {
		I_1_O: "/css/"+storage_theme+"/zTree_v3/img/wenjianjia_1.png",
		I_1_C: "/css/"+storage_theme+"/zTree_v3/img/wenjianjia_2.png",
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
		addHoverDom: mouseenterFn,
		removeHoverDom: mouseleaveFn,
	},
	data: {
		simpleData: {
			enable: true
		},
	},
	callback: {
		onClick: onClick,
		beforeClick:beforeClick,
		beforeDrag: beforeDrag,
		beforeRemove: beforeRemove,
		beforeEditName: zTreeBeforeEditName,
		onRename: zTreeOnRename
	}
};
/*父节点进入编辑状态*/
function zTreeBeforeEditName(treeId, treeNode) {
	$('#' + treeNode['tId'] + '_a').append("<i class='tree_qd'></i><i class='tree_qx'></i>");
}
/*编辑结束*/
function zTreeOnRename(event, treeId, treeNode, isCancel) {
	$.ajax({
		type : "post",
		url : "/folder/update",
		data : {
			id:treeNode['id'],
			folderName:treeNode['name']
		},
		success : function(json){
			if(json.status == "error"){
				layer.msg(json.message);
			}
		}
	});
	$('.tree_qd,.tree_qx').remove();
}

/*确定取消编辑*/
$(document).on('click', '.tree_qd,.tree_qx', function() {
	$('.tree_qd,.tree_qx').remove();
})

function beforeClick(treeId, treeNode, clickFlag){
	var zTree = $.fn.zTree.getZTreeObj("treeDom");
	if(treeNode['isParent']) {
		zTree.expandNode(treeNode);
		/*是否有新增项*/
		var nodes = treeNode.children;
		if(nodes!=null && nodes.length>0){
			for(var i = 0, len = nodes.length; i < len; i++) {
				var tId = nodes[i]['tId'];
				if(nodes[i].isParent){
					$("#"+tId).addClass("folder");	
					var  c_datas = nodes[i].children;
					var isFlag = false;
					if(c_datas && c_datas.length > 0){
						for(var j = 0;j< c_datas.length;j++){
							if(c_datas[j] && c_datas[j]['xinzeng']){
								isFlag = true;
								break;
							}
						}
					}
					
					if(isFlag){
						$('#' + nodes[i]['tId'] + '_a').removeClass('xinzeng');
						$('#' + nodes[i]['tId'] + '_a').addClass('xinzeng');
					}
					
				}else{
					$("#"+tId).addClass("worktable");
					$('#' + nodes[i]['tId'] + '_a').removeClass('xinzeng');
					
					if(nodes[i]['xinzeng']) {
						$('#' + nodes[i]['parentTId'] + '_a').removeClass('xinzeng');
						$('#' + nodes[i]['parentTId'] + '_a').addClass('xinzeng');
						$('#' + nodes[i]['tId'] + '_a').addClass('xinzeng');
					}

				}				

			}
		}
		
		return false;
	}
};

function _getParentNode(data,pId){
	var node = null;
	if(data && data.length > 0){
		for(var i = 0;i < data.length;i++){
			if(data[i].id == pId){
				node = data[i];
				break;
			}
		}
	}
	return node;
}
/*双击展开改单击展开*/
function onClick(e, treeId, treeNode) {
	//console.log("onClick");
	var zTree = $.fn.zTree.getZTreeObj("treeDom");
	/*删除新增标识*/
	treeNode['xinzeng'] = false;
	worktable.loadNewZtreeClass();
	$("#datatitle").html(treeNode['xiangqing']['name']);
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
};

/*单选选中*/
function zTreeOnCheck(event, treeId, treeNode) {
};

/*不可拖拽移动移动*/
function beforeDrag(treeId, treeNodes) {
	return false;
};

/*鼠标移入树状图节点*/
function mouseenterFn(treeId, treeNode) {
	if(treeNode['isParent']) {
		if(treeNode.flag && treeNode.flag == 2){
			var tId = treeNode['tId'];
			$("#"+tId+"_edit").hide();
			$("#"+tId+"_remove").hide();
		}
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
};

/*鼠标移出树状图节点*/
function mouseleaveFn(treeId, treeNode) {
	$('#tree_xiangqing').css('display', 'none');
}

/*父节点删除按钮/子节点操作按钮*/
function beforeRemove(treeId, treeNode) {
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
							if(json.status == "success"){
								worktable.initLeftDatas();
								layer.closeAll();
							}
							if(json.status == "error"){
								layer.msg(json.message);
							}
						}
					});
				});
			}
		});
	}

	return false;
};

function addMethod(){
	var tree_xiangqing_bianji = $('#tree_xiangqing_bianji');
	$('#treeDom').on('mouseover', '.worktable span.button.remove', function() {
		
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
		var treeNode;

		for(var i = 0, len = nodes.length; i < len; i++) {
			if(nodes[i]['tId'] == thisId) {
				$('#thiszTreeId').val(nodes[i]['id']);
				treeNode = nodes[i];
				break;
			}
		}
		initDetailVlale(treeNode);
	});
	
	var thisTime;
	$('#treeDom').on('mouseout', '.worktable span.button.remove', function() {
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
};
/*弹层赋值*/
function initDetailVlale(treeNode){
	if(treeNode['flag'] && treeNode['flag'] == 2){
		$("#tree_xiangqing_move").hide();
	}else{
		$("#tree_xiangqing_move").show();
	}
	//给编辑弹出层赋值
	$("#bjgzbid").val(treeNode['id']);
	$("#xjwjjname").attr("value",treeNode['xiangqing']['name']);
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
				if(json.status == "success"){
					worktable.initLeftDatas();
					$("#yidongmokuai").css('display', 'none');
					$('body').removeClass('mengceng');
					$('.xiala_d').css('display', 'none');
					$('.xiala_p').removeClass('on');
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	}); 
}

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

/*返回zTree节点树*/
function returnZtreeData(treeDom) {
	var treeObj = $.fn.zTree.getZTreeObj(treeDom);
	var node = treeObj.getNodes();
	for(var i = 0, len = node.length; i < len; i++) {
		node[i]['pId'] = 0
	}
	var nodes = treeObj.transformToArray(node);
	var nodesData = [];
	for(var i = 0, len = nodes.length; i < len; i++) {
		nodesData[i] = {
			id: nodes[i]['id'],
			pId: nodes[i]['pId'],
			name: nodes[i]['name'],
			open: nodes[i]['open']
		}
	}
	return nodesData;
};

/*返回一级的zTree节点*/
function returnOneChildrenData(treeDom) {
	var treeObj = $.fn.zTree.getZTreeObj(treeDom);
	var node = treeObj.getNodes();
	var nodesData = [];
	for(var i = 0, len = node.length; i < len; i++) {
		var nodesDataI = {
			id: node[i]['id'],
			pId: node[i]['pId'],
			name: node[i]['name'],
			open: node[i]['open'],
			iconOpen: zTI.I_1_O,
			iconClose: zTI.I_1_C,
			icon: zTI.I_1_C
		}
		nodesData.push(nodesDataI);
	}
	return nodesData;
};

/*返回无子级的zTree节点*/
function returnNotChildrenData(treeDom) {
	var treeObj = $.fn.zTree.getZTreeObj(treeDom);
	var node = treeObj.getNodes();
	for(var i = 0, len = node.length; i < len; i++) {
		node[i]['pId'] = 0
	}
	var nodes = treeObj.transformToArray(node);
	var nodesData = [];

	for(var i = 0, len = nodes.length; i < len; i++) {
		if(nodes[i].children != undefined) {
			var nodesDataI = {
				id: nodes[i]['id'],
				pId: nodes[i]['pId'],
				name: nodes[i]['name'],
				open: false
			}
			if(nodes[i]['pId'] == 0) {
				nodesDataI.nocheck = true;
				nodesDataI.iconOpen = zTI.I_1_O;
				nodesDataI.iconClose = zTI.I_1_C;
			}
			nodesData.push(nodesDataI);
		}
	}

	return nodesData;
};



//=======================批量操作左边ztree树数据===================
var Nodes2 = [
];
/*批量删除和批量移动下拉样式*/
var settingXL2 = {
		edit: {
			enable: false,
			renameTitle: "",
			removeTitle: ""
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
			if(treeNode.id == allnodes[i].pId && !allnodes[i].isParent
				|| (treeNode.id == "specialRootId" && allnodes[i].pId == "0" && !allnodes[i].isParent)){
				var name = allnodes[i].name;
				if(name.length > 10){
					name = name.substring(0,10) + "...";
				}
				if(ids.indexOf(allnodes[i].id) >= 0){
					Nodes3[k] = {
						id:allnodes[i].id,
						pId:0,
						checked:true,
						name:name
					}
				}else{
					Nodes3[k] = {
						id:allnodes[i].id,
						pId:0,
						name:name
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
	edit: {
			enable: false,
			renameTitle: "",
			removeTitle: ""
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
	
	if(treeNode){
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

var settingXLCommon = {
		edit: {
			enable: false,
			renameTitle: "",
			removeTitle: ""
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
			onClick: onClickRootCommom
		}
};

function  onClickRootCommom(e, treeId, treeNode){
	if(treeNode && $("#selectedFold").size()>0){
		$("#selectedFold").html(treeNode['name']);
		$("#selectedFoldId").val(treeNode['id']);
	}
	$('.xiala_p').removeClass('on');
	$('.xiala_d').hide();
}

var settingXL9 = {
		check: {
			enable: false
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
			onClick: onClickRootXL9
		}
};
function onClickRootXL9(e, treeId, treeNode) {
	if(treeNode){
		if($("#selectedDashBoardFold").size()>0){
			$("#selectedDashBoardFold").html(treeNode['name']);
			$("#selectedDashBoardFoldId").val(treeNode['id']);
		}
		$('.xiala_p').removeClass('on');
		$('.xiala_d').hide();
	}
}
var settingXL10 = {
		check: {
			enable: false
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
			onClick: onClickRootXL10
		}
	};
	function onClickRootXL10(e, treeId, treeNode) {
		if(treeNode){
			if($("#newSelectedFold").size()>0){
					$("#newSelectedFold").html(treeNode['name']);
					$("#newSelectedFoldId").val(treeNode['id']);
			}
			$('.xiala_p').removeClass('on');
			$('.xiala_d').hide();
		}
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