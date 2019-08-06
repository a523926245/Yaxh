<template>
    <div class="swiper_cell" >
        <div ref="swiper_cell" class="swiper_cell_wrapper" @touchstart="moveStart" @touchend="moveEnd">
            <cell title="标题2"></cell>
            <div ref="right" class="swiper_cell_right">
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
        disabled:{
            type:Boolean,
            default:false
        },
        offset:{
            type:[String,Number],
            default:50
        }
    },
    data(){
        return{
            // 鼠标拖动距离
            drapX:0,
            // 开始touch鼠标坐标
            offsetSatrtX:0,
            // 结束touch鼠标坐标
            offsetEndX:0,
            // 是否动画中
            dragging:false
        }
    },
    methods:{
        moveStart(e){
            if(this.disabled){
                return ;
            }
            this.offsetSatrtX = e.changedTouches[0].clientX;
        },
        moveEnd(e){
            if(this.disabled){
                return ;
            }
            this.offsetEndX = e.changedTouches[0].clientX;
            if(this.offsetSatrtX > this.offsetEndX){
                console.log("左滑")
            }else if(this.offsetSatrtX < this.offsetEndX){

                console.log("右滑")
                this.$refs.swiper_cell.style['transform']=`translate3D(0,0,0)`;
            }
            this.drapX = this.offsetSatrtX - this.offsetEndX;
            if(this.drapX >= this.offset){
                let rightWidth = this.$refs.right.clientWidth
                this.$refs.swiper_cell.style['transform']=`translate3D(${-rightWidth}px,0,0)`;
                console.log("swiper_cell触发")
                console.log(this.$refs)
            }
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
    transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1) 0s;
    transform: translate3D(0,0,0)
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
    transform: translate3D(100%,0,0);
    
}
.swiper_cell_right,.swiper_cell_left{
    top: 0;
    height: 100%;
    position: absolute;
}
</style>
