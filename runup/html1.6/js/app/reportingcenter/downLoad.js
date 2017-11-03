var downLoad = {
	id: null,
	init : function(dashboardId){
		if(dashboardId!=null&&dashboardId!=""){
			downLoad.id = dashboardId;
		}
		$.ajax({
			type: "post",
			url: "/reporting/downloadPdf",
			data: {},
			success : function(json){
				var html = json;
				layer_nobtn_content("下载报告", layer_common_size, html, function(){
					
				});
			}
		});
	},
	download : function(){
		var dashboardid = null;
		if(downLoad.id!=null&&downLoad.id!=""){
			dashboardid = downLoad.id;
		}else{
			dashboardid = $("#base_dashboardid").val();
		}
		var loadingindex = layer.load(0, {shade: [0.7,'#fff']});
		$.ajax({
			type: "post",
			url: "/reporting/exportPdf",
			data: {templateName:"report_pdf",dashboardId:dashboardid},
			success : function(json){
				if(json.status == "success"){
					var pdfPath = json.data["filePath"];
					var fileName = json.data["fileName"];
//					var html = '<a id="file_download" target="_blank" href="' + pdfPath + '" download><p>下载</p></a>';
					var html = '<a id="file_download" target="_blank" href="/common/download?fileName='+encodeURI(encodeURI(fileName))+'&path=' + pdfPath + '" download><p>下载</p></a>';
					$("#download_d").html(html);
					$("#file_download>p").trigger('click');
				}
				if(json.status == "error"){
					layer.msg(json.message);
				}
				layer.close(loadingindex);
			}
		});
	}
};