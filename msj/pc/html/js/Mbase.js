// JavaScript Document
$(function() {
	//判断IE,判断火狐
	var ie = !-[1, ];
	var FF = !!navigator.userAgent.match(/firefox/i);
	var PC = !navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	var Mobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	//var ev=ev||event;ev.preventDefault();window.event.returnValue=false; return false;
	//input的val改变事件$('.text').input(function() {this})
	$.fn.input = function(Fn) {
		if(ie) {
			$(this).on('propertychange', function() {
				Fn.apply(this);
			})
		} else {
			$(this).on('input', function() {
				Fn.apply(this);
			})
		}
	};
	//滚轮滚动事件$(document).mousewheel(function() {this.Down});
	$.fn.mousewheel = function(Fn) {
		if(FF) {
			$(this).on('DOMMouseScroll', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.detail > 0);
				Fn.apply(this);
			})
		} else {
			$(this).on('mousewheel', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.wheelDelta < 0);
				Fn.apply(this);
			})
		}
	};
	//拖拽事件$('.move').move(function() { $(this).css({ 'left': '+=' + this.pageXc, 'top': '+=' + this.pageYc }); });
	$.fn.move = function(Fn) {
		$(this).on('mousedown', function(ev) {
			this.pageXc = this.pageYc = 0;
			var _this = this,
				pvrPageX = ev.pageX,
				pvrPageY = ev.pageY;
			$(document).on('mousemove.thisMove', function(ev) {
				ev.preventDefault();
				_this.pageXc = ev.pageX - pvrPageX;
				_this.pageYc = ev.pageY - pvrPageY;
				Fn.apply(_this);
				pvrPageX = ev.pageX;
				pvrPageY = ev.pageY;
			});
			$(document).on('mouseup.thisMove', function(ev) {
				$(this).off('mousemove.thisMove mouseup.thisMove');
			});
			//$(this).on('dragend', function(ev) {
			//	setTimeout(function() {
			//		$(document).mouseup();
			//	}, 10);
			//});
		});
	};
	//模拟input滑块事件$('#range .mea').move(rangeFn);
	rangeFn = function() {
		var _thisParent = $(this).parent();
		var _thisParentLeftMin = 0;
		var _thisParentLeftMax = _thisParent.width();
		var _thisStep = (_thisParentLeftMax - _thisParentLeftMin) * _thisParent.attr('step') / (_thisParent.attr('max') - _thisParent.attr('min'));
		var _thisLeft = parseFloat($(this).css('left')) + this.pageXc;
		if(_thisLeft >= _thisParentLeftMin && _thisLeft <= _thisParentLeftMax) {
			$(this).css({
				'left': _thisLeft,
			});

			$(this).attr('value', Math.round(_thisLeft / _thisStep) * _thisParent.attr('step'));
		};
	};
	//鼠标框选事件$('.drag-area').dragaarea(function(ev) {this.areachecked/*框选中的元素class:in-area;*/});
	//默认可框选元素class='in-area';
	$.fn.dragaarea = function(Fn) {
		$(this).mousedown(function(ev) {
			var downthis = this,
				oArea = $(this),
				aDom = oArea.find('.in-area'),
				aDragArea = [],
				aDragAreachecked = [],
				mDown = {
					'pageX': ev.pageX,
					'pageY': ev.pageY
				},
				mMove = {};
			aDom.removeClass('area-checked');
			aDom.each(function(i) {
				var _this = $(this),
					thisOffLeft = _this.offset().left,
					thisOffTop = _this.offset().top,
					oDragArea = {
						'index': i,
						'checked': false,
						'offsetLeft': thisOffLeft,
						'offsetTop': $(this).offset().top,
						'offsetRight': thisOffLeft + this.offsetWidth,
						'offsetBottom': thisOffTop + this.offsetHeight
					};
				aDragArea.push(oDragArea);
			});

			$(document).on('mousemove.thisDragArea', function(ev) {
				ev.preventDefault();
				mMove = {
					'pageX': ev.pageX,
					'pageY': ev.pageY
				};
				aDragAreachecked = [];
				$.each(aDragArea, function(i, n) {
					if((n['offsetLeft'] >= mDown['pageX']) && (n['offsetTop'] >= mDown['pageY']) && (n['offsetRight'] <= mMove['pageX']) && (n['offsetBottom'] <= mMove['pageY'])) {
						if(!n['checked']) {
							n['checked'] = true;
						};
					} else {
						if(n['checked']) {
							n['checked'] = false;
						};
					};
					if(n['checked']) {
						aDragAreachecked.push(aDom.get(n['index']));
					};
				});
				downthis.areachecked = aDragAreachecked;
				Fn.apply(downthis);
			});
			$(document).on('mouseup.thisDragArea', function(ev) {
				$(this).off('mousemove.thisDragArea mouseup.thisDragArea');
			});
		});
	};
	//空格验证 $('.kgyz').on('focus',focus_null);
	focus_null = function() {
		$(this).next().css('display', 'none');
		$(this).blur(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			};
		});
	};
	//初始状态,空格验证 text_load('.kgyz');
	text_load = function(obj) {
		$(obj).each(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			} else {
				$(this).next().css('display', 'none');
			};
		});
	};
	//模拟滚动条调用

	if(PC && $('.MScroll').size() > 0) {
		(function() {
			var oLink = document.createElement("link");
			oLink.id = "mCustomScrollbarCSS";
			oLink.href = "mCustomScrollbar/jquery.mCustomScrollbar.min.css";
			oLink.rel = "stylesheet";
			oLink.type = "text/css";
			document.getElementsByTagName('body')[0].appendChild(oLink);
			var oScript = document.createElement("script");
			oScript.id = "mCustomScrollbarJS";
			oScript.type = "text/javascript";
			oScript.src = "mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js";
			document.getElementsByTagName('body')[0].appendChild(oScript);
			oScript.onload = function() {
				$(".MScroll").mCustomScrollbar({
					scrollButtons: {
						enable: false,
						scrollType: "continuous",
						scrollSpeed: 20,
						scrollAmount: 40
					},
					horizontalScroll: false,
				});
			};
		})();
	};
	//模拟下拉框
	(function() {
		$(document).on('click', '.Mchecked', function() {
			$(this).toggleClass('Mchecked_on');
			$(this).siblings().slideToggle();
		});
		$(document).on('click', '.Moption', function() {
			$(this).parents('.MoptionBox').slideUp().siblings().html($(this).html()).val($(this).attr('value')).removeClass('Mchecked_on');
		});
		$(document).on('mouseleave', '.Mselect', function() {
			$(this).children('.MoptionBox').slideUp().siblings().removeClass('Mchecked_on');
		});
	})();
	//分页PageFn('Mpage1','hrefPage');
	PageFn = function(opage, hrefPage) {
		if(!document.getElementById('laypageJS')) {
			$('body').append("<script id='laypageJS' type='text/javascript' src='js/laypage.js'></script>");
		};
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				//通过url获取当前页，也可以同上（pages）方式获取
				var str = "/" + hrefPage + "=(\\d+)/";
				var reg = eval(str);
				var page = location.search.match(reg);
				return page ? page[1] : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					var search = location.search;
					var str = "/" + hrefPage + "=(\\d+)/";
					var reg = eval(str);
					var page = location.search.match(reg);
					if(page) {
						search = search.replace(reg, hrefPage + '=' + e.curr);
					} else if(!search) {
						search = search + '?' + hrefPage + '=' + e.curr;
					} else {
						search = search + '&' + hrefPage + '=' + e.curr;
					}
					location.href = search;
				}
			}
		});
		MPage.find('.laypage_skip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypage_skip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};
	PageFnAjax = function(opage, ObjFn) {
		if(!document.getElementById('laypageJS')) {
			$('body').append("<script id='laypageJS' type='text/javascript' src='js/laypage.js'></script>");
		};
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				return MPage.attr('data-curr') ? MPage.attr('data-curr') : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					MPage.attr('data-curr', e.curr);
					ObjFn();
					MPage.find('.laypage_skip').attr({
						'max': thisPages,
						'type': 'text'
					});
				}
			}
		});
		MPage.find('.laypage_skip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypage_skip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};

});