<template>
    <div class="page">
        <y-navbar :title="title"></y-navbar>
        <div class="content">
          <template v-for="(item,index) in result" :index="index">
            <y-swiper-cell :key="index" :index="index">
                <y-cell :title="item.name" :value="item.url"></y-cell>
                <div slot="right">
                    <y-button class="edit" @click="clickEdit">修改</y-button>
                    <y-button class="delete" @click="clickDelete(item.id)">删除</y-button>
                </div>
                
            </y-swiper-cell>
           </template>
           <y-popup v-model="show">123</y-popup>
        </div>
    </div>
</template>

<script>
import yDialog from "@/components/dialog/dialog";
import yPopup from "@/components/popup/popup"
import yNavbar from "@/components/navbar/navbar";
import ySwiperCell from "@/components/swiper_cell/swiper_cell";
import yCell from "@/components/cell/cell";
import yButton from "@/components/button/button";
import yIcon from "@/components/icon/icon";
export default {
    name:"home",
    components:{
        yNavbar,
        ySwiperCell,
        yCell,
        yDialog,
        yButton,
        yIcon,
        yPopup
    },
    inject:['reload'],
    data(){
        return {
          title:"网站首页",
          result:null,
          show:true
        }
    },
    mounted(){
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
     showDialog2(){
       this.$dialog({
         title:"弹窗2",
         content:"弹窗2"
       })
     },
    //  修改信息
     clickEdit(e){
       console.log("修改")
     },
    //  删除信息
     clickDelete(id){
       console.log('删除')
       this.$dialog({
         title:"提示",
         content:"确定删除这条信息吗？",
         beforeClose:(action,done)=>{
           if (action == 'confirm') {
             done()
             this.$http("post", "/delete", {
                 id: id
               })
               .then(res => {
                 console.log(res)
                 this.result = res.data.result.info;
                 done()
                 this.reload();
               })
               .catch(err => {
                 console.log(err)
               })
           } else {
             done(false)
           }
         }
       })
     }
   }
}
</script>

<style>

</style>
