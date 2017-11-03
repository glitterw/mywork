
var myChart = echarts.init(document.getElementById('chart'));


$(function () {
    var option = {
        title: {
            text: '我的标题',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            top: 45,
            data: ['2011年', '2012年'],
            left: 'right',
            width: '50%'
        },
        grid: {
            top: 90
        },
        xAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                stack: 'sum',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
            ,
            {
                name: '2012年',
                type: 'bar',
                stack: 'sum',
                data: [19325, 23538, 31090, 11594, 136141, 181807]
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

