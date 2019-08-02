<template>
    <div class="swiper_cell">
        <div class="swiper_cell_wrapper">
            <cell title="标题2"></cell>
            <div class="swiper_cell_right">
                <slot>121212</slot>
            </div>
        </div>
        
    </div>
</template>

<script>
import cell from "@/components/cell/cell";
name:"swiperCell"
export default {
    components:{
        cell
    },
    props:{

    },
    data(){
        return{

        }
    }
}
</script>

<style lang="less">
.swiper_cell{
    overflow: hidden;
    position: relative;
}
.swiper_cell_wrapper{
    transform: translateX(0)
}
.swiper_cell_right{
    display: flex;
    align-items: center;
    font-size: 14px;
    background-color: #f44;
    color: #fff;
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    right: 0;
    transform: translateX(100%);
}
.swiper_cell_right,.swiper_cell_left{
    top: 0;
    height: 100%;
    position: absolute;
}
</style>
