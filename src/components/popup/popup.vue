<template>
    <div v-show="value" class="y-popup" :class="[position ? 'y-popup--'+position : '']">
        <slot>
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
        },
        maskClose:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        value:{
            handler(val){
                const type = val ? 'open' : 'close';
                this[type](this.maskClose);
            }
        }
    }
}
</script>

<style>

</style>
