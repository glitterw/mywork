import App from '../App'

//新闻页面
const news = r => require.ensure([], () => r(require('../views/index/index')), 'news');
export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      path: '/index',
      component: news,
      meta: {
        title: '业务信息'
      }
    } 
  ]
}]

