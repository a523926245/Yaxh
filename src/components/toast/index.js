import Vue from 'vue';
import {isObj} from "@/utils/utils";
import vueTostComponent from "./toast.vue";
const defaultOptions = {
    icon:'',
    mask:false,
    message:'',
    duration:3000,
    isShow:true
}
let queue = [];

// 实例化组件构造器
const toastConstructor  = Vue.extend(vueTostComponent)

// 实例化toast组件
function createInstance(){
    const toast = new toastConstructor({
        el:document.createElement('div')
    })
    return toast
}
// 处理toast参数
function transformOptions(options) {
    options = {
        ...defaultOptions,
        ...parseOptions(options),
    }
    return options;
}
// text模式支持只输入文字
function parseOptions(options){
    if(isObj(options)){
        return options
    }
    return {message:options}
}
// toast暴露
function Toast(options){
    let instance = createInstance()
    // 浅拷贝toast参数到组件本身等于下面的操作------
    // 赋值给instance,即给组件data赋值
    // const toast = new toastConstructor({
    //     el:document.createElement('div'),
    //     data(){
    //         return{
    //             ...options
    //         }
    //     }
    // })
    Object.assign(instance, transformOptions(options));
    document.body.appendChild(instance.$el)

    Vue.nextTick(() =>{
        setTimeout(() =>{
            instance.isShow = false;
        },instance.duration)
    });
}
export default Toast;