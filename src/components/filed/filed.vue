<template>
  <y-cell min-title required :title="label">
      <div class="y-field__body">
          <input type="text" placeholder="请输入用户名" class="y-field__control">
      </div>
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
        label:{
            type:String,
            default:'标题'
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