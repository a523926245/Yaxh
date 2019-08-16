import mask from "./mask";
import Vue from "vue";

const maskConstructor = Vue.extend(mask)

let instance;
const defaultOptions = {
    actionNode:null,
    mask:true,
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
    if(options.actionNode){
        // 更新mask插入到调用它的父组件中-----------待完善
        if(options.actionNode.$parent && options.actionNode.$parent.$el)
        {
            options.actionNode.$parent.$el.appendChild(instance.$el)
        }
        else{
            options.actionNode.$el.parentNode.appendChild(instance.$el)
        }
    }
}
// state唤起当前mask的组件
Mask.show = (state,options) =>{
    Mask({
        actionNode:state,
        maskClose:options.maskClose ? options.maskClose : false
    })
}
Mask.hide = (state,options) =>{
    Mask({
        mask:false,
        actionNode:state,
        maskClose:options.maskClose ? options.maskClose : true
    })
}
export default Mask;