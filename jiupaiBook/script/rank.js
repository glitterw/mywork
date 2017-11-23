/**
 *排行榜相关方法
 */

//获取一级榜单的二级榜单,记录缓存
/*
 * pageChildrenId 外部传递的id 
 */
function getChildren(pageChildrenId,pageChildrenName) {
	//清空二级榜单
	var actionUrl = ajaxAgent.serverAction + '/jpjs/playlist/jpjs_playlistTwo';
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				fatherId : api.pageParam.rankId,
				page : 1,
				pageNum : 0
			}
		}
	}, function(ret, err) {
		if (ret) {
			var html = '';
			if (ret.result == 1) {
				if (ret.list.length > 0) { 
					//保存二级榜单 
					//var thisChildren =getThisChildren(); 
					//if (null==thisChildren) {
					  var id=0;
					  var name="";
					   if(pageChildrenId==0){  
					         
							setThisChildren(ret.list[0]);//当前选中的的默认为第一个 
							id=ret.list[0].id;
							name=ret.list[0].name;
						}else{
						    var thisChildren={
						    	id:pageChildrenId,
						    	name:pageChildrenName
						    }
						    setThisChildren(thisChildren);
						    id=pageChildrenId;
						    name=pageChildrenName;
						}
						creatChildrenHtml(ret.list,id);
					//} 
					//修改页面内容
					updateSelectRank();
					if(rankType!=4){//非热书榜  
						getRankYear(id,name);  
					}else{ 
						openFramRankBook(id,"",name); 
					}
				}
			}
		}
	});
}

 
//修改当前页面
function updateSelectRank(){
   var thisChildren=getThisChildren(); 
   if(thisChildren ){ 
   		$api.text($api.byId("childrenName"), thisChildren.name); 
   } 
}

//修改当前页面
function updateSelectYearValue(){ 
   var thisYear=getThisYear();  
   	$api.text($api.byId("year"), thisYear);  
    $api.removeCls($api.byId("selectYear"), "hidden");  
} 
//修改当前页面
function updateSelectValue(){
   var thisChildren=getThisChildren();
   var thisYear=getThisYear();  
   if(thisChildren ){ 
   		$api.text($api.byId("childrenName"), thisChildren.name); 
   		if(rankType!=4){//非热书榜 
   			//getRankYear(thisChildren.id,thisChildren.name); 
   			$api.text($api.byId("year"), thisYear);  
   		}else{//隐藏年份
   		  $api.addCls($api.byId("selectYear"), "hidden"); 
   		}
   		 
   		
   } 
}

 

/**
 *获取当前被选择的二级榜单的ID
 */
function getThisChildren() {
	var str=getPrefs("thisChildren");  
	if(null==str || ""==str){ 
	  return null ;
	}else {
    	return $api.strToJson(str);
    }
	 
}

/**
 *设置当前选择的二级榜单的ID
 */
function setThisChildren(thisChildren) {
    var str=$api.jsonToStr(thisChildren);  
	setPrefs("thisChildren", str);
}

/**
 *获取当前被选择的年份
 */
function getThisYear() {
	var thisYear = getPrefs("thisYear");
	if (null == thisYear || "" == thisYear) {
		return "";
	} else {
		return thisYear;
	}
}

/**
 *设置当前选择的年份
 */
function setThisYear(thisYear) {
	setPrefs("thisYear", thisYear);
}

 

/**生成页面显示列表，并保存
 * thisChildrenId  :当前选中的二级榜单的Id
 */
function creatChildrenHtml(list, thisChildrenId) {
    
	var html = '';
	for (var i = 0; i < list.length; i++) {
		var obj = list[i];
		var func = "select(this,'" + obj.rankName + "'," + obj.id + ")";
		if (thisChildrenId == obj.id) {//选择当前榜单
			html += '<li class="active"  onclick="' + func + '"><p>' + obj.rankName + '</p></li>';
		} else {
			html += '<li   onclick="' + func + '"><p>' + obj.rankName + '</p></li>';
		}
	}
	//保存
	setPrefs('childrenListHtml', html);
}

/**
 * 生成年份显示列表,并保存
 *
 */
function creatYearHtml(list, thisYear) {
	var html = '';
	for (var i = 0; i < list.length; i++) {
		var obj = list[i];
		var func = "selectYear(this,'" + obj.year + "')";
		if (thisYear == obj.year) {
			html += '<li  class="active"  onclick="' + func + '"><p>' + obj.year + '</p></li>';
		} else {
			html += '<li   onclick="' + func + '"><p>' + obj.year + '</p></li>';
		}
	}
	//保存
	setPrefs('yearListHtml', html);
}

//获取二级榜单的年份
function getRankYear(thisChildrenId,thisChildrenName) { 
	var actionUrl = ajaxAgent.serverAction + '/jpjs/playlist/jpjs_playlistYear';//'/jpjs/playlist/jpjs_playlistYear';
	 
	api.ajax({
		url : actionUrl,
		method : 'post',
		timeout : 50,
		dataType : 'json',
		returnAll : false,
		data : {
			values : {
				rankId : thisChildrenId,
				name:thisChildrenName,
				page : 1,
				pageNum : 0
			}
		}
	}, function(ret, err) {  
		if (ret) {
			var html = '';
			var thisYear='';
			if (ret.result == 1) {
				if (ret.list.length > 0) { 
					thisYear = ret.list[0].year; 
					setThisYear(thisYear);
					//保存当前被选择的年份
					$api.text($api.byId("year"), thisYear); 
					creatYearHtml(ret.list,thisYear);
				    sendReload(thisChildrenId,thisYear,thisChildrenName); 
				} else {//没有获取年份的把年份选择项屏蔽
					$api.addCls($api.byId("selectYear"), "hidden");
				}
			}else{//没有年份 
			  $api.addCls($api.byId("selectYear"), "hidden");
			} 
			openFramRankBook(thisChildrenId,thisYear,thisChildrenName); 
		}
		
		 
	});
}

//打开图书排行
function openRankList(rankId,rankName,childrenId,childrenName,rankYear){
	api.openWin({
		name : "rank_" + rankId,
		url : "win_rankNew.html",
		bounces : false,
		vScrollBarEnabled : true,
		hScrollBarEnabled : false,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		},
		pageParam : {
			rankId: rankId,
			rankName : rankName,
			childrenId:childrenId,
			rankYear:rankYear,
			childrenName:childrenName
		},
		reload:true,
	});		

}
 

//监听刷新
function sendReload(thisChildrenId,thisYear,thisChildrenName){ 
	api.sendEvent({
	    name: 'rankListReload',
	    extra: {
	        thisChildrenId: thisChildrenId,
	        thisYear:thisYear,
	        thisChildrenName:thisChildrenName , 
	    }
	});

}

//打开fram
function openFramRankBook(thisChildrenId,thisYear,thisChildrenName) {  
	 
	api.openFrame({
		name : 'frm_rankList_'+thisChildrenId+thisYear,
		url : 'frm_rankList.html',
		rect : {
			x : 0,
			y : y,
			w : 'auto',
			h : 'auto'
		},
		pageParam : {
			fatherId : api.pageParam.rankId,
			rankName: thisChildrenName,
			rankId : thisChildrenId,
			year : thisYear
		},
		bounces : false, 
		reload : true
	});
}