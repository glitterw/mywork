<?php
namespace Home\Controller;
use Think\Controller;
use Think\Page;
class SdkController extends Controller {  

protected $httpData; //接口报错时请求的数据结果
//签名
public function signature(){ 
	header('Access-Control-Allow-Origin:*');//允许跨域
	header('application/x-www-form-urlencoded;charset=UTF-8');
  //$reload=I('get.reload');
  //1.获取access_token
  $token=$this->getToken();
  if($token===false){ //获取失败
  	echo $this->creatResult(100,"获取access_token失败！","");
  	return false;
  }
  //2.获取jsapi_ticket
  $ticket=$this->getJsapiTicket($token);
  if($ticket===false){ //获取失败
  	echo $this->creatResult(200,"获取jsapi_ticket失败！","");
  	return false;
  } 
 //3.获取签名
 //随机串
 $noncestr='wpxtest';
 //当前时间戳  
 $timestamp=time();
 //调用js_sdk的页面地址 从外部获取  
 //$url="http://localhost/employ/html2.0/join.html";
 $url=I('post.url'); 
 //$url="http://www.huijia-edu.com/xin/join.html"; 
 if($url==""){
 	 echo $this->creatResult(303,"动态地址获取失败！",""); 
 	 return false;   
 }


 //获取签名 
 $signature=$this->getSignature($noncestr,$ticket,$timestamp,$url); 
 $data["token"]=$token;
 $data["noncestr"]=$noncestr;
 $data["timestamp"]=$timestamp;
 $data["url"]=$url;
 $data["ticket"]=$ticket;
 $data["signature"]=$signature;
 echo $this->creatResult(0,"签名成功！",$data);
 return true;
}


/**
 * 生成返回结果
 * @param string $errorcode 错误代码
 * @param string $errormsg  错误描述
 * @param array $data      返回的数据
 * @return json obj        返回json对象;
 */
protected function creatResult($errorcode,$errormsg,$data){
	$result["errorcode"]=$errorcode;
	$result["errormsg"]=$errormsg;
	$result["data"]=$data;
	$result["http_data"]=$this->$httpData;
	return json_encode($result);  
} 

/**
 * 获取jsapi_ticket,首先从缓存读取，缓存没有或者过期从微信地址请求 
 * @param string $token 缓存的token
 * @return string  $jsapi_ticket   返回jsapi_ticket,没有得到返回空字符'';
 */
protected function getJsapiTicket($token){ 
	//$ticket=$this->getCache('jsapi_ticket');
	//if($ticket==0){//没有读到缓存数据或者缓存已过期 
		 //请求微信服务器获取jsapi_ticket
		 $url="https://api.weixin.qq.com/cgi-bin/ticket/getticket";//?access_token=ACCESS_TOKEN&type=jsapi"; 
		 $params = array(
		 	 access_token=> $token,
		 	 type=> 'jsapi'
		 ); 
		 $data=$this->http($url,$params);  
		 $ticket_json=json_decode($data);//转换成json  
		 if($ticket_json->errcode==0){
		 		$this->setCache('jsapi_ticket',$ticket_json->ticket);//缓存ticket
		 		return $ticket_json->ticket;
		 }else{ 
		 	  $this->$httpData=$ticket_json;
		 	  return false;
		 } 
		
	//}else{ 
	//	return $ticket;
	//}
	
		
}


/**
 * 获取access_token,首先从缓存读取，缓存没有或者过期从微信地址请求 
 * @return string  $access_token   返回access_token,没有得到返回空字符'';
 */
protected function getToken(){ 
	//$token=$this->getCache('access_token'); 
	//if($token==0){//没有读到缓存数据或者缓存已过期 
		 //请求微信服务器获取access_token
		 //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx2c4f1571db180b48&secret=f39c5be36244d65a6a1cfaf6f702cd50
		 $url="https://api.weixin.qq.com/cgi-bin/token";//?grant_type=client_credential&appid=APPID&secret=APPSECRET";
		 $params = array(
		 	 grant_type=> 'client_credential',
		 	 appid=>'wx6b092cc73e0b27ed',// 'wx2c4f1571db180b48',
		 	 secret=> 'b2c132573cee47696a06da60bc37d513',//'f39c5be36244d65a6a1cfaf6f702cd50',
		 );
		 
		 //获取accesstoken
		 $data=$this->http($url,$params); 
		 $token_json=json_decode($data);//转换成json  
		 if($token_json->errcode==0){
		 		$this->setCache('access_token',$token_json->access_token);//缓存token
		 		return $token_json->access_token;
		 }else{ 
		 	  $this->$httpData=$token_json;  
		 	  //echo '<br>';
		 	  //echo json_encode($this->$httpData);
		 	  //echo '<br>';
		 	  //$this->getErrorbyToken($token_json->errcode,json_encode($data));
		 	  return false;
		 } 
		
	//}else{ 
	//	return $token;
	//}
	
		
}

/**
 * 获取请求token时具体的错误信息
 * @errcode 错误代号
 * @return string  errmsg   返回具体的错误信息（官方定义的）;
 */
protected function getErrorbyToken($errcode){
	$errmsg="";
	if($errcode==0){
		$errmsg="请求成功!";
	}else if($errcode==-1){
		$errmsg="系统繁忙，此时请开发者稍候再试!";
	}else if($errcode==40001){
		$errmsg="AppSecret错误或者AppSecret不属于这个公众号，请开发者确认AppSecret的正确性";
	}else if($errcode==40002){
		$errmsg="请确保grant_type字段值为client_credential";
	}else if($errcode==40164){
		$errmsg="调用接口的IP地址不在白名单中，请在接口IP白名单中进行设置";
	}else{ 
		$errmsg="未知错误！";
	}
	return $errmsg;
	
} 

/**
 * 发送HTTP请求方法
 * @param  string $url    请求URL
 * @param  array  $params 请求参数
 * @param  string $method 请求方法GET/POST
 * @return array  $data   响应数据
 */
protected function http($url, $params, $method = 'GET', $header = array(), $multi = false){
    $opts = array(
            CURLOPT_TIMEOUT        => 30,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HTTPHEADER     => $header
    );
    /* 根据请求类型设置特定参数 */
    switch(strtoupper($method)){
        case 'GET':
            $opts[CURLOPT_URL] = $url . '?' . http_build_query($params);
            break;
        case 'POST':
            //判断是否传输文件
            $params = $multi ? $params : http_build_query($params);
            $opts[CURLOPT_URL] = $url;
            $opts[CURLOPT_POST] = 1;
            $opts[CURLOPT_POSTFIELDS] = $params;
            break;
        default:
            throw new Exception('不支持的请求方式！');
    }
    /* 初始化并执行curl请求 */
    $ch = curl_init();
    curl_setopt_array($ch, $opts);
    $data  = curl_exec($ch); 
    $error = curl_error($ch);
    curl_close($ch);
    if($error) throw new Exception('请求发生错误：' . $error);
    return  $data;
}
/**
 * 写缓存
 * @param  string $name     数据的名称
 * @param  string $value    需要缓存的数据 
 * @return bool                 
 */
protected function  setCache($name,$value){
	
	S($name,$value,7200);//缓存7200秒
	return true;
}

/**
 * 读取缓存
 * @param  string $name    需要缓存的数据 
 * @return string $value   返回值         
 */
protected function  getCache($name){ 
	 
	$value = S($name); 
	return $value;
} 

/**
 * 签名算法 
 * @param string $noncestr 随机串
 * @param string $jsapi_ticket   票据
 * @param string $timestamp 时间戳 
 * @return string $url   请求接口的页面地址         
 */
protected function  getSignature($noncestr,$jsapi_ticket,$timestamp,$url){ 
  $str="jsapi_ticket=".$jsapi_ticket."&noncestr=".$noncestr."&timestamp=".$timestamp."&url=".$url;
  $signature=sha1($str);
 
  return $signature;
}


}
