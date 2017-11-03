$(function() {

	var myChart = echarts.init(document.getElementById('chart'));
	var option = {

		tooltip: {
			trigger: "axis",
			backgroundColor: '#fff',
			textStyle: {
				color: '#333'
			},
			formatter: function(a) {
				if(a.length) {
					var html;
					html = '<div>' + a[0].name + '</div>';
					for(var i = 0, len = a.length; i < len; i++) {
						html += '<div style="color:' + a[i].color + ';" >' + a[i].seriesName + ':' + a[i].value + '</div>';
					}
					return html;
				} else {
					var html;
					html = '<div>' + a.seriesName + '</div>';
					html += '<div style="color:' + a.color + ';" >' + a.name + ':' + a.value + '</div>';
					return html;
				}
			},
			extraCssText: 'box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);', //阴影设置
		},
		title: {
			text: '我的标题',

			left: 'center'

		},
		grid: {
			top: 90

		},

		legend: {
			top: 45,
			left: 'right',
			width: '50%',
			data: ['今日', '昨日'] //legend.data
		},
		xAxis: {
			type: 'category',
			data: ['00:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', "22:00"],
			boundaryGap: false,
			splitLine: {
				show: true
			},
		},
		yAxis: [{
			type: "value",
			//min:0,//最小刻度
			//max:2300,//最小刻度
		}],
		dataZoom: [{
			type: 'slider',
			show: true, //显示隐藏缩放组件
			start: 0,
			end: 100, //100%
			xAxisIndex: [0],
			filterMode: 'filter'
		}],
		

		series: [{
				name: "今日",
				type: "line",
				smooth: true,//折线曲线
				data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
				areaStyle: {
					normal: {
						opacity: 0.1,
					}
				},

				markLine: {
					data: [
						{ type: 'average', name: '平均值' }, //简单写法
						[{
							symbol: 'none',
							x: '10%',
							yAxis: 'max'
						}, {
							symbol: 'circle',
							label: {
								normal: {
									position: 'start',
									formatter: '最大值'
								}
							},
							type: 'max',
							name: '最大值'
						}],
						[{
							symbol: 'none',
							x: '10%',
							yAxis: 'min'
						}, {
							symbol: 'circle',
							label: {
								normal: {
									position: 'start',
									formatter: '最小值'
								}
							},
							type: 'min',
							name: '最小值'
						}],
						[{
								symbol: 'none',
								yAxis: 500,
								x: '10%'
							},
							{
								symbol: 'circle',
								yAxis: 500,
								x: '90%',
								label: {
									normal: {
										position: 'start',
										formatter: '辅助线一'
									}
								},
								name: '辅助线一',
								value: 500
							}
						],

					]
				}
			},
			{
				name: "昨日",
				type: "line",
				smooth: false,//折线曲线
				data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
				areaStyle: {
					normal: {
						opacity: 0.1,
					}
				},
				markLine: {
					data: [
						{ type: 'average', name: '平均值' }, //简单写法
						[{
							symbol: 'none',
							x: '10%',
							yAxis: 'max'
						}, {
							symbol: 'circle',
							label: {
								normal: {
									position: 'start',
									formatter: '最大值'
								}
							},
							type: 'max',
							name: '最大值'
						}],
						[{
							symbol: 'none',
							x: '10%',
							yAxis: 'min'
						}, {
							symbol: 'circle',
							label: {
								normal: {
									position: 'start',
									formatter: '最小值'
								}
							},
							type: 'min',
							name: '最小值'
						}],
						[{
								symbol: 'none',
								yAxis: 700,
								x: '10%'
							},
							{
								symbol: 'circle',
								yAxis: 700,
								x: '90%',
								label: {
									normal: {
										position: 'start',
										formatter: '辅助线二'
									}
								},
								name: '辅助线二',
								value: 700
							}
						],

					]
				}
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
	//给配置项注册事件
	/**
	 * 图表样式，曲线或者直线----------------------------------
	 */
	$('.Myradio[data-name=smooth]').on('click', function() {
		/**
		 * false代表默认的直线
		 * true代表光滑的曲线
		 */
		$('.Myradio[data-name=smooth]').removeClass('active');
		var smooth = $(this).addClass('active').data('value');
		myChart.setOption({
			series: [{
				smooth: smooth
			}]
		});
	})
	/**
	 * 图表标签------------------------------------------
	 */

	$('.baioqian').on('click', function() {
		/**
		 * false代表默认的直线
		 * true代表光滑的曲线
		 */
		var show = $(this).toggleClass('active').hasClass('active');

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
	/**
	 *坐标轴标题------------------------------------------
	 */
	$('#biaoti,#danwei').on('change', function() {
		var name = $('#biaoti').val() + '（' + $('#danwei').val() + '）';
		myChart.setOption({
			yAxis: {
				name: name
			}
		});
	})

	/**
	 * 是否显示缩略轴
	 */
	$('.suoluezhou').on('click', function() {
		var show = $(this).toggleClass('active').hasClass('active');
		show ? myChart.setOption({
			dataZoom: [{
				type: 'slider', //缩略轴
				show: true,
				start: 10,
				end: 100,
				handleSize: 10
			}]
		}) : myChart.setOption({
			dataZoom: {
				show: false
			}
		})
	})
	/**
	 * 主次
	 */
	$('.zhuci').on('click', function() {
		$(this).toggleClass('active').hasClass('active');

	})
	/**
	 * 自动
	 */
	$('.zidong').on('click', function() {

		$(this).toggleClass('active').hasClass('active');

	})
})