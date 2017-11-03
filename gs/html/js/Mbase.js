// JavaScript Document
$(function() {
	//判断IE,判断火狐
	var ie = !-[1, ];
	var FF = !!navigator.userAgent.match(/firefox/i);
	var PC = !navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	var Mobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
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
			$(document).mousemove(function(ev) {
				moveFn(ev);
			});
			$(document).mouseup(function() {
				moveFn2();
			});
			var moveFn = function(ev) {
				_this.pageXc = ev.pageX - pvrPageX;
				_this.pageYc = ev.pageY - pvrPageY;
				Fn.apply(_this);
				pvrPageX = ev.pageX;
				pvrPageY = ev.pageY;
			};
			var moveFn2 = function() {
				moveFn = moveFn2 = function() {};
			};
		});
	};
	//空格验证 $('.kgyz').on('focus',focus_null);
	function focus_null() {
		$(this).next().css('display', 'none');
		this.onblur = function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			}
		}
	}
	//初始状态,空格验证 text_load($('.kgyz'));
	function text_load(obj) {
		var objL = obj.length;
		for(var i = 0; i < objL; i++) {
			if(obj[i].value != '') {
				$(obj[i]).next().css('display', 'none');
			}
		}
	}
	//模拟滚动条调用
	if(PC) {
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
	}
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
	//分页PageFn('Mpage1');
	PageFn = function(opage) {
		if(!document.getElementById('laypageJS')) {
			$('body').append("<script id='laypageJS' type='text/javascript' src='laypage/laypage.js'></script>");
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
				var page = location.search.match(/page=(\d+)/);
				return page ? page[1] : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					location.href = '?page=' + e.curr;
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