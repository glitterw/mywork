// JavaScript Document
$(function() {
	/*动态加载style*/
	function resizeStyleFn() {
		var newsize_x, newsize_y;
		var gridsterW = $('.gridster').width();
		var newStyle = "";
		var lieshu = 25;
		newsize_x = gridsterW / lieshu;
		newsize_y = newsize_x;

		for(var i = 0, len = lieshu * 2; i < len; i++) {
			newStyle += "[data-sizex='" + (i + 1) + "']{ width:" + (newsize_x * (i + 1) - 10) + "px; }\n"
			newStyle += "[data-sizey='" + (i + 1) + "']{ height:" + (newsize_x * (i + 1) - 10) + "px; }\n"
			newStyle += "[data-col='" + (i + 1) + "']{ left:" + (newsize_x * i + 5) + "px; }\n"
			newStyle += "[data-row='" + (i + 1) + "']{ top:" + (newsize_x * i + 5) + "px; }\n"
		}
		if(!document.getElementById('newStyle')) {
			var d = document;
			var tag = d.createElement('style');
			d.getElementsByTagName('head')[0].appendChild(tag);
			tag.id = 'newStyle';
			tag.setAttribute('type', 'text/css');
		}
		var tag = document.getElementById('newStyle');
		if(tag.styleSheet) {
			tag.styleSheet.cssText = newStyle;
		} else {
			tag.innerHTML = '';
			tag.appendChild(document.createTextNode(newStyle));
		}
	};

	/*仪表盘开始*/
	if(document.getElementById('dash_board')) {

		//加载完个点位置
		function gdADomjson(gridster) {
			var gridster_WHTLAll = [];
			for(var ii = 0, len = gridster.$widgets.length; ii < len; ii++) {
				var gridster_WHTL = gridster.$widgets[ii].dataset;
				gridster_WHTL['id'] = gridster.$widgets[ii].id;
				gridster_WHTLAll.push(gridster_WHTL);
			}
			return gridster_WHTLAll;
		}

		resizeStyleFn();

		var gridster;

		var newsize_x, newsize_y;
		var gridsterW = $('.gridster').width();
		var newStyle = "";
		var lieshu = 25;
		newsize_x = gridsterW / lieshu - 10;
		newsize_y = newsize_x;

		gridster = $(".gridster ul").gridster({ //通过jquery选择DOM实现gridster
			widget_base_dimensions: [newsize_x, newsize_y], //模块的宽高 [宽,高]
			widget_margins: [5, 5], //模块的间距 [上下,左右] 
			autogenerate_stylesheet: false,
			resize: {
				min_size: [5, 5],
				max_size: [25, 25],
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
				start: function(event, ui) { console.log('开始拖') },
				//结束拖动，结束相关点
				stop: function(event, ui) {
					for(var ii = 0; ii < this.$changed.length; ii++) {
						console.log(this.$changed[ii]);
					}
				}
			}
		}).data('gridster');

		$(window).resize(function() {

			resizeStyleFn();

			var ArrJson = gdADomjson(gridster);

			var newgd_Boxhtml = '';

			for(var i = 0, len = ArrJson.length; i < len; i++) {
				newgd_Boxhtml += "<li id='" + ArrJson[i]['id'] + "' data-row='" + ArrJson[i]['row'] + "' data-col='" + ArrJson[i]['col'] + "' data-sizex='" + ArrJson[i]['sizex'] + "' data-sizey='" + ArrJson[i]['sizey'] + "'><i class='handleBox'></i></li>"
			}

			newgd_Boxhtml = "<ul>" + newgd_Boxhtml + "</ul>"

			var gd_li_c = $('.contentBox');

			$('#gridster1').after('<div id=gridster2></div>')

			$('#gridster2').html(newgd_Boxhtml);

			var gd_li = $('#gridster2 ul li');

			gd_li.each(function(i) {
				gd_li.eq(i).append(gd_li_c.eq(i));
			});

			$('#gridster1').remove();

			$('#gridster2').addClass('gridster').attr('id', 'gridster1');

			$('#gridster1').after('<div id=gridster2></div>');

			var newsize_x, newsize_y;
			var gridsterW = $('.gridster').width();
			var newStyle = "";
			var lieshu = 25;
			newsize_x = gridsterW / lieshu - 10;
			newsize_y = newsize_x;

			gridster = $(".gridster ul").gridster({ //通过jquery选择DOM实现gridster
				widget_base_dimensions: [newsize_x, newsize_y], //模块的宽高 [宽,高]
				widget_margins: [5, 5], //模块的间距 [上下,左右] 
				autogenerate_stylesheet: false,
				resize: {
					min_size: [5, 5],
					max_size: [24, 24],
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
					start: function(event, ui) { console.log('开始拖') },
					//结束拖动，结束相关点
					stop: function(event, ui) {
						for(var ii = 0; ii < this.$changed.length; ii++) {
							console.log(this.$changed[ii]);
						}
					}
				}
			}).data('gridster');

			$('#gridster2').remove();
		});

		//删除节点
		$('.close').click(function() {
			gridster.remove_widget($(this).parents("li"));
		});

		//添加节点
		var appendDom = '<li><i class="handleBox"></i><div class="contentBox"></div></li>';
		$('.append').click(function() {
			gridster.add_widget(appendDom, 7, 3, 1, 1);
		});

		/*导出*/
		$('.dcybp').click(function() {
			$('#daochuybp').css('display', 'block');
			$('body').addClass('mengceng');
		});
		$('.daochuybp_a').click(function() {
			$(this).addClass('on').siblings().removeClass('on');
			$(this).siblings('input').val($(this).index('.daochuybp_a') + 1);
		});

		$('.fxybp').click(function() {
			$('#fenxiangybp').css('display', 'block');
			$('body').addClass('mengceng');
		});
		/*分享仪表盘*/

		$('.fxybp').click(function() {
			$('#fenxiangybp').css('display', 'block');
			$('body').addClass('mengceng');
		});

	};
	/*预览播放*/
	$(document).on('click', '.yulan_footer .shang', function() {
		$('.yulan_content').addClass('in');
		setTimeout(function() {
			$('.yulan_content').removeClass('in');
		}, 500);
		console.log('播放上一张');
		$('.yulan_footer .bofang').removeClass('not');
		console.log('自动暂停播放');
	});
	$(document).on('click', '.yulan_footer .xia', function() {
		$('.yulan_content').addClass('in');
		setTimeout(function() {
			$('.yulan_content').removeClass('in');
		}, 500);
		console.log('播放下一张');
		$('.yulan_footer .bofang').removeClass('not');
		console.log('自动暂停播放');
	});
	$(document).on('click', '.yulan_footer .bofang', function() {
		$(this).toggleClass('not');
		if($(this).is('.not')) {
			console.log('自动播放');
		} else {
			console.log('暂停播放');
		}
	});
	/*退出预览*/
	$(document).on('click', '.back2', function() {
		$('.quanpingyulan').css('display', 'none');
	});

	/*仪表盘结束*/

	/*工作表开始*/
	if(document.getElementById('work_sheet')) {
		$('.scsj').click(function() {
			var thishref = $(this).attr('href');
			window.open(thishref, '_self');
		});

		$('.sx_sz_a').eq(0).click(function() {
			$('.sx_sz_a').removeClass('on');
			$(this).toggleClass('on');
			$('.sx_xq').delay(400).slideToggle(300);
			$('.sz_xq').slideUp(300);
		});

		$('.sx_sz_a').eq(1).click(function() {
			$('.sx_sz_a').removeClass('on');
			$(this).toggleClass('on');
			$('.sx_xq').slideUp(300);
			$('.sz_xq').delay(400).slideToggle(300);
		});

		$('.sx_xq_tj_a').click(function() {
			$('.sx_xq_tj_a').removeClass('on');
			$(this).addClass('on');
			$(this).siblings('input').val($(this).index() + 1);
		});

		var hiddenI = 2;
		$(document).on('click', '.zhengduo', function() {
			var thisClone = $('.sx_xq_tj_xq_box').eq(-1).clone();
			thisClone.find('.zhengduo,.qurding').remove();
			thisClone.find('#hidden11').attr({ 'id': 'hidden' + hiddenI + '1', 'name': 'hidden' + hiddenI + '1' });
			thisClone.find('#hidden12').attr({ 'id': 'hidden' + hiddenI + '2', 'name': 'hidden' + hiddenI + '2' });
			thisClone.find('#hidden13').attr({ 'id': 'hidden' + hiddenI + '3', 'name': 'hidden' + hiddenI + '3' });
			$('.sx_xq_tj_xq').prepend(thisClone);
			hiddenI++;
		});
		$(document).on('click', '.jiansao', function() {
			$('.sx_xq_tj_xq_box').eq(-1).append($('.zhengduo')).append($('.qurding'));
			$(this).parents('.sx_xq_tj_xq_box').remove();
		});
		/*多选关联框*/
		$(document).on('change', ".children input[type='checkbox']", function() {
			var sibling = $(this).parents('.children').find("input[type='checkbox']");
			var checkedsize = 0;
			for(var i = 0, len = sibling.size(); i < len; i++) {
				if(sibling.eq(i).prop("checked")) checkedsize++;
			}
			if(checkedsize == sibling.size()) {
				$(this).parents('.children').siblings('.parent').find("input[type='checkbox']").prop("checked", true);
			} else {
				$(this).parents('.children').siblings('.parent').find("input[type='checkbox']").prop("checked", false);
			}
		});
		$(document).on('change', ".parent input[type='checkbox']", function() {
			if($(this).prop("checked")) {
				$(this).parents('.parent').siblings('.children').find("input[type='checkbox']").prop("checked", true);
			} else {
				$(this).parents('.parent').siblings('.children').find("input[type='checkbox']").prop("checked", false);
			}
		});

		$(document).on('click', '.gzb_xg', function() {
			var gzb_mcW = $(this).siblings('.gzb_mc').width();
			$('<input>').insertAfter($(this).siblings('.gzb_mc').css('display', 'none')).width(gzb_mcW).focus();
			$(this).css('display', 'none');
			$(this).siblings('.gzb_px').css('display', 'none');
			$(this).siblings('.gzb_qd,.gzb_qx').css('display', 'inline-block');
		});

		$(document).on('click', '.gzb_qd', function() {
			var inputT = $(this).siblings('input').val();
			$(this).siblings('input').remove();
			if($(this).siblings('.gzb_mc').html() != inputT) {
				$(this).siblings('.gzb_mc').html(inputT).css('display', 'inline-block');
				$('.biaoti_tr:eq(0) .gzb_mc').eq($(this).parent().index()).html(inputT);
				biaotiA.each(function(i) {
					if(FF) {
						this.style.width = getComputedStyle(biaotiC.eq(i).get(0), false)['width'];
					} else {
						$(this).width(biaotiC.eq(i).width() + 1);
					}
					$(this).css({
						'border-left': '1px solid #ffffff',
						'border-right': '1px solid #ffffff'
					});
				});
			}
			$(this).css('display', 'none');
			$(this).siblings('.gzb_qx').css('display', 'none');
			$(this).siblings('.gzb_px,.gzb_xg').css('display', 'inline-block');
		});

		$(document).on('click', '.gzb_qx', function() {
			$(this).siblings('input').remove();
			$(this).siblings('.gzb_mc').css('display', 'inline-block');
			$(this).css('display', 'none');
			$(this).siblings('.gzb_qd').css('display', 'none');
			$(this).siblings('.gzb_px,.gzb_xg').css('display', 'inline-block');
		});

		$('.biaoti_tr').after($('.biaoti_tr').clone());
		var biaotiC = $('.biaoti_tr').eq(0).find('td');
		var biaotiA = $('.biaoti_tr').eq(1).find('td');
		$('.biaoti_tr').eq(1).addClass('fixed_top');
		biaotiA.each(function(i) {
			if(FF) {
				this.style.width = getComputedStyle(biaotiC.eq(i).get(0), false)['width'];
			} else {
				$(this).width(biaotiC.eq(i).width() + 1);
			}
			$(this).css({
				'border-left': '1px solid #ffffff',
				'border-right': '1px solid #ffffff'
			});
		});

		$(window).resize(function() {
			biaotiA.each(function(i) {
				if(FF) {
					this.style.width = getComputedStyle(biaotiC.eq(i).get(0), false)['width'];
				} else {
					$(this).width(biaotiC.eq(i).width() + 1);
				}
				$(this).css({
					'border-left': '1px solid #ffffff',
					'border-right': '1px solid #ffffff'
				});
			});
		});

		var biaoti_tr = $('.biaoti_tr').eq(1);
		biaoti_tr.css({ 'position': 'absolute', 'top': 0, 'left': 0 });
		var gzb_table_box = $('.gzb_table_box');
		setInterval(function() {
			gzb_table_box.height(document.documentElement.clientHeight - gzb_table_box.offset().top - 20);
		}, 30);

		$('.biaoti').mouseenter(function() {
			var i = $(this).index();
			$('.gzb_table tr').each(function() {
				$(this).find('td').eq(i).addClass('on');
			});
		}).mouseleave(function() {
			var i = $(this).index();
			$('.gzb_table tr').each(function() {
				$(this).find('td').eq(i).removeClass('on');
			});
		});

		/*查看关联概况*/
		$(document).on('click', '.ckglkk', function() {
			$('#quedingshanchu2').css('display', 'none');
			$('body').removeClass('mengceng');
		});
		/*nav切换*/
		$('.gzb_nav a').click(function() {
			$('.gzb_nav a').removeClass('on');
			$(this).addClass('on');
			$('.gzb_nav_xq').css('display', 'none');
			$('.gzb_nav_xq').eq($(this).index('.gzb_nav a')).css('display', 'block');
		});

		/*工作表容量*/
		$('.gzb_rl_jct span').css('width', $('.gzb_rl_n').text());
		$('.gzb_rl_a').click(function() {
			$('.gzb_rongliang_xq').css('display', 'block');
		});

	}
	/*工作表结束*/
	/*模板库*/
	if(document.getElementById('模板库')) {
		var resizeStyleFn2 = function() {
			var gridster_WL = 0,
				gridster_Dom;

			$('#gridster_mbk>ul>li').each(function() {
				var WL = parseFloat($(this).attr('data-sizey')) + parseFloat($(this).attr('data-col'));
				(WL > gridster_WL) && (gridster_WL = WL, gridster_Dom = $(this));
			});

			$('#gridster_mbk').css('height', document.getElementById('gridster_mbk').scrollHeight);
			$('#gridster_mbk').css('width', parseFloat(gridster_Dom.css('left')) + parseFloat(gridster_Dom.css('width')));
		};

		resizeStyleFn();
		resizeStyleFn2();

		$(window).resize(function() {
			$('#gridster_mbk').css('width', 'auto');
			resizeStyleFn();
			resizeStyleFn2();
		});

	}
	/*模板库结束*/
	/*图表编辑*/
	if(document.getElementById('table_compile')) {
		/*行总计*/
		$('.hangzongji').change(function() {
			if($(this).prop('checked')) {
				$('.hangzongji_xq').css('display', 'block');
			} else {
				$('.hangzongji_xq').css('display', 'none');
			}
		});
		$('.liezongji').change(function() {
			if($(this).prop('checked')) {
				$('.liezongji_xq').css('display', 'block');
			} else {
				$('.liezongji_xq').css('display', 'none');
			}
		});
		$('.wdxstm').change(function() {
			if($(this).prop('checked')) {
				$('.wdxstm_xq').css('display', 'block');
			} else {
				$('.wdxstm_xq').css('display', 'none');
			}
		});

		/*生成首行首列固定表*/
		function tableFixed() {
			$('#table_content').css({
				'width': parseFloat($('#table_content table').css('width')) + 24,
				'height': parseFloat($('#table_content table').css('height')) + 24
			})
			$('#table_box').css('height', $('#table_content').css('height'));
			if(document.getElementById('fixed_top')) {
				$('#table_fixed_top').html('<table><tr>' + $('#fixed_top').html() + '</tr></table>');
				var fixed_top_th = $('#fixed_top th,#fixed_top td');
				var table_fixed_top_th = $('#table_fixed_top th,#table_fixed_top td');
				table_fixed_top_th.each(function(i) {
					$(this).css('width', fixed_top_th.eq(i).css('width'));
				});
			}
			if(document.getElementById('fixed_left')) {
				var fixed_left_table = '<table>';
				var td_left = $('#fixed_left').position().left;
				$('#table_content tr').each(function(i) {
					var fixed_left_table_td = '';
					$(this).children().each(function() {
						if($(this).position().left <= td_left) {
							fixed_left_table_td += this.outerHTML;
						}
					});
					fixed_left_table += '<tr>' + fixed_left_table_td + '</tr>';
					if(i == 0) {
						$('#table_fixed_left_top').html(fixed_left_table + '</table>');
					}
				});
				fixed_left_table += '</table>';
				$('#table_fixed_left').html(fixed_left_table);

				var fixed_left_P_C = $('#fixed_left').parent().children();
				$('#table_fixed_left tr:eq(0)').children().each(function(i) {
					$(this).css({
						'width': fixed_left_P_C.eq(i).css('width'),
						'height': fixed_left_P_C.eq(i).css('height')
					});
				});

				$('#table_fixed_left tr').children().each(function(i) {
					if($(this).attr('rowspan') >= 2) {
						var thisHeight = 36 * $(this).attr('rowspan');
						$(this).css('height', thisHeight);
					}
				});

				$('#table_fixed_left_top tr').children().each(function(i) {
					$(this).css({
						'width': fixed_left_P_C.eq(i).css('width'),
						'height': fixed_left_P_C.eq(i).css('height')
					});
				});
			}
		};

		tableFixed();

		setTimeout(function() {
			$("#table_content").on("DOMNodeInserted", function() {
				console.log('表单节点发生变化');
				tableFixed();
			});

			$("#table_content").on("DOMNodeRemoved", function() {
				console.log('表单节点发生变化');
				tableFixed();
			});
		}, 100)

		/*var table_content_html = document.getElementById('table_content').innerHTML;
		setInterval(function() {
			if(document.getElementById('table_content').innerHTML != table_content_html) {
				table_content_html = document.getElementById('table_content').innerHTML;
				console.log('表单(节点+文本)发生变化');
				tableFixed();
			}
		}, 100);*/

		/*点击固定*/
		$(document).on('click', '.tbbj_gd', function() {
			var table_content_th = $("#table_content tr").eq(0).children();
			var thisIndex = $(this).parent().index();

			table_content_th.find('.tbbj_gd').css('visibility', 'hidden');
			table_content_th.eq(thisIndex).find('.tbbj_gd').css('visibility', 'visible');
			$('#fixed_left').removeAttr('id');
			$('#fixed_top').children().eq($(this).parent().index()).attr('id', 'fixed_left');
			tableFixed();
		});
		/*改变颜色*/
		function table_styleFn(i, color, bgcolor) {
			var _this = $('#table_content tr').eq(0).children().eq(i - 1);
			var _this_left = _this.position().left;
			$('#table_content td,#table_fixed_left td').each(function() {
				if($(this).position().left == _this_left) {
					$(this).css({
						'color': color,
						'background': bgcolor
					});
				}
			});
		};

		/*如第三列改变颜色*/
		setTimeout(function() {
			table_styleFn(3, '#ff0', '#0ff');
		}, 2000);
		/*清除第三列颜色*/
		/*table_styleFn(3, '', '');*/

		var str = '<tr id="table_total"> <td colspan="3">合计</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> <td>Data</td> </tr>';

		/*插入合计*/
		(function() {
			$('#table_content tbody').append(str);
			tableFixed();
		})();
	}
	/*图表编辑结束*/
	/*分享页*/
	if(document.getElementById('分享页')) {
		resizeStyleFn();
		$(window).resize(function() {
			resizeStyleFn();
		});

		var _thisH = document.getElementById('fenxiang_content').scrollHeight;
		$('#fenxiang_content').css('height', _thisH);
	}
	/*分享页结束*/

	/*雷达图*/
	if(document.getElementById('radar_map')) {
		$('.wdxstm').change(function() {
			if($(this).prop('checked')) {
				$('.wdxstm_xq').css('display', 'block');
			} else {
				$('.wdxstm_xq').css('display', 'none');
			}
		});
	}
	/*雷达图结束*/
});