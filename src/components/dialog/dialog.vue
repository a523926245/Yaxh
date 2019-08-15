<template>
    <div class="y-dialog" v-show="isShow">
        <div class="y-dialog__header">{{title}}</div>
        <div class="y-dialog__content">
            <div class="y-dialog__message y-dialog__message--has-title">{{content}}</div>
        </div>
        <div class="y-hairline--top y-dialog__footer y-dialog__footer--buttons">
            <y-button size="large" v-if="showCancelButton" @click="handleAction('cancel')">{{cancelText}}</y-button>
            <y-button size="large" @click="handleAction('confirm')">{{confirmText}}</y-button>
        </div>
    </div>
</template>

<script>
import Mask from "@/components/mask";
import yButton from "@/components/button/button";
export default {
    name:"yDialog",
    components:{
        yButton
    },
    props:{
        isShow:{
          type:Boolean,
          default:false
        },
        title:String,
        content:String,
        beforeClose:Function,
        confirmText:{
            type:String,
            default:'确认'
        },
        cancelText:{
            type:String,
            default:'取消'
        },
        showCancelButton:true
    },
    data(){
        return{

        }
    },
    methods:{
      // 点击事件触发器
      handleAction(action){
        this.$emit(action)
        if(this.beforeClose){
          // dialog关闭拦截器
          this.beforeClose(action,state =>{
            if(state !== false){
              this.onClose(action)
            }
          })
        }else{
          this.onClose(action)
        }
      },
      // 关闭dialog
      onClose(action){
        this.isShow = false
        Mask.hide(this,{})
        if(this.callback){
          this.callback(action)
        }
      }
    }
}
</script>

<style lang="less">
.y-mask{
  position: fixed;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background: rgba(0,0,0,0.65);
  z-index:2
}
.y-dialog{
  z-index:99;
  position: fixed;
  top: 45%;
  left: 50%;
  width: @dialog-width;
  overflow: hidden;
  font-size: @dialog-font-size;
  background-color: @dialog-background-color;
  border-radius: @dialog-border-radius;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden; 
  transition: @dialog-transition;

  &__header {
    padding-top: @dialog-header-padding-top;
    font-weight: @dialog-header-font-weight;
    line-height: @dialog-header-line-height;
    text-align: center;

    &--isolated {
      padding: @dialog-header-isolated-padding;
    }
  }

  &__message {
    max-height: @dialog-message-max-height;
    padding: @dialog-message-padding;
    overflow-y: auto;
    font-size: @dialog-message-font-size;
    line-height: @dialog-message-line-height;

    white-space: pre-wrap;
    text-align: center;
    -webkit-overflow-scrolling: touch;

    &--has-title {
      padding-top: @dialog-has-title-message-padding-top;
      color: @dialog-has-title-message-text-color;
    }

    &--left {
      text-align: left;
    }

    &--right {
      text-align: right;
    }
  }

  &__footer {
    overflow: hidden;
    user-select: none;

    &--buttons {
      display: flex;

      .y__button {
        flex: 1;
      }
    }
  }

  .y__button {
    border: 0;
  }

  &__confirm {
    &,
    &:active {
      color: @dialog-confirm-button-text-color;
    }
  }

  &-bounce-enter {
    transform: translate3d(-50%, -50%, 0) scale(0.7);
    opacity: 0;
  }

  &-bounce-leave-active {
    transform: translate3d(-50%, -50%, 0) scale(0.9);
    opacity: 0;
  }
}
</style>
