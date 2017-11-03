$(function () {
    var option = {
        tooltip: {
            trigger: "axis"
        },
        title: [{
            text: '我的标题',
            top: 30,
            left: 'center',
            padding: [0, 0, 0, 0]
        }],
        grid: {
            top: 90
        },
        legend: {
            top: '40%',
            right: 50,
            orient: 'vertical',
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