//设置本地存储
function set_local(key,val)
{
    $api.setStorage(key,val);
    //set_local(key, val);
}

//获取本地存储
function get_local(key)
{
    return $api.getStorage(key);
    //return get_local(key);
}

//json转字符串
function json2str(j)
{
    return JSON.stringify(j);
}

//字符串转json
function str2json(s)
{
    var json = eval('(' + s + ')');
    return json;
}

//是否是json对象
function is_json(obj) {
    var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

//判断字符串是否在array中
function in_array(stringToSearch, arrayToSearch)
{
    for(s=0;s<arrayToSearch.length;s++)
    {
        thisEntry = arrayToSearch[s].toString();
        if(thisEntry == stringToSearch)
        {
            return true;
        }
    }
    return false;
}

/*
 *Loading
 */
function loading(time) {
    var str = "";
    str += '<div id="zv_Loading"></div><div id="zv_main"></div><div id="Loadbox">';
    str += '<div class="LoadBoxList">';
    str += '<div id="loadbg"><img src="../image/nobg.png" style="width:5em; height:5em"></div>';
    str += '<div id="loadingimgbox"><img src="../image/logo.png" id="loadingimg"></div>';
    str += '<div id="loadingimgboxtxt">加载中...</div>';
    str += '</div>';
    str += '</div>';
    var d = document.createElement('DIV');
    d.innerHTML = str;
    document.body.appendChild(d);
    if (parseInt(time) < 0) {
        document.getElementById("zv_main").style.display = "none";
        document.getElementById("Loadbox").style.display = "none";
        //fadeEffect.init('fadeIn', 1)
    }
    if (parseInt(time) == 0) {
        document.getElementById("zv_main").style.display = "block";
        document.getElementById("Loadbox").style.display = "block";
    }
    if (parseInt(time) > 0) {
        document.getElementById("zv_main").style.display = "block";
        document.getElementById("Loadbox").style.display = "block";
        setTimeout(function()
        {
            $api.css($api.byId("content"),"display:block");
            document.getElementById("zv_main").style.display = "none";
            document.getElementById("Loadbox").style.display = "none";
            //fadeEffect.init('fadeIn', 20)
        },time);
    }
}

//控制只能输入小数
function input_float(v)
{
    for(var i = v.value.length-1; i >= 0; i--)
    {
        if(!/^\d*\.?\d{0,2}$/.test(v.value))//只能输入两位小数
        {
            v.value=v.value.substr(0,v.value.length-1);
        }
    }
}

//控制只能输入整数
function input_int(v)
{
    v.value= v.value.replace(/[^\d]/g,'');
}

//是否手机号码
function is_mobile(v)
{
    var reg=/^0{0,1}(13[0-9]|18[0-9]|17[0-9]|14[0-9]|15[0-9])[0-9]{8}$/;
    return reg.test(v);
}

/**
 * 根据时间戳获取年、月、日
 * @param String str 时间戳
 * @param Boolean f 是否在原来的基础上*1000，true要*，false或不填就不*
 */
function timetostr(str,f)
{
    var t=(f)?parseInt(str):parseInt(str)*1000;
    var datetime=new Date(t);
    var y=datetime.getFullYear();
    var m=num_two(datetime.getMonth()+1);
    var d=num_two(datetime.getDate());
    var hour=num_two(datetime.getHours());
    var min=num_two(datetime.getMinutes());
    var sec=num_two(datetime.getSeconds());
    return y+"."+m+"."+d+" "+hour+":"+min+":"+sec;
}

//自动补零
function num_two(s)
{
    return (parseInt(s)>9)?s:'0'+s;
}

/**
 * [isDefine 判断值是否定义 | 对象的值是否为空 oject = {} 返回 false;]
 * @param  {[string]}  value
 * @return {Boolean}
 */
function is_define(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof(value) == 'undefined') {
        return false;
    } else {
        if(value.constructor.name === "Object"){
            for(var e in value){
                return true
            }
            return false
        }
        value = value + "";
        value = value.replace(/\s/g, ""); //全局匹配空白字符
        if (value == "") {
            return false;
        }
        return true;
    }
}


/**
 * [fix_android_ios 解决沉浸式的问题]
 * @author Hongwei
 * @param {[obj]} color [头部颜色 | darkgray 深灰色 | black 黑色 | green 绿色，如果不是以上这几种颜色，可以自定义颜色 ]
 * @link http://www.kancloud.cn/hongweizhiyuan/apicloud_function/270056
 * @eg fix_android_ios('darkgray')  or fix_android_ios('FF0000')
 */
function fix_android_ios(color){
    switch(color)
    {
        case 'darkgray':
            color = "#303247"
            break;
        case 'black':
            color = "#000000"
            break;
        case 'white':
            color = "#FFFFFF"
            break;
        case 'green':
            color = "#01b980"
            break;
        default:
            color = color
    }
    api.setStatusBarStyle({
        style : 'light',
        color: color
    });
    var header = document.querySelector('header');
    $api.fixIos7Bar(header);
    $api.fixStatusBar(header);
}

/*
  交易平台接口IP地址；
 */

function getAPI(api){
     var domApI = 'http://test-dt-api.infobigdata.com/'+api;
     //var domApI = 'http://dt-api.infobigdata.com/'+api;
    //var domApI = 'http://192.168.9.69:8080/'+api;//曾柯机器
    return domApI;
}

 var storeuser = {
        id:6,
        token:'27e8d2e3214449df9c3ae5836da294ab',
        version: "1.0"
       }
set_local('baseId',json2str(storeuser))
//alert(JSON.stringify(sessionAgent.getLoginInfo()))
