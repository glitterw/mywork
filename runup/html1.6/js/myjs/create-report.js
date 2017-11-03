// JavaScript Document

var gridster;
var gridster_WHTLAll = [];

$(function() {

	gridster = $(".gridster ul").gridster({ //通过jquery选择DOM实现gridster  
		widget_base_dimensions: [50, 20], //模块的宽高 [宽,高]  
		widget_margins: [10, 5], //模块的间距 [上下,左右] 
		resize: {
			min_size: [12, 5],
			max_size: [12, 400],
			enabled: true,
			stop: function(e, ui) {
				//拖拽缩放结束相关点
				console.log(this.$resized_widget[0]);
				for(var ii = 0; ii < this.$changed.length; ii++) {
					console.log(this.$changed[ii]);
				}
			}
		}, //模块右下角拖动大小默认为false
		draggable: {
			handle: '.handleBox', //模块内定义拖动的元素  
			//开始拖 
			start: function(event, ui) {
				console.log('开始拖')
			},
			//结束拖动，结束相关点
			stop: function(event, ui) {
				for(var ii = 0; ii < this.$changed.length; ii++) {
					console.log(this.$changed[ii]);
				}
			}
		}
	}).data('gridster');

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
	//显示蒙层
	$(document).on('mouseenter', '.contentBox', function() {
		if(!$(this).is('.editoring')) {
			$(this).addClass('active')
		}
	});
	//隐藏蒙层
	$(document).on('mouseleave', '.contentBox', function() {
		$(this).removeClass('active')
	});
	//点击编辑,进入编辑状态,隐藏蒙层
	$(document).on('click', '.mlayer .bj', function() {
		$(this).parents('.contentBox').addClass('editoring').removeClass('active');
	});
	//模板报表文本切换
	$('.sidebar-1 a').click(function() {
		$('.sidebar-1 a').removeClass('active');
		$(this).addClass('active');
		$('.sidebar-1-xq>div').css('display', 'none');
		$('.sidebar-1-xq>div').eq($(this).index()).css('display', 'block');
	});
});