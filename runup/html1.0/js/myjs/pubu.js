
$(function () {
    var myChart = echarts.init(document.getElementById('chart'));

    var option = {
        title: {
            text: '深圳月最低生活费组成（单位:元）',
            left: 'center'

        },
        tooltip: {
            trigger: 'axis',

            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                var tar = params[1];
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        grid: {
            top: 90
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: ["日用品数", "伙食费", "交通费", "水电费", "房租", "总计"]

        },
        yAxis: {
            type: 'value',


        },
        series: [
            {
                name: '辅助',
                type: 'bar',
                stack: '总量',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: [0, 300, 1200, 1400, 1700, 0]
            },
            {
                name: '生活费',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    }
                },
                data: [300, 900, 200, 300, 1200, 2900]
            }
        ]
    };

    myChart.setOption(option);

})
