<template>
    <div class="y-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
import yCheckbox from "@/components/checkbox/checkbox";
export default {
    name:"yCheckboxGroup",
    props:{
        value:[Array,Object],
        list:[Array]
    },
    components:{
        yCheckbox
    },
    watch:{
        value:{
            handler(val){
                this.$emit('change',val)
            }
        }
    }
}
</script>

<style>

</style>
