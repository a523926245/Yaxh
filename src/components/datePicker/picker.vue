<template>
  <div class="y-picker">
        <div v-show="showToolbar" class="y-hairline--top-bottom y-picker__toolbar">
            <div class="y-picker__cancel" @click="onCancel">取消</div>
            <div class="y-picker__confirm" @click=onConfirm>确定</div>
        </div>
        
            <div class="y-picker__columns" style="height:220px;">
                <template v-for="(item,index) in columns" :index="index">
                    <div class="y-picker-column" :key="index">
                        <ul class="y-picker-column__wrapper">
                            <li class="y-ellipsis y-picker-column__item" style="line-height:44px;"
                            :class="[child.disabled ? 'y-picker-column__item--disabled' : '',cIndex == '2' ? 'y-picker-column__item--selected' : '']" 
                            @click="pickerChange(child,index,cIndex)"
                            v-for="(child,cIndex) in item" :index="cIndex" :key="child.value">{{child.name}}</li>
                        </ul>
                    </div>
                </template>
            </div>
        
    </div>
</template>

<script>
import { PICKER_TYPE , IS_GANGGED_PICKER } from "./pickerType.js";
import { pickerMixin } from "@/mixin/picker";
import { type } from 'os';
import cityPicker from "./cityPicker";
export default {
    name:"yPicker",
    mixins:[pickerMixin],
    components:{
        cityPicker
    },
    props:{
        // 初始化数据 default data
        columns:{
            type:[Array,Object],
            default:function(){
                return []
            }
        },
        active:{
            type:Array,
            default:() =>{
                return []
            }
        },
        // 展示顶部栏 show tabbar
        showToolbar:Boolean,
        // picker类型:default,time,area,默认default
        type:{
            type:String,
            default:PICKER_TYPE.defaultPicker
        },
        // 是否联动:默认联动
        ganged:{
            type:String,
            default:IS_GANGGED_PICKER.gangedPicker
        }
    },
    data(){
        return{
            // 当前picker活动项
            pickerActive:this._initAvtive(),
            // 当前picker活动数据外递
            innerValue:[]
        }
    },
    watch:{
        columns:{
          handler(val){
              if(val){
                 this._initAvtive()
              }
          },
          deep:true
        },
    },
    methods:{
        // 初始化默认选择项
        _initAvtive(){
            // 如果没有主动传输默认活动选项，则根据当前传入数据的长度自动生成一个,默认选中每项的第一个
            let act = [];
            if(this.active.length){
                return this.active
            }
            let len = this.getArrayLen(this.columns);
            if(len){
                for(let j = 0; j<len; j++){
                    act[j] = 0
                }
            }
            else{
                act = [0]
            }
            // 初始化,默认选择项，默认选中内容
            this.pickerActive = act;
            this.getInnerValue()
            return act;
        },
        /**
         * picker选项变化
         * child - {object} :当前选中项的对象内容
         * pFndex - {number} :当前选中项在传入数据中的1级索引
         * cIndex - {number} :当前选中项在传入数据中的2级索引
         */
        pickerChange(child,pFndex,cIndex){
            if(child.disabled){
                return
            }
            this.pickerActive[pFndex] = cIndex;
            this.getInnerValue()
        },
        /**
         * 获取当前活动picker值
         */
        getInnerValue(){
            console.log('getInnerValue')
            let res = [];
            this.pickerActive.forEach((el ,j) =>{
                if(this.columns[j][el].disabled){
                    this.$toast({
                        message:'默认项被禁用'
                    })
                }
                res[j] = this.columns[j][el]
            })
            this.$nextTick(() =>{
                this.innerValue = res;
            })
        },
        /**
         * 滚动Picker
         */
        rollColumn(){
            let active = this.pickerActive;
        },
        /**
         * 计算数组长度
         * arr - {Array}:需要计算长度的数组对象
         */
        getArrayLen(arr) {
            if(arr.length){
                return arr.length
            }
            return 0
        }
    }
}
</script>

<style>

</style>