<template>
    <div class="y-cell-group y-hairline--top-bottom">
        <div class="y-cell-group__title" 
            :class="[align ? 'y-cell-group__align--' + align : '',isBorder ? 'y-hairline--bottom' : '']" 
            :style="{color:titleColor}"
            v-if="title"
          >{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"yCellgroup",
    props:{
      // 分组标题
      title:[String,Number],
      // 标题文本方向/title text-align
      align:{
        type:String,
        default:'left'
      },
      isBorder:Boolean,
      titleColor:String
    }
}
</script>

<style lang="less" scoped>
.y-cell-group {
  background-color: @cell-group-background-color;

  &__title {
    padding: @cell-group-title-padding;
    color: @cell-group-title-color;
    font-size: @cell-group-title-font-size;
    line-height: @cell-group-title-line-height;
  }
  &__align--left{
      text-align: left
    }
  &__align--right{
    text-align: right
  }
}

</style>