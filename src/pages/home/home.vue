<template>
    <div class="page">
        <y-navbar :title="title"></y-navbar>
        <div class="content">
          <template v-for="(item,index) in result" :index="index">
            <y-swiper-cell :key="index" :index="index">
                <y-cell :title="item.name" :value="item.url"></y-cell>
                <div slot="right">
                    <span class="edit" @click="clickEdit">修改</span>
                    <span class="delete" @click="clickDelete(item.id)">删除</span>
                </div>
            </y-swiper-cell>
           </template>
           <y-cell>
             <y-button type="info" plain>周星星</y-button>
           </y-cell>
        </div>
        <!-- <ydialog title="doalog标题"></ydialog> -->
    </div>
</template>

<script>
import yDialog from "@/components/dialog/dialog"
import yNavbar from "@/components/navbar/navbar";
import ySwiperCell from "@/components/swiper_cell/swiper_cell";
import yCell from "@/components/cell/cell";
import yButton from "@/components/button/button"
export default {
    name:"home",
    components:{
        yNavbar,
        ySwiperCell,
        yCell,
        yDialog,
        yButton
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
