var isTanchuProgress = false;   //进度条是否显示
var isShow = false; //div是否显示是否显示
var datasources = {
	checkAll: function(){
		var flag = $("#checkAll").prop("checked");
		var elem = document.getElementsByName("xszd");
		$(elem).each(function(){
			var check = $(this).prop("checked");
			if(check != flag){
				$(this).prop({checked:flag});
			}
		});
	},
	detection: function(){
		var elem = document.getElementsByName("xszd");
		var all = true;
		var all_not = true;
		$(elem).each(function(){
			var check = $(this).prop("checked");
			if(!check){
				all = false;
			}
		});
		if(all){
			$("#checkAll").prop({checked:true});
		}else{
			$("#checkAll").prop({checked:false});
		}
	},
	pageIndex:1,
	pageNum:10,
	czlx:"1",  //操作类型 1:全局刷新;2:下一页append刷新;
	status:null, //数据源状态
	datasource_name:"", //数据源名称
	datasource_category:"",   //数据源大分类
	uploadLoading:true,
	initPage : function(){  //加载grid表格数据
		var _this = this;
		var myindex = layer.load(0, {shade: false});
		$.ajax({
			type : "post",
			url : "/datasources/initDatas",
			data : {
				pageIndex : _this.pageIndex,
				pageNum : _this.pageNum,
				status : _this.status,
				datasource_name : _this.datasource_name,
				datasource_category : _this.datasource_category
			},
			success : function(json){
				layer.close(myindex);
				if(json.status == 'success'){
					//数据源grid数据
					var jsonHtml = json.data;
					//上部状态栏数据
					var custom = json.map.custom;
					//gird表格显示
					if(_this.czlx == "1"){
						$("#tbodydiv").html(jsonHtml);
					}else{
						$("#tbodydiv").append(jsonHtml);
					}
					//上部状态栏显示
					$("#allli").html(custom.status_all_num);
					$("#doneli").html(custom.status_done_num);
					$("#onli").html(custom.status_doning_num);
					$("#failedli").html(custom.status_fail_num);
					_this.datasource_category = "";
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	initLeftDatas : function(){  //加载左边导航栏数据
		var _this = this;
		var myindex = layer.load(0, {shade: false});
		$.ajax({
			type : "post",
			url : "/datasources/initLeftDatas",
			data : {
				status : _this.status,
				datasource_name : _this.datasource_name
			},
			success : function(json){
				layer.close(myindex);
				if(json.status == 'success'){
					var jsonHtml = json.data;
					$("#indexleftli").html(jsonHtml);
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	showNextPage : function(){  //加载更多事件
		var _this = this;
		_this.pageIndex = _this.pageIndex+1;
		_this.czlx = "2";
		_this.initPage();
	},
	statusClick : function(type){  //上部状态栏点击事件
		var _this = this;
		_this.status = type;
		_this.czlx = "1";
		_this.initPage();
		_this.initLeftDatas();
	},
	searchClick : function(){  //数据源搜索事件
		var _this = this;
		_this.datasource_name = $("#searchWorld").val();
		_this.czlx = "1";
		_this.initPage();
		_this.initLeftDatas();
	},
	clickResource : function(id){  //导航数据源点击事件
		var _this = this;
		_this.datasource_category = id;
		_this.czlx = "1";
		_this.initPage();
	},
	clickCommonSource : function(){  //导航数据源公共数据点击事件
		var _this = this;
		_this.czlx = "1";
		_this.initPage();
	},
	confirmSheet:function(){  //确定导入哪张sheet
		var sheetNames = getAllChecked("xszd");
		$("#hasSelected").val(sheetNames);
		if(sheetNames==null || sheetNames == ""){
			layer.msg("请选择工作表");
		}else{
			$('body').addClass('mengceng');
			var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			$.ajax({
				type : "post",
				url : "/datasources/saveExcelSheetSelect",
				data : $("#sheetSelectForm").serialize(),
				success : function(json){
					if(json.status == 'success'){
						var filetype = $("#filetype").val()
						var path = "";
						if(filetype == "csv"){
							path = "tocsvstep2";
						}else{
							path = "toexcelstep2";
						}
						window.location.href = "/datasources/"+path;
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
				}
			});
		}
	},
	confirmSenmanticSheet:function(){  //确定导入哪张sheet
		var sheetNames = getAllChecked("xszd");
		$("#hasSelected").val(sheetNames);
		if(sheetNames==null || sheetNames == ""){
			layer.msg("请选择工作表");
		}else{
			$('body').addClass('mengceng');
			var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			$.ajax({
				type : "post",
				url : "/datasources/saveExcelSheetSelect",
				data : $("#sheetSelectForm").serialize(),
				success : function(json){
					if(json.status == 'success'){
						var filetype = $("#filetype").val()
						var path = "";
						if(filetype == "csv"){
							path = "tocsvstep2_semantic";
						}else{
							path = "toexcelstep2_semantic";
						}
						window.location.href = "/datasources/"+path;
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
				}
			});
		}
	},
	loadScrollJs : function(){  //渲染scroll滚动js
		if($(".MScroll").size() > 0){
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
	},
	loadExcelPage2Js:function(){
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
					}
				}
			});
		}
	},
	uploadExcel : function(){
		var _this = this;
		var myindex;
		$("#basicupLoad").uploadFile({//给按钮绑定上传控件
			id:"uploadfile",//给file控件自定义的id
			triggerObj:".basicupLoadBox",// id  #xx 或class .xx 绑定的触发file事件
			type:"text",//上传的文件类型
			url:"/datasources/file_excelupload",
			data:{
				filetype:$("#filetype").val()
			},
			limitsize:800,// 单位 MB
			limitsizeMsg:"请最多上传800M的文件",
			customValid:function(name){
				$("#filename").html(name);
				//上传遮罩
				$('body').addClass('mengceng');
				myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
				var obj = {};
				var flag = true;
				var msg = '';
				if(!_this.uploadLoading){
					msg = '不能重复上传...';
					flag = false;
				}
				_this.uploadLoading = true;
				obj.msg = msg;
				obj.flag = flag;
				return obj;
			},
			//data:{},//传参
			error:function(msg){//错误信息
				layer.msg(msg);
				_this.uploadLoading = true;
				$('body').removeClass('mengceng');
				layer.close(myindex);
			},
			progress:function(evt){//进度条
				if(!isTanchuProgress){
					$('.add-box').fadeOut();
					$('.upload-process').fadeIn();
					//进度条状态改为不可再次弹出
					isTanchuProgress = true;
				}
	 			if(evt.lengthComputable){
	 				var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	 				$("#myprogressBar").css("width",percentComplete+"%");
	 			}
			},
			success:function(evt){//成功信息
				_this.uploadLoading = true;
				//进度条状态改为可再次弹出
				isTanchuProgress = false;
				var json = eval("(" + evt.target.responseText + ")");
				if(json.status=='success'){
					var jsonHtml = json.data;
					var dealtype = $("#dealtype").val();
					//如果处理类型为空则为上传数据，弹出sheet选择框，否则是追加或者替换数据
					if(dealtype == ""){
						layer_cz.selectSheet(jsonHtml);
					}else{
						var path = "";
						var zjid = $("#zjid").val();
						var czjid = $("#czjid").val();
						if(dealtype == "add"){
							path = "/addstep2/"+zjid;
						}else if(dealtype == "replace"){
							path = "/replacestep2/"+zjid;
						}else{
							path = "/replacepartstep2/"+zjid+"/"+czjid;
						}
						window.location.href = "/datasources"+path;
					}
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
				$('body').removeClass('mengceng');
				layer.close(myindex);
			}
		});
	},
	uploadSenmanticExcel : function(){
		var _this = this;
		var myindex;
		$("#basicupLoad").uploadFile({//给按钮绑定上传控件
			id:"uploadfile",//给file控件自定义的id
			triggerObj:".basicupLoadBox",// id  #xx 或class .xx 绑定的触发file事件
			type:"text",//上传的文件类型
			url:"/datasources/file_excelupload",
			data:{
				filetype:$("#filetype").val()
			},
			limitsize:800,// 单位 MB
			limitsizeMsg:"请最多上传800M的文件",
			customValid:function(name){
				$("#filename").html(name);
				//上传遮罩
				$('body').addClass('mengceng');
				myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
				var obj = {};
				var flag = true;
				var msg = '';
				if(!_this.uploadLoading){
					msg = '不能重复上传...';
					flag = false;
				}
				_this.uploadLoading = true;
				obj.msg = msg;
				obj.flag = flag;
				return obj;
			},
			//data:{},//传参
			error:function(msg){//错误信息
				layer.msg(msg);
				_this.uploadLoading = true;
				$('body').removeClass('mengceng');
				layer.close(myindex);
			},
			progress:function(evt){//进度条
				if(!isTanchuProgress){
					$('.add-box').fadeOut();
					$('.upload-process').fadeIn();
					//进度条状态改为不可再次弹出
					isTanchuProgress = true;
				}
	 			if(evt.lengthComputable){
	 				var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	 				$("#myprogressBar").css("width",percentComplete+"%");
	 			}
			},
			success:function(evt){//成功信息
				_this.uploadLoading = true;
				//进度条状态改为可再次弹出
				isTanchuProgress = false;
				var json = eval("(" + evt.target.responseText + ")");
				if(json.status=='success'){
					var jsonHtml = json.data;
					var dealtype = $("#dealtype").val();
					//如果处理类型为空则为上传数据，弹出sheet选择框，否则是追加或者替换数据
					if(dealtype == ""){
						layer_cz.selectSenmanticSheet(jsonHtml);
					}else{
						var path = "";
						var zjid = $("#zjid").val();
						var czjid = $("#czjid").val();
						if(dealtype == "add"){
							path = "/addstep2/"+zjid;
						}else if(dealtype == "replace"){
							path = "/replacestep2/"+zjid;
						}else{
							path = "/replacepartstep2/"+zjid+"/"+czjid;
						}
						window.location.href = "/datasources"+path;
					}
					$('body').removeClass('mengceng');
					layer.close(myindex);
				}else{
					layer.msg("excel为空");
				}
			}
		});
	},
	initExcelPage2 : function(){
		var _this = this;
		$('body').addClass('mengceng');
		var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
		$.ajax({
			type : "post",
			url : "/datasources/initExcelPage2",
			data : {
			},
			success : function(json){
				if(json.status == 'success'){
					var jsonHtml = json.data;
					$("#excelTab").html(jsonHtml);
					$("#excelTab").show();
					$('body').removeClass('mengceng');
					layer.close(myindex);
					_this.loadExcelPage2Js();	
				}
				if(json.status == 'error'){
					layer.msg(json.message);
					$('body').removeClass('mengceng');
					layer.close(myindex);
				}
			}
		});
	},
	initSenmanticExcelPage : function(){
		var _this = this;
		$('body').addClass('mengceng');
		var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
		$.ajax({
			type : "post",
			url : "/datasources/initSemanticExcelPage",
			data : {
			},
			success : function(json){
				if(json.status == 'success'){
					var jsonHtml = json.data;
					var isflag = json.queryBean;
					$("#excelTab").html(jsonHtml);
					$("#excelTab").show();
					$('body').removeClass('mengceng');
					layer.close(myindex);
					_this.loadExcelPage2Js();	
					if(!isflag){
						var filetype = $("#filetype").val()
						var path = "";
						if(filetype == "csv"){
							path = "tocsvstep1_semantic";
						}else{
							path = "toexcelstep1_semantic";
						}
						layer_cz.senmaticNoFound("/datasources/"+path);
					}
					
				}
				if(json.status == 'error'){
					layer.msg(json.message);
					$('body').removeClass('mengceng');
					layer.close(myindex);
				}
			}
		});
	},
	initExcelPage3 : function(){
		var _this = this;
		$('body').addClass('mengceng');
		var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
		$.ajax({
			type : "post",
			url : "/datasources/initExcelPage3",
			data : {
			},
			success : function(json){
				if(json.status == 'success'){
					$('body').removeClass('mengceng');
					layer.close(myindex);
					var jsonHtml = json.data;
					$("#excelTab").html(jsonHtml);
					var jsonmap = json.map;
					$("#sheetCount").val(jsonmap['sheetCount']);
					var json_list = json.listBean;
					_this.loadTreeBox(json_list);
					
					_this.loadScrollJs();	
				}
				if(json.status == 'error'){
					$('body').removeClass('mengceng');
					layer.close(myindex);
					layer.msg(json.message);
				}
			}
		});
	},
	initSemanticExcelPage3 : function(){
		var _this = this;
		$('body').addClass('mengceng');
		var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
		$.ajax({
			type : "post",
			url : "/datasources/initSemanticExcelPage3",
			data : {
			},
			success : function(json){
				if(json.status == 'success'){
					$('body').removeClass('mengceng');
					layer.close(myindex);
					var jsonHtml = json.data;
					$("#excelTab").html(jsonHtml);
					var jsonmap = json.map;
					$("#sheetCount").val(jsonmap['sheetCount']);
					var json_list = json.listBean;
					_this.loadTreeBox(json_list);
					
					_this.loadScrollJs();	
				}
				if(json.status == 'error'){
					$('body').removeClass('mengceng');
					layer.close(myindex);
					layer.msg(json.message);
				}
			}
		});
	},
	initSemanticScene : function(folderId){
		var _this = this;
		$.ajax({
			type : "post",
			data : { "folderId":folderId },
			url : "/datasources/initSemanticScene",
			success : function(json){
				if(json.status == 'success'){
					var jsonHtml = json.data;
					$("#mb_select").html("");
					if(!$.trim(jsonHtml)){
						$("#mb_check").html("<i>请选择</i>");
						var sheetCount = $("#sheetCount").val();
						for(var i=0;i<sheetCount;i++){
							$("#tab_mbid"+i).val("");
						}
					}
					$("#mb_select").html(jsonHtml);
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	loadTreeBox:function(json_list){
		$(".wk_folder").each(function(){
			var index = $(this).attr("data-index");
			var id = $(this).attr("id");
			var node = [];
			if(json_list && json_list.length > 0){
				for(var i = 0;i < json_list.length;i++){
					node.push({
						id:json_list[i].id,
						pId:json_list[i].pId,
						name:json_list[i].name,
						open:true,
						fromUlIndex:index,
						iconOpen:zTI.I_1_C,
						iconClose:zTI.I_1_O,
						icon:zTI.I_1_C
					});
				}
			}
			
			var setting = {
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
						onClick: function(e, treeId, treeNode){
							if(treeNode){
								$("#tab_wjj"+treeNode.fromUlIndex).val(treeNode['id']);
								$("#selected_tab_wjj"+treeNode.fromUlIndex).html(treeNode['name']);
							}
							$('.xiala_p').removeClass('on');
							$('.xiala_d').hide();
						}
					}
				};
			
			$.fn.zTree.init($(this), setting, node);
		})
			
	},
	deleteRedisData:function(){
		var _this = this;
		$.ajax({
			type : "post",
			url : "/datasources/deleteRedisData",
			data : {
			},
			success : function(json){
				if(json.status == 'success'){
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	initAddorReplacePage2:function(sheetName){
		var _this = this;
		$.ajax({
			type : "post",
			url : "/datasources/initAddorReplacePage2",
			data : {
				sheetName:sheetName
			},
			success : function(json){
				if(json.status == 'success'){
					var jsonHtml = json.data;
					$("#sheetListDiv").html(jsonHtml);
					_this.loadExcelPage2Js();	
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	initAddorReplacePage3:function(worktableid){
		var _this = this;
		$.ajax({
			type : "post",
			url : "/datasources/initAddorReplacePage3",
			data : {
				worktableid:worktableid
			},
			success : function(json){
				if(json.status == 'success'){
					var colsCount = json.map.colsCount;
					var jsonHtml = json.data;
					$("#fieldcomparebox").html(jsonHtml);
					if(colsCount == "no"){
						$("#colsCount").html("");
					}else{
						$("#colsCount").html("<span class='warning-gray'>上传表比原表少了"+colsCount+"个字段，替换后可能会导致工作表对应的图表数据有误</span>");
					}
					_this.loadScrollJs();	
				}
				if(json.status == 'error'){
					layer.msg(json.message);
				}
			}
		});
	},
	toMysqlNext:function(){
		var tableNames = getAllChecked("xszd");
		if(tableNames.length < 1){
			layer.msg("请选择需要同步的数据表");
		}else{
			$('body').addClass('mengceng');
			var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			$("#tableNames").val(tableNames);
			//异步提交指定的列头
			$.ajax({
				type : "post",
				url : "/datasources/saveMysqlSourceStep2",
				data : $("#tableChooseForm").serialize(),
				success : function(json){
					if(json.status == 'success'){
						window.location.href = "/datasources/tomysqlstep3";
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
				}
			});
		}
	},
	toHiveNext:function(){
		var tableNames = getAllChecked("xszd");
		if(tableNames.length < 1){
			layer.msg("请选择需要同步的数据表");
		}else{
			$('body').addClass('mengceng');
			var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			$("#tableNames").val(tableNames);
			//异步提交指定的列头
			$.ajax({
				type : "post",
				url : "/datasources/saveHiveSourceStep2",
				data : $("#tableChooseForm").serialize(),
				success : function(json){
					if(json.status == 'success'){
						window.location.href = "/datasources/tohivestep3";
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
				}
			});
		}
	},
	toMysqlPage1 : function (){
		//清除jedis
		window.location.href = "/datasources/tomysqlstep1";
	},
	toHivePage1 : function (){
		//清除jedis
/*		var needLogin = $("#needLogin").val();
		var jdbcname = $("#login_name_val").val();
		var jdbcpwd = $("#login_pwd_val").val();*/
		window.location.href = "/datasources/tohivestep1";
//		window.location.href = "/datasources/tohivestep1?needLogin=" + needLogin + "&jdbcname=" + jdbcname + "&jdbcpwd=" + jdbcpwd;;
	},
	gotoPageByUrl : function(url){
		window.location.href = url;
	},
	testConnection:function(){
		var status = $("#xgStatus").val();
		var dbtype = $("#dbtype").val();
		if(dbtype == 'hive'){
			document.getElementById("testjdbcinput").disabled = false;
			var sjkip = $("#sjkip").val();
			var sjkport = $("#sjkport").val();
			var sjkname = $("#sjkname").val();
			var sjkpass = $("#sjkpass").val();
			var dbname = $("#dbnameshow").html();
			//异步提交指定的列头
			$.ajax({
				type : "post",
				url : "/datasources/testConnection",
				data : {
					sjkip:sjkip,
					sjkport:sjkport,
					sjkname:sjkname,
					sjkpass:sjkpass,
					dbname:dbname,
					dbtype:$("#dbtype").val()
				},
				success : function(json){
					if(json.status == 'success'){
						layer.msg("连接成功！");
						$("#testConn").val("yes");
						$("#xgStatus").val("noChange");
					}
					if(json.status == 'error'){
						layer.msg("连接失败！");
					}
				}
			});
		}else{
			if(status == "changed"){
				var sjkip = $("#sjkip").val();
				var sjkport = $("#sjkport").val();
				var sjkname = $("#sjkname").val();
				var sjkpass = $("#sjkpass").val();
				var dbname = $("#dbnameshow").html();
				//异步提交指定的列头
				$.ajax({
					type : "post",
					url : "/datasources/testConnection",
					data : {
						sjkip:sjkip,
						sjkport:sjkport,
						sjkname:sjkname,
						sjkpass:sjkpass,
						dbname:dbname,
						dbtype:$("#dbtype").val()
					},
					success : function(json){
						if(json.status == 'success'){
							layer.msg("连接成功！");
							$("#testConn").val("yes");
							$("#xgStatus").val("noChange");
						}
						if(json.status == 'error'){
							layer.msg("连接失败！");
						}
					}
				});
			}else{
				layer.msg("连接成功！")
			}
		}
	},
	changeXgStatus:function(){
		var status = $("#xgStatus").val();
		if(status != "changed"){
			$("#xgStatus").val("changed");
			$("#testConn").val("no");
			document.getElementById("testjdbcinput").disabled = false;
		}
	},
	changeSourceStatus : function(type){
		if(type == "on"){
			$("#sjkzt").val("1");
			$("#aidoff").removeClass("on");
			$("#aidon").addClass("on");
		}else{
			$("#sjkzt").val("0");
			$("#aidon").removeClass("on");
			$("#aidoff").addClass("on");
			
		}
	},
	saveModifyDataSource:function(){
		var _this = this;
		var status = $("#xgStatus").val();
		var message = "";
		if(status != "noChange"){
			var sjkip = $("#sjkip").val();
			var sjkport = $("#sjkport").val();
			var sjkname = $("#sjkname").val();
			var sjkpass = $("#sjkpass").val();
			
			if(sjkip==null || sjkip == ""){
				message = "请输入服务器ip";
			}
			if(sjkport==null || sjkport == ""){
				message = "请输入服务器端口ip";
			}
			if(sjkname==null || sjkname == ""){
				message = "请输入服务器用户名";
			}
			if(sjkpass==null || sjkpass == ""){
				message = "请输入服务器密码";
			}
			var testConn = $("#testConn").val();
			if(testConn == "no"){
				message = "请测试服务器连接";
			}
		}
		var selectedTables = getAllChecked("xszd");
		$("#selectedTables").val(selectedTables);
		if(selectedTables==null || selectedTables == ""){
			message = "请选择数据库表名";
		}
		if(message == ""){
			$('body').addClass('mengceng');
			var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			//异步提交指定的列头
			$.ajax({
				type : "post",
				url : "/datasources/saveModifyDataSource",
				data : $("#editForm").serialize(),
				success : function(json){
					layer.close(myindex);
					$('body').removeClass('mengceng');
					if(json.status == 'success'){
						layer.closeAll();
						layer.msg("修改成功！");
						_this.initPage();
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
				}
			});
		}else{
			layer.msg(message);
		}
	}
	
}

function cxDataSource(type,id){
	datasources.statusClick(type);
	$("#"+id).siblings().removeClass("active");
	$("#"+id).addClass('active');
}

//全选事件
//选择状态  
var selectState = false;  
function AllCheck(name)  {
	var checks = document.getElementsByName(name);
	for (var i = 0; i < checks.length; i++)  {  
	    // 提取控件    
	    var checkbox = checks[i];  
	    checkbox.checked = !selectState;  
	}  
	selectState = !selectState;  
}  

//获得对应的checkbox所选中的值  格式 xx,xx,xx,
function getAllChecked(name){
	var str = "";
	var checks = document.getElementsByName(name);
	for(var i=0;i<checks.length;i++){
		if(checks[i].checked){
			str = str +checks[i].value+ "|";
		}
	}
	if(str.length > 0){
		str = str.substring(0,str.length);
	}
	return str;
}
//页面跳转
function goPage(url){
	datasources.gotoPageByUrl(url);
}
//搜索表单提交
function checkSubmit(){
	datasources.searchClick();
	return false;
}

function datasourceChange(type,obj){
	$(obj).siblings().removeClass("active");
	$(obj).addClass("active");
	if(type == "all"){
		datasources.clickResource("");
	}else{
		datasources.clickResource(type);
	}
}

//切换tab功能
function sheetTab(tabid,obj){
	$(obj).siblings().removeClass("active");
	$(obj).addClass("active");
	$("div[name='commontab']").hide();
	$("#"+tabid).show();
}

function showTableList(sourceid,tablename){
	var url = "/datasources/";
	var name = encodeURIComponent(encodeURIComponent(tablename));
	if(sourceid == null || sourceid == ""){
		url = url + "showTableList/"+name;
	}else{
		url = url + "showTableListSet/"+sourceid+"/"+name;
	}
	window.open(url);
}

//输入框双向绑定查询
var app = angular.module("app",["ui.router"]);
app.controller("bodyController", function($scope,$timeout,$state,$location) {
	$scope.base = {
			searchName:"",
			table_list:[]	
	};
	
	$scope.fn = {
		getMysqlTableName:function(){
			$("#mysqlstep2").show();
			//异步提交指定的列头
			$.ajax({
				type : "post",
				url : "/datasources/initMysqlPage2",
				data : {},
				success : function(json){
					if(json.status == 'success'){
						var jsonData = json.data;
						//$("#tableDiv").html(jsonHtml);
						var temp = [];
						if(jsonData){
							for(var i =0 ;i <jsonData.length;i++ ){
								var d = jsonData[i];
								temp.push(d[0]);
							}
						}
						$scope.$apply(function(){
							$scope.base.table_list = temp;
						});
					}
					if(json.status == 'error'){
						layer.msg(json.message);
					}
				}
			});
		},
		showTableList1:function(tablename, type){
			var url = "/datasources/";
			var name = encodeURIComponent(encodeURIComponent(tablename));
			url = url + "showTableList/"+name +"/" + type;
			window.open(url);
		}
	}
	$scope.fn.getMysqlTableName();
});

