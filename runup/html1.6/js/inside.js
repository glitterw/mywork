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

	/*工作表开始*/
	if(document.getElementById('work_sheet')) {
		$('.scsj').click(function() {
			var thishref = $(this).attr('href');
			window.open(thishref, '_self');
		});

		$('.sx_sz_a').eq(0).click(function() {
			if($(this).hasClass('on')){
				$('.sx_sz_a').removeClass('on');
			}else{
				$(this).toggleClass('on');
			}
			if($('.sx_sz_a').eq(1).hasClass('on')){
				$('.sx_sz_a').eq(1).removeClass('on');
			}
			$('.sx_xq').delay(400).slideToggle(300);
			$('.sz_xq').slideUp(300);
		});

		$('.sx_sz_a').eq(1).click(function() {
			if($(this).hasClass('on')){
				$('.sx_sz_a').removeClass('on');
			}else{
				$(this).toggleClass('on');
			}
			if($('.sx_sz_a').eq(0).hasClass('on')){
				$('.sx_sz_a').eq(0).removeClass('on');
			}
			$('.sx_xq').slideUp(300);
			$('.sz_xq').delay(400).slideToggle(300);
		});

		$('.sx_xq_tj_a').click(function() {
			$('.sx_xq_tj_a').removeClass('on');
			$(this).addClass('on');
			$(this).siblings('input').val($(this).index() + 1);
		});
		$(document).on('click', '.zhengduo', function() {
			var list = $(".sx_xq_tj_xq").find('.sx_xq_tj_xq_box');
			var hiddenI = list.length+1;
			var thisClone = $("#initSearchDiv").clone();
			thisClone.find('.zhengduo,.qurding').remove();
			thisClone.find('#hidden11').attr({ 'id': 'hidden' + hiddenI + '1', 'name': 'hidden' + hiddenI + '1' });
			thisClone.find('#hidden12').attr({ 'id': 'hidden' + hiddenI + '2', 'name': 'hidden' + hiddenI + '2' });
			thisClone.find('#hidden13').attr({ 'id': 'hidden' + hiddenI + '3', 'name': 'hidden' + hiddenI + '3' });
			var divid = 'initSearchDiv' + hiddenI;
			var divid1 = 'initOne' + hiddenI;
			var divid2 = 'initTwo' + hiddenI;
			thisClone.find('#initOne').attr({ 'id': divid1});
			thisClone.find('#initTwo').attr({ 'id': divid2});
			var containerIndex = $("#containerIndex").val();
			thisClone.find("#mCSB_6_container").attr({'id':'mCSB_'+parseInt(containerIndex)+2+'_container'});
			thisClone.find("#mCSB_7_container").attr({'id':'mCSB_'+parseInt(containerIndex)+3+'_container'});
			containerIndex = containerIndex + 2;
			$("#containerIndex").val(containerIndex);
			thisClone.attr({ 'id': divid});
			$('.sx_xq_tj_xq').prepend(thisClone);
			thisClone.show();
			worktable.loadEventJs(divid1);
			worktable.loadEventJs(divid2);
		});
		$(document).on('click', '.jiansao', function() {
			var list = $(".sx_xq_tj_xq").find('.sx_xq_tj_xq_box');
			if(list.length > 1){
				//$('.sx_xq_tj_xq_box').eq(-1).append($('.zhengduo')).append($('.qurding'));
				$(this).parents('.sx_xq_tj_xq_box').remove();
				if($('.sx_xq_tj_xq_box').eq(-1).find('.zhengduo').size()==0){
					$('.sx_xq_tj_xq_box').eq(-1).append('<a class="zhengduo left"></a><a class="qurding left" onclick="worktable.zdSearch()">确定</a>')
				}
				
			}
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
			var gzb_mcV = $(this).siblings('.gzb_mc').html();
			$('<input>').insertAfter($(this).siblings('.gzb_mc').css('display', 'none')).width(gzb_mcW).val(gzb_mcV).focus();
			$(this).css('display', 'none');
			$(this).siblings('.gzb_px').css('display', 'none');
			$(this).siblings('.gzb_qd,.gzb_qx').css('display', 'inline-block');
			$(this).siblings('input').bind('keydown',function(event){  
				if(event.keyCode == "13")      {  
					var columnId = $(this).siblings('.myhiddendiv').html();  
					saveColumnName(columnId,$(this).siblings('.gzb_qd').get(0));
				}  
			});  
		});
		$(document).on('click', '.gzb_qx', function() {
			$(this).siblings('input').remove();
			$(this).siblings('.gzb_mc').css('display', 'inline-block');
			$(this).css('display', 'none');
			$(this).siblings('.gzb_qd').css('display', 'none');
			$(this).siblings('.gzb_px,.gzb_xg').css('display', 'inline-block');
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

	/*图表编辑*/
	if(document.getElementById('表格编辑')) {
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

	/*雷达图*/
	if(document.getElementById('雷达图')) {
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