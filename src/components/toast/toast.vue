<template>
    <div v-if="isShow">
      <div v-if="isShow" class="y-toast y-toast--middle" :class="[icon ? ''  : 'y-toast--text',isShow ? 'animation__fadeIn' : 'animation__fadeOut']">
          <i v-if="icon" class="yui__icon" :class="'yui__icon_' + icon">{{icon}}</i>
          <div class="y-toast__text">{{message}}</div>
      </div>
      <div v-if="mask" class="y__mask"></div>
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
    }
}
</script>

<style lang="less">

.y-toast{
  z-index:999;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;

  width: 90px;
  max-width:70%;
  min-height:90px;
  padding:16px;
  color:#fff;
  font-size:14px;
  line-height:20px;

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

    .y-toast__text {
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
