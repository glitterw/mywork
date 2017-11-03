
var myChart = echarts.init(document.getElementById('chart'));


$(function () {
    var option = {
        title: {
            text: 'Sankey Diagram',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },

        series: [{
            type: 'treemap',
            roam: true,
            nodeClick: false,
            breadcrumb: {
                show: false
            },

            data: [{
                value: 10,
                name: 'aaaa\n\n100(品牌数量)\n\n30%',


            }, {
                value: 10,
                name: 'bbbb\n\n100(品牌数量)\n\n30%',


            }, {
                value: 10,
                children: [{
                    name: 'ccc1\n\n10(品牌数量)\n\n30%',
                    value: 3,

                }, {
                    name: 'ccc2\n\n10(品牌数量)\n\n30%',
                    value: 3,

                }, {
                    name: 'ccc3\n\n20(品牌数量)\n30%',
                    value: 2,

                }, {
                    name: 'ccc4连体\n\n30(品牌数量)\n30%',
                    value: 2,

                }]
            }, {
                value: 10,
                name: 'dddd\n\n100(品牌数量)\n\n30%',


            }


            ]
        }],
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

