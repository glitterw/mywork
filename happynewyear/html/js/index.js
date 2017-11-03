// JavaScript Document
$(function() {
	var resize = function() {
		winW = ((document.documentElement.clientWidth > document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight) + 'px';
		winH = ((document.documentElement.clientWidth < document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight) + 'px';
		$('#jing_2,#jing_3,#jing_4,#jing_5,#jing_6,#jing_7,#jing_8,#jing_9,#jing_10,#jing_11,#jing_12,#jing_13,#jing_14,#jing_15,#jing_2016,#jing_2017').css({
			'width': winW,
			'height': winH
		});
	};
	resize();
	$(window).resize(function() {
		resize();
	}); //#jing_1,#jing_2,
	$('#jing_3,#jing_4,#jing_5,#jing_6,#jing_7,#jing_8,#jing_9,#jing_10,#jing_11,#jing_12,#jing_13,#jing_14,#jing_2016,#jing_2017').css('display', 'none');
	$(window).load(function() {
		//$('#jing_1').css('display','none');
		//$("#wrap_Q").css('transform', 'translateZ(800px)');
		//$("#jing_2017").css('display', 'block');
		//jing2017on();
		//return;
		$('#ld1,#ld2').remove();
		$('.zhiti_1').addClass('start');
		setTimeout(function() {
			Ble1 = true;
		}, 1000);
		/*点击开门*/
		$('.zhiti_1').click(djkmFn);
		setTimeout(function() {
			$('.zhiti_1').click();
		}, 6000);

		$('body').click(function() {
			console.log(new Date());
		});
		//var allT = [9000, 11400, 5600, 7200, 6400, 10000, 4000, 13000, 8000, 5600, 22200, 4000];
		var allT = [9000, 11400, 5600, 7200, 6400, 10000, 4000, 5000, 5000, 5600, 25500, 4000];
		for(var i = 1; i < allT.length; i++) {
			allT[i] = allT[i] + allT[i - 1];
		};
		shunxuFn = function() {
			//return;
			setTimeout(function() {
				$('#jing_1,#jing_2').remove();
				jing5on();
			}, allT[0]);
			setTimeout(function() {
				$('#jing_5').remove();
				jing6on();
			}, allT[1]);
			setTimeout(function() {
				$('#jing_6').remove();
				jing13on();
			}, allT[2]);
			setTimeout(function() {
				$('#jing_13').remove();
				jing7on();
			}, allT[3]);
			setTimeout(function() {
				$('#jing_7').remove();
				jing3on();
			}, allT[4]);
			setTimeout(function() {
				$('#jing_3').remove();
				jing8on();
			}, allT[5]);
			setTimeout(function() {
				$('#jing_8').remove();
				jing12on();
			}, allT[6]);
			setTimeout(function() {
				jing4on();
			}, allT[7]);
			setTimeout(function() {
				$('#jing_12').remove();
				$('#jing_4').remove();
				jing9on();
			}, allT[8]);
			setTimeout(function() {
				$('#jing_9').remove();
				jing11on();
			}, allT[9]);
			setTimeout(function() {
				$('#jing_11').remove();
				jing10on();
			}, allT[10]);
			setTimeout(function() {
				$('#jing_10').remove();
				jing2016on();
			}, allT[11]);
		};

	});

	/*场景一*/
	var Ble1 = false; //恭贺结束了?
	var kaimenl = true; //开门了吗?
	/*点击开门*/
	var djkmFn = function() {
		if(Ble1 && kaimenl) {
			kaimenl = false;
			$('.zhiti_1').addClass('on');
			setTimeout(function() {
				jing2on();
			}, 3000);
			shunxuFn();
		}
	};
	/*日历*/
	var riliFn = function(dom) {
		var _this = $(dom);
		_this.addClass('in');
		setTimeout(function() {
			var t0 = _this.find('.rili_t').eq(0);
			var t1 = _this.find('.rili_t').eq(1);
			var b0 = _this.find('.rili_b').eq(0);
			var b1 = _this.find('.rili_b').eq(1);
			t0.html((parseFloat(t0.html()) + 1) % 10);
			t1.html((parseFloat(t1.html()) + 1) % 10);
			b0.html((parseFloat(b0.html()) + 1) % 10);
			b1.html((parseFloat(b1.html()) + 1) % 10);
			_this.removeClass('in');
		}, 1020);
	};

	/*进入场景二*/
	var jing2on = function() {
		$('.zhiti_1').addClass('on');
		$("#wrap_Q").css('transform', 'translateZ(800px)');
		$("#jing_2").css('display', 'block');
		setTimeout(function() {
			$('body').addClass('nonecolor');
			$("#jing_2").addClass('off');
		}, 4000);
	};
	//jing2on();//t3
	/*进入场景5*/
	var jing5on = function() {
		$("#jing_5").css('display', 'block');
		setTimeout(function() {
			$('#jing_5').addClass('on');
		}, 30);
		setTimeout(function() {
			/*间隔9s*/
			$("#jing_5").addClass('off');
		}, 10000);
	};
	//jing5on();//t456
	/*进入过渡六*/
	var jing6on = function() {
		$("#jing_6").css('display', 'block');
		setTimeout(function() {
			$('#jing_6').addClass('on');
		}, 30);
		setTimeout(function() {
			$("#jing_6").removeClass('on');
		}, 4000);
	};
	//jing6on(); //t7
	/*进入场景13*/
	var jing13on = function() {
		$("#jing_13").css('display', 'block');
		setTimeout(function() {
			$("#jing_13").addClass('on');
		}, 30);
		setTimeout(function() {
			$("#jing_13").removeClass('on');
		}, 4000);
	};
	//jing13on();//t8
	/*进入过渡七*/
	var jing7on = function() {
		$("#jing_7").css('display', 'block');
		setTimeout(function() {
			$("#jing_7").addClass('on');
		}, 30);
		setTimeout(function() {
			$("#jing_7").removeClass('on');
		}, 4000);
	};
	//jing7on(); //t9

	/*进入场景三*/
	var jing3on = function() {
		$("#jing_3").css('display', 'block');
		setTimeout(function() {
			$("#jing_3").addClass('on');
			$(".chuan,.jiang_3_txt").addClass('in_1 chunScale');
		}, 30);
		setTimeout(function() {
			$(".chuan,.jiang_3_txt").removeClass('in_1').addClass('in_2');
		}, 7000);
		setTimeout(function() {
			$("#jing_3").removeClass('on');
		}, 10000);
	};
	//jing3on(); //t1011
	/*进入过渡八*/
	var jing8on = function() {
		$("#jing_8").css('display', 'block');
		setTimeout(function() {
			$("#jing_8").addClass('on');
		}, 30);
		setTimeout(function() {
			$("#jing_8").removeClass('on');
		}, 4000);
	};
	//jing8on(); //t12
	/*进入场景12*/
	var jing12on = function() {
		$("#jing_12").css('display', 'block');
		setTimeout(function() {
			$("#jing_12").addClass('on');
		}, 30);
		$('#jing_12 .rili').addClass('on');
		setTimeout(function() {
			$("#jing_12").removeClass('on');
		}, 5500);
	};
	//jing12on();//t13

	/*进入场景四*/
	var jing4on = function() {
		$("#jing_4").css('display', 'block');
		setTimeout(function() {
			$("#jing_4").addClass('on');
		}, 30);
		riliFn($('#jing_12_r'));
		setTimeout(function() {
			$("#jing_4").removeClass('on');
			$('#jing_12 .rili').removeClass('on');
		}, 3000);
	};
	//jing4on();//t14
	/*进入过渡八*/
	var jing9on = function() {
		$("#jing_9").css('display', 'block');
		setTimeout(function() {
			$("#jing_9").addClass('on');
		}, 30);
		setTimeout(function() {
			$("#jing_9").removeClass('on');
		}, 4000);
	};
	//jing9on(); //t15

	/*进入场景11*/
	var jing11on = function() {
		$("#jing_11").css('display', 'block');
		//1:底部城市出现
		setTimeout(function() {
			$(".building,.map,.beijing,#jing_11 .jing_bg,#jing_11 .rili").addClass('on');
		}, 30);
		//2:加载2010年的城市：北京
		setTimeout(function() {
			riliFn($("#yearV"));
			riliFn($("#yearV"));
			riliFn($("#yearV"));
			riliFn($("#yearV"));
		}, 2000);
		setTimeout(function() {
			//显示2014年成立的公司
			$(".wuhan").addClass('on');
		}, 3000);
		setTimeout(function() {
			//显示2014年成立的公司
			$(".wuhan").addClass('year2014');
		}, 4000);
		setTimeout(function() {
			//日历翻到2015年
			riliFn($("#yearV"));
		}, 6000);
		setTimeout(function() {
			//显示2015年成立的公司
			$(".jiangshu").addClass('on');
			$(".zhejiang").addClass('on');
			$(".wuhan").addClass('year2015');
		}, 6500);
		setTimeout(function() {
			//日历翻到2016年
			riliFn($("#yearV"));
			$(".wuhan").addClass('year2016');
		}, 7000);
		setTimeout(function() {
			$(".wuhan").removeClass('year2016');
			$(".wuhan").removeClass('year2015');
			$(".zhejiang").removeClass('on');
			$(".jiangshu").removeClass('on');
			$(".wuhan").removeClass('year2014');
			$(".wuhan").removeClass('on');
			$(".beijing").removeClass('on');
			$(".building").removeClass('on');
			$(".building,.map,.beijing,#jing_11 .jing_bg,#jing_11 .rili").removeClass('on');
		}, 10500);
		setTimeout(function() {
			$('.wlContent_1').addClass('on');
			setTimeout(function() {
				$('.wlContent_1').removeClass('on');
				setTimeout(function() {
					$('.wlContent_2').addClass('on');
					setTimeout(function() {
						$('.wlContent_2').addClass('off');
						$('.wlContent_3').addClass('on');
						setTimeout(function() {
							$('.wlContent_3').addClass('off');
							$('.wlContent_4').addClass('on');
							setTimeout(function() {
								$('.wlContent_4').addClass('off');
								$('.wlContent_5').addClass('on');
								setTimeout(function() {
									$('.wlContent').addClass('off');
									//jing10on()
								}, 2000);
							}, 2000);
						}, 2000);
					}, 2000);
				}, 2000);
			}, 2000);
		}, 13200);
	};

	//jing11on(); //t16
	/*进入过渡九*/
	var jing10on = function() {
		$("#jing_10").css('display', 'block');
		setTimeout(function() {
			$("#jing_10").addClass('on');
		}, 30);
		setTimeout(function() {
			$("#jing_10").removeClass('on');
		}, 4000);
	};
	//jing10on(); //t17

	/*进入场景2016*/
	var jing2016on = function() {
		$("#jing_2016").css('display', 'block');
		setTimeout(function() {
			$("#content_2016").addClass('on');
			setTimeout(function() {
				jing2016();
			}, 60);
		}, 30);
	};
	/*退出场景2016*/
	jing2016off = function() {
		$('#content_2016').removeClass('on');
		jing2017on();
	};
	//jing16on(); //t18
	//	setTimeout(function() {
	//		jing2016on(); //t18
	//	}, 1000);

	/*进入场景2017*/
	var jing2017on = function() {
		$("#jing_2017").css('display', 'block');
		setTimeout(function() {
			$("#jing_2017").addClass('on');
		}, 30);
		setTimeout(function() {
			$('#jing_2016').remove();
			$('.rili_2017').removeClass('rili_2017_in');
			$('.chong,.yun_2017,.louyu,.yuezhi_2017').addClass('off');
			$('.wenzi_2017,.ditu_2017').addClass('on');
		}, 4000);
		setTimeout(function() {
			$('.wenzi_2017,.ditu_2017').removeClass('on');
			$('.deng_2017,.liuda_c').addClass('on');
		}, 6000);
		setTimeout(function() {
			$('.deng_2017,.liuda_c').removeClass('on');
			$('.xian,.menxiang').addClass('on');
			setTimeout(function() {
				$('.menxiang').removeClass('on');
				setTimeout(function() {
					$('.menxiang_2').addClass('on');
					setTimeout(function() {
						$('.menxiang_2').removeClass('on');
						setTimeout(function() {
							$('.menxiang_3').addClass('on');
						}, 500);
					}, 3000);
				}, 1000);
			}, 4000);
		}, 10000);
	};
	//jing2017on();
	var jing2017off = function() {

	};

	var audB = true;
	var Audio = document.getElementById('audio');
	window.addEventListener('touchstart', function() {
		if(audB) {
			Audio.play();
			audB = false;
		}
		autoPlayAudio();
	});

	function autoPlayAudio() {
		wx.config({
			// 配置信息, 即使不正确也能使用 wx.ready
			debug: false,
			appId: '',
			timestamp: 1,
			nonceStr: '',
			signature: '',
			jsApiList: []
		});
		wx.ready(function() {
			document.querySelector('audio').play();
		});
	}
});