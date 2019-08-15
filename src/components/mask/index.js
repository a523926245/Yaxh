import mask from "./mask";
import Vue from "vue";

const maskConstructor = Vue.extend(mask)

let instance;
const defaultOptions = {
    actionNode:null,
    mask:true,
    callback:state => {
        return state
    }
}

function isInDocument(element) {
    return document.body.contains(element);
}

function createInstance(){
    if(instance){
        instance.$destroy()
    }
    instance = new maskConstructor({
        el:document.createElement('div')
    })
    // instance.$on('input', mask => {
    //     console.log(mask)
    //     instance.mask = mask;
    // });
}

function transformOptions(options){
    options = {
        ...defaultOptions,
        ...options
    }
    return options
}

function Mask(options){
    if(!instance || !isInDocument(instance.$el)){
        createInstance()
    }
    Object.assign(instance, transformOptions(options));
    console.log(instance)
    if(options.actionNode){
        // 更新mask插入到调用它的父组件中-----------待完善
        options.actionNode.$el.parentNode.appendChild(instance.$el)
    }
}
// state唤起当前mask的组件
Mask.show = (state,options) =>{
    Mask({
        mask:true,
        actionNode:state,
        maskClose:options.maskClose ? options.maskClose : false
    })
}
Mask.hide = state =>{
    Mask({
        mask:false,
        actionNode:state,
        maskClose:options.maskClose ? options.maskClose : true
    })
}
export default Mask;