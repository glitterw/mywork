
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
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
            ,
            {
                name: '2012年',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
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

/**
 * cofig   title
 */

$('input[data-title]').on('change', function (e) {

    myChart.setOption({
        title: {
            text: $(this).val()
        }
    })

})

/**
 * config   label
 */

$('input[data-label]').on('click', function () {
    /**
     * false代表默认的直线
     * true代表光滑的曲线
     */

    myChart.setOption({
        series: [{
            label: {
                normal: {
                    show: $(this).prop('checked')
                }

            }
        },
        {
            label: {
                normal: {
                    show: $(this).prop('checked')
                }

            }
        }]
    });
})
/**
  *config   yAxis name and yAxis unit
  */
$('input[data-axis-name],input[data-axis-unit]').on('change', function () {
    var name = $('input[data-axis-name').val() + '（' + $('input[data-axis-unit').val() + '）';
    myChart.setOption({
        yAxis: {
            name: name
        }
    });
})
/**
  *config   yAxis max and yAxis min    max-auto   min-auto
  */
$('input[data-axis-max],input[data-axis-min],input[data-axis-max-auto],input[data-axis-min-auto]').on('change', function () {

    var max = $('input[data-axis-max').val() ? parseInt($('input[data-axis-max').val()) : 640000
    var min = $('input[data-axis-min').val() ? parseInt($('input[data-axis-min').val()) : 0
    myChart.setOption({
        xAxis: {
            max: $('input[data-axis-max-auto]').prop('checked') ? 'auto' : max,
            min: $('input[data-axis-min-auto]').prop('checked') ? 'auto' : min
        }
    });
})



