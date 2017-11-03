// JavaScript Document
$(function() {
	var winW = document.documentElement.clientWidth;
	var winH = document.documentElement.clientHeight;
	//翻屏
	(function() {
		var i = 1;
		var bull = true;
		$('.sidebar a').click(function() {
			$(this).addClass('a_on').siblings().removeClass('a_on');
			$('.content_5_img , .content_5_Text').removeClass('show');
		});
		$('.sidebar_a1').click(function() {
			$('.wrap_index').attr('id', 'top_1');
			i = 1;
		});
		$('.sidebar_a2').click(function() {
			$('.wrap_index').attr('id', 'top_2');
			i = 2;
		});
		$('.sidebar_a3').click(function() {
			$('.wrap_index').attr('id', 'top_3');
			i = 3;
		});
		$('.sidebar_a4').click(function() {
			$('.wrap_index').attr('id', 'top_4');
			i = 4;
		});
		$('.sidebar_a5').click(function() {
			$('.wrap_index').attr('id', 'top_5');
			i = 5;
			$('.content_5_img , .content_5_Text').addClass('show');
		});
		$(document).mousewheel(function() {
			if(!bull) {
				return false;
			};
			bull = false;
			setTimeout(function() {
				bull = true;
			}, 1100);
			var ii;
			if(this.Down) {
				ii = i + 1;
			} else {
				ii = i - 1;
			}
			if(ii == 6) {
				ii = 1
			}
			if(ii == 0) {
				ii = 5
			}
			$('.sidebar_a' + ii).click();
		});
	})();
	//登陆
	(function() {
		$('.loginBar_1 a').click(function() {
			$('.loginBar_2').css('display', 'block');
		});
		$('.guanbiX').click(function() {
			$('.loginBar_2').css('display', 'none');
		});
	})();
	//第一屏粒子图
	var SEPARATION = 100,
		AMOUNTX = 50,
		AMOUNTY = 50;

	var container;
	var camera, scene, renderer;

	var particles, particle, count = 0;

	var mouseX = 0,
		mouseY = 0;
	var htmlDom=document.getElementsByTagName('html')[0];
	var windowHalfX = parseFloat(htmlDom.style.width) / 2;
	var windowHalfY = parseFloat(htmlDom.style.height) / 2;

	init();
	animate();

	function init() {

		container = document.getElementById('content_canvas_1');

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 1000;

		scene = new THREE.Scene();

		particles = new Array();

		var PI2 = Math.PI * 2;
		var material = new THREE.ParticleCanvasMaterial({

			color: 0xffffff,
			opacity: 0.5,
			program: function(context) {

				context.beginPath();
				context.arc(0, 0, 1, 0, PI2, true);
				context.fill();

			}

		});

		var i = 0;

		for(var ix = 0; ix < AMOUNTX; ix++) {

			for(var iy = 0; iy < AMOUNTY; iy++) {

				particle = particles[i++] = new THREE.Particle(material);
				particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
				particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
				scene.add(particle);

			}

		}

		renderer = new THREE.CanvasRenderer();
		renderer.setSize(parseFloat(htmlDom.style.width), window.parseFloat(htmlDom.style.height));
		container.appendChild(renderer.domElement);

		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('touchstart', onDocumentTouchStart, false);
		document.addEventListener('touchmove', onDocumentTouchMove, false);

		//

		window.addEventListener('resize', onWindowResize, false);

	}

	function onWindowResize() {

		windowHalfX = parseFloat(htmlDom.style.width) / 2;
		windowHalfY = parseFloat(htmlDom.style.height) / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	//

	function onDocumentMouseMove(event) {

		mouseX = event.clientX - windowHalfX;
		mouseY = -160;

	}

	function onDocumentTouchStart(event) {

		if(event.touches.length === 1) {

			event.preventDefault();

			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;

		}

	}

	function onDocumentTouchMove(event) {

		if(event.touches.length === 1) {

			event.preventDefault();

			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;

		}

	}

	//

	function animate() {
		mouseY = -160;

		requestAnimationFrame(animate);

		render();

	}

	function render() {

		camera.position.x += (mouseX - camera.position.x) * .05;
		camera.position.y += (-mouseY - camera.position.y) * .05;
		camera.lookAt(scene.position);

		var i = 0;

		for(var ix = 0; ix < AMOUNTX; ix++) {

			for(var iy = 0; iy < AMOUNTY; iy++) {

				particle = particles[i++];
				particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
				particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

			}

		}

		renderer.render(scene, camera);

		count += 0.1;

	}
	//第三屏百度地图
	var dom = document.getElementById("container");
	var MapmyChart = echarts.init(dom);
	var Mapoption = null;
	var Mapdata = [{
		name: '江汉区',
		value: 999
	}, {
		name: '汉阳区',
		value: 777
	}, {
		name: '沌口区',
		value: 555
	}, {
		name: '武昌区',
		value: 444
	}, {
		name: '洪山区',
		value: 333
	}, {
		name: '青山区',
		value: 222
	}, {
		name: '华中科技大学',
		value: 111
	}];
	var geoCoordMap = {
		'江汉区': [114.277911, 30.608126],
		'汉阳区': [114.224444, 30.559875],
		'沌口区': [114.160628, 30.47575],
		'武昌区': [114.321892, 30.55975],
		'洪山区': [114.349775, 30.506745],
		'青山区': [114.390594, 30.64753],
		'华中科技大学': [114.420778, 30.51471]
	};

	var convertData = function(Mapdata) {
		var res = [];
		for(var i = 0; i < Mapdata.length; i++) {
			var geoCoord = geoCoordMap[Mapdata[i].name];
			if(geoCoord) {
				res.push({
					name: Mapdata[i].name,
					value: geoCoord.concat(Mapdata[i].value)
				});
			}
		}
		return res;
	};

	var Mapoption = {
		title: {
			show: false,
			text: '武汉市工商投诉地图'
		},
		tooltip: {
			trigger: 'item',
			formatter: function(_this) {
				var relVal = '';
				relVal = _this.name + ' : ' + _this.value[2] + '件';
				return relVal;
			}
		},
		bmap: {
			center: [114.299758, 30.56087],
			zoom: 12,
			roam: 'move',
			mapStyle: {
				styleJson: [{
					'featureType': 'water',
					'elementType': 'all',
					'stylers': {
						'color': '#e2ebf1'
					}
				}, {
					'featureType': 'land',
					'elementType': 'all',
					'stylers': {
						'color': '#f6fbff'
					}
				}, {
					'featureType': 'railway',
					'elementType': 'all',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'highway',
					'elementType': 'all',
					'stylers': {
						'color': '#c6d4dc',
						"weight": "0.3"
					}
				}, {
					'featureType': 'highway',
					'elementType': 'labels',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'arterial',
					'elementType': 'geometry',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'poi',
					'elementType': 'all',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'green',
					'elementType': 'all',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'subway',
					'elementType': 'all',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'manmade',
					'elementType': 'all',
					'stylers': {
						'color': '#d1d1d1'
					}
				}, {
					'featureType': 'local',
					'elementType': 'all',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'arterial',
					'elementType': 'labels',
					'stylers': {
						'visibility': 'off'
					}
				}, {
					'featureType': 'boundary',
					'elementType': 'all',
					'stylers': {
						'color': '#54a7df'
					}
				}, {
					'featureType': 'building',
					'elementType': 'all',
					'stylers': {
						'color': '#d1d1d1'
					}
				}, {
					'featureType': 'label',
					'elementType': 'labels.text.fill',
					'stylers': {
						'color': '#999999'
					}
				}, {
					"featureType": "label",
					"elementType": "labels.text.stroke",
					"stylers": {
						"color": "#ffffff"
					}
				}]
			}
		},
		series: [{
			type: 'effectScatter',
			coordinateSystem: 'bmap',
			data: convertData(Mapdata),
			symbolSize: function(val) {
				return val[2] / 10;
			},
			showEffectOn: 'render',
			rippleEffect: {
				brushType: 'stroke'
			},
			hoverAnimation: true,
			itemStyle: {
				normal: {
					color: 'rgba(255,0,52,0.4)',
					shadowBlur: 10,
					shadowColor: '#f08ca0',
				}
			},
			zlevel: 1
		}]
	};;
	if(Mapoption && typeof Mapoption === "object") {
		MapmyChart.setOption(Mapoption, true);
	}
	//第三屏处理占比图
	// 基于准备好的dom，初始化echarts实例
	var ClzbmyChart = echarts.init(document.getElementById('clzb'));

	var ClzbdataStyle = {
		normal: {
			label: {
				show: false
			},
			labelLine: {
				show: false
			}
		},
		emphasis: {
			color: '#ff0033'
		}
	};
	var ClzbplaceHolderStyle = {
		normal: {
			color: 'rgba(0,0,0,0)',
			borderColor: 'rgba(204,204,204,0.5)',
			borderWidth: 0.5,
			label: {
				show: false
			},
			labelLine: {
				show: false
			}
		},
		emphasis: {
			color: 'rgba(0,0,0,0)'
		}
	};
	var ClzbplaceTooltip = {
		show: false
	};
	var ClzbdataTooltip = {

	}
	var ClzbdataVal = {
		Line_1: 30,
		Line_2: 60,
		Line_3: 50,
		Line_4: 40,
		Line_5: 70,
	}
	var Clzboption = {
		//backgroundColor: '#f4f2e3',
		color: ['#b7c9d5'],
		tooltip: {
			show: true,
			backgroundColor: '#ffffff',
			padding: [5, 14],
			textStyle: {
				color: '#999999'
			},
			position: 'right',
			formatter: "<p class='ECtxet_p1'>{a} <br/>已处理占比:</p><p class='ECtxet_p2'><span>{c}</span>%</p>"
		},
		legend: {
			show: false
		},
		toolbox: {
			show: false
		},
		series: [{
			name: '交通工具类投诉',
			center: ["50%", "50%"],
			type: 'pie',
			clockWise: true,
			radius: [11, 18],
			itemStyle: ClzbdataStyle,
			hoverAnimation: false,

			data: [{
					value: ClzbdataVal.Line_1,
					name: '01'
				}, {
					value: 100 - ClzbdataVal.Line_1,
					name: 'invisible',
					itemStyle: ClzbplaceHolderStyle,
					tooltip: ClzbplaceTooltip
				}

			]
		}, {
			name: '交通工具类投诉2',
			center: ["50%", "50%"],
			type: 'pie',
			clockWise: true,
			radius: [25, 32],
			itemStyle: ClzbdataStyle,
			hoverAnimation: false,

			data: [{
					value: ClzbdataVal.Line_2,
					name: '01'
				}, {
					value: 100 - ClzbdataVal.Line_2,
					name: 'invisible',
					itemStyle: ClzbplaceHolderStyle,
					tooltip: ClzbplaceTooltip
				}

			]
		}, {
			name: '交通工具类投诉3',
			center: ["50%", "50%"],
			type: 'pie',
			clockWise: true,
			radius: [39, 46],
			itemStyle: ClzbdataStyle,
			hoverAnimation: false,

			data: [{
					value: ClzbdataVal.Line_3,
					name: '01'
				}, {
					value: 100 - ClzbdataVal.Line_3,
					name: 'invisible',
					itemStyle: ClzbplaceHolderStyle,
					tooltip: ClzbplaceTooltip
				}

			]
		}, {
			name: '交通工具类投诉4',
			center: ["50%", "50%"],
			type: 'pie',
			clockWise: true,
			radius: [53, 60],
			itemStyle: ClzbdataStyle,
			hoverAnimation: false,

			data: [{
					value: ClzbdataVal.Line_4,
					name: '01'
				}, {
					value: 100 - ClzbdataVal.Line_4,
					name: 'invisible',
					itemStyle: ClzbplaceHolderStyle,
					tooltip: ClzbplaceTooltip
				}

			]
		}, {
			name: '交通工具类投诉5',
			center: ["50%", "50%"],
			type: 'pie',
			clockWise: true,
			radius: [67, 74],
			itemStyle: ClzbdataStyle,
			hoverAnimation: false,

			data: [{
					value: ClzbdataVal.Line_5,
					name: '01'
				}, {
					value: 100 - ClzbdataVal.Line_5,
					name: 'invisible',
					itemStyle: ClzbplaceHolderStyle,
					tooltip: ClzbplaceTooltip
				}

			]
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	ClzbmyChart.setOption(Clzboption);
	//第三屏分类占比
	// 基于准备好的dom，初始化echarts实例
	var FlzbmyChart = echarts.init(document.getElementById('flzb'));

	var FlzbdataStyle = {
		normal: {
			label: {
				show: false
			},
			labelLine: {
				show: false
			},
			borderColor: '#ffffff',
			borderWidth: 4
		},
		emphasis: {
			//移入后效果
		}
	};
	var FlzbdataVal = [{
		value: 30,
		name: "投诉1"
	}, {
		value: 30,
		name: "投诉2"
	}, {
		value: 30,
		name: "投诉3"
	}, {
		value: 30,
		name: "投诉4"
	}, {
		value: 30,
		name: "投诉5"
	}];
	var Flzboption = {
		color: ["rgb(183, 201, 213)", "rgb(194, 210, 220)", "rgb(199, 214, 224)", "rgb(207, 221, 230)", "rgb(214, 225, 233)"],
		tooltip: {
			show: true,
			backgroundColor: '#ffffff',
			padding: [5, 14],
			textStyle: {
				color: '#999999'
			},
			position: 'left',
			formatter: "<p class='ECtxet_p1'>{b} <br/>已处理占比:</p><p class='ECtxet_p2'><span>{c}</span>%</p>"
		},
		legend: {
			show: false
		},
		toolbox: {
			show: false
		},
		series: [{
			type: "pie",
			radius: [20, 80],
			center: ["50%", "50%"],
			roseType: "radius",
			data: FlzbdataVal,
			itemStyle: FlzbdataStyle
		}]
	};

	// 使用刚指定的配置项和数据显示图表。
	FlzbmyChart.setOption(Flzboption);
	//第三屏投诉趋势图
	// 基于准备好的dom，初始化echarts实例
	var SjzsmyChart = echarts.init(document.getElementById('sjzs'));
	var Sjzsdata = {
		dataX: ["五月", "六月", "七月", "八月", "九月", "十月"],
		dataY: [100, 90, 90, 70, 80, 60]
	};
	var Sjzsoption = {
		tooltip: {
			show: true,
			backgroundColor: '#ffffff',
			padding: [5, 14],
			textStyle: {
				color: '#999999'
			},
			formatter: "{b}投诉量 : {c} 件"
		},
		legend: {
			show: false
		},
		toolbox: {
			show: false
		},
		xAxis: [{
			type: "category",
			boundaryGap: false,
			data: Sjzsdata.dataX,
			axisLine: {
				lineStyle: {
					color: "rgb(214, 220, 233)",
					width: 1
				}
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: "rgb(153, 153, 153)",
					fontSize: 14
				}
			},
			splitLine: {
				show: true
			}
		}],
		yAxis: [{
			type: "value",
			axisLine: {
				lineStyle: {
					color: "rgb(214, 220, 233)",
					width: 1
				}
			},
			axisTick: {
				lineStyle: {
					width: 1
				},
				show: false
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: "rgb(214, 220, 233)"
				}
			},
			axisLabel: {
				show: false
			}
		}],
		series: [{
			name: "投诉量",
			type: "line",
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: {
						type: "default"
					},
					lineStyle: {
						color: "rgb(230, 0, 45)",
						width: 2
					},
					borderColor: "rgb(230, 0, 45)",
					borderWidth: 4
				}
			},
			data: Sjzsdata.dataY,
			symbol: "circle",
			symbolSize: 2
		}],
		color: ["rgb(227, 234, 239)"],
		grid: {
			height: 80,
			x: 20,
			y: 20,
			x2: 20,
			y2: 20
		}
	};
	// 使用刚指定的配置项和数据显示图表。
	SjzsmyChart.setOption(Sjzsoption);

	//时间轴拖拽
	(function() {
		//加载完
		var aW = $('.tssjtz_bg1_1d a').width();
		var pvrL = parseInt($('.tssjtz_pvr').css('left')) - 100;
		$('#tssjtz_d').attr('data-start', Math.round(pvrL / aW))
		var netL = parseInt($('.tssjtz_net').css('left')) - 120;
		$('#tssjtz_d').attr('data-end', Math.round(netL / aW));
		$('.tssjtz_pvr').mousedown(function(ev) {
			var _this = $(this);
			$(window).mousemove(function(ev) {
				SjzTzFn(ev);
			});
			$(window).mouseup(function() {
				SjzTzFn2();
			});
			var pvrPageX = ev.pageX;
			var SjzTzFn = function(ev) {
				if(parseInt(_this.css('left'))+(ev.pageX - pvrPageX) < 100) return false;
				_this.css('left', '+=' + (ev.pageX - pvrPageX));
				var pr = /[\(\)\s]/;
				var aClip = $('.tssjtz_bg1_2').css('clip').split(pr);
				var aClipR = parseInt(aClip[2]);
				var aClipL = parseInt(aClip[4]) + ev.pageX - pvrPageX;
				var oclip = 'rect(0px,' + aClipR + 'px,60px,' + aClipL + 'px)';
				$('.tssjtz_bg1_2').css('clip', oclip);
				pvrPageX = ev.pageX;
			};
			var SjzTzFn2 = function() {
				SjzTzFn = SjzTzFn2 = function() {};
				var aW = $('.tssjtz_bg1_1d a').width();
				var pvrL = parseInt($('.tssjtz_pvr').css('left')) - 100;
				$('#tssjtz_d').attr('data-start', Math.round(pvrL / aW))
			}
		});
		$('.tssjtz_net').mousedown(function(ev) {
			var _this = $(this);
			$(window).mousemove(function(ev) {
				SjzTzFn(ev);
			});
			$(window).mouseup(function() {
				SjzTzFn2();
			});
			var pvrPageX = ev.pageX;
			var SjzTzFn = function(ev) {
				if(parseInt(_this.css('left'))+(ev.pageX - pvrPageX) > 1100) return false;
				_this.css('left', '+=' + (ev.pageX - pvrPageX));
				var pr = /[\(\)\s]/;
				var aClip = $('.tssjtz_bg1_2').css('clip').split(pr);
				var aClipR = parseInt(aClip[2]) + ev.pageX - pvrPageX;
				var aClipL = parseInt(aClip[4]);
				var oclip = 'rect(0px,' + aClipR + 'px,60px,' + aClipL + 'px)';
				$('.tssjtz_bg1_2').css('clip', oclip);
				pvrPageX = ev.pageX;
			};
			var SjzTzFn2 = function() {
				SjzTzFn = SjzTzFn2 = function() {};
				var aW = $('.tssjtz_bg1_1d a').width();
				var netL = parseInt($('.tssjtz_net').css('left')) - 120;
				$('#tssjtz_d').attr('data-end', Math.round(netL / aW));
			}
		});
	})();

	//展开面板
	(function() {
		$('.ycmb_d a').click(function() {
			$(this).toggleClass('a_on');
			if($(this).hasClass('a_on')) {
				$(this).next().html('显示面板');
				$('.sjzs_d,.clzd_d,.flzd_d').css('display', 'none');
			} else {
				$(this).next().html('隐藏面板');
				$('.sjzs_d,.clzd_d,.flzd_d').css('display', 'block');
			}
		})
	})();
	//第五屏等比例缩放
//	var winH = $(window).height();
//	var itScale = (winH - 150 - 123) / 760;
//	$('.content_5_it').css('transform', 'scale(' + itScale + ',' + itScale + ')');

})