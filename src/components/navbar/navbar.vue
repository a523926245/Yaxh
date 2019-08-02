<template>
 <div class="van-nav-bar">
      <div name="left" class="van-nav-bar__left" @click="leftClick">
        <template v-if="leftText && leftText.length > 0">
          <span class="van-nav-bar__text">
            <template v-if="leftArrow ? leftArrow : false">
              <i class="arrow-left">1</i>
            </template>
            {{leftText}}
          </span>
        </template>
      </div>
    <div v-if="title" class="van-nav-bar__title">{{title}}</div>
    
    <div name="right" class="van-nav-bar__right" @click="rightClick">
      <slot name="right">
          <span class="van-nav-bar__text">{{rightText}}</span>
      </slot>
    </div>
 </div>
</template>
<script>
export default {
  name: 'navBar',
  inheritAttrs: false,
  props: {
    title:{
      type:String,
      default:'标题'
    },
    leftText:{
      type:String,
      default:''
    },
    rightText:{
      type:String,
      default:''
    },
    leftArrow:Boolean,
    slotName:String,
    border:String,
    required:Boolean,
  },
  methods:{
    leftClick(){
      this.$emit('left-click')
    },
    rightClick(){
      this.$emit('right-click')
    }
  }
}
</script>
<style scoped>
.van-nav-bar{
    position: relative;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background-color: #fff;
    -webkit-user-select: none;
    user-select: none;
  }
.van-nav-bar__left {
    left: 15px;
}
.van-nav-bar__left, .van-nav-bar__right {
    position: absolute;
    bottom: 0;
    font-size: 14px;
}
.van-nav-bar__right {
    right: 15px;
}
.van-nav-bar__title{
    max-width: 60%;
    margin: 0 auto;
    color: #323233;
    font-weight: 500;
    font-size: 16px;
}
.van-nav-bar__text{
  display: inline-block;
  margin: 0 -15px;
  padding: 0 15px;
  color: #1989fa;
  vertical-align: middle;
}
</style>
