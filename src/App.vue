<template>
  <div id="app">

    <!-- <navbar :title="titleTxt" left-text="返回" right-text="新增" @left-click="clickLeft" @right-click="clickRight"></navbar> -->

    <div>
        <router-view v-if="isRouterAlive"></router-view>
    </div>

    <y-tabbar :list="bottomMenu" :active=0 @click="clickTabbar"></y-tabbar>
  </div>
</template>

<script>
import yNavbar from "@/components/navbar/navbar";
import yTabbar from "@/components/tabbar/tabbar";
export default {
  components:{
    yNavbar,
    yTabbar
  },
  provide(){
    return {
      reload : this.reload
    }
  },
   data(){
     return{
       isRouterAlive:true,
       msg:"主页",
       titleTxt:"改变标题",
       bottomMenu:[
         {
            icon:"home-o",
            text:"首页",
            router:"/"
        },
        {
            icon:"search",
            text:"关于我们",
            router:"/about"
        },
        {
            icon:"friends-o",
            text:"新增",
            router:"/submit"
        },
        {
            icon:"service-o",
            text:"音乐列表",
            router:"/musicList"
        },
       ]
     }
   },
   methods:{
     clickLeft(){
       console.log('点击左边')
       this.title="点击左边"
     },
     clickRight(){
       console.log('点击右边')
       this.title = "点击右边"
     },
     clickTabbar(e){
       console.log(e)
     },
     reload(){
       this.isRouterAlive = false;
       this.$nextTick(() =>{
         this.isRouterAlive = true
       })
     }
   }
}
</script>

<style>
*{
  word-break: break-all;
  word-wrap: break-word
}
#app {
  /* position: fixed; */
  width: 100%;
  height:100%;
  top: 0;
  bottom:0;
  left:0;
  right:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content{
    position: absolute;
    top:46px;
    bottom:80px;
    left:0;
    right:0;
    overflow-y: scroll
}
.page{
    position: absolute;
    top:0;
    bottom:60px;
    left:0;
    right:0;
    overflow:hidden
}
</style>
