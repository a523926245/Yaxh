<template>
    <div class="y-picker">
        <div class="y-hairline--top-bottom y-picker__toolbar">
            <div class="y-picker__cancel">取消</div>
            <div class="y-picker__confirm">确定</div>
        </div>
        <div class="y-picker__columns">
            <div class="y-picker-column">
                <ul class="y-picker-column__wrapper">
                    <li class="y-ellipsis y-picker-column__item y-picker-column__item--selected">{{dateYear}}</li>
                </ul>
            </div>
            <div class="y-picker-column">
                <ul class="y-picker-column__wrapper">
                    <li class="y-ellipsis y-picker-column__item y-picker-column__item--selected">{{dateMonth}}</li>
                </ul>
            </div>
            <div class="y-picker-column">
                <ul class="y-picker-column__wrapper">
                    <li class="y-ellipsis y-picker-column__item y-picker-column__item--selected">{{dateDay}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import yButton from "@/components/button/button";
export default {
    name:"yDatepicker",
    props:{

    },
    components:{
        yButton
    },
    computed:{
        dateYear(){
            return this.dateValue.getFullYear()
        },
        dateMonth(){
            return this.dateValue.getMonth()
        },
        dateDay(){
            return this.dateValue.getDate()
        }
    },
    data(){
        return{
            dateValue:new Date(),
        }
    }
}
</script>

<style>

</style>
