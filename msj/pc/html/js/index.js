// JavaScript Document
$(function () {
	var swiper = new Swiper('#swiper_container_1', {
		pagination: '.swiper-pagination1',
		nextButton: '.swiper-button-next1',
		prevButton: '.swiper-button-prev1',
		slidesPerView: 1,
		paginationClickable: true,
		spaceBetween: 30,
		loop: true
	});
	var swiper = new Swiper('#swiper_container_2', {
		nextButton: '.swiper-button-next2',
		prevButton: '.swiper-button-prev2',
		slidesPerView: 2,
		paginationClickable: true,
		spaceBetween: 20,
		loop: true
	});

	/*时间*/
	var thisDate = new Date();
	var FullYear = thisDate.getFullYear();
	var Month = thisDate.getMonth() + 1;
	var thisDate = thisDate.getDate();
	MytimeFn($('#Mytime1'), FullYear, Month);
	MytimeFn($('#Mytime2'), FullYear, Month + 1);
	timeClick($('.Mytime'));
	$('#shijian_prev').click(function () {
		$('#Mytime1 .prev,#Mytime2 .prev').click();
		timeClick($('.Mytime'));
	});
	$('#shijian_next').click(function () {
		$('#Mytime1 .next,#Mytime2 .next').click();
		timeClick($('.Mytime'));
	});
	/*搜索*/
	$('.mudidi').click(function (ev) {
		$(".mudidi_xuanxiang").css('display', 'block');
		$(".shijian_xuanxiang").css('display', 'none');
		ev.stopPropagation();
	});
	$(".mudidi_nav a").click(function (ev) {
		$(this).addClass('active').siblings().removeClass('active');
	});

	$('.mudidi_content').on('click', 'span', function () {
		$('.mudidi').val($(this).text());
		$(".mudidi_xuanxiang").css('display', 'none');
	});

	$('.shijian').click(function (ev) {
		$(".shijian_xuanxiang").css('display', 'block');
		$(".mudidi_xuanxiang").css('display', 'none');
		ev.stopPropagation();
	});

	$('.Mytime .Date').on('click', 'span', function (ev) {
		if ($('.Mytime .Date span').is('.mouseEnd')) {
			var sj = $('.Mytime').attr('data-mindate') + '至' + $('.Mytime').attr('data-maxdate');
			$('.shijian').val(sj);
		}
	});

	$('.shijian_xuanxiang').on('click', function (ev) {
		ev.stopPropagation();
	});

	$(document).on('click', function () {
		$(".mudidi_xuanxiang").css('display', 'none');
		$(".shijian_xuanxiang").css('display', 'none');
	});

});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
var id = GetQueryString("id");
var html = 'http://static.jiaminsu.com/wx/details.html?id=' + id;
alert(html)

function isMobile() {
	if (/android/i.test(navigator.userAgent)) {
		//document.write("This is Android'browser.");//这是Android平台下浏览器
		return true;
	}
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		//document.write("This is iOS'browser.");//这是iOS平台下浏览器
		return true;
	}
	if (/MicroMessenger/i.test(navigator.userAgent)) {
		//document.write("This is MicroMessenger'browser.");//这是微信平台下浏览器
		return true;
	}
	return false;
}
alert(isMobile())
if (isMobile() == true) {
	$('.fengxiang_3').click(function () {
		
	})

}
