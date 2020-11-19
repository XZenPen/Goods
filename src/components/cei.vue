<template>
  <div class="feng">
    <div>
      <el-row class="tac">
        <el-col :span="5">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>分类</span>
              </template>
              <el-menu-item v-for="(item, index) in ArrayList"
              :index="item.id+''"
              :key="item.id"  @click="itemClick(item.id)" >{{ item.name }}</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>首页</span>
              </template>
              <el-menu-item index="2-1" @click="tu">走马</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <router-view></router-view>
      </el-row>
    </div>
    <div>
      
    </div>
  </div>
</template>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1700px;
}
</style>

<script>
import axios from "axios";
export default {
  methods: {
    itemClick(index){
     this.$router.replace({
       path:'/cei/list',
       query:{
         id:index
       }
     })
    },
    tu(){
      this.$router.push('/cei/zouma')
    }
  },
  rout(){
    return '/cei/list'
  },
  data() {
    return {
      ArrayList: [],
      categored:''
    };
  },
  created() {
    let goods;
    let wthis = this;
    //初始化 界面显示之前  数据初始化 网络请求
    axios
      .get("http://127.0.0.1:8088/Shopping/api/v1/catalog/category/condition")
      .then(function (rep) {
        goods = rep.data.data;
        console.log(goods);
        wthis.ArrayList = goods;
      })
      .catch(function (e) {
        console.log(JSON.stringify(e));
      });
  },
};
</script>
<style scoped>
#fen{
  display: flex;
  justify-content: left;
}
</style>