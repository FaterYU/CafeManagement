<template>
  <div style="width:100vw;">
    <div class="nav">
      <el-row class="tac">
        <el-col>
          <div style="margin-top:-40px">
            <el-icon><Coffee /></el-icon>
            <h5 class="head-title">ABD cafe</h5>
          </div>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
          >
            <el-menu-item index="1" @click="setName('coffee')" class="menu-item"  style="margin-top:10px">
              <template #title>
                <el-icon><CoffeeCup /></el-icon>
                <icon></icon>
                <span class="title">Coffee</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2" @click="setName('tea')" class="menu-item">
              <el-icon><IceTea /></el-icon>
              <span class="title">Tea</span>
            </el-menu-item>
            <el-menu-item index="3" @click="setName('soda')" class="menu-item">
              <el-icon><IceDrink /></el-icon> 
              <span class="title">Soda</span>
            </el-menu-item>
            <!-- <el-menu-item index="4" @click="api('api')">api</el-menu-item> -->
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="cart" @click="goCart()">
      <!-- <el-icon style="cart-icon" :size="22" color="#fff"><ShoppingCart /></el-icon> -->
      <div class="cart-num">{{ amount }}</div>
      <div class="cart-name">Cart</div>
    </div>
    <router-view v-if="isRouterAlive" @details="getdetails" class="content"></router-view>
    <el-drawer v-model="drawer" direction="btt" :before-close="handleClose" size="60%" :show-close="false" :destroy-on-close="true">
      <CartPage @status="finishorder" :orderList="orderList" style="margin-top:-10px"></CartPage>
    </el-drawer>
  </div>
</template>


<script>
import CartPage from './CartPage.vue'
export default {
    // props:['num'],
    components:{CartPage},
    data(){
        return{
          amount:0,
          orderList:[],
          drawer: false,
          isRouterAlive: true
        }
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    methods: {
      api(){
        this.$router.push({name:"api"})
      },
      setName(compname){
        this.$router.push({ name: "drink", query:{page:compname}})
      },
      goCart(){
        this.drawer=true
        // this.$router.push({name:'cartpage',params:{orderList:this.orderList}})
      },
      getdetails(details){
        this.orderList=details
        var amount = 0
        this.orderList.forEach(item => {
          amount += item.amount
        })
        this.amount = amount
      },
      finishorder(status){
        console.log(status)
        if(status.status==='success'){
          this.amount=0
          this.orderList=[]
          this.drawer=false
        }
        if(status.status==='change'){
          this.orderList=status.data
          var amount = 0
          this.orderList.forEach(item => {
            amount += item.amount
          })
          this.amount = amount
          this.drawer = false
        }
        if(status.status==='empty'){
          this.drawer = false
        }
      }
      
    },
    mounted() {
      this.setName('coffee')
    },
}
</script>


<style scoped>
/* * {
    background: #000 !important;
    color: #0f0 !important;
    outline: solid #f00 1px !important;
} */
    .head-title{
        font-size: larger;
        margin-left: 8px;
        display: inline;
    }
    
    .nav{
        /* margin-top: -30px; */
        width: 160px;
        position: fixed;
        height: 100vh;
        z-index: 1000;
    }
    .title{
      font-size: larger;
    }

    .menu-item{
      height: 60px;
    }

    .content{
      /* width: 100vh; */
      margin-top: -40px;
    }
    .cart{
      position: fixed;
      bottom: 50px;
      right: 50px;
      line-height: 60px;
      width: 160px;
      border-radius: 30px;
      color: #fff;
      background: #2F3CF4;
      z-index: 10;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
    .cart-num{
      display: inline;
      border-radius: 26px;
      color: #2F3CF4;
      font-size: larger;
      padding: 14px 18px;
      background: #fff;
    }
    .cart-name{
      display: inline;
      margin-left: 30px;
      margin-right: 20px;
    }



    .icon {
      width: 50px;
      height: 50px;
      /* vertical-align: -0.15em; */
      fill: currentColor;
      overflow: hidden;
    }
</style>