/**
 *自定义监听事件 
 */

//自定义刷新监听
function sendReload(){ 
	api.sendEvent({
	    name: 'reload',
	    extra: {
	        reload: true,  
	    }
	});

}

//断网监听
function offline(frmY,frmH,thisFrmName,thisFrmUrl){
	api.addEventListener({
	    name:'offline'
	}, function(ret, err){  
		api.toast({
			msg : '网络不给力哦！',
			duration : 2000,
			location : 'middle'
		}); 
	    openOffline(frmY,frmH);
	}); 

}

function offlineNew(){
	api.addEventListener({
	    name:'offline'
	}, function(ret, err){ 
	    openOfflineNew();
	}); 

}
//打开断网页面
function openOfflineNew(){ 
	api.openFrame({
	    name: 'offline',
	    url: 'frm_offline.html',
	    rect: {
		    x:0,
		    y:0,
		    w:'auto',
		    h:api.frameHeight
	    },
	    pageParam:{
	    	thisFrmName:api.frameName,
	    	thisFrmUrl:thisFrmUrl,
	    	frmY:frmY,
	    	frmH:frmH 
	    }
	    
    });	

}


//自定义监听网络问题事件
function sendNetError(frmY,frmH){  
	 
	var connectionType = api.connectionType;  
	if(connectionType=='none'){//离线状态
	api.sendEvent({
	    name: 'netError',
	    extra: {
	        frmY: frmY, 
	        frmH: frmH
	    }
	});
	return false;				
	}  

}


//自定义监听网络问题事件
function sendIndexNetError(frmY,frmH){  
	 
	var connectionType = api.connectionType;  
	if(connectionType=='none'){//离线状态
	api.sendEvent({
	    name: 'indexNetError',
	    extra: {
	        frmY: frmY, 
	        frmH: frmH
	    }
	});
	return false;				
	}  

}
//添加监听
function listenIndexError(){ 
	api.addEventListener({
	    name: 'indexNetError'
	}, function(ret, err){  
	    openOfflineIndex(ret.value.frmY,ret.value.frmH); 
	});
}
//添加监听
function listenNewError(){ 
	api.addEventListener({
	    name: 'netError'
	}, function(ret, err){   
	       openOffline(ret.value.frmY,ret.value.frmH); 
	});
}

//断网监听
function openOfflinePage(frmY,frmH){ 
	api.addEventListener({
	    name:'offline'
	}, function(ret, err){  
		api.setFrameGroupAttr({
		    name: 'group', 
			rect : {
				x : 0,
				y : frmY,
				w : 'auto',
				h : frmH
			}
		});
		api.setFrameGroupIndex({
			name : 'group',
			index : 4,
			reload:true,  
		});	    
	    
	}); 

}


//在主框架打开断网页面
function openOfflineIndex(frmY,frmH){  
	api.setFrameGroupAttr({
	    name: 'group', 
		rect : {
			x : 0,
			y : frmY,
			w : 'auto',
			h : frmH
		}
	});
	api.setFrameGroupIndex({
		name : 'group',
		index : 4,
		reload:true,  
	});	    

}


//打开断网页面
function openOffline(frmY,frmH){  
	api.openFrame({
	    name: 'offline',
	    url: 'frm_offline.html',
	    rect: {
		    x:0,
		    y:frmY,
		    w:'auto',
		    h:frmH
	    } 
    });	

}



