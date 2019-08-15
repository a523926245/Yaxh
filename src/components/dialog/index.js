import vueDialogComponent from "./dialog";
import Vue from "vue";
import Mask from "@/components/mask";

let instance;
const defaultOptions = {
    isShow:true,
    title:'',
    content:'',
    confirmText:'确认',
    cancelText:'取消',
    showCancelButton:true,
    callback: action => {
        instance[action === 'confirm' ? 'reslove' : 'reject'](action);
    }
}
const dialogConstructor = Vue.extend(vueDialogComponent);

function isInDocument(element) {
    return document.body.contains(element);
}

function createInstance(){
    if(instance){
        instance.$destroy()
    }
    instance = new dialogConstructor({
        el:document.createElement('div')
    })
    instance.$on('input', isShow => {
        instance.isShow = isShow;
    });
}

function transformOptions(options){
    options = {
        ...defaultOptions,
        ...options
    }
    return options
}

function Dialog(options){
    return new Promise((reslove,reject) =>{
        if(!instance || !isInDocument(instance.$el)){
            createInstance()
            document.body.appendChild(instance.$el)
        }
        Object.assign(instance,transformOptions(options),{
            reslove,
            reject
        })
        Mask.show(instance,{
            maskClose:false
        })
    })
}
Dialog.alert = Dialog;
Dialog.confirm = options =>{
    Dialog({
        showCancelButton: true,
        ...options
      });
}

export default Dialog;

