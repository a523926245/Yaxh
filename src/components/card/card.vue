<template>
  <div class="y-card">
      <div class="y-card-box" :style="{flexDirection:arrange}">
        <div class="y-card-image">
            <y-image :width="size + 'px'" :height="size + 'px'" v-if="src" :url="src"></y-image>
        </div>
        <div class="y-card-text">{{cardText}}</div>
      </div>
  </div>
</template>

<script>
import yImage from "@/components/image/image";
export default {
    name:"card",
    components:{
        yImage
    },
    props:{
        src:{
            type:String,
            default:''
        },
        cardText:{
            type:String,
            default:'卡片描述'
        },
        // 排列方向:columns:竖向,row:横向
        arrange:{
            type:String,
            default:'column'
        },
        size:{
            type:[Number,String],
            default:150
        }
    },
    data(){
        return{

        }
    },
    methods:{
    }
}
</script>

<style lang="less">
.y-card{
    display: inline-block;
    .y-card-box{
        display: flex;
        align-items: center;
        justify-content: center;
        padding:10px 5px;
        .y-card-image{
            flex:1
        }
        .y-card-text{
            padding:10px;
            flex:1
        }
    }

}

</style>