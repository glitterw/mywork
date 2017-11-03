// JavaScript Document
$(function() {
	/*阻止冒泡*/
	$(document).click(function() {
		$('.Mlayer_2,#tree_xiangqing_bianji,#tree_tukuai_bianji').not('.in').css('display', 'none');
	});
	$('.Mlayer_2,#tree_xiangqing_bianji,#tree_tukuai_bianji').mouseenter(function() {
		$(this).addClass('in');
	});
	$('.Mlayer_2,#tree_xiangqing_bianji,#tree_tukuai_bianji').mouseleave(function() {
		$(this).removeClass('in');
	});
	$('.shezhi_home_a,.a_shizhi').mouseenter(function() {
		$(this).siblings('.Mlayer_2').addClass('in');
	});
	$('.shezhi_home_a,.a_shizhi').mouseleave(function() {
		$(this).siblings('.Mlayer_2').removeClass('in');
	});

	$(document).on('mouseover', '.xg_gengduo', function() {
		$('#tree_tukuai_bianji').addClass('in');
	});

	$(document).on('mouseout', '.xg_gengduo', function() {
		$('#tree_tukuai_bianji').removeClass('in');
	});
	/*阻止冒泡结束*/

	if($('#xiaoxiliang').text() > 99) { $('#xiaoxiliang').text('99+') };

	$('.shezhi_home_a,.a_shizhi').click(function() {
		$(this).siblings('.Mlayer_2').css('display', 'block');
	});

	$("#xiugaizhuti span").click(function() {
		$(this).addClass('on').siblings().removeClass('on')
	});

	/*关闭弹窗*/
	$(document).on('click', '.Mlayer_4_gb', function() {
		$(this).parents('.Mlayer_4').css('display', 'none');
		$('body').removeClass('mengceng');
		$('.xiala_d').css('display', 'none');
		$('.xiala_p').removeClass('on');
	});

	/*树状图的下拉*/
	$(document).on('click', '.xiala_p', function() {
		if($(this).is('.on')) {
			$(this).removeClass('on');
			$(this).parent().find('.xiala_d').hide();
			if($(this).parent().find('.radio_true_full').size()) {
				$(this).html($(this).parent().find('.radio_true_full').next('a').text());
			} else {
			}
		} else {
			$(this).addClass('on');
			$(this).parent().find('.xiala_d').show();
		}
	})

	$(document).on('mouseleave', '.xialaBox', function() {
		$(this).find('.xiala_p').removeClass('on');
		$(this).find('.xiala_d').hide();
	})

	//点击示列
	$(document).on('click', '.action-button .layout,.demo', function() {
		$("#table-demo").show();
		$('body').addClass('mengceng');
	});
	
	/*搜索下拉*/
	$('.nav_1_form_ss_xq').mouseenter(function() {
		$(this).addClass('in')
	}).mouseleave(function() {
		$(this).removeClass('in')
	});
	$(window).click(function() {
		if(!$('.nav_1_form_ss_xq').is('.in')) {
			$('.nav_1_form_ss_xq').css('display', 'none');
		}
	});
	$(document).on('click', '.ss-nav-p i', function(event) {
		$(this).toggleClass('ishow ihide');
		$(this).parent().next().next().slideToggle(300);
	});

	$(document).on('click', '.ss-nav-d span', function() {
		$('.nav_1_form_ss_xq').css('display', 'none');
	});
});