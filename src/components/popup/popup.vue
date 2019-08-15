<template>
    <div v-show="value" class="y-popup" :class="[position ? 'y-popup--'+position : '']">
        <slot>
            <div></div>
        </slot>
    </div>
</template>

<script>

import { PopupMixin } from "@/mixin/popup";
export default {
    name:"yPopup",
    mixins:[PopupMixin],
    props:{
        position:{
            type:String,
            default:'center'
        },
        value:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        value:{
            handler(val){
                const type = val ? 'open' : 'close';
                this[type]();
            }
        }
    }
}
</script>

<style>

</style>
