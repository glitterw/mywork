<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>图书总动员</title>
    <link href="/reader/Public/CSS/layout.css" rel="stylesheet" type="text/css" />
    <link href="/reader/Public/CSS/master.css" rel="stylesheet" type="text/css" />
    <script src="/reader/Public/Js/jquery-1.11.1.min.js" type="text/javascript" language="javascript"></script>
    <script src="/reader/Public/Js/jquery-form.js" type="text/jscript"></script>
    <script src="/reader/Public/Js/layout.js" type="text/javascript" language="javascript"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=IRNu0UAcUDjUVdOaMCtO8y4F"></script>
 <script type="text/javascript" src="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js"></script>
<link rel="stylesheet" href="http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css"
/> 
    <style>
	body, html{margin: 0;padding:0 !important;padding:95px 0 69px 0;width:100%;height:100%;overflow:hidden;}
	#header{width: 100%;height: 95px;overflow: hidden;position: absolute;top: 0;width: 100%;text-align: center;}
	#content{position:absolute!important;position:relative;top:95px!important;top:0;bottom:69px;width:100%;overflow:hidden;height:auto!important;height:100%;left: -3px; margin-top:-15px;}
	#container{height:100%;overflow-y:auto;text-align:center;}
	#footer{width: 100%;height: 69px;clear: both;position: absolute;bottom: 0;left: 0;}

    </style>
</head>

<body>
<form action="<?php echo U('Home/Index/getLibrary');?>" target="_blank"   name="getform"  id="getform" method="post">
	<input name="area_id" id="area_id" type="hidden" value="0" />
    <input name="library_type_id" id="library_type_id" type="hidden" value="0" />
</form>
	<div id="wraper">
    	<!--header begin-->
    	<div id="header" class="width100 relative">
        	<div class="headerBg width100 borderSolid">
            	<div class="width1200 marginAuto">
                    <!--<ul class="fr">
                    	<li><a href="<?php echo U('Home/Index/map');?>" class="active">图书总动员</a></li>
                    	<li><a href="<?php echo U('Home/Index/reader');?>">全民阅读指数</a></li>
                    	<li><a href="<?php echo U('Home/Index/book');?>">读书之城</a></li>
                    </ul>-->
                    <div class="logo fl"><a href="<?php echo U('Home/Index/index');?>" target="_self"><img src="/reader/Public/Images/logo.png" /></a></div>
                </div>
            </div>
        </div>
    	<!--header end-->
        
        <div id="content">
            <!--container begin-->
            <div id="container" class="StoryBooksContent relative width100 height100">
                <div class="storyBookMap absolute">
                    <!--tabTitle begin-->
                    <ol class="storyMapTitle fl width100">
                        <li class="active" ><i class="storyIcon storyIcon01 fl"></i>全城览书</li>
                        <!--<li class="fontSize16px"><i class="storyIcon storyIcon02 fl"></i>读书问津</li>-->
                    </ol>
                    <!--tabTitle end-->
                    
                    <!--tabUL begin-->
                    <ul class="storyUL width100 fl">
                        <li class="fl width100 relative storyLI" style="display:block">
                            <!--PartitionBox begin-->
                            <div class="storyULBox PartitionBox fl relative">
                                <span class="storyIcon close"></span>
                                <ul class="width100 fl">
                                    <li><a class="active"  onclick="setArea(0)">全市</a></li>
                                    <?php if(is_array($areaList)): $i = 0; $__LIST__ = $areaList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li><a onclick="setArea(<?php echo ($v["id"]); ?>)"><?php echo ($v["name"]); ?></a></li><?php endforeach; endif; else: echo "" ;endif; ?> 
                                </ul>
                            </div>
                            <!--PartitionBox end-->
                            
                            <!--readBook begin 类型-->
                            <div class="readBook absolute storyULBox borderSolid">
                                <span class="storyIcon close"   ></span>
                                <ul class="width100 fl"> 
                                    <?php if(is_array($libraryTypeList)): $i = 0; $__LIST__ = $libraryTypeList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i; if( $v['name'] == '24小时自助图书馆'): ?><li id="li_<?php echo ($v["id"]); ?>" onclick="locationLibrary(<?php echo ($v["id"]); ?>)"><i class="storyIcon <?php echo ($v["icon"]); ?>"></i><span class="hours">24小时</br>自助图书馆</span></li>
                                    <?php else: ?>
                                     <li  id="li_<?php echo ($v["id"]); ?>" onclick="locationLibrary(<?php echo ($v["id"]); ?>)"><i class="storyIcon <?php echo ($v["icon"]); ?>"></i><span><?php echo ($v["name"]); ?></span></li><?php endif; endforeach; endif; else: echo "" ;endif; ?>
                                     
                                </ul>
                            </div>
                            <!--readBook end-->
                        </li>
                    </ul>
                    <!--tabUL begin-->  
                </div>  
                
             <!--map begin-->
             <div class="map fixed" id="allmap"   style="height:100%; width:100%"></div>
             <!--map end-->  
    
            <!--storyPostion begin-->
            <div class="storyPosition absolute">
                <div class="storyPostionTitle relative">武汉市图书馆<i class="storyIcon storyPostionIcon absolute"></i></div>
                <span class="width100 fl"><img src="/reader/Public/Images/sanjiao.png" /></span>
                <span class="width100 fl"><img src="/reader/Public/Images/landmarkIcon.png" /></span>
            </div>
            <!--storyPostion end-->
            
            <!--storyDetails begin-->
            <div class="storyDetails absolute">
                <span class="storyIcon close" onclick="closeBox()"></span>
                <div class="DetailsHeadPic backgorund fl width100">
                    <em class="relative fl">
                        <i class="absolute"><img src="/reader/Public/Images/headPicZZbg.png" /></i>
                        <b><img src="/reader/Public/Images/updata/headPic.jpg" /></b>
                    </em>
                    <div class="storyDetailsTitle fl">
                        <h1 class="fontSize18px" id="library_name">武汉市图书馆</h1>
                        <h4 id="library_address">地址：武昌区水果湖街道</h4>
                    </div>
                </div>
                <dl class="DetailsDataDL fl">
                    <dd>
                        <i class="storyIcon DetailsDataIcon01 fl"></i><br />
                        <h1 >藏书量：</h1>
                        <strong class="fontColor" id="library_collect_num" >50,000册</strong>
                    </dd>
                    <dt></dt>
                    <dd>
                        <i class="storyIcon DetailsDataIcon02 fl"></i><br />
                        <h1>年读者访问量：</h1>
                        <strong class="fontColor" id="library_visit_num">50,000人(次)</strong>
                    </dd>
                </dl>
            </div>
            <!--storyDetails end-->
            
            </div>
            <!--container end-->
        </div>
        <!--阴影背景 begin-->
        <div class="bgShadow width100 height100 absolute" ></div>        
        <!--阴影背景 end-->
    </div>
          
    <!--底部-->
    <div id="footer" class="absolute foot width100">
    	<p class="width1100 marginAuto">武汉全民阅读</p>	
    </div>
    <!--底部结束-->
<script type="text/javascript">
	var map =null;
	var array_marker=new Array();
	 
	// 百度地图API功能
	map = new BMap.Map("allmap");//,{mapType: BMAP_PERSPECTIVE_MAP});    // 创建Map实例
	map.centerAndZoom(new BMap.Point(114.353622,30.56486),13);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("武汉市");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩 
	
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用	

//设置选择的行政区，加载图书馆位置
function setArea(area_id){ 
 $('#area_id').val(area_id); 
 //图书馆类型选项卡打开
	$('.readBook').hide();//.animate({'width':'0px','left':'361px'},170);
	$('.PartitionBox .close').show();		
	$('.storyPosition').hide();
	$('.bgShadow').hide();
	$('.storyDetails').hide();
 	var library_type_id=$('#library_type_id').val();
	if(library_type_id>0) getLibraryList();
}

 
//选择图书馆类型设置加载图书馆位置
function locationLibrary(library_type_id){  
 $("#li_"+library_type_id).siblings().removeClass('active');
 $("#li_"+library_type_id).attr("class","active"); 
 $('#library_type_id').val(library_type_id);
 getLibraryList(); 
}

//
function  getLibraryList(){
 //删除之前的点
 cleanMarker() ;
 //$("#getform").submit();
 //return ;
 //获取本类别下面的图书馆 
	$("#getform").ajaxSubmit({  
	 type:'post', 
	 success:function(json){   
		var obj = JSON.parse(json);  
		if(obj.result){  
			var data=obj.data;
			if(data.length>0){  
				  
				for(var i=0; i<data.length; i++)  
				{   
					//图书馆投放到地图上
					var point=new BMap.Point(data[i].lng,data[i].lat);
					var marker = new BMap.Marker(point);
					var label=new BMap.Label(data[i].name,{offset:new BMap.Size(20,-10)}) 
					marker.setLabel(label);
					map.addOverlay(marker); 
					(function(){
						 
							var name=data[i].name;
							var address=data[i].address;
							var collect_num=data[i].collect_num;
							var visit_num=data[i].visit_num; 
							
      						marker.addEventListener('click', function(){
								  //其他的弹动去掉
								  cleanAnimation();
								  map.centerAndZoom(this.getPosition(),18);
								 var circle = new BMap.Circle(this.getPosition(),100,{fillColor:"#999999",strokeColor:"#999999",  strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3}); 
								 this.getMap().addOverlay(circle);
								  //circle.show();
								  this.setAnimation(BMAP_ANIMATION_BOUNCE); 
      							  $('#library_name').html(name);
								  $('#library_address').html(address);
								  $('#library_collect_num').html(collect_num+'册');
								  $('#library_visit_num').html(visit_num+'人次');
      							  $('.storyDetails').show();
      						}); 
						  })(); //fuction end   
						 array_marker[i]=marker;  //把点放进数组，已便于清除弹动 
				}//for end
				//地图中心设置到中间位置
				var centerPoint=new BMap.Point(obj.center.lng,obj.center.lat);
				var level=13;
				if(data.length<10) level=15;
				map.centerAndZoom(centerPoint,level);
				
			}//if end
			else{
				//alert('此类别没有图书馆信息'); 
				return ;
			} 
		}
		else{
			alert('获取图书馆列表失败！');	
		} 
		
	},
	error:function(XmlHttpRequest,textStatus,errorThrown){ 
		$('.progressBar').hide();
		alert('请求失败');
	}
 });   	
	
}

//过时的点恢复原状
function cleanAnimation(){

	for(var i=0; i<array_marker.length; i++)  
	{  
		var marker =array_marker[i]; 
		marker.setAnimation(null);
	}
}

//清除所有的点
function cleanMarker(){

	for(var i=0; i<array_marker.length; i++)  
	{  
		var marker =array_marker[i]; 
		marker.remove();
	}
	 
}

//图书馆详情弹窗关闭
function closeBox(){
	$('.storyDetails').hide();	
	cleanAnimation(); 
	map.reset();
}
 

</script>
</body>



 </html>