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
                                            <template  v-for="(secondItem,secondIndex) in childItem.value" :index="secondIndex">
                                                <li class="y-ellipsis y-picker-column__item" 
                                                :key="secondItem" 
                                                :index="secondIndex"
                                                v-if="secondIndex != 2"
                                                :class="[childItem.disabled ? 'y-picker-column__item--disabled' : '']" 
                                                style="line-height:44px;"
                                                @click="handlerClick(secondItem,index,secondIndex)">
                                                    {{secondItem}}
                                                </li>
                                                <li v-else class="y-ellipsis y-picker-column__item" 
                                                :key="secondItem" :index="secondIndex"
                                                :class="[childItem.disabled ? 'y-picker-column__item--disabled' : 'y-picker-column__item--selected']" 
                                                style="line-height:44px;"
                                                @click="handlerClick(secondItem,index,secondIndex)">
                                                    {{secondItem}}
                                                </li>
                                            </template>  
                                        </template>
                                        <template v-else>
                                            <template v-if="childIndex != 2">
                                                <li class="y-ellipsis y-picker-column__item" 
                                                :class="[childItem.disabled ? 'y-picker-column__item--disabled' : '']" 
                                                style="line-height:44px;"
                                                :key="childItem.value" 
                                                :index="childIndex"
                                                @click="handlerClick(childItem,index,childIndex)">
                                                    {{childItem.value}}
                                                </li>
                                            </template>
                                            <template v-else>
                                                <li class="y-ellipsis y-picker-column__item" 
                                                :class="[childItem.disabled ? 'y-picker-column__item--disabled' : 'y-picker-column__item--selected']" 
                                                style="line-height:44px;"
                                                :key="childItem.value" 
                                                :index="childIndex"
                                                @click="handlerClick(childItem,index,childIndex)">
                                                    {{childItem.value}}
                                                </li>
                                            </template>    
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
import { type } from 'os';
export default {
    name:"yPicker",
    mixins:[pickerMixin],
    props:{
        // 初始化数据 default data
        columns:{
            type:[Array,Object],
            default:function(){
                return []
            }
        },
        // 展示顶部栏 show tabbar
        showToolbar:Boolean
    },
    data(){
        return{
            actives:[0,0],
            innerValue:this.columns[this.defaultIndex] ? this.columns[this.defaultIndex] : null
        }
    },
    computed:{
        columnsLen(){
            if(typeof this.columns == 'object'){
                if(Array.isArray(this.columns)){
                    return this.columns.length;
                }
                else{
                    return Object.keys(this.columns).length
                }
            }
            else{
                throw new Error('columns is not Object or Array')
            }
        },
    },
    created(){
        let arr = this.actives;
        let arrLen = arr.length;
        let j = this.columnsLen;
        for(let i = arr;i < j;i++){
            arr[i] = 0
        }
        this.actives = arr;
    },
    methods:{
        handlerClick(value,columnsIndex,index){
            if(value.disabled){
               return false;
            }
            this.actives.splice(columnsIndex,1,index)

            this.getInnerValue(columnsIndex,index);
            this.innerValue = value;
            this.onChange(value,index,this)
        },
        getInnerValue(columnsIndex,index){
            let active = this.actives;
            let arr = new Array();
            let oValue = this.columns;
            let objArr = Object.keys(oValue)
            active.map((val,acindex) => {
                // console.log(val,acindex)
                console.log(oValue[objArr[acindex]].value)
                if(Array.isArray(oValue[objArr[acindex]].value)){
                    // arr[acindex] = oValue[objArr[acindex]].value[index]
                }
                arr[acindex] = oValue[objArr[acindex]].value
            })


            // console.log(arr)

        },
        // handlerClick(value,columnsIndex,index){
        //     if(value.disabled){
        //        return false;
        //     }
        //     if(columnsIndex > -1){
        //         let activeColumn = `activeColumn${columnsIndex}`;
        //         this[activeColumn] = index
        //     }
        //     this.innerValue = value;
        //     this.onChange(value,index,this)
        // },
        pickChange(value){

        }
    }
}
</script>

<style>

</style>