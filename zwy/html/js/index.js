$(function() {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		direction: 'vertical',
		slidesPerView: 1,
		paginationClickable: true,
		mousewheelControl: true,
		onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
			swiperAnimateCache(swiper); //隐藏动画元素 
			swiperAnimate(swiper); //初始化完成开始动画
		},
		onSlideChangeEnd: function(swiper) {
			swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
			if(swiper.activeIndex == 1 || swiper.activeIndex == 3) {
				$('body').removeClass('header-dark').addClass('header-light');
			} else {
				$('body').addClass('header-dark').removeClass('header-light');
			}
		}
	});

	//swiper.slideTo(4, 1000, true);

	var animationEvent = (function whichTransitionEvent() {
		var t;
		var el = document.createElement('fakeelement');
		var animationend = {
			'animation': 'animationend',
			'OAnimation': 'oAnimationEnd',
			'MozAnimation': 'animationend',
			'WebkitAnimation': 'webkitAnimationEnd'
		}
		for(t in animationend) {
			if(el.style[t] !== undefined) {
				return animationend[t];
			}
		}
	})();

	if(animationEvent) {
		$('.nav-a-hr i').on(animationEvent, function() {
			var _sectionNav = ["nav-a-1", "nav-a-2", "nav-a-3"];
			var _thisP = $(this).parent().parent().parent().parent();

			_thisP.attr('class', 'active');
			_thisP.nextAll().each(function(i) {
				$(this).attr('class', _sectionNav[i]);
			});
			_thisP.prevAll().each(function(i) {
				$(this).attr('class', _sectionNav[i]);
			});
			$('.section-1-xq>div').eq(_thisP.index()).addClass('active').siblings().removeClass('active');
			if(_thisP.nextAll().size() == 0) {
				setTimeout(function() {
					$('.nav-a-hr i').css('animation', "myfirst-0 1s 0s linear 2 forwards");

					var _thisP = $('.section-1-nav>div').eq(0);
					_thisP.attr('class', 'active');
					_thisP.nextAll().each(function(i) {
						$(this).attr('class', _sectionNav[i]);
					});
					_thisP.prevAll().each(function(i) {
						$(this).attr('class', _sectionNav[i]);
					});
					$('.section-1-xq>div').eq(_thisP.index()).addClass('active').siblings().removeClass('active');
				}, 1000);
			}
		});
	};

	$('.section-1-nav>div').on("mouseenter", function() {
		var _sectionNav = ["nav-a-1", "nav-a-2", "nav-a-3"];
		var _thisP = $(this);

		_thisP.attr('class', 'active');
		_thisP.nextAll().each(function(i) {
			$(this).attr('class', _sectionNav[i]);
		});
		_thisP.prevAll().each(function(i) {
			$(this).attr('class', _sectionNav[i]);
		});
		$('.section-1-xq>div').eq(_thisP.index()).addClass('active').siblings().removeClass('active');
	});
	//第三屏iframe去掉header
	var wFrames = window.frames;
	for(var framesI = 0; framesI < wFrames.length; framesI++) {
		if(wFrames[i].name == "swiper-slide-3-iframe") {
			wFrames[i].onload = function() {
				_document = wFrames[i].document;
				_document.querySelector(".header-wrap").style.display = "none";
			}
		}
	}
	//第四屏
	

	//新闻向上滑动加载更多
	/*$('#rollnew-a').move(function() {
		$(this).css({
			'top': '+=' + this.pageYc
		});
		//$('.section-4-content').css('margin-top', '+=' + this.pageYc);//如果新闻一直加载不完
		var _sc = $('.section-4'),
			_scT = _sc.offset().top,
			_stB = _scT + _sc.height();
		if($('.section-4-content').offset().top + $('.section-4-content').height() - this.pageYc > _stB) {
			$('.section-4-content').css('margin-top', '-=' + this.pageYc);
		}
		rollnewFn();
	});
	$(window).mouseup(function() {
		$('#rollnew-a').animate({
			top: 10
		}, 1000);

	});*/

});



//新闻切换地域
var news = {
	tpl : function(data){
		var newsData = "";

		var leftItems = "<div class='section-4-content left'>",rightItems = "<div class='section-4-content right'>";
		for(i in data){
			if (i%2) {
				rightItems += '<div class="content-xq"><a target="_blank" href="/messageInfo/showView?messageId='+data[i].MESSAGEID+'"><i></i><ii></ii><div>';
				rightItems += '<h5 class="textOverflow">'+data[i].TITLE+'</h5><h6>'+data[i].UPDATE_TIME+' / '+data[i].PUBLISHER+'</h6></div>';
				if (data[i].IMAGEPATH !== null) { rightItems += '<img src="'+data[i].IMAGEPATH+'">'; }
				rightItems += '</a></div>';
			}else{
				leftItems += '<div class="content-xq"><a target="_blank" href="/messageInfo/showView?messageId='+data[i].MESSAGEID+'"><i></i><ii></ii><div>';
				leftItems += '<h5 class="textOverflow">'+data[i].TITLE+'</h5><h6>'+data[i].UPDATE_TIME+' / '+data[i].PUBLISHER+'</h6></div>';
				if (data[i].IMAGEPATH !== null) { leftItems += '<img src="'+data[i].IMAGEPATH+'">'; }
				leftItems += '</a></div>';
			}
			
		}
		rightItems += "</div>";
		leftItems += "</div>";
		newsData += leftItems;
		newsData += rightItems;

		$(".J_news_Box").html(newsData);	
	},
	filter : function(city){
		$('.J_news_tabs').css('background-image','url(./img/index-bg-'+city+'-map.png)')
		$('.J_news_tabs .city-'+city).addClass('cur').siblings().removeClass('cur');
		$.ajax({
			type: "get",
			url: 'news.json',
			data: {
				cityType: city
			},
			success: function(result){
				var data = result.data;
				if (result.status === 'success') {
					news.tpl(data)
				}
				
			}
		})
	}
}

// 顶部导航切换
$(function(){
	$('.J_menuTrigger').on('click',function(){
		var _this = $(this);
		_this.toggleClass('open')
		_this.next('.J_menuSub').toggle()
	})
})


$(function(){

	 function rollnewFn() {
		var _sc = $('.section-4'),
			_scT = _sc.offset().top,
			_stB = _scT + _sc.height();
		$('.section-4-content').find('.content-xq').each(function() {
			var _thisT = $(this).offset().top,
				_thisB = _thisT + $(this).height();
			if(_thisT < _scT || _thisB > _stB) {
				$(this).addClass('hide')
			} else {
				$(this).removeClass('hide')
			}
		});
	};
	rollnewFn();

	var triggerParentHeight = $('.J_scroll-inner').height()


	$('#rollnew-a').mousedown(function(e){

		// e.pageX
		var positionDiv = $(this).offset();
		var positionOuterDiv = $('.J_scroll-inner').offset();
		var distenceY = e.pageY - positionDiv.top + positionOuterDiv.top;
		//alert(distenceX)
		// alert(positionDiv.left);
		var trigger = $('#rollnew-a');

		var scrollBox = $('.J_news_Box');
		var scrollBoxOut = $('.J_news');

		var scrollBoxH = scrollBox.height()
		var scrollBoxOutH = scrollBoxOut.height()
		var dragHeight = scrollBoxH-scrollBoxOutH;

		if (dragHeight>0) {
		
			$(document).mousemove(function(e){
				var y = e.pageY - distenceY;
				
				

				if(y<0){
					y=0;
				}else if(y>triggerParentHeight-trigger.outerHeight(true)){
					y = triggerParentHeight-trigger.outerHeight(true);
				}

				trigger.css({
					'top':y+'px'
				});

				var percentage = y/(triggerParentHeight-trigger.outerHeight(true));
				
				scrollBox.css('top',-percentage*dragHeight);

				rollnewFn()
			});

			$(document).mouseup(function(){
				$(document).off('mousemove');
			});

		}
	});
})