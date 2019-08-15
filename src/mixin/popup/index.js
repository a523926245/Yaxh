import Mask from "@/components/mask";
export const PopupMixin = {
    methods:{
        close(){
            this.$emit('input', false);
            Mask.hide(this,{maskClose:true})
        },
        open(){
            this.$emit('input', true);
            Mask.show(this,{maskClose:true})
        }
    }
}