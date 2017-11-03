// JavaScript Document
$(function() {
	//	var gifI = 0;
	//	setInterval(function() {
	//		$('.section-2-gif i').eq(gifI).addClass('active').siblings().removeClass('active');
	//		//$('.section-2-gif i').eq(gifI).removeClass('gray').siblings().addClass('gray');
	//		gifI++;
	//		gifI == 4 ? gifI = 0 : '';
	//	}, 1000);

	var swiper = new Swiper('.swiper-container', {
		nextButton: '.swiper-button-next-1',
		prevButton: '.swiper-button-prev-1',
		slidesPerView: 4,
		paginationClickable: true,
		freeMode: false,
		loop: true
	});

	$('.play-video').click(function () {
		$('.video-box').css('display','block')
	});
	$('.shut-video').click(function () {
		$('.video-box').css('display','none')
	});
	
	$('.video-box').mousewheel(function(ev) {
		var ev = ev || event;
		ev.preventDefault();
		window.event.returnValue = false;
		return false;
	});

});