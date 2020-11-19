<template>
  <div class="Go_house">
      <div id="ydm">源代码商城首页</div>
    <el-carousel
      :interval="4000"
      type="card"
      height="250px"
      style="width: 710px"
    >
      <el-carousel-item v-for="item in imgList" :key="item.key">
        <img :src="'http://localhost:8088/Shopping'+item.defaultImg" alt="" style="width: 375px; height: 320px" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "zouma",
  data() {
    return {
      imgList: [],
    };
  },
  created() {
      this.rep('http://localhost:8088/Shopping/api/v1/catalog/product/1')
  },
  mounted() {
      this.rep('http://localhost:8088/Shopping/api/v1/catalog/product/2')
  },
  methods: {
    rep(img) {
      let goods;
      let vm = this;
      this.$http
        .get(img)
        .then((rep) => {
          goods = rep.data.data.productList;
          for(let i=0;i<goods.length;i++){
              vm.imgList.push(goods[i])
          }
         
          console.log(vm.imgList)
        });
    },
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}.el-carousel{
    margin-top: 60px;
}
#ydm{
    font-size: 50px;
    color: rgb(50, 96, 148);
    font-weight: bolder;
}
</style>