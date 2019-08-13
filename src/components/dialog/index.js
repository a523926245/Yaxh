import vueDialogComponent from "./dialog";
import Vue from "vue";

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

function createInstance(){
    if(instance){
        instance.$destroy()
    }
    instance = new dialogConstructor({
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

function Dialog(options){
    return new Promise((reslove,reject) =>{
        createInstance()
        Object.assign(instance,transformOptions(options),{
            reslove,
            reject
        })
        document.body.appendChild(instance.$el)
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

