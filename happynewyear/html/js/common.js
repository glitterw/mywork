// JavaScript Document

//横竖屏检测
var wrap = document.getElementById('wrap');
var onorientationchangeFn = function() {
	if(window.orientation == 180) {
		wrap.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotate(90deg)';
		wrap.style.transform = 'translateX(-50%) translateY(-50%) rotate(90deg)';
	};
	if(window.orientation == 0) {
		wrap.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotate(90deg)';
		wrap.style.transform = 'translateX(-50%) translateY(-50%) rotate(90deg)';
	};
	if(window.orientation == 90) {
		wrap.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotate(0deg)';
		wrap.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg)';
	};
	if(window.orientation == -90) {
		wrap.style.webkitTransform = 'translateX(-50%) translateY(-50%) rotate(0deg)';
		wrap.style.transform = 'translateX(-50%) translateY(-50%) rotate(0deg)';
	};
	wrap.style.width = ((document.documentElement.clientWidth > document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight) + 'px';
	wrap.style.height = ((document.documentElement.clientWidth < document.documentElement.clientHeight) ? document.documentElement.clientWidth : document.documentElement.clientHeight) + 'px';
};
onorientationchangeFn();
var evt = 'onorientationchange' in window ? 'onorientationchange' : 'resize';
window.addEventListener('orientationchange', onorientationchangeFn);
///全屏显示
function launchFullScreen(element) {
	if(element.requestFullScreen) {
		element.requestFullScreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullScreen) {
		element.webkitRequestFullScreen();
	}
}
///退出全屏
function exitFullscreen() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitCancelFullScreen) {
		document.webkitCancelFullScreen();
	}
};
var launchBlen = false;
var OPR = !!navigator.userAgent.match(/opr/i);
if(OPR) launchBlen = true;
window.onclick = function() {
	if(!launchBlen) {
		launchFullScreen(document.documentElement);
		launchBlen = true;
	}
};