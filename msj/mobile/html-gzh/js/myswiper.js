/**
 * Created by Administrator on 2017/4/21.
 */
/*
*@function 轮播图代码的封装
*@author wpx
*@time  2017/4/21
 */

//{
//    pagination: '.swiper-pagination',
//    slidesPerView: 'auto',
//    paginationClickable: true,
//    spaceBetween: 20
//}

//声明一个命名空间
var mySwiper = window.mySwiper || {};
var mySwiper= new function(){
    /*
     *@action 首页用到的第二张图片显示一半
     *@param  json    _setting 可选项 属性定制
     */
    this.showHalfImg=function(_setting){
        if(!_setting){
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                paginationClickable: true,
                spaceBetween: 20
            });
        }else{
            var swiper = new Swiper('.swiper-container', _setting);
        }

    }
    /*
     *@action 民宿详情页用到的轮播图类型(计数类型）
     *@param  json    _setting 可选项 属性定制
     */
    this.showCountNumImg=function(_setting){
        if(!_setting){
            var swiper = new Swiper('.swiper-container', {
                //nextButton: '.swiper-button-next',
                //prevButton: '.swiper-button-prev',
                pagination: '.swiper-pagination',
                paginationType: 'fraction'
            });
        }else{
            var swiper = new Swiper('.swiper-container', _setting);
        }

    }

}