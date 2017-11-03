/*该js 依赖jquery 和  laypage.js  分页工具*/
$(function(){
	$.fn.layerPage = function(fn){
		var MPage = $(this);
		var thisPages = MPage.attr('data-pages');
		var thisCurr = MPage.attr('data-curr');
		laypage({
			  cont: MPage,
			  pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			  skip: false, //是否开启跳页
			  last: thisPages,//用于控制尾页
			  prev:'上一页',//隐藏上一页按钮
			  next:'下一页',//隐藏下一页按钮
			  groups: 5, //连续显示分页数
			  curr: function(){
			  	//通过url获取当前页，也可以同上（pages）方式获取
			    var page = thisCurr || 1;
			    return page ? page[1] : 1;
			  }(), 
			  jump: function(e, first){ //触发分页后的回调
			    if(!first){ //一定要加此判断，否则初始时会无限刷新
			      //location.href = '?page='+e.curr;
			      MPage.attr('data-curr',e.curr);	
			      fn(e);
			    }
			    
			  }
		});	
		
		MPage.find(".laypage_skip").attr({'max':thisPages,'type':'text'});
		//keyup
		MPage.find(".laypage_skip").on('keyup',function () {
			if(parseFloat(this.value)>parseFloat(this.max) || parseFloat(this.value)<parseFloat(this.min)){
				layer.tips(
					'输入页码不存在', 
					this,
					{tips: [1, '#0981e6'],time: 1000}
				);
				this.value=this.min;
			}
		});
	}
	
	$.fn.checkInput = function(){
		var MPage = $(this);
		var thisPages = MPage.attr('data-pages');
		var thisCurr = MPage.attr('data-curr');
		MPage.find(".laypage_skip").attr({'max':thisPages,'type':'text'});
		//keyup
		MPage.find(".laypage_skip").on('keyup',function () {
			if(parseFloat(this.value)>parseFloat(this.max) || parseFloat(this.value)<parseFloat(this.min)){
				layer.tips(
					'输入页码不存在', 
					this,
					{tips: [1, '#0981e6'],time: 1000}
				);
				this.value=this.min;
			}
		});
	}
	
	$.fn.PageInit = function(t_pages,t_curr){
		var MPage = $(this);
		MPage.attr('data-pages',null==t_pages?0:t_pages);
		MPage.attr('data-curr',!t_curr?1:t_curr);
	}
});