<template>
    <button :disabled="disabled" 
    class="y-button" 
    :class="[type ? 'y-button--'+type : ''
    ,round ? 'y-button--round' : ''
    ,plain ? 'y-button--plain' : ''
    ,disabled ? 'y-button--disabled' : ''
    ,size ? 'y-button--'+size : 'y-button--normal']" 
    :value="text">
    <span v-if="$slots.default || text" class="y-button__text">
        <slot>
            <span class="y-button__text">{{text}}</span>
        </slot>
    </span>
    </button>
</template>

<script>
export default {
/**
 * yButton
 * @module components/button
 * @param {string} [size] - 按钮尺寸:可选large,small,normal,mini
 * @param {Boolean} [disabled] - 是否禁用点击
 * @param {string} [icon] - icon图标样式名
 * @param {String} [text] - 按钮value值
 * @param {Boolean} [plain] - 是否简约风格，白底有色边框模式
 * @param {Boolean} [round] - 按钮是否圆角
 */
    name:"yButton",
    props:{
        size:String,
        disabled:Boolean,
        icon:String,
        type:{
            type:String,
            default:'default'
        },
        text:{
            type:String,
            default:"按钮"
        },
        plain:{
            type:Boolean,
            default:false
        },
        round:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{

        }
    }
}
</script>

<style lang="less" scoped>
    .y-button{
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: @button-default-height;
  margin: 0;
  padding: 0;
  font-size: @button-default-font-size;
//   line-height: @button-default-line-height;
  text-align: center;
  border-radius: @button-border-radius;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: @black;
    border: inherit;
    border-color: @black;
    border-radius: inherit; /* inherit parent's border radius */
    transform: translate(-50%, -50%);
    opacity: 0;
    content: ' ';
  }

  &:active::before {
    opacity: .1;
  }

  &--loading,
  &--disabled {
    &::before {
      display: none;
    }
  }

  &--default {
    color: @button-default-color;
    background-color: @button-default-background-color;
    border: @button-border-width solid @button-default-border-color;
  }

  &--primary {
    color: @button-primary-color;
    background-color: @button-primary-background-color;
    border: @button-border-width solid @button-primary-border-color;
  }

  &--info {
    color: @button-info-color;
    background-color: @button-info-background-color;
    border: @button-border-width solid @button-info-border-color;
  }

  &--danger {
    color: @button-danger-color;
    background-color: @button-danger-background-color;
    border: @button-border-width solid @button-danger-border-color;
  }

  &--warning {
    color: @button-warning-color;
    background-color: @button-warning-background-color;
    border: @button-border-width solid @button-warning-border-color;
  }

  &--plain {
    background-color: @button-plain-background-color;

    &.y-button--primary {
      color: @button-primary-background-color;
    }

    &.y-button--info {
      color: @button-info-background-color;
    }

    &.y-button--danger {
      color: @button-danger-background-color;
    }

    &.y-button--warning {
      color: @button-warning-background-color;
    }
  }

  &--large {
    width: 100%;
    height: @button-large-height;
    line-height: @button-large-line-height;
  }

  &--normal {
    padding: 0 15px;
    font-size: @button-normal-font-size;
  }

  &--small {
    min-width: @button-small-min-width;
    height: @button-small-height;
    padding: 0 @padding-xs;
    font-size: @button-small-font-size;
    line-height: @button-small-line-height;
  }

  &__loading {
    display: inline-block;
    vertical-align: top;
  }

  &--mini {
    display: inline-block;
    min-width: @button-mini-min-width;
    height: @button-mini-height;
    font-size: @button-mini-font-size;
    line-height: @button-mini-line-height;

    & + .y-button--mini {
      margin-left: 5px;
    }
  }

  &--block {
    display: block;
    width: 100%;
  }

  &--disabled {
    opacity: @button-disabled-opacity;
  }

  &--round {
    border-radius: @button-round-border-radius;
  }

  &--square {
    border-radius: 0;
  }

  &__icon {
    min-width: 1em;
    font-size: 1.2em;
    line-height: inherit;
    vertical-align: top;
  }

  &__icon + &__text,
  &__loading + &__text {
    display: inline-block;
    margin-left: 5px;
    vertical-align: top;
  }

  &--hairline {
    border-width: 0;

    &::after {
      border-color: inherit;
      border-radius: @button-border-radius * 2;
    }

    &.y-button--round::after {
      border-radius: @button-round-border-radius;
    }

    &.y-button--square::after {
      border-radius: 0;
    }
  }
}
</style>
