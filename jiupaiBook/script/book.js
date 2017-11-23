/**
 *图书相关
 */

//获取书的分数对应的星星样式
function getBookStars(score){
  var html='';
  var starNum=0;
  var bStarNum=0;
  var grayStarNum=0;
  if(0.0<=score && score<=0.2){ //0
  	starNum=0;
  	bStarNum=0;
  	grayStarNum=5; 
  }else if(0.2<score  && score<=1.2){//0.5
  	starNum=0;
  	bStarNum=1;
  	grayStarNum=4; 

  }else if(1.2<score  && score<=2.2){//1
   	starNum=1;
  	bStarNum=0;
  	grayStarNum=4; 
  }else if(2.2<score  && score<=3.2){//1.5
   	starNum=1;
  	bStarNum=1;
  	grayStarNum=3;  
  }else if(3.2<score  && score<=4.2){//2
   	starNum=2;
  	bStarNum=0;
  	grayStarNum=3;  
  }else if(4.2<score  && score<=5.2){//2.5
   	starNum=2;
  	bStarNum=1;
  	grayStarNum=2;  
  }else if(5.2<score  && score<=6.2){//3
   	starNum=3;
  	bStarNum=0;
  	grayStarNum=2;  
  }else if(6.2<score  && score<=7.2){//3.5
   	starNum=3;
  	bStarNum=1;
  	grayStarNum=1;  
  }else if(7.2<score  && score<=8.2){//4
   	starNum=4;
  	bStarNum=0;
  	grayStarNum=1;  
  }else if(8.2<score  && score<=9.2){//4.5
  	starNum=4;
  	bStarNum=1;
  	grayStarNum=0;   
  }else if(9.2<score  && score<=10.0){//5
   	starNum=5;
  	bStarNum=0;
  	grayStarNum=0;  
  }

for(var i=1;i<=starNum;i++){
	html+='<dd ></dd>';
}
for(var i=1;i<=bStarNum;i++){
	html+='<dd class="bStar"></dd>';
} 
for(var i=1;i<=grayStarNum;i++){
	html+='<dd class="grayStar"></dd>';
}

return html;

}

//获取书的图片地址
function getBookImgPath(iconPath){
	var imgPath='';
	if(iconPath.length>0){
		imgPath=ajaxAgent.serverAction+iconPath;
	}else{
	  imgPath='../image/book.png';
	}
    return imgPath;
}

//链接到图书详情 
function openBookDetail(bookId){ 
 	api.openWin({
		name : "book" + bookId,
		url : "win_book.html",
		bounces : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		},
		pageParam : {
			bookId:bookId 
		}
	}); 

}

//打开作者的图书列表
function openAuthorBookList(author){
  var pageParam={
  	frmName :'authorBookList',
  	frmUrl :'frm_authorBookList.html',
  	barTitle:author,
  	author:author,
  
  }
  openCommonWinNew(pageParam);
}

//打开推荐详情
function openDetail(recommendId){ 
  	api.openWin({
		name : "recommendDetail",
		url : "win_recommendDetail.html",
		bounces : false,
		vScrollBarEnabled : false,
		hScrollBarEnabled : false,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		},
		pageParam :{
			recommendId:recommendId,
			//bookId:api.pageParam.bookId 
		}
	});		

}

//跳转到榜单页面
function openRank(fatherId,fatherName,childrenId,rankYear){
    alert(childrenId);
	api.openWin({
		name : "rank_" + fatherId+childrenId,
		url : "win_rank.html",
		bounces : false,
		vScrollBarEnabled : true,
		hScrollBarEnabled : false,
		animation : {
			type : "push", //动画类型（详见动画类型常量）
			subType : "from_right", //动画子类型（详见动画子类型常量）
			duration : 300 //动画过渡时间，默认300毫秒
		},
		pageParam : {
			rankId: fatherId,
			rankName : fatherName,
			childrenId :childrenId,
			rankYear:rankYear
		},
		reload:true,
	});		
}



