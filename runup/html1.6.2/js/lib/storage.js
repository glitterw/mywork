var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;
var storageService = {
		//本地存储池
		setStoragePool:function(key,value){
			var storagepool =  localStorage.getItem("visual_storagepool");
			var pool = {};
			if(storagepool){
				pool = JSON.parse(storagepool);
			}
			pool[key] = value;
			localStorage.setItem("visual_storagepool",JSON.stringify(pool));
		},
		//获取本地存储池存放的数据
		getStoragePool:function(key){
			var returnValue = null,pool = null;
			var storagepool = localStorage.getItem("visual_storagepool");
			if(storagepool){
				pool = JSON.parse(storagepool);
				if(pool && pool[key]){
					returnValue = pool[key];
				}
			}
			return returnValue || {};
		},
		removeStoragePool:function(key){
			localStorage.removeItem(key);
		},
		setParameter:function(key,value){
			var parameter = sessionStorage["visual_parameter"];
			var parameter_obj = {};
			if(parameter){
				parameter_obj = JSON.parse(parameter);
			}
			parameter_obj[key] = value;
			sessionStorage["visual_parameter"] = JSON.stringify(parameter_obj);
		},
		// 获取参数值 key为参数名
		getParameter:function(key){
			var returnValue = null,parameter_obj = null;
			var parameter = sessionStorage["visual_parameter"];
			if(parameter){
				parameter_obj = JSON.parse(parameter);
				if(parameter_obj && parameter_obj[key]){
					returnValue = parameter_obj[key];
				}
			}else{
				returnValue = "";
			}
			return returnValue;
		},
		getTheme:function(){
			var id = this.getStoragePool("id");
			var theme = this.getStoragePool(id+"_theme");
			return theme;
		}
};

Date.prototype.format = function (format) {  
    var o = {  
        "M+": this.getMonth() + 1,  
        "d+": this.getDate(),  
        "h+": this.getHours(),  
        "m+": this.getMinutes(),  
        "s+": this.getSeconds(),  
        "q+": Math.floor((this.getMonth() + 3) / 3),  
        "S": this.getMilliseconds()  
    }  
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    }  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}

function longFormatDate(l){
	var date  = new Date(l);
	return date.format("yy-MM-dd");
}

function getDate(dates){
	var dd = new Date();
	    dd.setDate(dd.getDate()+dates);
	return dd;
}

function getMonthAgo(){
	var currentdate = new Date().format("yyyy-MM-dd");
	var agodate  = getDate(-30).format("yyyy-MM-dd");
	var array = dataScope(agodate,currentdate);
	array.splice(0,0,agodate);
	array.push(currentdate);
	return array;
}


function dataScope(value1, value2) {  
    var getDate = function(str) {  
        var tempDate = new Date();  
        var list = str.split("-");  
        tempDate.setFullYear(list[0]);  
        tempDate.setMonth(list[1] - 1);  
        tempDate.setDate(list[2]);  
        return tempDate;  
    }  
    var date1 = getDate(value1);  
    var date2 = getDate(value2);  
    if (date1 > date2) {  
        var tempDate = date1;  
        date1 = date2;  
        date2 = tempDate;  
    }  
    date1.setDate(date1.getDate() + 1);  
    var dateArr = [];  
    var i = 0;  
    while (!(date1.getFullYear() == date2.getFullYear()  
            && date1.getMonth() == date2.getMonth() && date1.getDate() == date2  
            .getDate())) {  
         var dayStr =date1.getDate().toString();  
            if(dayStr.length ==1){  
                dayStr="0"+dayStr;  
            }  
        dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-"  
                + dayStr;  
        i++;   
        date1.setDate(date1.getDate() + 1);  
    }  
    return dateArr;  
}