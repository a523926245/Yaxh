<template>
    <div class="page">
        <navbar :title="title"></navbar>
        <div class="content">
          <template v-for="(item,index) in result" :index="index">
            <swiper-cell :key="index" :index="index">
                <cell :title="item.name" :value="item.url"></cell>
                <div slot="right">
                    <span class="edit" @click="clickEdit">修改</span>
                    <span class="delete" @click="clickDelete(item.id)">删除</span>
                </div>
            </swiper-cell>
           </template>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/navbar/navbar";
import swiperCell from "@/components/swiper_cell/swiper_cell";
import cell from "@/components/cell/cell";
export default {
    name:"home",
    components:{
        navbar,
        swiperCell,
        cell
    },
    inject:['reload'],
    data(){
        return {
          title:"网站首页",
          result:null
        }
    },
    mounted(){
     this.$toast({
        message:"哈哈哈哈",
        icon:"success"
     })
     this.$http('get',"/start",{})
     .then(res =>{
       console.log(res)
       this.result = res.data.result.info;
     })
     .catch(err =>{
       console.log(err)
     })
   },
   methods:{
    //  修改信息
     clickEdit(e){
       console.log("修改")
     },
    //  删除信息
     clickDelete(id){
       this.$http("post","/delete",{
                    id:id
                })
                .then(res =>{
                    console.log(res)
                    this.result = res.data.result.info;
                    this.reload();
                })
                .catch(err =>{
                    console.log(err)
                })
       console.log("删除")
     }
   }
}
</script>

<style>

</style>
