import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import News from '@/components/news'
import Market from '@/components/market'
import Fund from '@/components/fund'
import Invest from '@/components/invest'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children:[
	      {
	      	path:'news',
	      	component: News,	
	      },
	      {
	      	path:'market',
	      	component: Market,	
	      },
	      {
	      	path:'fund',
	      	component: Fund,	
	      },
	      {
	      	path:'invest',
	      	component: Invest,	
	      }	         	       
      ]
    }
  ]
})
