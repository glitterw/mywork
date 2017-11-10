<?php
namespace Home\Controller;
use Think\Controller;
class AddressController extends Controller {

//输出批量定位位置的页面
public function index(){ 
	$this->assign('page',1);	
	$this->assign('num',200);	
	$this->display();
}

//按页获取楼宇的位置信息
Public function list_address(){
	$page=I('post.page','',''); //获取页码 
	$num=I('post.num','',''); //获取设定的数量 
	if(!isDigit($page)  ) echoJsonResult(false,'page is error!,page='.$page );    
	if(!isDigit($num)  ) echoJsonResult(false,'num is error,num='.$num );    
	//$limit=($page-1)*$num.','.$num;
	$MB=M('Library'); 
	$where['_string']="  poin_flag=0 ";
	$data=$MB->where($where)->field('id,name,address')->limit($limit)->select(); 
	if($data===false) {
		$sql='sql  is error:'.$MB->where($where)->field('id,name,address')->limit($limit)->fetchSQL()->select();
		echoJsonResult(false,$sql);  
	}
	else{
			$json['num']=count($data);
			$json['data']=$data;			
			 echoJsonResult(true,$sql,$json); 
	}   
	 
}

//保存地理坐标
public function save_point(){ 
	$json=I('post.savedata','',''); //获取需要保存的json格式的字符串 
	//$json='{"id":2,"lng":3,"lat":4}'; 
	$data= json_decode($json,true);
	$Model = new \Think\Model();
	if($data){ 
		if(empty($data['id']) ){
			 echoJsonResult(false,'id  is empty!'); 
			 $sql=" update re_library set  poin_flag=-1   where id=".$data['id'];
			 $result=$Model->execute($sql); 
			 die();
		}
		if(empty($data['lng']) || empty($data['lat'])  ){
			
			 echoJsonResult(false,'lng /lat   is empty!');
			 $sql=" update re_library set  poin_flag=-2   where id=".$data['id'];
			 $result=$Model->execute($sql); 
			 die();			 
		}
		 
		
		//修改数据
		$sql="update re_library set lng=".$data['lng']." ,lat=".$data['lat'].",poin_flag=1,state=1   where id=".$data['id']; 
		
		$result=$Model->execute($sql); 
		if($result===false) echoJsonResult(false,'save operation is error!');  
		else echoJsonResult(true,'save operation is sucess!');  
	}
	else  echoJsonResult(false,'data is null!');   
 
}


 

}