var tableData = {
		initPage: function(){
			tableData.getTableData();
		},
		getTableData: function(){
			var tableId = $("#table_id").val();
			$.ajax({
				type: "post",
				url: "/dashboard/getTableData",
				data: {
					tableId: tableId
				},
				success: function(json){
					if(json.status == "success"){
						var html = json.data;
						$("#mCSB_1_container").html(function(i,origText){
							return html;
						});
						fixedTableHeader();
					}
					if(json.status == "error"){
						layer.msg(json.message);
					}
				}
			});
		},
		back: function(tableName){
			var content = "<div class='reapt-mb-tx'>模板数据表" + tableName + "没有被替换过，确定返回吗？</div>"
			layer_content("提示", "['400px','200px']", content, function(){}, function(){
				window.location.href="/dashboard/index";
			});
		}
}

//替换模板数据1固定表头处理函数
function fixedTableHeader(){
	var obj = $('.excel-table .thead');
	obj.after(obj.clone());
	var biaotiC = $('.excel-table .thead').eq(0).find('td');
	var biaotiA = $('.excel-table .thead').eq(1).find('td');
	//$('.excel-table .thead').eq(1).addClass('fixed_top');
	biaotiA.each(function(i) {
		$(this).width(biaotiC.eq(i).width() + 1);
		$(this).css({
			'border-left': '1px solid #ffffff',
			'border-right': '1px solid #ffffff'
		});
	});

	$(window).resize(function() {
		biaotiA.each(function(i) {
			$(this).width(biaotiC.eq(i).width() + 1);
			$(this).css({
				'border-left': '1px solid #ffffff',
				'border-right': '1px solid #ffffff'
			});
		});
	});

	var thead = $('.excel-table .thead').eq(1);
	thead.css({
		'position': 'absolute',
		'top': 0,
		'margin-left': '-1px',
		'height': '46px'
	});
}

