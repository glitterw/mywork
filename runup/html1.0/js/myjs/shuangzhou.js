$(function () {
    var myChart = echarts.init(document.getElementById('chart'));

    var option = {
        tooltip: {
            trigger: "axis"
        },
        title: {
            text: "某地区蒸发量和降水量",
            left: 'center'
        },
        legend: {

            top: 45,
            left: 'right',
            width: '50%',
            data: ["蒸发量", "降水量"]
        },
        grid: {
            top: 90
        },
        xAxis: [
            {
                position: 'bottom',
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            {
                position: 'bottom',
                offset: 20,
                data: ["周aaaa", "周aaaa", "周aaaa", "周aaaa", "周aaaa", "周aaaa", "周aaaa"]
            }
        ],
        yAxis: [
            {
                type: "value",
                name: "绝对值",
                nameLocation: 'middle',
                nameGap: '35'
            },
            {
                type: "value",
                name: "增量",
                nameLocation: 'middle'
            }
        ],
        series: [
            {
                name: "蒸发量",
                type: "line",
                data: [2, 4.9, 7, 23.2, 25.6, 76.7, 135.6]
            },
            {
                name: "降水量",
                type: "bar",
                data: [2.6, 5.9, 9, 26.4, 28.7, 70.7, 175.6]
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
    }
    myChart.setOption(option);

})