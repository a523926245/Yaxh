<template>
    <div class="y-mask" v-show="mask" @click="onClose"></div>
</template>

<script>
export default {
    name:"yMask",
    props:{
        mask:{
            type:Boolean,
            default:true
        },
        maskClose:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{

        }
    },
    methods:{
        clickEvent(e){
            this.$emit('click-mask')
            this.onClose(e)
        },
        onClose(e){
            // 是否点击蒙层关闭弹窗和蒙层
            if(this.maskClose){
                this.actionNode.isShow = false
                this.mask = false
            }
            else{
                e.preventDefault()
            }
        }
    }
}
</script>

<style lang="less">
.y-mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
}
</style>
