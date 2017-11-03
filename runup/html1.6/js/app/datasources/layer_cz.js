var layer_cz = {
		tableList:[], //数据源中表list
		loadScroll:function(){//渲染滚动条js
			$(".plclass").mCustomScrollbar({
				axis: "yx",
				scrollButtons: {
					enable: false,
					scrollType: "continuous",
					scrollSpeed: 20,
					scrollAmount: 40
				},
				theme: "light-thick",
				horizontalScroll: false,
				callbacks: {
					whileScrolling: function() {
					}
				}
			});
		},
		editDataSource : function(obj){
			var _this = this;
			$('body').addClass('mengceng');
			var myindex = layer.load(0, {shade: false}); //0代表加载的风格，支持0-2
			$.ajax({
				type : "post",
				url : "/datasources/getFtlHtml",
				data : {
					ftl_type:"setting_ftl",
					getJsonById:obj
				},
				success : function(json){
					if(json.status == "success"){
						var html = json.data;
						//将数据源中的tablelist放入变量中存储，用于条件检索
						var mapdatas = json.map.tableDatas;
						var datasourceid = json.map.datasourceid;
						if(mapdatas!= null && mapdatas.length>0){
							for(var k=0;k<mapdatas.length;k++){
								_this.tableList[k] = {
										tablename:mapdatas[k].tablename,
										isNew:mapdatas[k].isNew,
										datasourceid:datasourceid
								}
							}
						}
						//弹出设置窗
						layer_content("数据源设置", layer_common_size, html, function(){
							//渲染滚动js
							datasources.loadScrollJs();
							_this.loadTableSearchJs();
							datasources.detection();
							layer.close(myindex);
							$('body').removeClass('mengceng');
						}, function(){
							datasources.saveModifyDataSource();
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		loadTableSearchJs:function(){
			var _this = this;
			$("#tableSearchId").input(function() {
				setTimeout(function() {
					$("div").remove(".seltable_tmp");
					var key = $("#tableSearchId").val();
					for(var i=0;i<_this.tableList.length;i++){
						var name = _this.tableList[i].tablename;
						var sourceid = _this.tableList[i].datasourceid;
						var isnew = _this.tableList[i].isNew;
						if(name.indexOf(key) > -1){
							if(isnew == "no"){
								var html = '<div class="show-box seltable_tmp">'
									+'<label><input type="checkbox" name="xszd" value="'+name+'" checked="checked"><i></i> <span>'+name+'</span></label>'
									+'<a class="show-table" onclick="showTableList(\''+sourceid+'\',\''+name+'\')">预览</a>'
									+'</div>';
								$("#tableListDiv").append(html);
							}else{
								var html = '<div class="show-box seltable_tmp">'
									+'<label><input type="checkbox" name="xszd" value="'+name+'"><i></i> <span>'+name+'</span></label>'
									+'<a class="show-table" onclick="showTableList(\''+sourceid+'\',\''+name+'\')">预览</a>'
									+'</div>';
								$("#tableListDiv").append(html);
							}
						}
					}
				},300);
			});
		},
		deleteDatasource : function(obj,name){
			var _this = this;
			$.ajax({
				type : "post",
				url : "/datasources/getFtlHtml",
				data : {
					ftl_type:"deleteDatasource_ftl"
				},
				success : function(json){
					var html = json.data;
					layer_content("删除数据源", layer_common_size, html, function(){
						$("#mysourceName").html(name);
					}, function(){
						$.ajax({
							type : "post",
							url : "/datasources/deleteDataSources",
							data : {
								dataSourceid:obj,
							},
							success : function(json){
								if(json.status == "success"){
									datasources.initPage();
									datasources.initLeftDatas();
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
		},
		selectSheet : function(html){
			var _this = this;
			layer_content_all("选择工作表", layer_common_size, html, function(){
				_this.loadScroll();
			}, function(){
				datasources.confirmSheet();
			}, function(){
				$('.upload-process').fadeOut();
				$('.add-box').fadeIn();
				datasources.deleteRedisData();
			});
		},
		selectSenmanticSheet : function(html){
			var _this = this;
			layer_content_all("选择工作表", layer_common_size, html, function(){
				_this.loadScroll();
			}, function(){
				datasources.confirmSenmanticSheet();
			}, function(){
				$('.upload-process').fadeOut();
				$('.add-box').fadeIn();
				datasources.deleteRedisData();
			});
			$("input:checkbox").on('click',function(){
				$(this).attr('checked','checked').parent().siblings().children().removeAttr('checked');
			});
		},
		backSure:function(url){
			var _this = this;
			$.ajax({
				type : "post",
				url : "/datasources/getFtlHtml",
				data : {
					ftl_type:"backSure_ftl"
				},
				success : function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_content("提示", layer_common_size, html, function(){
						
						}, function(){
							window.location.href = url;
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		senmaticNoFound:function(url){
			var _this = this;
			$.ajax({
				type : "post",
				url : "/datasources/getFtlHtml",
				data : {
					ftl_type:"senmatic_not_found_ftl"
				},
				success : function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_again_upload_content("提示", layer_common_size, html, function(){
							
						}, function(){
							window.location.href = url;
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},	
		saveSuccess:function(url,url1){
			var _this = this;
			$.ajax({
				type : "post",
				url : "/datasources/getFtlHtml",
				data : {
					ftl_type:"saveSuccess_ftl"
				},
				success : function(json){
					if(json.status == "success"){
						var html = json.data;
						layer_saveSuccess_content("提示", layer_small_size, html, function(){
							
						}, function(){
							window.location.href = url1;
						}, function(){
							window.location.href = url;
						});
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		}
		
}