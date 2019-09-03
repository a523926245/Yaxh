<template>
    <i class="y-icon" :class="[name ? 'y-icon-' + name : '']" :style="{color:color ? color : '',fontSize:size ? size + 'px' : ''}"></i>
</template>
<script>
/**
 * {String} [name] 图标名称或者图片链接
 * {String,Number} [size] 图标大小
 * {String} [color] 图标颜色
 */
export default {
    name:"yIcon",
    props:{
        name:String,
        size:[String,Number],
        color:String
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="less">
.y-icon {
    position: relative;
    font: 14px/1 "y-icon";
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    line-height: inherit;
  &__image {
    width: 1em;
    height: 1em;
  }
}
</style>
