<template>
    <div class="swiper_cell" >
        <div ref="swiper_cell" class="swiper_cell_wrapper" @touchstart="moveStart" @touchend="moveEnd" @click="clickEvent">
            <slot>
                <cell title="标题2"></cell>
            </slot>
            <div v-if="$slots.right" ref="right" class="swiper_cell_right">
                <slot name="right">
                    <span class="edit">修改</span>
                    <span class="delete">删除</span>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import cell from "@/components/cell/cell";
name:"ySwiperCell"
export default {
    components:{
        cell
    },
    props:{
        // 是否禁用滑动
        disabled:{
            type:Boolean,
            default:false
        },
        // 指定滑动区域宽度
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
            dragged:0,
            hasSwiperedCell:false

        }
    },
    methods:{
        clickEvent(e){
            this.$emit('click')
            this.checkIsSwipered(e)
        },
        // 监听滑动开始
        moveStart(e){
            // 禁用滑动
            if(this.disabled){
                return ;
            }
            this.offsetSatrtX = e.changedTouches[0].clientX;
        },
        // 监听滑动结束
        moveEnd(e){
            this.checkIsSwipered()
            let parentDom = e.currentTarget.parentElement;
            // 禁用滑动
            if(this.disabled){
                return ;
            }
            this.offsetEndX = e.changedTouches[0].clientX;
            // 左滑
            if(this.offsetSatrtX > this.offsetEndX){
                // touch拖动距离大于设定值，swiper_cell滑动
                this.drapX = this.offsetSatrtX - this.offsetEndX;
                if(this.drapX >= this.offset){
                    let rightWidth = this.$refs.right.clientWidth
                    this.swiperMove(e.currentTarget,rightWidth,0,0)
                }
            }
            // 右滑收起cell
            else if(this.offsetSatrtX < this.offsetEndX){
                this.swiperMove(e.currentTarget,0,0,0)
                this.drapX = 0;
            }
            parentDom.dataset.dragged = this.dragged
            
        },
        // 检查是否有其他滑动的元素
        checkIsSwipered(e){
            let swiperList = document.querySelectorAll(".swiper_cell")
            for(let i = 0; i < swiperList.length ;i++){
                if(swiperList[i].dataset.dragged == 1 ){
                    this.hasSwiperedCell = true
                    e && (e.stopPropagation())
                    let childDdom = swiperList[i].children[0]
                    this.swiperMove(childDdom,0,0,0)
                }
            }
        },
        /**
         * swiper滑动器
         * {x}[Number,String]x轴位移距离
         * {y}[Number,String]y轴位移距离
         * {z}[Number,String]z轴位移距离
         */
        swiperMove(el,x,y,z){
            if(x > 0){
                this.dragged = 1
            }
            else{
                this.dragged = 0
            }
            el.style['transform']=`translate3D(${-x}px,0,0)`;
        },
        // 监听diolog关闭事件-----响应删除
        onClose(){
            console.log("oncolose")
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
    box-sizing: border-box;
    text-align: center;
    right: 0;
    transform: translate3D(100%,0,0);
    color:#333;
    span{
        display: inline-block;
        padding:10px;
        text-align: center;
        &.edit{
            background: #ff0000;
            color:#fff
        }
        &.delete{
            background: black;
            color:#fff;
        }
    }
    
}
.swiper_cell_right,.swiper_cell_left{
    top: 0;
    height: 100%;
    position: absolute;
}
</style>
