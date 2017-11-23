// JavaScript Document

$(document).ready(function() {
	//点击下拉展示
	$('.selectBox span').click(function(){	 
		$(this).siblings("ul").slideDown();
	});
	//点击下拉箭头展示
	$('.selectBox i').click(function(){	 
		$(this).siblings("ul").slideDown();
	});
	//鼠标离开下拉收起
	$('.selectBox ul').mouseleave(function(){	
		$(this).slideUp().siblings("ul").slideDown();
	});	
	/* 
	$('.selectList').find('ul li').click(function(){
		var selectval = $(this).html();	
		$(this).parents(".selectList").find("span").html(selectval);
		$(this).parent("ul").slideUp();
	}); 
	*/
	
	/*指数构成分析*/
	$("#Tab1").find("ol li").click(function(){
			$("#Tab1").find("ol li").attr("class","");
			$("#Tab1").find("ul li").css("display","none");
			$(this).attr("class","active");
			$("#Tab1").find("ul li").eq($(this).index()).css("display","block");
		})
		
		$(".composition_right ol li").click(function(){
			$(this).addClass("active").siblings().removeClass("active");
			})
			
			
			/*全城览书与读书问津切换*/
		$('.storyBookMap').find('.storyMapTitle li').click(//（1）首先找到DIV1下的按钮，加上点击事件
		function(){
				$('.PartitionBox').show();
		
		/*$('.storyBookMap').find('.storyMapTitle li').removeClass('active')//（3）使所有的按钮所有class还原回原来的
			$('.storyBookMap').find('.storyLI').css('display','none')//（4）让所有的ul li先隐藏
			 
			$(this).addClass('active')//（2）让当前的class等于active
			
			$('.storyBookMap').find('.storyLI').eq($(this).index()).css('display','block');//(5)找到对应的ul li并显示*/
			}
	);
	/*全城分区关闭按钮*/
	$('.PartitionBox .close').click(function(){
		$('.PartitionBox').hide();
		$('.bgShadow').hide();
		})
		
	/*点区域出现图书馆*/
	$('.PartitionBox ul li a').click(function(){
		$(this).addClass('active').parent("li").siblings().find("a").removeClass('active')
		//$('.readBook').show().animate({'width':'0','left':'350px'},0);
		$('.readBook').show().animate({'width':'335px','left':'361px'},300);
		$('.PartitionBox .close').hide();
		})
	/*图书馆等菜单展开后关闭按钮*/
	$('.readBook .close').click(function(){
		$('.readBook').hide().animate({'width':'0px','left':'361px'},170);
		$('.PartitionBox .close').show();		
		$('.storyPosition').hide();
		$('.bgShadow').hide();
		$('.storyDetails').hide();
		})
	
	/*点击图书馆定位*/
	/**$('.readBook ul').find('li').click(function(){
		$(this).addClass('active').siblings().removeClass('active')
		$('.storyPosition').show();
			$('.bgShadow').show();
		})
**/
	/*点击定位地标显示详情*/
//	$('.storyPosition').click(function(){
//		$('.storyDetails').show();
//		})
		
	/*地图定位详情介绍关闭按钮*/
//	$('.storyDetails .close').click(function(){
//		$('.storyDetails').hide();
//		})
	/*读书问津奇偶数行*/	
	
});
