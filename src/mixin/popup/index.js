import Mask from "@/components/mask";
export const PopupMixin = {
    methods:{
        close(maskclose){
            this.$emit('input', false);
            Mask.hide(this,{maskClose:!maskclose ? maskclose : true})
        },
        open(maskclose){
            this.$emit('input', true);
            Mask.show(this,{maskClose:!maskclose ? maskclose : true})
        }
    },
    destoryed(){
        this.$destory();
    }
}