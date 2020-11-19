<template>
  <div>
    <div class="block">
      <div id="title">{{ title }}</div>

      <div id="imgs">
        <el-image :src="src"></el-image>
        <div id="zi">
          <el-divider></el-divider>
          <span class="demonstration" id="sliu"
            ><s>市场价￥{{ shopPrice }}</s
            ><span id="ui">￥{{ shopPrice / 100 }}</span></span
          ><el-button
            type="warning"
            icon="el-icon-star-off"
            circle
            title="收藏"
          ></el-button>
          <el-divider></el-divider>
          <span id="jj">简介:</span>
          <span class="demonstration" id="msg"
            ><el-button
              type="success"
              icon="el-icon-check"
              circle
              id="yh"
            ></el-button
            ><i class="fa fa-check"></i>{{ msg }}</span
          >
          <el-divider></el-divider>
          购买数量：
          <el-input-number
            v-model="num"
            :min="1"
            label="描述文字"
          ></el-input-number
          ><el-button type="success" plain @click="cart">加入购物车</el-button
          ><el-button type="warning" plain id="gm" @click="goCart"
            >确定购买</el-button
          >
        </div>
        <div>热销商品</div>
      </div>
    </div>
    <div style="width: 1000px; margin: auto; text-align: left">
      <el-tabs>
        <el-tab-pane label="商品描述" name="first">{{
          this.names
        }}</el-tab-pane>
        <el-tab-pane label="商品评论" name="second" @tab-click="pinglun"
          ><el-badge :value="pingluns.length" class="item"></el-badge>
          <div
            v-for="(item, index) in pingluns"
            style="width: 500px; height: 100px"
          >
            {{ item.user.nickname }}-{{ item.createTime }}
            <el-rate
              v-model="item.stars"
              :colors="['#f56c6c', '#f56c6c', '#f56c6c']"
              disabled
              style="display: inline-block"
            ></el-rate
            ><br />
            {{ item.content }}
          </div>
          <div>
            <h1>添加评论</h1>
            <hr />
            <el-input
              v-model="msgs"
              :disabled="bools"
              placeholder="评论内容"
            ></el-input>
            <el-rate v-model="value" show-text :change="feng(value)"> </el-rate>
            <el-button
              type="primary"
              class="pull-right margin-top-20"
              icon="el-icon-edit"
              @click="tijiao"
              >提交
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "xq",
  data() {
    return {
      bools: true,
      msgs: "",
      num: 1,
      src: "",
      msg: "",
      names: "",
      title: "",
      value: null,
      shopPrice: 0,
      pingluns: [],
      params: {
        userId: null,
        productId: null,
        quantity: 1,
        skuId: null,
        jsonData: null,
        optionValueKeyGroup: null,
      },
      reviews: {
        userId:localStorage.getItem('userId'),
        content: "",
        stars: 0,
        productId: null,
      },
    };
  },

  created() {
    let goods;
    let wthis = this;
    let id = JSON.parse(localStorage.getItem("id"));
    //console.log(id)
    //初始化 界面显示之前  数据初始化 网络请求
    axios
      .get(
        "http://127.0.0.1:8088/Shopping/api/v1/catalog/product/details/" + id
      )
      .then(function (rep) {
        goods = rep.data.data;
        wthis.params.productId = goods.id; //获取productid
        // console.log(goods)
        //console.log(goods.defaultImg)
        if (goods.quantity > 0) {
          wthis.msg = "有货";
        }
        wthis.title = goods.explain;
        wthis.names = goods.name;
        wthis.shopPrice = goods.shopPrice;
        wthis.src = "http://localhost:8088/Shopping" + goods.defaultImg;
      })
      .catch(function (e) {
        console.log(JSON.stringify(e));
      });
  },
  mounted() {
    //界面开始显示 界面初始化操作 评论加载
    this.pinglun();
  },
  methods: {
    feng(value) {
      if (value != 0) {
        this.bools = false;
      } else {
        this.bools = true;
      }
      //console.log(value)
    },
    //评论提交
    tijiao() {
      let vm = this
      this.reviews.content=this.msgs; 
      this.reviews.stars=this.value
      this.reviews.productId=JSON.parse(localStorage.getItem("id"));
      console.log(this.reviews)
      if(this.reviews.content===''&&this.reviews.stars===0){
        vm.$message({
          message: '您还未选择评论或者未输入评论',
          type: 'warning'
        });
      }else{
        vm.$http.post(
        "http://localhost:8088/Shopping/api/v1/catalog/product/add/review",vm.reviews,).then(rep=>{
          console.log(rep)
        });
      }
      
    },
    cart() {
      //判断用户是否登录
      if (this.$store.state.ename === "") {
        this.$message({
          showClose: true,
          message: "您还未登录,请登录后在执行操作！",
        });
        return;
      }
      let vt = this;
      this.params.quantity = this.num;
      (this.params.userId = localStorage.getItem("userId")),
        console.log(this.params.userId);
      this.$http
        .post("http://localhost:8088/Shopping/api/v1/cart/add", this.params)
        .then((rep) => {
          console.log(vt.params);
          if (rep.data.errorCode == 0) {
            vt.$message({
              message: "添加购物车成功",
              type: "success",
            });
          } else {
            vt.$message({
              message: "添加购物车失败",
              type: "warning",
            });
          }
        });
    },
    goCart() {
      //判断用户是否登录
      if (this.$store.state.ename === "") {
        this.$message({
          showClose: true,
          message: "您还未登录,请登录后在执行操作！",
        });
        return;
      }
      let vt = this;
      this.params.quantity = this.num;
      (this.params.userId = localStorage.getItem("userId")),
        this.$http
          .post("http://localhost:8088/Shopping/api/v1/cart/add", this.params)
          .then((rep) => {
            console.log(vt.params);
            if (rep.data.errorCode == 0) {
              vt.$router.push({
                path: "/cart",
                query: {
                  src: this.src,
                  name: this.names,
                  price: this.shopPrice,
                },
              });
            } else {
              vt.$message({
                message: "购买失败",
                type: "warning",
              });
            }
          });
    },
    pinglun() {
      let id = JSON.parse(localStorage.getItem("id"));
      let vm = this;
      this.$http
        .get(
          "http://localhost:8088/Shopping/api/v1/catalog/product/reviews/" + id
        )
        .then((rep) => {
          //console.log(rep.data.data)
          vm.pingluns = rep.data.data;
          //console.log(vm.pingluns)
        });
    },
  },
};
</script>
<style scoped>
#sliu {
  margin-right: 30px;
  font-size: 12px;
  color: gray;
}
#msg {
  color: rgb(66, 228, 66);
}
#title {
  font-size: 25px;
  font-weight: bolder;
}
#imgs {
  display: flex;
  justify-content: center;
}
#zi {
  margin-left: 20px;
}
#ui {
  font-size: 20px;
  color: #000;
}
#gm {
  margin-left: 15px;
}
#jj {
  margin-right: 105px;
}
</style>