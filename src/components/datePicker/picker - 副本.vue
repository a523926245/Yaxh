<template>
  <div class="y-picker">
        <div v-show="showToolbar" class="y-hairline--top-bottom y-picker__toolbar">
            <div class="y-picker__cancel" @click="onCancel">取消</div>
            <div class="y-picker__confirm" @click=onConfirm>确定</div>
        </div>
        
            <div class="y-picker__columns" style="height:220px;">
                <template v-for="(item,index) in columns" :index="index">
                    <div class="y-picker-column" :key="index">
                            <ul class="y-picker-column__wrapper" >
                                    <template v-for="(childItem,childIndex) in item" :index="childIndex" >
                                        <template v-if="typeof childItem.child == 'object'">
                                            <template  v-for="(secondItem,secondIndex) in childItem.lists" :index="secondIndex">
                                                <li class="y-ellipsis y-picker-column__item" 
                                                :key="secondItem" 
                                                :index="secondIndex"
                                                v-if="secondIndex != 2"
                                                :class="[childItem.disabled ? 'y-picker-column__item--disabled' : '']" 
                                                style="line-height:44px;"
                                                @click="handlerClick(secondItem,index,secondIndex)">
                                                    {{secondItem.value}}
                                                </li>
                                                <li v-else class="y-ellipsis y-picker-column__item" 
                                                :key="secondItem" :index="secondIndex"
                                                :class="[childItem.disabled ? 'y-picker-column__item--disabled' : 'y-picker-column__item--selected']" 
                                                style="line-height:44px;"
                                                @click="handlerClick(secondItem,index,secondIndex)">
                                                    {{secondItem.value}}
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
        // 展示顶部栏 show tabbar
        showToolbar:Boolean
    },
    data(){
        return{
            columnsData:null,
            actives:[0,0],
            innerValue:[]
        }
    },
    computed:{

    },
    created(){
        console.log(this.columns)
        // this.formateColums(this.columns)
    },
    methods:{
        // 扁平化传入数据
        // formateColums(columnData){
        //     return [].concat(columnData.map( item =>{
        //         return item.name ;
        //     }))
        //     console.log(a)
        // },
        handlerClick(value,columnsIndex,index){
            if(value.disabled){
               return false;
            }
        },
        getInnerValue(columnsIndex,index){
          
        },
        pickChange(value){

        }
    }
}
</script>

<style>

</style>