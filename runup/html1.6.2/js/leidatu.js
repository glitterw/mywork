$(function() {
	var myChart = echarts.init(document.getElementById('chart'));
	var option = {
		title: {
			text: '我的标题',
			top: 0,
			left: 'center',
			padding: [0, 0, 0, 0]
		},
		tooltip: {
			trigger: 'item',
			backgroundColor: '#fff',
			formatter: function(a) {
				var html;
				html = '<div>' + a.seriesName + '</div>';
				for(var i = 0, len = a.data.name.length; i < len; i++) {
					html += '<div style="color:' + a.color + ';" >' + a.data.name[i] + ':' + a.data.value[i] + '</div>';
				}
				return html;
			},
			textStyle: {
				color: '#333'
			},
			extraCssText: 'box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);' //阴影设置
		},
		radar: {
			/**圆形雷达**/
			// shape: 'circle',
			//radius: '80%',
			indicator: [
				{ name: '销售', max: 6500 },
				{ name: '管理', max: 16000 },
				{ name: '信息', max: 30000 },
				{ name: '客服', max: 38000 },
				{ name: '研发', max: 52000 },
				{ name: '市场', max: 25000 }
			]
		},
		series: [{
			name: '预算 ',
			type: 'radar',
			itemStyle: {
				normal: {
					color: '#f00'
				}
			},
			lineStyle: {
				normal: {
					color: '#f00'
				}
			},
			data: [{
				value: [4300, 10000, 28000, 35000, 50000, 19000],
				name: ['销售', '管理', '信息', '客服', '研发', '市场'],
			}]
		}]
	};
	myChart.setOption(option);
})