 function delgroup() {
        layer.open({
            title: '提示',
            type: 1,
            shift: 2,
            tipsMore: true,
            area: '440px',
            shadeClose: true, //开启遮罩关闭
            content: '<div class="Mlayer_4_box text_c"><span class="M4queding"></span><span class="qdscxm">你确定要取消分组</span> </div>',
            btn: ['确定', '取消'], //按钮
            success: function(layero, index) {
                console.log('弹窗加载完');
            },
            btn1: function(index, layero) {
                layer.close(index); //手动关闭弹窗
                console.log('按钮一的回调');
            },
            btn2: function(index, layero) {
                console.log('按钮二的回调');
            }
        });
    }
    $(function() {
        // 2017-08-15
        $('.filter-group').on('click', '.filter-item', function(e) {
            $(this).toggleClass('active');
        });
        // 筛选字段弹出层
        $('.filter-group').on('click', '.filter-item .icon-edit-blue2', function(e) {
            var layerhtml1='<div class="selectde"><p class="selectde-p">筛选字段</p><div class="selectdm"><div class="Mselect selectdeo"><p class="Mchecked"><i>请选择</i></p><input type="hidden" name="hidden11" id="hidden11" value="" /><div class="MoptionBox MScroll selectdemo"><span class="Moption" value="01">等于</span><span class="Moption" value="02">不等于</span><span class="Moption" value="03">大于</span><span class="Moption" value="04">小于</span><span class="Moption" value="05">大于等于</span><span class="Moption" value="06">小于等于</span><span class="Moption" value="07">区间</span></div></div><input type="text" placeholder="请输入条件"/><span>至</span><input type="text" placeholder="请输入条件"/></div></div>';
            layer.open({
                title: '筛选字段',
                type: 1,
                shift: 2,
                tipsMore: true,
                area: '520px',
                shadeClose: true, //开启遮罩关闭
                content: layerhtml1,
                btn: ['确定', '取消'], //按钮
                success: function(layero, index) {
                    console.log('弹窗加载完');
                    $('.layui-layer .selectdemo').mCustomScrollbar({
                        scrollButtons: {
                            enable: false,
                            scrollType: "continuous",
                            scrollSpeed: 20,
                            scrollAmount: 40
                        },
                        horizontalScroll: false,
                    });
                   $('input.datepicker').Zebra_DatePicker({
                        default_position: 'below',
                        offset: [-170, 32]
                   }); 
                },
                btn1: function(index, layero) {
                    layer.close(index); //手动关闭弹窗
                    console.log('按钮一的回调');
                },
                btn2: function(index, layero) {
                    console.log('按钮二的回调');
                }
            });
            // 阻止冒泡
            e.stopPropagation();
               // ev.preventDefault();
        //ev.stopPropagation()
        })
        $('.filter-group').on('click', '.filter-item .icon-edit-blue1', function(e) {
            var layerhtml2='<div class="selectde"><p class="selectde-p">发送日期</p><div class="selecttime"><input placeholder="选择开始时间" zebra-datepicker class="input datepicker" ><span style="margin: 0 25px;">至</span><input placeholder="选择结束时间" zebra-datepicker class="input datepicker" ></div></div>';
            layer.open({
                title: '筛选字段',
                type: 1,
                shift: 2,
                tipsMore: true,
                area: '520px',
                shadeClose: true, //开启遮罩关闭
                content: layerhtml2,
                btn: ['确定', '取消'], //按钮
                success: function(layero, index) {
                    console.log('弹窗加载完');
                    $('.layui-layer .selectdemo').mCustomScrollbar({
                        scrollButtons: {
                            enable: false,
                            scrollType: "continuous",
                            scrollSpeed: 20,
                            scrollAmount: 40
                        },
                        horizontalScroll: false,
                    });
                   $('input.datepicker').Zebra_DatePicker({
                        default_position: 'below',
                        offset: [-170, 32]
                   }); 
                },
                btn1: function(index, layero) {
                    layer.close(index); //手动关闭弹窗
                    console.log('按钮一的回调');
                },
                btn2: function(index, layero) {
                    console.log('按钮二的回调');
                }
            });
            // 阻止冒泡
            e.stopPropagation();
        })
        // 分组图表统计左侧切换
        $('.contentmenu-list-item').click(function() {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        });
        //仪表盘设置弹出层
        $('.ybpsz').click(function() {
            layer.open({
                title: '仪表盘设置',
                type: 1,
                shift: 2,
                tipsMore: true,
                area: '600px',
                shadeClose: true, //开启遮罩关闭
                content: $('.layer-ybpsz').html(),
                btn: ['确定', '取消'], //按钮
                success: function(layero, index) {
                    console.log('弹窗加载完');
                    $('.layui-layer .sz-group-list-body').addClass('MScroll');
                    $('.layui-layer .sz-group-list-body').mCustomScrollbar({
                        scrollButtons: {
                            enable: false,
                            scrollType: "continuous",
                            scrollSpeed: 20,
                            scrollAmount: 40
                        },
                        horizontalScroll: false,
                    });
                    $('.layui-layer .sz-group-list').addClass('MScroll');
                    $('.layui-layer .sz-group-list').mCustomScrollbar({
                        scrollButtons: {
                            enable: false,
                            scrollType: "continuous",
                            scrollSpeed: 20,
                            scrollAmount: 40
                        },
                        horizontalScroll: false,
                    });
                    

                    $('.add-group1').click(function() {
                        layer.open({
                            title: '添加分组',
                            type: 1,
                            shift: 2,
                            tipsMore: true,
                            area: '440px',
                            shadeClose: true, //开启遮罩关闭
                            content: $('.layer-add-group').html(),
                            btn: ['确定', '取消'], //按钮
                            success: function(layero, index) {
                                console.log('弹窗加载完');
                                $('.layui-layer .layer-add-group-check').addClass('MScroll');
                                $('.layui-layer .layer-add-group-check').mCustomScrollbar({
                                    scrollButtons: {
                                        enable: false,
                                        scrollType: "continuous",
                                        scrollSpeed: 20,
                                        scrollAmount: 40
                                    },
                                    horizontalScroll: false,
                                });
                            },
                            btn1: function(index, layero) {
                                layer.close(index); //手动关闭弹窗
                                console.log('按钮一的回调');
                            },
                            btn2: function(index, layero) {
                                console.log('按钮二的回调');
                            }
                        });
                    });
                    $('.add-group2').click(function() {
                        layer.open({
                            title: '添加筛选',
                            type: 1,
                            shift: 2,
                            tipsMore: true,
                            area: '440px',
                            shadeClose: true, //开启遮罩关闭
                            content: $('.layer-add-filter').html(),
                            btn: ['确定', '取消'], //按钮
                            success: function(layero, index) {
                                console.log('弹窗加载完');
                                $('.layui-layer .layer-add-filter-tb').addClass('MScroll');
                                $('.layui-layer .layer-add-filter-tb').mCustomScrollbar({
                                    scrollButtons: {
                                        enable: false,
                                        scrollType: "continuous",
                                        scrollSpeed: 20,
                                        scrollAmount: 40
                                    },
                                    horizontalScroll: false,
                                });
                                $('.layui-layer .layer-add-filter-zd').addClass('MScroll');
                                $('.layui-layer .layer-add-filter-zd').mCustomScrollbar({
                                    scrollButtons: {
                                        enable: false,
                                        scrollType: "continuous",
                                        scrollSpeed: 20,
                                        scrollAmount: 40
                                    },
                                    horizontalScroll: false,
                                });
                            },
                            btn1: function(index, layero) {
                                layer.close(index); //手动关闭弹窗
                                console.log('按钮一的回调');
                            },
                            btn2: function(index, layero) {
                                console.log('按钮二的回调');
                            }
                        });
                    });
                },
                btn1: function(index, layero) {
                    layer.close(index); //手动关闭弹窗
                    console.log('按钮一的回调');
                },
                btn2: function(index, layero) {
                    console.log('按钮二的回调');
                }
            });
        });
    });