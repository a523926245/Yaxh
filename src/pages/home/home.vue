<template>
    <div class="page">
        <navbar :title="title"></navbar>
        <div class="content">
           <swiper-cell></swiper-cell>
        </div>
        
    </div>
</template>

<script>
import navbar from "@/components/navbar/navbar";
import swiperCell from "@/components/swiper_cell/swiper_cell";
export default {
    name:"home",
    components:{
        navbar,
        swiperCell
    },
    data(){
        return {
          title:"网站首页",
          result:null
        }
    },
    mounted(){
     this.$http('get',"/start",{
       id:"5",
     })
     .then(res =>{
       console.log(res)
       this.result = res.data.result.info;
     })
     .catch(err =>{
       console.log(err)
     })
   },
   methods:{

   }
}
</script>

<style>

</style>
