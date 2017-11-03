
///**
//* 工具栏标签页左右切换
//*/
//$(function () {
//    $('.indicator-wrap').on('click', 'a', function () {
//        $(this).addClass('active').siblings().removeClass('active');
//        var index = $(this).index();
//        $('.tab').hide().eq(index).show();
//    })
//})
/**
 * 
 * 显示图表   --------折线 
 */


/**
 *chart-args-wrap的高度改变，重新渲染
 */

function _rerender() {
    var OFFSET = 10;//下偏移
    var $chartwrap = $('.chart-args-wrap');
    var h = $chartwrap.outerHeight() + parseFloat($chartwrap.css('marginBottom')) + OFFSET;
    $('.chart-box').css({ top: h });
   // myChart.resize();
}
///**
//* 添加对比
//*/
//$(function () {
//    $('.add-duibi').on('click', function (e) {
//        $(this).hide().closest('.c-item').next().show();
//        _rerender();
//    })
//})

///**
// * 移除对比
// */
//
//$(function () {
//    $('.remove-duibi').on('click', function (e) {
//        $(this).closest('.c-item').hide().prev().show().find('.add-duibi').show();
//        _rerender();
//    })
//})


///**
//* 添加次轴
//*/
//$(function () {
//
//    $('.add-cizhou').on('click', function (e) {
//        var $citem = $(this).closest('.c-item');
//        if ($citem.find('.y-item li').length) {
//            $(this).hide()
//            $citem.next().show();
//            _rerender()
//        }
//    })
//})
/**
 * 移除次轴
 */

$(function () {
    $('.remove-cizhou').on('click', function (e) {
        $(this).closest('.c-item').hide().prev().show().find('.add-cizhou').show();
        _rerender()
    })
})
/**
 * 点击y轴的项目
 */

//$(function () {
//  
//})
/**
 * 点击右侧区域字段数值的下拉框
 */

//$(function () {
//    $('.type-ava').on('click', function () {
//        $(this).toggleClass('active');
//    })
//})

/**
 * 点击右侧区域中的图表类型按钮出现下拉
 * 
 */
//$(function () {
//
//})

///**
// * 点击左侧颜色
// * 
// */
//$(function () {
//
//    $('.color-pick .item').on('click', function (e) {
//        //出现颜色选择框以及存储点击的item
//        $('.color-setup').toggle().data('index', this);
//
//    })
//})
//$(function () {
//
//    $('.color-setup .close,.color-setup .cancel').on('click', function (e) {
//        $('.color-setup').toggle();
//    })
//    $('.color-setup .queding').on('click', function (e) {
//        var $color = $('.color-setup .item-list').find('.item.active .color');
//        var color = $color.css('backgroundColor');
//        //找到点击的item
//        $($('.color-setup').data('index')).find('.color').css({ backgroundColor: color })
//        myChart.setOption({
//            color: [color]
//        })
//        $('.color-setup .close').click();
//    })
//})
/**
 * 颜色选择器
 */
$(function () {
    function _pickColor() {
        var $color = $('.color-setup .item-list').find('.item.active .color');
        var color = $color.css('backgroundColor');

    }
    //初始化
    _pickColor();
    $('.color-setup .item-list').on('click', '.item', function () {
        $(this).addClass('active').siblings().removeClass('active');
        _pickColor();

    })
})
/**
 *  未保存
 */

$(function () {
    $('.save-dia .close,.save-dia .cancel').on('click', function (e) {
        $('.save-dia').toggle();
    })
})
/**
 * 点击筛选器
 */
//$(function () {
//    $('.drag-wrap').on('click', '.filter-item .icon-edit-blue', function (e) {
//        $('.edit-filter').toggle();
//        e.stopPropagation();
//    })
//})

/**
 * 筛选器中的选项切换
 */

$(function() {

	$(document).on('click', '.Myselect .wrap', function() {
		$(this).toggleClass('active');
	}).on('mouseleave', '.Myselect .wrap', function() {
		$(this).removeClass('active');
	})
	$(document).on('click', '.op-list a', function() {
		$(this).closest('.wrap').find('.Myselect-value').text($(this).text());
	})
})

//$(function () {

//    $('.Myselect .wrap').on('click', function () {
//        $(this).toggleClass('active');
//    })
//    $('.op-list').on('click', 'a', function () {
//        $('.Myselect-value').text($(this).text());
//    })
//    $('.edit-filter .Myselect  .wrap').on('click', function () {
//        if ($(this).find('.Myselect-value').text() === '区间') {
//            $('.edit-filter .Myselect').siblings('.disappear').show().end().next().removeClass('addwidth')
//        } else {
//            $('.edit-filter .Myselect').siblings('.disappear').hide().end().next().addClass('addwidth')
//        }
    //})
//})
//$(function () {
//    $('.edit-filter .close,.edit-filter .cancel').on('click', function (e) {
//        $('.edit-filter').toggle();
//    })
//})
/**
 * 拖拽维度和数值
 */
$(function () {
//    $('.ziduan-list .draggable').draggable({
//        scroll: false,
//        zIndex: 1000,
//        helper: "clone"
//    });
    //离开容器
//    $('.chart-args').droppable({
//        accept: ".target",
//        out: function (event, ui) {
//            var $draggable = ui.draggable;
//            $draggable.data('remove', true);
//        },
//        over: function (event, ui) {
//            var $draggable = ui.draggable;
//            $draggable.data('remove', false);
//        }
//    });
    //字段、数值轴托拖动
//    $(".chart-args .x-item").droppable({
//        accept: ".draggable",
//        drop: function (event, ui) {
//            var $draggable = ui.draggable;
//            var $text = $draggable.find('.text');
//            var text = $text.text();
//            var s = "<li class='target'>" +
//                "<span class='target-inner' href='javascript:void(0)'>" +
//                "<span class='text'>" + text + "</span>" +
//                "<i class='icon  icon-arrow-blue-down'></i>" +
//                "<div class='jisuan-list'>" +
//                "<ul class='js-list'>" +
//                '<li>' +
//                ' <a href="javascript:void(0)">设置字段</a>' +
//                '</li>' +
//
//
//                "<li class='more paixu no-border'>" +
//                '<a href="javascript:void(0)"> 对齐方式' +
//                " <i class='icon icon-more pull-right'></i>" +
//                "</a>" +
//                "<ul class='px-list paixu'>" +
//                '<li><a href="javascript:void(0)">左对齐</a></li>' +
//                '<li><a href="javascript:void(0)">居中</a></li>' +
//                '<li><a href="javascript:void(0)">右对齐</a></li>' +
//                '</ul>' +
//                '</li>' +
//                "<li class='more paixu no-border'>" +
//                '<a href="javascript:void(0)"> 排序' +
//                "<i class='icon icon-more pull-right'></i>" +
//                '</a>' +
//                "<ul class='px-list'>" +
//                '<li><a href="javascript:void(0)">默认</a></li>' +
//                '<li><a href="javascript:void(0)">升序</a></li>' +
//                '<li><a href="javascript:void(0)">降序</a></li>' +
//                '</ul>' +
//                '</li>' +
//                '</ul>' +
//                '</div>' +
//                "</span>" +
//                "</li>";
//
//            $(this).append(s);
//            //添加渲染
//            $('.chart-args .x-item > li').draggable({
//                scroll: false,
//                helper: "clone",
//                zIndex: 1000,
//                stop: function (event, ui) {
//                    if ($(ui.helper.context).data('remove')) {
//                        $(ui.helper.context).remove()
//                    }
//
//                }
//            });
//        }
//    });
//
//    $(".chart-args .y-item").droppable({
//        accept: ".draggable",
//        drop: function (event, ui) {
//            var $draggable = ui.draggable;
//            var text = $draggable.find('.text').text();
//            var s = "<li class='target'>" +
//                "<span class='target-inner' href='javascript:void(0)'>" +
//                "<span class='text'>" + text + "</span>" +
//                " <i class='icon  icon-arrow-blue-down'></i>" +
//                '<div class="jisuan-list">' +
//                '<ul class="js-list">' +
//                '<li class="active"> <a href="jvascript:void(0)"> 求和 </a> </li>' +
//                '<li> <a href="jvascript:void(0)"> 平均值 </a> </li>' +
//                '<li> <a href="jvascript:void(0)"> 计数 </a> </li>' +
//                '<li> <a href="jvascript:void(0)"> 去重计数 </a> </li>' +
//                '<li class="more">' +
//                '<a href="jvascript:void(0)"> 更多 <i class="icon icon-more pull-right"></i> </a>' +
//                '</li>' +
//                '<li class="more">' +
//                '<a href="jvascript:void(0)"> 高级计算 <i class="icon icon-more pull-right"></i> </a>' +
//                '</li>' +
//                '<li> <a href="jvascript:void(0)"> 数据显示格式 </a> </li>' +
//                '<li> <a href="jvascript:void(0)"> 设置字段 </a> </li>' +
//                '<li> <a href="jvascript:void(0)"> 结果筛选器 </a> </li>' +
//                '<li class="more paixu">' +
//                '<a href="jvascript:void(0)"> 排序 <i class="icon icon-more pull-right"></i> </a>' +
//                '<ul class="px-list">' +
//                '<a href="jvascript:void(0)">' +
//                '</a><li><a href="jvascript:void(0)"></a><a href="javascript:void(0)">排序</a></li>' +
//                '<li><a href="javascript:void(0)">升序</a></li>' +
//                '<li><a href="javascript:void(0)">降序</a></li>' +
//                '</ul>' +
//                '</li>' +
//                '</ul>' +
//                '</div>' +
//                "</span>" +
//                "</li>";
//
//            $(this).append(s);
//            $('.chart-args .y-item > li').draggable({
//                scroll: false,
//                helper: "clone",
//                zIndex: 1000,
//                stop: function (event, ui) {
//                    if ($(ui.helper.context).data('remove')) {
//                        $(ui.helper.context).remove()
//                    }
//
//                }
//            });
//
//        }
//    });
    /**
     * 筛选器
//     */
//    $(".drag-wrap").droppable({
//        accept: ".draggable",
//        drop: function (event, ui) {
//            var $draggable = ui.draggable;
//            var text = $draggable.find('.text').text();
//            $(this).find('.drag').remove();
//            var s = '<div class="filter-item">' +
//                '<a href="javascript:void(0)">' + text + '</a>' +
//                '<i class="icon icon-edit-blue"></i>' +
//                '<i class="icon icon-arrow-blue-down"></i>' +
//                '<div class="jisuan-list">' +
//                '<h5>满足条件</h5>' +
//                ' <ul class="js-list">' +
//                '<li>' +
//                "10000<span class='zhi'> 至</span>90000" +
//                '</li>' +
//                '</ul>' +
//                '</div>' +
//                '</di>'
//
//            $(this).append(s);
//            $('.drag-wrap .filter-item').draggable({
//                scroll: false,
//                helper: "clone",
//                zIndex: 1000,
//                stop: function (event, ui) {
//                    if ($(ui.helper.context).data('remove')) {
//                        $(ui.helper.context).remove()
//                        if ($('.drag-wrap').find('.filter-item').length === 1) {
//                            $('.drag-wrap').append('<div class="drag text-center"></div>')
//                        }
//                    }
//
//                }
//            });
//
//        }
//    });
//    $(".drag-container").droppable({
//        accept: ".filter-item",
//        out: function (event, ui) {
//            var $draggable = ui.draggable;
//            $draggable.data('remove', true);
//        },
//        over: function (event, ui) {
//            var $draggable = ui.draggable;
//            $draggable.data('remove', false);
//
//        }
//    });
})

/**
 * modal 一些点击事件，只作为页面输出的时的一些展示，不作为功能，套页面时会用angular改写相关事件
 */
$(function() {
	$('.modal-item .close,.modal-item .cancel').on('click', function(e) {
		$(this).closest('.modal-item').hide();
	})
	//确定事件
	$('.modal-item .queding').on('click', function(e) {
		$(this).closest('.modal-item').hide();
	})
})
/**
 * 维度显示切换
 */

$(function() {
	$('.wei-du').on('click', 'input[type=checkbox]', function() {
		$('.wei-du').find('.items').toggle()
	})
})

/**
 * 辅助线
 */
$(setTimeout(function() {
	$(document).on('click', '.Myselect .wrap', function(e) {
		var $value = $(this).find('.Myselect-value');
		if($value.text() == '固定值') {
			$(this).parent().siblings('.Myselect-r').hide();
			$(this).parent().siblings('.input-r').show();
		} else {
			$(this).parent().siblings('.Myselect-r').show();
			$(this).parent().siblings('.input-r').hide();
		}
	})
	$('#fuzhuxian').on('click', function(e) {
		$('.tianjiafuzhuxian').show();
	})
},2000))

$('.tianjiafuzhuxian').on('click', '.icon-edit-add', function() {
	var s = `
    <div class="content">
                <input class='input'>
                <div class="Myselect" id='valuetype'>
                    <div class="wrap">
                        <div class="Myselect-value">固定值</div>
                        <input style='display:none'>
                        <i class="icon icon-arrow-down"></i>
                        <div class='op-list-wrap'>
                            <ul class="op-list">
                                <li>
                                    <a href="javascript:void(0)">固定值</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">计算值</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="Myselect Myselect-r" style='display: none'>
                    <div class="wrap">
                        <div class="Myselect-value">城市(计数)</div>
                        <input style='display:none'>
                        <i class="icon icon-arrow-down"></i>
                        <div class='op-list-wrap'>
                            <ul class="op-list">
                                <li>
                                    <a href="javascript:void(0)">城市(计数)</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">城市(计数)</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="Myselect Myselect-r" style='display: none'>
                    <div class="wrap">
                        <div class="Myselect-value">最大值</div>
                        <input style='display: none'>
                        <i class="icon icon-arrow-down"></i>
                        <div class='op-list-wrap'>
                            <ul class="op-list">
                                <li>
                                    <a href="javascript:void(0)">平均值</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">最大值</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)">最小值</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <input class='input  input-r'>
                <i class='icon  icon-edit-add'></i>
                <i class='icon  icon-minus'></i>
            </div>
`
$('.content-wrap').append(s)
})
$('.tianjiafuzhuxian').on('click', '.icon-minus', function() {
	$(this).closest('.content').remove();
})


