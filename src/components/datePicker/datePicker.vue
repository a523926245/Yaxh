<template>
    <div class="y-picker" v-show="value">
        <div class="y-hairline--top-bottom y-picker__toolbar">
            <div class="y-picker__cancel" @click="onCancel">取消</div>
            <div class="y-picker__confirm" @click=onConfirm>确定</div>
        </div>
        <template>
            <div class="y-picker__columns" style="height:220px;">
                <div class="y-picker-column" v-for="(item,index) in rangs" :key="index" :index="index">
                    <template v-if="item.type == 'Year'">
                        <ul class="y-picker-column__wrapper" 
                        :style="{transform:scrollStyleYear}"
                        style="transition-duration: 0ms; transition-property: none; line-height: 44px;"
                        >
                            <template  v-for="(childitem,index2) in item.rang" :index="index">
                                <li class="y-ellipsis y-picker-column__item" 
                                :class="[index2 == activeY ? 'y-picker-column__item--selected' : '']" 
                                @click="handlerClick(item.type,index2,childitem)"
                                :key="index2">{{childitem}}</li>
                            </template>
                        </ul>
                    </template>
                    <template v-else-if="item.type == 'Month'">
                        <ul class="y-picker-column__wrapper" 
                        :style="{transform:scrollStyleMonth}"
                        style="transition-duration: 0ms; transition-property: none; line-height: 44px;">
                            <li 
                            :class="[index2 == activeM ? 'y-picker-column__item--selected' : '']" 
                            class="y-ellipsis y-picker-column__item" 
                            @click="handlerClick(item.type,index2,childitem)" v-for="(childitem,index2) in item.rang" :key="childitem">{{childitem}}</li>
                        </ul>
                    </template>
                    <template v-else-if="item.type == 'Day'">
                        <ul class="y-picker-column__wrapper"
                        :style="{transform:scrollStyleDay}"
                        style="transition-duration: 0ms; transition-property: none; line-height: 44px;">
                            <li 
                            :class="[index2 == activeD ? 'y-picker-column__item--selected' : '']" 
                            class="y-ellipsis y-picker-column__item" 
                            @click="handlerClick(item.type,index2,childitem)" v-for="(childitem,index2) in item.rang" :key="childitem">{{childitem}}</li>
                        </ul>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
const currentYear = new Date().getFullYear();
import {isNaN,isDate,formatDate} from "@/utils/date.js";
import { pickerMixin } from "@/mixin/picker";
export default {
    name:"yDatepicker",
    mixins:[pickerMixin],
    props:{
        value:null,
        type:{
            type:String,
            default:'date'
        },
        minDate:{
            type:Date,
            default:() =>{
              return new Date(currentYear - 10 ,0,1)
            },
            validator:function(val){
                return isDate
            }
        },
        maxDate:{
            type:Date,
            default:() =>{
               return new Date(currentYear + 10 ,11,31)
            },
            validator:function(val){
                return isDate
            }
        }
    },
    data(){
        return{
            minMonth:1,
            maxMonth:12,
            minDay:1,
            maxDay:31,
            
            startY:null,
            endY:null,
            activeY:null,
            scrollHeightYear:null,
            scrollStyleYear:null,
            
            activeM:null,
            scrollHeightMonth:null,
            scrollStyleMonth:null,

            activeD:null,
            scrollHeightDay:null,
            scrollStyleDay:null,
            innerDate:formatDate(this.value)
        }
    },
    beforeMount(){
        
    },
    computed:{
        innerValue(){
           return this.innerDate.join('-')
        },
        rang(){
            let result = [
                {
                    type:'Year',
                    rang:[]
                },{
                    type:'Month',
                    rang:[]
                },{
                    type:'Day',
                    rang:[]
                },{
                    type:'Hour',
                    rang:[]
                },{
                    type:'Minute',
                    rang:[]
                }
            ];
            if(this.type = "date"){
                result.splice(3,2)
            }
            if(this.type == 'time'){
                result.splice(-2,3)
            }
            return result;
        },
        rangs(){
            let minYear,maxYear,minMonth,maxMonth,minDay,maxDay;
            minYear = this.minDate.getFullYear();
            maxYear = this.maxDate.getFullYear();
            this.rang[0].rang = this.fillArray(minYear,maxYear);
            this.rang[1].rang = this.fillArray(this.minMonth,this.maxMonth)
            this.rang[2].rang = this.fillArray(this.minDay,this.getMonthEndDay(this.value.getFullYear(),this.value.getMonth() + 1))

            // 获取当天时间column索引
            this.rang.map((obj,i) => {
                obj.rang.forEach((args,j) =>{
                    if(obj.type == 'Year'){
                        if(args == this.innerDate[0]){
                            this.activeY = j
                            this.updateDate(obj.type,j)
                        }
                    }
                    if(obj.type == 'Month'){
                        if(args == this.innerDate[1]){
                            this.activeM = j
                            this.updateDate(obj.type,j)
                        }
                    }
                    if(obj.type == 'Day'){
                        if(args == this.innerDate[2]){
                            this.activeD = j
                            this.updateDate(obj.type,j)
                        }
                    }
                })
            })

            return this.rang
        }
    },
    methods:{
        isLeapYear(year){
            return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0) 
        },
        isShortMonth(month){
            return ['04','06','09','11'].indexOf(month) > -1
        },
        getMonthEndDay(year,month){
            if(this.isShortMonth(month)){
                return 30
            }
            else if(month == 2){
                return this.isLeapYear(year) ? 29 : 28
            }
            else{
                return 31
            }
        },
        fillArray(start,end){
            let array = [];
            let n = start - 1;
            while(++n <= end){
                if(n < 10){
                    n = `0${n}`
                }
                array.push(n)
            }
            return array;
        },
        handlerClick(type,index,item){
            this.updateDate(type,index,item)
            this.onChange(this.innerValue,index,this)
        },
        updateDate(type,index,item){
            let innerDate = this.innerDate;
            if(type == "Year"){
                this.activeY = index;
                if(item)innerDate[0] = item;
                this.scrollColumn('Year',index,44)
            }
            // 调整每月天数
            this.rang[2].rang = this.fillArray(this.minDay,this.getMonthEndDay(innerDate[0],innerDate[1]))
            if(type == "Month"){
                this.activeM = index;
                if(item)innerDate[1] = item;
                this.scrollColumn('Month',index,44)
                // 调整每月天数
                this.rang[2].rang = this.fillArray(this.minDay,this.getMonthEndDay(innerDate[0],innerDate[1]))
                // 当月天数小于上个月天数
                let dayLen = this.rang[2].rang.length;
                if(this.activeD >= dayLen - 1){
                    this.activeD = dayLen - 1;
                    this.scrollColumn('Day',dayLen,44)
                }
            }
            if(type == "Day"){
                this.activeD = index;
                if(item)innerDate[2] = item;
                this.scrollColumn('Day',index,44)
            }
        },
        scrollColumn(type,index,lineHeight){
            let scrollStyle = `scrollStyle${type}`;
            this[scrollStyle] = `translate3d(0px,${-(index - 2) * 44}px,0px)`;
        }
    }
}
</script>

<style lang="less">
.y-picker {
  position: relative;
  background-color: @picker-background-color;
  user-select: none;
  -webkit-text-size-adjust: 100%; /* avoid iOS text size adjust */

  &__toolbar {
    display: flex;
    justify-content: space-between;
    height: @picker-toolbar-height;
    line-height: @picker-toolbar-height;
  }

  &__cancel,
  &__confirm {
    padding: @picker-action-padding;
    color: @picker-action-text-color;
    font-size: @picker-action-font-size;

    &:active {
      background-color: @picker-action-active-color;
    }
  }

  &__title {
    max-width: 50%;
    font-weight: 500;
    font-size: @picker-title-font-size;
    text-align: center;
  }

  &__columns {
    position: relative;
    display: flex;
  }

  &__loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .9);
  }

  &__loading .y-loading,
  &__frame {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 3;
    width: 100%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(180deg, hsla(0, 0%, 100%, .9), hsla(0, 0%, 100%, .4)),
      linear-gradient(0deg, hsla(0, 0%, 100%, .9), hsla(0, 0%, 100%, .4));
    background-repeat: no-repeat;
    background-position: top, bottom;
    backface-visibility: hidden;
    pointer-events: none;
  }

  &-column {
    flex: 1;
    overflow: hidden;
    font-size: @picker-option-font-size;
    text-align: center;

    &__wrapper {
      transition-timing-function: cubic-bezier(0.23, 1, 0.68, 1);
    }

    &__item {
      padding: 0 5px;
      color: @picker-option-text-color;

      &--disabled {
        opacity: @picker-option-disabled-opacity;
      }
      &--selected{
          border-top:1px transparent solid;
          border-bottom:1px transparent solid;
          border-image:linear-gradient(to right,#fff,#ddd,#fff) 1 10;
          font-weight: 500;
          color:@picker-action-text-color;
      }
    }
  }
}
</style>
