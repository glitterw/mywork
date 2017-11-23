<?php

/**
 * 生成随机字符串
 * @param string $lenth 长度
 * @return string 字符串
 **/
function create_randomstr($lenth = 6) {
	return random($lenth, '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ');
}
/**
* 产生随机字符串
* @param    int        $length  输出长度
* @param    string     $chars   可选的 ，默认为 0123456789
* @return   string     字符串
*/
function random($length, $chars = '0123456789') {
	$hash = '';
	$max = strlen($chars) - 1;
	for($i = 0; $i < $length; $i++) {
		$hash .= $chars[mt_rand(0, $max)];
	}
	return $hash;
}
/**
 * 对用户的密码进行加密
 * @param $password
 * @param $encrypt //传入加密串，在修改密码时做认证
 * @return array/password
 **/
function password($password,$en){
	$password=md5(md5($password).$en);
	return $password;
}

/**
 * 检查邮箱是否符合规定
 *
 * @param STRING $username 要检查的邮箱
 * @return 	TRUE or FALSE
 **/
function is_email($email) {
	return strlen($email) > 6 && preg_match("/^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/", $email);
}

/**
 * 检查用户名是否符合规定
 *
 * @param STRING $username 要检查的用户名
 * @return 	TRUE or FALSE
 **/
function is_username($username) {
	$strlen = strlen($username);
	if(is_badword($username) || !preg_match("/^[a-zA-Z0-9_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]+$/", $username)){
		return false;
	} elseif ( 20 < $strlen || $strlen < 2 ) {
		return false;
	}
	return true;
}

/**
 * 检测输入中是否含有错误字符
 *
 * @param char $string 要检查的字符串名称
 * @return TRUE or FALSE
 **/
function is_badword($string) {
	$badwords = array("\\",'&',' ',"'",'"','/','*',',','<','>',"\r","\t","\n","#");
	foreach($badwords as $value){
		if(strpos($string, $value) !== FALSE) {
			return TRUE;
		}
	}
	return FALSE;
}

/**
 * 检查密码长度是否符合规定
 *
 * @param STRING $password
 * @return 	TRUE or FALSE
 **/
function is_password($password) {
	$strlen = strlen($password);
	if($strlen >= 6 && $strlen <= 20) return true;
	return false;
}
/**
 * 检查字符串全是数字
 * @param STRING $str
 * @return 	 0 or 1
 **/
function isDigit($str){
	if(empty($str)) return false;
 	$preg='/^[0-9]*$/';
 	return preg_match($preg,$str);
}

/**
 * 检查字符串是否含有下面的特殊符号，含有并替换掉
 * @param string  $strParam 原始字符串
 * @param string  $regex 正则表达式
 * @param string  $replace_str 替换字符
 * @return string 替换后的字符串
 **/
function replace_specialChar($strParam,$regex='',$replace_str=''){
    if(empty($regex))$regex = "/\/|\~|\—|\!|\@|\#|\\$|\%|\^|\&|\*|\(|\)|\_|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\.|\/|\;|\'|\`|\-|\=|\\\|\|/";
    return preg_replace($regex,$replace_str,$strParam);
}

function substr_str($str){
	$len=strlen($str);
	if($len>50){
		$len=intval((strlen($str))/2);
	}
	return  substr($str,0,$len);
}

//上传excel文件
//@return array  文件地址，文件后缀名
function uploadExcel($savePath='/')
{
    header("Content-Type:text/html;charset=utf-8");
    $upload = new \Think\Upload();// 实例化上传类
    $upload->maxSize   =     3145728 ;// 设置附件上传大小
    $upload->exts      =     array('xls', 'xlsx');// 设置附件上传类
    $upload->savePath  =      $savePath; // 设置附件上传目录
    // 上传文件
    $info   =   $upload->uploadOne($_FILES['excelData']);
    echo $upload->getError();
    return $info;

}

//读取excel文件数据
function file_import($filename, $exts='xls')
{

    //导入PHPExcel类库，因为PHPExcel没有用命名空间，只能import导入
    import("Org.Util.PHPExcel");
    //创建PHPExcel对象，注意，不能少了\
    $PHPExcel=new \PHPExcel();
    //如果excel文件后缀名为.xls，导入这个类
    if($exts == 'xls'){
        import("Org.Util.PHPExcel.Reader.Excel5");
        $PHPReader=new \PHPExcel_Reader_Excel5();
    }else if($exts == 'xlsx'){
        import("Org.Util.PHPExcel.Reader.Excel2007");
        $PHPReader=new \PHPExcel_Reader_Excel2007();
    }


    //载入文件
    $PHPExcel=$PHPReader->load($filename);
    //获取表中的第一个工作表，如果要获取第二个，把0改为1，依次类推
    $currentSheet=$PHPExcel->getSheet(0);
    //获取总列数
    $allColumn=$currentSheet->getHighestColumn();
    //获取总行数
    $allRow=$currentSheet->getHighestRow();
    //记录总行数
    $this->allRow=$allRow-1;
    //循环获取表中的数据，$currentRow表示当前行，从哪行开始读取数据，索引值从0开始
    for($currentRow=1;$currentRow<=$allRow;$currentRow++){
        //从哪列开始，A表示第一列
        for($currentColumn='A';$currentColumn<=$allColumn;$currentColumn++){
            //数据坐标
            $address=$currentColumn.$currentRow;
            //读取到的数据，保存到数组$arr中
            if($currentSheet->getCell($address)->getValue()==NULL)$data[$currentRow][$currentColumn]='';
            else $data[$currentRow][$currentColumn]=(string)$currentSheet->getCell($address)->getValue();
        }
    }

    return $data;

}

	/** * 将一个字串中含有全角的数字字符、字母、空格或'%+-()'字符转换为相应半角字符 * * @access public * @param string $str 待转换字串 * * @return string $str 处理后字串 */
	function make_semiangle($str) {
		$arr = array('０' => '0', '１' => '1', '２' => '2', '３' => '3', '４' => '4', '５' => '5', '６' => '6', '７' => '7', '８' => '8', '９' => '9', 'Ａ' => 'A', 'Ｂ' => 'B', 'Ｃ' => 'C', 'Ｄ' => 'D', 'Ｅ' => 'E', 'Ｆ' => 'F', 'Ｇ' => 'G', 'Ｈ' => 'H', 'Ｉ' => 'I', 'Ｊ' => 'J', 'Ｋ' => 'K', 'Ｌ' => 'L', 'Ｍ' => 'M', 'Ｎ' => 'N', 'Ｏ' => 'O', 'Ｐ' => 'P', 'Ｑ' => 'Q', 'Ｒ' => 'R', 'Ｓ' => 'S', 'Ｔ' => 'T', 'Ｕ' => 'U', 'Ｖ' => 'V', 'Ｗ' => 'W', 'Ｘ' => 'X', 'Ｙ' => 'Y', 'Ｚ' => 'Z', 'ａ' => 'a', 'ｂ' => 'b', 'ｃ' => 'c', 'ｄ' => 'd', 'ｅ' => 'e', 'ｆ' => 'f', 'ｇ' => 'g', 'ｈ' => 'h', 'ｉ' => 'i', 'ｊ' => 'j', 'ｋ' => 'k', 'ｌ' => 'l', 'ｍ' => 'm', 'ｎ' => 'n', 'ｏ' => 'o', 'ｐ' => 'p', 'ｑ' => 'q', 'ｒ' => 'r', 'ｓ' => 's', 'ｔ' => 't', 'ｕ' => 'u', 'ｖ' => 'v', 'ｗ' => 'w', 'ｘ' => 'x', 'ｙ' => 'y', 'ｚ' => 'z', '（' => '(', '）' => ')', '〔' => '[', '〕' => ']', '【' => '[', '】' => ']', '〖' => '[', '〗' => ']', '“' => '[',
		'”' => ']', '‘' => '[',  '｛' => '{', '｝' => '}', '《' => '<', '》' => '>', '％' => '%',
		'＋' => '+', '—' => '-', '－' => '-', '～' => '-', '：' => ':', '。' => '.', '、' => ',', '，' => '.',
		'、' => '.', '；' => ',', '？' => '?', '！' => '!', '…' => '-', '‖' => '|', '”' => '"', '‘' => '`',
		'｜' => '|', '〃' => '"', '　' => ' ');

		$str_match = '/(国家(.*?)经营)/';
		$str_match1 = '/(上述(.*?)经营)/';
		$str_match2 = '/(凭有效(.*?)经营)/';
		$str = preg_replace($str_match1,'',strip_tags($str));
		$str = preg_replace($str_match,'',$str);
		$str = preg_replace($str_match2,'',$str);

		return strtr($str, $arr);
	}

/**
 * 返回子串在父串中第n次出现的位置
 * @param string  $word 子串
 * @param string  $str 父串
 * @param int     $n 第n次
 * @return int 返回位置编号，未找到返回false
 **/
function getPosition($word,$str,$n=1){
	$i=1;
	$begin=0;
	$wordLen = strlen($word);
	while($i<=$n){
	  $pos = stripos($str, $word,$begin);
	  if($pos===false) return false; //未找到
	  $begin=$pos+$wordLen;
	  $i++;
  }
  return $pos;

}


/**
 * 检查字符串是否符合年份-月份的格式 比如 yyyy-mm
 * @param sring $str
 * @return 	bool
 **/
function isDate($str){
	if(empty($str)) return false;
 	$preg='/^[0-9]{4}-(((0[1-9]|(10|11|12))$/';
 	return true;
}
 

/**
*写文件
*@param  string 文件名
*@param  string 写入的内容
*@return  bool 是否写入成功
**/
function writeFile($filename,$content){
	$myfile =fopen($filename, "w") or die("Unable to open file!");
	if($myfile===false) return false;
	fwrite($myfile, $content);
	fclose($myfile);
	return true;
}
/**
*读文件：读取一行返回内容
*@param  string 文件名
*@return string  第一行内容
**/
function readingFile($filename){
	if(!file_exists($filename))return false;
	$file = fopen($filename,"r");
	$content=fgets($file);
	fclose($file);
	return $content;
}
/**
 * 获取当前年月份
 * @return 	string (格式 2015-08)
 **/
function getNowYM(){
	 $date=date('Y-m', time());
}
/**
 * 输出json格式的结果，并停止程序执行
 * bool   result  正确返回ture,错误返回false
 * string  meg   反馈的信息 
 * array  $json_array 反馈的数据
 * @return 	 
 **/
function  echoJsonResult($result,$meg,$json_array){
	$json_array['result']=$result;
	$json_array['meg']=$meg;  
    echo json_encode($json_array);
    die(); 		
}

/**
 * 截取文本，多余的以...代替
 * string content  内容
 * int 	num  截取的汉字数量
 * @return string	 
 **/
function  subContent($content,$num){
	if(strlen($content)> $num){
		$num=$num-3;
		$substr=mb_substr($content,0,$num,'utf-8').'...';
		return $substr;
	}
	 else  return $content; 
}
 