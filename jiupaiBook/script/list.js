/**
 *列表页面公用方法
 */

//页面加载完开始
function beginLoad() {
	getList();
	setRefreshHeader();
	api.addEventListener({
		name : 'scrolltobottom'
	}, function(ret, err) { 
		var sumNum = page * pageNum; 
		if (sumNum >= totalNum) {
			var msg = '暂无数据...';
			if (totalNum == 0)
				msg = '暂无数据...';
			else
				msg = '已经到底了...';
			api.toast({
				msg : msg,
				duration : 3000,
				location : "bottom"
			});
		} else {
			page++;
			getList();
			//api.parseTapmode();
		}
	});
}

//头部刷新
function setRefreshHeader() {
   
	api.setRefreshHeaderInfo({
		visible : true,
		bgColor : '#ccc',
		textColor : '#fff',
		textDown : '下拉刷新...',
		textUp : '松开刷新...',
		showTime : true
	}, function(ret, err) { 
		//alert(api.frameName); 
		page=1;
		getList();
		api.refreshHeaderLoadDone();
	});
}

//获取列表内容
/**
 * 
 * @param string actionUrl 请求的接口地址
 * @param {Object} values 传递的数据
 */
function getListContent(actionUrl,values,frmY,frmH) { 
	 
	showProgress();  
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : values
		}
	}, function(ret, err) {  
	     api.hideProgress();   
		if (ret) {
			if (ret.result == 1) { 
			   makelist(ret);
			   api.parseTapmode(); 
			   return true; 
			} else { 
               toastNetErrBottom("服务器请求错误！"); 
			}
			
		} else {  
		     //sendNetError(frmY,frmH);
		     //api.hideProgress();  
			 toastNetErrBottom('网络异常,请稍后再试哦!'); 
			  
		} 
		
		
	});

}





//打开推荐历史
function openRecommendList(bookId,bookName){
  var values={
  	 barTitle:'推荐人列表',
  	 bookId:bookId,
  	 frmName:'bookRecommend',
  	 frmUrl:'frm_bookRecommend.html',
  
  }  
  openCommonWinNew(values);
  
}

//打开分类下面的图书列表
function getClassBookList(classId,chlassName){
	var pageParam={
		barTitle:chlassName,
		frmName:'classBookList',
		frmUrl:'frm_classBookList.html',
		classId:classId
	}
	openCommonWinNew(pageParam);
}

