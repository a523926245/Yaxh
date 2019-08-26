<template>
  <div class="y-picker">
        <div v-show="showToolbar" class="y-hairline--top-bottom y-picker__toolbar">
            <div class="y-picker__cancel" @click="onCancel">取消</div>
            <div class="y-picker__confirm" @click=onConfirm>确定</div>
        </div>
        
            <div class="y-picker__columns" style="height:220px;">
                <template v-for="(item,key,index) in columns" :index="index">
                    <div class="y-picker-column" :key="index">
                            <ul class="y-picker-column__wrapper" >
                                    <template v-for="(childItem,childIndex) in item" :index="childIndex" >
                                        <template v-if="typeof childItem.value == 'object'">
                                            <li class="y-ellipsis y-picker-column__item" 
                                            v-for="(secondItem,secondIndex) in childItem.value" :key="secondItem" :index="secondIndex"
                                            :class="[secondIndex == activeColumn1 && !childItem.disabled ? 'y-picker-column__item--selected' : '',childItem.disabled ? 'y-picker-column__item--disabled' : '']" 
                                            style="line-height:44px;"
                                            @click="handlerClick(secondItem,index,secondIndex)">
                                                {{secondItem}}
                                            </li>
                                        </template>
                                        <template v-else>
                                            <li class="y-ellipsis y-picker-column__item" 
                                            :class="[childIndex == activeColumn0 && !childItem.disabled ? 'y-picker-column__item--selected' : '',childItem.disabled ? 'y-picker-column__item--disabled' : '']" 
                                            style="line-height:44px;"
                                            :key="childItem.value" 
                                            :index="childIndex"
                                            @click="handlerClick(childItem,index,childIndex)">
                                                {{childItem.value}}
                                            </li>
                                        </template>
                                    </template>
                            </ul>
                    </div>
                </template>    
            </div>
        
    </div>
</template>

<script>
import { pickerMixin } from "@/mixin/picker";
export default {
    name:"yPicker",
    mixins:[pickerMixin],
    props:{
        // 初始化数据 default data
        columns:{
            type:[Array,Object],
            default:[]
        },
        // 默认选中项 default index
        defaultIndex:{
            type:[String,Number],
            default:0
        },
        // 展示顶部栏 show tabbar
        showToolbar:Boolean
    },
    data(){
        return{
            activeColumn1:0,
            activeColumn0:this.defaultIndex,
            innerValue:this.columns[this.defaultIndex] ? this.columns[this.defaultIndex] : null
        }
    },
    watch:{
        columns(val){
            console.log(val.length)
        }
    },
    methods:{
        handlerClick(value,columnsIndex,index){
            if(value.disabled){
               return false;
            }
            if(columnsIndex > -1){
                let activeColumn = `activeColumn${columnsIndex}`;
                this[activeColumn] = index
            }
            this.innerValue = value
            this.onChange(value,index,this)
        }
    }
}
</script>

<style>

</style>