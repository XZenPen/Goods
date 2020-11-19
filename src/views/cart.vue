<template>
  <div>
    <div class="tou">
    </div>
    <div class="zhong">
      <div class="left">
        <el-table :data="productlith" style="width: 100%" >
          <el-table-column label="商品名称" width="200">
            <template slot-scope="scope">
              <div style="display:flex;flex-direction: row;flex-wrap: wrap;justify-content: space-around;">
                <div style="text-align: left" ><img width="120px" height="120px" :src="'http://localhost:8088/Shopping/'+scope.row.defaultImg"></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="详细" width="300">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column label="数量" width="200" >
            <template slot-scope="scope" >
              <el-input-number v-model="scope.row.quantity"  :min="1" :max="1000" label="描述文字" @change="allPrice(scope)"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="合计价格" width="200">
            <template slot-scope="scope">
              <span>￥ {{scope.row.quantity*scope.row.shopPrice/100}}</span>
            </template>
          </el-table-column>
          <el-table-column  width="100">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle @click="remove(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align: right">
          <el-button type="danger" plain @click="allClear"><i class="el-icon-delete"></i> 清空购物车</el-button>
          <el-button type="success" plain @click="update"><i class="el-icon-check"></i> 更新购物车</el-button>
        </div>
      </div>
      <div class="right" style="width: 400px;height: 400px;">
        <p>商品总价：<span>￥{{$store.state.goodsPrice}}</span></p>
        <p>物流费用：<span>包邮</span></p>
        <el-button type="success" plain><i class="el-icon-check"></i> 立即支付</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      cartList:[],
      productlith:[],
      src:'',
      price:null
    };
    
  },
  methods:{
    allPrice(scope){
      console.log(scope.column)
      this.price=scope.row.quantity*scope.row.shopPrice/100
      this.$store.commit('allPrice',scope.row.quantity*scope.row.shopPrice/100,)
     //this.$store.state.goodsPrice=scope.row.quantity*scope.row.shopPrice/100
    },
    allClear(){
      let userId = localStorage.getItem("userId");
      this.$http.post('http://localhost:8088/Shopping/api/v1/cart/items/removeall',{userId:userId}).then(rep=>{
        
      })
    },
    update(){

    },
    updateCartOrPay(flag) {
      var vm = this;
      var user = vm.Storage.Local.get("User");
      if (user) {
        var userId = user.id;
        var cartItemList = [];
        var cartItem = {};
        var cartList = this.cartList.productList;
        for (var cart in cartList) {
          var cartItem = {};
          cartItem["productId"] = cartList[cart].id;
          cartItem["quantity"] = cartList[cart].quantity;
          cartItem["skuId"] = cartList.skuId;
          cartItem["optionValueKeyGroup"] = cartItem.optionValueKeyGroup;
          cartItemList.push(cartItem);
        }
      }
      vm.$post(vm.API.API_URL_CART_ITEMS_UPDATE, {
        userId: userId,
        cartItemList: cartItemList
      }).then(res => {
        if (res.errorCode == 0 && res.data == 1) {
          vm.getCartList();
          vm.Toastr.success("更新成功！");
        } else {
          vm.Toastr.error("更新失败！");
        }
      });
    },
    remove(productId){
        let vm = this;
        let userId = localStorage.getItem("userId");
        if (userId) {
          vm.$http.post('http://localhost:8088/Shopping/api/v1/cart/items/remove', {
            userId: userId,
            productId: productId
          }).then(res => {
             console.log(res)
          });
        } else {
          this.$message.warning("请登录后再操作!");
        }
    }
  },
  created() {
    //this.src=this.$route.query.src
    //console.log(this.$route.query)
    let userId = localStorage.getItem("userId");
    let _this=this
    this.$http.post("http://localhost:8088/Shopping/api/v1/cart", { userId: userId })//获取购物车
      .then((rep) => {
        //获取购物车详情
        _this.cartList=rep.data.data.productList
        for(let i=0;i<_this.cartList.length;i++)
        {
          if(_this.cartList[i].name!=null){
            _this.productlith.push(_this.cartList[i])
          }
        }
        console.log(_this.productlith)
        //console.log(rep.data.data.productList);
        //_this.cartList=rep.data
      });
  },
};
</script>

<style scoped>
#a {
  margin: auto;
  text-align: center;
}
.tou {
  width: 100%;
  height: 100px;
  
}

.zhong {
  width: 1500px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>

