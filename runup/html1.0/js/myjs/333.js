/**
 * Created by Administrator on 2017/3/10.
 */
// JavaScript Document
/*
 *@action ����Դ�����ʽ��
 *@author wpx
 *@time   2017/3/1
 */
$(function() {
    //�����ɲ�
    $("#data-select-worktable").show();
    $("#data-select-worktable").parents("body").addClass('mengceng');

    /*���̶���ͷ���� ��ʼ*/
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
    /*����ͷ�̶����� ����*/

    //ɾ����������
    $(document).on('click', '.upload-process .del', function() {
        $('.upload-process').fadeOut();
        $('.add-box').fadeIn();
    });
    //�ϴ�������
    $(document).on('click', '.add-file .upload', function() {
        $('.add-box').fadeOut();
        $('.upload-process').fadeIn();
    });


    /*�༭ͼ������� ��ʼ*/
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
    /*�༭ͼ�� ����� ����*/
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
