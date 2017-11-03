$(function () {
    var option = {
        tooltip: {
            trigger: "axis"
        },
        title: {
            text: "某地区蒸发量和降水量",
            top: 30,
            left: 'center'
        },
        legend: {
            top: '45%',
            right: 50,
            orient: 'vertical',
            data: ["蒸发量", "降水量"]
        },
        xAxis: [
            {
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            }
        ],
        grid: {
            top: 90
        },
        yAxis: [
            {
                type: "value",
                name: "绝对值"
            },
            {
                type: "value",
                name: "增量"
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
        ]
    }
    myChart.setOption(option);

})