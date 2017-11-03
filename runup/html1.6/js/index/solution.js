// JavaScript Document
$(function() {
	var winResizeFn = function() {
		var winW = $(window).width();
		var winH = $(window).height();
		var _scale = (winW / 1920) < (winH / 1080) ? (winW / 1920) : (winH / 1080);
		$('.content-2-w,.intersperse').css('transform', 'translate(-50%, -50%) scale(' + _scale + ')');
	};
	winResizeFn();
	$(window).resize(winResizeFn);
	var mousewheelNumber = 1;
	var mousewheelBl = true;
	var mousewheel_Fn = function() {
		switch(mousewheelNumber) {
			case 1:
				//				console.log('第一屏');
				/*退出后一屏*/
				$('.section-1').css('display', 'block');
				setTimeout(function() {
					$('.section-1').addClass('active');
				}, 600);
				$('.intersperse-2').removeClass('active');
				setTimeout(function() {
					$('.intersperse-2').css('display', 'none');
				}, 1000);
				break;
			case 2:
				//				console.log('第二屏');
				$('.section-1').removeClass('active');
				setTimeout(function() {
					$('.section-1').css('display', 'none');
				}, 1000);
				setTimeout(function() {
					$('.intersperse-2').css('display', 'block');
					setTimeout(function() {
						$('.intersperse-2').addClass('active');
					}, 30);
				}, 600);
				/*退出后一屏*/
				$('.content-2').removeClass('content-3');
				$('.intersperse-3').removeClass('active');
				setTimeout(function() {
					$('.intersperse-3').css('display', 'none');
				}, 500);
				break;
			case 3:
				//				console.log('第三屏');
				$('.intersperse-2').removeClass('active');
				setTimeout(function() {
					$('.intersperse-3').css('display', 'block');
					setTimeout(function() {
						$('.content-2').addClass('content-3');
						$('.intersperse-3').addClass('active');
					}, 30);
				}, 1500);
				/*退出后一屏*/
				$('.intersperse-4').removeClass('active');
				setTimeout(function() {
					$('.intersperse-4').css('display', 'none');
				}, 1000);
				break;
			case 4:
				//				console.log('第四屏');
				$('.intersperse-3').removeClass('active');
				setTimeout(function() {
					$('.intersperse-4').css('display', 'block');
					setTimeout(function() {
						$('.intersperse-4').addClass('active');
					}, 30);
				}, 1000);
				/*退出后一屏*/
				$('.content-2-w').fadeIn(600);
				$('.intersperse-5').removeClass('active');
				setTimeout(function() {
					$('.intersperse-5').css('display', 'none');
				}, 500);
				break;
			case 5:
				//				console.log('第五屏');
				$('.intersperse-4').removeClass('active');
				setTimeout(function() {
					setTimeout(function() {
						$('.content-2-w').css('display', 'none');
					}, 300);
					$('.intersperse-5').css('display', 'block');
					setTimeout(function() {
						$('.intersperse-5').addClass('active');
					}, 30);
				}, 1000);
				/*退出后一屏*/
				$('.page-19').removeClass('active');
				setTimeout(function() {
					$('.intersperse-8').css('display', 'none');
				}, 500);
				break;
			case 6:
				//				console.log('第六屏');
				$('.intersperse-5').removeClass('active');
				$('.content-2-w').fadeIn(600);
				setTimeout(function() {
					$('.intersperse-8').css('display', 'block');
					setTimeout(function() {
						$('.page-19').addClass('active');
					}, 30);
				}, 500);
				/*退出后一屏*/
				$('.page-20').removeClass('active');
				setTimeout(function() {
					setTimeout(function() {}, 30);
				}, 500);
				break;
			case 7:
				//				console.log('第七屏');
				$('.content-2-w').fadeIn(600);
				$('.page-19').removeClass('active');
				setTimeout(function() {
					setTimeout(function() {
						$('.page-20').addClass('active');
					}, 30);
				}, 500);
				/*退出后一屏*/
				$('.intersperse-10,.intersperse-9').fadeOut(600);
				$('.intersperse-9').removeClass('active');
				setTimeout(function() {
					setTimeout(function() {

					}, 30);
				}, 500);
				break;
			case 8:
				//				console.log('第八屏');
				$('.page-20').removeClass('active');
				$('.content-2-w').fadeOut(600);
				$('.intersperse-10,.intersperse-9').fadeIn(600);
				$('.intersperse-9').addClass('active');
				setTimeout(function() {
					setTimeout(function() {

					}, 30);
				}, 500);
				/*退出后一屏*/
				$('.intersperse-11').removeClass('active');
				$('.footer-1').fadeOut(600);
				setTimeout(function() {
					$('.intersperse-11').css('display', 'none');
					setTimeout(function() {
						$('.intersperse-9').removeClass('active2');
						$('.bzd').fadeIn(600);
					}, 30);
				}, 500);
				break;
			case 9:
				//				console.log('第九屏');
				$('.intersperse-9').addClass('active2');
				$('.bzd').fadeOut(600);
				$('.footer-1').fadeIn(600);
				setTimeout(function() {
					$('.intersperse-11').css('display', 'block');
					setTimeout(function() {
						$('.intersperse-11').addClass('active');
					}, 30);
				}, 500);
				break;
			default:
				(mousewheelNumber == 0) ? (mousewheelNumber = 1) : (mousewheelNumber--);
				console.log('其他');
		}
		$('.nav-0 span').eq(mousewheelNumber - 1).addClass('active').siblings().removeClass('active');

	}
	$(document).mousewheel(function() {
		if(mousewheelBl) {
			mousewheelBl = false;
			setTimeout(function() {
				mousewheelBl = true;
			}, 2000);

			if(this.Down) {
				mousewheelNumber++;
			} else {
				mousewheelNumber--;
			};
			mousewheel_Fn();
		}
	});
	var click_Fn = function(i) {
		var time_Fn;
		if(i + 1 - mousewheelNumber > 0) {
			mousewheelNumber++;
			mousewheel_Fn();
			if(i + 1 - mousewheelNumber == 0) {
				clearInterval(time_Fn);
			}
			time_Fn = setInterval(function() {
				mousewheelNumber++;
				mousewheel_Fn();
				if(i + 1 - mousewheelNumber == 0) {
					clearInterval(time_Fn);
				}
			}, 2000);
		};
		if(i + 1 - mousewheelNumber < 0) {
			mousewheelNumber--;
			mousewheel_Fn();
			if(i + 1 - mousewheelNumber == 0) {
				clearInterval(time_Fn);
			}
			time_Fn = setInterval(function() {
				mousewheelNumber--;
				mousewheel_Fn();
				if(i + 1 - mousewheelNumber == 0) {
					clearInterval(time_Fn);
				}
			}, 2000);
		};

	};
	/*$('.nav-0 span').click(function() {
		click_Fn($(this).index());
	});*/

	var swiper = new Swiper('.swiper-container', {
		nextButton: '.swiper-button-next-1',
		prevButton: '.swiper-button-prev-1',
		slidesPerView: 1,
		centeredSlides: true,
		paginationClickable: true,
		freeMode: false,
		loop: true,
	});
	$('.intersperse-7').css({
		'opacity': 1,
		'display': 'none'
	});
	var intersperse5Bl = false;
	$('.page-9').click(function() {
		$('.section-2').addClass('mengceng');
		$('.intersperse-7').css('display', 'block');
		$('.intersperse-5,.nav-0').css('display', 'none');
		setTimeout(function() {
			intersperse5Bl = true;
			mousewheelBl = false;
			swiper.slideTo(1, 1000, false);
		}, 30);
	});
	$('.page-10').click(function() {
		$('.section-2').addClass('mengceng');
		$('.intersperse-7').css('display', 'block');
		$('.intersperse-5,.nav-0').css('display', 'none');
		setTimeout(function() {
			intersperse5Bl = true;
			mousewheelBl = false;
			swiper.slideTo(2, 1000, false);
		}, 30);
	});
	$('.page-11').click(function() {
		$('.section-2').addClass('mengceng');
		$('.intersperse-7').css('display', 'block');
		$('.intersperse-5,.nav-0').css('display', 'none');
		setTimeout(function() {
			intersperse5Bl = true;
			mousewheelBl = false;
			swiper.slideTo(3, 1000, false);
		}, 30);
	});
	$('.page-12').click(function() {
		$('.section-2').addClass('mengceng');
		$('.intersperse-7').css('display', 'block');
		$('.intersperse-5,.nav-0').css('display', 'none');
		setTimeout(function() {
			intersperse5Bl = true;
			mousewheelBl = false;
			swiper.slideTo(4, 1000, false);
		}, 30);
	});
	$('.page-13').click(function() {
		$('.section-2').addClass('mengceng');
		$('.intersperse-7').css('display', 'block');
		$('.intersperse-5,.nav-0').css('display', 'none');
		setTimeout(function() {
			intersperse5Bl = true;
			mousewheelBl = false;
			swiper.slideTo(5, 1000, false);
		}, 30);
	});
	$('.page-jd,.pav-1,.net-1').click(function(event) {
		event.stopPropagation();
	});
	$('.section-2').click(function(event) {
		if(intersperse5Bl) {
			intersperse5Bl = false;
			mousewheelBl = true;
			$('.section-2').removeClass('mengceng');
			$('.intersperse-7').css('display', 'none');
			$('.intersperse-5,.nav-0').css('display', 'block');
		}
	});

});