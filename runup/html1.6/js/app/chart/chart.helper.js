var commonData_color_wheel = [
                     	     {id:"default",name:"默认颜色",colors:["#5c82dd","#a5ca73","#61af82","#f0cc62","#ea9257","#e15e58","#c06ad0","#8159cd","#5258b2","#6bb3ec","#84d2d9"," #c33e6b"]},
                    	     {id:"shuoguo",name:"硕果累累",colors:["#aa4a46","#db7968","#e56941","#eda255","#c35d67","#d9625e","#d89a78","#a38a70","#b27876","#b1afa1","#92ab83","#94985b"]},
                    	     {id:"fugu",name:"复古调",colors:["#914176","#b9426c","#ef834a","#cf4b3f","#eb4a7f","#e66976","#ce6482","#a92857","#6589c5","#6f759b","#616fc1","#6256a4"]},
                    	     {id:"gaodiao",name:"高调红",colors:["#772929","#c70904","#98220e","#c4572f","#e91f1a","#ff5800","#ffb400","#ffd200","#d42965","#ff5e93","#8bb4f7","#2361d7"]},
                    	     {id:"shangwu",name:"商务蓝",colors:["#0059ce","#095086","#94d7f1","#0086e6","#006593","#2e77d7","#74a4e4","#a2c3ed","#a3a314","#0049a9","#17afb7","#ce0059"]},
                    	     {id:"shishang",name:"时尚绿",colors:["#69c28f","#405942","#6a8b5b","#77a656","#abbf7e","#557514","#41a774","#4cd964","#51c2c2","#d92332","#707dcc","#6accba"]},
                    	     {id:"lengse",name:"冷色灰",colors:["#88ada6","#83818e","#808080","#bacac6","#c2ccd0","#bbcdc5","#c0ebd7","#999999","#75664d","#6d6d6d","#50616d","#758a99"]}
];



var chart_helper_test = function(num){
	return chart_option_event.thousandBitSeparator(num);
};

var getSelectChartType = function(param){
	 var _json = eval("("+param+")");
	 return _json.chartOperate.selectChartType || "";
}



var specialColorSetUp = function(selectChartType,structure){
	var xData = [];
	if(selectChartType == chart_option_event.chart_type_set.WORD_CLOUD){
		if(structure.container.x_axisList && structure.container.x_axisList.length > 0){
			//if(!structure.container.xDataColors || structure.container.xDataColors.length ==0){//如果没有颜色，则给与随机色
				var resultList = structure.result.resultList || structure.result.yAxis ||structure.result.wordsList;
				if(resultList && resultList.length > 0){
					for(var i = 0;i < resultList.length;i++){
						var data = new Object();
						data.name = resultList[i].name;
						data.color = helper_randomColor();
						data.unique_id = helper_getUniqueId();
						data.x_unique_id = resultList[i].unique_id;
						xData.push(data);
					}
				}						
				structure.container.xDataColors = xData;
			///}
		}
	}
	
}

var helper_randomColor = function(){
	var random_color = "";
	var colors = [];
	var color_wheel = commonData_color_wheel;
	for(var i = 0;i < color_wheel.length;i++){
		var _colors =  color_wheel[i].colors;
		if(_colors && _colors.length > 0){
			for(var j = 0;j < _colors.length;j++){
				colors.push(_colors[j]);
			}
		}
	}
	if(colors && colors.length > 0){
		var len  = colors.length;
		var randomNum = Math.random()*(len-1);
		var num = Math.floor(randomNum);
		random_color = colors[num];
	}
	return random_color;
}

var helper_getUniqueId = function(){
	helper_uuid(16, 32);
}

var helper_uuid = function(len, radix){
	 var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	 var uuid = [], i;
	 radix = radix || chars.length;
	 if (len) {
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	 } else {
	      var r;
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	 }
	 return "u"+uuid.join('');
}

var getChartOption = function(param,param2,theme){
	var _json = eval("("+param+")");
	var querydata = eval("("+param2+")");
	var structure = new Object();
	structure.chartSetting = _json.chartSetting;
	structure.chartOperate = _json.chartOperate;
	structure.container = _json.main;
	structure.result = querydata.data || {};
	structure.theme = theme;
	var chart_type  = _json.chartOperate.selectChartType;
	var option = {};
	option.theme =  theme;
	specialColorSetUp(chart_type,structure);
	if(chart_type == chart_option_event.chart_type_set.TABLE){	
		chart_table.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.INDEX){
		chart_index.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.LINE){
		chart_line.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.Z_BAR){
		chart_zbar.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.D_BAR){
		chart_dbar.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.T_BAR){
		chart_tbar.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.SCATTER){
		chart_scatter.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.PIE){
		chart_pie.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.FUNNEL){
		chart_funnel.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.MAP){
		chart_map.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.WORD_CLOUD){
		chart_wordcloud.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.RADAR){
		chart_radar.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.BIAXIAL){
		chart_biaxial.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.P_BAR){
		chart_pbar.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.METERING){
		chart_metering.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.DT_BAR){
		chart_dtbar.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.PDT_BAR){
		chart_pdtbar.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.A_LINE){
		chart_aline.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.RISING_SUN){
		chart_risingsun.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.WATERFALL){
		chart_waterfall.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.SANKEY){
		chart_sankey.render(option,structure);
	}else if(chart_type == chart_option_event.chart_type_set.RECTANGLE_TREE){
		chart_rectangletree.render(option,structure);
	}
	chart_option_event.renderTheme(chart_type,option);
	
	return JSON.stringify(option);
}