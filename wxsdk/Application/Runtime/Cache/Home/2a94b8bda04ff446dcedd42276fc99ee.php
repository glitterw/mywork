<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>书香江城</title>
    <link href="/reader/Public/CSS/index.css" rel="stylesheet" type="text/css" />
    <link href="/reader/Public/CSS/layout.css" rel="stylesheet" type="text/css" />
    <script src="/reader/Public/Js/jquery-1.11.1.min.js" type="text/javascript"></script>
    <script src="/reader/Public/Js/layout.js" type="text/javascript"></script>
</head>

<body>
    <!--背景图片全屏 begin-->
    <div class="indexBg width100 height100"><img src="/reader/Public/Images/indexBg.jpg" class="width100 height100" /></div>
    <!--背景图片全屏 end-->
    
	<div id="wraper" class="width100 height100">
        <!--container begin-->
        <div id="container" class="height100 marginAuto">
        	<div class="indexTitle fl width100"><img src="/reader/Public/Images/indexTitle.png" /></div>
            <div class="indexBook fl width100">
           	  <object id="FlashID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="185" height="100">
            	  <param name="movie" value="/reader/Public/Images/indexBook.swf" />
            	  <param name="quality" value="high" />
            	  <param name="wmode" value="transparent" />
            	  <param name="swfversion" value="9,0,28,0" />
            	  <!-- 此 param 标签提示使用 Flash Player 6.0 r65 和更高版本的用户下载最新版本的 Flash Player。如果您不想让用户看到该提示，请将其删除。 -->
            	  <param name="expressinstall" value="Scripts/expressInstall.swf" />
            	  <!-- 下一个对象标签用于非 IE 浏览器。所以使用 IECC 将其从 IE 隐藏。 -->
            	  <!--[if !IE]>-->
            	  <object type="application/x-shockwave-flash" data="/reader/Public/Images/indexBook.swf" width="185" height="100">
            	    <!--<![endif]-->
            	    <param name="quality" value="high" />
            	    <param name="wmode" value="transparent" />
            	    <param name="swfversion" value="9,0,28,0" />
            	    <param name="expressinstall" value="Scripts/expressInstall.swf" />
            	    <!-- 浏览器将以下替代内容显示给使用 Flash Player 6.0 和更低版本的用户。 -->
            	    <div>
            	      <h4>此页面上的内容需要较新版本的 Adobe Flash Player。</h4>
            	      <p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com//reader/Public/Images/shared/download_buttons/get_flash_player.gif" alt="获取 Adobe Flash Player" width="112" height="33" /></a></p>
          	      </div>
            	    <!--[if !IE]>-->
          	    </object>
            	  <!--<![endif]-->
          	  </object>
    </div>
            <div class="indexDataPic fl width100"><img src="/reader/Public/Images/indexDataPic.png" /></div>
            <div class="indexBtn marginAuto"><a href="<?php echo U('Home/Index/map');?>">立即进入</a></div>
        </div>
        <!--container end-->
    </div>

</body>
</html>