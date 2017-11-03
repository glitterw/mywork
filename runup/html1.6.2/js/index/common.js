// JavaScript Document
$(function() {
	$('.header-1-nav>a,.header-1-nav>span').mouseenter(function() {
		$(this).css('color', '#0066ff');
		$(this).siblings().css('color', '#788eae');
	});
	$('.header-1-nav>a,.header-1-nav>span').mouseleave(function() {
		$(this).siblings().css('color', '#0066ff');
	})
});