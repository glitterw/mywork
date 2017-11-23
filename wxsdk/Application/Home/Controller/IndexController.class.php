<?php
namespace Home\Controller;
use Think\Controller;
use Think\Page;
class IndexController extends Controller { 
 
//首页
Public function index(){ 
	$this->display(); 
}

//地图
Public function map(){ 
	//取出行政区划
	$areaList=M('Area')->where('state=1')->select();
	$this->assign('areaList',$areaList);	
	//取出图书馆类型
	$libraryTypeList=M('Library_type')->where('state=1')->select();
	$this->assign('libraryTypeList',$libraryTypeList);	
	//取出
	$this->display(); 
}
//获取地图加载的图书馆列表
public function getLibrary(){
	$area_id=I('post.area_id');
	$library_type_id=I('post.library_type_id'); 
	if($area_id>0) $where['area_id']=$area_id;
	if($library_type_id>0)$where['library_type_id']=$library_type_id;
	$where['state']=1;
	 
	$list=M('Library')->where($where)->order(lng ,lat)->select();
	
	//取出中间的图书馆作为中间点
	if(count($list)>0) { 
		$centerI=round(count($list)/2);
		$center=$list[$centerI];
	}
	$json['data']=$list;
	$json['result']=true;
	$json['meg']='操作成功！'; 
	$json['center']= $center;
    echo json_encode($json); 
}

//全民阅读指数
Public function reader(){ 
	//获取区域
	$areaList=M('Area')->field('id,name')->where('state=1')->select();
	//获取一级指标
	$levelList1=$this->getChilren(1);
	//全市得分
	$score=M('Score')->field(' ifnull(sum(score),1) as score')->select();
	$this->assign('score',$score[0]['score']);	  
	$this->assign('levelList1',$levelList1);	
	$this->assign('areaList',$areaList);	 
	$this->display(); 
}

/**获取某级指标
*@param $level int  层级（1、2、3）
*@param $fatherName  string  父级名称
*@return  json串
**/
public function getLevelChilren($level,$fatherName=''){
	//数据验证
	if(($level==2 || $level==3) && $fatherName==''){
		$json['result']=false;
		$json['meg']='参数错误！';
	    echo json_encode($json);
	    die(); 			 	
	} 
	if(	$level==1){//取出一级指标
		$list=M('Score')->field('level1')->group('level1')->select(); 
	}
	else if($level==2){//取出二级指标
		$where['level1']=$fatherName;
		$list=M('Score')->field('level2')->where($where)->group('level2')->select(); 
	}
	else if($level==3){//取出三级指标
		$where['level2']=$fatherName;
		$list=M('Score')->field('level3')->where($where)->group('level3')->select(); 		
	}
	else{
		$json['result']=false;
		$json['meg']='参数错误！';
	    echo json_encode($json);
	    die(); 		
	} 
	$json['result']=true;
	$json['meg']='操作成功！';
	$json['data']=$list;
	echo json_encode($json); 
}

//获取区域指数分析数据
public function getAreaData(){
	$levelName1=I('post.levelName1');
	$levelName2=I('post.levelName2');
	$levelName3=I('post.levelName3');
	if(!empty($levelName1))$where['level1']=$levelName1;
	if(!empty($levelName2))$where['level2']=$levelName2;
	if(!empty($levelName3))$where['level3']=$levelName3;
	//总分
	$sumScore=0;
	$i=0;
	//取出所有的区
	$areaList=M('Area')->where('state=1')->select();
	foreach($areaList as $k=> $v){
		$where['area_id']=$v['id'];
		$score=M('Score')->where($where)->field(' ifnull(sum(score),0) as score')->select(); 
		if(	$score) {
				if($score[0]['score']>0) $areaList[$k]['score']=$score[0]['score'];
				else  $areaList[$k]['score']=1;
		}
		else{//给个默认值
			  $areaList[$k]['score']=1;
		}
		$sumScore+=$areaList[$k]['score'];
		$i++;
	}
	 
	$json['result']=true;
	$json['meg']='操作成功！';
	$json['data']=$areaList;
	$json['sumScore']=round($sumScore/$i,1);
	echo json_encode($json); 
	 
}


//获取区域指数分析数据
public function getNormData(){
	$areaId=I('post.areaId');
	if(isDigit( $areaId)&&$areaId>0 ){
		$where['area_id']=$areaId;	
	} 
	//一级指标名称
	$level1=I('post.level1'); 
	if($level1 && $level1!=""){
		$level=2;
		$where['level1']=$level1; 
	}
	else $level=1;
	//取出该区各一级指标的得分 
	$levelList=$this->getChilren($level,$level1); 
	if($levelList===false){ 
		$this->echoJson(false,'指标不存在！'); 		
	}
	//总分计数；
	$sumScore=0; 
	$i=0;
	foreach($levelList as $k=> $v){
		if($level==1)$where['level1']=$v['level1']; 
		else if($level==2)$where['level2']=$v['level2']; 
		$score=M('Score')->where($where)->field(' ifnull(sum(score),1) as score')->select();  
 		$levelList[$k]['score']=$score[0]['score']; 
 		$sumScore+=$score[0]['score'];
 		$i++;
	}
	    $json['sumScore']=round($sumScore/$i,1);
		$json['result']=true;
		$json['meg']='操作成功！';
		$json['data']=$levelList;
		echo json_encode($json);
		die(); 
}

/**获取某一指标的下一级指标
*@param $level int 指标层级
*@param $where string  查询条件
*@retrun array
**/
protected function getChilren($level,$fatherName=''){  
		if($level==1) {
			return M('Score')->field('level1 ')->group('level1')->select(); 
		}
		else 	if($level==2){
			 if(!empty($fatherName))$where['level1']=$fatherName;
			  $data=M('Score')->field('level2')->where($where)->group('level2')->select(); 
			  return $data;
		}
		else if($level==3){
			 if(!empty($fatherName))$where['level2']=$fatherName;
			 return M('Score')->field('level3')->where($where)->group('level3')->select(); 
		}
		else return false;
}

/**输出json格式
*@param $result bool  true:操作成功，false:操作失败
*@param $meg  string 反馈信息
*@param $data array  返回数据
*@return  null
**/
protected function echoJson($result,$meg,$data){
		$json['result']=$result;
		$json['meg']=$meg;
		if($data)$json['data']=$data;
		echo json_encode($json);
		die();	
}

//读书之城
public function book(){ 
		$R = M("area");
		$Q = M("question");
		//城市类别
		$redingCity = $Q->field("area_id,area")->group(area_id)->select();
		//dump($redingCity);
		//学历类别
		$redingColege = $Q->field("education,education_type,education_name")->group(education)->select();
		//职业类别
		$redingCareer = $Q->field("occupation,occupation_type,occupation_name")->group(occupation)->select();
		$this->assign('redingCity',$redingCity);
		$this->assign('redingColege',$redingColege);
		$this->assign('redingCareer',$redingCareer);
		$this->display();
} 


}