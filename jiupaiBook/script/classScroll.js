/**
 *分类左右滑动
 */

//获取一级分类
function classList() {
	var actionUrl = ajaxAgent.serverAction;
	actionUrl += '/jpjs/booktype/jpjs_bookTypeOne';
	showProgress();
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				page : 1,
				pageNum : 0
			}
		}
	}, function(ret, err) {
		api.hideProgress();
		if (ret) {
			if (ret.result == 1) {
				if (ret.list) {
					var html = '<li class="active" onClick="openList(this,0)" ><span>全部</span></li>';
					for (var i = 0; i < ret.list.length; i++) {
						var obj = ret.list[i];
						html += '<li onClick="openList(this ,' + obj.id + ')" ><span>' + obj.className + '</span></li>';
					}
					$api.html($api.byId("twoNav"), html);
					onLoadScroll();

				} else {
					toastNetErr("分类获取失败！");
				}
			} else {
				toastNetErr(ret.msg);
			}
		} else {
			toastNetErr(err.statusCode);
		}

	});
}

//获取一级分类
function classListByMyFav() {
	var actionUrl = ajaxAgent.serverAction;
	actionUrl += '/jpjs/booktype/jpjs_bookTypeOne';
	showProgress();
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				page : 1,
				pageNum : 0
			}
		}
	}, function(ret, err) {
		api.hideProgress();
		if (ret) {
			if (ret.result == 1) {
				if (ret.list) {
					var html = '<li class="active" onClick="funActive(this,0)" ><span>全部</span></li>';
					for (var i = 0; i < ret.list.length; i++) {
						var obj = ret.list[i];
						html += '<li onClick="funActive(this ,' + obj.id + ')" ><span>' + obj.className + '</span></li>';
					}
					$api.html($api.byId("twoNav"), html);
					loaded();//onLoadScroll();

				} else {
					toastNetErr("分类获取失败！");
				}
			} else {
				toastNetErr(ret.msg);
			}
		} else {
			toastNetErr("服务请求错误！");
		}

	});
}


function loaded() {
	myScroll = new IScroll('#FilterBox', {
		scrollX : true,
		tap : true
	});

   funActive(0);

}

function funActive(ele,classId) {
	var eLis =$api.domAll($api.byId("twoNav"), "li"); 
	if ( typeof ele == 'object') {
		for (var i = 0, len = eLis.length; i < len; i++) {
			if (eLis[i] == ele) {
				ele = i;
			}
		}
	}
	myScroll.scrollToElement(eLis[ele], 300, true)
	openListFav(eLis[ele],classId);
};
	
//获取一级排行榜
function rankList() {
	var actionUrl = ajaxAgent.serverAction;
	actionUrl += '/jpjs/playlist/jpjs_playlistOne';
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				page : 1,
				pageNum : 10
			}
		}
	}, function(ret, err) {
		if (ret) {
			if (ret.result == 1) {
				if (ret.list) {
					//获取当前选择的一级榜单
					var fatherId = 0;
					if ($api.getStorage("fatherRank"))
						fatherId = $api.getStorage("fatherRank");
					else
						fatherId = 0;

					var html = '';
					if (fatherId == 0) {
						html = '<li class="active" onClick="openChildrenRank(this ,0)" >全部</li>';
					} else {
						html = '<li  onClick="openChildrenRank(this ,0)" >全部</li>';
					}
					for (var i = 0; i < ret.list.length; i++) {
						var obj = ret.list[i];
						if (fatherId == obj.id) {
							html += '<li class="active" onClick="openChildrenRank(this ,' + obj.id + ')" >' + obj.rankName + '</li>';
						} else {
							html += '<li  onClick="openChildrenRank(this ,' + obj.id + ')" >' + obj.rankName + '</li>';
						}
					}
					$api.html($api.byId("twoNav"), html);
					//默认为全部
					$api.setStorage('fatherRank', fatherId);
					onLoadScroll();
					//loaded();

				} else {
					toastNetErr("分类获取失败！");
				}
			} else {
				toastNetErr(ret.msg);
			}
		} else {
			toastNetErr(err.statusCode);
		}

	});
}

/*
*
*             hScroll                 false 禁止横向滚动 true横向滚动 默认为true
vScroll                 false 精致垂直滚动 true垂直滚动 默认为true
hScrollbar            false隐藏水平方向上的滚动条
vScrollbar            false 隐藏垂直方向上的滚动条
fixedScrollbar      在iOS系统上，当元素拖动超出了scroller的边界时，滚动条会收缩，设置为true可以禁止滚动条超出
scroller的可见区域。默认在Android上为true， iOS上为false
fadeScrollbar  　  false 指定在无渐隐效果时隐藏滚动条
hideScrollbar  　  在没有用户交互时隐藏滚动条 默认为true
bounce            　启用或禁用边界的反弹，默认为true
momentum     　 启用或禁用惯性，默认为true，此参数在你想要保存资源的时候非常有用
lockDirection       false取消拖动方向的锁定， true拖动只能在一个方向上（up/down 或者left/right）
*/
//加载分类菜单左右滑动样式
function onLoadScroll() {
	var myScroll;
	setTimeout(function() {
		myScroll = new IScroll('#FilterBox', {
			eventPassthrough : true,
			scrollX : true,
			scrollY : false,
			preventDefault : true
		});
	}, 100);
}




function onLoadScrollNew() {
	var myscroll;
	function loaded() {
		myscroll = new iScroll("#scroller");
	}


	window.addEventListener("DOMContentLoaded", loaded, false);

}

//打开fram列表
function openList(obj, classId) {
	selectLi(obj);
	$api.val($api.byId("classId"), classId);
	openFram(2);
}

//打开我的收藏列表
function openListFav(obj, classId) {
	selectLi(obj);
	$api.val($api.byId("classId"), classId);
	openFram(classId);
}

//选择改变样式
function selectLi(obj) {
	var activeLi = $api.dom($api.byId('twoNav'), 'li.active');//注意:可能不是所有用到selectLi的地方都有twoNav
	$api.removeCls(activeLi, 'active');
	$api.addCls(obj, 'active');
}

