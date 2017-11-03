//文件夹radio树形下拉框值
var Nodes1 = [];

var worktable = {
	pageIndex:1,
	pageNum:20,
	worktable_id:"",
	loadFirst:true, //是否第一次加载
	orderColName:"",  //排序字段
	orderColType:"",  //排序字段类型
	orderType:"asc",  //排序规则
	cxtj1:"",  //工作表查询条件1
	cxtj2:"",  //工作表查询条件2
	czlx:"1",  //操作类型 1:全局刷新;2:下一页append刷新;
	isInitNextPage:true,
	tableName : "",
	zNodes:[], //树形工作表数据
	loadScrollJs : function(){  //渲染scroll滚动js
		var _this = this;
		if($(".MScrollyx").size() > 0){
			$(".MScrollyx").mCustomScrollbar({
				axis: "yx",
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				theme: "light-thick",
				callbacks: {
					whileScrolling: function() {
						if($(this).find('.fixed_top').size() > 0) {
							var containerLT = $(this).find('.mCSB_container');
							var top = parseFloat(containerLT.css('top')) * -1;
							$(this).find('.fixed_top').css('top', top);
						}
						if($(this).find('.fixed_left').size() > 0) {
							var containerLT = $(this).find('.mCSB_container');
							var left = parseFloat(containerLT.css('left')) * -1;
							$(this).find('.fixed_left').css('left', left);
						}
						if($('.excel-table').size() > 0) {
							var biaoti_tr = $('.excel-table .thead').eq(1);
							var biaoti_trLT = $('.excel-table').parent('.mCSB_container');
							var top = parseFloat(biaoti_trLT.css('top')) * -1;
							biaoti_tr.css('top', top);
						}
						if($('.chart-table .table-mb').size() > 0) {
							var biaoti_tr = $('.chart-table .thead').eq(1);
							var biaoti_trLT = $('.chart-table .table-mb').parent('.mCSB_container');
							var top = parseFloat(biaoti_trLT.css('top')) * -1;
							biaoti_tr.css('top', top);
						}
						if (this.mcs.topPct >= 90) { //滚动条滚动到90%触发
							if(_this.isInitNextPage){
								_this.isInitNextPage = false;
								_this.showNextPage();
								_this.loadScrollJs();
								_this.loadBiaoTiJs();
							}
						}
					}
				}
			});
		}
	},
	loadEventJs:function(obj){
		$("#"+obj).mCustomScrollbar({
			scrollButtons: {
				enable: false,
				scrollType: "continuous",
				scrollSpeed: 20,
				scrollAmount: 40
			},
			horizontalScroll: false
		});
	},
	loadBiaoTiJs:function(){
		$('.biaoti_tr').remove('#biaoti_tr');
		setTimeout(function() {
			$('.biaoti_tr').after($('.biaoti_tr').clone().attr('id','biaoti_tr'));
			var biaotiC = $('.biaoti_tr').eq(0).find('td');
			var biaotiA = $('.biaoti_tr').eq(1).find('td');
			$('.biaoti_tr').eq(1).addClass('fixed_top');
			biaotiA.each(function(i) {
				if(FF) {
					this.style.width = getComputedStyle(biaotiC.eq(i).get(0), false)['width'];
				} else {
					$(this).width(biaotiC.eq(i).width() + 1);
				}
				$(this).css({
					'border-left': '1px solid #ffffff',
					'border-right': '1px solid #ffffff'
				});
			});
			
			$(window).resize(function() {
				biaotiA.each(function(i) {
					if(FF) {
						this.style.width = getComputedStyle(biaotiC.eq(i).get(0), false)['width'];
					} else {
						$(this).width(biaotiC.eq(i).width() + 1);
					}
					$(this).css({
						'border-left': '1px solid #ffffff',
						'border-right': '1px solid #ffffff'
					});
				});
			});
			
			var biaoti_tr = $('.biaoti_tr').eq(1);
			biaoti_tr.css({ 'position': 'absolute', 'top': 0, 'left': 0 });
			var gzb_table_box = $('.gzb_table_box');
			setInterval(function() {
				gzb_table_box.height(document.documentElement.clientHeight - gzb_table_box.offset().top - 20);
			}, 30);
			
			$('.biaoti').mouseenter(function() {
				var i = $(this).index();
				$('.gzb_table tr').each(function() {
					$(this).find('td').eq(i).addClass('on');
				});
			}).mouseleave(function() {
				var i = $(this).index();
				$('.gzb_table tr').each(function() {
					$(this).find('td').eq(i).removeClass('on');
				});
			});
		}, 150);
	},
	initPage : function(){  //加载grid表格数据
		$("#tree_xiangqing").hide();
		var _this = this;
		_this.pageIndex = 1;
		$('body').addClass('mengceng');
		var myindex = layer.load(0, {shade: false});
		$.ajax({
			type : "post",
			url : "/worktable/searchTableDatas",
			data : {
				pageIndex : _this.pageIndex,
				pageNum : _this.pageNum,
				cxtj1: _this.cxtj1,
				cxtj2: _this.cxtj2,
				worktable_id : _this.worktable_id,
				orderColName : _this.orderColName,
				orderColType:_this.orderColType,
				orderType : _this.orderType
			},
			success : function(json){
				$('body').removeClass('mengceng');
				layer.close(myindex);
				if(json.status == 'success'){
					var jsonHtml = json.data;
					//gird表格显示
					if(_this.czlx == "1"){
						$("#mytabledata").html(jsonHtml);
						_this.loadScrollJs();
						_this.loadBiaoTiJs();
					}else{
						$("#mytabledata").append(jsonHtml);
					}
					var jsonMap = json.map;
					if(jsonMap.totalCount == null || jsonMap.totalCount == ""){
						$("#totalCount").html(" 0");
					}else{
						$("#totalCount").html(" "+jsonMap.totalCount);
					}
					if(jsonMap.dqtotalCount == null || jsonMap.dqtotalCount == ""){
						$("#dqtotalCount").html(" 0");
					}else{
						$("#dqtotalCount").html(" "+jsonMap.dqtotalCount);
					}
					$("#dqUpdateTime").html(" "+jsonMap.dqUpdateTime);
					$("#glchartdivid").html(jsonMap.glgkHtml);
					$("#gxjldivid").html(jsonMap.gxjlHtml);
					var tableType = jsonMap.tableType;
					if(tableType == "2"){
						$("#replaceAid").hide();
					}else{
						$("#replaceAid").show();
					}
					_this.czlx = "1";
					_this.isInitNextPage = true;
				}
				if(json.status == 'error'){
					layer.msg(json.message);
					$("#mytabledata").html("");
				}
			}
		});
	},
	initLeftDatas : function(){  //加载左边工作表导航栏数据
		var _this = this;
		_this.tableName = $("#searchTableName").val();
		$('body').addClass('mengceng');
		var myindex = layer.load(0, {shade: false});
		$.ajax({
			type : "post",
			url : "/worktable/initLeftTreeDatas",
			data : {},
			success : function(json){
				_this.zNodes = [];
				Nodes1 = [];
				$('body').removeClass('mengceng');
				layer.close(myindex);
				if(json.status == 'success'){
					var jsonHtml = json.data;
					var jsonDatas = json.map.datas;
					//刷新页面内容
					$("#worktableid").next(".gzb_daohang").remove();
					$("#worktableid").after(jsonHtml);
					//加载ztree数据
					if(jsonDatas.length > 0){
						var childCount = 0;
						for(var i=0;i<jsonDatas.length;i++){
							if(jsonDatas[i].parent){
								_this.zNodes[i] = {
									id:jsonDatas[i].id,
									pId:jsonDatas[i].pId,
									name:cutStr(jsonDatas[i].name,10),
									open:jsonDatas[i].open,
									oper:jsonDatas[i].oper,
									flag:jsonDatas[i].flag,
									isParent: jsonDatas[i].parent,
									iconOpen:zTI.I_1_C,
									iconClose:zTI.I_1_O,
									icon:zTI.I_1_C
								};
								//初始化文件夹radio树形下拉框值
								Nodes1[i] = {
									id:jsonDatas[i].id,
									pId:jsonDatas[i].pId,
									name:cutStr(jsonDatas[i].name,10),
									open:true,
									isParent: jsonDatas[i].parent,
									iconOpen:zTI.I_1_C,
									iconClose:zTI.I_1_O,
									'icon': zTI.I_1_O 
								};
							}else{
								childCount++;
								_this.zNodes[i] = {
									id:jsonDatas[i].id,
									pId:jsonDatas[i].pId,
									name:cutStr(jsonDatas[i].name,10),
									flag:jsonDatas[i].flag,
									xiangqing: {  //树形工作表菜单tips
										'name': jsonDatas[i].xiangqing['name'],
										'tag': jsonDatas[i].xiangqing['tag'],
										'bz': jsonDatas[i].xiangqing['bz']
									},
									xinzeng: jsonDatas[i].xinzeng,
									isParent: jsonDatas[i].parent
								}
							}
						}
						//若有工作表，则显示工作表区域
						if(childCount > 0){
							$("#dataArea1").show();
							$("#dataArea2").show();
							$("#emptyDataArea1").hide();
							$("#emptyDataArea2").hide();
						}else{
							$("#emptyDataArea1").show();
							$("#emptyDataArea2").show();
							$("#dataArea1").hide();
							$("#dataArea2").hide();
						}
						/*静态加载zTree节点树*/
						$.fn.zTree.init($("#treeDom"), setting, _this.zNodes);
						//zTree节点操作图标鼠标移动效果加载
						addMethod();
						//=================加载树中为新增的样式=============
						_this.loadNewZtreeClass();
						//=================默认点击第一个子节点=============
						_this.defaultZtreeClick();
						//刷新移动下拉框树
						if($("#treeDomXL4").length>0){//若存在下拉框，则刷新下拉框树
							$.fn.zTree.init($("#treeDomXL4"), settingXL5, Nodes1);
						}
						if($("#treeDomXL13").length>0){//若存在下拉框，则刷新下拉框树
							layer_cz.loadZtreeRoot(jsonDatas);
							$.fn.zTree.init($("#treeDomXL13"), settingXL5, Nodes2);
						}
					}else{
						$("#emptyDataArea1").show();
						$("#emptyDataArea2").show();
						$("#dataArea1").hide();
						$("#dataArea2").hide();
					}
					_this.loadEventJs("leftMenuDiv");
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	loadNewZtreeClass:function(){
		/*是否有新增项*/
		var _this = this;
		var zTree = $.fn.zTree.getZTreeObj('treeDom'),node = zTree.getNodes(),
			nodes = zTree.transformToArray(node);
		var tips_nodes = [];
		for(var i = 0, len = nodes.length; i < len; i++) {
			var tId = nodes[i]['tId']; 
			if(nodes[i].isParent){
				$("#"+tId).addClass("folder");			
			}else{
				var pId = nodes[i].pId;
				var p_node = _this.getParentNode(nodes,pId);
				$("#"+tId).addClass("worktable");
				$('#' + nodes[i]['tId'] + '_a').removeClass('xinzeng');	

				if(nodes[i]['xinzeng']){
					tips_nodes.push(tId);
					tips_nodes.push(nodes[i]['parentTId']);
					if(p_node){
						tips_nodes.push(p_node['parentTId']);
					}					
				}
			}
		}
		tips_nodes  = _this.removeDuplicates(tips_nodes);
		$("#leftMenuDiv").find(".xinzeng").removeClass('xinzeng');
		if(tips_nodes && tips_nodes.length > 0){
			for(var i = 0; i <tips_nodes.length;i++){
				$('#' + tips_nodes[i] + '_a').removeClass('xinzeng');
				$('#' + tips_nodes[i] + '_a').addClass('xinzeng');
			}
		}
	},
	removeDuplicates:function(arr){
	    var temp = {};
	    for (var i = 0; i < arr.length; i++)
	        temp[arr[i]] = true;
	    var r = [];
	    for (var k in temp)
	        r.push(k);
	    return r;
	},
	getParentNode:function(data,pId){
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
	},
	defaultZtreeClick:function(){
		var _this = this;
		var zTree = $.fn.zTree.getZTreeObj('treeDom')
		var default_folder_id = storageService.getParameter("default_folder_id");
		var parentnode = zTree.getNodeByParam('id',default_folder_id);
		if(parentnode != null){
			zTree.expandNode(parentnode, true, true, true);
			/*是否有新增项*/
			var cnodes = parentnode.children;
			if(cnodes!=null && cnodes.length>0){
				for(var i = 0, len = cnodes.length; i < len; i++) {
					if(cnodes[i]['xinzeng']) {
						$('#' + cnodes[i]['tId'] + '_a').removeClass('xinzeng');
						$('#' + cnodes[i]['tId'] + '_a').addClass('xinzeng');
					}
				}
			}
		}
		//首次进入页面才会默认点击，当前页面异步刷新不触发默认点击
		if(_this.loadFirst){
			_this.loadFirst = false;
			var worktableid = $("#worktableid").val();
			if(worktableid != null && worktableid != ""){
				var node = zTree.getNodeByParam('id',worktableid);//获取初次加载id  
				zTree.selectNode(node);//选择点  
                zTree.setting.callback.onClick(null, zTree.setting.treeId, node);//调用事件
			}else{
				var default_worktable_id = storageService.getParameter("default_worktable_id");
				var firstChild;
				var node = zTree.getNodeByParam('id',default_worktable_id);
				if(node != null && !node.isParent){
					firstChild = node;
				}else{
					var childList = zTree.getNodes();
					firstChild = _this.getDefaultSelectNode(childList);
				}	
				zTree.selectNode(firstChild);//选择点  
                zTree.setting.callback.onClick(null, zTree.setting.treeId, firstChild);//调用事件
			}
		}
	},
	getDefaultSelectNode:function(data){
		var _this  = this;
		var node;
		if(data && data.length> 0){
			for(var i=0;i<data.length;i++){
				if(!data[i].isParent){//不是文件夹
					node = data[i];
					break;
				}else{
					node = _this.fooNode(data[i]);
				}
				
			}
		}
		return node;
	},
	fooNode:function(childList){
		var _this = this;
		var node;
		var childs = childList.children;
		if(childs && childs.length > 0){
			for(var i = 0;i<childs.length;i++){
				if(!childs[i].isParent){
					node = childs[i];
					break;
				}else{
					node =  _this.fooNode(childs[i]);
				}
			}
		}
		return node;
	},
	initCxtj:function(){
		var _this = this;
		$("#cxtj1div").siblings().remove();
		$.ajax({
			type : "post",
			url : "/worktable/initTableCxtj",
			async : false,
			data : {
				worktable_id : _this.worktable_id
			},
			success : function(json){
				if(json.status == 'success'){
					var jsonMap = json.map;
					$("#cxtj1div").html(jsonMap.cxtj1Html);
					$("#cxtj2div").html(jsonMap.cxtj2Html);
					_this.loadEventJs("initOne");
					_this.loadEventJs("initTwo");
					$("#parent_wb").trigger("click");
					$("#parent_sz").trigger("click");
					$("#parent_rq").trigger("click");
					$("#initSearchDiv").html(jsonMap.cxtj1Html);
					
					var str = getAllChecked("xszd");
					_this.cxtj2 = str;
					
	            	$(".MScroll").mCustomScrollbar({
						scrollButtons: {
							enable: false,
							scrollType: "continuous",
							scrollSpeed: 20,
							scrollAmount: 40
						},
						horizontalScroll: false,
					});
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	showNextPage : function(){  //加载更多事件
		var _this = this;
		var total = $("#totalCount").html().trim();
		var dqtotal = $("#dqtotalCount").html().trim();
		if(dqtotal == total){
			
		}else{
			_this.pageIndex = _this.pageIndex+1;
			_this.czlx = "2";
			$('body').addClass('mengceng');
			var myindex = layer.load(0, {shade: false});
			$.ajax({
				type : "post",
				url : "/worktable/nextPageTableDatas",
				data : {
					pageIndex : _this.pageIndex,
					pageNum : _this.pageNum,
					cxtj1: _this.cxtj1,
					cxtj2: _this.cxtj2,
					worktable_id : _this.worktable_id,
					orderColName : _this.orderColName,
					orderColType:_this.orderColType,
					orderType : _this.orderType
				},
				success : function(json){
					$('body').removeClass('mengceng');
					layer.close(myindex);
					if(json.status == 'success'){
						var jsonHtml = json.data;
						$("#mytable_gzb").find("tbody").append(jsonHtml);
						var jsonMap = json.map;
						$("#totalCount").html(" "+jsonMap.totalCount);
						$("#dqtotalCount").html(" "+jsonMap.dqtotalCount);
						$("#dqUpdateTime").html(" "+jsonMap.dqUpdateTime);
						_this.isInitNextPage = true;
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
				}
			});
		}
	},
	searchClick : function(){  //左边菜单数据源搜索事件
		var _this = this;
		$.ajax({
			type : "post",
			url : "/worktable/getFtlHtml",
			data : {
				ftl_type:"searchListDiv_ftl",
				tableName:$("#searchTableName").val(),
				getSearchTable:"ok"
			},
			success : function(json){
				if (json.status == "success") {
					var html = json.data;
					$("#searchListDiv .mCSB_container").html(html);
					var leftSize = $("#leafSize").html();
					var rootSize = $("#rootSize").html();
					if(leftSize == 0 && rootSize == 0){
						$("#searchListDiv .mCSB_container").html("<p class='text_c'>没有找到相关结果</p>");
					}
				}
				if (json.status == "error") {
					layer.msg(json.message);
				}
			}
		});
	},
	clickSearchSpan:function(tableid){
		var zTree = $.fn.zTree.getZTreeObj('treeDom');
		var cxnode = zTree.getNodeByParam('id',tableid);//获取初次加载id  
		if(cxnode != null && cxnode.isParent){
			var children = cxnode.children;
			var firstChild = worktable.getDefaultSelectNode(children);
			if(firstChild){
				zTree.selectNode(firstChild);//选择点  
				zTree.setting.callback.onClick(null, zTree.setting.treeId, firstChild);
			}else{
				zTree.selectNode(cxnode);
			}
		}else{
			zTree.selectNode(cxnode);
			zTree.setting.callback.onClick(null, zTree.setting.treeId, cxnode);//调用事件
		}
		setTimeout(function() {
			$('#searchListDiv').hide();
		}, 300);
	},
	zdSearch:function(){  //查询条件搜索
		var _this = this;
		var form = $("#mycxForm").serialize();
		var str = getAllChecked("xszd");
		_this.cxtj1 = form;
		_this.cxtj2 = str;
		_this.pageIndex = 1;
		_this.pageNum = 20;
		_this.czlx = "1";
		_this.initPage();
	},
	getFolders : function(){
		$.ajax({
			type : "post",
			url : "",
			data : {
				
			},
			success : function(json){
				
			}
		});
	},
	gotoPageByUrl : function(url){
		window.location.href = url;
	},
	goRepalceData:function(dataid,logid){
		window.location.href = "/datasources/replacepartstep1/"+dataid+"/"+logid;
	},
	goDeleteData:function(tableid,logid){
		var _this = this;
		var html = "";
		layer_content("删除文件", layer_common_size, html, function(){
			
		}, function(){
			$.ajax({
				type : "post",
				url : "/datasources/deleteDatasByLogId",
				data : {
					tableId:tableid,
					logId:logid
				},
				success : function(json){
					if(json.status == 'success'){
						_this.initPage();
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
					layer.closeAll();
				}
			});
		});
	},
	goDownload:function(url){
		$.ajax({
			type: "post",
			url: "/worktable/getFileName",
			data: {
				url: url
			},
			success: function(json){
				if(json.status == "success"){
					var fileName = json.data;
					var html = '<a id="file_download" target="_blank" href="/common/download?fileName='+encodeURI(encodeURI(fileName))+'&path=' + url + '" download><p>下载</p></a>';
					$("#download_d").html(html);
					$("#file_download>p").trigger('click');
				}
				if(json.status = "warning"){
					layer.msg(json.message);
				}
			}
		});
	}
}

//左边菜单树搜索事件
function checkSubmit(){
	worktable.searchClick();
	return false;
}

//切换选中项class
function styleChangeActive(id){
	$("#"+id).siblings().removeClass("active");
	$("#"+id).addClass('active');
}

//获得所有选中的checkbox
function getAllChecked(name){
	var str = "";
	var checks = document.getElementsByName(name);
	for(var i=0;i<checks.length;i++){
		if(checks[i].checked){
			str = str +checks[i].value+ ",";
		}
	}
	return str;
}

//取消按钮功能
function qxXgWorkTableXx(obj){
	$("#"+obj).css('display', 'none');
	$('body').removeClass('mengceng');
	$('.xiala_d').css('display', 'none');
	$('.xiala_p').removeClass('on');
}
//给指定id的input域赋值
function setValById(obj,val){
	$("#"+obj).val(val);
}
//根据下拉框选择的值，赋值给他的父节点下的input
function setValLocal(obj,val,type){
	if(type == "1"){
		var keyId = $(obj).parent().parent().parent().attr("id");
		var keyIndex = keyId.substring(7);
		var condition = '';
		condition += '<span class="Moption" value="01" onclick="setValLocal(this,\'01\',2)">等于</span>';
		condition += '<span class="Moption" value="06" onclick="setValLocal(this,\'06\',2)">不等于</span>';
		condition += '<span class="Moption" value="02" onclick="setValLocal(this,\'02\',2)">大于</span>';
		condition += '<span class="Moption" value="03" onclick="setValLocal(this,\'03\',2)">小于</span>';
		condition += '<span class="Moption" value="04" onclick="setValLocal(this,\'04\',2)">包含</span>';
		condition += '<span class="Moption" value="05" onclick="setValLocal(this,\'05\',2)">不包含</span>';
		condition += '<span class="Moption" value="07" onclick="setValLocal(this,\'07\',2)">为空</span>';
		condition += '<span class="Moption" value="08" onclick="setValLocal(this,\'08\',2)">不为空</span>';
		var conditionId = "initTwo"+keyIndex;
		var parentId = $(obj).parent().attr("id");
		parentId = parentId.replace("mCSB_","").replace("_container","");
		var conditionIndex = parseInt(parentId) + 1;
		var containerId = "mCSB_"+conditionIndex+"_container";
		$("#"+containerId).html(condition);
	}
	var inputObj = $(obj).parent().parent().parent().parent().find('input').html();
	$(inputObj).val(val);
}
//刷新验证码
function refreshCaptcha(){
	var _url = "/getCaptcha?time="+new Date().getTime();
	$("#yzm").attr('src',_url);
}
//关闭查看
function back(){
	$('.gzb_rongliang_xq').css('display', 'none');
}
//保存工作表列字段修改
function saveColumnName(id,obj){
	var inputT = $(obj).siblings('input').val().trim();
	if(inputT == ""){
		layer.msg("请输入字段名称！");
	}else{
		$.ajax({
			type : "post",
			url : "/worktable/saveTableColumn",
			data : {
				columnName:inputT,
				columnId:id
			},
			success : function(json){
				if(json.status == 'success'){
					$(obj).siblings('input').remove();
					$(obj).siblings('.gzb_mc').html(inputT).css('display', 'inline-block');
					$(obj).css('display', 'none');
					$(obj).siblings('.gzb_qx').css('display', 'none');
					$(obj).siblings('.gzb_px,.gzb_xg').css('display', 'inline-block');
				}
				if(json.status == 'error'){
					alert(json.message);
				}
			}
		});
	}
}
//工作表列字段排序
function orderColumn(col,colType,obj){
	worktable.orderColType = colType;
	if(worktable.orderType == "asc"){
		worktable.orderType = "desc";
	}else{
		worktable.orderType = "asc";
	}
	worktable.orderColName = col;
	worktable.initPage();
}