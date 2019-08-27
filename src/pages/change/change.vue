<template>
    <div class="page">
        <y-navbar :title="title" left-text="返回" @left-click="backRouter"></y-navbar>.
        <div class="content">
            <y-cellgroup>
              <y-filed v-model="formData.name" label="name:" error-message=""></y-filed>
              <y-filed v-model="formData.url" label="url:" error-message=""></y-filed>
              <y-filed v-model="formData.alexa" label="alexa:" error-message=""></y-filed>
              <y-filed v-model="formData.country" label="country:" error-message=""></y-filed>
            </y-cellgroup>
            <y-cell>
              <y-button type="info" size="large" @click="changeInfo">修改</y-button>
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
export default {
    name:"change",
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
