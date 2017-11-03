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
		onClick: onClick,
		beforeDrag: beforeDrag
	}
};

/*双击展开改单击展开*/
function onClick(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDom");
	zTree.expandNode(treeNode);
	if(treeNode['children'] == undefined) {
		//alert('点击了id为' + treeNode['id'] + '的节点');
		console.log('点击了id为' + treeNode['id'] + '的节点')
	}
};

/*不可拖拽移动移动*/
function beforeDrag(treeId, treeNodes) {
	return false;
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

	/*全屏预览*/
	$(document).on('click', '.xg_quanping', function() {
		$('.quanpingyulan').css('display', 'block');
	});

});