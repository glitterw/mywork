<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>全民阅读指数</title>
<link  href="/reader/Public/CSS/layout.css" type="text/css" rel="stylesheet" />
<link href="/reader/Public/CSS/master.css" type="text/css" rel="stylesheet" />
<script src="/reader/Public/Js/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="/reader/Public/Js/layout.js" type="text/javascript"></script>
<script src="/reader/Public/Js/jquery-form.js" type="text/jscript"></script>
<script src="/reader/Public/Js/echarts.min.js" type="text/javascript"></script>
</head>

<body>
<div id="wraper">
	<!--header begin-->
    	<div id="header" class="width100 relative">
        	<div class="headerBg width100 borderSolid">
            	<div class="width1100 marginAuto">
                    <ul class="fr">
                       	<li><a href="<?php echo U('Home/Index/map');?>" >图书总动员</a></li>
                    	<li><a href="<?php echo U('Home/Index/reader');?>" class="active">全民阅读指数</a></li>
                    	<li><a href="<?php echo U('Home/Index/book');?>">读书之城</a></li>
                    </ul>
                    <div class="logo fl"><a href="<?php echo U('Home/Index/index');?>" target="_self"><img src="/reader/Public/Images/logo.png" /></a></div>
                </div>
            </div>
        </div>
    	<!--header end-->
    <div id="container" class="width1100 marginAuto">
    	<!--区域指数分析-->
    	<div class=" Regional overflow width100">
<form action="<?php echo U('Home/Index/getLevelChilren');?>" target="_blank"   name="levelForm"  id="levelForm" method="post"> 
    <input name="level"  id="level"type="hidden" value="1" />
    <input name="fatherName" id="fatherName" type="hidden" value="" /> 
</form>	
            
<form action="<?php echo U('Home/Index/getAreaData');?>" target="_blank"   name="areaForm"  id="areaForm" method="post"> 
    <input name="levelName1" id="levelName1"type="hidden" value="" />
    <input name="levelName2" id="levelName2" type="hidden" value="" />
    <input name="levelName3" id="levelName3" type="hidden" value="" /> 
</form>	           
<form action="<?php echo U('Home/Index/getNormData');?>" target="_blank"   name="normForm"  id="normForm" method="post"> 
    <input name="areaId" id="areaId"type="hidden" value="0" /> 
</form>	 

            <!--标题-->
        	<div class="title mar_b20">
            	<h2 class="fl fontSize20px"><span></span>区域指数分析</h2>
                <div class="selectBox width165 fr">
                	<div class="selectList" id="selectList03">
                        <span id="norm03" class="fontSize14px fontColor666">选择三级指标</span>
						<i class="arrow arrowL"></i>
                        <ul  id="levelList3">
                             
                        </ul>
                    </div>
                </div>
                <div class="selectBox width165 fr">
                	<div class="selectList" id="selectList02">
                        <span id="norm02" class="fontSize14px fontColor666">选择二级指标</span>
						<i class="arrow arrowL"></i> 
                        <ul id="levelList2"> 
                        </ul>
                    </div>
                </div>
                <div class="selectBox width165 fr">
                	<div class="selectList" id="selectList01">
                        <span id="norm01" class="fontSize14px fontColor666">选择一级指标</span>
						<i class="arrow arrowL"></i>
                        <ul id="levelList1"> 
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="score fontSize16px fontColor666 mar_b20">武汉市全面阅读综合评估得分：<i id="areaSumScore"><?php echo ($score); ?></i>分</div>
            <!--标题结束-->
            <div class=" Regional_con backgorundColor">
				 
				
				<div class="topBar" style="width:1060px;height:350px; "></div>
				
				
				
				
           </div>
        </div>
        <!--区域指数分析结束-->
        
        <!--指数构成分析-->
       	<div class="composition width100">
        	<!--标题-->
        	<div class="title mar_b20">
            	<h2 class="fl fontSize20px"><span></span>指数构成分析</h2>
                <div class="selectBox width215 fr">
                	<div class="selectList" id="selectList04" >
                        <span id="norm04" class="fontSize14px fontColor666">选择区域</span><i class="arrow arrowL"></i>
                        <ul>
                        	<?php if(is_array($areaList)): $i = 0; $__LIST__ = $areaList;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i;?><li onclick="selectAreaLi(<?php echo ($v["id"]); ?>,'<?php echo ($v["name"]); ?>')"><?php echo ($v["name"]); ?></li><?php endforeach; endif; else: echo "" ;endif; ?> 
                        </ul>
                    </div>
                </div>
            </div>
            <div class="score fontSize16px fontColor666 mar_b20">2015年全面阅读建设综合评估得分为：<i id="normSumScore"><?php echo ($score); ?></i>分</div>
            <!--标题结束-->
            <div class="composition_con overflow mar_b10">
            	<div class="composition_left backgorundColor fl leftPin" style="width:525px;height:345px;border:1px;">
				 
				</div>
                <div class="composition_right backgorundColor fr">
                	<ol id="Tab01">
                      <?php if(is_array($levelList1)): $i = 0; $__LIST__ = $levelList1;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$v): $mod = ($i % 2 );++$i; if($i == 1): ?><li  id="Tab011" class="active" onclick="displayLevel2('<?php echo ($v['level1']); ?>')"><?php echo ($v['level1']); ?></li>
                        <?php else: ?>
                        <li onclick="displayLevel2('<?php echo ($v['level1']); ?>')"><?php echo ($v['level1']); ?></li><?php endif; endforeach; endif; else: echo "" ;endif; ?> 
                    </ol>
                    <ul>
					<li style="display:block;margin-top:50px;">
						<div class="rightBar" style="width:385px;height:280px;border:1px;"></div>
					</li> 
                    </ul>
               	 </div>
           </div>
          <div class="explanation fontSize14px fontColor999 mar_b50">
          	<p>说明：本评估系统的指标制定及评分标准严格按照《武汉市全民阅读综合评估指标体系》执行，分为基础建设、服务系统、阅读活动、阅读绩效及保障措施5个大模块，即5个一级指标。下设二级指标18个，三级指标73个。本系统依据各区文化系统搜集信息、网上问卷收集信息及线下调查问卷信息综合得出评估结果。</p>
          </div>
        </div>
        <!--指数构成分析结束-->

        
        
    </div>
    <!--底部-->
    <div id="footer">
    	<p class="width1100 marginAuto">武汉全民阅读</p>	
    </div>
    <!--底部结束-->
</div>
<script type="text/javascript">
	$(function(){
		//初始化指标柱状图
		getAreaData();
		//下部左侧饼图初始化
		getNormData();
		//下部中间一级指标列表初始化
		getLevelList(1);
		//下部右侧柱状图初始化
		displayLevel2("<?php echo ($levelList1[0]['level1']); ?>");
	});
	//清除下拉框中的内容
	function cleanLi(level){
		if(level==1){
			 
			$("#levelList2").html(""); 
			$('#norm02').html('选择二级指标'); 
			$("#levelList3").html("");
			$('#norm03').html('选择三级指标'); 		
		}
		else if(level==2){ 
			$("#levelList3").html("");
			$('#norm03').html('选择三级指标'); 		
		}
	}
	//选中区域值
	function selectAreaLi(areaId,areaName){
		var thisObj=$('#norm04');  
		//更改选择的值
		thisObj.html(areaName);
		//下拉菜单收起
		thisObj.siblings("ul").slideUp();
		//设置隐藏域
		$("#areaId").val(areaId); 
		//获取指标数据
		getNormData();
		//第一个选项卡选中
		$("#Tab011").siblings("li").attr("class","");
		$("#Tab011").attr("class","active"); 
		//$("#Tab1").find("li")[0].attr("class","active"); 
		displayLevel2("<?php echo ($levelList1[0]['level1']); ?>");			
	}
	//获取二级指标加载右侧柱状图
	function displayLevel2(level1){ 
		$("#normForm").ajaxSubmit({  
		 type:'post',
		 data: { 'level1': level1},
		 success:function(json){   
			var obj = JSON.parse(json);  
			if(obj.result){  
				var data=obj.data;
				if(data.length>0){ 
					var titleA=new Array();
					var scoreA=new Array(); 
					for(var i=0; i<data.length; i++) 
					{     
						titleA[i]=data[i]['level2'];
						scoreA[i]=data[i]['score'] ; 
					}
					setRightBarChart(titleA,scoreA,level1);	 
					 
				}//if end
				else{
					//alert('此类别没有图书馆信息'); 
					return ;
				} 
			}
			else{ 
				alert('获取区域指标数据失败！');	
			} 
			
		},
		error:function(XmlHttpRequest,textStatus,errorThrown){ 
			$('.progressBar').hide();
			alert('请求失败');
		}
	 });   	 		
	 
	}

	//获取某区域的指标数据
	function  getNormData(){ 
		$("#normForm").ajaxSubmit({  
		 type:'post', 
		 success:function(json){   
			var obj = JSON.parse(json);  
			if(obj.result){ 
			    //修改总分
				$("#normSumScore").html(obj.sumScore);
				var data=obj.data;
				if(data.length>0){
					//左侧饼图
					var leftArray=new Array();
					//中间菜单
					var html='';  
					for(var i=0; i<data.length; i++) 
					{     
					  var obj={value:data[i]['score'], name:data[i]['level1']};
					  leftArray[i]=obj; 
					}
					var areaName=$("#norm04").html();
					if(areaName=='选择区域')areaName='全市';
					areaName+="综合评估得分构成分析";
					//改变 
					setLeftPinChart(leftArray,areaName);
					 
				}//if end
				else{
					//alert('此类别没有图书馆信息'); 
					return ;
				} 
			}
			else{ 
				alert('获取区域指标数据失败！');	
			} 
			
		},
		error:function(XmlHttpRequest,textStatus,errorThrown){ 
			$('.progressBar').hide();
			alert('请求失败');
		}
	 });   	 		
		
	}
	
	//选中下拉菜单的值
	function selectLi(level,levelName){ 
	     cleanLi(level);
		var thisObj=$('#norm0'+level);  
		//更改选择的值
		thisObj.html(levelName);
		//下拉菜单收起
		thisObj.siblings("ul").slideUp();
		//隐藏字段赋值
		$("#levelName"+level).val(levelName);
		if(level==1) getLevelList(2,levelName); 
		else if(level==2)  getLevelList(3,levelName);
	    getAreaData(); 
		 
	}
	
	//获取区域指标分析数据
	function getAreaData(){ 
		//$("#areaForm").submit();
		//return ;
		$("#areaForm").ajaxSubmit({  
		 type:'post', 
		 success:function(json){   
			var obj = JSON.parse(json);  
			if(obj.result){
				
				$("#areaSumScore").html(obj.sumScore);  
				var data=obj.data;
				if(data.length>0){ 
					var titleA= new Array();
					var scoreA= new Array();
					for(var i=0; i<data.length; i++)  
					{    //alert(data[i]['name']);
						 titleA[i]=data[i]['other_name'];
						 scoreA[i]=data[i]['score'];
					}
					setTopBarChart(titleA,scoreA);
				}//if end
				else{
					//alert('此类别没有图书馆信息'); 
					return ;
				} 
			}
			else{ 
				alert('获取区域指标数据失败！');	
			} 
			
		},
		error:function(XmlHttpRequest,textStatus,errorThrown){ 
			$('.progressBar').hide();
			alert('请求失败');
		}
	 });   	 
	}	


	//获取指标列表
	function getLevelList(level,fatherName){
		$("#level").val(level);
		$("#fatherName").val(fatherName); 
		$("#levelForm").ajaxSubmit({  
		 type:'post', 
		 success:function(json){   
			var obj = JSON.parse(json);  
			if(obj.result){  
				var data=obj.data;
				if(data.length>0){ 
					var html='';
					var fieldName='level'+level;
					for(var i=0; i<data.length; i++)  
					{   
						var levelName=data[i][fieldName];
						var onclickFunction="selectLi("+level+",'"+levelName+"')"; 	 
						html+='<li onclick="'+onclickFunction+'">'+levelName+'</li>'; 
					}//for end 
					$("#levelList"+level).html(html); 
				}//if end
				else{
					//alert('此类别没有图书馆信息'); 
					return ;
				} 
			}
			else{
				var msg='';
				if(level==1)msg='获取一级指标列表失败';
				else if(level==2)msg='获取"'+fatherName+'"下面的二级指标列表失败！'
				else if(level==3)msg='获取"'+fatherName+'"下面的三级指标列表失败！'
				alert(msg);	
			} 
			
		},
		error:function(XmlHttpRequest,textStatus,errorThrown){ 
			$('.progressBar').hide();
			alert('请求失败');
		}
	 });   	
					
	}

	//武汉市全民阅读综合评估得分柱状图
	function setTopBarChart(titleArray,scoreArray){
		var myChart = echarts.init($(".topBar")[0]);
		var option = {
			 title : {
				text : '全民阅读建设综合评估得分构成分析',
				 x : 'center'
			},
			 grid :  {
				  show:false  
			 },
			 xAxis : [
				{
					type : 'category',
					show: false,
					data : titleArray,
					//不显示网格线
					splitLine:{show: false}
				}
			],	
			yAxis : [
				{
					type : 'value' ,
					show: false,
					//不显示网格线
					splitLine:{show: false}
				}
			],
			series : [
				{
					name:'直接访问',
					type:'bar',
					barWidth : 50,
					//柱条之间的距离
					barGap: '20%', 
					itemStyle:{
						normal: {
							color: function(params) {
								var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD','#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0' ];
								 return colorList[params.dataIndex]
							},
							barBorderRadius: 15,
							label: {
								show: true,
								position: 'top',
								formatter: '{b}\n{c}'
							}
						} 
					},
					data:scoreArray
				}
			]
		};
		myChart.setOption(option);
	}
	//2015年全民阅读建设综合评估得分饼图
	function setLeftPinChart(leftValue,areaName){ 
		var myChart = echarts.init($(".leftPin")[0]);
		var option = {
			title : {
				text : areaName,
				 x : 'center'
			},
			series : [
				{
					name: '得分构成分析',
					type: 'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data:leftValue,
					label: {
						normal: {
							show : true,
							formatter: '{b}{d}%'
						}
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			],
			color : ['#dc69aa','#96706d', '#97b553', '#8d99b3', '#e5ce0c','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
		};
		myChart.setOption(option);
	}
	//二级指标明细柱状图
	function setRightBarChart(titleArray,valueArray,title){
		var myChart = echarts.init($(".rightBar")[0]);
		var option = {
			title : {
				text : title,//'二级指标得分明细',
				 x : 'center'
			},
			xAxis : [
				{
					type : 'category',
					axisLabel: {
						show: true,
						interval: '0',
						inside: false,
						rotate: 60,
						margin: 8,
						formatter: null,
						textStyle: {
						color: '#333',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: 'sans-serief',
						fontSize: 12,
						}
					}, 
					data : titleArray
				}
			],	
			yAxis : [
				{
					type : 'value',
					
					//show: false
				}
			],
			series : [
				{
					name:'直接访问',
					type:'bar',
					barWidth : 45,
					itemStyle:{
						normal: {
							barBorderRadius: 5
						} 
					},
					data:valueArray
				}
			],
			color : ['#4f81bc','#96706d', '#97b553', '#8d99b3', '#e5ce0c','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
			//backgroundColor : '#e7e7e7'
		};
		myChart.setOption(option);
	}
</script>
</body>
</html>