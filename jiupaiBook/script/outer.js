/**
 *APP外部监听事件
 */

//断网监听
function offline() {
	api.addEventListener({
		name : 'offline'
	}, function(ret, err) {
		api.toast({
			msg : '网络不给力哦！',
			duration : 2000,
			location : 'bottom'
		});
	});
}

