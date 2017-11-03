// JavaScript Document
/*
 *@action 数据源相关样式表
 *@author wpx
 *@time   2017/3/1
 */
$(function() {
	//弹窗蒙层
	$("#data-select-worktable").show();
	$("#data-select-worktable").parents("body").addClass('mengceng');

    //数据源设置
	$(document).on('click', '.data-list .action-button.set-layout', function() {
		$("#data-set-layout-1").show();
		$('body').addClass('mengceng');
	});
	//数据源删除
	$(document).on('click', '.data-list .action-button.del-layout', function() {
		$("#del-db").show();
		$('body').addClass('mengceng');
	});
	/*数据源表头固定处理 开始*/
	if(document.getElementById('table-mb')) {
		var obj = $('.excel-table .thead');
		obj.after(obj.clone());
		var biaotiC = $('.excel-table .thead').eq(0).find('td');
		var biaotiA = $('.excel-table .thead').eq(1).find('td');
		//$('.excel-table .thead').eq(1).addClass('fixed_top');
		biaotiA.each(function(i) {
			//$(this).width(biaotiC.eq(i).width() + 1);
			$(this).width(biaotiC.eq(i).width());
			$(this).css({
				'border-left': '1px solid #ffffff',
				'border-right': '1px solid #ffffff'
			});
		});

		$(window).resize(function() {
			biaotiA.each(function(i) {
				//$(this).width(biaotiC.eq(i).width() + 1);
				$(this).width(biaotiC.eq(i).width());
				$(this).css({
					'border-left': '1px solid #ffffff',
					'border-right': '1px solid #ffffff'
				});
			});
		});

		var thead = $('.excel-table .thead').eq(1);
		thead.css({
			'position': 'absolute',
			'top': 0,
			'margin-left': '-1px',
			'height': '46px'
		});
	}
	/*数据源表头固定处理 结束*/

	//删除弹窗淡出
	$(document).on('click', '.upload-process .del', function() {
		$('.upload-process').fadeOut();
		$('.add-box').fadeIn();
	});
	//上传进度条
	$(document).on('click', '.add-file .upload', function() {
		$('.add-box').fadeOut();
		$('.upload-process').fadeIn();
	});
    /*模板替换 下拉菜单处理 开始*/
    $(document).on('click', '.field-box .action', function() {
		if(!$(this).hasClass('show')){//展开操作，收起其他的展开
			$('.field-box .action.show').removeClass('show');
		}
		$(this).toggleClass('show');
    });
    $(document).on('click', '.field-box .select-list>ul>li', function() {
        var selectHtml=$(this).html();
        $(this).parent().parent().parent().children(".field").prop('outerHTML',function(index, val){
            return selectHtml;
        });
    });
    /*模板替换 下拉菜单处理 结束*/

//	数据源首页-设置tab切换
	$(document).on('click', '.data-layout-content .left-item>li', function() {
		$('.data-layout-content .left-item>li.active').removeClass('active');
		$(this).addClass(function(index,oldclass){
			var className=$(this).attr('class');
			if(className.match('li1')!=null){
				$('.setting.show').removeClass('show');
				$('.setting.set1').addClass('show');
			}else if(className.match('li2')!=null){
				$('.setting.show').removeClass('show');
				$('.setting.set2').addClass('show');
			}else if(className.match('li3')!=null){
				$('.setting.show').removeClass('show');
				$('.setting.set3').addClass('show');
			}
			return 'active';
		});
	});
//复选框全选
	$(document).on('click', '.allSelected',function(){
			var checkboxName=$(this).prop("name");
			$("input[name='"+checkboxName+"'").prop("checked",$(this).prop("checked"));
	})

});


function fixedTableHeader(domName) {
	$(domName).after($(domName).clone());
	var biaotiC = $(domName).eq(0).find('td');
	var biaotiA = $(domName).eq(1).find('td');
	biaotiA.each(function(i) {
		$(this).width(biaotiC.eq(i).width());
	});

	$(window).resize(function() {
		biaotiA.each(function(i) {
			$(this).width(biaotiC.eq(i).width());

		});
	});

	var thead = $(domName).eq(1);
	thead.css({
		'position': 'absolute',
		'top': 0,
		'margin-left': '0px',
		'height': '46px'
	});
}