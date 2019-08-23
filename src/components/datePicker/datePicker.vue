<template>
    <div class="y-picker" v-show="value">
        <div class="y-hairline--top-bottom y-picker__toolbar">
            <div class="y-picker__cancel" @click="onCancel">取消</div>
            <div class="y-picker__confirm" @click=onConfirm>确定</div>
        </div>
        <template>
            <div class="y-picker__columns" style="height:220px;">
                <div class="y-picker-column" v-for="(item,index) in rangs" :key="index" :index="index">
                    <template v-if="item.type == 'year'">
                        <ul class="y-picker-column__wrapper" 
                        :style="{transform:scrollStyleY}"
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
                    <template v-else-if="item.type == 'month'">
                        <ul class="y-picker-column__wrapper" 
                        :style="{transform:scrollStyleM}"
                        style="transition-duration: 0ms; transition-property: none; line-height: 44px;">
                            <li 
                            :class="[index2 == activeM ? 'y-picker-column__item--selected' : '']" 
                            class="y-ellipsis y-picker-column__item" 
                            @click="handlerClick(item.type,index2,childitem)" v-for="(childitem,index2) in item.rang" :key="childitem">{{childitem}}</li>
                        </ul>
                    </template>
                    <template v-else-if="item.type == 'day'">
                        <ul class="y-picker-column__wrapper"
                        :style="{transform:scrollStyleD}"
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
export default {
    name:"yDatepicker",
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
            scrollHeightY:null,
            scrollStyleY:null,
            
            activeM:null,
            scrollHeightM:null,
            scrollStyleM:null,

            activeD:null,
            scrollHeightD:null,
            scrollStyleD:null,
            innerDate:formatDate(this.value)
        }
    },
    beforeMount(){
        
    },
    computed:{
        rang(){
            let result = [
                {
                    type:'year',
                    rang:[]
                },{
                    type:'month',
                    rang:[]
                },{
                    type:'day',
                    rang:[]
                },{
                    type:'hour',
                    rang:[]
                },{
                    type:'minute',
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

            
            this.rang[0].rang.forEach((val,index) =>{
                if(val == this.innerDate[0]){
                    this.activeY = index
                    this.moveColumn('year',index)
                }
            })

            this.rang[1].rang.forEach((val,index) =>{
                if(val == this.innerDate[1]){
                    this.activeM = index
                    this.moveColumn('month',index)
                }
            })

            this.rang[2].rang.forEach((val,index) =>{
                if(val == this.innerDate[2]){
                    this.activeD = index
                    this.moveColumn('day',index)
                }
            })

            return this.rang
        }
    },
    methods:{
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
        isLeapYear(year){
            return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0) 
        },
        isShortMonth(month){
            return [4,6,9,11].indexOf(month) > -1
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
        onChange(value){
            this.$emit('change',value)
        },
        onConfirm(){
            let isyPopup = this.$parent.$el.classList.value.indexOf('y-popup') > -1 ? true : false;
            if(this.$parent && isyPopup)this.$parent.close();
            this.$emit('confirm',this.innerDate.join("-"))
        },
        onCancel(){
            let isyPopup = this.$parent.$el.classList.value.indexOf('y-popup') > -1 ? true : false;
            if(this.$parent && isyPopup)this.$parent.close();
            this.$emit('cancel',this.innerDate.join("-"))
        },
        handlerClick(type,index,item){
            this.moveColumn(type,index,item)
            this.onChange(this.innerDate.join("-"))
        },
        moveColumn(type,index,item){
            let innerDate = this.innerDate;
            if(type == "year"){
                this.activeY = index;
                if(item)innerDate[0] = item;
                this.scrollHeightY = (index-2) * 44;
                this.scrollStyleY = `translate3d(0px,${-this.scrollHeightY}px,0px)`
            }
            if(type == "month"){
                this.activeM = index;
                if(item)innerDate[1] = item;
                this.scrollHeightM = (index-2) * 44;
                this.scrollStyleM = `translate3d(0px,${-this.scrollHeightM}px,0px)`
            }
            if(type == "day"){
                this.activeD = index;
                if(item)innerDate[2] = item;
                this.scrollHeightD = (index-2) * 44;
                this.scrollStyleD = `translate3d(0px,${-this.scrollHeightD}px,0px)`
            }
            this.rang[2].rang = this.fillArray(this.minDay,this.getMonthEndDay(innerDate[0],innerDate[1]))
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
          font-weight: 500;
          color:@picker-action-text-color;
      }
    }
  }
}
</style>
