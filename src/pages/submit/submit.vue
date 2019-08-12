<template>
    <div class="page">
        <y-navbar :title="title" @left-click="backRouter" left-text="返回"></y-navbar>.
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
              <input type="button" value="新增" @click="addInfo">
            </div>
        </div>
        
    </div>
</template>

<script>
import yNavbar from "@/components/navbar/navbar";
import { setTimeout } from 'timers';
export default {
    name:"submit",
    components:{
        yNavbar
    },
    data(){
        return {
            formData:{
              name:null,
              url:null,
              alexa:null,
              country:null,
            },
            msg:"网站首页",
            title:"网站首页"
        }
    },
    methods:{
      addInfo(){
        console.log(this.formData)
        this.$http('post',"/add",this.formData)
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
