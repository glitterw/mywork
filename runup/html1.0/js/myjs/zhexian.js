$(function () {

    //初始化图表配置
    // var option = {
    //     title: {
    //         text: '建国以来我国人口增长趋势(截止2014)',//代替总计
    //         subtext: '150k',//总计
    //         left: 'center',
    //         top: 10
    //     },

    //     tooltip: {},
    //     // grid: [{
    //     //     left: 50,
    //     //     right: 50,
    //     //     height: '35%'
    //     // }, {
    //     //     left: 50,
    //     //     right: 50,
    //     //     top: '55%',
    //     //     height: '10%'
    //     // }],
    //     legend: {
    //         data: ["邮件营销", "联盟广告","视频广告","直接访问",'搜索引擎']
    //     },
    //     xAxis: [
    //         {
    //             // type: 'category',

    //             data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    //         },
    //         // {
    //         //     gridIndex: 1,
    //         //     type: 'category',
    //         //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //         // }
    //     ],
    //     yAxis: [
    //         {
    //             name: '',//坐标轴的标题和单位
    //             // type: 'value'

    //         }
    //         // ,
    //         // {
    //         //     gridIndex: 1,
    //         //     name: 'bbbbbb'
    //         // }
    //     ],
    //     // dataZoom: [
    //     //     {
    //     //         type: 'slider',//缩略轴
    //     //         show: true,
    //     //         start: 10,
    //     //         end: 100,
    //     //         handleSize: 10
    //     //     }
    //     // ],
    //     series: [{
    //         // name: '销量1',
    //         markLine: {
    //             data: [
    //                 {
    //                     name: 'Y轴值为25的水平线',
    //                     yAxis: 25
    //                 }
    //             ]

    //         },

    //         type: 'line',
    //         smooth: false,//线性是曲线还是直线          
    //         data: [5, 20, 36, 10, 10, 20],//改变数据显示维度
    //         label: {
    //             normal: {
    //                 show: false//显示图表标签
    //             }

    //         }


    //     }
    //         // ,
    //         // {
    //         //     name: '销量2',
    //         //     markLine: {
    //         //         data: [
    //         //             {
    //         //                 name: 'Y 轴值为 20 的水平线',
    //         //                 yAxis: 20
    //         //             }
    //         //         ]

    //         //     },
    //         //     xAxisIndex: 1,
    //         //     yAxisIndex: 1,

    //         //     type: 'line',
    //         //     smooth: true,//线性是曲线还是直线          
    //         //     data: [5, 20, 36, 10, 10, 20],//改变数据显示维度
    //         //     label: {
    //         //         normal: {
    //         //             show: true//显示图表标签
    //         //         }

    //         //     }


    //         // }
    //     ]
    // };
    // 使用刚指定的配置项和数据显示图表。

    var myChart = echarts.init(document.getElementById('chart'));
    var option = {

        tooltip: {
            trigger: "axis",
            
        },
        title: {
            text: '我的标题',

            left: 'center'

        },
        grid: {
            top: 90

        },

        legend: {
            top: 45,
            left: 'right',
            width: '50%',
            data: [
                {
                    name: "邮件营销"
                }
            ]//legend.data
        },
        xAxis: [
            {
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
        ],
        yAxis: [
            {
                type: "value"
            }
        ],

        series: [
            {
                name: "邮件营销",
                type: "line",
                // markLine: {
                //     data: [
                //         {
                //             name: 'Y 轴值为 50 的水平线',
                //             yAxis: 80
                //         }
                //     ]

                // },
                data: [100, 150, 100, 150, 100, 150, 200],
                // lineStyle: {
                //     normal: {
                //         color: '#008b8b'
                //     }
                // }
                // ,
                // itemStyle: {
                //     normal: {
                //         borderColor: '#008b8b'
                //     }
                // }
            }


        ],
        color: [
            '#5c82dd',
            '#a5ca73',
            '#61af82',
            '#f0cc62',
            '#ea9257',
            '#e15e58',
            '#c06ad0',
            '#8159cd',
            '#5258b2',
            '#6bb3ec',
            '#84d2d9',
            '#c33e6b'
        ]
    };
    myChart.setOption(option);
    //给配置项注册事件
    /**
     * 图表样式，曲线或者直线----------------------------------
     */
    $('.Myradio[data-name=smooth]').on('click', function () {
        /**
         * false代表默认的直线
         * true代表光滑的曲线
         */
        $('.Myradio[data-name=smooth]').removeClass('active');
        var smooth = $(this).addClass('active').data('value');
        myChart.setOption({
            series: [{
                smooth: smooth
            }]
        });
    })
    /**
    * 图表标签------------------------------------------
    */

    $('.baioqian').on('click', function () {
        /**
         * false代表默认的直线
         * true代表光滑的曲线
         */
        var show = $(this).toggleClass('active').hasClass('active');

        myChart.setOption({
            series: [{
                label: {
                    normal: {
                        show: show
                    }

                }
            }]
        });
    })
    /**
    *坐标轴标题------------------------------------------
    */
    $('#biaoti,#danwei').on('change', function () {
        var name = $('#biaoti').val() + '（' + $('#danwei').val() + '）';
        myChart.setOption({
            yAxis: {
                name: name
            }
        });
    })

    /**
     * 是否显示缩略轴
     */
    $('.suoluezhou').on('click', function () {
        var show = $(this).toggleClass('active').hasClass('active');
        show ? myChart.setOption({
            dataZoom: [
                {
                    type: 'slider',//缩略轴
                    show: true,
                    start: 10,
                    end: 100,
                    handleSize: 10
                }
            ]
        }) : myChart.setOption({
            dataZoom: {
                show: false
            }
        })
    })
    /**
     * 主次
     */
    $('.zhuci').on('click', function () {
        $(this).toggleClass('active').hasClass('active');

    })
    /**
     * 自动
     */
    $('.zidong').on('click', function () {

        $(this).toggleClass('active').hasClass('active');

    })
})




