/**
 * Created by Administrator on 2017/5/24.
 */

$(function () {

  //findHeadTab();

  /*公共底部固定tab栏切换 开始*/
  $('.main-foot').on('click','nav > a',function () {
    var _this = this;
    $(_this).addClass('active').siblings().removeClass('active');
    alert('已经切换tab');
  });
  /*公共底部固定tab栏切换 结束*/

});

function findHeadTab() {
  var $slide = $('.swiper-slide') || '';
  if(!$slide){
    return false;
  }

  var contentBox = '';
  $('#mainBox').empty();

  for(var i=0;i<$slide.length;i++){
    contentBox += '<div class="main-content-box"> 这是第'+i+'个页面</div>';
  }

  $('#mainBox').append(contentBox);

  //初始化第一个tab栏
  $slide.first().addClass('active');
  $('.main-content-box').first().show().siblings().hide();

  $slide.on('click',function (){
    var _this = this;
    var index = $(_this).index();

    $('.main-content-box').eq(index).show().siblings().hide();
  })

}


