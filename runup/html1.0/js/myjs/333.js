/**
 * Created by Administrator on 2017/3/10.
 */
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

    /*表格固定表头处理 开始*/
    if(document.getElementById('table-mb')) {

        var obj = $('.excel-table .thead');
        obj.after(obj.clone());
        var biaotiC = $('.excel-table .thead').eq(0).find('td');
        var biaotiA = $('.excel-table .thead').eq(1).find('td');
        biaotiA.each(function(i) {
            $(this).width(biaotiC.eq(i).width() + 1);
            $(this).css({
                'border-left': '1px solid #ffffff',
                'border-right': '1px solid #ffffff'
            });
        });

        $(window).resize(function() {
            biaotiA.each(function(i) {
                $(this).width(biaotiC.eq(i).width() + 1);
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
    /*表格表头固定处理 结束*/

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


    /*编辑图表，表格处理 开始*/
    if(document.getElementById('table')) {
        var obj = $('.table-tb .thead');
        obj.after(obj.clone());

        //var biaotiC = $('.table-tb .thead').eq(0).find('td');
        //var biaotiA = $('.table-tb .thead').eq(1).find('td');
        //biaotiA.each(function(i) {
        //	$(this).width(biaotiC.eq(i).width() + 1);
        //	$(this).css({
        //		'border-left': '1px solid #ffffff',
        //		'border-right': '1px solid #ffffff'
        //	});
        //});
        //$(window).resize(function() {
        //	biaotiA.each(function(i) {
        //		$(this).width(biaotiC.eq(i).width() + 1);
        //		$(this).css({
        //			'border-left': '1px solid #ffffff',
        //			'border-right': '1px solid #ffffff'
        //		});
        //	});
        //});
        //
        //var thead = $('.table-tb .thead').eq(1);
        //thead.css({
        //	'position': 'absolute',
        //	'top': 0,
        //	'margin-left': '-1px',
        //	'height': '46px'
        //});
    }
    /*编辑图表 表格处理 结束*/
});

function fixedTableHeader(thisobj,headObj){

    headObj.after(headObj.clone());
    var biaotiC = headObj.eq(0).find('td');
    var biaotiA = headObj.eq(1).find('td');
    biaotiA.each(function(i) {
        thisobj.width(biaotiC.eq(i).width() + 1);
        thisobj.css({
            'border-left': '1px solid #ffffff',
            'border-right': '1px solid #ffffff'
        });
    });

    $(window).resize(function() {
        biaotiA.each(function(i) {
            thisobj.width(biaotiC.eq(i).width() + 1);
            thisobj.css({
                'border-left': '1px solid #ffffff',
                'border-right': '1px solid #ffffff'
            });
        });
    });

    var thead = headObj.eq(1);
    thead.css({
        'position': 'absolute',
        'top': 0,
        'margin-left': '-1px',
        'height': '46px'
    });
}
