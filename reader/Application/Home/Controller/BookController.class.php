<?php
namespace Home\Controller;
use Think\Controller;
class BookController extends Controller {

	/*读书之城参数(性别、年龄、职业、学历)*/
	public function getReadingCity(){
		//获取性别分布数据
		$data1 = $this->getReadingSex();
		//获取年龄、职业、学历分布数据
		$data2 = $this->getReadingAge();
		//组合性别、年龄、职业、学历数据
		$data = array_merge($data1,$data2);

		$this->ajaxReturn($data);
	}

	/*读书之城参数(认知度、购书人数、花费人数、满意度)*/
	public function getReadingBottom(){
		//获取购书人数、花费人数数据
		$data1 = $this->getBuyNum();
		//获取认知度数据
		$data2 = $this->getKnowInfo();
		//获取满意度数据
		$data3 = $this->getRadarInfo();
		//认知度、购书人数、花费人数、满意度数据
		$data = array_merge($data1,$data2,$data3);

		$this->ajaxReturn($data);
	}

	//根据区域Id获取性别分布
	public function getReadingSex(){
		$Q = M("question");
		$where = $this->setTopWhere();
		$reaingSex = $Q->field("sex_type,sex_name,count(sex_type) as sexNum")->group(sex_name)->where($where)->select();
        
		foreach($reaingSex as $key=>$val){
			$sex_name[] = $val['sex_name'];
			$sex_num[] = $val['sexnum'];
			$num += $val['sexnum'];
		}

		$scale1 = ($sex_num[0]/$num)*100;
		$scale2 = ($sex_num[1]/$num)*100;

		$return['scale1'] = round($scale1).'%';
		$return['scale2'] = round($scale2).'%';
		$return['scaleNum1'] = round($scale1/10);
		$return['scaleNum2'] = round($scale2/10);
		$return['max_num'] = $num;
		$return['sex1'] = $sex_num[0];
		$return['sex2'] = $sex_num[1];

		$data['sexInfo'] = $return;

		return $data;
	}

	//根据区域Id获取年龄分布、职业分布、学历分布
	function getReadingAge(){
		$Q = M("question");
		$where = $this->setTopWhere();
		//年龄分布
		$reaingAge = $Q->field("age_scope,count(age_scope) as ageNum")->group(age_scope)->limit(0,7)->where($where)->select();
		//职业分布
		$reaingCareer = $Q->field("occupation_name,occupation,count(occupation) as normNum")->group(occupation)->limit(0,6)->where($where)->select();
		//教育水平分布
		$reaingCollege = $Q->field("education,education_name,count(education) as cationNum")->group(education)->where($where)->select();

		foreach($reaingAge as $key=>$val){
			$ageName[]=$val['age_scope'];
			$ageNums[]=$val['agenum'];
		}

		foreach($reaingCareer as $key=>$val){
			$carName[]=$val['occupation_name'];
			$carNum[]=$val['normnum'];
		}

		foreach($reaingCollege as $key=>$val){
			$colName[]=$val['education_name'];
			$colNum[]=$val['cationnum'];
		}

		$data['colName'] = $colName;
		$data['colNum'] = $colNum;
		$data['carName'] = $carName;
		$data['carNum'] = $carNum;
		$data['ageName'] = $ageName;
		$data['ageNum'] = $ageNums;

		return $data;
	}

	//全民阅读认知度重要信息统计
	function  getKnowInfo(){
		$Q = M("question");
		$where = $this->setBottomWhere();
		//是否知道阅读活动
		$knowInfo = $Q->field("isknow,count(isknow) as knowNum")->group(isknow)->where($where)->select();
		//如何看待阅读活动
		$opInfo = $Q->field("opinion,count(opinion) as opNum")->group(opinion)->where($where)->select();

		foreach($knowInfo as $key=>$val){
			$knowNum[] = $val['knownum'];
		}

		foreach($opInfo as $key=>$val){
			$opNum[] = $val['opnum'];
		}

		$data['isKnow'] = isset($knowNum[0]) ? $knowNum[0] : 0;
		$data['isNKnow'] = isset($knowNum[1]) ? $knowNum[1] : 0;
		$data['opNum1'] = isset($opNum[0]) ? $opNum[0] : 0;
		$data['opNum2'] = isset($opNum[1]) ? $opNum[1] : 0;
		$data['opNum3'] = isset($opNum[2]) ? $opNum[2] : 0;
		$data['opNum4'] = isset($opNum[3]) ? $opNum[3] : 0;
		$data['opNum5'] = isset($opNum[4]) ? $opNum[4] : 0;

		$return['knowInfo'] = $data;

		return $return;
	}

	//获取购书人数、购书花费人数、
	function getBuyNum(){
		$Q= M("question");
		$where = $this->setBottomWhere();
		$buyNumInfo = $Q->field("buy_num_name,buy_num,count(buy_num) as buyNum")->group(buy_num)->where($where)->select();
		$payNumInfo = $Q->field("cost_name,cost,count(cost) as payNum")->group(cost)->where($where)->select();
		foreach($buyNumInfo as $key=>$val){
			$buyName[]=$val['buy_num_name'];
			$buyNum[]=$val['buynum'];
		}
		foreach($payNumInfo as $key=>$val){
			$payName[]=$val['cost_name'];
			$payNum[]=$val['paynum'];
		}

		$return1['buyName'] = $buyName;
		$return1['buyNum'] = $buyNum;
		$return2['payName'] = $payName;
		$return2['payNum'] = $payNum;

		$data['buyInfo'] = $return1;
		$data['payInfo'] = $return2;

		return $data;
	}

	//获取满意度综合数据
	function getRadarInfo(){
		$Q = M("question");
		$where = $this->setBottomWhere();
		$count = $Q->where($where)->count();
		$where1 = $where2 = $where3 = $where4 = $where;
		//公共设施满意度
		$where1['condition'] = array("EGT",3);
		$count1 = $Q->where($where1)->count();
		//公共设施文献资源
		$where2['resource'] = array("EGT",3);
		$count2 = $Q->where($where2)->count();
		//公共设施阅读环境
		$where3['environment'] = array("EGT",3);
		$count3 = $Q->where($where3)->count();
		//公共设施服务态度
		$where4['service'] = array("EGT",3);
		$count4 = $Q->where($where4)->count();

		$radar1 = ceil(($count1/$count)*100);
		$radar2 = ceil(($count2/$count)*100);
		$radar3 = ceil(($count3/$count)*100);
		$radar4 = ceil(($count4/$count)*100);

		$data['radarNum'] = array($radar1,$radar2,$radar3,$radar4);
		$data['radarAve'] = (($radar1 + $radar2 + $radar3 + $radar4)/4);
		$data['radar1'] = $radar1;
		$data['radar2'] = $radar2;
		$data['radar3'] = $radar3;
		$data['radar4'] = $radar4;

		$return['radarInfo'] = $data;

		return $return;
	}


	//根据post1参数构造查询条件
	function setTopWhere(){
		$areaId = I('post.areaId');
		if(!empty($area_Id) && $area_Id>0) $where['area_id'] = $areaId;
		$where['state']=1;
		return $where;
	}

	//根据post2参数构造查询条件
	function setBottomWhere(){
		$area_Id = I('post.area_Id');
		$sex_Id = I('post.sex_Id');
		$colege_Id = I('post.colege_Id');
		$career_Id = I('post.career_Id');

		if(!empty($area_Id) && $area_Id>0) $where['area_id'] = $area_Id;
		if($sex_Id)  $where['sex_type'] = $sex_Id;
		if($colege_Id) $where['education_type'] = $colege_Id;
		if($career_Id) $where['occupation_type'] = $career_Id;

		return $where;
	}

}