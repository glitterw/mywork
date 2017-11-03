// JavaScript Document
$(function() {
	//信用评级
	// 基于准备好的dom，初始化echarts实例
	if(document.getElementById('xxpj')) {
		var XxpjmyChart = echarts.init(document.getElementById('xxpj'));
		var Xxpjdata = {
			dataThis: [{
				value: [70, 80, 60, 40, 50],
				name: "东风汽车公司"
			}],
			dataContrast: [{
				value: [60, 40, 40, 50, 50],
				name: "东风日产乘用车公司"
			}]
		};
		var Xxpjoption = {
			tooltip: {
				show: true,
				trigger: "axis",
				backgroundColor: "rgb(249, 249, 249)",
				borderWidth: 1,
				borderColor: "rgb(204, 204, 204)",
				textStyle: {
					color: "rgb(51, 51, 51)"
				},
			},
			toolbox: {
				show: false,
				feature: {
					mark: {
						show: true
					},
					dataView: {
						show: true,
						readOnly: false
					},
					restore: {
						show: true
					},
					saveAsImage: {
						show: true
					}
				}
			},
			radar: [{
				indicator: [{
					text: "经营状况",
					min: 0,
					max: 100
				}, {
					text: "组织背景",
					min: 0,
					max: 100
				}, {
					text: "信用历史",
					min: 0,
					max: 100
				}, {
					text: "信息完备度",
					min: 0,
					max: 100
				}, {
					text: "创新能力",
					min: 0,
					max: 100
				}],
				axisLine: {
					lineStyle: {
						color: "rgb(187, 187, 187)",
						width: 2
					}
				},
				splitLine: {
					lineStyle: {
						color: "rgb(231, 231, 231)"
					}
				},
				splitArea: {
					show: false
				},
				splitNumber: 20,
				radius: 240

			}],
			series: [{
					name: "",
					type: 'radar',
					tooltip: {
						trigger: 'item'
					},
					itemStyle: {
						normal: {
							areaStyle: {
								type: 'default',
								color: 'rgba(255,255,255,0)'
							}
						},
						emphasis: {
							areaStyle: {
								color: 'rgba(255,0,51,0.3)'
							}
						}
					},
					data: Xxpjdata.dataThis,
					symbolSize: 8,
					symbol: "emptyCircle"
				}, {
					name: "",
					type: 'radar',
					tooltip: {
						trigger: 'item'
					},
					itemStyle: {
						normal: {
							color: "rgb(102, 102, 102)",
							areaStyle: {
								type: 'default',
								color: 'rgba(255,255,255,0)'
							}
						},
						emphasis: {
							areaStyle: {
								color: 'rgba(102,102,102,0.3)'
							}
						}
					},
					data: null,
					symbolSize: 8,
					symbol: "emptyCircle"
				}

			]
		};
		// 使用刚指定的配置项和数据显示图表。
		XxpjmyChart.setOption(Xxpjoption);
		//对比搜索动作
		var qypj_vs_p_on = false;
		$('.qypj_vs_p a').click(function() {

			if(qypj_vs_p_on) {
				if($('.qypj_vs_p input').val() == "") {
					$('.qypj_vs_p').removeClass('on');
					qypj_vs_p_on = false;
				} else {
					$('.qypj_vs_ssxq').slideDown();
				}
			} else {
				$('.qypj_vs_p').addClass('on');
				qypj_vs_p_on = true;
			}
		});
		$('.qypj_vs_ssxq a').click(function() {
			$('.qypj_vs_qy2').css('display', 'block');
			$('.qypj_vs_tj').css('display', 'none');
			$('.qypj_vs_p').removeClass('on');
			$('.qypj_vs_p input').val('');
			qypj_vs_p_on = false;
			$('.qypj_vs_ssxq').css('display', 'none');
			XxpjmyChart.setOption({
				series: [{
					data: Xxpjdata.dataThis
				}, {
					data: Xxpjdata.dataContrast
				}]
			});

		});
		$('.qypj_vs_qy2 a').click(function() {
			$('.qypj_vs_qy2').css('display', 'none');
			$('.qypj_vs_tj').css('display', 'block');
			XxpjmyChart.setOption({
				series: [{
					data: Xxpjdata.dataThis
				}, {
					data: null
				}]
			});
		});
		//		loadsize();
		//		function loadsize() {
		//			var winW = document.documentElement.clientWidth;
		//			var winH = document.documentElement.clientHeight;
		//			var transformval = "scale(" + (winH - 210) / 760 + ")";
		//			$('#xypjleida').css("transform", transformval);
		//		}
		//		$(window).resize(function() {
		//			loadsize();
		//		});
	}

	if(document.getElementById('view')) {
		(function() {
			//时间轴固定定位
			$(window).scroll(function() {
				if($(window).scrollTop() >= 280 && $(window).scrollTop() <= 550) {
					$('.tssjtz_d').addClass('tssjtz_d_fixed');
				}
				if($(window).scrollTop() < 280 || $(window).scrollTop() > 550) {
					$('.tssjtz_d').removeClass('tssjtz_d_fixed');
				}
			});

			//加载完
			//时间轴拖拽
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
					if(parseInt(_this.css('left')) + (ev.pageX - pvrPageX) < 50) return false;
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
					if(parseInt(_this.css('left')) + (ev.pageX - pvrPageX) > 1050) return false;
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
			$('.mssx_2 a').click(function() {
				$(this).addClass('a_on').siblings().removeClass('a_on');
			});
			$('.ztms').click(function() {
				$('.pmxq_ul').removeClass('pmxq_sjms');
			});
			$('.sjms').click(function() {
				$('.pmxq_ul').addClass('pmxq_sjms');
			});

			//排序初始化
			var paixucsh = function() {
				var pmxq_ullisize = $('.pmxq_donghua>div').size();
				$('.pmxq_ul').css({
					'height': (pmxq_ullisize * 40 + 44)
				});
				$('.pmxq_li').each(function(i) {
					var this_top = ($(this).attr('paiming') - 1) * 40;
					$(this).css({
						'top': this_top,
						'left': 0
					});
				});
				$('.pmxq_donghua').css({
					'height': (pmxq_ullisize * 40 + 44)
				}).removeClass('heng ,tubiao');
				$('.pmxq_donghua>div').each(function(i) {
					var this_top = ($(this).attr('paiming') - 1) * 40;
					if($(this).attr('paiming') % 9 == 1) {
						$(this).addClass('pmxq_donghua_div_left');
					};
					if($(this).attr('paiming') % 9 == 0) {
						$(this).addClass('pmxq_donghua_div_right');
					};
					if($(this).attr('paiming') > 9) {
						$(this).addClass('pmxq_donghua_div_top');
					};
					$(this).css({
						'top': this_top,
						'left': 0
					});
				});
			};
			//概览初始化
			var gailuecsh = function() {
				var pmxq_ullisize = $('.pmxq_donghua>div').size();
				$('.pmxq_ul').css('display', 'none');
				$('.pmxq_donghua').css({
					'height': (Math.ceil(pmxq_ullisize / 9) * 186 + 40),
					'display': 'block'
				});
				setTimeout(function() {
					$('.pmxq_donghua').removeClass('tubiao').addClass('heng');
					$('.pmxq_donghua>div').each(function(i) {
						var this_top = Math.floor(i / 9) * 186;
						var this_left = (i % 9) * 124.44;
						$(this).css({
							'top': this_top,
							'left': this_left
						});
					});
				}, 100);
			};
			//图标初始化
			var tubiaocsh = function() {
				var pmxq_ullisize = $('.pmxq_donghua>div').size();
				$('.pmxq_ul').css('display', 'none');
				$('.pmxq_donghua').css({
					'height': 600,
					'display': 'block'
				});
				setTimeout(function() {
					$('.pmxq_div').addClass('pmxq_divTB');
					$('.pmxq_donghua').removeClass('heng').addClass('tubiao');
					$('.pmxq_donghua>div').each(function(i) {
						var this_top = ($(this).attr('paiming') / 100) * 600 + 4;
						var this_left = ($(this).attr('fennei') - 1) * 101 + 10;
						$(this).css({
							'top': this_top,
							'left': this_left
						});
					});
				}, 100);
			};
			//渲染模版
			var data;
			$.ajax({
				type: "GET",
				url: "js/pinpaipaiming1.json",
				success: function(msg) {
					if($.type(msg) == 'object') {
						msg = msg;
					} else {
						msg = $.parseJSON(msg);
					}
					data = msg;
					var gettpl = document.getElementById('demo').innerHTML;
					laytpl(gettpl).render(data, function(html) {
						document.getElementById('view').innerHTML = html;
						paixucsh();
					});
					var gettpl = document.getElementById('demo2').innerHTML;
					laytpl(gettpl).render(data, function(html) {
						document.getElementById('view2').innerHTML = html;
						paixucsh();
					});
					$('.gaishu').click();
				},
				error: function(XMLHttpRequest, textStatus) {
					alert("错误信息: " + textStatus);
				}
			});
			//异步加载动画
			var ybjzdh = function(msg) {
				if($.type(msg) == 'object') {
					msg = msg;
				} else {
					msg = $.parseJSON(msg);
				}
				var this_data = msg;
				var shanchu = {
						list: []
					},
					tianjia = {
						list: []
					},
					shanchuDom = [];
				$.each(data.list, function(i, n) {
					var blr = true;
					$.each(this_data.list, function(j, m) {
						if(n.mingcheng == m.mingcheng) {
							blr = false;
						}
					});
					if(blr) {
						shanchu.list.push(n);
					}
				});

				$.each(this_data.list, function(i, n) {
					var blr = true;
					$.each(data.list, function(j, m) {
						if(n.mingcheng == m.mingcheng) {
							blr = false;
						}
					});
					if(blr) {
						tianjia.list.push(n);
					}
				});
				data = this_data;
				//删除
				$.each(shanchu.list, function(i, n) {
					$("#view [name=" + n.mingcheng + "]").addClass('shanchu');
					$("#view2 [name=" + n.mingcheng + "]").addClass('shanchu');
				});
				//添加
				var gettpl = document.getElementById('demo').innerHTML;
				laytpl(gettpl).render(tianjia, function(html) {
					$(document.getElementById('view')).append(html);
				});
				var gettpl = document.getElementById('demo2').innerHTML;
				laytpl(gettpl).render(tianjia, function(html) {
					$(document.getElementById('view2')).append(html);
				});
				//运动
				$('.shanchu').attr('name', 0).fadeOut().remove();
				$.each(data.list, function(i, n) {
					var pmxq_li = $("#view .pmxq_li[name=" + n.mingcheng + "]").attr({
						'paiming': n.paiming,
						'fennei': n.fennei
					});
					pmxq_li.find('.pmxq_pm').html(n.paiming);
					pmxq_li.find('.pmxq_tsl').html(n.tousuliang);
					pmxq_li.find('.pmxq_zbe em').css('width', parseInt(n.zhanbie * 100) + '%').html(n.zhanbie * 100);
					pmxq_li.find('.pmxq_zbe p').html(parseInt(n.zhanbie * 100) + '<bf>%</bf>');
					pmxq_li.find('.pmxq_zbn em').css('width', parseInt(n.zhanbiliang * 100) + '%').html(parseInt(n.zhanbiliang * 100));
					pmxq_li.find('.pmxq_zbn p').html(parseInt(n.zhanbiliang * 100) + '<bf>%</bf>');
					pmxq_li.find('.pmxq_ybn em').eq(0).css('width', n.yuebianliangSJ / 0.3 + '%');
					pmxq_li.find('.pmxq_ybn em').eq(1).css('width', n.yuebianliangSJ / 0.3 + '%');
					pmxq_li.find('.pmxq_ybn p').attr('class', n.yuebianliangSJc).html(n.yuebianliangSJ + '<bf></bf>');
					pmxq_li.find('.pmxq_nbn em').eq(0).css('width', n.nianbianliangSJ + '%');
					pmxq_li.find('.pmxq_nbn em').eq(1).css('width', n.nianbianliangSJ + '%');
					pmxq_li.find('.pmxq_nbn p').attr('class', n.nianbianliangSJc).html(n.nianbianliangSJ + '<bf></bf>');
					var view2_div = $("#view2>div[name=" + n.mingcheng + "]").attr({
						'paiming': n.paiming,
						'fennei': n.fennei
					});
					view2_div.removeClass('pmxq_donghua_div_left pmxq_donghua_div_right pmxq_donghua_div_top');
					if(n.paiming % 9 == 1) {
						view2_div.addClass('pmxq_donghua_div_left');
					};
					if(n.paiming % 9 == 0) {
						view2_div.addClass('pmxq_donghua_div_right');
					};
					if(n.paiming > 9) {
						view2_div.addClass('pmxq_donghua_div_top');
					};
					view2_div.find('.pmmingci').html(n.paiming);
					view2_div.find('.ztsn').html(n.tousuliang);
					view2_div.find('.tousuxiangqing').eq(0).html('被投诉次数：<i>' + n.tousuliang + '</i>次');
					view2_div.find('.tousuxiangqing').eq(1).html('被咨询次数：<i>' + n.beizhixunC + '</i>次');
					view2_div.find('.tousuxiangqing').eq(2).html('被举报次数：<i>' + n.beijubaoC + '</i>次');
				});
				$('.pmxq_li').each(function(i) {
					var this_top = ($(this).attr('paiming') - 1) * 40;
					$(this).css({
						'top': this_top,
						'left': 0
					});
				});
				$('.pmxq_donghua>div').each(function(i) {
					var this_top = ($(this).attr('paiming') - 1) * 40;
					$(this).css({
						'top': this_top,
						'left': 0
					});
				});
				$('.heng>div').each(function(i) {
					var this_top = Math.floor(($(this).attr('paiming') - 1) / 9) * 186;
					var this_left = (($(this).attr('paiming') - 1) % 9) * 124.44;
					$(this).css({
						'top': this_top,
						'left': this_left
					});
				});
				$('.tubiao>div').each(function(i) {
					var this_top = ($(this).attr('paiming') / 100) * 600 + 48;
					var this_left = ($(this).attr('fennei') - 1) * 102 + 10;
					$(this).css({
						'top': this_top,
						'left': this_left
					});
				});

			}
			$(".mssx_1 .Moption").click(function() {
				var mssx_1_val = parseInt($(this).attr('value'));
				$.ajax({
					type: "GET",
					url: "js/pinpaipaiming" + mssx_1_val + ".json",
					success: function(msg) {
						if($.type(msg) == 'object') {
							msg = msg;
						} else {
							msg = $.parseJSON(msg);
						}

						ybjzdh(msg)
					},
					error: function(XMLHttpRequest, textStatus) {
						alert("错误信息: " + textStatus);
					}
				});
			});
			//拖拽时间加载数据
			var tssjtz_d = $('#tssjtz_d');
			var dataStart = tssjtz_d.attr('data-start');
			var dataEnd = tssjtz_d.attr('data-end');
			setInterval(function() {
				if((tssjtz_d.attr('data-start') != dataStart) || (tssjtz_d.attr('data-end') != dataEnd)) {
					dataStart = tssjtz_d.attr('data-start');
					dataEnd = tssjtz_d.attr('data-end');
					var sj_data = (dataEnd - dataStart) % 3 + 1;
					console.log(sj_data);

					$.ajax({
						type: "GET",
						url: "js/pinpaipaiming" + sj_data + ".json",
						success: function(msg) {
							if($.type(msg) == 'object') {
								msg = msg;
							} else {
								msg = $.parseJSON(msg);
							}

							ybjzdh(msg)
						},
						error: function(XMLHttpRequest, textStatus) {
							alert("错误信息: " + textStatus);
						}
					});
				}
			}, 300);
			var data0 = {
				list: [{
					paiming: '1', //排名
					mingcheng: '华为', //名称
					logo: 'img/200x200logo/华为.jpg', //logo
					tousuliang: '54321', //投诉量
					zhanbie: '60', //占销售额比例
					zhanbiliang: '90', //占销售量比例
					yuebianliangS: '40', //月上升比
					yuebianliangJ: '0', //月下降比
					yuebianliangSJ: '12345', //月上升下降量
					yuebianliangSJc: 's', //月上升还是下降sj
					nianbianliangS: '0', //年上升比
					nianbianliangJ: '40', //年下降比
					nianbianliangSJc: 'j', //年上升还是下降sj
					nianbianliangSJ: '2345', //年上升下降量
					mingchengQ: '华为 HUAWEi', //全称
					beizhixunC: '789', //被询问量
					beijubaoC: '123', //被举报量
					fennei: '1', //分类
				}]
			};

			$('.gaishu').click(function() {
				$(this).addClass('a_on').siblings().removeClass('a_on');
				$('.mssx_2').hide();
				gailuecsh();
				$('.pmxq_content_h3').addClass('opacity0');
			});
			$('.paiming').click(function() {
				$(this).addClass('a_on').siblings().removeClass('a_on');
				$('.mssx_2').show();
				paixucsh();
				setTimeout(function() {
					$('.pmxq_ul').css('display', 'block');
					$('.pmxq_donghua').css('display', 'none');
				}, 1500);
				$('.pmxq_content_h3').removeClass('opacity0');
			});
			$('.tubiao').click(function() {
				$(this).addClass('a_on').siblings().removeClass('a_on');
				$('.mssx_2').hide();
				tubiaocsh();
				$('.pmxq_content_h3').addClass('opacity0');
			});
			$('.gaishu').click();
			$('.MoptionO').click(function() {
				$(this).toggleClass('on');
			});
		})();
	};
	//投诉大数据_品牌排名_地图
	if(document.getElementById('pmxq_map')) {
		(function() {
			var dom = document.getElementById("pmxq_map");
			var MapmyChart = echarts.init(dom);
			var Mapoption = null;
			var Mapdata = [];
			var geoCoordMap = {
				"苹果": ["121.564312", "29.8767"],
				"华为": ["113.889108", "22.582441"],
				"三星": ["116.395645", "39.929986"],
				"小米": ["116.422418", "40.03926"],
				"华硕": ["121.488678", "31.259361"],
				"联想": ["116.395645", "39.929986"],
				"魅族": ["113.572443", "22.285315"],
				"宝马": ["116.259551", "40.056451"],
				"别克": ["121.455335", "31.302595"],
				"酷派": ["114.025974", "22.546054"],
				"东风": ["114.3162", "30.581084"],
				"红米": ["116.395645", "39.929986"],
				"丰田": ["116.395645", "39.929986"],
				"阿迪达斯": ["121.487899", "31.249162"],
				"奥迪": ["125.313642", "43.898338"],
				"福特": ["121.487899", "31.249162"],
				"大众": ["121.65264", "31.232241"],
				"雪佛兰": ["121.449854", "31.272556"],
				"凯迪拉克": ["121.455435", "31.205717"],
				"长虹": ["104.745538", "31.473786"],
				"东风本田": ["114.3162", "30.581084"],
				"耐克": ["121.113383", "31.454591"],
				"东风标致": ["114.3162", "30.581084"],
				"意尔康": ["119.929576", "28.4563"],
				"现代": ["116.287063", "39.880667"],
				"天梭": ["121.409331", "31.138877"],
				"HTC": ["121.487899", "31.249162"],
				"良品铺子": ["114.3162", "30.581084"],
				"奇蕾": ["121.487899", "31.249162"],
				"本田": ["114.3162", "30.581084"],
				"魅蓝": ["113.562447", "22.256915"],
				"标致": ["114.3162", "30.581084"],
				"新百伦": ["121.487899", "31.249162"],
				"东风风神": ["114.18105", "30.618025"],
				"沃尔沃": ["121.62372", "31.272272"],
				"一汽大众": ["125.228468", "43.857959"],
				"欧派": ["113.203581", "23.304351"],
				"海尔": ["119.731296", "36.136138"],
				"猫人": ["114.3162", "30.581084"],
				"奔驰": ["116.395645", "39.929986"],
				"百丽": ["121.487899", "31.249162"],
				"索尼": ["116.481453", "39.96327"],
				"格力": ["113.562447", "22.256915"],
				"绿源": ["119.611006", "29.063152"],
				"戴尔": ["118.194256", "24.534002"],
				"雪铁龙": ["114.3162", "30.581084"],
				"北京现代": ["116.190269", "39.920886"],
				"周大福": ["113.831367", "22.733901"],
				"樱花": ["120.970997", "31.388409"],
				"创维": ["113.956332", "22.545081"],
				"长安": ["106.530635", "29.544606"],
				"圣宝龙": ["114.320389", "30.520968"],
				"起亚": ["120.148872", "33.379862"],
				"康佳": ["114.025974", "22.546054"],
				"西门子": ["116.380799", "39.915601"],
				"苏泊尔": ["120.103442", "30.294765"],
				"ONLY": ["117.318015", "39.722298"],
				"OPPO": ["113.763434", "23.043024"],
				"东风日产": ["113.177278", "23.386038"],
				"TCL": ["114.410658", "23.11354"],
				"胖大夫": ["114.3162", "30.581084"],
				"海信": ["113.134026", "23.035095"],
				"格兰仕": ["113.265027", "22.74722"],
				"众泰": ["120.108684", "28.940177"],
				"VIVO": ["113.679036", "22.826529"],
				"盼盼": ["118.558651", "24.729638"],
				"诺基亚": ["116.457217", "39.91388"],
				"美的": ["113.211115", "22.933667"],
				"圣象": ["119.644304", "31.960263"],
				"金立": ["114.283495", "22.73501"],
				"比亚迪": ["114.345419", "22.689403"],
				"光明": ["121.725995", "31.084727"],
				"东风雪铁龙": ["114.3162", "30.581084"]
			};

			var convertData = function(Mapdata, value) {
				var res = [];
				for(var i = 0; i < Mapdata.length; i++) {
					var geoCoord = geoCoordMap[Mapdata[i].name];
					if(geoCoord) {
						res.push({
							name: Mapdata[i].name,
							value: geoCoord.concat(Mapdata[i]['value']),
							'paiming': Mapdata[i].paiming,
						});
					}
				}
				return res;
			};
			var z_index = 0;
			var Mapoption = {
				title: {
					show: false,
					text: 'pingpai'
				},
				tooltip: {
					trigger: 'item',
					position: 'top',
					backgroundColor: 'none'
				},
				geo: {
					map: 'china',
					zoom: 1.2,
					label: {
						emphasis: {
							show: false
						}
					},
					roam: true,
					itemStyle: {
						normal: {
							areaColor: '#eee',
							borderColor: '#bbb'
						},
						emphasis: {
							areaColor: '#f1f1f1'
						}
					}
				},
				series: [{
					name: '投诉',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(Mapdata, 'value'),
					symbolSize: function(val) {
						return val[2] / 2 + 10;
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					tooltip: {
						formatter: function(_this) {
							var relVal = "<div class='map_tsxq'><div><i><img src='img/200x200logo/" + _this.name + ".jpg'/></i> <h5>" + _this.name + "</h5></div><span>被投诉次数：<em>" + _this.value[2] + "</em>次</span><span>被投诉排名：<em>" + _this.data.paiming + "</em>名</span><i class='xx'></i></div>";
							return relVal;
						}
					},
					itemStyle: {
						normal: {
							color: 'rgba(255,0,51,0.6)',
							shadowBlur: 10,
							shadowColor: 'rgba(255,0,51,0.6)',
						}
					},
					zlevel: 1
				}, {
					name: '咨询',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					data: convertData(Mapdata, 'value2'),
					symbolSize: function(val) {
						return val[2] / 2 + 10;
					},
					showEffectOn: 'render',
					rippleEffect: {
						brushType: 'stroke'
					},
					hoverAnimation: true,
					tooltip: {
						formatter: function(_this) {
							var relVal = "<div class='map_tsxq'><div><i><img src='img/200x200logo/" + _this.name + ".jpg'/></i> <h5>" + _this.name + "</h5></div><span>被咨询次数：<em>" + _this.value[2] + "</em>次</span><span>被咨询排名：<em>" + _this.data.paiming + "</em>名</span><i class='xx'></i></div>";
							return relVal;
						}
					},
					itemStyle: {
						normal: {
							color: 'rgba(170,0,17,0.6)',
							shadowBlur: 10,
							shadowColor: 'rgba(70,0,17,0.6)',
						}
					},
					zlevel: 1
				}]
			};
			if(Mapoption && typeof Mapoption === "object") {
				MapmyChart.setOption(Mapoption, true);
			};
			var params_name = "中国";
			MapmyChart.on('mousedown', function(params) {
				var iii = 0;
				var _params = params;
				setTimeout(function() {
					iii++
				}, 500);
				$(window).mouseup(function() {
					if(iii == 0) {
						// 创建地址解析器实例
						var myGeo = new BMap.Geocoder();
						// 将地址解析结果显示在地图上,并调整地图视野
						myGeo.getPoint(params.name, function(point) {
							//移动地图
							if(params.name != params_name) {
								MapmyChart.setOption({
									geo: {
										center: [point.lng, point.lat],
										zoom: 4
									}
								});
								params_name = params.name;
							} else {
								MapmyChart.setOption({
									geo: {
										center: null,
										zoom: 1.2
									}
								});
								params_name = "中国";
							}
						}, params.name);
					}
				});
			});
			var ybjzdh = function(data) {
				Mapdata = data.list;
				MapmyChart.setOption({
					series: [{
						data: convertData(Mapdata, 'value')
					}, {
						data: convertData(Mapdata, 'value2')
					}]
				});

			};
			$.ajax({
				type: "GET",
				url: "js/pinpaipaiming_map1.json",
				success: function(msg) {
					if($.type(msg) == 'object') {
						msg = msg;
					} else {
						msg = $.parseJSON(msg);
					}
					ybjzdh(msg);
				},
				error: function(XMLHttpRequest, textStatus) {
					alert("错误信息: " + textStatus);
				}
			});
			//时间轴拖拽
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
					if(parseInt(_this.css('left')) + (ev.pageX - pvrPageX) < 50) return false;
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
					if(parseInt(_this.css('left')) + (ev.pageX - pvrPageX) > 1050) return false;
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
			$('.mssx_1 .Moption').eq(0).click(function() {
				MapmyChart.setOption({
					series: [{
						data: convertData(Mapdata, 'value')
					}, {
						data: null
					}]
				});

			});
			$('.mssx_1 .Moption').eq(1).click(function() {
				MapmyChart.setOption({
					series: [{
						data: null
					}, {
						data: convertData(Mapdata, 'value2')
					}]
				});
			});
			//拖拽时间加载数据
			var tssjtz_d = $('#tssjtz_d');
			var dataStart = tssjtz_d.attr('data-start');
			var dataEnd = tssjtz_d.attr('data-end');
			setInterval(function() {
				if((tssjtz_d.attr('data-start') != dataStart) || (tssjtz_d.attr('data-end') != dataEnd)) {
					dataStart = tssjtz_d.attr('data-start');
					dataEnd = tssjtz_d.attr('data-end');
					var sj_data = (dataEnd - dataStart) % 3 + 1;
					console.log(sj_data);

					console.log(sj_data);
					$.ajax({
						type: "GET",
						url: "js/pinpaipaiming_map" + sj_data + ".json",
						success: function(msg) {
							if($.type(msg) == 'object') {
								msg = msg;
							} else {
								msg = $.parseJSON(msg);
							}

							ybjzdh(msg);
						},
						error: function(XMLHttpRequest, textStatus) {
							alert("错误信息: " + textStatus);
						}
					});
				}
			}, 300);
		})();
	}
	//搜索
	if(document.getElementById('pjxtss_form')) {
		$('.sousuo_xz input').change(function() {
			$(this).parent().addClass('label_checked').siblings().removeClass('label_checked');
			var this_index = $(this).index('.sousuo_xz input')
			if(this_index == 0) {
				$('.text').attr('placeholder', '请输入企业名、人名、产品名等，多关键词用空格隔开，如“武汉 东湖”');
			};
			if(this_index == 1) {
				$('.text').attr('placeholder', '请输入企业名称、注册号或统一社会信用代码，如“微软”');
			};
			if(this_index == 2) {
				$('.text').attr('placeholder', '请输入法人名称或股东名称，如“刘强东”');
			};
			if(this_index == 3) {
				$('.text').attr('placeholder', '请输入品牌或产品的关键字，如“东湖大数据”');
			};
			if(this_index == 4) {
				$('.text').attr('placeholder', '请输入企业注册地址、联系电话、邮箱或网址，如“国创大厦”');
			};
			if(this_index == 5) {
				$('.text').attr('placeholder', '请输入企业经营范围，如“互联网”');
			};

		});
	}
	//投诉地图
	if(document.getElementById('tousuditu')) {
		(function() {
			var dom = document.getElementById("tousuditu");
			var MapmyChart = echarts.init(dom);
			var convertData = [];
			var convertData1 = [];
			var convertData2 = [];
			var convertData3 = [];
			var inRangeColor = [
				['#9b97f4', '#9b97f4'],
				['#73c2ff', '#73c2ff'],
				['#6fe8d3', '#6fe8d3']
			];
			var Mapoption = {
				title: {
					show: false,
					text: '武汉市工商投诉地图'
				},
				tooltip: {},
				bmap: {
					center: [114.299758, 30.56087],
					zoom: 12,
					roam: true,
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
				visualMap: {
					min: 0,
					max: 100,
					show: false,
					color: inRangeColor[0].reverse()
				},
				series: {
					name: '',
					type: 'scatter',
					coordinateSystem: 'bmap',
					data: convertData,
				}
			};
			if(Mapoption && typeof Mapoption === "object") {
				MapmyChart.setOption(Mapoption, true);
			};
			var ybjzdh = function(dataobj, ii) {
				var maxV = 30;
				if(ii == 2) {
					maxV = 30
				};
				if(ii == 3) {
					maxV = 30
				};
				MapmyChart.setOption({
					visualMap: {
						inRange: {
							max: maxV,
							color: inRangeColor[ii - 1]
						}
					},
					series: {
						data: dataobj,
					}
				});

			};
			var convertDataFn = function() {
				convertData1 = [];
				convertData2 = [];
				convertData3 = [];
				for(var i = 0, len = convertData.length; i < len; i++) {
					var name = convertData[i].name;
					var value = convertData[i].value;
					if(value[2] != 0) {
						convertData1.push({
							"name": name,
							"value": [value[0], value[1], value[2]]
						});
					}
					if(value[3] != 0) {
						convertData2.push({
							"name": name,
							"value": [value[0], value[1], value[3]]
						});
					}
					if(value[4] != 0) {
						convertData3.push({
							"name": name,
							"value": [value[0], value[1], value[4]]
						});
					}
				}
			};
			$.ajax({
				type: "GET",
				url: "js/quyupaiming_map1.json",
				success: function(msg) {
					if($.type(msg) == 'object') {
						msg = msg;
					} else {
						msg = $.parseJSON(msg);
					}
					//alert($.type(msg));
					convertData = msg.list;
					convertDataFn();
					ybjzdh(convertData1, 1);
				},
				error: function(XMLHttpRequest, textStatus) {
					alert("错误信息: " + textStatus);
				}
			});

			//时间轴
			//时间轴初始化(伪)
			var a_height = 30;
			$('.tssjtz_2_bg_d .ri a').each(function() {
				a_height = a_height + (Math.random() - 0.5) * 5;
				if(a_height > 60) {
					a_height = 60
				};
				if(a_height < 5) {
					a_height = 5
				};
				$(this).css('height', a_height);
			});
			var aW = $('.ri a').outerWidth(true);
			var pvrL = parseInt($('.tssjtz_2_pvr').css('left'));
			$('#tssjtz_d').attr('data-start', Math.round(pvrL / aW))
			var netL = parseInt($('.tssjtz_2_net').css('left'));
			$('#tssjtz_d').attr('data-end', Math.round(netL / aW));
			$('.tssjtz_2_pvr').mousedown(function(ev) {
				var _this = $(this);
				$(window).mousemove(function(ev) {
					SjzTzFn(ev);
				});
				$(window).mouseup(function() {
					SjzTzFn2();
				});
				var pvrPageX = ev.pageX;
				var SjzTzFn = function(ev) {
					if(parseInt(_this.css('left')) + (ev.pageX - pvrPageX) < 0) return false;
					_this.css('left', '+=' + (ev.pageX - pvrPageX));
					var pr = /[\(\)\s]/;
					var aClip = $('.pvr_net').css('clip').split(pr);
					var aClipR = parseInt(aClip[2]);
					var aClipL = parseInt(aClip[4]) + ev.pageX - pvrPageX;
					var oclip = 'rect(0px,' + aClipR + 'px,60px,' + aClipL + 'px)';
					$('.pvr_net').css('clip', oclip);
					pvrPageX = ev.pageX;
				};
				var SjzTzFn2 = function() {
					SjzTzFn = SjzTzFn2 = function() {};
					var aW = $('.ri a').outerWidth(true);
					var pvrL = parseInt($('.tssjtz_2_pvr').css('left'));
					$('#tssjtz_d').attr('data-start', Math.round(pvrL / aW))
				}
			});
			$('.tssjtz_2_net').mousedown(function(ev) {
				var _this = $(this);
				$(window).mousemove(function(ev) {
					SjzTzFn(ev);
				});
				$(window).mouseup(function() {
					SjzTzFn2();
				});
				var pvrPageX = ev.pageX;
				var SjzTzFn = function(ev) {
					if(parseInt(_this.css('left')) + (ev.pageX - pvrPageX) > 1116) return false;
					_this.css('left', '+=' + (ev.pageX - pvrPageX));
					var pr = /[\(\)\s]/;
					var aClip = $('.pvr_net').css('clip').split(pr);
					var aClipR = parseInt(aClip[2]) + ev.pageX - pvrPageX;
					var aClipL = parseInt(aClip[4]);
					var oclip = 'rect(0px,' + aClipR + 'px,60px,' + aClipL + 'px)';
					$('.pvr_net').css('clip', oclip);
					pvrPageX = ev.pageX;
				};
				var SjzTzFn2 = function() {
					SjzTzFn = SjzTzFn2 = function() {};
					var aW = $('.ri a').outerWidth(true);
					var netL = parseInt($('.tssjtz_2_net').css('left'));
					$('#tssjtz_d').attr('data-end', Math.round(netL / aW));
				}
			});
			//拖拽时间加载数据
			var tssjtz_d = $('#tssjtz_d');
			var dataStart = tssjtz_d.attr('data-start');
			var dataEnd = tssjtz_d.attr('data-end');
			setInterval(function() {
				if((tssjtz_d.attr('data-start') != dataStart) || (tssjtz_d.attr('data-end') != dataEnd)) {
					dataStart = tssjtz_d.attr('data-start');
					dataEnd = tssjtz_d.attr('data-end');
					var sj_data = (dataEnd - dataStart) % 3 + 1;
					$.ajax({
						type: "GET",
						url: "js/quyupaiming_map" + sj_data + ".json",
						success: function(msg) {
							if($.type(msg) == 'object') {
								msg = msg;
							} else {
								msg = $.parseJSON(msg);
							}
							//alert($.type(msg));
							convertData = msg.list;
							convertDataFn();
							ybjzdh(convertData1, 1);
						},
						error: function(XMLHttpRequest, textStatus) {
							alert("错误信息: " + textStatus);
						}
					});
				}
			}, 300);
			$('.ri a').click(function() {
				var a_data = Math.ceil(Math.random() * 3);
				$.ajax({
					type: "GET",
					url: "js/quyupaiming_map" + a_data + ".json",
					success: function(msg) {
						if($.type(msg) == 'object') {
							msg = msg;
						} else {
							msg = $.parseJSON(msg);
						}
						//alert($.type(msg));
						convertData = msg.list;
						convertDataFn();
						ybjzdh(convertData1, 1);
					},
					error: function(XMLHttpRequest, textStatus) {
						alert("错误信息: " + textStatus);
					}
				});
			});
			//展开隐藏
			$('#paiming_zsyc').click(function() {
				$('.tssjtz_2_d').toggleClass('off');
			});
			$('.xxvv .xx').click(function() {
				$(this).toggleClass('xxzz');
				$('.xxvv .vv').slideToggle();
			});
			$('.xxvv .vv a').click(function() {
				$(this).addClass('a_on').siblings().removeClass('a_on');
			});
			//加载数据
			$('.xxvv .vv a').eq(0).click(function() {
				ybjzdh(convertData1, 1);
			});
			$('.xxvv .vv a').eq(1).click(function() {
				ybjzdh(convertData2, 2);
			});
			$('.xxvv .vv a').eq(2).click(function() {
				ybjzdh(convertData3, 3);
			});
			$('.MoptionO').click(function() {
				$(this).toggleClass('on');
			});
		})();
	}

	/*搜索伪*/
	$('#submit1').click(function() {
		window.open('企业征信_搜索_列表页.html', '_self');
		return false;
	});
	$('#submit2').click(function() {
		$('.sousuo_c_c').css('display', 'block')
		return false;
	});
	/*品牌排行*/
	$('.tubiao').click(function() {
		$('.sxtj .Mselect').eq(0).hide();
		$('.sxtj .Mselect').eq(1).hide();
	});
	$('.gaishu, .paiming').click(function() {
		$('.sxtj .Mselect').eq(0).show();
		$('.sxtj .Mselect').eq(1).show();
	});

})