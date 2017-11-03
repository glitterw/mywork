$(function () {
    var myChart = echarts.init(document.getElementById('chart'));
    var option = {
        tooltip: {
            trigger: "item",
            formatter: "{b} : {c} ({d}%)"
        },
        title: [{
            text: '我的标题',
            left: 'center'
        }],
     
        legend: {
            top: 45,
            left: 'right',
            width: '50%',
            data: [
                '直接访问',
                '邮件营销',
                '联盟广告',
                '视频广告',
                '搜索引擎'
            ]
        },
        series: [
            {
                type: "pie",
                radius: ['0%', '70%'],
                data: [
                    {
                        name: '直接访问',
                        value: 310
                    }, {
                        name: '邮件营销',
                        value: 310
                    }, {
                        name: '联盟广告',
                        value: 310
                    }, {
                        name: '视频广告',
                        value: 310
                    }, {
                        name: '搜索引擎',
                        value: 310
                    }
                ]
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
    $('.Radio.ys').on('click', function () {
        var value = $(this).find('input').data('value')

        value ? myChart.setOption(
            {
                series: [{
                    radius: ['0%', '70%'],
                }]
            }
        ) : myChart.setOption({
            series: [{
                radius: ['50%', '70%'],
            }]
        });
    })
})