<template>
    <div class="page">
        <y-navbar :title="title"></y-navbar>
        <div class="content">
          <template v-for="(item,index) in result" :index="index">
            <y-swiper-cell :key="index" :index="index">
                <y-cell :title="item.name" :value="item.url" is-link></y-cell>
                <div slot="right">
                    <y-button class="edit" @click="clickEdit">修改</y-button>
                    <y-button class="delete" @click="clickDelete(item.id)">删除</y-button>
                </div>
            </y-swiper-cell>
           </template>
           <!-- y-button -->
           <y-button @click="togglePopup">popup按钮</y-button>
           <y-button to="/about" icon="search" bgcolor="blue" color="#fff" round>123</y-button>
           <!-- y-popup -->
           <!-- y-checkbox -->
           <!-- <y-checkbox-group v-model="results" @change="resultChange">
                <y-checkbox v-for="(item,index) in checkboxArr" 
                v-model="item.checked" 
                :disabled="item.disabled"
                :name="item.name" 
                :index="index">{{item.name}}</y-checkbox>
           </y-checkbox-group> -->
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
          <y-button @click="selectCity">选择城市</y-button>
          <y-popup v-model="showCity" position="bottom">
            <y-picker 
              :columns="city"
              @change="onChange"
              @confirm="onConfirm"
              @cancel="onCancel"
              show-toolbar>
            </y-picker>
          </y-popup>
          <!-- <y-image fit="cover" width="8rem" height="8rem" showLoading url="https://img.yzcdn.cn/vant/cat.jpeg">
            <div slot="loading">加载中</div>
          </y-image> -->
        </div>
    </div>
</template>

<script>
import yPicker from "@/components/datePicker/picker";
import yImage from "@/components/image/image";
import yDatepicker from "@/components/datePicker/datePicker";
import yCheckboxGroup from "@/components/checkboxgroup/checkboxgroup";
import yCheckbox from "@/components/checkbox/checkbox";
import yPopup from "@/components/popup/popup"
import yNavbar from "@/components/navbar/navbar";
import ySwiperCell from "@/components/swiper_cell/swiper_cell";
import yCell from "@/components/cell/cell";
import yCellgroup from "@/components/cellGroup/cellGroup";
import yButton from "@/components/button/button";
import yFiled from "@/components/filed/filed";
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
        yDatepicker,
        yPicker,
        yFiled,
        yCellgroup,
        yImage
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
              checked:false,
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
          ],
          city: {
            'column1': [
              {
                value: '深圳',
                disabled: true
              },{
                value: '湖南'
              },{
                value: '湖北'
              },{
                value: '香港',
                disabled: true
              },{
                value: '上海'
              },{
                value: '北京'
              }
            ],
            'column2':[
              {
                value:['福州', '厦门', '莆田', '三明', '泉州']
              },
              {
                value:['杭州', '宁波', '温州', '嘉兴', '湖州']
              }
              
            ]
          },
          showCity:false
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
     selectCity(){
       this.showCity = !this.showCity
     },
     onChange(item,index){
       console.log(item,index)
     },
     onConfirm(value){
       console.log(value)
     },
     onCancel(value){
       console.log(value)
     },
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
           console.log(action)
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

<style scoped>
.popupBox{
  width:100%;
  height:100%;
}
</style>
