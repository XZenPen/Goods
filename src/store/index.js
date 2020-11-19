import Vue from 'vue'
import Vuex from 'vuex'

//安装插件
Vue.use(Vuex)

//创建对象
const store = new Vuex.Store({
    state:{
        ename:'',
        cartList:[],
        goodsPrice:null
    },
    mutations:{
        setUser(state,user){
            state.ename=user
        },
        allPrice(state,price){
            state.goodsPrice=price
        }
    }
})

export default store