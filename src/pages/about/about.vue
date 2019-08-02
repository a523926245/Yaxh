<template>
    <div class="page">
        <navbar :title="title" @left-click="backRouter" @right-click="addInfo" left-text="返回" right-text="新增"></navbar>
        <div class="content">
            <template v-for="(item,index) in result" :index="index" @click="changeInfo(item.id)">
              <cell @click="changeInfo(item.id)" 
              :key="index" 
              :label="`${item.alexa} ${item.country}`" 
              :title="item.name" 
              align="left"
              :value="item.url" 
              :to="`/change?id=${item.id}`"
              isLink 
              icon="-icon-" >
                <!-- <div>{{item.url}}</div> -->
              </cell>
            </template>
        </div>
    </div>
</template>

<script>
import navbar from "@/components/navbar/navbar";
import cell from "@/components/cell/cell";
export default {
    name:"about",
    components:{
        navbar,
        cell
    },
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
