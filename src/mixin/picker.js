export const pickerMixin = {
    methods:{
        onChange(value,index,picker){
            this.$emit('change',value,index,picker)
        },
        onConfirm(){
            let isyPopup = this.$parent.$el.classList.value.indexOf('y-popup') > -1 ? true : false;
            if(this.$parent && isyPopup)this.$parent.close();
            this.$emit('confirm',this.innerValue)
        },
        onCancel(){
            let isyPopup = this.$parent.$el.classList.value.indexOf('y-popup') > -1 ? true : false;
            if(this.$parent && isyPopup)this.$parent.close();
            this.$emit('cancel',this.innerValue)
        }
    },
    destoryed(){
        this.$destory();
    }
}