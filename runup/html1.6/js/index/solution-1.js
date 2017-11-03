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
		if(mousewheelNumber == 1) {
			console.log('第一屏');
			/*退出后一屏*/
			$('.section-1').css('display', 'block');
			setTimeout(function() {
				$('.section-1').addClass('active');
			}, 600);
		} else {
			$('.section-1').removeClass('active');
			setTimeout(function() {
				$('.section-1').css('display', 'none');
			}, 2000);
		}
		if(mousewheelNumber == 2) {
			setTimeout(function() {
				$('.intersperse-2').css('display', 'block');
				setTimeout(function() {
					$('.intersperse-2').addClass('active');
				}, 30);
			}, 600);
		} else {
			$('.intersperse-2').removeClass('active');
			setTimeout(function() {
				$('.intersperse-2').css('display', 'block');
			}, 600);
		}
		if(mousewheelNumber == 3) {
			setTimeout(function() {
				$('.content-2').addClass('content-3');
				$('.intersperse-3').css('display', 'block');
				setTimeout(function() {
					$('.intersperse-3').addClass('active');
				}, 30);
			}, 600);
		} else {
			$('.intersperse-3').removeClass('active');
			$('.content-2').removeClass('content-3');
		}
		if(mousewheelNumber == 4) {
			setTimeout(function() {
				$('.content-2').addClass('content-3');
				$('.intersperse-4').css('display', 'block');
				setTimeout(function() {
					$('.intersperse-4').addClass('active');
				}, 30);
			}, 600);
		} else {
			$('.intersperse-4').removeClass('active');
			$('.content-2').removeClass('content-3');
		}
		if(mousewheelNumber == 5) {
			$('.content-2').addClass('content-3');
			setTimeout(function() {
				$('.content-2-w').css('display', 'none');
				$('.intersperse-5').css('display', 'block');
				setTimeout(function() {
					$('.intersperse-5').addClass('active');
				}, 30);
			}, 600);
		} else {
			$('.content-2').removeClass('content-3');
			$('.intersperse-5').removeClass('active');
			$('.content-2-w').fadeIn(600);
		}
		if(mousewheelNumber == 6) {
			setTimeout(function() {
				$('.content-2').addClass('content-3');
				$('.intersperse-8').css('display', 'block');
				setTimeout(function() {
					$('.page-19').addClass('active');
				}, 30);
			}, 500);
		} else {

		}

		switch(mousewheelNumber) {
			//			case 5:
			//				console.log('第五屏');
			//				$('.intersperse-4').removeClass('active');
			//				setTimeout(function() {
			//					setTimeout(function() {
			//						$('.content-2-w').css('display', 'none');
			//					}, 300);
			//					$('.intersperse-5').css('display', 'block');
			//					setTimeout(function() {
			//						$('.intersperse-5').addClass('active');
			//					}, 30);
			//				}, 1000);
			//				/*退出后一屏*/
			//				$('.page-19').removeClass('active');
			//				setTimeout(function() {
			//					$('.intersperse-8').css('display', 'none');
			//				}, 500);
			//				break;
//			case 6:
//				console.log('第六屏');
//				$('.intersperse-5').removeClass('active');
//				$('.content-2-w').fadeIn(600);
//				setTimeout(function() {
//					$('.intersperse-8').css('display', 'block');
//					setTimeout(function() {
//						$('.page-19').addClass('active');
//					}, 30);
//				}, 500);
//				/*退出后一屏*/
//				$('.page-20').removeClass('active');
//				setTimeout(function() {
//					setTimeout(function() {}, 30);
//				}, 500);
//				break;
			case 7:
				console.log('第七屏');
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
				console.log('第八屏');
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
				setTimeout(function() {
					$('.intersperse-11').css('display', 'none');
					setTimeout(function() {
						$('.intersperse-9').removeClass('active2');
					}, 30);
				}, 500);
				break;
			case 9:
				console.log('第九屏');
				$('.intersperse-9').addClass('active2');
				setTimeout(function() {
					$('.intersperse-11').css('display', 'block');
					setTimeout(function() {
						$('.intersperse-11').addClass('active');
					}, 30);
				}, 500);
				break;
			default:
				//(mousewheelNumber == 0) ? (mousewheelNumber = 1) : (mousewheelNumber--);
				//console.log('其他');
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
			time_Fn = setInterval(function() {
				mousewheelNumber++;
				mousewheel_Fn();
				if(i + 1 - mousewheelNumber == 0) {
					clearInterval(time_Fn);
				}
			}, 3000);
		};
		if(i + 1 - mousewheelNumber < 0) {
			time_Fn = setInterval(function() {
				mousewheelNumber--;
				mousewheel_Fn();
				if(i + 1 - mousewheelNumber == 0) {
					clearInterval(time_Fn);
				}
			}, 3000);
		};

	};
	$('.nav-0 span').click(function() {
		click_Fn($(this).index());
	});
});