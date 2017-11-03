/**
 * Created by Administrator on 2017/3/8.
 */
var myChart = echarts.init(document.getElementById('chart'));
//漏斗图
$(function () {
    //showProvince('hubei');
    //return ;

    /* 弹窗颜色框
    * @param jquery对象，点击触发时的对象
     */
    function _pickColor($obj) {
        //var $color = $('#b-color-span');
        var color = $obj.css('backgroundColor');
        $obj.spectrum({
            color: color,
            preferredFormat: "hex",
            containerClassName: 'Mydefine',
            showInput: true,
            chooseText: "确定",
            cancelText: "取消",
            change: function(thisColor) {
                $obj.css('backgroundColor',thisColor.toRgbString());
                updateColorRangeBG();
            }
        });
    }
    function _showHubei(){
        var data=new Array();
        data=[
            {name: '武汉市',value: randomData() },
            {name: '荆州市',value: randomData() },
            {name: '十堰市',value: randomData() },
            {name: '襄樊市',value: randomData() },
            {name: '随州市',value: randomData() },
            {name: '荆门市',value: randomData() },
            {name: '孝感市',value: randomData() },
            {name: '宜昌市',value: randomData() },
            {name: '黄冈市',value: randomData() },
            {name: '鄂州市',value: randomData() },
            {name: '黄石市',value: randomData() },
            {name: '咸宁市',value: randomData() },
            {name: '襄阳市',value: randomData() },
            {name: '神农架林区',value: randomData() },
            {name: '恩施土家族苗族自治州',value: randomData() },
            {name: '天门市',value: randomData() },
            {name: '仙桃市',value: randomData() },
            {name: '潜江市',value: randomData() },

        ];
        showProvince('湖北省本周订单量','hubei',data);
    }
    //选择湖北省
    $(document).on('click', '.map-area-set .s-item-select .op-list a', function () {
        $(this).closest('.wrap').find('.Myselect-value').text(function(){
            _showHubei();
            return $(this).text().trim();
        });
    })
    //绑定颜色设置弹窗
    $(document).on('click', '.tool-box .field-color', function() {
        $("#map-color-layout").show(function(){
            //开始颜色绑定颜色弹出框
            _pickColor($('#b-color-span'));
            //结束颜色绑定颜色弹出框
            _pickColor($('#e-color-span'));
        });
    });
    //地图面积图，选择渐变颜色
    $(document).on('click', '.op-list a.change-color', function() {
        var bcolor=$(this).attr("b-color");
        var ecolor=$(this).attr("e-color");
        //var colorRange="-webkit-linear-gradient(left, "+bcolor+", "+ecolor;
        $(this).closest('.wrap').find('.Myselect-value').text(function(i,oriText){
            //更改颜色值
            $("#b-color-span").css("background-color",bcolor);
            $("#e-color-span").css("background-color",ecolor);
            var isTransferColor = $("#transfer-color-label").find('input[type="checkbox"]').prop('checked');
            updateColorRangeBG(isTransferColor);
            return $(this).text();
        });
    });
    //地图面积图，颜色反转
    $('#transfer-color-label').on('click', function () {
           var isTransferColor = $(this).find('input[type="checkbox"]').prop('checked');
           updateColorRangeBG(isTransferColor);
    });
    //地图面积图，梯度设置
    $('#color-rank-label').on('click', function () {
        updateColorRangeBG(false);
    });
     //地图面积图，梯度设置  增加按钮监听
    $('#rankinput-add').on('click',function() {
        updateColorRangeBG(false);
    });
    //地图面积图，梯度设置 减少按钮监听
    $('#rankinput-sub').on('click',function() {
        updateColorRangeBG(false);
    });

    //地图面积图，梯度设置 监听
    $('#rankinput').input(function() {
        updateColorRangeBG(false);
    });

   //地图面积图中 颜色设置弹窗 提交模拟修改地图渐变色
    $('.color-set-form .Mlayer_4_bottAll .blue').on('click', function () {
         //获取颜色值
        var bcolor=$("#b-color-span").css("background-color");
        var ecolor=$("#e-color-span").css("background-color");
        //获取梯度
        var iscolorRank =$('#color-rank-label').find('input[type="checkbox"]').prop('checked');
        var rank=1;
        if(iscolorRank){
            rank=parseInt($("#rankinput").val());
        }
        //获取颜色反转值
        var isTransferColor=$('#transfer-color-label').find('input[type="checkbox"]').prop('checked');
        //修改地图的颜色
        updateMapColor(bcolor,ecolor);
        //修改颜色连续或者间断变化
        updateVisualMapType(iscolorRank,rank);
        //修改颜色反转
        updateTransferColor(isTransferColor);
        //修改工具栏的颜色值
        var colorArry=getColorRangeStyle(bcolor,ecolor,iscolorRank,rank,isTransferColor);
        $(".tool-box .map-color .field-color .my-color.b-color").css("background-color",colorArry[0]);
        $(".tool-box .map-color .field-color .my-color.e-color").css("background-color",colorArry[1]);
        $(".tool-box .map-color .field-color .color-range").css("background",colorArry[2]);

    });
    if(document.getElementById('funnel')){
        //漏斗图初始化
        initFunnel();
        $('#funnel .Radio').on('click', function () {
            var value = $(this).find('input[type="radio"]').val();
            if(value==1){
                myChart.setOption(
                    {
                        series: [{
                            orient : ['horizontal'],//水平布局
                        }]
                    });
            }else {
                myChart.setOption({
                    series: [{
                        orient: ['vertical'],//垂直布局
                    }]
                });
            }

        })
    }
    if(document.getElementById('map-area')) {
        initMapareaByValue();
    }

    if(document.getElementById('map-area-province')) {
        var data=new Array();
            data=[
            {name: '武汉市',value: randomData() },
            {name: '荆州市',value: randomData() },
            {name: '十堰市',value: randomData() },
            {name: '襄樊市',value: randomData() },
            {name: '随州市',value: randomData() },
            {name: '荆门市',value: randomData() },
            {name: '孝感市',value: randomData() },
            {name: '宜昌市',value: randomData() },
            {name: '黄冈市',value: randomData() },
            {name: '鄂州市',value: randomData() },
            {name: '黄石市',value: randomData() },
            {name: '咸宁市',value: randomData() },
            {name: '襄阳市',value: randomData() },
            {name: '神农架林区',value: randomData() },
            {name: '恩施土家族苗族自治州',value: randomData() },
            {name: '天门市',value: randomData() },
            {name: '仙桃市',value: randomData() },
            {name: '潜江市',value: randomData() },

        ];
        showProvince('湖北省本周订单量','hubei',data);
    }

    //散点图 初始化
//    if($(".chart.chart-scatter")) {
//        var data=new Array();
//        data = [
//            [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
//            [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
//        ];
//        var title_text="散点图";
//        showScatter(data);
//
//        //修改x轴名称
//        function _updateXaxisName(){
//            var title;
//            title=$('.input.xaxis-name').val();
//            if(title.length<1 || title==''){
//                return false;
//            }
//            //获取单位名称
//            if( $('.input.xaxis-unit').val() && $('.input.xaxis-unit').val().length>0){
//                title+='('+$('.input.xaxis-unit').val()+')';
//            }
//            updateXName(title);
//        }
////修改y轴名称
//        function _updateYaxisName(){
//            var title;
//            title=$('.input.yaxis-name').val();
//            if(title.length<1 || title==''){
//                alert('x轴名称不能为空');
//                return false;
//            }
//            //获取单位名称
//            if( $('.input.yaxis-unit').val() && $('.input.yaxis-unit').val().length>0){
//                title+='('+$('.input.yaxis-unit').val()+')';
//            }
//            updateYName(title);
//        }
//        //x轴名称更改监听
//        $('.input.xaxis-name').blur(function() {
//            _updateXaxisName();
//        });
//        //x轴单位更改监听
//        $('.input.xaxis-unit').blur(function() {
//            _updateXaxisName();
//        });
//        //y轴名称更改监听
//        $('.input.yaxis-name').blur(function() {
//            _updateYaxisName();
//        });
//        //y轴单位更改监听
//        $('.input.yaxis-unit').blur(function() {
//            _updateYaxisName();
//        });
//        //y轴最小值设置失去焦点监听
//        $('.input.ymin-input').blur(function() {
//             //获取是否为自动
//             var show = $('.tool-box .sub-item .Checkbox.ymin').find('input[type="checkbox"]').prop('checked');
//             if(!show && $(this).val() && $(this).val()>=0){
//                 updateYmin($(this).val());
//             }
//        });
//
//        //y轴最大值设置失去焦点监听
//        $('.input.ymax-input').blur(function() {
//            //获取是否为自动
//            var show = $('.tool-box .sub-item .Checkbox.ymax').find('input[type="checkbox"]').prop('checked');
//            if(!show && $(this).val() && $(this).val()>=0){
//                updateYmax($(this).val());
//            }
//        });
//        //最小值为自动时 ，获取系统默认的值
//        $('.tool-box .sub-item .Checkbox.ymin').on('click', function () {
//            var show = $(this).find('input[type="checkbox"]').prop('checked');
//            if(show){
//                updateYmin(55);
//            }
//        });
//        //最大值为自动时 ，获取系统默认的值
//        $('.tool-box .sub-item .Checkbox.ymax').on('click', function () {
//            var show = $(this).find('input[type="checkbox"]').prop('checked');
//            if(show){
//                updateYmax(85);
//            }
//        });
//
//    }

//   图表标签
    $('.tool-box .sub-item .Checkbox').on('click', function () {
        var show = $(this).find('input[type="checkbox"]').prop('checked');
        if(document.getElementById('sun-form')) {//旭日图中展开选项
            if (show) {
                $(this).parent().parent().find(".sun-label-type").show();
            } else {
                $(this).parent().parent().find(".sun-label-type").hide();
            }
        }else {
            myChart.setOption({
                series: [{
                    label: {
                        normal: {
                            show: show
                        }
                    }
                }]
            });
        }
    });

// 修改标题
    $('.sz-head+input').blur(function(){
        if($(this).val() && $(this).val()!="") {
            myChart.setOption({
                title: {
                    text: $(this).val(),
                }
            });
        }
    });
    $(window).resize(function() {
        myChart.resize();
    });
});


//修改散点图x轴名称
function updateXName(name){
    myChart.setOption({
        xAxis: {
            name:name,
        }
    });
}
//修改散点图y轴名称
function updateYName(name){
    myChart.setOption({
        yAxis: {
            name:name,
        }
    });
}
//修改y轴的最小值
function updateYmin(minValue){
    myChart.setOption({
        yAxis: {
            min:minValue,
        }
    });
}
//修改y轴的最大值
function updateYmax(maxValue){
    myChart.setOption({
        yAxis: {
            max:maxValue,
        }
    });
}

//修改弹窗中颜色条区域
function updateColorRangeBG(isTransfer){
    //获取是否设置梯度
    var isColorRank =  $('#color-rank-label').find('input[type="checkbox"]').prop('checked');
    //获取梯度值
    var rank=1;
    if(isColorRank){
        rank=parseInt($("#rankinput").val());
        if(rank>20){
            rank=20;
        }else if(rank<1){
            rank=1;
        }
    }
    var bcolor=$("#b-color-span").css("background-color");
    var ecolor=$("#e-color-span").css("background-color");
    if(isTransfer){//颜色反转
        var c;
        c="";
        c=bcolor;
        bcolor=ecolor;
        ecolor=c;
    }
    var colorArry=getColorRangeStyle(bcolor,ecolor,isColorRank,rank);
    $("#b-color-span").css("background-color",colorArry[0]);
    $("#e-color-span").css("background-color",colorArry[1]);
    $("#color-range-span").css("background",colorArry[2]);
}
//漏斗图初始化
function  initFunnel(){
    var option = {
        title: {
            text: '漏斗图',
            top:0,
            left:'center',
            //subtext: '纯属虚构'
        },
        tooltip: {
            trigger: 'item',
            backgroundColor:'#fff',
            formatter: function(a,b,c){
                var html;
                html='<div style="color:#333">'+a.seriesName+'</div>';
                html+='<div style="color:'+a.color+';width:100px " >'+a.data.name+':'+a.value+'%</div>';
                return  html;
            },
            textStyle:{
                color:'#333'
            },
            extraCssText:'box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);'//阴影设置
        },
        //toolbox: {
        //    feature: {
        //        dataView: {readOnly: false},//数据预览
        //        restore: {},//还原
        //        saveAsImage: {}//保存图片
        //    }
        //},
        legend: {
            data: ['展现','点击','访问','咨询','订单'],
            right:0,
            top:45,
        },
        calculable: true,
        series: [
            {
                name:'漏斗图',
                type:'funnel',
                left: 0,
                top: 90,
                //x2: 80,
                //bottom: 60,
                width: '100%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                orient: 'horizontal',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                },
                data: [
                    {value: 60, name: '访问'},
                    {value: 40, name: '咨询'},
                    {value: 20, name: '订单'},
                    {value: 80, name: '点击'},
                    {value: 100, name: '展现'}
                ]
            }
        ]
    };
    initChart(option);
}

//随机数
function randomData() {
    return Math.round(Math.random()*1000);
}

//地图面积图 修改地图的颜色值
function updateMapColor(bcolor,ecolor){
    myChart.setOption({
        visualMap: {
            inRange: { //设置渐变的2个颜色
                color: [bcolor, ecolor]
            },
        }
    });
}

//地图面积图 设置颜色反转
function updateTransferColor(isTransfer){
    if(isTransfer!==true && isTransfer!==false){
        return false;
    }else{
        myChart.setOption({
            visualMap: {
                inverse:isTransfer,//颜色值反转
            }
        });
        return true;
    }
}

//设置颜色值的变化
function updateVisualMapType(color_rank,rank){
    if(color_rank) {//设置了梯度变化
        myChart.setOption({
            visualMap: {
                type: 'piecewise',
                splitNumber:rank
            }
        });
    }else{
        myChart.setOption({
            visualMap: {
                type: 'continuous',
                splitNumber:rank
            }
        });
    }
}

//初始化湖北省地图
function initMapHubei(){
    var option={
        title: {
            text: '本周新增订单分布',
            left: 'center',
            top:0
        },
        series: [{
            type: 'map',
            map: 'hubei'
        }]
    }
    initChart(option);
}

function showProvince(title,name,data) {
    $.get('js/myjs/map/json/'+name+'.json', function (geoJson) {//引入对应的json数据
        echarts.registerMap(name, geoJson);
        myChart.setOption(option = {
            backgroundColor: '#fff',
            title: {
                text: title,
                left: 'center',
                textStyle: {
                    color: '#333'
                }
            },
            tooltip: {
                trigger: 'item',
                extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
                confine:true,//是否将 tooltip 框限制在图表的区域内。
                formatter: function(a,b,c,d){
                    var html;
                    html='<div style="color:#333;text-align: center;min-width:100px;width: auto;">'+a.data.name+'</div>';
                    html+='<div style="color:#333;min-width:100px;width: auto;text-align: center; " >'+ a.seriesName+':'+ a.data.value+'</div>';
                    return  html;
                },
                backgroundColor:'#fff'
            },
            visualMap: {//颜色视觉条设置
                type:'continuous',
                min: 0,
                max: 2500,
                left: '50',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true,
                inverse:true,//颜色值反转
                inRange: { //设置渐变的2个颜色
                    color: ['#abcbf4', '#4f6cae']
                },
                outOfRange:{
                    color:'#ddd',
                },
                orient:'horizontal', //颜色条目水平放置
                itemWidth:'10',
                itemHeight:'100',
            },
            series: [
                {
                    type: 'map',
                    name: 'iphone',
                    mapType: name,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#333'
                            },
                            //formatter: function(a,b,c,d){ //自定义内容
                            //    //var html="<div style='color:#fff;'>"+a.data.value+"</div><div>"+a.data.name+"</div>";
                            //    return a.data.name;
                            //},
                            borderColor: '#ddd',
                            areaColor: '#ddd',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            },
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#eee',
                            areaColor: '#ddd',
                        },
                        emphasis: {
                            areaColor: '#0066ff',
                            borderColor: '#eee',
                        }
                    },
                    data:data,
                }
            ],
        });
    });
}

//地图面积图（设置数值范围，根据数值范围颜色渲染）
function  initMapareaByValue(){
    var option = {
        title: {
            text: '本周新增订单分布',
            left: 'center',
            top:0
        },
        tooltip: {
            trigger: 'item',
            extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
            confine:true,//是否将 tooltip 框限制在图表的区域内。
            formatter: function(a,b,c,d){
                var html;
                html='<div style="color:#333;text-align: center;min-width:100px;width: auto;">'+a.data.name+'</div>';
                html+='<div style="color:#333;min-width:100px;width: auto;text-align: center; " >'+ a.seriesName+':'+ a.data.value+'</div>';
                return  html;
            },
            backgroundColor:'#fff'
        },
        //legend: {
        //    //orient: 'vertical',
        //    right:0,
        //    top:45,
        //    data:['iphone3','iphone4','iphone5']
        //},
        visualMap: {//颜色视觉条设置
            type:'continuous',
            min: 0,
            max: 2500,
            left: '50',
            top: 'bottom',
            text: ['高','低'],           // 文本，默认为数值文本
            calculable: true,
            inverse:true,//颜色值反转
            inRange: { //设置渐变的2个颜色
                color: ['#abcbf4', '#4f6cae']
            },
            orient:'horizontal', //颜色条目水平放置
            itemWidth:'10',
            itemHeight:'100',
        },
        backgroundColor: '#fff',
        series: [
            {
                name: 'iphone3',
                type: 'map',
                top:45,
                left:'center',
                mapType: 'china',
                roam: false,
                label: {
                    emphasis: {
                        show: true
                    },
                },
                itemStyle:{//定义区域颜色
                    normal:{
                        borderColor:'#eee',
                        areaColor:'#eee',
                    },
                    emphasis: {
                        areaColor:'#eee',
                        borderColor:'#fff',
                    },
                },
                data:[
                    {name: '北京',value: randomData() },
                    {name: '天津',value: randomData() },
                    {name: '上海',value: randomData() },
                    {name: '重庆',value: randomData() },
                    {name: '河北',value: randomData() },
                    {name: '河南',value: randomData() },
                    {name: '云南',value: randomData() },
                    {name: '辽宁',value: randomData() },
                    {name: '黑龙江',value: randomData() },
                    {name: '湖南',value: randomData() },
                    {name: '安徽',value: randomData() },
                    {name: '山东',value: randomData() },
                    {name: '新疆',value: 1 },
                    {name: '江苏',value: randomData() },
                    {name: '浙江',value: randomData() },
                    {name: '江西',value: randomData() },
                    {name: '湖北',value: randomData() },
                    {name: '广西',value: randomData() },
                    {name: '甘肃',value: randomData() },
                    {name: '山西',value: randomData() },
                    {name: '内蒙古',value: randomData() },
                    {name: '陕西',value: randomData() },
                    {name: '吉林',value: randomData() },
                    {name: '福建',value: randomData() },
                    {name: '贵州',value: randomData() },
                    {name: '广东',value: randomData() },
                    {name: '青海',value: randomData() },
                    {name: '西藏',value: randomData() },
                    {name: '四川',value: randomData() },
                    {name: '宁夏',value: randomData() },
                    {name: '海南',value: randomData() },
                    {name: '台湾',value: randomData() },
                    {name: '香港',value: randomData() },
                    {name: '澳门',value: randomData() }
                ]
            },

        ],
        color:['#ca8622', '#bda29a'],//图例颜色
    };
    initChart(option);
}

//地图面积初始化
function  initMaparea(){
    var option = {
        title: {
            text: '本周新增订单分布',
            left: 'center',
            top:0,
            textStyle:{
                color:'#333',
                fontSize:20,
            },
        },
        textStyle:{
            color: '#fff',
            fontSize:14,
        },
        tooltip: {
            trigger: 'item',//触发类型
            extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
            confine:true,//是否将 tooltip 框限制在图表的区域内。
            formatter: function(a){
                var html;
                html='<div style="color:#333;text-align: center;min-width:100px;width: auto;">'+a.data.name+'</div>';
                html+='<div style="color:'+a.data.itemStyle.emphasis.areaColor+';min-width:100px;width: auto;text-align: center;font-weight: bold; " >新增订单分布:'+a.data.value+'</div>';
                return  html;
            },
            backgroundColor:'#fff'
        },
        series: [
            {
                name: '中国',
                type: 'map',
                mapType: 'china',
                selectedMode : 'multiple',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[
                    {name:'广东',value:'10000',selected:true,itemStyle:{emphasis:{areaColor:'#054561',borderColor:'#054561'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'北京',value:'20000',selected:true,itemStyle:{emphasis:{areaColor:'#0057d5',borderColor:'#0057d5'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'新疆',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#a2a233',borderColor:'#a2a233'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'西藏',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#7ed9f4',borderColor:'#7ed9f4'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'四川',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#054561',borderColor:'#054561'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'山东',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#a2a202',borderColor:'#a2a202'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'辽宁',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#a2a202',borderColor:'#a2a202'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'海南',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#797af7',borderColor:'#797af7'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'天津',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#d4d9f8',borderColor:'#d4d9f8'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},
                    {name:'青海',value:'200',selected:true,itemStyle:{emphasis:{areaColor:'#2258cd',borderColor:'#2258cd'}},label:{emphasis:{show:true,textStyle:{color:'#fff',fontSize:14}}}},

                ],
                zoom:1


            }
        ]
    };
    initChart(option);
}

//初始化图表
function initChart(option){
    myChart.setOption(option);

}

/*获取颜色条的渐变属性
 *@param   string  bRgb 开始颜色值
 *@param   string  eRgb 结束颜色值
 *@param   bool    iscolorRank  是否设置了梯度变化
 *@param   Number  rank 梯度值
 *@return  arry  颜色条的渐变属性
 */

function getColorRangeStyle(bRgb,eRgb,iscolorRank,rank){
    var colorRange;
    if(iscolorRank===true && rank && rank>1){
        var rankArry=getRgbByRank(bRgb,eRgb,rank);
        if(rankArry && rankArry.length>1){
            colorRange=getColorRange(rankArry);
        }
    }else{
        colorRange="-webkit-linear-gradient(left, "+bRgb+", "+eRgb+")";
    }
    var colorArry=new Array();
    colorArry[0]=bRgb;
    colorArry[1]=eRgb;
    colorArry[2]=colorRange;
    return  colorArry;
}

/*计算rgb色值的梯度值
 *@param   string  bRgb 开始颜色值
 *@param   string  eRgb 结束颜色值
 *@param   Number  rank 梯度
 *@return  Array   各个梯度的rgb值
*/
 function getRgbByRank(bRgb,eRgb,rank){

     var bRgbArry=bRgb.match(/\d+/g);
     var eRgbArry=eRgb.match(/\d+/g);
     if(bRgbArry.length<3 || eRgbArry.length<3 || rank<2){//不合法的rgb值
         return null;
     }else{
         var r_rank_v=parseFloat((parseInt(bRgbArry[0])-parseInt(eRgbArry[0]))/parseInt(rank-1));
         var g_rank_v=parseFloat((parseInt(bRgbArry[1])-parseInt(eRgbArry[1]))/parseInt(rank-1));
         var b_rank_v=parseFloat((parseInt(bRgbArry[2])-parseInt(eRgbArry[2]))/parseInt(rank-1));
         var rankArry=new Array();
         for(var i=1;i<=rank;i++){
             var rankV;
             rankV='rgb('+Math.round(parseInt(bRgbArry[0])-(i-1)*r_rank_v)+','+Math.round(parseInt(bRgbArry[1])-(i-1)*g_rank_v)+','+Math.round(parseInt(bRgbArry[2])-(i-1)*b_rank_v)+')';
             rankArry[i-1]=rankV;
         }
         return rankArry;
     }
 }

/*
*根据颜色值生成渐变条属性
*
 */
function  getColorRange(rankArry){
    var rank=rankArry.length;
    var style_gradient='-webkit-linear-gradient(left';
    for(var i=0;i<rankArry.length;i++){
        style_gradient+=','+rankArry[i]+' '+(i)*(100/rank)+'%,'+rankArry[i]+' '+(i+1)*(100/rank)+'%';
    }
    style_gradient+=')';
    return style_gradient;
}



//散点图
$(function () {
    //散点图 初始化
    if(document.getElementById('scatter-form')){
        var data=new Array();
        data = [
            [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
            [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
        ];
        var title_text="散点图";
        showScatter(data,title_text);
    }
});

//初始化散点图
function   showScatter(data,title_text){
    myChart.setOption( option = {
        //backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        //    offset: 0,
        //    color: '#f7f8fa'
        //}, {
        //    offset: 1,
        //    color: '#cdd0d5'
        //}]),
        backgroundColor:'#fff',
        title: {
            text: title_text,
            top:0,
            left:'center',
        },
        legend: {
            right:0,
            top:30,
            data: ['1990', '2015']
        },
        xAxis: {
            name:'x轴名称',
            nameLocation:'middle',
            nameGap:40,
            nameTextStyle:{
                color:'#333'
            },
            splitLine: {
                show:true,//是否显示刻度线
                lineStyle: {
                    type: 'dashed'
                }
            },
            axisLine:{//轴线设置
                show:true,//是否显示轴线
                lineStyle:{//坐标轴线的颜色定义
                    color:'#ccc',
                },
            },
            axisTick:{//刻度设置
                show:true,
            },
            axisLabel:{//标签设置
                show:true,
                //rotate:45,
                textStyle: {
                    color:'#333',
                    //color: function (val) {//用函数的方式定义
                    //    return val >= 60 ? 'green' : 'red';
                    //}
                }
            },
            min:0,//x轴的最小值
            max:70000,//x轴的最大值
        },
        yAxis: {
            name:'y轴名称',
            nameLocation:'middle',
            nameGap:40,
            nameTextStyle:{
                color:'#333'
            },
            nameRotate:90,
            splitLine: {
                show:true,//是否显示刻度线
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true,
            axisLine:{
                show:true,//是否显示轴线
                lineStyle:{//坐标轴线的颜色定义
                    color:'#ccc',
                },
            },
            axisTick:{//刻度设置
                show:true,
            },
            axisLabel:{//标签设置
                show:true,
                //rotate:45,//倾斜角度
                textStyle: {
                    color:'#333',
                    //color: function (val) {//用函数的方式定义
                    //    return val >= 60 ? 'green' : 'red';
                    //}
                }
            },
            min:55,//y轴的最小值
            max:85,//y轴的最大值
        },
        series: [{
            name: '1990',
            data: data[0],
            //top: 110,
            left:0,
            type: 'scatter',
            symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,

                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{//点元素颜色设置 两种颜色的混合渐变
                        offset: 0,
                        color: 'rgb(251, 118, 123)'
                    }, {
                        offset: 1,
                        color: 'rgb(204, 46, 72)'
                    }])
                }
            },
            markLine: {//辅助线配置
                data: [
                    { type: 'average', name: '平均值' }, //简单写法
                    [{
                        symbol: 'none',
                        y: '10%',
                        xAxis: '20000'
                    },
                        {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最大值'
                        },
                    ],
                ]
            },
        }, {
            name: '2015',
            data: data[1],
            type: 'scatter',
            symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2;
            },
            label: {
                emphasis: {
                    show: true,
                    formatter: function (param) {
                        return param.data[3];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{//点元素颜色设置两种颜色的混合渐变
                        offset: 0,
                        color: 'rgb(129, 227, 238)'
                    }, {
                        offset: 1,
                        color: 'rgb(25, 183, 207)'
                    }])
                }
            }
        }],

    });

}


//旭日图
$(function () {
    //旭日图 初始化
    if(document.getElementById('sun-form')){
        var data=new Array();
        var opacity_v=0.7;
        data = [
            [
                {value:500, name:'北京',itemStyle:{normal:{color:'#024273',borderColor:'#fff'}}},
                {value:300, name:'武汉',itemStyle:{normal:{color:'#17afb7',borderColor:'#fff'}}},
                {value:800, name:'上海',itemStyle:{normal:{color:'#74a4e4',borderColor:'#fff'}}},
                {value:300, name:'广州',itemStyle:{normal:{color:'#94d7f1',borderColor:'#fff'}}},
                {value:300, name:'成都',itemStyle:{normal:{color:'#9dc9de',borderColor:'#fff'}}},
                {value:300, name:'深圳',itemStyle:{normal:{color:'#a3a314',borderColor:'#fff'}}},
                {value:300, name:'杭州',itemStyle:{normal:{color:'#eca2a0',borderColor:'#fff'}}},
                {value:300, name:'长沙',itemStyle:{normal:{color:'#0059ce',borderColor:'#fff'}}},
            ],
            [
                {value:100, name:'海淀区',itemStyle:{normal:{color:'#024273',borderColor:'#fff',opacity:opacity_v}}},
                {value:200, name:'西城区',itemStyle:{normal:{color:'#024273',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'东城区',itemStyle:{normal:{color:'#024273',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'朝阳区',itemStyle:{normal:{color:'#024273',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'武昌区',itemStyle:{normal:{color:'#17afb7',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'汉口区',itemStyle:{normal:{color:'#17afb7',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'汉阳区',itemStyle:{normal:{color:'#17afb7',borderColor:'#fff',opacity:opacity_v}}},
                {value:400, name:'杨浦区',itemStyle:{normal:{color:'#74a4e4',borderColor:'#fff',opacity:opacity_v}}},
                {value:400, name:'浦东区',itemStyle:{normal:{color:'#74a4e4',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'白云区',itemStyle:{normal:{color:'#94d7f1',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'珠海区',itemStyle:{normal:{color:'#94d7f1',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'越秀区',itemStyle:{normal:{color:'#94d7f1',borderColor:'#fff',opacity:opacity_v}}},

                {value:100, name:'金牛区',itemStyle:{normal:{color:'#9dc9de',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'青羊区',itemStyle:{normal:{color:'#9dc9de',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'成华区',itemStyle:{normal:{color:'#9dc9de',borderColor:'#fff',opacity:opacity_v}}},

                {value:100, name:'福田区',itemStyle:{normal:{color:'#a3a314',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'南山区',itemStyle:{normal:{color:'#a3a314',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'罗湖区',itemStyle:{normal:{color:'#a3a314',borderColor:'#fff',opacity:opacity_v}}},

                {value:100, name:'上城区',itemStyle:{normal:{color:'#eca2a0',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'江干区',itemStyle:{normal:{color:'#eca2a0',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'萧山区',itemStyle:{normal:{color:'#eca2a0',borderColor:'#fff',opacity:opacity_v}}},

                {value:100, name:'雨花区',itemStyle:{normal:{color:'#0059ce',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'田心区',itemStyle:{normal:{color:'#0059ce',borderColor:'#fff',opacity:opacity_v}}},
                {value:100, name:'开福区',itemStyle:{normal:{color:'#0059ce',borderColor:'#fff',opacity:opacity_v}}},
            ]
        ];
        var title_text="旭日图";
        showSun(data,title_text);

        //   图表标签
        $('.tool-box .sub-item.sun-label .Checkbox').on('click', function () {
            var show = $(this).find('input[type="checkbox"]').prop('checked');
            if(document.getElementById('sun-form')) {
                if (show) {
                    $(this).parent().find(".sun-label-type").show();
                } else {
                    $(this).parent().find(".sun-label-type").hide();
                }
            }
            //myChart.setOption({
            //    series: [{
            //        label: {
            //            normal: {
            //                show: show
            //            }
            //        }
            //    }]
            //});
        });

    }
});

//初始化旭日图
function   showSun(data,title_text) {
    myChart.setOption(option = {
        title: {
            text: title_text,
            top:0,
            left:'center',
            formatter: function(a){
                var html;
                html='<div style="color:#333;text-align: center;min-width:100px;width: auto;">'+a.data.name+'</div>';
                html+='<div style="color:'+a.data.itemStyle.emphasis.areaColor+';min-width:100px;width: auto;text-align: center;font-weight: bold; " >新增订单分布:'+a.data.value+'</div>';
                return  html;
            },
            backgroundColor:'#fff'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            right:0,
            top:45,
            orient: 'horizontal',
            data:['北京','武汉','上海','广州','杭州','成都','深圳','长沙']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                selectedMode: false,
                radius: ['60', '160'],
                center: ['50%', '55%'],
                zlevel:0,
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data[0],
            },
            {
                name:'访问来源',
                type:'pie',
                radius: ['160', '250'],
                center: ['50%', '55%'],
                zlevel:2,
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:data[1],
            }
        ]
    });
}
