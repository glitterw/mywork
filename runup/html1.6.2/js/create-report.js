// JavaScript Document

$(function() {



	/*//加载完个点位置
	for(var ii = 0, len = gridster.$widgets.length; ii < len; ii++) {
		var gridster_WHTL = gridster.$widgets[ii].dataset;
		gridster_WHTL['id'] = gridster.$widgets[ii].id;
		gridster_WHTLAll.push(gridster_WHTL);
	}
	console.log(gridster_WHTLAll);

	//删除节点
	$('ul').on("click", ".close", function() {
		gridster.remove_widget($(this).parents("li"));
	});
	//添加节点
	var appendDom = '<li><i class="handleBox"></i><div class="contentBox"></div><span class="gs-resize-handle gs-resize-handle-both"></span><span class="gs-resize-handle gs-resize-handle-both"></span></li>';
	$('ul').on("click", ".append", function() {
		gridster.add_widget(appendDom, 7, 3, 1, 1);
	});*/

	/**/
	/**/
	/**/

	//模板报表文本切换
	$('.sidebar-1 a').click(function() {
		$('.sidebar-1 a').removeClass('active');
		$(this).addClass('active');
		$('.sidebar-1-xq>div').css('display', 'none');
		$('.sidebar-1-xq>div').eq($(this).index()).css('display', 'block');
	});
});