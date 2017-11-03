$(function() {
    var dragPageX = 0,
        dragPageY = 0;
    //dragtype 拖拽img类型
    var dragtype, dragdom = false;
    //在目标元素中连续拖拽

    $('.target').on('dragover', function(ev) {
        //屏蔽系统事件
        ev.preventDefault();
    });
    //拖拽元素拖拽前触发
    $('.drag').on('dragstart', function(ev) {
        dragPageX = ev.originalEvent.offsetX;
        dragPageY = ev.originalEvent.offsetY;
        dragtype = 'yp';
        if ($(this).parent().is('.sc-tp-group-item1')) {
            dragdom = true;
        }
    });
    //拖拽元素拖拽前触发
    $('.sc-icon-group i').on('dragstart', function(ev) {
        dragPageX = ev.originalEvent.offsetX;
        dragPageY = ev.originalEvent.offsetY;
        ev.originalEvent.dataTransfer.setData("Text", ev.target.getAttribute('data-class'));
        dragtype = 'icon';
        if ($(this).parent().is('.sc-icon-group-icon')) {
            dragdom = true;
        }

    });
    //在目标元素上释放
    // $('.section_0_box').delegate('.target','drop', function(ev) {
    $('.target').on('drop', function(ev) {
        ev.preventDefault();
        ev.stopPropagation()
        var data = ev.originalEvent.dataTransfer.getData("Text");
        console.log(data);
        var oDrag = document.getElementById(data);

        if (dragdom) {
            dragdom = false;
            ev.target.setAttribute('dragenter', 'true');
            if (dragtype == 'icon') {
                var $dragdiv = $('<div class="drag-div drag-div-icon"><div class="drag-img ' + data + '"></div><i class="drag-mengcen vertical">双击编辑</i><i class="drag-scale"></i><div class="tp-edit-group"><div class="tp-edit-group-list1"><a href="javascript:;" class="fc"><i>分层</i><div class="tp-edit-group-list2"><div class="tp-edit-group-list2bj"><span href="javascript:;" class="active">置于顶层</span> <span href="javascript:;">置于底层</span> <span href="javascript:;">上移一层</span> <span href="javascript:;">下移一层</span></div></div></a> <a href="javascript:;" class="sf"><i>缩放</i></a> <a href="javascript:;" class="del"><i>删除</i></a></div></div></div>').appendTo('.target ul');
            } else {
                var $dragdiv = $('<div class="drag-div"><img class="drag-img" src="' + data + '"/><i class="drag-mengcen vertical">双击编辑</i><i class="drag-scale"></i><div class="tp-edit-group"><div class="tp-edit-group-list1"><a href="javascript:;" class="fc"><i>分层</i><div class="tp-edit-group-list2"><div class="tp-edit-group-list2bj"><span href="javascript:;" class="active">置于顶层</span> <span href="javascript:;">置于底层</span> <span href="javascript:;">上移一层</span> <span href="javascript:;">下移一层</span></div></div></a> <a href="javascript:;" class="sf"><i>缩放</i></a> <a href="javascript:;" class="del"><i>删除</i></a></div></div></div>').appendTo('.target ul');
            }
            $dragdiv.css({
                'left': ev.originalEvent.pageX - $('.target').offset().left - dragPageX,
                'top': ev.originalEvent.pageY - $('.target').offset().top - dragPageY
            });

            // 显示分层
            $dragdiv.find('.tp-edit-group-list1 a.fc').click(function() {
                $dragdiv.find('.tp-edit-group-list2').css('display', 'block');
            });
            $dragdiv.find('.tp-edit-group-list1 a.fc').mouseleave(function() {
                $dragdiv.find('.tp-edit-group-list2').css('display', 'none');
            });
            $dragdiv.mouseleave(function() {
                $dragdiv.find('.drag-scale').css('display', 'none');
            });
            // 点击分层
            $dragdiv.find('.tp-edit-group-list2 span').click(function() {
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                var mylist = new Array()
                if ($dragdiv.siblings('.drag-div').length > 0) {
                    for (var i = 0; i <= $dragdiv.siblings('.drag-div').length; i++) {
                        mylist[i] = $($dragdiv.parent().children('.drag-div')[i]).css('z-index');
                    }
                }
                var maxzindex = Math.max.apply(null, mylist);
                var minzindex = Math.min.apply(null, mylist);
                switch ($(this).index()) {
                    case 0:
                        $dragdiv.css('z-index', maxzindex + 1)
                        break;
                    case 1:
                        if ($dragdiv.siblings('.drag-div').length > 0) {
                            for (var i = 0; i < $dragdiv.siblings('.drag-div').length; i++) {
                                $($dragdiv.siblings('.drag-div')[i]).css('z-index', parseInt($dragdiv.css('z-index')) + 1);
                            }
                        }
                        break;
                    case 2:
                        var selfzindex = parseInt($dragdiv.css('z-index'));
                        $dragdiv.css('z-index', selfzindex + 1);
                        break;
                    case 3:
                        var selfzindex = parseInt($dragdiv.css('z-index'));
                        if (selfzindex > 10) {
                            $dragdiv.css('z-index', selfzindex - 1);
                        }
                        break;
                    default:

                }
            });

            // 显示拖拽
            $dragdiv.find('.tp-edit-group-list1 a.sf').click(function() {
                $dragdiv.find('.drag-scale').css("display", "block");
            });
            $dragdiv.find('.tp-edit-group-list1 a.del').click(function() {
                $dragdiv.remove();
            });
            if (dragtype == 'icon') {
                $dragdiv.css({
                    'height': 100,
                    'width': 100
                });
                $dragdiv.find('.drag-img').css('font-size', 100);
            } else {
                $dragdiv.css({
                    'height': $dragdiv.find('.drag-img').get(0).naturalHeight,
                    'width': $dragdiv.find('.drag-img').get(0).naturalWidth
                });
            };
            $dragdiv.find('.drag-mengcen').move(function() {
                console.log(parseInt($dragdiv.css('left')));
                $dragdiv.css({
                    'left': '+=' + this.pageXc,
                    'top': '+=' + this.pageYc

                });
            });
            $dragdiv.find('.drag-scale').move(function() {
                if ($dragdiv.is('.drag-div-icon')) {
                    $dragdiv.css({
                        'width': '+=' + this.pageXc,
                        'height': '+=' + this.pageXc
                    });
                    $dragdiv.find('.drag-img').css('font-size', '+=' + this.pageXc);
                } else {
                    $dragdiv.css({
                        'width': '+=' + this.pageXc,
                        'height': '+=' + this.pageYc
                    });
                }
            });
        };
        // var ev=ev||event;ev.preventDefault();window.event.returnValue=false; return false;
    });
    // star
    $('.target').delegate('.tp-edit-group-list1 a.del','click',function() {
        $(this).parent().parent().parent().remove();
    });
    //$('.target').delegate('.tp-edit-group-list1 a.sf','click',function() {

    $('.drag-div').find('.tp-edit-group-list1 a.sf').click(function() {
           
        $(this).parent().parent().parent().find('.drag-scale').css("display", "block");

   });
            $('.drag-scale').move(function() {
                if ($(this).parent().is('.drag-div-icon')) {
                    $(this).parent().css({
                        'width': '+=' + this.pageXc,
                        'height': '+=' + this.pageXc
                    });
                    $(this).parent().find('.drag-img').css('font-size', '+=' + this.pageXc);
                } else {
                    $(this).parent().css({
                        'width': '+=' + this.pageXc,
                        'height': '+=' + this.pageYc
                    });
                }   
        });


    // 
    //$('.target').delegate('.drag-mengcen','move',function() {
    $('.drag-div').find('.drag-mengcen').move(function() {
        $(this).parent().css({
            'left': '+=' + this.pageXc,
            'top': '+=' + this.pageYc

        });
    });
    //
    //$('.target').delegate('.tp-edit-group-list1 a.fc','click',function() {
    $('.tp-edit-group-list1 a.fc').click(function() {
        $(this).find('.tp-edit-group-list2').css('display', 'block');
    });

    //$('.target').delegate('.tp-edit-group-list1 a.fc','mouseleave',function() {
    $('.tp-edit-group-list1 a.fc').mouseleave(function() {
        $(this).find('.tp-edit-group-list2').css('display', 'none');
    });
     //$('.target').delegate('.drag-div','mouseleave',function() {
    $('.drag-div').mouseleave(function() {
        $(this).find('.drag-scale').css('display', 'none');
    });
    //$('.target').delegate('.tp-edit-group-list2 span','click',function() {
    $('.tp-edit-group-list2 span').click(function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var mylist = new Array()
        if ($(this).parents('.drag-div').siblings('.drag-div').length > 0) {
            for (var i = 0; i <= $(this).parents('.drag-div').siblings('.drag-div').length; i++) {
                mylist[i] = $($(this).parents('.drag-div').parent().children('.drag-div')[i]).css('z-index');
            }
        }
        var maxzindex = Math.max.apply(null, mylist);
        var minzindex = Math.min.apply(null, mylist);
        switch ($(this).index()) {
            case 0:
                $(this).parents('.drag-div').css('z-index', maxzindex + 1)
                break;
            case 1:
                if ($(this).parents('.drag-div').siblings('.drag-div').length > 0) {
                    for (var i = 0; i < $(this).parents('.drag-div').siblings('.drag-div').length; i++) {
                        $($(this).parents('.drag-div').siblings('.drag-div')[i]).css('z-index', parseInt($(this).parents('.drag-div').css('z-index')) + 1);
                    }
                }
                break;
            case 2:
                var selfzindex = parseInt($(this).parents('.drag-div').css('z-index'));
                $(this).parents('.drag-div').css('z-index', selfzindex + 1);
                break;
            case 3:
                var selfzindex = parseInt($(this).parents('.drag-div').css('z-index'));
                if (selfzindex > 10) {
                    $(this).parents('.drag-div').css('z-index', selfzindex - 1);
                }
                break;
            default:

        }
    });
   //end 
    $(document).on('change', '.Mcolor input', function() {
        $('#colorD').css('background', $(this).val());
        $('.color-input').val(RGBToHex($(this).val()));
    });
    //操作tab切换
    $('.sz-tpstyle a').click(function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.xq-chop-a' + ($(this).index() + 1)).css("display", "block")
        $('.xq-chop-a' + ($(this).index() + 1)).siblings().css("display", "none")
    });
    // 双击图片进入编辑状态
    var doubleclick_this;
    $(document).on('dblclick', '.drag-div', function() {
        // console.log($(this));
        //判断图片类型
        if ($(this).attr('class').indexOf('icon') < 0) {
            $('.chop-a3').css('display', 'none');
        } else {
            $('.chop-a3').css('display', 'inline-block');
        }
        doubleclick_this = $(this);
        $('.sz-tpstyle').css("display", "block");
        $('.sz-tpstyle-xq .xq-chop-a').css('display', "none");
        $('input.number').val("");
        $('.sz-tpstyle a').removeClass('active');

    })
    //透明
    $('input.range').change(function() {
        var leftwidth = ($(this).val() - 10) / 90 * 172;
        $('.range-div-left').css('width', leftwidth);
        var opacity = $(this).val() / 100;
        doubleclick_this.find('.drag-img').css('opacity', opacity);
    });
    //旋转
    $('input.number').change(function() {
        var transform = $('input.number').val();
        doubleclick_this.find('.drag-img').css('transform', 'rotate(' + transform + 'deg)');
        // doubleclick_this.find('.drag-mengcen').css('transform', 'rotate(' + transform + 'deg)');

    });
    $('.transform-btn').click(function() {
        var transform = $('input.number').val();
        doubleclick_this.find('.drag-img').css('transform', 'rotate(' + transform + 'deg)');
        // doubleclick_this.find('.drag-mengcen').css('transform', 'rotate(' + transform + 'deg)');
        $('.xq-chop-a').css("display", "none")
    });
    //改变颜色
    $('.Mcolor input').change(function() {
        var color = $('.Mcolor input').val();
        doubleclick_this.find('.drag-img').css('color', color);
    });
    $('.color-btn1').click(function() {
        //确定
        var color = $('input.color-input').val();
        doubleclick_this.find('.drag-img').css('color', '#' + color);
        $('.xq-chop-a').css("display", "none");
    });
    $('.color-btn2').click(function() {
        //取消
        doubleclick_this.find('.drag-img').css('color', '#cdcdcd');
        $('.xq-chop-a').css("display", "none");
    });
    //恢复默认设置
    $('.sz-tpstyle a.chop-a4').click(function() {
        $('.sz-tpstyle-xq .xq-chop-a').css('display', "none");
        doubleclick_this.find('.drag-img').css('transform', 'rotate(0deg)');
        doubleclick_this.find('.drag-mengcen').css('transform', 'rotate(0deg)');
        doubleclick_this.find('.drag-img').css('opacity', 1);
        doubleclick_this.find('.drag-img').css('color', '#cdcdcd');
    });
    //
    $(window).click(function(event) {
        if ($(event.target).parents('.sz-tpstyle,.sz-tpstyle-xq,.drag-div').length == 0) {
            $('.sz-tpstyle-xq .xq-chop-a').css('display', "none");
            $('.sz-tpstyle').css('display', "none");
        }
    });
});
// rgb转16位色值
function RGBToHex(rgb) {
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp); //利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = "";
    var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < re.length; i++) {
        var r = null,
            c = re[i],
            l = c;
        var hexAr = [];
        while (c > 16) {
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        }
        hexAr.push(hex[c]);
        if (l < 16 && l != "") {
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('');
    }
    return hexColor;
}