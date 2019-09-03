<template>
    <div v-show="value" class="y-popup" :class="[position ? 'y-popup--'+position : '']">
        <slot>
        </slot>
    </div>
</template>

<script>

import { PopupMixin } from "@/mixin/popup";
export default {
    name:"yPopup",
    mixins:[PopupMixin],
    props:{
        position:{
            type:String,
            default:'center'
        },
        value:{
            type:Boolean,
            default:false
        },
        maskClose:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        value:{
            handler(val){
                const type = val ? 'open' : 'close';
                this[type](this.maskClose);
            }
        }
    }
}
</script>

<style lang="less">
.y {
  &-overflow-hidden {
    overflow: hidden !important;
  }

  &-popup {
    position: fixed;
    max-height: 100%;
    overflow-y: auto;
    background-color: @popup-background-color;
    transition: @popup-transition;
    -webkit-overflow-scrolling: touch;
    z-index:99;
    &--center {
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);

      &.y-popup--round {
        border-radius: @popup-round-border-radius;
      }
    }

    &--top {
      top: 0;
      left: 0;
      width: 100%;

      &.y-popup--round {
        border-radius: 0 0 @popup-round-border-radius @popup-round-border-radius;
      }
    }

    &--right {
      top: 50%;
      right: 0;
      transform: translate3d(0, -50%, 0);

      &.y-popup--round {
        border-radius: @popup-round-border-radius 0 0 @popup-round-border-radius;
      }
    }

    &--bottom {
      bottom: 0;
      left: 50%;
      width: 100%;

      &.y-popup--round {
        border-radius: @popup-round-border-radius @popup-round-border-radius 0 0;
      }
    }

    &--left {
      top: 50%;
      left: 0;
      transform: translate3d(0, -50%, 0);

      &.y-popup--round {
        border-radius: 0 @popup-round-border-radius @popup-round-border-radius 0;
      }
    }

    &-slide-top-enter,
    &-slide-top-leave-active {
      transform: translate3d(0, -100%, 0);
    }

    &-slide-right-enter,
    &-slide-right-leave-active {
      transform: translate3d(100%, -50%, 0);
    }

    &-slide-bottom-enter,
    &-slide-bottom-leave-active {
      transform: translate3d(0, 100%, 0);
    }

    &-slide-left-enter,
    &-slide-left-leave-active {
      transform: translate3d(-100%, -50%, 0);
    }
  }
}
</style>
