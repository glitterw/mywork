// JavaScript Document
$(function() {
	$('#icon-box-a1').click(function() {
		layer.open({
			title: '添加数据源',
			type: 1,
			shift: 2,
			area: '700px',
			shadeClose: true, //开启遮罩关闭
			content: $('#icon-box-w').html(),
			success: function(layero, index) {
				console.log('弹窗加载完');
			}
		});
	});
	$(document).on('click', '#semantic-analysis-a', function() {
		layer.close(layer.index);
		layer.open({
			title: '添加语义分析',
			type: 1,
			shift: 2,
			area: '700px',
			shadeClose: true, //开启遮罩关闭
			content: $('#icon-box-w-2').html(),
			success: function(layero, index) {
				console.log('弹窗加载完');
			}
		});
	});
	$('#icon-box-a2').click(function() {
		layer.open({
			title: '表格示例',
			type: 1,
			shift: 2,
			area: '1140px',
			shadeClose: true, //开启遮罩关闭
			content: $('#form-sample-box-w').html(),
			success: function(layero, index) {
				console.log('弹窗加载完');
			}
		});
	});
});