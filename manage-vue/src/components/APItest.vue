<template>
    <div>
        /api/goods
        {{goods}}
        <el-button @click="goodscreate()">goodscreate</el-button>
        <el-button @click="goodsdeleteall()">goodsdeleteall</el-button>
        <el-button @click="goodsdelete()">goodsdelete</el-button>
        <el-button @click="goodsupdate()">goodsupdate</el-button>
        /api/orders
        {{orders}}
        <el-button @click="orderscreate()">orderscreate</el-button>
        <el-button @click="ordersdeleteall()">ordersdeleteall</el-button>
        <el-button @click="ordersdelete()">ordersdelete</el-button>
        <el-button @click="ordersupdate()">ordersupdate</el-button>
        /api/files
        {{files}}
    </div>
</template>
<script>
import { ElMessage } from 'element-plus'
import GoodsService from '../services/GoodsService'
import OrdersService from '../services/OrdersService'
import UploadService from '../services/UploadFilesService'
export default {
    data(){
        return{
            goods: undefined,
            orders: undefined,
            files:undefined
        }
    },
    methods:{
        goodscreate(){
            var goods = {
                name: 'cafe4',
                sale: 1,
                image_name: 'map.png',
                image: 0,
                price: 10,
                describe: 'post test'
            };
            GoodsService.create(goods)
            .then(response => {
                console.log(response.data);
                ElMessage({
                    message: "上传成功！",
                    type: "success",
                });
            })
            .catch(err => {
                console.log(err)
                ElMessage.error(err.toString())
            })
        },
        goodsdeleteall(){
            GoodsService.deleteAll()
        },
        goodsupdate(){
            var goods = {
                name: 'cafe',
                sale: 1,
                image_name: 'map.png',
                image: 0,
                price: 20,
                describe: 'post test'
            };
            GoodsService.update(5,goods)
        },
        goodsdelete(){
            GoodsService.delete(4)
        },
        orderscreate() {
            var orders = {
                paytime: 0,
                finish: 0,
                orderlist: [{id:1, name: 'cafe1',temp:'hot',sugar:'less',amount:1 }, {id:2, name: 'cafe1',temp:'cold',sugar:'normal',amount:2}],
                category: 'now'
            };
            OrdersService.create(orders)
                .then(response => {
                    console.log(response.data);
                    ElMessage({
                        message: "上传成功！",
                        type: "success",
                    });
                })
                .catch(err => {
                    console.log(err)
                    ElMessage.error(err.toString())
                })
        },
        ordersdeleteall() {
            OrdersService.deleteAll()
        },
        ordersupdate() {
            var orders = {
                paytime: 0,
                finish: 1,
                orderlist: { name: ['cafe1','cafe2'], amount: 2 },
                category: 'now'
            };
            OrdersService.goodsupdate(5, orders)
        },
        ordersdelete() {
            OrdersService.delete(4)
        }
    },
    mounted() {
        GoodsService.getAll()
        .then(response => {
            this.goods=response.data
        })
        OrdersService.getAll()
        .then(response =>{
            this.orders=response.data
        })
        UploadService.getFiles()
        .then(response=>{
            this.files=response.data
        })
    },
}
</script>