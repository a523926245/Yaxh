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
           <!-- y-button -->
           <y-button @click="togglePopup">popup按钮</y-button>
           <!-- y-popup -->
           <!-- y-checkbox -->
           <y-checkbox-group v-model="results" @change="resultChange">
                <y-checkbox v-for="(item,index) in checkboxArr" 
                v-model="item.checked" 
                :disabled="item.disabled"
                :name="item.name" 
                :index="index" checkedColor="green">{{item.name}}</y-checkbox>
           </y-checkbox-group>
           <!-- y-datepicker -->
           <y-popup v-model="show" position="bottom">
             <y-datepicker 
                v-model="currentDate"
                :maxDate="maxDate"
                @cancel="cancelDate"
                @confirm="confirmDate"
                :minDate="minDate" >
             </y-datepicker>
           </y-popup>
           
        </div>
    </div>
</template>

<script>
import yDatepicker from "@/components/datePicker/datePicker";
import yCheckboxGroup from "@/components/checkboxgroup/checkboxgroup";
import yCheckbox from "@/components/checkbox/checkbox";
import yPopup from "@/components/popup/popup"
import yNavbar from "@/components/navbar/navbar";
import ySwiperCell from "@/components/swiper_cell/swiper_cell";
import yCell from "@/components/cell/cell";
import yButton from "@/components/button/button";
export default {
    name:"home",
    components:{
        yNavbar,
        ySwiperCell,
        yCell,
        yButton,
        yPopup,
        yCheckbox,
        yCheckboxGroup,
        yDatepicker
    },
    inject:['reload'],
    data(){
        return {
          maxDate:new Date(2020,0,1),
          minDate:new Date(1970,0,1),
          currentDate:new Date(),
          results:[],
          title:"网站首页",
          result:null,
          show:false,
          showDialog:false,
          checkboxArr:[
            {
              checked:true,
              name:'张三',
              disabled:false
            },
            {
              checked:false,
              name:'李四',
              disabled:false
            },
            {
              checked:false,
              name:'赵五',
              disabled:true
            },
          ]
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
     cancelDate(v){
       console.log(v)
     },
     confirmDate(v){
       console.log(v)
     },
     resultChange(e){
       console.log(e)
     },
     togglePopup(){
       this.show = !this.show
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
             done()
           }
         }
       })
     }
   }
}
</script>

<style scoped>
.popupBox{
  width:100%;
  height:100%;
}
</style>
