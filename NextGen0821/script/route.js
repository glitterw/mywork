//进入登录页
function openLogin(url){
  api.openWin({
      name: 'login',
      url: url,
      pageParam: {
          name: 'test'
      },
      reload:true,
      slidBackEnabled:false,//控制ios版本右滑动不能返回
  });

}

//进入首页
function openMain(url){
  api.openWin({
      name: 'main',
      url: url
  });

}
