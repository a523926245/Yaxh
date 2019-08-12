<template>
    <div class="cell" @click="click">
        <div v-if=title class="cell__title">
            <slot name="icon">
                <i v-if="icon">{{icon}}</i>
            </slot>
            <slot name="title" v-if="title">
                <span v-if="title">{{title}}</span>
                <span v-if="label" class="cell__label">{{label}}</span>
            </slot>
        </div>
        <!-- value || $slots.default 组件是否传递value参数或者是否有slot -->
        <div v-if="value || $slots.default" class="cell__value" :class="[title ? '' : 'cell__value--alone',align ? 'cell__value_'+ align :'']">
            <slot>
                <span v-if="value">{{value}}</span>
            </slot>
        </div>
        <i v-if="isLink">></i>
    </div>
</template>

<script>
/**
 * cell
 * @module components/cell
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 */

export default {
    name:"yCell",
    props:{
        // cell标题
        title:String,
        // cell标题描述/描述
        label:String,
        // cell内容
        value:String,
        // cell内容文本对齐方式
        align:String,
        // cell icon图标
        icon:String,
        // 是否开启cell箭头
        isLink:Boolean,
    },
    data(){
        return{
            
        }
    },
    methods:{
        click(e){
            this.$emit("click",e)
        }
    }
}
</script>

<style lang="less">
.cell{
    width: 100%;
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #323233;
    font-size: 14px;
    overflow: hidden;
    .cell__value,.cell__title{
        flex:1
    }
    .cell__title{
        overflow: hidden;
        text-align: left
    }
}
.cell:not(:last-child)::after{
        content:' ';
        position:absolute;
        pointer-events:none;
        box-sizing:border-box;
        left:15px;
        right:15px;
        bottom:0;
        transform:scaleY(.5);
        border-bottom:1px solid #ebedf0
    }
.cell__label{
    display: block;
    margin-top:5px;
    color:#969799;
    overflow: hidden;
}    
.cell__value{
    color: #969799;
    overflow: hidden;
    text-align: right;
    position: relative;
    vertical-align: middle;
    &.cell__value_left{
        text-align: left;
        padding-left:10px;
    }
    &.cell__value_right{
        text-align: right
    }
    &.cell__value_center{
        text-align: center
    }
}
.cell__value--alone{
    color: #323233;
    text-align: left;
}
</style>
