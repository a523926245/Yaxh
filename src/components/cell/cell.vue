<template>
    <div class="y-cell" @click="click" :class="[required ? 'y-cell--required' : '']">
        <slot name="icon" @click="clickLeftIcon">
            <div class="y-field__left-icon" v-if="icon">
                <y-icon :name="icon"></y-icon>
            </div>
        </slot>
        <div v-if="title" class="y-cell__title" :class="[minTitle ? 'y-cell__mintitle' : '',labelAlign ? 'y-cell__label--' + labelAlign :'']">
            <slot name="title" v-if="title">
                <span v-if="title">{{title}}</span>
                <span v-if="label" class="y-cell__label">{{label}}</span>
            </slot>
        </div>
        <!-- value || $slots.default 组件是否传递value参数或者是否有slot -->
        <div v-if="value || $slots.default" class="y-cell__value" :class="[title ? '' : 'y-cell__value--alone',align ? 'y-cell__value_'+ align :'']">
            <slot>
                <span v-if="value">{{value}}</span>
            </slot>
        </div>
        <i v-if="isLink">></i>
        <slot name="righticon" @click="clickRightIcon">
            <div class="y-field__right-icon" v-if="rightIcon" >
                <y-icon :name="rightIcon"></y-icon>
            </div>
        </slot>
    </div>
</template>

<script>
/**
 * cell
 * @module components/cell
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [right-icon] - 图标
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 * @param {boolean} [min-itle] - 开启迷你title,flex占比减少
 */
import yIcon from "@/components/icon/icon";
export default {
    name:"yCell",
    components:{
        yIcon
    },
    props:{
        // cell标题
        title:String,
        // cell标题描述/描述
        label:String,
        // cell内容
        value:String,
        // cell内容文本对齐方式
        align:String,
        // cell icon图标
        icon:String,
        // 是否开启cell箭头
        isLink:Boolean,
        // 是否开启迷你titile
        minTitle:Boolean,
        // 是否为必填项
        required:Boolean,
        // 右侧图标
        rightIcon:String,
        // label text-align
        labelAlign:{
          type:String,
          default:'left'
        }
    },
    data(){
        return{
            
        }
    },
    methods:{
        click(event){
            this.$emit("click",event)
        },
        clickLeftIcon(event){
          this.$emit('click-left-icon',event)
        },
        clickRightIcon(event){
          this.$emit('click-right-icon',event)
        }
    }
}
</script>

<style lang="less">
.y-cell{
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: @cell-vertical-padding @cell-horizontal-padding;
  overflow: hidden;
  color: @cell-text-color;
  font-size: @cell-font-size;
  line-height: @cell-line-height;
  background-color: @cell-background-color;

  &:not(:last-child)::after{
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 16px;
      border-bottom: 1px solid @cell-border-color;
      transform: scaleY(0.5);
    // .hairline-bottom(@cell-border-color, @padding-md);
  }

  &--borderless::after {
    display: none;
  }

  &__label {
    margin-top: @cell-label-margin-top;
    color: @cell-label-color;
    font-size: @cell-label-font-size;
    line-height: @cell-label-line-height;
    margin-left:@cell-label-margin-right
  }
  &__title,
  &__value {
    flex: 1;
  }
  &__title{
      text-align: left;
      // max-width: 90px;
  }
  &__mintitle{
      flex:0.3 !important;
  }
  &__label--left{
      text-align: left;
    }
  &__label--right{
      text-align: right;
    }
  &__value {
    position: relative;
    overflow: hidden;
    color: @cell-value-color;
    text-align: right;
    vertical-align: middle;

    &--alone {
      color: @text-color;
      text-align: left;
    }
  }

  &__left-icon,
  &__right-icon {
    min-width: 1em;
    height: @cell-line-height;
    font-size: @cell-icon-size;
    line-height: @cell-line-height;
  }

  &__left-icon {
    margin-right: 5px;
  }

  &__right-icon {
    margin-left: 5px;
    color: @cell-right-icon-color;
  }

  &--clickable {
    &:active {
      background-color: @cell-active-color;
    }
  }

  &--required {
    overflow: visible;

    &::before {
      position: absolute;
      left: @padding-xs;
      color: @cell-required-color;
      font-size: @cell-font-size;
      content: '*';
    }
  }

  &--center {
    align-items: center;
  }

  &--large {
    padding-top: @cell-large-vertical-padding;
    padding-bottom: @cell-large-vertical-padding;

    .van-cell__title {
      font-size: @cell-large-title-font-size;
    }

    .van-cell__label {
      font-size: @cell-large-label-font-size;
    }
  }
}
</style>
