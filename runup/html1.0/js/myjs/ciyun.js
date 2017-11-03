var myChart = echarts.init(document.getElementById('chart'));
var color = [
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

var option = {
    title: {
        text: "词云图",
        left: 'center'
    },
     tooltip: {
            trigger: 'item',
          

        },
    series: [{
        type: 'wordCloud',
        rotationRange: [0, 90],
        rotationStep: 90,
        textStyle: {
            normal: {
                color: function () {
                    return color[Math.round(Math.random() * 11)]
                }
            }
        },
        data: [
            {
                name: 'Sam S Club',
                value: 10000,
                textStyle: {
                    normal: {
                        color: '#5c82dd'
                    },

                }

            }, {
                name: 'Macys',
                value: 6181
            }, {
                name: 'Amy Schumer',
                value: 4386
            }, {
                name: 'Jurassic World',
                value: 4055
            }, {
                name: 'Charter Communications',
                value: 2467
            }, {
                name: 'Chick Fil A',
                value: 2244
            }, {
                name: 'Planet Fitness',
                value: 1898
            }, {
                name: 'Pitch Perfect',
                value: 1484
            }, {
                name: 'Express',
                value: 1112
            }, {
                name: 'Home',
                value: 965
            }, {
                name: 'Johnny Depp',
                value: 847
            }, {
                name: 'Lena Dunham',
                value: 582
            }, {
                name: 'Lewis Hamilton',
                value: 555
            }, {
                name: 'KXAN',
                value: 550
            }, {
                name: 'Mary Ellen Mark',
                value: 462
            }, {
                name: 'Farrah Abraham',
                value: 366
            }, {
                name: 'Rita Ora',
                value: 360
            }, {
                name: 'Serena Williams',
                value: 282
            }, {
                name: 'NCAA baseball tournament',
                value: 273
            }, {
                name: 'Point Break',
                value: 265
            }
        ]

    }]
};

myChart.setOption(option);