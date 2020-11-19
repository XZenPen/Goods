<template>
  <div id="topBar">
    <template v-if="$store.state.ename != ''">
      <el-menu :default-active="'2'" class="el-menu-demo" mode="horizontal">
        <el-submenu index="2" style="float: right">
          <template slot="title">
            <i class="fa fa-user hidden-xs"></i> 会员中心
          </template>
          <el-menu-item index="2-1">
            <li>
              <a tabindex="-1"> <i class="fa fa-history"></i>订单历史 </a>
            </li>
          </el-menu-item>
          <el-menu-item index="2-2">
            <li>
              <a tabindex="-1"> <i class="fa fa-bookmark"></i>收藏夹 </a>
            </li>
          </el-menu-item>
          <el-menu-item index="2-3">
            <li>
              <a tabindex="-1"> <i class="fa fa-edit"></i>常用联系人 </a>
            </li>
          </el-menu-item>
          <el-menu-item index="2-4">
            <li>
              <a tabindex="-1" @click="goto('/personal')"> <i class="fa fa-cog" ></i>个人设置 </a>
            </li>
          </el-menu-item>
          <el-menu-item index="2-5">
            <li>
              <a tabindex="-1"> <i class="fa fa-money"></i>充值 </a>
            </li>
          </el-menu-item>
          <el-menu-item index="2-6">
            <li>
              <a tabindex="-1"> <i class="fa fa-jpy"></i>未支付订单 </a>
            </li>
          </el-menu-item>
          <el-menu-item index="/cart">
            <li>
              <a tabindex="-1" @click="cart"> <i class="fa fa-cog"></i>我的购物车 </a>
            </li>
          </el-menu-item>
          <el-menu-item>
            <li>
              <a tabindex="-1" @click="logout">
                <i class="fa fa-sign-out"></i>退出
              </a>
            </li>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="3" style="float: right">
          <li class="text-welcome hidden-xs">
            <template>欢迎{{ $store.state.ename }}</template>
            <strong></strong>
            <strong></strong>
          </li>
        </el-menu-item>
      </el-menu>
    </template>
    <template v-else>
      <el-menu
        :default-active="'2'"
        router
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item style="float: right" index="/register">
          <router-link to class="sysBuilding">注册</router-link>
        </el-menu-item>
        <el-menu-item style="float: right" index="/login">
          <router-link to class="sysBuilding">登录</router-link>
        </el-menu-item>
      </el-menu>
    </template>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      uname: "",
    };
  },
  methods: {
    goto(adrs){
      this.$router.push(adrs)
    },
    logout() {
      let i = ''
      this.$store.commit('setUser',i)
    },
    cart(){
      this.$router.push('/cart')
    }
  },
  created() {},
};
</script>
<style  scoped>
#name {
  margin-left: 200px;
}
.el-dropdown-link {
  cursor: pointer;
  color: gray;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.showCart {
  display: block !important;
}
</style>
