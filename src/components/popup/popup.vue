<template>
    <div v-show="isShow" class="y-popup" :class="[position ? 'y-popup--'+position : '']">
        <slot>
            <div></div>
        </slot>
    </div>
</template>

<script>
import Mask from "@/components/mask";
export default {
    name:"yPopup",
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
    computed:{
        isShow:{
            get(){
                return this.value
            },
            set(){
                
            }
        }
    },
    mounted(){
        Mask.show(this,{maskClose:true})
    }
}
</script>

<style>

</style>
