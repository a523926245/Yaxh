<template>
    <div class="page">
        <y-navbar :title="title" left-text="返回" @left-click="backRouter"></y-navbar>.
        <div class="content">
            <div class="cell">
              <label for="">name:</label><input type="text" v-model="formData.name">
            </div>
            <div class="cell">
              <label for="">url:</label><input type="text" v-model="formData.url">
            </div>
            <div class="cell">
              <label for="">alexa:</label><input type="text" v-model="formData.alexa">
            </div>
            <div class="cell">
              <label for="">country:</label><input type="text" v-model="formData.country">
            </div>
            <div class="cell">
              <input type="button" value="修改" @click="changeInfo">
            </div>
        </div>
        
    </div>
</template>

<script>
import yNavbar from "@/components/navbar/navbar";
export default {
    name:"change",
    components:{
        yNavbar
    },
    data(){
        return {
            infoId:null,
            formData:{
              name:null,
              url:null,
              alexa:null,
              country:null,
            },
            title:"修改信息"
        }
    },
    mounted(){
      this.infoId = this.$route.query.id;
      this.initInfo(this.infoId)
    },
    methods:{
      initInfo(id){
        this.$http("get","/start",{
          id:id
        })
        .then(res =>{
          console.log(res)
          this.formData = res.data.result.info[0];
        })
        .catch(err =>{
          console.log(err)
        })
      },
      changeInfo(){
        this.formData.id = this.infoId;
        this.$http('post',"/change",this.formData)
        .then(res =>{
          console.log(res)
          setTimeout(() => {
              this.$router.push({
                path:"/about"
              })
           },2000)
        })
        .catch(err =>{
          console.log(err)
        })
      }
    }
}
</script>

<style>
.cell{
  margin-top:10px;
}
</style>
