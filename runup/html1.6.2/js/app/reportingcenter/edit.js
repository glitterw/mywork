// JavaScript Document
document.createElement("header"); //iyt
document.createElement("footer"); //iyj
document.createElement("nav"); //idh
document.createElement("section"); //ik
document.createElement("wrap"); //ibg
document.createElement("content"); //inr
$(function() {
	
	
	
	$.ajaxSetup({
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		complete:function(XMLHttpRequest,textStatus){
			var status = parseInt(XMLHttpRequest.status);
		    //通过XMLHttpRequest取得响应头，sessionstatus，  
	        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");
	        	//如果超时就处理 ，指定要跳转的页面  
	        if(sessionstatus=="timeout" || status == "401"){  
	        	window.location = "/login"; 
	        } 
		},
		error: function (xhr, status, e) { },
		beforeSend:function(){
			//全局 loading 显示
			//console.log(layer_load_index);
	    }
	});
	
	
	//判断IE,判断火狐
	ie = !-[1, ];
	FF = !!navigator.userAgent.match(/firefox/i);
	PC = !navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	Mobile = !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
	//var ev=ev||event;ev.preventDefault();window.event.returnValue=false; return false;
	//input的val改变事件$('.text').input(function() {this})
	$.fn.input = function(Fn) {
		if(ie) {
			$(this).on('propertychange', function() {
				Fn.apply(this);
			})
		} else {
			$(this).on('input', function() {
				Fn.apply(this);
			})
		}
	};
	//滚轮滚动事件$(document).mousewheel(function() {this.Down});
	$.fn.mousewheel = function(Fn) {
		if(FF) {
			$(this).on('DOMMouseScroll', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.detail > 0);
				Fn.apply(this);
			})
		} else {
			$(this).on('mousewheel', function(ev) {
				var oEvent = ev || event;
				this.Down = (oEvent.originalEvent.wheelDelta < 0);
				Fn.apply(this);
			})
		}
	};
	//拖拽事件$('.move').move(function() { $(this).css({ 'left': '+=' + this.pageXc, 'top': '+=' + this.pageYc }); });
	$.fn.move = function(Fn) {
		$(this).on('mousedown', function(ev) {
			this.pageXc = this.pageYc = 0;
			var _this = this,
				pvrPageX = ev.pageX,
				pvrPageY = ev.pageY;
			$(document).on('mousemove.thisMove', function(ev) {
				ev.preventDefault();
				_this.pageXc = ev.pageX - pvrPageX;
				_this.pageYc = ev.pageY - pvrPageY;
				Fn.apply(_this);
				pvrPageX = ev.pageX;
				pvrPageY = ev.pageY;
			});
			$(document).on('mouseup.thisMove', function(ev) {
				$(this).off('mousemove.thisMove mouseup.thisMove');
			});
			//$(this).on('dragend', function(ev) {
			//	setTimeout(function() {
			//		$(document).mouseup();
			//	}, 10);
			//});
		});
	};
	//模拟input滑块事件$('#range .mea').move(rangeFn);
	rangeFn = function() {
		var _thisParent = $(this).parent();
		var _thisParentLeftMin = 0;
		var _thisParentLeftMax = _thisParent.width();
		var _thisStep = (_thisParentLeftMax - _thisParentLeftMin) * _thisParent.attr('step') / (_thisParent.attr('max') - _thisParent.attr('min'));
		var _thisLeft = parseFloat($(this).css('left')) + this.pageXc;
		if(_thisLeft >= _thisParentLeftMin && _thisLeft <= _thisParentLeftMax) {
			$(this).css({
				'left': _thisLeft,
			});

			$(this).attr('value', Math.round(_thisLeft / _thisStep) * _thisParent.attr('step'));
		};
	};
	//鼠标框选事件$('.drag-area').dragaarea(function(ev) {this.areachecked/*框选中的元素class:in-area;*/});
	//默认可框选元素class='in-area';
	$.fn.dragaarea = function(Fn) {
		$(this).mousedown(function(ev) {
			var downthis = this,
				oArea = $(this),
				aDom = oArea.find('.in-area'),
				aDragArea = [],
				aDragAreachecked = [],
				mDown = {
					'pageX': ev.pageX,
					'pageY': ev.pageY
				},
				mMove = {};
			aDom.removeClass('area-checked');
			aDom.each(function(i) {
				var _this = $(this),
					thisOffLeft = _this.offset().left,
					thisOffTop = _this.offset().top,
					oDragArea = {
						'index': i,
						'checked': false,
						'offsetLeft': thisOffLeft,
						'offsetTop': $(this).offset().top,
						'offsetRight': thisOffLeft + this.offsetWidth,
						'offsetBottom': thisOffTop + this.offsetHeight
					};
				aDragArea.push(oDragArea);
			});

			$(document).on('mousemove.thisDragArea', function(ev) {
				ev.preventDefault();
				mMove = {
					'pageX': ev.pageX,
					'pageY': ev.pageY
				};
				aDragAreachecked = [];
				$.each(aDragArea, function(i, n) {
					if((n['offsetLeft'] >= mDown['pageX']) && (n['offsetTop'] >= mDown['pageY']) && (n['offsetRight'] <= mMove['pageX']) && (n['offsetBottom'] <= mMove['pageY'])) {
						if(!n['checked']) {
							n['checked'] = true;
						};
					} else {
						if(n['checked']) {
							n['checked'] = false;
						};
					};
					if(n['checked']) {
						aDragAreachecked.push(aDom.get(n['index']));
					};
				});
				downthis.areachecked = aDragAreachecked;
				Fn.apply(downthis);
			});
			$(document).on('mouseup.thisDragArea', function(ev) {
				$(this).off('mousemove.thisDragArea mouseup.thisDragArea');
			});
		});
	};
	//空格验证 $('.kgyz').on('focus',focus_null);
	focus_null = function() {
		$(this).next().css('display', 'none');
		$(this).blur(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			};
		});
	};
	//初始状态,空格验证 text_load('.kgyz');
	text_load = function(obj) {
		$(obj).each(function() {
			var x = this.value;
			var patt = /\S/;
			var result = !patt.test(x);
			if(result) {
				this.value = '';
				$(this).next().css('display', '');
			} else {
				$(this).next().css('display', 'none');
			};
		});
	};
	//模拟滚动条调用

	if(PC && $('.MScroll').size() > 0) {
		(function() {
			var oLink = document.createElement("link");
			oLink.id = "mCustomScrollbarCSS";
			oLink.href = "/js/mCustomScrollbar/jquery.mCustomScrollbar.min.css";
			oLink.rel = "stylesheet";
			oLink.type = "text/css";
			document.getElementsByTagName('body')[0].appendChild(oLink);
			var oScript = document.createElement("script");
			oScript.id = "mCustomScrollbarJS";
			oScript.type = "text/javascript";
			oScript.src = "/js/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js";
			document.getElementsByTagName('body')[0].appendChild(oScript);
			oScript.onload = function() {
				$(".MScroll").not('.MScrollyx').mCustomScrollbar({
					scrollButtons: {
						enable: false,
						scrollType: "continuous",
						scrollSpeed: 20,
						scrollAmount: 40
					},
					horizontalScroll: false,
				});

				$(".MScrollyx").mCustomScrollbar({
					axis: "yx",
					scrollButtons: {
						enable: false,
						scrollType: "continuous",
						scrollSpeed: 20,
						scrollAmount: 40
					},
					theme: "light-thick",
					callbacks: {
						whileScrolling: function() {
							if($(this).find('.fixed_top').size() > 0) {
								var containerLT = $(this).find('.mCSB_container');
								var top = parseFloat(containerLT.css('top')) * -1;
								$(this).find('.fixed_top').css('top', top);
							}
							if($(this).find('.fixed_left').size() > 0) {
								var containerLT = $(this).find('.mCSB_container');
								var left = parseFloat(containerLT.css('left')) * -1;
								$(this).find('.fixed_left').css('left', left);
							}
							/*if($('.gzb_table').size() > 0) {
								var biaoti_tr = $('.biaoti_tr').eq(1);
								var biaoti_trLT = $('.gzb_table').parent('.mCSB_container');
								var top = parseFloat(biaoti_trLT.css('top')) * -1;
								biaoti_tr.css('top', top);
							}*/
							if($('.excel-table').size() > 0) {
								var biaoti_tr = $('.excel-table .thead').eq(1);
								var biaoti_trLT = $('.excel-table').parent('.mCSB_container');
								var top = parseFloat(biaoti_trLT.css('top')) * -1;
								biaoti_tr.css('top', top);
							}
							if($('.chart-table .table-mb').size() > 0) {
								var biaoti_tr = $('.chart-table .thead').eq(1);
								var biaoti_trLT = $('.chart-table .table-mb').parent('.mCSB_container');
								var top = parseFloat(biaoti_trLT.css('top')) * -1;
								biaoti_tr.css('top', top);
							}
						}
					}
				});
			};
		})();
	};

	//模拟下拉框
	(function() {
		$(document).on('click', '.Mchecked', function() {
			$(this).toggleClass('Mchecked_on');
			$(this).siblings().slideToggle();
		});
		$(document).on('click', '.Moption', function() {
			$(this).parents('.MoptionBox').slideUp().siblings().removeClass('Mchecked_on');
		});
		$(document).on('mouseleave', '.Mselect', function() {
			$(this).children('.MoptionBox').slideUp().siblings().removeClass('Mchecked_on');
			$(this).find('.xiala_p').removeClass('on');
			$(this).find('.xiala_d').hide();
		});
	})();
	//分页PageFn('Mpage1','hrefPage');
	PageFn = function(opage, hrefPage) {
		if(!document.getElementById('laypageJS')) {
			$('body').append("<script id='laypageJS' type='text/javascript' src='js/laypage.js'></script>");
		};
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				//通过url获取当前页，也可以同上（pages）方式获取
				var str = "/" + hrefPage + "=(\\d+)/";
				var reg = eval(str);
				var page = location.search.match(reg);
				return page ? page[1] : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					var search = location.search;
					var str = "/" + hrefPage + "=(\\d+)/";
					var reg = eval(str);
					var page = location.search.match(reg);
					if(page) {
						search = search.replace(reg, hrefPage + '=' + e.curr);
					} else if(!search) {
						search = search + '?' + hrefPage + '=' + e.curr;
					} else {
						search = search + '&' + hrefPage + '=' + e.curr;
					}
					location.href = search;
				}
			}
		});
		MPage.find('.laypage_skip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypage_skip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};
	PageFnAjax = function(opage, ObjFn) {
		if(!document.getElementById('laypageJS')) {
			$('body').append("<script id='laypageJS' type='text/javascript' src='js/laypage.js'></script>");
		};
		var MPage = $(opage);
		var thisPages = MPage.attr('data-pages');
		//分页主体插件调用
		laypage({
			cont: MPage,
			pages: thisPages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
			skip: true, //是否开启跳页
			last: thisPages, //用于控制尾页
			prev: false, //隐藏上一页按钮
			next: false, //隐藏下一页按钮
			groups: 5, //连续显示分页数
			curr: function() {
				return MPage.attr('data-curr') ? MPage.attr('data-curr') : 1;
			}(),
			jump: function(e, first) { //触发分页后的回调
				if(!first) { //一定要加此判断，否则初始时会无限刷新
					MPage.attr('data-curr', e.curr);
					ObjFn();
					MPage.find('.laypage_skip').attr({
						'max': thisPages,
						'type': 'text'
					});
				}
			}
		});
		MPage.find('.laypage_skip').attr({
			'max': thisPages,
			'type': 'text'
		});
		//分页页码不存在时弹层
		MPage.find('.laypage_skip').on('keyup', function() {
			if(parseFloat(this.value) > parseFloat(this.max) || parseFloat(this.value) < parseFloat(this.min)) {
				alert('页码不存在!');
				this.value = this.min;
			}
		});
	};
	
	isChinese = function(str){  //判断是不是中文  
		var reCh=/[u00-uff]/;  
		return !reCh.test(str);  
	}  

	lenStat = function(target){  
	    var strlen=0; //初始定义长度为0  
	    var txtval = $.trim(target);  
	    for(var i=0;i<txtval.length;i++){  
	     if(isChinese(txtval.charAt(i))==true){  
	      strlen=strlen+2;//中文为2个字符  
	     }else{  
	      strlen=strlen+1;//英文一个字符  
	     }  
	    }  
	    strlen=Math.ceil(strlen/2);//中英文相加除2取整数  
	    return strlen;  
	} 

	checkLen = function(str, min, max, lessMsg, moreMsg){
		var length = lenStat(str);
		if(length < min){
			layer.msg(lessMsg);
			return false;
		}
		if(length > max){
			layer.msg(moreMsg);
			return false;
		}
		return true;
	}
	
	cutStr = function(str, len){
		var length = lenStat(str);
		if(length > len){
			return str.substring(0, len) + "...";
		}else{
			return str;
		}
	}
	
	checkNull = function(str){
		if(str == null){
			return true;
		}
		if($.trim(str) == 0){
			return true;
		}
		return false;
	}
	
	tag = function(){
		$("#tag_name").blur(function() {
			var tag_name = $("#tag_name").val();
			var flag = checkLen(tag_name, 0, 20, "", "标签不可超过20个字");
			if(flag && !checkNull(tag_name)){
				$.ajax({
					type : "post",
					url : "/tag/add",
					data : {
						tag_name : $.trim(tag_name)
					},
					success : function(json) {
						if (json.status == "success") {
							var data = json.data;
							var tag_id = data.id;
							$("#tag_id").val(tag_id);
						}
					}
				});
			}else{
				return false;
			}
		});
	}
	
	$("#expandAllBtn").click(function() {
		$.fn.zTree.getZTreeObj('treeDom').expandAll(true);
	});
	/*全部节点折叠 */
	$("#collapseAllBtn").click(function() {
		$.fn.zTree.getZTreeObj('treeDom').expandAll(false);
	});
	
	tableFixed = function() {
		$('.table_box').each(function() {
			var _this = $(this);
			_this.find('#table_content').css({
				'width': parseFloat(_this.find('#table_content table').css('width')) + 24,
				'height': parseFloat(_this.find('#table_content table').css('height')) + 24
			})
			_this.css('height', _this.find('#table_content').css('height'));
			if(_this.find('#fixed_top').size()>0) {
				_this.find('#table_fixed_top').html('<table><tr>' + _this.find('#fixed_top').html() + '</tr></table>');
				var fixed_top_th = _this.find('#fixed_top th,#fixed_top td');
				var table_fixed_top_th = _this.find('#table_fixed_top th,#table_fixed_top td');
				setTimeout(function(){
					table_fixed_top_th.each(function(i) {
						$(this).css('width', fixed_top_th.eq(i).outerWidth());
					});
				},10);
			}
			if(_this.find('#fixed_left').size()>0) {
				var fixed_left_table = '<table>';
				var td_left = _this.find('#fixed_left').position().left;
				_this.find('#table_content tr').each(function(i) {
					var fixed_left_table_td = '';
					$(this).children().each(function() {
						if($(this).position().left <= td_left) {
							fixed_left_table_td += this.outerHTML;
						}
					});
					fixed_left_table += '<tr>' + fixed_left_table_td + '</tr>';
					if(i == 0) {
						_this.find('#table_fixed_left_top').html(fixed_left_table + '</table>');
					}
				});
				fixed_left_table += '</table>';
				_this.find('#table_fixed_left').html(fixed_left_table);

				var fixed_left_P_C = _this.find('#fixed_left').parent().children();
				_this.find('#table_fixed_left tr:eq(0)').children().each(function(i) {
					$(this).css({
						'width': fixed_left_P_C.eq(i).css('width'),
						'height': fixed_left_P_C.eq(i).css('height')
					});
				});

				_this.find('#table_fixed_left tr').children().each(function(i) {
					if($(this).attr('rowspan') >= 2) {
						var thisHeight = 36 * $(this).attr('rowspan');
						$(this).css('height', thisHeight);
					}
				});

				_this.find('#table_fixed_left_top tr').children().each(function(i) {
					$(this).css({
						'width': fixed_left_P_C.eq(i).css('width'),
						'height': fixed_left_P_C.eq(i).css('height')
					});
				});
			}
		});
	};
	initScroll = function(){
		$(".table_box").mCustomScrollbar({
			axis: "yx",
			scrollButtons: {
				enable: false,
				scrollType: "continuous",
				scrollSpeed: 20,
				scrollAmount: 40
			},
			theme: "light-thick",
			callbacks: {
				whileScrolling: function() {
					if($(this).find('.fixed_top').size() > 0) {
						var containerLT = $(this).find('.mCSB_container');
						var top = parseFloat(containerLT.css('top')) * -1;
						$(this).find('.fixed_top').css('top', top);
					}
					if($(this).find('.fixed_left').size() > 0) {
						var containerLT = $(this).find('.mCSB_container');
						var left = parseFloat(containerLT.css('left')) * -1;
						$(this).find('.fixed_left').css('left', left);
					}
				}
			}
		});
	};
});


var app = angular.module("app",["ui.router"]);
var edit_text_lock = true;
app.controller("bodyController", function($scope,$timeout,$state,$location,commonService,commonData) {
	var gridster_WHTLAll = [];
	var gridster;
	var create_chart_id;
	var edit_text_chart_id;
	var is_editing = false;
	var fillStyle = "#FFFFFF";
	var layercheck = function(value){
		layer.msg(value,{
			time: 2000
		});
		return false;
	}
	$scope.data = {};
	$scope.container = {
			
	};
	
	$('#tipContent').css('display', 'none');
	var imgurl_queue = [];
	var chart_list = [];
	var ue;
	var queue = {
			list:[],
			num:0,
			insert:function(obj){
				var _this = this;
				var id = obj.id;
				var index = _this.checkExist(id);
				if(index > -1){//如果存在则替换
					_this.list[index] = obj;
				}else{
					_this.list.push(obj);
				}
			},
			checkExist:function(id){
				var index = -1;
				var _list = this.list;
				if(_list && _list.length > 0){
					for(var i = 0;i < _list.length;i++){
						if(_list[i].id == id){
							index = i;
							break;
						}
					}
				}
				return index;
			}
	};
	
	var gol_chartIds;
	
	
	$scope.fn = {
			loadInfo:function(){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				$("#reportEdit").show();//防止页面闪烁
				layer.load(0, {shade: false});
				commonService.post({
					url:'/reporting/findReporting',
					params :{ dashboardid :base_dashboardid}
				}).success(function(res){		
					layer.closeAll('loading');
					if(res.status == "success"){
						var data  = res.data;
						 $scope.data = data.dashboard;
						 var chartIds = data.chartIds;
						 var time = data.time;
						 gol_chartIds = chartIds;
						 
						 $("#fill_box").html(data.templateContent);
						 $("#insertText .mCSB_container").html(data.templateText);
						 $("#templateList .mCSB_container").html(data.templateList);
						 _this.initGridster(chartIds);
						_this.initChartList();
					}else{
						layercheck(json.message);
					}
				});
			},
			initChartList:function(){
				var params = {type:"init"};
				this.showPosition(params);
			},
			goback:function(){
				if(gol_chartIds && gol_chartIds.length > 0){
					this.calculationCover();
				}else{
					window.location.href="/reporting";
				}
			},
			calculationCover:function(time){
				var _this = this;
				var num = 0.75;
				$('.contentBox').addClass('editoring').removeClass('active');
				$('.handleBox').css('border','none');
				var width = $("#fill_box").width();//$("#fill_box").width();
				var height = $("#fill_box").height();	
				var _height = width*num;				
				html2canvas($("#fill_box"), {
					onrendered: function(canvas) {
						var url = canvas.toDataURL();
						var img = document.createElement("img");
						img.src = url;
						img.onload=function () {
							var canvas2 = document.createElement("canvas");
							canvas2.width = width;
							canvas2.height = _height;
							var ctx2 = canvas2.getContext("2d");
							ctx2.fillStyle = fillStyle;
							ctx2.fillRect(0,0,width,_height);
							ctx2.drawImage(img, 0, 0, width, height);
							var img2 = document.createElement("img");
							var img_url = canvas2.toDataURL("png");
							$scope.fn.uploadCover(img_url);
						}
						//document.removeChild(img);
						//document.removeChild(img2);
					}
				});
			},
			uploadCover:function(url){
				var base_dashboardid =  $("#base_dashboardid").val();
				$.ajax({
					type: "post",
					url: "/reporting/edit/uploadCover",
					data: {
						imgurl : url,
						dashboardid:base_dashboardid
					},
					success: function(json) {
						if(json.status == "success"){
						}
						window.location.href="/reporting";
					}
				});
			},
			searchSelect:function(chartid,dashboard_id){
				var params = {type:"",chartid:chartid,dashboard_id:dashboard_id};
				this.showPosition(params);
			},
			showPosition:function(obj){
				var _this = this;
				layer.load(0, {shade: false});
				commonService.post({
					url:'/reporting/edit/showPosition',
					params :obj
				}).success(function(res){		
					layer.closeAll('loading');
					if(res.status == "success"){
						var data = res.data;
						var searchType = data.searchType;
						if(searchType == 1 || searchType == 2){
							var folders = data.folders;
							var chartList = data.chartList;
							var seleted_name = data.seleted_name || "请选择";
							var seleted_id = data.seleted_id || "";
							_this.renderChartList(chartList);
							$scope.container.chartList = chartList;
							$scope.container.folders = folders
							$scope.container.selected_folder_name = seleted_name;
							$scope.container.selected_folder_id = seleted_id;
						}else if(searchType == 3){
							var chartList = data.chartList;
							_this.renderChartList(chartList);
							$scope.container.chartList = chartList;
						}
					}else{
						layercheck(json.message);
					}
				});
			},
			renderChartList:function(chartList){
				var _this = this;
				if(chartList && chartList.length > 0){
					for(var i = 0;i < chartList.length;i++){
						var chart = chartList[i];
						var chart_type = chart.chart_type;
						
						var chartIcon = _this.getChartIcon(chart_type);
						if(chartIcon){
							chart.image = chartIcon.image;
							chart.iconname = chartIcon.name;
							chart.show = true;
						}
					}
				}
			},
			getChartIcon:function(type){
				var chartIconList = commonData.chartIconList;
				var chartIcon = null;
				for(var i = 0;i < chartIconList.length;i++){
					var data = chartIconList[i];
					if(type == data.type){
						chartIcon = data;
						break;
					}
				}
				return chartIcon;
			},
			searchInput:function(){
				setTimeout(function() {
					var key = $("#keyword").val();
					if(key){
						$scope.fn.autocomplete(key);
						$('#tipContent').css('display', 'block');
					}else{
						$scope.fn.initChartList();
						$('#tipContent').css('display', 'none');
					}
					//dashboard.autocomplete(key);
					
				}, 30);
			},
			autocomplete:function(key){
				$("#search_content").html('');
				layer.load(0, {shade: false});
				commonService.post({
					url:'/reporting/edit/search',
					params :{ keyword :key}
				}).success(function(res){			
					layer.closeAll('loading');
					if(res.status == "success"){
						var data = res.data;
						$("#search_content").html(data);
						$('#tipContent').mCustomScrollbar({
							scrollButtons : {
								enable : false,
								scrollType : "continuous",
								scrollSpeed : 20,
								scrollAmount : 40
							},
							horizontalScroll : false,
						});
					}else{
						layercheck(json.message);
					}
				});
			},
			showFolderName:function(obj){
				var folderName = obj.folder_name;
				if(obj.parent_folder_name){
					folderName = obj.folder_name+"/"+obj.parent_folder_name;
				}
				return folderName;
			},
			selectFolder:function(obj){
				$("#keyword").val('');
				$scope.container.selected_folder_name = obj.folder_name;
				var params = {type:"",folder_id:obj.id};
				this.showPosition(params);
			},
			initGridster:function(chartIds){
				this.driverGridster(chartIds);
				//显示蒙层
				$(document).on('mouseenter', '.contentBox', function() {
					if(!$(this).is('.editoring')) {
						$(this).addClass('active')
					}
				});
				//隐藏蒙层
				$(document).on('mouseleave', '.contentBox', function() {
					$(this).removeClass('active')
				});

			},
			driverGridster:function(chartIds){
				var _this = this;
				var dashboard_id = $("#base_dashboardid").val();
//				$("#gridster_Box").mCustomScrollbar({
//					scrollButtons : {
//						enable : false,
//						scrollType : "continuous",
//						scrollSpeed : 20,
//						scrollAmount : 40
//					},
//					horizontalScroll : false,
//				});
				
				gridster = $(".gridster ul").gridster({ //通过jquery选择DOM实现gridster  
					widget_base_dimensions: [50, 20], //模块的宽高 [宽,高]  
					widget_margins: [10, 5], //模块的间距 [上下,左右] 
					resize: {
						min_size: [12, 5],
						max_size: [12, 400],
						enabled: true,
						stop: function(e, ui,$widget) {
							//拖拽缩放结束相关点
							var chart_id = $widget.attr("id");
							$scope.fn.flushChart(chart_id);
							$scope.fn.updatePosition(dashboard_id);
						}
					}, //模块右下角拖动大小默认为false
					draggable: {
						handle: '.handleBox', //模块内定义拖动的元素  
						//开始拖 
						start: function(event, ui) {
							//console.log(ui);
							//console.log($widget);
							//console.log('开始拖')
						},
						//结束拖动，结束相关点
						stop: function(event, ui,$widget) {
							//console.log(ui);
							//console.log($widget);
							$scope.fn.updatePosition(dashboard_id);
						}
					}
				}).data('gridster');
				
				if(chartIds){
					for(var i = 0; i < chartIds.length; i++){
						var id = chartIds[i];
						$scope.fn.flushChart(id);
					}
					
					$timeout(function(){
						_this.saveImgQuene();
					},2000);
					
				}
			},
			saveImgQuene:function(){
				if(chart_list && chart_list.length > 0){
					for(var i = 0;i < chart_list.length;i++){
						var data = chart_list[i];
						var url = data.chart.getDataURL("png");
						queue.insert({id:data.id,data:url});
					}
					var data = {list:queue.list};
					commonService.http({
						url:'/reporting/cacheImage',
						data:data
					}).success(function(res){
						if(res.status == "success"){
							
						}
					});
					
				}
			},
			updatePosition: function(dashboard_id) {
				var _this = this;
				var lis = $("#fill_box ul").find("li");
				var positions = "";
				for (var i = 0; i < lis.length; i++) {
					var li = lis[i];
					var id = $(li).attr("id");
					var data_col = $(li).attr("data-col");
					var data_row = $(li).attr("data-row");
					var data_sizex = $(li).attr("data-sizex");
					var data_sizey = $(li).attr("data-sizey");
					if (id != null && id != undefined) {
						positions = positions + "{\"chart_id\": " + id
								+ ", \"data_col\": " + data_col + ", \"data_row\": "
								+ data_row + ", \"data_sizex\": " + data_sizex
								+ ", \"data_sizey\": " + data_sizey + " },";
					}
				}
				if (positions != "") {
					positions = positions.substring(0, positions.length - 1);
				}
				var widget = "[ " + positions + " ]";
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/dashboard/update/position",
					data: {
						position : widget,
						id : dashboard_id
					},
					success: function(json) {
						layer.closeAll('loading');
						if(json.status == "success"){
							var time = json.data;
						}else{
							layercheck(json.message);
						}
					}
				});
			},
			evlabc:function(a){//排序大小
				var i = j = t = 0;
				for (i = 0; i < a.length; i++){
				for (j = 0; j < a.length; j++){
				 if (a[i] < a[j]){
				  t = a[i];
				  a[i] = a[j];
				  a[j] = t;
				 } 
				}
				}
				return a;
			},
			flushChart: function(chart_id){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/fill",
					data: {
						id: chart_id
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							$("#chart_" + chart_id).html('');
							var data = json.data['option'];
							if(data != null){
								var chartType = json.data['chartType'];
								var option = eval('(' + data + ')');
								if(chart_option_event.chart_type_set.TABLE == chartType){
									var html = option.html;
									$("#chart_" + chart_id).html(html);
									initScroll();
									tableFixed();
									$("#chart_" + chart_id).find(".tbbj_px").removeClass("tbbj_px");
									var height = $("#chart_"+chart_id).height();
									var h = Math.ceil((height+20)/30);
									gridster.resize_widget($('#'+chart_id),12, h);
									_this.cacheTable(chart_id, $("#chart_" + chart_id).html());
									_this.updatePosition(base_dashboardid);
								}else if(chart_option_event.chart_type_set.TEXT == chartType){
									var html = option.html;
									$("#chart_" + chart_id).html(html);
									var height = $("#chart_"+chart_id).height();
									var h = Math.ceil((height+20)/30);
									gridster.resize_widget($('#'+chart_id),12, h);
								}else if(chart_option_event.chart_type_set.INDEX == chartType){
									var html = option.html;
									$("#chart_" + chart_id).html(html);
									var height = $("#chart_"+chart_id).height();
									var h = Math.ceil((height+20)/30);
									gridster.resize_widget($('#'+chart_id),12, h);
								}else if (chart_option_event.is_semantic_chart(chartType)){
									var html = option.html;
									$("#chart_" + chart_id).html(html);
									var _width = $('.semantic-view-22').parent().width() / $('.semantic-view-22').width() / 1.12;
									var _height = $('.semantic-view-22').parent().height() / $('.semantic-view-22').height() / 1.12;
									var _scale = _width<_height?_width:_height;
									$('.semantic-view-22').css('transform', 'scale(' + _scale + ')');
								}else{
									option.theme = storageService.getTheme();
									option = chart_option_event.addTooltipFormatter(chartType, option);
									chart_option_event.renderTheme(chartType,option);
									var chart = echarts.init(document.getElementById('chart_' + chart_id));
									if(option != null){
										chart.setOption(option);
									}
									$(window).resize(function() {
										chart.resize();
									});
									
									chart_list.push({id:chart_id,chart:chart});
								}
							}
						}
					}
				});
			},
			cacheTable:function(id,html){
				$.ajax({
					type: "post",
					url: "/reporting/cacheTable",
					data: {
						chart_id: id,
						html:html
					},
					success: function(json){
						if(json.status == "success"){				
						}
						
					}
				});	
			},
			insertChart:function(obj){
				var _this = this;
				var chart_id =  obj.id;
				var base_dashboardid =  $("#base_dashboardid").val();
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/insertChart",
					data: {
						chart_id: chart_id,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							_this.refreshMain(function(){
								 setTimeout(function(){
									 $('#gridster_Box').mCustomScrollbar('scrollTo','bottom');
								 },300);
							});					
						}else{
							layercheck(json.message);
						}
						
					}
				});	
			},
			refreshMain:function(fn){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				layer.load(0, {shade: false});
				commonService.post({
					url:'/reporting/findReporting',
					params :{ dashboardid :base_dashboardid}
				}).success(function(res){		
					layer.closeAll('loading');
					if(res.status == "success"){
						 var data  = res.data;
						 var chartIds = data.chartIds;
						 gol_chartIds = chartIds;
						 var time = data.time;
						 $("#fill_box").html(data.templateContent);
						 queue.list = [];						
						 _this.driverGridster(chartIds);
						fn();
					}else{
						layercheck(json.message);
					}
				});
			},
			insertText:function(obj,id){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				if(is_editing){
					var html = $(obj).html();
					ue.setContent(html,true);
					return;
				}
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/insertText",
					data: {
						text_id: id,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							_this.refreshMain(function(){
								 $('#gridster_Box').mCustomScrollbar('scrollTo','bottom');
							});	
						}else{
							layercheck(json.message);
						}
						
					}
				});	
			},
			modify:function(){
				var base_dashboardid =  $("#base_dashboardid").val();
				if(!$scope.data.dashboard_name){
					layercheck("请输入报告名称");
					return;
				}
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/modify",
					data: {
						dashboard_name: $scope.data.dashboard_name,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
						}else{
							layercheck(json.message);
						}
					}
				});	
			},
			deleteChart:function(id){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/deleteChart",
					data: {
						chart_id: id,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							var data = json.data;
							if(data == 0){
								_this.refreshMain(function(){});
							}else{
								gridster.remove_widget($("#"+id));
								$("#"+id).remove();
								$scope.fn.updatePosition(base_dashboardid);
							}
						}else{
							layercheck(json.message);
						}				
					}
				});	
			},
			copyChart:function(id){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/copyChart",
					data: {
						chart_id: id,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							_this.refreshMain(function(){});
						}else{
							layercheck(json.message);
						}
						
					}
				});	
			},
			cutChart:function(id){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/cutChart",
					data: {
						chart_id: id,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							var data = json.data;
							create_chart_id = data;
							_this.refreshMain(function(){});
						}else{
							layercheck(json.message);
						}
						
					}
				});	
			},
			pasteChart:function(id){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				if(!create_chart_id){
					layercheck("没有对象可进行粘贴");
					return;
				}
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/pasteChart",
					data: {
						chart_id: id,
						cut_chart_id: create_chart_id,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							_this.refreshMain(function(){});
						}else{
							layercheck(json.message);
						}
						
					}
				});	
				
			},
			editText:function(chart_id,html,height,timestamp){
				is_editing = true;
				editorw.prototype.addListener = function(ev, fn) {
					var _this = this;
					this.ue.addListener(ev, function() {
						fn(_this)
					})
				}
				ue =  new editorw('editor'+timestamp);	
				ue.addListener('ready', function(_ue) {
					_blur(_ue);
					_ue.setHeight(height);
					_ue.setContent(html);
					$(_ue.ue.container).blur(function() {
						var text = _ue.ue.getContent();
						$scope.fn.modifyText(edit_text_chart_id,text,timestamp);
					});
				});
				_blur = function(_ue) {
					window.editorUe = _ue;
					window.editorwInside = true;
					var _container = _ue.ue.container;
					$(_container).mouseenter(function() {
						window.editorUe = _ue;
						window.editorwInside = true;
					});
					$(_container).mouseleave(function() {
						window.editorwInside = false;
					});
					$('#edui_fixedlayer,.wblb-li').mouseenter(function() {
						window.editorwInside = true;
					});
					$('#edui_fixedlayer,.wblb-li').mouseleave(function() {
						window.editorwInside = false;
					});
					
					
				}
				
				
				$(window).click(function() {
					if(!window.editorwInside) {
						if(window.editorUe) {
							$(window.editorUe.ue.container).blur();
							window.editorUe = undefined;
							window.editorwInside = false;
						}
					}
				});

				edit_text_chart_id = chart_id;
			},
			modifyText:function(chart_id,html,timestamp){
				var base_dashboardid =  $("#base_dashboardid").val();
				var _this = this;
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/modifyText",
					data: {
						chart_id: chart_id,
						content:html
					},
					success: function(json){
						edit_text_lock = true;
						is_editing = false;
						layer.closeAll('loading');
						if(json.status == "success"){
							var time = json.data;
							$(".editor-example").remove();
							$("#chart_"+chart_id).html(html);
							$("#chart_"+chart_id).show();
							$("#chart_"+chart_id).parents('.contentBox').addClass('active').removeClass('editoring');
							var height = $("#chart_"+chart_id).height();
							var h = Math.ceil((height+20)/30);
							gridster.resize_widget($('#'+chart_id),12, h);
							_this.updatePosition(base_dashboardid);
						}else{
							layercheck(json.message);
						}
					}
				});	
			},
			insertTemplate:function(id){
				var _this = this;
				var base_dashboardid =  $("#base_dashboardid").val();
				layer.load(0, {shade: false});
				$.ajax({
					type: "post",
					url: "/reporting/edit/insertTemplate",
					data: {
						templateid: id,
						dashboardid:base_dashboardid
					},
					success: function(json){
						layer.closeAll('loading');
						if(json.status == "success"){
							_this.refreshMain(function(){});
						}else{
							layercheck(json.message);
						}
					}
				});	
			}
			
	};
	
	$scope.fn.loadInfo();
});


app.factory('commonService',['$http','$location','commonData', function($http,$location,commonData){
	var commonService = {
			//post 提交 类似 ajax
			post:function(obj){
				var transFn = function(data) {  
	                return jQuery.param(data);  
	            };
				return $http.post(obj.url, obj.params, 
					{
					headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
					transformRequest:transFn});
			},
			http:function(obj){
				return $http.post(obj.url,obj.data);
			}
	};
	return commonService;
}]);

app.factory('sessionInjector',function(){
    var sessionInjector = {
        request: function(config){
            return config;
        },
        response: function(response){
            if(response.data){
            	if(typeof response.data == "string" && response.data.indexOf('<!DOCTYPE html>') > -1){
                	window.location = "/login";
                	return;
            	}

            }
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    
    return sessionInjector;
});

app.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('sessionInjector');
}]);


app.directive("renderScrollbar", function ($timeout) {
	return {
	  restrict: 'AE',
      scope: {
    	  localModel: '=renderScrollbar',
      },
	  link: function(scope,ele,attrs){  	
		  scope.$watch('localModel', function(v) {
			  	
			  $timeout(function(){
					$(ele).mCustomScrollbar({
						scrollButtons : {
							enable : false,
							scrollType : "continuous",
							scrollSpeed : 20,
							scrollAmount : 40
						},
						horizontalScroll : false,
					});
			  },200);

		  });
	  }
	};
});

//切字符串补...
app.filter("cutStr",function(){
    return function(input,len){
        if(!input || input.length <= len ){
        	return input;
        }
        return input.substring(0,len)+"...";
    }
});


app.constant("commonData", {
	chartIconList:[{type:"c001",image:"report-1.jpg",name:"表格"},
	               {type:"c002",image:"report-2.jpg",name:"指标卡"},
	               {type:"c015",image:"report-3.jpg",name:"计量图"},
	               {type:"c003",image:"report-4.jpg",name:"折线图"},
	               {type:"c004",image:"report-5.jpg",name:"簇状柱形图"},
	               {type:"c005",image:"report-6.jpg",name:"堆积柱形图"},
	               {type:"c014",image:"report-7.jpg",name:"百分比堆积柱形图"},
	               {type:"c006",image:"report-8.jpg",name:"条形图"},
	               {type:"c016",image:"report-9.jpg",name:"堆积条形图"},
	               {type:"c017",image:"report-10.jpg",name:"百分比堆积条形图"},
	               {type:"c018",image:"report-11.jpg",name:"面积图"},
	               {type:"c008",image:"report-12.jpg",name:"普通饼图"},
	               {type:"c009",image:"report-13.jpg",name:"漏斗图"},
	               {type:"c010",image:"report-14.jpg",name:"地图"},
	               {type:"c013",image:"report-15.jpg",name:"双轴图"},
	               {type:"c011",image:"report-16.jpg",name:"词云"},
	               {type:"c012",image:"report-17.jpg",name:"雷达图"},
	               {type:"c007",image:"report-22.jpg",name:"散点图"},
	               {type:"c030",image:"report-19.jpg",name:"旭日图"},
	               {type:"c031",image:"report-20.jpg",name:"瀑布图"},
	               {type:"c032",image:"report-21.jpg",name:"桑基图"},
	               {type:"c033",image:"report-18.jpg",name:"矩形树图"}]
});

var edit_obj = {
		searchSelect:function(chartid,bdid,name){
			$("#keyword").val(name);
			$('body[ng-controller="bodyController"]').scope().fn.searchSelect(chartid,bdid);
			$('#tipContent').css('display', 'none');
		},
		insertText:function(obj,text_id){
			$('body[ng-controller="bodyController"]').scope().fn.insertText(obj,text_id);
		},
		editText:function(obj,chart_id){
			if(!edit_text_lock){
				return;
			}
			edit_text_lock = false;
			$(obj).parents('.contentBox').addClass('editoring').removeClass('active');
			var parent = $("#chart_"+chart_id).parent();
			var timestamp = Date.parse(new Date());
			var height = parent.height()-60;
			parent.append('<div class="editor-example"><script id="editor'+timestamp+'" type="text/plain" style="width:100%;height:100%;"></script></div>');
			var html = $("#chart_"+chart_id).html();			
			$("#chart_"+chart_id).hide();
			$('body[ng-controller="bodyController"]').scope().fn.editText(chart_id,html,height,timestamp);
		},
		deleteChart:function(chart_id){
			$('body[ng-controller="bodyController"]').scope().fn.deleteChart(chart_id);
		},
		copyChart:function(chart_id){
			$('body[ng-controller="bodyController"]').scope().fn.copyChart(chart_id);
		},
		cutChart:function(chart_id){
			$('body[ng-controller="bodyController"]').scope().fn.cutChart(chart_id);
		},
		pasteChart:function(chart_id){
			$('body[ng-controller="bodyController"]').scope().fn.pasteChart(chart_id);
		},
		goback:function(){
			$('#gridster_Box').mCustomScrollbar('scrollTo','top');
			setTimeout(function(){
				$('body[ng-controller="bodyController"]').scope().fn.goback();
			},1000);
		},
		insertTemplate:function(id){
			$('body[ng-controller="bodyController"]').scope().fn.insertTemplate(id);
		},
		share:function(id){
			reporting.shareTemplate(id);
		}
};