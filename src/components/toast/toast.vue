<template>
    <div>
      <div v-if="isShow" class="van-toast van-toast--middle" :class="[icon ? ''  : 'van-toast--text',isShow ? 'animation__fadeIn' : 'animation__fadeOut']">
          <i v-if="icon" class="yui__icon" :class="'yui__icon_' + icon">{{icon}}</i>
          <div class="van-toast__text">{{message}}</div>
      </div>
      <div v-if="mask" class="van__mask"></div>
    </div>
</template>

<script>
export default {
    name:"toast",
    data(){
      return{
        message:"",
        icon:'',
        mask:false,
        isShow:false,
        duration:3000,
      }
    },
}
</script>

<style lang="less">
// .fade-enter-active,.fade-leave-active {
//   transition: opacity 3s
// }
// .fade-enter,.fade-leave-to{
//   opacity: 0
// }
.van__mask{
  position: fixed;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background: rgba(0,0,0,0.1);
  z-index:2
}
.van-toast{
  z-index:999;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;

  // hack for avoid max-width when use left & fixed
  width: 90px;
  max-width:70%;
  min-height:90px;
  padding:16px;
  color:#fff;
  font-size:14px;
  line-height:20px;

  // allow newline charactor
  white-space: pre-wrap;
  text-align: center;
  word-break: break-all;
  background-color:rgba(50, 50, 51, 0.88);
  border-radius: 4px;
  transform: translate3d(-50%, -50%, 0);
  &.animation__fadeIn{
    animation: fadeIn 1s 1 forwards
  }
  &.animation__fadeOut{
    animation: fadeOut 1s 1 forwards
  }

  // should not add pointer-events: none directly to body tag
  // that will cause unexpected tap-highlight-color in mobile safari
  &--unclickable {
    * {
      pointer-events: none;
    }
  }

  &--text {
    width: fit-content;
    min-width: 96px;
    min-height: unset;
    padding: 8px 12px;

    .van-toast__text {
      margin-top: 0;
    }
  }

  &--top {
    top: 50px
  }

  &--bottom {
    top: auto;
    bottom: 50px
  }

  &__icon {
    font-size: 48px
  }

  &__loading {
    margin: 10px 0
  }

  &__text {
    padding-top: 5px
  }
  @keyframes fadeIn {
    from{
      opacity: 0;
    }
    to{
      opacity: 1
    }
  }
  @-webkit-keyframes fadeIn {
    from{
      opacity: 0;
    }
    to{
      opacity: 1
    }
  }

  @keyframes fadeOut {
    from{
      opacity: 1;
    }
    to{
      opacity: 0
    }
  }
  @-webkit-keyframes fadeOut {
    from{
      opacity: 1;
    }
    to{
      opacity: 0
    }
  }
}
</style>
