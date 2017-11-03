var reporting = {
	initPage: function(){
		reportingZTree.initZTree();
		/*补全功能：根据key查询关联仪表盘*/
		$('#keyword').input(function() {
			setTimeout(function() {
				var key = $("#keyword").val();
				reporting.autocomplete(key);
				$('#tipContent').css('display', 'block');
			}, 30)
		});
	},
	autocomplete: function(key) {
		$.ajax({
			type: "post",
			url: "/dashboard/completeTemplate",
			data: {
				key: $.trim(key),
				type: 7,
				dashboardType: 6,
				showfolder: 1
			},
			success: function(json) {
				if (json.status == "success") {
					var html = json.data;
					$("#content").html(html);
					$('#tipContent').mCustomScrollbar({
						scrollButtons : {
							enable : false,
							scrollType : "continuous",
							scrollSpeed : 20,
							scrollAmount : 40
						},
						horizontalScroll : false,
					});
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	getList: function(){
		var folderId = storageService.getParameter("reporting_folder_id");
		$("#gridster_Box .mCSB_container").html("");
		var myindex = null;
		$.ajax({
			type: "post",
			url: "/reporting/list",
			data: {
				folderId: folderId,
				type: 6
			},
			beforeSend: function(){
				myindex = layer.load(0, {shade: false}); 
			},
			success: function(json){
				if(myindex != null){
					layer.close(myindex);
				}
				if(json.status == "success"){
					var html = json.data["html"];
					var isNull = json.data["isNull"];
					if(isNull){
						$("#create_report").hide();
						$("#no_dashboard").show();
						$("#create_report").hide();
					}else{
						$("#gridster_Box").show();
						$("#no_dashboard").hide();
						$("#create_report").show();
					}
					$("#gridster_Box .mCSB_container").html(html);
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	},
	shareTemplate: function(dashboardId){
		$("#share_textarea").val('');
		var data = {
			dashboardId: dashboardId
		}
		$.ajax({
			type: "post",
			url: "/share/sharedTemplate",
			data: data,
			success: function(json) {
				if(json.status == "success"){
					var shareId = json.data['shareId'];
					var url = window.location.origin + "/share/get?type=reporting&shareId=" + shareId;
					$('#fenxiangybp').css('display', 'block');
					$("#check_shared").attr("href", url);
					$('body').addClass('mengceng');
					window._bd_share_config = {
						//此处添加分享具体设置
						common: {
							bdText: '分享的内容',
							bdDesc: '分享的摘要',
							bdUrl: url, //分享的Url地址
							onBeforeClick: function(cmd, config) { /*在用户点击分享按钮时执行代码，更改配置。cmd为分享目标id， config为当前设置， 返回值为更新后的设置。*/
								var share_textarea = document.getElementById('share_textarea');
								var _bdText, _bdDesc;
								if((share_textarea.value != '') && (share_textarea.value != undefined)) {
									_bdText = _bdDesc = share_textarea.value;
								};
								if('条件') {
									return {
										bdText: _bdText ? _bdText : '分享的内容',
										bdDesc: _bdDesc ? _bdDesc : '分享的摘要',
										bdUrl: url,
									}
								}
							}
						},
						share: { bdCustomStyle: "/css/empty.css" },
					}
					//以下为js加载部分
					with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
			}
		});
	}
}

var createReporting = {
		toCreate: function(){
			var folderId = storageService.getParameter("reporting_folder_id");
			if(folderId == null || folderId == ""){
				layer.msg("请先创建文件夹");
				return false;
			}
			window.location.href="/reporting/create?folder_id=" + folderId;
		}
}

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


var folderAdd = {
		init: function(){
			$.ajax({
				type: "post",
				url: "/folder/addTemplate",
				data: {},
				success : function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("新建文件夹", layer_common_size, html, function(){
							console.log("folder");
							folderZtree.initZtree(false, 7);
							$('#add_dashboard').mCustomScrollbar({
								scrollButtons: {
									enable: false,
									scrollType: "continuous",
									scrollSpeed: 20,
									scrollAmount: 40
								},
								horizontalScroll: false,
							});
						}, function(){
							var folderName = $("#folder_name").val();
							var folderPid = $("#folder_id").val();
							var flag = checkLen(folderName, 1, 100, "文件夹名称不可为空", "文件夹名称不可超过100个字");
							if(flag){
								folderAdd.confirm(folderName, folderPid);
							}else{
								return false;
							}
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		confirm: function(folderName, folderPid){
			$.ajax({
				type : "post",
				url : "/folder/add",
				data : {
					folderName: folderName,
					folderPid: folderPid,
					folderType: 7
				},
				success : function(json){
					if(json.status == "success"){
						reportingZTree.initZTree();
						layer.closeAll();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
}

//解决链接复制只能复制当前页面链接问题
var myCopyShare = function(mcopy) {
	/*
	 * 
	 */
	(function() {
		var cmd = mcopy.id,
			config = window._bd_share_config.common,
			onBeforeClick = window._bd_share_config.common.onBeforeClick,
			_config, _bdUrl;
		if(onBeforeClick) {
			_config = onBeforeClick(cmd, config), _bdUrl = _config.bdUrl ? _config.bdUrl : config.bdUrl
		} else {
			_bdUrl = config.bdUrl ? config.bdUrl : window.location.href
		};
		var Url2 = document.createElement("textarea");
		Url2.value = _bdUrl, Url2.style.opacity = '0', Url2.style.position = 'absolute', Url2.style.left = '0', Url2.style.top = '0', Url2.style.zIndex = '-100', document.getElementsByTagName('body')[0].appendChild(Url2);
		Url2.select();
		document.execCommand("Copy");
		document.getElementsByTagName('body')[0].removeChild(Url2);
	})();
	/*
	 * 
	 */
	alert("链接复制好啦，可以贴粘粘贴啦");
};