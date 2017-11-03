var myChart = echarts.init(document.getElementById("chart"));

$(function () {
    var option = {
        title: {
            text: "我的标题",
            left: "center"
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            },
            formatter: function (a) {
                return a.reduce(
                    function (sum, item) {
                        return sum +
                            "<br>" +
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                            item.color +
                            '">' +
                            "</span>" +
                            item.seriesName +
                            " : " +
                            item.value +
                            "%";
                    },
                    a[0].name
                );
            }
        },
        legend: {
            top: 45,
            data: ["2011年", "2012年", "2013年"],
            left: "right",
            width: "50%"
        },
        grid: {
            top: 90
        },

        xAxis: {
            type: "category",
            data: ["巴西", "印尼", "中国", "美国"]
        },
        yAxis: [
            {
                type: "value",
                axisLabel: {
                    formatter: "{value}%"
                },
                interval: 25,
                max: 100,
                min: 0,
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: "2011年",
                type: "bar",
                stack: "percent",
                data: [20, 50, 20, 50]
            },
            {
                name: "2012年",
                type: "bar",
                stack: "percent",
                data: [75, 30, 75, 30]
            },
            {
                name: "2013年",
                type: "bar",
                stack: "percent",
                data: [5, 20, 5, 20]
            }
        ],
        color: [
            "#5c82dd",
            "#a5ca73",
            "#61af82",
            "#f0cc62",
            "#ea9257",
            "#e15e58",
            "#c06ad0",
            "#8159cd",
            "#5258b2",
            "#6bb3ec",
            "#84d2d9",
            "#c33e6b"
        ]
    };

    myChart.setOption(option);
});
