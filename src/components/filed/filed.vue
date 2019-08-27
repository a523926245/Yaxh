<template>
  <y-cell min-title :required="required" :title="label" :icon="leftIcon" :right-icon="rightIcon">
      <div class="y-field__body">
          <!-- input类型 -->
          <template v-if="type == 'textarea'">
              <textarea rows="1" :readonly="readonly" :disabled="disabled" :value="value" :placeholder="placeholder" class="y-field__control" @input="onInput"></textarea>
          </template>
          <template v-else>
              <input :type="type" :readonly="readonly" :disabled="disabled" :value="value" :placeholder="placeholder" class="y-field__control" @input="onInput">
          </template>
          <!-- 右侧插入按钮 -->
          <div class="y-field__button" v-if="$slots.button">
            <slot name="button"></slot>
        </div>
      </div>
      <!-- 错误提示 -->
      <div class="y-field__error-message" v-if="errorMessage">{{errorMessage}}</div>
  </y-cell> 
</template>

<script>
import yCell from "@/components/cell/cell";
export default {
    name:"yFiled",
    components:{
        yCell
    },
    props:{
        // input file type
        type:{
            type:String,
            default:'text'
        },
        // filed label
        label:{
            type:String,
            default:'标题'
        },
        // which to be readonly?
        readonly:Boolean,
        // which must be write?
        required:Boolean,
        // input value
        value:[String,Number],
        // right icon 
        rightIcon:String,
        // left icon
        leftIcon:String,
        // is disabled input file
        disabled:Boolean,
        // input placehlober text 
        placeholder:String,
        // error message notice
        errorMessage:String,
        // label text align
        labelAlign:[String]
    },
    methods:{
        onInput(event){
          if (event.target.composing) {
            return;
          }
          this.$emit('input', event.target.value)
        },
        onClick(event){
          this.$emit('click',event)
        },
        onFocus(event){
          this.$emit('focus',event)
          if(this.readonly){
            this.blur();
          }
        },
        onBlur(event){
          this.$emit('blur',event)
        }
    }
}
</script>

<style scoped lang="less">
.y-field {
  &__label {
    flex: none;
    width: @field-label-width;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &__body {
    display: flex;
    align-items: center;
  }

  &__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 0;
    color: @field-input-text-color;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;

    &::placeholder {
      color: @field-placeholder-text-color;
    }

    &:disabled {
      color: @field-input-disabled-text-color;
      background-color: transparent;
      opacity: 1;
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    /* for ios wechat */
    &[type="date"],
    &[type="time"],
    &[type="datetime-local"] {
      min-height: @cell-line-height;
    }
  }

  &__clear,
  &__icon,
  &__button,
  &__right-icon {
    flex-shrink: 0;
  }

  &__clear,
  &__right-icon {
    margin-right: -@padding-xs;
    padding: 0 @padding-xs;
    line-height: inherit;
  }

  &__clear {
    color: @field-clear-icon-color;
    font-size: @field-clear-icon-size;
  }

  &__left-icon .y-icon,
  &__right-icon .y-icon {
    display: block;
    min-width: 1em;
    font-size: @field-icon-size;
    line-height: inherit;
  }

  &__left-icon {
    margin-right: 5px;
  }

  &__right-icon {
    color: @field-right-icon-color;
  }

  &__button {
    padding-left: @padding-xs;
  }

  &__error-message {
    color: @field-error-message-color;
    font-size: @field-error-message-text-color;
    text-align: left;

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }
  }

  &--disabled {
    .y-field__control {
      color: @field-input-disabled-text-color;
    }
  }

  &--error {
    .y-field__control {
      &,
      &::placeholder {
        color: @field-input-error-text-color;
      }
    }
  }

  &--min-height {
    .y-field__control {
      min-height: @field-text-area-min-height;
    }
  }
}

</style>