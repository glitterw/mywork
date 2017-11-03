/**
 * Created by Administrator on 2017/3/8.
 */
//漏斗图
$(function () {
    option = {
        title: {
            text: '漏斗图',
            subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            data: ['展现','点击','访问','咨询','订单']
        },
        calculable: true,
        series: [
            {
                name:'漏斗图',
                type:'funnel',
                left: '10%',
                top: 60,
                //x2: 80,
                bottom: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                orient: 'horizontal',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                },
                data: [
                    {value: 60, name: '访问'},
                    {value: 40, name: '咨询'},
                    {value: 20, name: '订单'},
                    {value: 80, name: '点击'},
                    {value: 100, name: '展现'}
                ]
            }
        ]
    };
    myChart.setOption(option);

    $('#funnel .Radio').on('click', function () {
        var value = $(this).find('input[type="radio"]').val(); 
        if(value==1){
            myChart.setOption(
                {
                    series: [{
                        orient : ['horizontal'],//水平布局
                    }]
                });
        }else {
            myChart.setOption({
                series: [{
                    orient: ['vertical'],//垂直布局
                }]
            });
        }

    })

//   图表标签
    $('.sub-item .Checkbox').on('click', function () {
        var show = $(this).find('input[type="checkbox"]').prop('checked');
        myChart.setOption({
            series: [{
                label: {
                    normal: {
                        show: show
                    }

                }
            }]
        });
    })

});
