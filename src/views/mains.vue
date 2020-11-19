<template>
  <el-container>
    <el-header><headt></headt></el-header>
    <el-main><keep-alive include="Login"><router-view></router-view></keep-alive></el-main>
    <el-footer><weib></weib></el-footer>
  </el-container>
</template>
<script>
export default {
  name: 'mains',
  data(){
    return{
    }
  },
  methods:{ 
  },
  created(){
    this.$router.push('/cei')
  }

}
</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-footer{
    background-color: rgba(62, 66, 66, 0.692);
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>