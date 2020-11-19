<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="我的订单" name="first">

    </el-tab-pane>
    <el-tab-pane label="常用联系人" name="second">

    </el-tab-pane>
    <el-tab-pane label="我的收藏" name="third">

    </el-tab-pane>
    <el-tab-pane label="个人设置" name="fourth">

    </el-tab-pane>
    <el-tab-pane label="充值">

    </el-tab-pane>
    <el-tab-pane label="未支付订单" @click="s(this.student)">

    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second',
        student:[1,2,3,4,5,6,7,8,9,12]
      };
    },
    methods: {
      handleClick() {
        
      },
       s(student){
        console.log(student)
    }
    },
    created(student){
        return student.filter(s=>s>5)
    },
   
  };
</script>