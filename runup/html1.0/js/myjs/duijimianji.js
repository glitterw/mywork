
var myChart = echarts.init(document.getElementById('chart'));


$(function () {
    var option = {
        title: {
            text: '堆叠区域图',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'

        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            left: 'right'
        },

        grid: {
            top: 90
        },
        xAxis: [
            {
                type: 'category',
                 boundaryGap: false,


                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value',

                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                areaStyle: { normal: {} },
                data: [320, 332, 301, 334, 390, 330, 320]
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

})

