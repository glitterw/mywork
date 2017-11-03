// JavaScript Document
$(function () {
	//input的val值发生变化事件"input";
//	$('.text_0').input(function() {
//		alert(this.defaultValue)
//	}); 
	//滚轮事件mousewheel;
//	$(document).mousewheel(function() {
//		alert(this.Down)
//	});
	//数据绑定方法$.databind(ojson);
//	var ojson = {"name1": "后绑定数据","name4": "但没有作用域限制","name2": "因为自己写的","name3": "对url,href绑定要声明对应的名称如hrefj*对应href","name5": "找不到的","hrefj1":"https://www.baidu.com","srcj1":"https://www.baidu.com/img/baidu_jgylogo3.gif"};
//	$.databind(ojson,'href','src');
	//模板引擎
//	var data = {title: '模板加载',list: [{name: '循环1',city: '循环11'}, {name: '循环2',city: '循环22'}, {name: '循环3',city: '循环33'}, {name: '循环4',city: '循环44'}]};
//	$.laytplData('#div_data1',data);
//	//id=Mpage1的分页
//	PageFn('Mpage1');

	//导航菜单展示隐藏
	(function () {
		$('.sjts').click(function () {
			$(this).addClass('active').find('.sjts_c').slideDown();
		});
		$('.sjts').mouseleave(function () {
			$(this).find('.sjts_c').slideUp(function () {
				$('.sjts').removeClass('active');
			});
		});		
	})();
})

//信用评级3按钮点击切换
$('.btnBox .btn').click(function(){
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		$(this).addClass('active1').siblings().removeClass('active').removeClass('active1');
		return;
	}else if($(this).hasClass('active1')){
		$(this).removeClass('active1').addClass('active');
		return;
	}
	$(this).addClass('active').siblings().removeClass('active').removeClass('active1')
});
//a标签点击选择
$('.list1 .listMain a').click(function(e){
	e.preventDefault();
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		return;
	}
	$('.list1 .listMain a').removeClass('active');
	$(this).addClass('active');
});
$('.list2 .listMain a').click(function(e){
	e.preventDefault();
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		return;
	}
	$('.list2 .listMain a').removeClass('active');
	$(this).addClass('active');
});
$('.list3 .listMain a').click(function(e){
	e.preventDefault();
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		return;
	}
	$('.list3 .listMain a').removeClass('active');
	$(this).addClass('active');
});
//点击更多下拉菜单
$('.bottom .list1 .listMore .a1').click(function(e){
	e.preventDefault();
	$('.bottom .listMain1').toggle()
});
$('.bottom .list3 .listMore .a3').click(function(e){
	e.preventDefault();
	$('.bottom .listMain3').toggle()
});