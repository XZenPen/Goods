<template>
  <div>
    <el-table :data="listy" style="width: 75%" border>
      <el-table-column
        fixed
        v-for="item in img"
        :label="item.label"
        :key="item.key"
      >
        <template slot-scope="scope">
          <img
            width="150px"
            height="150px"
            :src="'http://localhost:8088/Shopping/' + scope.row.defaultImg"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-for="info in rightHeader"
        :key="info.key"
        :property="info.key"
        :label="info.label"
      >
        <template slot-scope="scope">
          {{ scope.row[scope.column.property] }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-search" @click="tz(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "List",
  data() {
    return {
      userName: "",
      listy: [],
      categoryid: "",
      id: "",
      rightHeader: [
        {
          label: "商品名",
          key: "name",
        },
        {
          label: "价格",
          key: "price",
        },
      ],
      img: [
        {
          label: "图片",
          key: "defaultImg",
        },
      ],
    };
  },

  methods: {
    tz(row) {
      localStorage.setItem("id", row.id);
      //console.log(row.id);
      this.$router.push("/xq");
    },
    getProducts(id){
      this.categoryid = id;
   //传给main.js
    this.ename = sessionStorage.getItem("userName");
    //console.log(this.ename)
    let goods;
    let wthis = this;
    //初始化 界面显示之前  数据初始化 网络请求
    axios.get(
        "http://127.0.0.1:8088/Shopping/api/v1/catalog/product/" +
          wthis.categoryid
      )
      .then(function (rep) {
        goods = rep.data.data.productList;
        //console.log(goods)
        wthis.listy = goods;
        //wthis.listy=goods.productList
      })
      .catch(function (e) {
        console.log(JSON.stringify(e));
      });
    }
  },
  created() {
    this.$router.push('/cei/list?id=1')
  },
  mounted() {
    this.getProducts(this.$route.query.id);
  },
  watch: {
    '$route'(to,from){
      var m = to.query.id;
      this.getProducts(m);
    }
  }
};
</script>