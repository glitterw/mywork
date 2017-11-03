$(function () {
	var searchBox = $(".header-search-box");
    // 顶部搜索框淡入淡出
    searchBox.on('click','.search-icon',function () {
        searchBox.toggleClass('open');
    });
	
    $(document).on('click',function(e){
    	if (searchBox.hasClass('open') && e.target.className !== 'search-icon' && e.target.tagName !== 'INPUT') {
    		searchBox.removeClass('open')
    	}
    })
	
});