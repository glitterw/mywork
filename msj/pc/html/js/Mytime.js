(function() {
	/*2017年1月1日星期几?*/
	firstDateDay = function(Year, Month) {
		var newDate = new Date();
		var Days = [7, 1, 2, 3, 4, 5, 6];
		newDate.setFullYear(Year);
		newDate.setMonth(Month - 1);
		newDate.setDate(1);
		return Days[newDate.getDay()];
	};
	/*2017年1月多少天*/
	DateAll = function(Year, Month) {
		var newDate = new Date();
		newDate.setFullYear(Year);
		newDate.setMonth(Month - 1);
		var MonthDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if(Month == 2) {
			var runnianYear = [1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040, 2044, 2048];
			for(var i = 0, len = runnianYear.length; i < len; i++) {
				if(Year == runnianYear[i]) MonthDate[1] = 29;
			};
		};
		return MonthDate[Month - 1];
	};

	MytimeFn = function(Mytime, Year, Month) {
		var dateAll = DateAll(Year, Month);
		var DateinnerHTML = "";
		for(var i = 1; i <= dateAll; i++) {

			DateinnerHTML += '<span data-date=' + Year + '.' + Month + '.' + i + ' data-utc=' + Date.UTC(Year, Month - 1, i) + '><i>' + i + '</i></span>'
		};
		Mytime.find('.Date').get(0).innerHTML = DateinnerHTML;
		var firstDay = firstDateDay(Year, Month);
		var DateDom = Mytime.find('.Date span').get(0);
		if(firstDay == 7) firstDay = 0;
		var margin_left = $(DateDom).outerWidth(true) * firstDay;
		DateDom.style.marginLeft = margin_left + 'px';
		var thisDate = new Date();
		var thisFullYear = thisDate.getFullYear();
		var thisMonth = thisDate.getMonth() + 1;
		var thisDate = thisDate.getDate();
		if(thisFullYear == Year) {
			if(thisMonth == Month) {
				var this_Date = Mytime.find('.Date span').eq(thisDate - 1);
				this_Date.addClass('this-Date');
				this_Date.prevAll().addClass('prev-Date');
				this_Date.nextAll().addClass('next-Date');

			} else {
				if(thisMonth > Month) {
					Mytime.find('.Date span').addClass('prev-Date')
				} else {
					Mytime.find('.Date span').addClass('next-Date')
				}
			}
		} else {
			if(thisFullYear > Year) {
				Mytime.find('.Date span').addClass('prev-Date')
			} else {
				Mytime.find('.Date span').addClass('next-Date')
			}
		};
		Mytime.find('.Year span').html(Year);
		Mytime.find('.Month span').html(Month);
	};

	$('.Mytime').find('.prev').click(function() {
		var thisMytime = $(this).parents('.Mytime');
		var _Year = parseInt(thisMytime.find('.Year span').text());
		var _Month = parseInt(thisMytime.find('.Month span').text());
		_Month -= 1;
		if(_Month == 0) {
			_Month = 12;
			_Year -= 1;
		};
		var thisSpanI = thisMytime.find('.Date .mouseStart').index();
		var kexuan = true;
		if(thisMytime.find('.Date span').slice(0, thisSpanI).is('.ion')) {
			kexuan = false;
		}

		MytimeFn(thisMytime, _Year, _Month);

		/*勾选日期*/
		timeClick(thisMytime);

		if(thisMytime.attr('timeClickBle2') == 'false') {
			if(kexuan) {
				thisMytime.find('.Date span').eq(-1).click();
			} else {
				thisMytime.attr('timeClickBle2', 'true');
			}
		}
	});

	$('.Mytime').find('.next').click(function() {
		var thisMytime = $(this).parents('.Mytime');
		var _Year = parseInt(thisMytime.find('.Year span').text());
		var _Month = parseInt(thisMytime.find('.Month span').text());
		_Month += 1;
		if(_Month == 13) {
			_Month = 1;
			_Year += 1;
		};
		var thisSpanI = thisMytime.find('.Date .mouseStart').index();
		var kexuan = true;
		if(thisMytime.find('.Date span').slice(thisSpanI).is('.ion')) {
			kexuan = false;
		}

		MytimeFn(thisMytime, _Year, _Month);

		timeClick(thisMytime);

		if(thisMytime.attr('timeClickBle2') == 'false') {
			if(kexuan) {
				thisMytime.find('.Date span').eq(0).click();
			} else {
				thisMytime.attr('timeClickBle2', 'true');
			}
		}
	});

	timeClick = function(Mytime) {

		Mytime.attr('timeClickBle', true);

		var Dspan = Mytime.find('.Date span');

		Dspan.click(function() {
			if(Mytime.attr('timeClickBle') == 'true') {

				if(Mytime.attr('timeClickBle2') != 'false') {

					/*如果开始时间是不可选时间跳出*/
					if($(this).is(".ion") || $(this).is(".prev-Date")) {
						return;
					};
					Mytime.attr('timeClickBle2', false);

					Dspan.removeClass('mouseStart mouseEnd mouseIn');
					$(this).addClass('mouseStart');
					var minDate = $(this).attr('data-date');
					var minUTC = $(this).attr('data-utc');
					Mytime.attr({ 'data-mindate': minDate, 'data-minutc': minUTC });
				} else {
					Mytime.attr('timeClickBle2', false);
					Dspan.removeClass('mouseStart mouseEnd mouseIn');
					Dspan.each(function() {
						if($(this).attr('data-utc') == Mytime.attr('data-minutc')) {
							$(this).addClass('mouseStart')
						}
					})
				}
				Mytime.attr('timeClickBle', false);

				Dspan.parents('.Mytime').addClass('thisMytime');

				Dspan.on('mouseover.MytimeMove', function(ev) {

					var start, end;
					var maxDate = $(this).attr('data-date');
					var minUTC = Mytime.attr('data-minutc');
					var maxUTC = $(this).attr('data-utc');
					Mytime.attr({ 'data-maxdate': maxDate, 'data-maxutc': maxUTC });
					if(minUTC < maxUTC) {
						start = minUTC;
						end = maxUTC;
					} else {
						start = maxUTC;
						end = minUTC;
					}
					Dspan.each(function() {
						if($(this).attr('data-utc') >= start && $(this).attr('data-utc') <= end) {
							$(this).addClass('mouseIn')
						} else {
							$(this).removeClass('mouseIn')
						}
					})

					ev.preventDefault();
				});

			} else {
				if(Mytime.find('.mouseIn').slice(0, -1).is(".ion") || Mytime.find('.mouseIn').is(".prev-Date") || $(this).is('.mouseStart')) {
					return;
				}

				Mytime.attr('timeClickBle', true);
				Mytime.attr('timeClickBle2', true);

				Dspan.off('mouseover.MytimeMove');

				var maxDate = $(this).attr('data-date');
				var maxUTC = $(this).attr('data-utc');
				Mytime.attr({ 'data-maxdate': minDate, 'data-maxutc': minUTC });

				$(this).addClass('mouseEnd');

				$('thisMytime').removeClass('thisMytime');

				var min = Mytime.attr('data-minutc');
				var max = Mytime.attr('data-maxutc');
				if(min > max) {
					var a = Mytime.attr('data-mindate');
					var b = Mytime.attr('data-minutc');
					Mytime.attr('data-mindate', Mytime.attr('data-maxdate'));
					Mytime.attr('data-maxdate', a);
					Mytime.attr('data-minutc', Mytime.attr('data-maxutc'));
					Mytime.attr('data-maxutc', b);
				}
			}
		});
	};
})();