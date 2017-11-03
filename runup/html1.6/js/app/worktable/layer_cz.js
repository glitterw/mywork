var layer_cz = {
		plIds:"",  //批量操作中的id集合
		plOpenIndexId:null, //弹出框id
		dialogContentHtml : "", //批量操作第一步content内容
		loadScroll:function(){//渲染滚动条js
			$(".plclass").mCustomScrollbar({
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				horizontalScroll: false
			});
		},
		closeOpen:function(){
			var index = worktable.plOpenIndexId;
			layer.close(index);
		},
		upBtn:function(){
			var _this = this;
			var html = _this.dialogContentHtml;
			$("#pldiv").html(html);
			/*批量移动*/
			$.fn.zTree.init($("#treeDomXL11"), settingXL2, Nodes2);
			$.fn.zTree.init($("#treeDomXL12"), settingXL3, Nodes3);
			var myrootzTree = $.fn.zTree.getZTreeObj('treeDomXL11');
			var rootnodes = myrootzTree.getNodes();
			if(rootnodes.length>0){
				myrootzTree.selectNode(myrootzTree.getNodes()[0]);//选择点  
				myrootzTree.setting.callback.onClick(null, myrootzTree.setting.treeId, myrootzTree.getNodes()[0]);//调用事件
			}
			//渲染滚动条js
			_this.loadScroll();
			_this.loadSearchInputJs();
		},
		nextBtn:function(){ //批量删除下一步按钮方法
			var _this = this;
			var ids = layer_cz.plIds;
			if(ids != null && ids != ""){
				$.ajax({
					type : "post",
					url : "/worktable/getFtlHtml",
					data : {
						ftl_type:"pldelete_ftl",
						getTreeJson:"all",
						pldeleteStep:"2"
					},
					success : function(json){
						if (json.status == "success") {
							var html = json.data;
							$("#pldiv").html(html);
							var allnodes = worktable.zNodes;
							var k = 0;
							Nodes4 = [];
							for(var i=0;i<allnodes.length;i++){
								if(ids.indexOf(allnodes[i].id) >= 0){
									Nodes4[k] = {
											id:allnodes[i].id,
											pId:0,
											checked:true,
											name:allnodes[i].name
									}
									k = k+1;
								}
							}
							$.fn.zTree.init($("#treeDomXL13"), settingXL4, Nodes4);
							_this.loadScroll();
						}
						if (json.status == "error") {
							layer.msg(json.message);
						}
					}
				});
			}else{
				layer.msg("请选择需要删除的工作表！");
			}
		},
		nextBtn2:function(){ //批量删除下一步按钮方法
			var _this = this;
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : {
					ftl_type:"pldelete_ftl",
					getTreeJson:"all",
					pldeleteStep:"3"
				},
				success : function(json){
					if (json.status == "success") {
						var html = json.data;
						$("#pldiv").html(html);
						refreshCaptcha();
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		plDeleteDone:function(){
			var _this = this;
			var yzmval = $("#yzmval").val();
			if(yzmval == null || yzmval == ""){
				layer.msg("请输入验证码！");
			}else{
				var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
				$('body').addClass("mengceng");
				$.ajax({
					type : "post",
					url : "/worktable/savePlDeleteTable",
					data : {
						deleteIds:_this.plIds,
						yzmcode:yzmval
					},
					success : function(json){
						if(json.status == "success"){
							worktable.initLeftDatas();
							$('body').removeClass("mengceng");
							layer.closeAll();
							layer.msg("批量删除成功！");
						}
						if (json.status == "error") {
							layer.msg(json.message);
							$('body').removeClass("mengceng");
							layer.close(myindex);
						}
					}
				});
			}
		},
		nextBtn_plmove:function(){
			var _this = this;
			var ids = layer_cz.plIds;
			if(ids != null && ids != ""){
				$.ajax({
					type : "post",
					url : "/worktable/getFtlHtml",
					data : {
						ftl_type:"plmove_ftl",
						getTreeJson:"all",
						plmovestep:"2"
					},
					success : function(json){
						if (json.status == "success") {
							var html = json.data;
							$("#pldiv").html(html);
							$.fn.zTree.init($("#treeDomXL13"), settingXL5, Nodes2);
							_this.loadScroll();
							_this.nextBtn_plmove_load();
						}
						if (json.status == "error") {
							layer.msg(json.message);
						}
					}
				});
			}else{
				layer.msg("请选择需要移动的工作表！");
			}
			
		},
		nextBtn_plmove_load:function(){
			$('#tjtkname').input(function() {
				setTimeout(function() {
					var key = $("#tjtkname").val();
					var rootNodes = [];
					var showNodes = [];
					if(key == ""){
						rootNodes = Nodes2;
					}else{
						if(Nodes2 && Nodes2.length > 0){
							
							for(var i = 0;i < Nodes2.length;i++){
								var show_node = Nodes2[i];
								if(show_node.name.indexOf(key) > -1){
									rootNodes.push(show_node);
								}
							}
						}
					}
					
					$.fn.zTree.init($("#treeDomXL13"), settingXL5, rootNodes);
				});
				
			});	
		},
		nextBtn_plmoveDone:function(){
			var _this = this;
			var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			$('body').addClass("mengceng");
			$.ajax({
				type : "post",
				url : "/worktable/savePlMoveTable",
				data : {
					moveIds:_this.plIds,
					targetFolderId : $("#selectTargetFoldId").val()
				},
				success : function(json){
					if (json.status == "success") {
						worktable.initLeftDatas();
						$('body').removeClass("mengceng");
						layer.closeAll();
						layer.msg("批量移动成功！");
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		loadZtreeRoot:function(list){ //初始化根节点
			var k=0;
			Nodes2 = [];
			//生成左侧跟节点树数据
			for(var i=0;i<list.length;i++){
				if(list[i].parent){
					var name = list[i].name;
					if(name.length > 10){
						name = name.substring(0,10)+"...";
					}
					Nodes2[k] = {
						id:list[i].id,
						pId:list[i].pId,
						name:name, 
						open:true,
						'icon': zTI.I_1_O 
					}
					k=k+1;
				}
			}
			Nodes2[Nodes2.length] = {
				id:"specialRootId",
				pId:"0",
				name:"根目录",
				'icon': zTI.I_1_O 
			}
		},
		loadNewChartZtree:function(foldlist,dashlist){ //初始化新建图表弹窗中的树
			NodesFolder = [];
			NodesDashBoard = [];
			//生成左侧根节点树数据
			for(var i=0;i<foldlist.length;i++){
				var foldName = foldlist[i].folder_name;
				if(foldName.length > 10){
					foldName = foldName.substring(0,10)+"...";
				}
				NodesFolder[i] = {
					id:foldlist[i].id,
					pId:foldlist[i].folder_parent_id,
					name:foldName,
					open:true,
					iconOpen:zTI.I_1_C,
					iconClose:zTI.I_1_O,
					icon:zTI.I_1_C
				}
			}
			for(var i=0;i<dashlist.length;i++){
				var dashboardName = dashlist[i].dashboard_name;
				if(dashboardName.length > 10){
					dashboardName = dashboardName.substring(0,10)+"...";
				}
				NodesDashBoard[i] = {
					id:dashlist[i].id,
					pId:"0",
					name:dashboardName,
					note:dashlist[i].folder_id,
					nocheck: true,
					'icon': zTI.I_1_O 
				}
			}
		},
		plmove_table : function(){  //批量移动
			var _this = this;
			layer_cz.plIds = "";
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : {
					ftl_type:"plmove_ftl",
					getTreeJson:"all",
					plmovestep:"1"
				},
				success : function(json){
					if (json.status == "success") {
						var html = json.data;
						_this.plIds = "";
						var ztreeDatas = json.map.ztreeDatas;
						//初始化文件夹树
						_this.loadZtreeRoot(ztreeDatas); 
						//===========批量移动弹出框==========
						worktable.plOpenIndexId = layer_nobtn_content("批量移动", layer_common_size, html, function(){
							_this.dialogContentHtml = $("#pldiv").html();
							/*批量移动*/
							$.fn.zTree.init($("#treeDomXL11"), settingXL2, Nodes2);
							$.fn.zTree.init($("#treeDomXL12"), settingXL3, Nodes3);
							var myrootzTree = $.fn.zTree.getZTreeObj('treeDomXL11');
							var rootnodes = myrootzTree.getNodes();
							if(rootnodes.length>0){
								myrootzTree.selectNode(myrootzTree.getNodes()[0]);//选择点  
								myrootzTree.setting.callback.onClick(null, myrootzTree.setting.treeId, myrootzTree.getNodes()[0]);//调用事件
							}
							_this.loadScroll();
							_this.loadSearchInputJs();
						});
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		plremove_table : function(){ //批量删除
			var _this = this;
			layer_cz.plIds = "";
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : {
					ftl_type:"pldelete_ftl",
					getTreeJson:"all",
					pldeleteStep:"1"
				},
				success : function(json){
					if (json.status == "success") {
						var html = json.data;
						_this.plIds = "";
						var ztreeDatas = json.map.ztreeDatas;
						//初始化文件夹树
						_this.loadZtreeRoot(ztreeDatas); 
						worktable.plOpenIndexId = layer_nobtn_content("批量删除", layer_common_size, html, function(){
							_this.dialogContentHtml = $("#pldiv").html();
							/*批量移动*/
							$.fn.zTree.init($("#treeDomXL11"), settingXL2, Nodes2);
							$.fn.zTree.init($("#treeDomXL12"), settingXL3, Nodes3);
							var myrootzTree = $.fn.zTree.getZTreeObj('treeDomXL11');
							var rootnodes = myrootzTree.getNodes();
							if(rootnodes.length>0){
								myrootzTree.selectNode(myrootzTree.getNodes()[0]);//选择点  
								myrootzTree.setting.callback.onClick(null, myrootzTree.setting.treeId, myrootzTree.getNodes()[0]);//调用事件
							}
							//渲染滚动条js
							_this.loadScroll();
							_this.loadSearchInputJs();
						});
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		loadSearchInputJs:function(){
			var _this = this;
			$('#tjtkname').input(function() {
				setTimeout(function() {
					var key = $("#tjtkname").val();
					var menuZtree = $.fn.zTree.getZTreeObj('treeDom');
					var allnodes = menuZtree.transformToArray(menuZtree.getNodes());
					var rootCount = 0;
					var rootNodes = [];
					var leafCount = 0;
					var leafNodes = [];
					// 过滤非结构化文件夹
					var moveNodes = [];
					var k = 0;
					for(var j=0;j<Nodes2.length;j++){
						var node = Nodes2[j];
						for(var i=0;i<allnodes.length;i++){
							var allnode = allnodes[i];
							if(allnode.name == node.name && allnode.isParent){
								moveNodes[k] = allnode;
								k++;
							}
						}
					}
					
					if(key == ""){
						rootNodes  = Nodes2;
					}else{
						for(var i=0;i<moveNodes.length;i++){
							var allnode = moveNodes[i];
							if(allnode.name.indexOf(key) > -1){
								if(allnode.isParent){
									allnode.open = false;
									rootNodes[rootCount] = Nodes2[i];
									rootCount++;
								}else{
									//当前子节点所有父节点
									var dqpnodes = allnode.getParentNode();
									if(dqpnodes!=null){
										var isInRoot = false;
										for(var l=0;l<rootNodes.length;l++){
											if(rootNodes[l].id == dqpnodes.id){
												isInRoot = true;
												break;
											}
										}
										if(!isInRoot){
											rootNodes[rootCount] = dqpnodes;
											dqpnodes.open = false;
											rootCount++;
										}
									}else{
										var isInRoot = false;
										for(var l=0;l<rootNodes.length;l++){
											if(rootNodes[l].id == "specialRootId"){
												isInRoot = true;
												break;
											}
										}
										if(!isInRoot){
											rootNodes[rootCount] = {
												id:"specialRootId",
												pId:"0",
												name:"根目录",
												nocheck: true, 'icon': zTI.I_1_O 
											};
											rootCount++;
										}
									}
									leafNodes[leafCount] = allnode;
									leafCount++;
								}
							}
						}
					}
					
					$.fn.zTree.init($("#treeDomXL11"), settingXL2, rootNodes);
					$.fn.zTree.init($("#treeDomXL12"), settingXL3, leafNodes);
					var myrootzTree = $.fn.zTree.getZTreeObj('treeDomXL11');
					var rootnodes = myrootzTree.getNodes();
					if(rootnodes.length>0){
						myrootzTree.selectNode(myrootzTree.getNodes()[0]);//选择点  
						myrootzTree.setting.callback.onClick(null, myrootzTree.setting.treeId, myrootzTree.getNodes()[0]);//调用事件
					}
					_this.loadScroll();
					$('#tjtkname').focus();
				}, 1200);
			});
		},
		addNewFolder : function(){
			var _this = this;
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : {
					ftl_type:"addFolder_ftl",
					isShowTopTree:"true",
				},
				success : function(json){
					if (json.status == "success") {
						var html = json.data;
						var list = json.listBean;
						var _rootNodes = [];
						_rootNodes[0] = {
								id:"0",
								pId:"",
								name:"根目录",
								open:true,
								iconOpen:zTI.I_1_C,
								iconClose:zTI.I_1_O,
								icon:zTI.I_1_C
								
						};
						var k = _rootNodes.length;
						if(list && list.length > 0){
							for(var i = 0 ;i < list.length;i++){
								if(list[i].flag && list[i].flag == 2){
									continue;
								}else{
									_rootNodes[k] = {
											id:list[i].id,
											pId:0,
											name:list[i].name,
											iconOpen:zTI.I_1_C,
											iconClose:zTI.I_1_O,
											icon:zTI.I_1_C
									}
									k++;
								}
							}
						}
						
						layer_content_returnIndex("新建文件夹", layer_common_size, html, function(){
							$.fn.zTree.init($("#treeDomXLfoldCommon"), settingXLCommon, _rootNodes);
							//调用事件
							var zTree = $.fn.zTree.getZTreeObj("treeDomXLfoldCommon");
							zTree.setting.callback.onClick(null, zTree.setting.treeId, zTree.getNodes()[_rootNodes.length-1]);
							_this.loadScroll();
							
						}, function(obj){
							var foldName = $("#newFolderName").val();
							if(foldName!=null && foldName.trim() != ""){
								$.ajax({
									type : "post",
									url : "/folder/saveFolder",
									data : {
										folderName:$("#newFolderName").val(),
										folderPid:$("#selectedFoldId").val()
									},
									success : function(json){
										if(json.status == "error"){
											layer.msg(json.message);
										}else{
											layer.msg("添加成功！",{time:1000});
											layer.close(obj); //关闭当前弹层
											worktable.initLeftDatas();
										}
									}
								});
							}else{
								layer.msg("请输入文件夹名称！");
							}
						});
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		newChart : function(){
			var _this = this;
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : {
					ftl_type:"newChart_ftl",
					getNewChartTreeJson:"all"
				},
				success : function(json){
					if (json.status == "success") {
						var html = json.data;
						var folderdatas = json.map.folderdatas;
						var dashdatas = json.map.dashdatas;
						//初始化文件夹树
						_this.loadNewChartZtree(folderdatas, dashdatas);
						layer_content("新建图表", layer_common_size, html, function(){
							$("#worktablename").html($("#datatitle").html());
							//初始化仪表盘文件夹下拉框
							$.fn.zTree.init($("#treeDomXLfold"), settingXL5, NodesFolder);
							//默认点击第一个节点
							var zTree = $.fn.zTree.getZTreeObj("treeDomXLfold");
							var firstnode = zTree.getNodes()[0];
							zTree.setting.callback.onClick(null, zTree.setting.treeId, firstnode);//调用事件
							//渲染滚动条js
							_this.loadScroll();
						}, function(){
							var dashid = $("#selectedDashBoardId").val();
							var chartName = $("#chartName").val();
							var isNext = true;
							if(dashid == null || dashid == ""){
								layer.msg("请选择仪表盘！");
								isNext = false;
							}
							if(chartName == null || chartName == ""){
								layer.msg("请输入图表名称！");
								isNext = false;
							}
							if(isNext){
								$.ajax({
									type : "post",
									url : "/chart/add",
									data : {
										worktableId:worktable.worktable_id,
										dashboardId:$("#selectedDashBoardId").val(),
										chartName:$("#chartName").val(),
										type:"2"
									},
									success : function(json){
										if(json.status == "error"){
											layer.msg("新建图表失败,请联系管理员!");
										}else{
											window.location.href = json.data;
										}
									}
								});
							}
						});
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		newChartFolderOrDash:function(type){
			var _this = this;
			var data;
			if(type == "dashboard"){
				data = {ftl_type:"addDashBoard_ftl",getNewChartTreeJson:"all"};
			}
			if(type == "folder"){
				data = {ftl_type:"addFolder_ftl",getNewChartTreeJson:"all"};
			}
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : data,
				success : function(json){
					if (json.status == "success") {
						var html = json.data;
						var foldlist = json.map.folderdatas;
						if(type == "dashboard"){
							for(var i=0;i<foldlist.length;i++){
								NodesFolder[i] = {
										id:foldlist[i].id,
										pId:foldlist[i].folder_parent_id,
										name:foldlist[i].folder_name,
										open:true,
										iconOpen:zTI.I_1_C,
										iconClose:zTI.I_1_O,
										icon:zTI.I_1_C
								}
							}
							layer_content_returnIndex("新建仪表盘", layer_common_size, html, function(){
								$("#spanName").html("仪表盘名称：");
								$.fn.zTree.init($("#treeDomXLfoldCommon"), settingXL9, NodesFolder);
								//调用事件
								var zTree = $.fn.zTree.getZTreeObj("treeDomXLfoldCommon");
								zTree.setting.callback.onClick(null, zTree.setting.treeId, zTree.getNodes()[NodesFolder.length-1]);
								_this.loadScroll();
							}, function(obj){
								var dashName = $("#newDashName").val();
								if(dashName==null || dashName.trim() == ""){
									layer.msg("仪表盘不能为空!");
								}else{
									var selectedFoldId = $("#selectedFoldId").val();
									if(selectedFoldId==null || selectedFoldId.trim() == ""){
										layer.msg("文件夹不能为空!");
									}else{
										$.ajax({
											type : "post",
											url : "/dashboard/add",
											data : {
												folderId:selectedFoldId,
												dashboardName:dashName
											},
											success : function(json){
												var data = json.data;
												if(json.status == "error"){
													layer.msg(json.message);
												}else{
													layer.msg("添加成功！",{time:1000});
													dashNodes[dashNodes.length] = {
															id:data.dashboardId,
															pId:"0",
															name:$("#newDashName").val(),
															note:$("#selectedDashBoardId").val(),
															nocheck: true, 'icon': zTI.I_1_O 
													};
													NodesDashBoard[NodesDashBoard.length] = {
															id:data.dashboardId,
															pId:"0",
															name:$("#newDashName").val(),
															note:$("#selectedDashBoardId").val(),
															nocheck: true, 'icon': zTI.I_1_O 
													};
													$.fn.zTree.init($("#treeDomXLdash"), settingXL6, dashNodes);
													//调用事件
													var zTree = $.fn.zTree.getZTreeObj("treeDomXLdash");
													zTree.setting.callback.onClick(null, zTree.setting.treeId, zTree.getNodes()[dashNodes.length-1]);
													layer.close(obj); //关闭当前弹层
												}
											}
										});
									}
								}
							});
						}
						if(type == "folder"){
							newNodesFolder = [];
							var j = 0;
							for(var i=0;i<foldlist.length;i++){
								var folder_parent_id = foldlist[i].folder_parent_id;
								if (folder_parent_id != '0'){
									continue;
								}
								newNodesFolder[j] = {
										id:foldlist[i].id,
										pId:foldlist[i].folder_parent_id,
										name:foldlist[i].folder_name,
										open:true,
										iconOpen:zTI.I_1_C,
										iconClose:zTI.I_1_O,
										icon:zTI.I_1_C
								}
								j++;
							}

							layer_content_returnIndex("新建文件夹", layer_common_size, html, function(){
								$("#spanName").html("文件夹名称：");
								$.fn.zTree.init($("#treeDomXLfoldCommon"), settingXL10, newNodesFolder);
								//调用事件
								var zTree = $.fn.zTree.getZTreeObj("treeDomXLfoldCommon");
								zTree.setting.callback.onClick(null, zTree.setting.treeId, zTree.getNodes()[newNodesFolder.length-1]);
								_this.loadScroll();
							}, function(obj){
								var newSelectedFoldId = $("#newSelectedFoldId").val();
								$.ajax({
									type : "post",
									url : "/folder/saveFolder",
									data : {
										folderPid:newSelectedFoldId,
										folderName:$("#newFolderName").val(),
										type:"1"
									},
									success : function(json){
										var data = json.data;
										if(json.status == "error"){
											layer.msg(json.message);
										}else{
											layer.msg("添加成功！",{time:1000});
											NodesFolder[NodesFolder.length] = {
													id:data.id,
													pId:data.folder_parent_id,
													name:data.folder_name,
													nocheck: true, 'icon': zTI.I_1_O 
											};
											$.fn.zTree.init($("#treeDomXLfold"), settingXL5, NodesFolder);
											//调用事件
											var zTree = $.fn.zTree.getZTreeObj("treeDomXLfold");
											zTree.setting.callback.onClick(null, zTree.setting.treeId, zTree.getNodes()[NodesFolder.length-1]);
											layer.close(obj); //关闭当前弹层
										}
									}
								});
							});
						}
					}
					if (json.status == "error") {
						layer.msg(json.message);
					}
				}
			});
		},
		editTableXx : function(){
			var html = $("#editDiv").html();
			$("#editDiv").html("");
			layer_content_all("编辑工作表", layer_common_size, html, function(){
			}, function(){
				$.ajax({
					type : "post",
					url : "/worktable/updateWorkTableXx",
					data : {
						id:$("#bjgzbid").val(),
						tableName:$("#xjwjjname").val(),
						tagName:$("#tjtk_bq").val(),
						bz:$("#tjtk_bz").val()
					},
					success : function(json){
						if (json.status == "success") {
							worktable.initLeftDatas();
							$("#editDiv").html(html);
							layer.closeAll();
							layer.msg("修改成功",{time:2000});
						}
						if (json.status == "error") {
							layer.msg(json.message);
						}
					}
				});
			}, function(){  //取消按钮事件回调
				$("#editDiv").html(html);
			});
		},
		removeTableDiv : function(){
			var _this = this;
			var html = $("#removeTableDiv").html();
			$("#removeTableDiv").html("");
			layer_content_all("移动工作表", layer_common_size, html, function(){
				$("#xlysdiv").addClass("MScroll");
				//初始化radio树形下拉框
				$.fn.zTree.init($("#treeDomXL4"), settingXL5, Nodes1);
				//渲染滚动条js
				_this.loadScroll();
			}, function(){
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
							layer.msg("移动成功",function(){
								window.location.href = window.location.href;
							});
							layer.closeAll();
						}
						if (json.status == "error") {
							layer.msg(json.message);
						}
					}
				});
			}, function(){  //取消按钮事件回调
				$("#removeTableDiv").html(html);
			});
		},
		deleteTable : function(){
			var _this = this;
			$.ajax({
				type : "post",
				url : "/worktable/getFtlHtml",
				data : {
					ftl_type:"deleteTable_ftl",
					deleteId:$("#bjgzbid").val()
				},
				success : function(json){
					var html = json.data;
					layer_content("删除工作表", layer_common_size, html, function(){
						$("#xiangmuName").html($("#gzbxsname").html());
						refreshCaptcha();
					}, function(){
						var yzmpd = "no";
						var yzmval = "";
						if($("#yzmval").length > 0){
							yzmval = $("#yzmval").val();
							yzmpd = "ok";
						}
						if((yzmval == null || yzmval == "") && yzmpd == "ok"){
							layer.msg("请输入验证码！");
						}else{
							var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
							$('body').addClass("mengceng");
							$.ajax({
								type : "post",
								url : "/worktable/deleteTable",
								data : {
									id:$("#bjgzbid").val(),
									yzmcode:yzmval,
									yzmpd:yzmpd
								},
								success : function(json){
									if(json.status == "success"){
										//worktable.initLeftDatas();
										//$('body').removeClass("mengceng");
										layer.closeAll();
										layer.msg("删除成功",function(){
											window.location.href = window.location.href;
										});
									}
									if (json.status == "error") {
										layer.msg(json.message);
										$('body').removeClass("mengceng");
										layer.close(myindex);
									}
								}
							});
						}
					});
				}
			});
		}
		
		
}