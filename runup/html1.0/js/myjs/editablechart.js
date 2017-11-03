//var myChart = echarts.init(document.getElementById('chart'));
/**
 * 工具栏标签页左右切换
 */
$(function () {
	$('.indicator-wrap').on('click', 'a', function () {
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();
		$('.tab').hide().eq(index).show();
	})
})
/**
 * 
 * 显示图表   --------折线 
 */
/**
 *chart-args-wrap的高度改变，重新渲染
 */
function _rerender() {
	var OFFSET = 10; //下偏移
	var $chartwrap = $('.chart-args-wrap');
	var h = $chartwrap.outerHeight() + parseFloat($chartwrap.css('marginBottom')) + OFFSET;
	$('.chart-box').css({ top: h });
	myChart.resize();
}
/**
 * 添加对比
 */
$(function () {
	$('.add-duibi').on('click', function (e) {
		$(this).hide().closest('.c-item').next().show();
		_rerender();
	})
})

/**
 * 移除对比
 */

$(function () {
	$('.remove-duibi').on('click', function (e) {
		$(this).closest('.c-item').hide().prev().show().find('.add-duibi').show();
		_rerender();
	})
})

/**
 * 添加次轴
 */
$(function () {

	$('.add-cizhou').on('click', function (e) {
		var $citem = $(this).closest('.c-item');
		if ($citem.find('.y-item li').length) {
			$(this).hide()
			$citem.next().show();
			_rerender()
		}
	})
})

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

// $(function () {
// 	$('.x-item').on('click', '.target', function (e) {
// 		$(this).toggleClass('active');
// 	})
// })



/**
 * 点击右侧区域字段数值的下拉框
 */

$(function () {
	$('.type-ava').on('click', function () {
		$(this).toggleClass('active');
	}).on('mouseleave',function(){
		$(this).removeClass('active')
	})
})






/**
 * 点击右侧区域中的图表类型按钮出现下拉
 * 
 */
$(function () {
	$(document).on('click', '.target-inner', function (e) {
		$(this).toggleClass('active');
	}).on('mouseleave','.target-inner',function(){
		$(this).removeClass('active')
	})
})
/**
 * 点击颜色设置中的配色内的下拉框
 * 
 */
$(function () {

	$('.default-color').on('click', function (e) {
		$(this).toggleClass('active');
	})
})
/**
 * 点击左侧颜色
 * 
 */
$(function () {

	$('.color-pick .item').on('click', function (e) {
		//出现颜色选择框以及存储点击的item
		$('.color-setup').toggle().data('index', this);

	})
})
$(function () {

	$('.color-setup .close,.color-setup .cancel').on('click', function (e) {
		$('.color-setup').toggle();
	})
	$('.color-setup .queding').on('click', function (e) {
		var $color = $('.color-setup .item-list').find('.item.active .color');
		var color = $color.css('backgroundColor');
		//找到点击的item
		$($('.color-setup').data('index')).find('.color').css({ backgroundColor: color })
		myChart.setOption({
			color: [color]
		})
		$('.color-setup .close').click();
	})
})
/**
 * 颜色选择器
 */
$(function () {
	function _pickColor() {
		var $color = $('.color-setup .item-list').find('.item.active .color');
		var color = $color.css('backgroundColor');
		$('#pick').spectrum({
			color: color,
			preferredFormat: "hex",
			containerClassName: 'Mydefine',
			showInput: true,
			chooseText: "确定",
			cancelText: "取消",
			move: function (color) {
				$color.css({ background: '#' + color.toHex() })
			}
		})
	}
	//初始化
	//_pickColor();
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

$(function () {
	$('.drag-wrap').on('click', '.filter-item', function (e) {
		$(this).toggleClass('active');

	})
})
$(function () {
	$('.drag-wrap').on('click', '.filter-item .icon-edit-blue', function (e) {
		$('.edit-filter').toggle();
		e.stopPropagation();
	})
})

/**
 * 筛选器中的选项切换
 */

$(function () {

	$(document).on('click', '.Myselect .wrap', function () {
		$(this).toggleClass('active');
	}).on('mouseleave', '.Myselect .wrap', function () {
		$(this).removeClass('active');
	})
	$(document).on('click', '.op-list a', function () {
		$(this).closest('.wrap').find('.Myselect-value').text($(this).text().trim());
	})

	$(document).on('click', '.edit-filter .Myselect  .wrap,.huizong .Myselect  .wrap', function () {
		if ($(this).find('.Myselect-value').text() === '区间') {
			$(this).closest('.Myselect').siblings('.disappear').show().end().next().find('input').removeClass('addwidth')
		} else {
			$(this).closest('.Myselect').siblings('.disappear').hide().end().next().find('input').addClass('addwidth')
		}
	})
})
$(function () {
	$('.edit-filter .close,.edit-filter .cancel').on('click', function (e) {
		$('.edit-filter').toggle();
	})
})
/**
 * 拖拽维度和数值
 */
$(function () {
	$('.ziduan-list .draggable').draggable({
		scroll: false,
		zIndex: 1000,
		helper: "clone"
	});
	//离开容器
	$('.chart-args').droppable({
		accept: ".target",
		out: function (event, ui) {
			var $draggable = ui.draggable;
			$draggable.data('remove', true);
		},
		over: function (event, ui) {
			var $draggable = ui.draggable;
			$draggable.data('remove', false);
		}
	});
	//字段、数值轴托拖动
	$(".chart-args .x-item").droppable({
		accept: ".draggable",
		drop: function (event, ui) {
			var $draggable = ui.draggable;
			var $text = $draggable.find('.text');
			var text = $text.text();
			var s = "<li class='target'>" +
				"<span class='target-inner' href='javascript:void(0)'>" +
				"<span class='text'>" + text + "</span>" +
				"<i class='icon  icon-arrow-blue-down'></i>" +
				"<div class='jisuan-list'>" +
				"<ul class='js-list'>" +
				'<li>' +
				' <a href="javascript:void(0)">设置字段</a>' +
				'</li>' +
				"<li class='more paixu no-border'>" +
				'<a href="javascript:void(0)"> 对齐方式' +
				" <i class='icon icon-more pull-right'></i>" +
				"</a>" +
				"<ul class='px-list paixu'>" +
				'<li><a href="javascript:void(0)">左对齐</a></li>' +
				'<li><a href="javascript:void(0)">居中</a></li>' +
				'<li><a href="javascript:void(0)">右对齐</a></li>' +
				'</ul>' +
				'</li>' +
				"<li class='more paixu no-border'>" +
				'<a href="javascript:void(0)"> 排序' +
				"<i class='icon icon-more pull-right'></i>" +
				'</a>' +
				"<ul class='px-list'>" +
				'<li><a href="javascript:void(0)">默认</a></li>' +
				'<li><a href="javascript:void(0)">升序</a></li>' +
				'<li><a href="javascript:void(0)">降序</a></li>' +
				'</ul>' +
				'</li>' +
				'</ul>' +
				'</div>' +
				"</span>" +
				"</li>";

			$(this).append(s);
			//添加渲染
			$('.chart-args .x-item > li').draggable({
				scroll: false,
				helper: "clone",
				zIndex: 1000,
				stop: function (event, ui) {
					if ($(ui.helper.context).data('remove')) {
						$(ui.helper.context).remove()
					}

				}
			});
		}
	});

	$(".chart-args .y-item").droppable({
		accept: ".draggable",
		drop: function (event, ui) {
			var $draggable = ui.draggable;
			var text = $draggable.find('.text').text();
			var s = `
             <li class='target'>
				<span class='target-inner'>
					<span class='text'>邮件营销(求和)</span>
					<i class='icon  icon-arrow-blue-down'></i>
					<div class='jisuan-list'>
						<ul class='js-list'>
							<li class='active'>
								<a href="javascript:void(0)">
										求和
										</a>
							</li>
							<li>
								<a href="javascript:void(0)">
										平均值
										</a>
							</li>
							<li>
								<a href="javascript:void(0)">
										计数
										</a>
							</li>
							<li>
								<a href="javascript:void(0)">
										去重计数
										</a>
							</li>
							<li class='more paixu'>
								<a href="javascript:void(0)">
									更多
									<i class='icon icon-more pull-right'></i>
								</a>
								<ul class='px-list'>
									<li><a href="javascript:void(0)">最大值</a></li>
									<li><a href="javascript:void(0)">最小值</a></li>
									<li><a href="javascript:void(0)">中位数</a></li>
									<li class='more2 paixu2'>
										<a href="javascript:void(0)">
											百分比
											<i class='icon icon-more pull-right'></i>
										</a>
										<ul class='px-list2'>
											<li><a href="javascript:void(0)">5</a></li>
											<li><a href="javascript:void(0)">10</a></li>
											<li><a href="javascript:void(0)">25</a></li>
											<li class='baifenbi'><a href="javascript:void(0)">自定义</a></li>
										</ul>
									</li>
								</ul>
							</li>
							<li class='more paixu'>
								<a href="javascript:void(0)">
										高级计算
									<i class='icon icon-more pull-right'></i>
								</a>
								<ul class='px-list'>
									<li class='tongbihuanbi'><a href="javascript:void(0)">同比/环比</a></li>
									<li><a href="javascript:void(0)">百分比</a></li>
									<li class='liucunlv'><a href="javascript:void(0)">留存率</a></li>
								</ul>
							</li>
							<li class='shujuxianshigeshi'>
								<a href="javascript:void(0)">
									数据显示格式
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
										设置字段
										</a>
							</li>
							<li class='jieguoshaixuan'>
								<a href="javascript:void(0)">
									结果筛选器
								</a>
							</li>
							<li class='more  paixu'>
								<a href="javascript:void(0)">
									排序
									<i class='icon icon-more pull-right'></i>
								</a>
								<ul class='px-list'>
									<li><a href="javascript:void(0)">默认</a></li>
									<li><a href="javascript:void(0)">升序</a></li>
									<li><a href="javascript:void(0)">降序</a></li>
								</ul>
							</li>
						</ul>
					</div>
				</span>
            </li>
			`;
			$(this).append(s);
			$('.chart-args .y-item > li').draggable({
				scroll: false,
				helper: "clone",
				zIndex: 1000,
				stop: function (event, ui) {
					if ($(ui.helper.context).data('remove')) {
						$(ui.helper.context).remove()
					}
				}
			});
		}
	});
	/**
	 * 筛选器
	 */
	$(".drag-wrap").droppable({
		accept: ".draggable",
		drop: function (event, ui) {
			var $draggable = ui.draggable;
			var text = $draggable.find('.text').text();
			$(this).find('.drag').remove();
			var s = '<div class="filter-item">' +
				'<a href="javascript:void(0)">' + text + '</a>' +
				'<i class="icon icon-edit-blue"></i>' +
				'<i class="icon icon-arrow-blue-down"></i>' +
				'<div class="jisuan-list">' +
				'<h5>满足条件</h5>' +
				' <ul class="js-list">' +
				'<li>' +
				"10000<span class='zhi'> 至</span>90000" +
				'</li>' +
				'</ul>' +
				'</div>' +
				'</di>'
			$(this).append(s);
			$('.drag-wrap .filter-item').draggable({
				scroll: false,
				helper: "clone",
				zIndex: 1000,
				stop: function (event, ui) {
					if ($(ui.helper.context).data('remove')) {
						$(ui.helper.context).remove()
						if ($('.drag-wrap').find('.filter-item').length === 1) {
							$('.drag-wrap').append('<div class="drag text-center"></div>')
						}
					}

				}
			});

		}
	});
	$(".drag-container").droppable({
		accept: ".filter-item",
		out: function (event, ui) {
			var $draggable = ui.draggable;
			$draggable.data('remove', true);
		},
		over: function (event, ui) {
			var $draggable = ui.draggable;
			$draggable.data('remove', false);
		}
	});
})

/**
 * modal 一些点击事件，只作为页面输出的时的一些展示，不作为功能，套页面时会用angular改写相关事件
 */
$(function () {
	$('.modal-item .close,.modal-item .cancel').on('click', function (e) {
		$(this).closest('.modal-item').hide();
	})
})
/**
 * 维度显示切换
 */

$(function () {
	$('.wei-du').on('click', 'input[type=checkbox]', function () {
		$('.wei-du').find('.items').toggle()
	})
})
/**
 * 辅助线
 */
$(function () {
	$(document).on('click', '.Myselect .wrap', function (e) {
		var $value = $(this).find('.Myselect-value');
		if ($value.text() === '固定值') {
			$(this).parent().siblings('.Myselect-r').hide()
			$(this).parent().siblings('.input-r').show()

		} else {
			$(this).parent().siblings('.Myselect-r').show()
			$(this).parent().siblings('.input-r').hide()
		}
	})
	$('#fuzhuxian').on('click', function (e) {
		$('.tianjiafuzhuxian').show();
	})
})
$('.tianjiafuzhuxian').on('click', '.icon-edit-add', function () {

    //var s = `
    //    <div class="content">
    //                <input class='input'>
    //                <div class="Myselect" id='valuetype'>
    //                    <div class="wrap">
    //                        <div class="Myselect-value">固定值</div>
    //                        <input style='display:none'>
    //                        <i class="icon icon-arrow-down"></i>
    //                        <div class='op-list-wrap'>
    //                            <ul class="op-list">
    //                                <li>
    //                                    <a href="javascript:void(0)">固定值</a>
    //                                </li>
    //                                <li>
    //                                    <a href="javascript:void(0)">计算值</a>
    //                                </li>
    //                            </ul>
    //                        </div>
    //                    </div>
    //                </div>
    //                <div class="Myselect Myselect-r" style='display: none'>
    //                    <div class="wrap">
    //                        <div class="Myselect-value">城市(计数)</div>
    //                        <input style='display:none'>
    //                        <i class="icon icon-arrow-down"></i>
    //                        <div class='op-list-wrap'>
    //                            <ul class="op-list">
    //                                <li>
    //                                    <a href="javascript:void(0)">城市(计数)</a>
    //                                </li>
    //                                <li>
    //                                    <a href="javascript:void(0)">城市(计数)</a>
    //                                </li>
    //                            </ul>
    //                        </div>
    //                    </div>
    //                </div>
    //                <div class="Myselect Myselect-r" style='display: none'>
    //                    <div class="wrap">
    //                        <div class="Myselect-value">最大值</div>
    //                        <input style='display: none'>
    //                        <i class="icon icon-arrow-down"></i>
    //                        <div class='op-list-wrap'>
    //                            <ul class="op-list">
    //                                <li>
    //                                    <a href="javascript:void(0)">平均值</a>
    //                                </li>
    //                                <li>
    //                                    <a href="javascript:void(0)">最大值</a>
    //                                </li>
    //                                <li>
    //                                    <a href="javascript:void(0)">最小值</a>
    //                                </li>
    //                            </ul>
    //                        </div>
    //                    </div>
    //                </div>
    //                <input class='input  input-r'>
    //                <i class='icon  icon-edit-add'></i>
    //                <i class='icon  icon-minus'></i>
    //            </div>
    //`
	//$('.content-wrap').append(s)
	$(this).parent().after($(this).parent().clone());
})
$('.tianjiafuzhuxian').on('click', '.icon-minus', function () {
	$(this).closest('.content').remove();
})
$(function () {
	$('.add-tiaojian').on('click', function () {
		$('.tiaojian-geshi').show()
	})
	$('.tiaojian-geshi-edit').on('click', '.input-2', function () {
		$(this).find('.yangshi').toggle()
	})
	$('.tiaojian-geshi').on('click', '.close', function () {
		$('.tiaojian-geshi').hide()
	})
	$('.tiaojian-geshi').on('click', '.cancel,.queding', function () {
		$('.tiaojian-geshi').hide()
	})
	$('.tiaojian-geshi-edit').on('click', '.close', function () {
		$('.tiaojian-geshi-edit').hide()
	})
	$('.tiaojian-geshi-edit').on('click', '.cancel,.queding', function () {
		$('.tiaojian-geshi-edit').hide()
	})
	var s = `
    <div class="content"><i class='icon icon-edit-condition'></i> <div class="Myselect  Myselect-1"> <div class="wrap"> <div class="Myselect-value">不等于 </div> <input style='display: none'> <i class="icon icon-arrow-down"></i> <div class='op-list-wrap'> <ul class="op-list"> <li> <a href="javascript:void(0)">x</a> </li> <li> <a href="javascript:void(0)">不等于</a> </li> </ul> </div> </div> </div> <div class="Myselect  Myselect-2"> <div class="wrap"> <div class="Myselect-value"> 不等于</div> <input style='display: none'> <i class="icon icon-arrow-down"></i> <div class='op-list-wrap'> <ul class="op-list"> <li> <a href="javascript:void(0)">等于</a> </li> <li> <a href="javascript:void(0)">不等于</a> </li> <li> <a href="javascript:void(0)">大于</a> </li> <li> <a href="javascript:void(0)">小于</a> </li> <li> <a href="javascript:void(0)">大于等于</a> </li> <li> <a href="javascript:void(0)">小于等于</a> </li> <li> <a href="javascript:void(0)">区间</a> </li> </ul> </div>  </div> </div> <input class='input input-1'> <span class='mg'>样式</span> <span class='input input-2 input-3'> <i  class="icomoon icomoon-arrow-up"></i> Tt <i class='icon icon-arrow-down'></i> <div class='yangshi  Common-close' style='display: none'> <div class="title"> &nbsp; <a class='icon  icon-close close' href="javascript:void(0)"></a> </div> <ul class="yangshi-inner clearfix"> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color: #c54440"> <i class="icomoon icomoon-arrow-up"></i>Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color: #33aa65"> <i class="icomoon icomoon-arrow-down"></i>Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color: #a6aaae"> <i class="icomoon icomoon-arrow-equal"></i>Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color:#a6aaae "> Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color: #ef834a"> Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color:#6689c5 "> Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color:#6f749b "> Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color:#d9540e "> Tt </a> </li> <li class="pull-left" > <a  class="text-center "  href="javascript:void(0)" style="color:#87ad81 "> Tt </a> </li> </ul> <div class='line'></div> <div class='zidingyi-wrap'> <h5 class='zidingyi'>自定义</h5> <div class='clearfix'> <div class="pull-left item"> 样式 <span class='icon-wrap text-center   yangshi-icon'> <i id='show-icon' class="  icomoon icomoon-remove"></i> <div class="icon-wrap-inner"  style='display: none'> <ul class='clearfix'> <li  class="pull-left"> <a href="javascript:;" class=""> <i class="icomoon icomoon-arrow-down"></i> </a> </li> <li  class="pull-left"> <a href="javascript:;" class=""> <i class="icomoon icomoon-arrow-up"></i> </a> </li> <li  class="pull-left"> <a href="javascript:;" class=""> <i class="icomoon icomoon-arrow-equal"></i> </a> </li> <li  class="pull-left"> <a href="javascript:;" class=""> <i class="icomoon icomoon-ok"></i> </a> </li> <li  class="pull-left"> <a href="javascript:;" class=""> <i class="icomoon icomoon-remove"></i> </a> </li> <li  class="pull-left"> <a href="javascript:;" class=""> <i class="icomoon icomoon-attention"></i> </a> </li> </ul> <div class="line"></div> <div class="wuyanshi text-left"> <a href="javascript:;" class="text-center" > <i class="icomoon icomoon-ban-circle"></i> </a> 无样式 </div> </div> </span>  </div> <div class="pull-left item"> 文字 <span class='pick2 icon-wrap wrap-2 text-center' style='background:red'> &nbsp; </span> </div>  </div> </div> </div>  </span> <i class='icon  icon-edit-add'></i> <i class='icon  icon-minus'></i></div>
    `;

	var s2 = `
     <div class="content">
                    <i class='icon icon-edit-condition'></i> 完成率
                    <div class="Myselect  Myselect-2">
                        <div class="wrap">
                            <div class="Myselect-value"> 不等于</div>
                            <input style='display: none'>
                            <i class="icon icon-arrow-down"></i>
                            <div class='op-list-wrap'>
                                <ul class="op-list">
                                    <li>
                                        <a href="javascript:void(0)">等于</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">不等于</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">大于</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">小于</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">大于等于</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">小于等于</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">区间</a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <input class='input input-1  input-right1'>
                    <input class='input input-1  input-right2' style='display:none'>
                    <span class='input-right2' style='display:none'>~</span>
                    <input class='input input-1  input-right2' style='display:none'>
                    <span class='mg'>颜色</span>
                    <span class='input input-2' style="background: #c54440;">
                         &nbsp;
                   <i class='icon icon-arrow-down'></i>
                   <div class='yangshi  Common-close' style='display:none'>
                       <div class="title">
                           &nbsp;
                           <a class='icon  icon-close close' href="javascript:void(0)"></a>
                       </div>
                        <ul class="yangshi-inner clearfix">
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background: #c54440">                                 
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background: #33aa65">                                   
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background: #a6aaae">                                   
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#a6aaae ">                                  
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background: #ef834a"></a>                                   
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#6689c5 ">
                                 
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#6f749b ">
                               
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#d9540e ">                                   
                                </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#87ad81 "> </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#87ad81 "> </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#87ad81 "> </a>
                            </li>
                            <li class="pull-left" >
                                <a  class="text-center "  href="javascript:void(0)" style="background:#87ad81 "> </a>
                            </li>
                        </ul>
                        <div class='line'></div>
                        <div class='zidingyi-wrap'>                          
                                <div class='clearfix zidingyi'>
                                        <div >
                                        自定义颜色
                                        </div>
                                        <div>
                                        <span> 背景 </span>
                    <span class='pick2 icon-wrap wrap-2 text-center' style='background:red'>
                                            &nbsp; 
                                        </span>
                </div>
            </div>
        </div>
    </div>
    </span>
    <i class='icon icon-edit-add  icon-edit-add-2' ></i>
    <i class='icon icon-minus'></i>
    </div>
    `;
	var s3 = '<div class="content"> <i class="icon icon-edit-condition"></i> <div class="Myselect  Myselect-1"> <div class="wrap"> <div class="Myselect-value">xx </div> <input style="display: none"> <i class="icon icon-arrow-down"></i> <div class="op-list-wrap"> <ul class="op-list"> <li> <a href="javascript:void(0)">x</a> </li> <li> <a href="javascript:void(0)">xx</a> </li> </ul> </div> </div> </div> <div class="Myselect  Myselect-2"> <div class="wrap"> <div class="Myselect-value"> 不等于</div> <input style="display: none"> <i class="icon icon-arrow-down"></i> <div class="op-list-wrap"> <ul class="op-list"> <li> <a href="javascript:void(0)">等于</a> </li> <li> <a href="javascript:void(0)">不等于</a> </li> <li> <a href="javascript:void(0)">大于</a> </li> <li> <a href="javascript:void(0)">小于</a> </li> <li> <a href="javascript:void(0)">大于等于</a> </li> <li> <a href="javascript:void(0)">小于等于</a> </li> <li> <a href="javascript:void(0)">区间</a> </li> </ul> </div>  </div> </div> <input class="input input-1"> <span class="mg">配色</span> <span class="input input-2"> Tt <i class="icon icon-arrow-down"></i> <div class="yangshi  Common-close biaoge_yangshi" style="display: none"> <div class="title"> &nbsp; <a class="icon  icon-close close" href="javascript:void(0)"></a> </div> <ul class="yangshi-inner clearfix"> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #f4d9d7; color: #aa4a46;">Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #cce7bc; color: #4d8d68;">Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #f9cfb8;color: #c6532f;">Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #daeaf6;color: #6689c5;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #e66976;color: #fffefe;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #6689c5;color: #fffefe;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #ef834a;color: #fffefe;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #87ad81;color: #fffefe;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #aa4a46;color: #fffefe;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #6f749b;color: #fffefe;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #a6aaae;color: #fffefe;"> Tt </a> </li> <li class="pull-left"> <a class="text-center " href="javascript:void(0)" style="background: #c8cbce;color: #fffefe;"> Tt </a> </li> </ul> <div class="line"></div> <div class="zidingyi-wrap"> <h5 class="zidingyi">自定义</h5> <div class="clearfix"> <div class="pull-left item"> 背景 <span class="pick1 icon-wrap wrap-2 text-center" style="background:red">&nbsp;</span> </div> <div class="pull-left item">文字<span class="pick2 icon-wrap wrap-2 text-center" style="background:red">&nbsp;</span> </div>  </div> </div> </div> </span> <i class="icon  icon-edit-add icon-edit-add2"></i> <i class="icon  icon-minus"></i> </div>';

	$('.tiaojian-geshi-edit').on('click', '.icon-edit-add', function () {
		if ($(this).hasClass('icon-edit-add-2')) {
			$('.content-wrap').append(s2);
			return;
		}
		if ($(this).is('.icon-edit-add2')) {
			$('.content-wrap').append(s3);
			return;
		}
		$('.content-wrap').append(s)
	})
	$('.tiaojian-geshi-edit').on('click', '.icon-minus', function () {
		$(this).closest('.content').remove();
	})
	$('.tianjia').on('click', function () {
		$('.tiaojian-geshi-edit').show()
		$('.tiaojian-geshi').hide()
	})

	$(document).on('click', '.Myselect .wrap', function (e) {
		var $value = $(this).find('.Myselect-value');
		if ($value.text() === '区间') {
			$(this).parent().siblings('.input-right1').hide()
			$(this).parent().siblings('.input-right2').show()

		} else {
			$(this).parent().siblings('.input-right1').show()
			$(this).parent().siblings('.input-right2').hide()
		}
	})
})

$(function () {
	if ($('input.datepicker').size()) {
		$('input.datepicker').Zebra_DatePicker({
			default_position: 'below',
			offset: [-180, 40],
			show_clear_date: false
		});
	}

})

$(function () {
	//颜色取色器
	var $pick2 = $('.pick2');
	var color = $pick2.css('backgroundColor');
	$pick2.spectrum({
		color: color,
		preferredFormat: "hex",
		containerClassName: 'Mydefine',
		showInput: true,
		chooseText: "确定",
		cancelText: "取消",
		move: function (color) {
			$pick2.css({ background: '#' + color.toHex() })
		}
	});

	var $pick1 = $('.pick1');
	var color = $pick1.css('backgroundColor');
	$pick1.spectrum({
		color: color,
		preferredFormat: "hex",
		containerClassName: 'Mydefine',
		showInput: true,
		chooseText: "确定",
		cancelText: "取消",
		move: function (color) {
			$pick1.css({ background: '#' + color.toHex() })
		}
	});

})

$(function () {

	$(document).on('click', '.transfer .add', function (e) {
		var text = $(this).closest('.condition').find('.input').val();
		var s = `
            <li>
            <div class='condition-item'>不等于</div>
            <div class='condition-value'>${text}</div>
            <a class='remove' href="javascript:void(0)">
            <i class='icon icon-filter-remove'></i>
            </a>
            </li>
        `;
		var $wrap = $(this).closest('.content').find('.condition-wrap ul');
		$wrap.prepend(s);
		if ($wrap.find('li').length > 1) {
			$wrap.closest('.condition-wrap').prev().show()
		} else {
			$wrap.closest('.condition-wrap').prev().hide()
		}

	})
	$(document).on('click', '.condition-wrap  .icon-filter-remove', function (e) {

		var $wrap = $(this).closest('.content').find('.condition-wrap ul');

		if ($wrap.find('li').length > 2) {
			$wrap.closest('.condition-wrap').prev().show()
		} else {
			$wrap.closest('.condition-wrap').prev().hide()
		}

		$(this).closest('li').remove();

	})

})

$('.increase').on('click', function () {
	var $input = $(this).siblings('.input');
	$input.val() || $input.val(0);
	if ($(this).hasClass('increase2') && $input.val() >= 100) {
		return;
	}
	$input.val(parseInt($input.val()) + 1)
})

$('.decrease').on('click', function () {
	var $input = $(this).siblings('.input');
	$input.val() || $input.val(0);
	if ($(this).hasClass('decrease2') && $input.val() <= 0) {
		return;
	}
	$input.val(parseInt($input.val()) - 1)
})





$(document).on('click', '#riqiziduan  a', function () {


	var target = $(this).data('to').trim();

	$('.tongbi').find('.Myselect[data-target]').hide().end().find('.Myselect[data-target=' + target + ']').show()
	$('.tongbi').find('.sub-item[data-target]').hide().end().find('.sub-item[data-target=' + target + ']').show()



})


$(document).on('click', '.baifenbi', function (e) {

	$('.baifenwei').show();
})
$(document).on('click', '.shujuxianshigeshi', function (e) {

	$('.xianshigeshi').show();
})
$(document).on('click', '.jieguoshaixuan', function (e) {

	$('.huizong').show();
})
$(document).on('click', '.tongbihuanbi', function (e) {

	$('.tongbi').show();
})
$(document).on('click', '.liucunlv', function (e) {

	$('.liucunlvshezhi').show();
})


$(document).on('mouseenter', '.ct-wrap', function () {

	var top = $(this).offset().top;
	var left = $(this).offset().left;

	$('.tool-tip').show().css({
		top: top - 20,
		left: left + 80
	}).stop(true, false).animate({
		top: top - 20,
		left: left + 50
	}).find('.tt-head').text($(this).data('type'))
})
$(document).on('mouseleave', '.ct-wrap', function () {
	$('.tool-tip').hide()
})


