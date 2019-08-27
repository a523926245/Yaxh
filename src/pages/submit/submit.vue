<template>
    <div class="page">
        <y-navbar :title="title" @left-click="backRouter" left-text="返回"></y-navbar>.
        <div class="content">
            <y-cellgroup>
              <y-filed v-model="formData.name" placeholder="输入name" label="name:" error-message=""></y-filed>
              <y-filed v-model="formData.url" placeholder="输入url" label="url:" error-message=""></y-filed>
              <y-filed v-model="formData.alexa" placeholder="输入alexa" label="alexa:" error-message=""></y-filed>
              <y-filed v-model="formData.country" placeholder="输入country" label="country:" error-message=""></y-filed>
            </y-cellgroup>
            <y-cell>
              <y-button type="info" size="large" @click="addInfo">新增</y-button>
            </y-cell> 
        </div>
    </div>
</template>

<script>
import yNavbar from "@/components/navbar/navbar";
import yPicker from "@/components/datePicker/picker";
import yDatepicker from "@/components/datePicker/datePicker";
import yCheckboxGroup from "@/components/checkboxgroup/checkboxgroup";
import yCheckbox from "@/components/checkbox/checkbox";
import yPopup from "@/components/popup/popup"
import ySwiperCell from "@/components/swiper_cell/swiper_cell";
import yCell from "@/components/cell/cell";
import yCellgroup from "@/components/cellGroup/cellGroup";
import yButton from "@/components/button/button";
import yFiled from "@/components/filed/filed";
import { setTimeout } from 'timers';
export default {
    name:"submit",
    components:{
        yNavbar,
        ySwiperCell,
        yCell,
        yButton,
        yPopup,
        yCheckbox,
        yCheckboxGroup,
        yDatepicker,
        yPicker,
        yFiled,
        yCellgroup
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
