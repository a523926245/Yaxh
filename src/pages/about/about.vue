<template>
    <div class="page">
        <y-navbar :title="title" @left-click="backRouter" @right-click="addInfo" left-text="返回" right-text="新增"></y-navbar>
        <div class="content">
            <template v-for="(item,index) in result" :index="index" @click="changeInfo(item.id)">
              <y-cell @click="changeInfo(item.id)" 
              :key="index" 
              :label="`${item.alexa} ${item.country}`" 
              :title="item.name" 
              align="left"
              :value="item.url" 
              :to="`/change?id=${item.id}`"
              isLink 
              icon="-icon-" >
                <!-- <div>{{item.url}}</div> -->
              </y-cell>
            </template>
        </div>
    </div>
</template>

<script>
import yNavbar from "@/components/navbar/navbar";
import yCell from "@/components/cell/cell";
export default {
    name:"about",
    components:{
        yNavbar,
        yCell
    },
    inject:['reload'],
    data(){
        return {
            title:"关于我们",
            result:null
        }
    },
    mounted(){
        this.$http("post","/about",{
        })
        .then(res =>{
            this.result = res.data.result.info;
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
    },
    methods:{
        addInfo(){
            this.$router.push({
                path:"/submit"
            })
        },
        changeInfo(id){
            this.$router.push({
                path:"/change",
                query:{
                  id:id
                }
            })
        },
        deleteInfo(id){
            var msg = prompt("确认删除吗?");
            if(msg!=null && msg!=""){
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
            }
        }
    }
}
</script>

<style scoped>

</style>
