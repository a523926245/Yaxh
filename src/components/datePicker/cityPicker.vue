<template>
    <div class=""></div>
</template>

<script>
import area from "./area";
export default {
    name:"cityPicker",
    porps:{
        // https://github.com/xiecg/vue-picker.git
        columns:{
            type:[Array,Object],
            default:function(){
                return area
            }
        },
    },
    data(){
        return{

        }
    },
    beforeMount(){
        console.log(area)
    }
}
</script>

<style>

</style>