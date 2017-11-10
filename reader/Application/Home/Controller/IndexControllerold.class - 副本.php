<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
		$this->display();
    }

	//读书之城参数(年龄、职业、学历)
	public function getReadingCity(){
		$areaId = I('post.areaId');
		$reaingAge = $this->getReadingAge($areaId);
		$reaingSex = $this->getReadingSex($areaId);
		$reaingCareer = $this->getReadingCareer($areaId);
		$reaingCollege = $this->getReadingCollege($areaId);
		$data['reaingAge'] = $reaingAge;
		$data['reaingSex'] = $reaingSex;
		$data ['reaingCareer'] = $reaingCareer;
		$data ['reaingCollege'] = $reaingCollege;

		$this->ajaxReturn($data);
	}

	//读书之城参数(认知度、购书数量、花费、满意度)
	public function getReadingBottom(){
		$area_Id = I('post.area_Id');
		$sex_Id = I('post.sex_Id');
		$colege_Id = I('post.colege_Id');
		$career_Id = I('post.career_Id');

		$redingBuy = $this->getBuyNum($area_Id,$sex_Id,$colege_Id,$career_Id);
		$redingPay = $this->getPayNum($area_Id,$sex_Id,$colege_Id,$career_Id);
		$redingRadar = $this->getRadarNum($area_Id,$sex_Id,$colege_Id,$career_Id);
		$redingKnow = $this->getImpotNum($area_Id,$sex_Id,$colege_Id,$career_Id);

		$data ['redingBuy'] = $redingBuy;
		$data ['redingPay'] = $redingPay;
		$data ['redingRadar'] = $redingRadar;
		$data ['redingKnow'] =$redingKnow;

		$this->ajaxReturn($data);
	}

	//根据区域Id获取年龄分布
	public function getReadingSex($areaId){
		$Q = M("question");
		if($areaId && (0 <> $areaId)){
			$where['area_id'] = $areaId;
		}else{
			$where = '';
		}
		$reaingSex = $Q->field("sex_type,sex_name,count(sex_type) as sexNum")->group(sex_name)->where($where)->select();

		foreach($reaingSex as $key=>$val){
			if(1 == $val['sex_type']){
				$sex_name = $val['sex_name'];
				$sex_num1 = $val['sexnum'];
			}else if(2 == $val['sex_type']){
				$sex_name = $val['sex_name'];
				$sex_num2 = $val['sexnum'];
			}
		}

		$scale1 = ($sex_num1/($sex_num1+$sex_num2))*100;
		$scale2 = ($sex_num2/($sex_num1+$sex_num2))*100;

		$return['scale1'] = round($scale1).'%';
		$return['scale2'] = round($scale2).'%';
		$return['scaleNum1'] = round($scale1/10);
		$return['scaleNum2'] = round($scale2/10);

		return $return;
	}


	//根据区域Id获取年龄分布
	public function getReadingAge($areaId){
		$Q = M("question");
		if($areaId && (0 <> $areaId)){
			$where['area_id'] = $areaId;
		}else{
			$where = '';
		}
		$reaingAge = $Q->field("age_scope,count(age_scope) as ageNum")->group(age_scope)->where($where)->select();
		foreach($reaingAge as $key=>$val){
			 $ageName .= $val['age_scope'].',';
			 $ageNum .= $val['agenum'].',';
		}

		$return['ageName'] =  rtrim($ageName, ",");
		$return['ageNum'] =  rtrim($ageNum, ",");

		return $return;
	}

	//根据区域Id获取职业分布
	public function getReadingCareer($areaId){
		$Q = M("question");
		if($areaId && (0 <> $areaId)){
			$where['area_id'] = $areaId;
		}else{
			$where = '';
		}
		$reaingCareer = $Q->field("occupation,count(occupation) as normNum")->group(occupation)->where($where)->select();

		foreach($reaingCareer as $key=>$val){
			 $carName .= $val['occupation'].',';
			 $carNum .= $val['normnum'].',';
		}
		$return['carName'] =  rtrim($carName, ",");
		$return['carNum'] =  rtrim($carNum, ",");

		return $return;
	}

	//根据区域Id获取学历分布
	public function getReadingCollege($areaId){
		$Q= M("question");
		if($areaId && (0 <> $areaId)){
			$where['area_id'] = $areaId;
		}else{
			$where = '';
		}
		$reaingCollege = $Q->field("education,count(education) as cationNum")->group(education)->where($where)->select();

		foreach($reaingCollege as $key=>$val){
			 $colName .= $val['education'].',';
			 $colNum .= $val['cationnum'].',';
		}

		$return['colName'] =  rtrim($colName, ",");
		$return['colNum'] =  rtrim($colNum, ",");

		return $return;
	}

	//全民阅读认知重要性
	function getImpotNum($area_Id,$sex_Id,$colege_Id,$career_Id){
		$isNum_arr = $this->getIsKnow($area_Id,$sex_Id,$colege_Id,$career_Id);
		$opNum_arr = $this->getOpinion($area_Id,$sex_Id,$colege_Id,$career_Id);
		foreach($isNum_arr as $key=>$val){
			if($val['isknow'] == 'A'){
				$isKnow = $val['knownum'];
			}else if($val['isknow'] == 'B'){
				$isNKnow = $val['knownum'];
			}
		}
		foreach($opNum_arr as $key=>$val){
			if($val['opinion'] == 'A'){
				$op1 = $val['opnum'];
			}else if($val['opinion'] == 'B'){
				$op2 = $val['opnum'];
			}else if($val['opinion'] == 'C'){
				$op3 = $val['opnum'];
			}else if($val['opinion'] == 'D'){
				$op4 = $val['opnum'];
			}else if($val['opinion'] == 'E'){
				$op5 = $val['opnum'];
			}
		}

		 $data['isKnow'] = isset($isKnow) ? $isKnow : 0;
		 $data['isNKnow'] = isset($isNKnow) ? $isNKnow : 0;
		 $data['opNum1'] = isset($op1) ? $op1 : 0;
		 $data['opNum2'] = isset($op2) ? $op2 : 0;
		 $data['opNum3'] = isset($op3) ? $op3 : 0;
		 $data['opNum4'] = isset($op4) ? $op4 : 0;
		 $data['opNum5'] = isset($op5) ? $op5 : 0;

		return $data;
	}

	//全民阅读活动是否知道
	function getIsKnow($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}else{
			$where = '';
		}
		$knowInfo = $Q->field("isknow,count(isknow) as knowNum")->group(isknow)->where($where)->select();

		return  $knowInfo;
	}

	//全民阅读活动如何看待
	function getOpinion($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}else{
			$where = '';
		}
		$opInfo = $Q->field("opinion,count(opinion) as opNum")->group(opinion)->where($where)->select();

		return $opInfo;
	}


	//获取购书数量
	function getBuyNum($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}else{
			$where = '';
		}
		$buyNumInfo = $Q->field("buy_num,count(buy_num) as buyNum")->group(buy_num)->where($where)->select();

		foreach($buyNumInfo as $key=>$val){
			 $buyName .= $val['buy_num'].',';
			 $buyNum .= $val['buynum'].',';
		}

		$return['buyName'] =  rtrim($buyName, ",");
		$return['buyNum'] =  rtrim($buyNum, ",");

		return $return;
	}

	//获取购书花费
	function getPayNum($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}else{
			$where = '';
		}
		$payNumInfo = $Q->field("cost,count(cost) as payNum")->group(cost)->where($where)->select();

		foreach($payNumInfo as $key=>$val){
			 $payName .= $val['cost'].',';
			 $payNum .= $val['paynum'].',';
		}

		$return['payName'] =  rtrim($payName, ",");
		$return['payNum'] =  rtrim($payNum, ",");

		return $return;
	}

	//获取满意度
	function getRadarNum($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}else{
			$where='1=1';
		}
		$max_num = $Q->where($where)->count();

		$return1 = $this->getRadar1Num($area_Id,$sex_Id,$colege_Id,$career_Id);
		$return2 = $this->getRadar2Num($area_Id,$sex_Id,$colege_Id,$career_Id);
		$return3 = $this->getRadar3Num($area_Id,$sex_Id,$colege_Id,$career_Id);
		$return4 = $this->getRadar4Num($area_Id,$sex_Id,$colege_Id,$career_Id);



		$num1 = ceil(($return1['Radar1_num']/$max_num)*100);
		$num2 = ceil(($return2['Radar2_num']/$max_num)*100);
		$num3 = ceil(($return3['Radar3_num']/$max_num)*100);
		$num4 = ceil(($return3['Radar4_num']/$max_num)*100);


		$radarName = $return1['Radar1_name'] . ',';
		$radarName .= $return2['Radar2_name'] . ',';
		$radarName .= $return3['Radar3_name'] . ',';
		$radarName .= $return4['Radar4_name'].',';

		$radarNum = $num1.','.$num2.','.$num3.','.$num4.',';

		$data['radarName'] = rtrim($radarName, ",");
		$data['radarNum'] = rtrim($radarNum, ",");
		$data['radarNum1'] = $num1;
		$data['radarNum2'] = $num2;
		$data['radarNum3'] = $num3;
		$data['radarNum4'] = $num4;

		return $data;
	}

	//公共设施硬件满意度
	function getRadar1Num($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");

		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}
		$where['condition'] = array("EGT",3);
		$count1 = $Q->where($where)->count();

		$return['Radar1_name'] = '硬件设施';
		$return['Radar1_num'] = $count1;

		return $return;

	}
	//公共设施文献资源满意度
	function getRadar2Num($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}
		$where['resource'] = array("EGT",3);
		$count2 = $Q->where($where)->count();
		$return['Radar2_name'] = '文献资源';
		$return['Radar2_num'] = $count2;

		return $return;
	}
	//公共设施阅读环境满意度
	function getRadar3Num($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}
		$where['environment'] = array("EGT",3);
		$count3 = $Q->where($where)->count();
		$return['Radar3_name'] = '阅读环境';
		$return['Radar3_num'] = $count3;

		return $return;
	}
	//公共设施服务态度满意度
	function getRadar4Num($area_Id,$sex_Id,$colege_Id,$career_Id){
		$Q= M("question");
		if($area_Id && (0 <> $area_Id)){
			$where['area_id'] = $area_Id;
		}else if($sex_Id && (0 <> $sex_Id)){
			$where['sex_type'] = $sex_Id;
		}else if($colege_Id && (0 <> $colege_Id)){
			$where['education_type'] = $colege_Id;
		}else if($career_Id && (0 <> $career_Id)){
			$where['occupation_type'] =	$career_Id;
		}
		$where['service'] = array("EGT",3);
		$count4 = $Q->where($where)->count();
		$return['Radar4_name'] = '服务态度';
		$return['Radar4_num'] = $count4;

		return $return;
	}
}