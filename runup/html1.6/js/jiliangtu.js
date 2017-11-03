$(function () {
    $(document).on('click', '.wrap', function (e) {
        var $value = $(this).find('.Myselect-value');
        if ($value.text() === '固定值') {
            $('#shezhimubiao').siblings('.right2').hide().siblings('.right1').show();
        } else {
            $('#shezhimubiao').siblings('.right1').hide().siblings('.right2').show();
        }
    })
    $('#shezhimubiaozhi').click(function () {
        $('.she-zhi-mu-biao-zhi').show();
    })
    var myChart = echarts.init(document.getElementById('chart'));
    var option = option = {
        tooltip: {
            trigger: "axis"
        },
        title: {
            text: '计量图',
            left: 'center'
        },

        tooltip: {
            formatter: "{a} <br/>{b}   {c}%"
        },

        series: [
            {
                name: '业务指标',
                type: 'gauge',
                min: 0,
                max: 1920,
                splitNumber: 1,
                axisLine: {
                    lineStyle: {
                        color: [[0.8, "blue"], [1, "rgb(142, 12, 12)"]]
                    }
                },
                detail: {
                    formatter: '{value}%'
                },
                data: [{ value: 900 }],
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                pointer: {
                    length: "52%",
                    width: 18
                }


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


    $('.add-tiaojian').on('click', function () {
        $('.tiaojian-geshi-edit').show()
    })


})

