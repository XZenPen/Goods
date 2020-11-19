import Vue from 'vue'
import VueRouter from "vue-router";
import List from "../views/List";
import Login from "../views/Login";
import xq from '../views/xq'
import cei from '@/components/cei'
import cart from '@/views/cart'
import personal from '@/views/personal'

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
 const router =  new VueRouter({
  mode:'history',
  routes:[
    {
    path:'/login',
    component:Login,
  },{
    path:'/xq',
    component:xq
  },{
    path:'/cei',
    name:'cei',
    component:cei,
    children:[
      {
        path:'list',
        name:'list',
        component:List,
        
      }
    ]
  },{
    path:'/cart',
    name:'cart',
    component:cart
  },{
    path:'/personal',
    name:'personal',
    component:personal
  }]
})
export default router

router.beforeEach((to,from,next)=>{
  next()
})