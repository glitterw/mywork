// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' 
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'

Vue.config.productionTip = false
 
/* eslint-disable no-new */
Vue.use(VueRouter)

console.log(routes);
const router = new VueRouter({
  routes,
  mode: 'history'
})

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({ 
  router,
  components:App
}).$mount('#app')

