/**
 * Created by Administrator on 2017/4/21.
 */
/*
 *@function 下拉选择框
 *@author wpx
 *@time  2017/4/21
 */
//声明一个命名空间
var mySelect = window.mySelect || {};
var mySelect= new function(){
  /*选择选项，赋值给被改变元素
  *@param  jq对象 _$thisobj 选中的元素对象
  * @param jq对象 _$changeObj 被改变的元素对象
  */
  this.selectedOption=function(_$thisobj,_$changeObj){
      //获取当前元素的text值
      var text=_$thisobj.html() ;
      _$changeObj.text(text);
      _$thisobj.parent().fadeOut(); //当前选择菜单收起
      _$changeObj.parent().removeClass("on");
      $("body").removeClass("mengceng");
  }

  this.selectedOptionShow=function(_$thisClickObj,_$showObj){
      _$thisClickObj.addClass(function(){
          return 'on';
      });

  }


}

