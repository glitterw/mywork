var sign = function(dashboardId, folderId){
	var treeObj = $.fn.zTree.getZTreeObj("treeDom");
	var node = treeObj.getNodes();
	var nodes = treeObj.transformToArray(node);
	if(nodes == null || nodes.length <= 0){
		return false;
	}
	var flag = false;
	if(folderId == null || folderId == "" || dashboardId == null || folderId == ""){
		flag = signFirstNode(treeObj, nodes);
	}else{
		flag = signCheckedNode(treeObj, nodes, dashboardId, folderId);
	}
	if(!flag){
		signFirstNode(treeObj, nodes);
	}
}

var signCheckedNode = function(treeObj, nodes, dashboardId, folderId){
	var found = false;
	for(var i = 0; i < nodes.length; i++){//遍历一级节点
		var level = nodes[i]['level'];
		if(level == 0){//只遍历一级文件夹
			var children = nodes[i]['children'];
			if(children != null && children.length > 0){
				for(var j = 0; j < children.length; j++){
					var isParent = children[j]['isParent'];
					if(isParent){//如果二级目录是文件夹
						var subChildren = children[j]['children'];
						if(subChildren != null && subChildren.length > 0){
							for(var k = 0; k < subChildren.length; k++){
								if(subChildren[k]['id'] == dashboardId){
									found = true;
								}
							}
						}
					}else{//如果二级目录是仪表盘
						if(children[j]['id'] == dashboardId){
							found = true;
						}
					}
				}
			}
			if(found){//若指定节点在这个一级目录下，则展开去寻找
				var test = false;
				treeObj.expandNode(nodes[i], true);
				var children = nodes[i]['children'];
				if(children != null && children.length > 0){
					for(var j = 0; j < children.length; j++){
						var isParent = children[j]['isParent'];
						if(isParent){//如果二级目录是文件夹
							var subChildren = children[j]['children'];
							if(subChildren != null && subChildren.length > 0){
								for(var k = 0; k < subChildren.length; k++){
									if(subChildren[k]['id'] == dashboardId){
										test = true;
									}
								}
							}
							if(test){//若节点在二级目录下，则展开去寻找
								treeObj.expandNode(children[j], true);//展开二级文件夹
									if(subChildren != null && subChildren.length > 0){
										for(var k = 0; k < subChildren.length; k++){
											if(subChildren[k]['id'] == dashboardId){
												$("#" + subChildren[k]['tId'] + "_span").click();
												return true;
											}
										}
									}
								treeObj.expandNode(children[j], false);//关闭二级文件夹
							}
						}else{//如果二级目录是仪表盘
							if(children[j]['id'] == dashboardId){
								$("#" + children[j]['tId'] + "_span").click();
								return true;
							}
						}
					}
				}
			}
		}
	}
	return false;
}

var signFirstNode = function(treeObj, nodes){
	var found = false;
	for(var i = 0; i < nodes.length; i++){//遍历一级节点
		var level = nodes[i]['level'];
		if(level == 0){//只遍历一级文件夹
			var children = nodes[i]['children'];
			if(children != null && children.length > 0){
				for(var j = 0; j < children.length; j++){
					var isParent = children[j]['isParent'];
					if(isParent){//如果二级目录是文件夹
						var subChildren = children[j]['children'];
						if(subChildren != null && subChildren.length > 0){
							test = true;
						}
						if(test){
							treeObj.expandNode(children[j], true);//展开二级文件夹
							$("#" + subChildren[0]['tId'] + "_span").click();
							return true;
						}
					}else{//如果二级目录是仪表盘
						found = true;
					}
				}
			}
			if(found){
				treeObj.expandNode(nodes[i], true);
				var children = nodes[i]['children'];
				var test =false;
				if(children != null && children.length > 0){
					for(var j = 0; j < children.length; j++){
						var isParent = children[j]['isParent'];
						if(isParent){//如果二级目录是文件夹
							var subChildren = children[j]['children'];
							treeObj.expandNode(children[j], true);//展开二级文件夹
							if(subChildren != null && subChildren.length > 0){
								test = true;
							}
							treeObj.expandNode(children[j], false);//关闭二级文件夹
						}else{//如果二级目录是仪表盘
							$("#" + children[j]['tId'] + "_span").click();
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}
		
var completeLi = function(treeId){
	if(treeId == null){
		treeId = "treeDom";
	}
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var node = treeObj.getNodes();
	var nodes = treeObj.transformToArray(node);
	for(var i = 0; i < nodes.length; i++){
		var tId = nodes[i]["tId"];
		var isParent = nodes[i]["isParent"];
		if(isParent){
			$("#" + tId).addClass("folder");
		}else{
			$("#" + tId).addClass("dashboard");
		}
	}
}

var checkComplete = function(id, dashboard_name){
	var showFolder = $("#showFolder").val();
	console.log("check");
	if(showFolder != null && showFolder != ""){
		console.log("文件夹id：" + id);
		if(!signFolder("treeDom", id)){
			signFirstFolder("treeDom");
		}
	}else{
		selectZTreeNode(id);
	}
	$("#keyword").val(dashboard_name);
	$('#tipContent').css('display', 'none');
}

var selectZTreeNode = function(id){
	var treeObj = $.fn.zTree.getZTreeObj("treeDom");
	var nodes = treeObj.getNodes();
	if(id == null || id == ""){
		signFirstNode(treeObj, nodes);
	}else{
		signCheckedNode(treeObj, nodes, id, null);
	}
}

var signFolder = function(treeId, folderId){
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var node = treeObj.getNodes();
	var nodes = treeObj.transformToArray(node);
	if(nodes == null || nodes.length <= 0){
		return false;
	}
	var found = false;
	for(var i = 0; i < nodes.length; i++){//遍历一级节点
		var level = nodes[i]['level'];
		if(level == 0){//只遍历一级文件夹
			var folderLevel1Id = nodes[i]['id'];
			if(folderLevel1Id == folderId){
				$("#" + nodes[i]['tId'] + "_span").click();
				return true;
			}
			var children = nodes[i]['children'];
			if(children != null && children.length > 0){
				for(var j = 0; j < children.length; j++){
					var folderLevel2Id = children[j]['id'];
					if(folderLevel2Id == folderId){
						found = true;
					}
				}
			}
			if(found){
				treeObj.expandNode(nodes[i], true);
				for(var j = 0; j < children.length; j++){
					var folderLevel2Id = children[j]['id'];
					if(folderLevel2Id == folderId){
						$("#" + children[j]['tId'] + "_span").click();
						return true;
					}
				}
			}
		}
	}
	return false;
}

var signFirstFolder = function(treeId){
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var node = treeObj.getNodes();
	var nodes = treeObj.transformToArray(node);
	if(nodes == null || nodes.length <= 0){
		return false;
	}
	var found = false;
	for(var i = 0; i < nodes.length; i++){//遍历一级节点
		var level = nodes[i]['level'];
		if(level == 0){//只遍历一级文件夹
			$("#" + nodes[i]['tId'] + "_span").click();
			return true;
		}
	}
	return false;
}