// JavaScript Document
/*树状图图标*/
var zTI = {
	I_1_C: "zTree_v3/img/wenjianjia_1.png",
	I_1_O: "zTree_v3/img/wenjianjia_2.png",
	I_2_C: "zTree_v3/img/wenjianjia_3.png",
	I_2_O: "zTree_v3/img/wenjianjia_4.png",
	Icon: "zTree_v3/img/wenjianjia_5.png",
	Izuijin: "zTree_v3/img/zuijin.png"
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
		beforeDrag: beforeDrag,
		beforeRemove: beforeRemove,
		beforeEditName: zTreeBeforeEditName,
		onRename: zTreeOnRename
	}
};
/*进入编辑状态*/
function zTreeBeforeEditName(treeId, treeNode) {
	console.log('进入编辑状态', treeNode['tId'] + '_a');
	$('#' + treeNode['tId'] + '_a').append("<i class='tree_qd'></i><i class='tree_qx'></i>");
}
/*编辑结束*/
function zTreeOnRename(event, treeId, treeNode, isCancel) {
	$('.tree_qd,.tree_qx').remove();
}

/*确定取消编辑*/
$(document).on('click', '.tree_qd,.tree_qx', function() {
	$('.tree_qd,.tree_qx').remove();
})

/*双击展开改单击展开*/
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDom");
	zTree.expandNode(treeNode);
	if(treeNode['children'] == undefined) {
		//alert('点击了id为' + treeNode['id'] + '的节点');
		console.log('点击了id为' + treeNode['id'] + '的节点')
	}
};

/*单选选中*/
function zTreeOnCheck(event, treeId, treeNode) {
	console.log('单选选中的' + treeNode['id']);
};

/*不可拖拽移动移动*/
function beforeDrag(treeId, treeNodes) {
	return false;
};

/*移入树状图节点*/
function mouseenterFn(treeId, treeNode) {
	if(treeNode['children'] == undefined) {
		var thisLi = $(document.getElementById(treeNode['tId']));
		$('#tree_xiangqing').css({
			'display': 'block',
			'top': thisLi.offset().top
		});
	}
};

/*移出树状图节点*/
function mouseleaveFn(treeId, treeNode) {
	$('#tree_xiangqing').css('display', 'none');
}
/*删除按钮/详情按钮*/
function beforeRemove(treeId, treeNode) {
	if(treeNode['children'] == undefined) {
		var ev = ev || event;
		if($('#tree_xiangqing_bianji').height() + $(ev.target).offset().top + 10 <= $(window).height()) {
			$('#tree_xiangqing_bianji').css({
				'display': 'block',
				'top': $(ev.target).offset().top
			});
			$('#tree_xiangqing_bianji').find('ii').css('display','');
		} else {
			$('#tree_xiangqing_bianji').css({
				'display': 'block',
				'top': $(ev.target).offset().top - ($('#tree_xiangqing_bianji').height() + 36)
			});
			$('#tree_xiangqing_bianji').find('ii').css('display','block');
		}
	} else {
		$('#quedingshanchu').css('display', 'block');
	}
	return false;
};

$('#tree_xiangqing_bianji p').click(function() {
	$('#tree_xiangqing_bianji').css('display', 'none');
	$('body').removeClass('mengceng');
});

/*删除按钮按下*/
$('#oShanchu').click(function() {
	$('#quedingshanchu').css('display', 'block');
	$('body').addClass('mengceng');
});

/*复制按钮按下*/
$('#ofuzhi').click(function() {
	$('#fuzhimokuai').css('display', 'block');
	$('body').addClass('mengceng');
});

/*复制按钮按下*/
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

$(document).ready(function() {
	var xiangqing = [{
		'名称': '网站订单分析',
		'标签': '电商',
		'备注': '所有订单数据在BDP都可以永久存储，老板再也不用担心数据丢失的问题了！'
	}];
	var zNodes = [
		{ id: 1, pId: 0, name: "场景模板", open: true },
		{ id: 11, pId: 1, name: "运营", xiangqing: xiangqing[0] },
		{ id: 12, pId: 1, name: "电商", xiangqing: xiangqing[0] },

		{ id: 13, pId: 1, name: "销售", xiangqing: xiangqing[0] },

		{ id: 14, pId: 1, name: "销售", xiangqing: xiangqing[0] },

		{ id: 2, pId: 0, name: "测试", },
		{ id: 21, pId: 2, name: "运营", xiangqing: xiangqing[0] },

		{ id: 22, pId: 2, name: "电商", xiangqing: xiangqing[0] },

		{ id: 23, pId: 2, name: "销售", xiangqing: xiangqing[0] },

		{ id: 24, pId: 2, name: "销售", xiangqing: xiangqing[0] },

		{ id: 3, pId: 0, name: "私人文件夹" },
		{ id: 31, pId: 3, name: "运营", xiangqing: xiangqing[0] },

		{ id: 32, pId: 3, name: "电商", xiangqing: xiangqing[0] },

		{ id: 33, pId: 3, name: "销售", xiangqing: xiangqing[0] },

		{ id: 34, pId: 3, name: "销售", xiangqing: xiangqing[0] },

	];
	for(var i = 0, len = zNodes.length; i < len; i++) {
		if(zNodes[i]['pId'] == 0) {
			zNodes[i]['iconOpen'] = zTI.I_1_O;
			zNodes[i]['iconClose'] = zTI.I_1_C;
			zNodes[i]['icon'] = zTI.I_1_O;
		}
	}

	/*静态加载zTree节点树*/
	$.fn.zTree.init($("#treeDom"), setting, zNodes);

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

	$(document).on('click', '.tjtb', function() {
		$('#tianjiatukuai').css('display', 'block');
		$('body').addClass('mengceng');
		$('#xzwjj').css('display', 'block');
	});

	/*新建仪表盘*/
	$(document).on('click', '#xjybp', function() {
		$('#xingjianyibiaopan').css('display', 'block');
		$('body').addClass('mengceng');
	});
	/*编辑仪表盘*/
	$(document).on('click', '#obianji', function() {
		$('#bianjiyibiaopan').css('display', 'block');
		$('body').addClass('mengceng');
	});

	/*填充下拉框*/
	(function() {
		/*下拉样式*/
		var settingXL2 = {
			check: {
				enable: true,
				chkStyle: "radio",
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
				onClick: onClickXL2
			}
		};

		function onClickXL2(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			zTree.expandNode(treeNode);
		};

		/*工作表树状图*/
		var copyNodes = [
			{ id: 1, pId: 0, name: "场景模板", nocheck: true },
			{ id: 11, pId: 1, name: "运营" },
			{ id: 12, pId: 1, name: "电商" },
			{ id: 13, pId: 1, name: "销售" },
			{ id: 14, pId: 1, name: "销售" },

			{ id: 2, pId: 0, name: "测试", nocheck: true },
			{ id: 21, pId: 2, name: "运营" },
			{ id: 22, pId: 2, name: "电商" },
			{ id: 23, pId: 2, name: "销售" },
			{ id: 24, pId: 2, name: "销售" },

			{ id: 3, pId: 0, name: "私人文件夹", nocheck: true },
			{ id: 31, pId: 3, name: "运营" },
			{ id: 32, pId: 3, name: "电商" },
			{ id: 33, pId: 3, name: "销售" },
			{ id: 34, pId: 3, name: "销售" }
		];
		for(var i = 0, len = copyNodes.length; i < len; i++) {
			if(copyNodes[i]['pId'] == 0) {
				copyNodes[i]['iconOpen'] = zTI.I_1_O;
				copyNodes[i]['iconClose'] = zTI.I_1_C;
			} else {
				copyNodes[i]['iconOpen'] = zTI.I_2_O;
				copyNodes[i]['iconClose'] = zTI.I_2_C;
				copyNodes[i]['icon'] = zTI.Icon;
			}
		}
		/*最近最近使用的 id=yid+10000,  原id(yid)*/
		var copyZuijinData = [
			{ id: 10001, pId: 0, name: "最近使用", open: true, iconOpen: zTI.Izuijin, iconClose: zTI.Izuijin, nocheck: true, yid: 1 },
			{ id: 100011, pId: 10001, name: "最近使用1", yid: 11, 'icon': zTI.Icon },
			{ id: 100011, pId: 10001, name: "最近使用2", yid: 12, 'icon': zTI.Icon },
			{ id: 100011, pId: 10001, name: "最近使用3", yid: 13, 'icon': zTI.Icon },
			{ id: 100011, pId: 10001, name: "最近使用4", yid: 14, 'icon': zTI.Icon }
		];
		copyZuijinData = copyZuijinData.reverse();
		for(var i = 0, len = copyZuijinData.length; i < len; i++) {
			copyNodes.unshift(copyZuijinData[i]);
		}
		$.fn.zTree.init($("#treeDomXL2"), settingXL2, copyNodes);

		var Nodes1 = [
			{ id: 1, pId: 0, name: "场景模板" },
			{ id: 2, pId: 0, name: "测试" },
			{ id: 3, pId: 0, name: "私人文件夹" },
		];

		$.fn.zTree.init($("#treeDomXL1"), settingXL2, Nodes1);
		$.fn.zTree.init($("#treeDomXL3"), settingXL2, Nodes1);
		$.fn.zTree.init($("#treeDomXL4"), settingXL2, Nodes1);

		$.fn.zTree.init($("#treeDomXL5"), settingXL2, Nodes1);
		$.fn.zTree.init($("#treeDomXL6"), settingXL2, Nodes1);
		$.fn.zTree.init($("#treeDomXL7"), settingXL2, Nodes1);
		$.fn.zTree.init($("#treeDomXL8"), settingXL2, Nodes1);
	})();

	/*仪表盘内容区*/
	$(document).on('mouseover', '.xg_suaxing', function() {
		$('#shuaxintubiao').css({
			'display': 'block',
			'left': $(this).offset().left + 13,
			'top': $(this).offset().top + 20
		})
	});
	$(document).on('mouseout', '.xg_suaxing', function() {
		$('#shuaxintubiao').css({
			'display': 'none'
		})
	});
	$(document).on('mouseover', '.xg_shujugx', function() {
		$('#shujugengxin').css({
			'display': 'block',
			'left': $(this).offset().left + 13,
			'top': $(this).offset().top + 20
		})
	});
	$(document).on('mouseout', '.xg_shujugx', function() {
		$('#shujugengxin').css({
			'display': 'none'
		})
	});

	$(document).on('click', '.xg_gengduo', function() {
		$('#tree_tukuai_bianji').css({
			'display': 'block',
			'left': $(this).offset().left + 13,
			'top': $(this).offset().top + 20
		});
	});

	$(document).on('click', '#ofuzhitubiao', function() {
		$('#fuzhitubiao').css('display', 'block');
		$('body').addClass('mengceng');
	});

	$(document).on('click', '#oyidongtubiao', function() {
		$('#yidongtubiao').css('display', 'block');
		$('body').addClass('mengceng');
	});

	$(document).on('click', '#odaochutupian', function() {
		$('#daochutupian').css('display', 'block');
		$('body').addClass('mengceng');
	});

	/*全屏预览*/
	$(document).on('click', '.xg_quanping', function() {
		$('.quanpingyulan').css('display', 'block');
	});

});