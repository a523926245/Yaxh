<template>
    <div class="y-image" @click="clickImage" :style="{width:width,height:height}">
        <img class="y-image__img" :src="url" @load="imageOnLoad" @error="imageOnError" alt="" :style="{objectFit:fit}">
        <!-- 加载提示 -->
        <div class="y-image__loading" v-if="showLoading && isLoading">
            <slot name="loading">
                <y-icon name="photo-o"></y-icon>
            </slot>
        </div>
        <!-- 错误提示 -->
    </div>
</template>

<script>
import yIcon from "@/components/icon/icon";
export default {
    name:"yImage",
    props:{
        // 图片资源路径
        url:String,
        // 是否开启加载中提示
        showLoading:false,
        // 图片填充模式
        fit:{
            type:String,
            default:'none'
        },
        // 图片宽度
        width:String,
        // 图片告诉
        height:String

    },
    components:{
        yIcon
    },
    data(){
        return{
            // 是否加载图片中
            isLoading:true,
        }
    },
    methods:{
        // 监听图片加载完成
        imageOnLoad(ev){
            this.isLoading = false
            this.$emit("loaded",ev)
        },
        // 图片点击事件
        clickImage(ev){
            this.$emit('click',ev)
        },
        // 监听图片加载出错
        imageOnError(ev){
            this.$emit('error',ev)
        }
    }
}
</script>

<style lang="less">
.y-image {
  position: relative;
  display: inline-block;

  &--round {
    overflow: hidden;
    border-radius: 50%;

    img {
      border-radius: inherit;
    }
  }

  &__img,
  &__error,
  &__loading {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__error,
  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: @image-placeholder-text-color;
    font-size: @image-placeholder-font-size;
    background-color: @image-placeholder-background-color;
  }
}
</style>