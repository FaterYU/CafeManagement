<template>
    <div>
        /api/orders
        <!-- {{ orders }} -->
        <br/><br/><br/><el-button @click="orderscreate()">orderscreate</el-button>
        <el-button @click="getweekdata()">getweekdata</el-button>
        /api/goods
        <!-- {{ goods }} -->
        <br /><br /><br />
        {{ orderbylr }}
        <el-button @click="getbylrday()">getbylrday</el-button>
        <br /><br /><br />
        /api/files
        <!-- {{files}} -->
        <br /><br /><br />
        <UploadComp></UploadComp>
    </div>
</template>
<script>
import UploadComp from './UploadComp.vue'
import { ElMessage } from 'element-plus'
import OrdersService from '../services/OrdersService'
import GoodsService from '../services/GoodsService'
import UploadService from '../services/UploadFilesService'
export default {
    components: { UploadComp },
    data() {
        return {
            orders: undefined,
            orderbylr:undefined,
            fileList:undefined,
            files:undefined,
            goods:undefined
        }
    },
    methods: {
        getbylrday(){
            var data= { lday: '2022-11-22 21:20:40', rday: '2022-11-24 21:20:40' }
            OrdersService.getorderbylrday(data)
            .then(response=>{
                this.orderbylr =response.data
            })
            .catch(err=>{
                ElMessage.error(err.toString())
            })
        },
        orderscreate() {
            var orders = {
                paytime: 0,
                finish: 0,
                orderlist: [{ id: 1, name: 'cafe1', temp: 'hot', sugar: 'less', amount: 1 }, { id: 2, name: 'cafe1', temp: 'cold', sugar: 'normal', amount: 2 }],
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
        getweekdata(){
            OrdersService.getweekdata({}).then(res=>{
                console.log(res.data)
            })
        }
    },
    mounted() {
        OrdersService.getAll()
            .then(response => {
                this.orders = response.data
            })
        GoodsService.getAll()
            .then(response => {
                this.goods = response.data
            })
        UploadService.getFiles()
            .then(response => {
                this.files = response.data
            })
    },
}
</script>