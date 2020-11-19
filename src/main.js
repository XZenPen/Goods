// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import headt from "./components/headt"
import weib from "./components/weib"
import mains from "./views/mains"
import axios from 'axios'
import store from './store'


Vue.config.productionTip = false
//注册组件
Vue.component('headt',headt)
Vue.component('weib',weib)
Vue.component('mains',mains)
Vue.use(router);
Vue.use(ElementUI)

Vue.prototype.$http = axios;

//全局属性
//Vue.prototype.ename='aaaa'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:h=>h(App),
})
