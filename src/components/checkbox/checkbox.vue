<template>
    <div class="y-checkbox" @click="clickEvent" :checked="value">
        <div class="y-checkbox__icon y-checkbox__icon--round " 
        :class="[value && !disabled ? 'y-checkbox__icon--checked' : '',disabled ? 'y-checkbox__icon--disabled' :'']"
        >
            <y-icon name="success" :style="!disabled ? {backgroundColor:checkedColor,borderColor:checkedColor} : ''"></y-icon>
        </div>
        <span class="van-checkbox__label">
            <slot></slot>
        </span>
    </div>
</template>

<script>
import yIcon from "@/components/icon/icon";
import { setTimeout, clearTimeout } from 'timers';
export default {
    name:"yCheckbox",
    props:{
        name:null,
        disabled:Boolean,
        value:{
            type:Boolean,
            default:false
        },
        checkedColor:String
    },
    components:{
        yIcon
    },
    data(){
        return{
            parentNodeName:"y-checkbox-group"
        }
    },
    watch: {
        value(val) {
            // this.$emit('change', val);
        }
    },
    methods:{
        clickEvent(e){
            this.$emit('click')
            this.toggle();
        },
        toggle(){
            const checked = !this.value
            if(!this.disabled)this.$emit('input', checked);
            this.postValue()
        },
        postValue(){
            // 是否有父级元素
            const parent = this.$parent;
            // 是否checkboxgrop
            const groupParent = this.$parent.$el.classList.value == this.parentNodeName ? true : false;
            // 父级元素value[Array],使用v-model：默认绑定名为'value'的变量
            const parentValue = parent.value;
            // 当前checked状态切换后,赋值父checkboxgrop组件当前选中值
            this.$nextTick(() =>{
                // 有父级 && 父级为checkboxgrop
                if(this.$parent && groupParent){
                    // 当前为checked状态 && 禁用没开启
                    if(this.value && !this.disabled){
                        if(parentValue.indexOf(this.name) === -1){
                            parentValue.push(this.name);
                            parent.$emit('input', parentValue);
                        }
                    }
                    else{
                        const index = parentValue.indexOf(this.name);
                        if(index != -1){
                            parentValue.splice(index, 1)
                            parent.$emit('input', parentValue);
                        }
                    }
                }
            })
        }
    }
}
</script>

<style lang="less">
.y-checkbox {
  display: flex;
  align-items: center;
  overflow: hidden;
  user-select: none;

  &__icon {
    flex: none;
    height: 1em;
    font-size: @checkbox-size;
    line-height: 1em;

    .y-icon {
      display: block;
      box-sizing: border-box;
      width: 1.25em;
      height: 1.25em;
      color: transparent;
      font-size: .8em;
      line-height: inherit;
      text-align: center;
      border: 1px solid @checkbox-border-color;
      transition: @checkbox-transition-duration;
    }

    &--round {
      .y-icon {
        border-radius: 100%;
      }
    }

    &--checked {
      .y-icon {
        color: @white;
        background-color: @checkbox-checked-icon-color;
        border-color: @checkbox-checked-icon-color;
      }
    }

    &--disabled {
      .y-icon {
        background-color: @checkbox-disabled-background-color;
        border-color: @checkbox-disabled-icon-color;
      }
    }

    &--disabled&--checked {
      .y-icon {
        color: @checkbox-disabled-icon-color;
      }
    }
  }

  &__label {
    margin-left: @checkbox-label-margin;
    color: @checkbox-label-color;
    line-height: @checkbox-size;

    &--left {
      margin: 0 @checkbox-label-margin 0 0;
    }

    &--disabled {
      color: @checkbox-disabled-label-color;
    }
  }
}

</style>
