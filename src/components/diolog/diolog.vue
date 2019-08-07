<template>
    <div class="van-toast van-toast--middle van-toast--text">
        <div class="van-toast__text">{{title}}</div>
    </div>
</template>

<script>
export default {
    name:"toast",
    props:{
        title:{
            type:[String],
            default:"提示文字"
        }
    }
}
</script>

<style lang="less">
.van-toast {
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
}
</style>
