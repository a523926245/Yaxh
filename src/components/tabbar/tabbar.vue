<template>
    <div class="van-hairline--top-bottom van-tabbar van-tabbar--fixed">
        <div class="van-tabbar-item" 
        :class="[activeNav == index ? 'active' : '']" 
        v-for="(item,index) in list" :index="index" :key="index"
        @click="clickItem(index,item.router)"
        >
            <div class="van-tabbar-item__icon">
                <template v-if="item.icon">
                    <i class="van-icon" :class="[`van-icon-${item.icon}`]"></i>
                </template>
            </div>
            <div class="van-tabbar-item__text">{{item.text}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"yTabbar",
    props:{
        list:{
            type:[Array,Object],
            default:function(){
                return [
                    {
                        icon:"home-o",
                        text:"栏目",
                        router:"/"
                    },
                    {
                        icon:"search",
                        text:"栏目",
                        router:"/about"
                    },
                    {
                        icon:"friends-o",
                        text:"栏目",
                        router:""
                    },
                    {
                        icon:"setting-o",
                        text:"栏目",
                        router:""
                    },
                ]
            }
        },
        active:Number
    },
    data(){
        return{
            activeNav:this.active
        }
    },
    methods:{
        clickItem(index,router){
            let that = this;
            router && (
                that.$router.push({
                    path:router
                })
            )
            this.activeNav = index;
            this.$emit('click',index)
        }
    }
}
</script>

<style lang="less">
.van-tabbar {
  display: flex;
  width: 100%;
  height: @tabbar-height;
  background-color: @tabbar-background-color;

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
  }

  &--safe-area-inset-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .van-tabbar-item{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #7d7e80;
    font-size: 12px;
    line-height: 1;
    &.active{
        color:#ff0000
    }
  }
}
</style>
