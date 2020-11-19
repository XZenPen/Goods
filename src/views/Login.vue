<template>
  <div>
    <el-form  status-icon   label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号">
        <el-input type="text" v-model="User.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" >
        <el-input type="password" v-model="User.pwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name:'Login',
    data() {
      return {
        User: {
          userName: '',
          pwd: '',
        },
        meg:''
     
      };
    },
    methods: {
      login(){
        
        var abc;
        var rot=this;
        axios.post('http://127.0.0.1:8088/Shopping/api/v1/login',this.User ).then(function(rep){
          //console.log(rep)
          abc=rep.data
          //console.log(abc.data.userName)
          localStorage.setItem('userName',abc.data.userName);
          localStorage.setItem('userId',abc.data.id)
          //Location.setItem('userId',abc.data.id)
          if(abc.errorCode == 0 && abc.data != null){
            rot.$router.push('/cei/list?id=1')
            rot.$store.commit('setUser',abc.data.userName)
          }else{
            alert(abc.data)
          }
          
        }).catch(function(e){
          console.log(JSON.stringify(e));
        })
      }
    },
    // beforeRouteLeave(to,from,next){
    //   this.path=this.$router.path
    //   next()
    // }
  }
</script>