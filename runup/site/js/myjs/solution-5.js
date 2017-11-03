// JavaScript Document
$(function() {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		direction: 'vertical',
		effect: 'fade',
		fade: {
			crossFade: true,
		},
		paginationClickable: true,
		mousewheelControl: true
	});
});