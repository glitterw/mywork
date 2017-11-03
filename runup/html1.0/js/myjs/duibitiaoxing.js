
var myChart = echarts.init(document.getElementById('chart'));


$(function () {
    var option = {
        title: {
            text: 'aaaa',
            left: 'center'

        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (a) {
                return a.reduce(function (sum, item) {
                    return sum + '<br>' +
                        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '">' +
                        '</span>' +
                        item.seriesName + ' : ' + Math.abs(item.value)
                }, a[0].name);

            }
        },
        legend: {
            data: ['支出', '收入'],
            left: 'right'
        },
        grid: {
            top: 90
        },
        xAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLabel: {
                    formatter: function (val, index) {
                        return Math.abs(val)
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                axisLine: {
                    show: false
                },
                position: 'right',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }

        ],
        series: [

            {
                name: '收入',
                type: 'bar',
                stack: '总量',
                data: [320, 302, 341, 374, 390, 450, 420]
            },
            {
                name: '支出',
                type: 'bar',
                stack: '总量',
                data: [-120, -132, -101, -134, -190, -230, -210]
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

