<template>
   <div class="table_lists" >
       <ul class="table_card_nav" >
           <li :class="[activeIndex == index ? 'current' : '']" 
           v-for="(item,index) in lists" 
           :key="index" 
           @click="clickNav(index)"
           :inex="index">{{item.title}}</li>
       </ul>
       <div class="table_card_content">
           <template v-for="(item,index) in lists" :inex="index">
               <div class="table_card" :key="index" v-if="activeIndex == index" :style="{flexDirection:cardSort}">
                   <template v-for="(child,childIndex) in item.channellist" :index="childIndex"  @click="clickCards">
                        <y-card  
                        :key="child.channelid"
                        :src="child.thumb"
                        :cardText="child.name"
                        :size="cardSize"></y-card>
                   </template>
               </div>
           </template>
       </div>
   </div>
</template>

<script>
import yImage from "@/components/image/image";
import yButton from "@/components/button/button";
import yCard from "@/components/card/card";
export default {
    name:"tableCard",
    components:{
        yImage,
        yButton,
        yCard
    },
    props:{
        lists:{
            type:Array,
            default:function(){
                return [] ;
            }
        },
        active:{
            type:[Number,String],
            default:0
        },
        cardSize:{
            type:[Number,String],
            default:150
        },
        cardSort:{
            type:String,
            default:'column'
        }
    },
    data(){
        return{

        }
    },
    computed:{
        activeIndex:{
            get(){
                return this.active
            },
            set(newValue){
                return newValue
            }
        }
    },
    methods:{
        // 点击菜单
        clickNav(e){
            console.log(e)
            this.activeIndex = e
        },
        // 点击卡片
        clickCards(e){
            console.log(e)
        }
    }
}
</script>

<style lang="less">
.table_lists{
    max-height: 100%;
    overflow-y: scroll
}
.table_card_nav{
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    font-size: @cell-font-size;
    background-color: @cell-background-color;
    overflow: hidden;
    li{
        flex:1;
        color: @cell-text-color;
        line-height: @cell-line-height;
        padding: @cell-vertical-padding @cell-horizontal-padding;
        &.current{
            font-weight:bold;
            color:@blue;
            border-bottom:2px solid @blue
        }
    }
}
.table_card_content{
    height:100%;
    width: 100%;
    font-size: @cell-font-size;
    line-height: @cell-line-height;
    background-color: @cell-background-color;
    box-sizing: border-box;
    padding: @cell-vertical-padding @cell-horizontal-padding;
}
</style>