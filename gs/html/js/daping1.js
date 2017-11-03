// JavaScript Document
$(function() {
	//时间跳转
	var time_1_span = document.getElementById('time_1');
	var time_1_Fn = function() {
		var time_1 = new Date();
		var time_1Hours = time_1.getHours() > 9 ? time_1.getHours() : '0' + time_1.getHours();
		var time_1Minutes = time_1.getMinutes() > 9 ? time_1.getMinutes() : '0' + time_1.getMinutes();
		var time_1Seconds = time_1.getSeconds() > 9 ? time_1.getSeconds() : '0' + time_1.getSeconds();
		time_1_span.innerHTML = time_1Hours + ':' + time_1Minutes + ':' + time_1Seconds;
		$("#Minutes").html(time_1Hours + ':' + time_1Minutes);
		$("#Seconds").html(time_1Seconds);
	}
	time_1_Fn();
	setInterval(time_1_Fn, 1000);
	//排名跳动
	var zttsb_pm_Fn = function(objN) {
		$('#zttsb_pm').attr('style', '');
		setTimeout(function() {
			$('#zttsb_pm').attr('style', 'width:' + (objN * 12.5 - 4) + 'px;');
		}, 1000);
	};
	//前三名排名
	var qspm_d_Fn = function(objP) {
		console.log('前三');
		$('.qspm_d').eq(objP - 1).addClass('on').siblings('.qspm_d').removeClass('on');
		$('.qspm_d').eq(objP - 1).find('.yuanhuan').addClass('on');
		setTimeout(function() {
			$('.qspm_d').eq(objP - 1).find('.yuanhuan').removeClass('on');
		}, 2400);
	};
	//投诉咨询结构
	var tsjb_Fn = function(tsjbN, zxzbN) {
		$("#tsjb_N").html(Math.round(tsjbN * 100) + '%');
		$("#zxzb_N").html(Math.round(zxzbN * 100) + '%');
		$("#tsjb_span").css('height', '');
		$("#zxzb_span").css('height', '');
		$("#tszxjg_xq_ts span").html(Math.round(tsjbN * 100) + '%');
		$("#tszxjg_xq_zx span").html(Math.round(zxzbN * 100) + '%');
		setTimeout(function() {
			$("#tsjb_span").css('height', tsjbN * 150);
			$("#zxzb_span").css('height', zxzbN * 150);
		}, 500);
	};
	//及时信息
	var jsxxzs_d_Fn = function() {
		console.log('及时');
		$('.jishixinxizhanshi').append($('.jsxxzs_d').eq(0));
	};
	//投诉热点品牌
	var tsrdpp_Fn = function(objP) {
		$("#tsrdpp_d").find('.qwm span').eq(objP - 1).addClass('on').siblings().removeClass('on');
		$("#tsrdpp_N").attr('class', 'N' + objP).html(objP);
		$("#pinpaiqiehuan").removeClass('on');
		setTimeout(function() {
			$('.ppqh_logo img').attr('src', '../img/daping/wdpp_logo_' + objP + '.png');
			$("#pinpaiqiehuan").addClass('on');
		}, 300);
		$('#zhuanshi_1').attr('class', '');
		setTimeout(function() {
			$('#zhuanshi_1').attr('class', 'N' + objP);
		}, 1000);
	};

	/*中心*/
	var zhongxin = function(jishiB) {
		$('#zhunxing').addClass('on');
		setTimeout(function() {
			$("#zx_bg_xq").addClass('on');
		}, 1000);
		if(jishiB) {
			$("#liuxin_1").addClass('on');
		} else {
			$("#liuxin_2").addClass('on');
		};
		setTimeout(function() {
			$("#zx_bg_xq").removeClass('on');
		}, 2000);
		setTimeout(function() {
			$('#zhunxing').removeClass('on');
			$("#liuxin_1").removeClass('on');
			$("#liuxin_2").removeClass('on');
		}, 3000);
	};
	tsrdpp_Fn(2);
	//动作关联函数
	var i = 1,
		j = 1,
		k = Math.random(),
		z = 1 - k;
	Bin = true;
	var dzgl_Fn = function(objN, objP, objP2, tsjbN, zxzbN, jishiB) {
		zhongxin(jishiB);
		setTimeout(function() {
			if(jishiB) {
				console.log('中心及时');
				zttsb_pm_Fn(objN);
				qspm_d_Fn(objP);
				tsjb_Fn(tsjbN, zxzbN);
			} else {
				console.log('中心前三');
				jsxxzs_d_Fn();
				tsrdpp_Fn(objP2);
			}
			i = (i++) % 3 + 1;
			j = (j++) % 5 + 1;
			k = Math.random();
			z = 1 - k;
			Bin = !Bin;
		}, 2000);
	};
	//动作关联执行
	dzgl_Fn(Math.round(Math.random() * 28), i, j, k, z, Bin);
	setInterval(function() {
		dzgl_Fn(Math.round(Math.random() * 28), i, j, k, z, Bin);
	}, 6000);
});