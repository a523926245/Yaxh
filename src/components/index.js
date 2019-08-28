import Vue from 'vue'
import yIcon from "@/components/icon/icon";
import yNavbar from "@/components/navbar/navbar";
import yPicker from "@/components/datePicker/picker";
import yDatepicker from "@/components/datePicker/datePicker";
import yCheckboxGroup from "@/components/checkboxgroup/checkboxgroup";
import yCheckbox from "@/components/checkbox/checkbox";
import yPopup from "@/components/popup/popup"
import ySwiperCell from "@/components/swiper_cell/swiper_cell";
import yCell from "@/components/cell/cell";
import yCellgroup from "@/components/cellGroup/cellGroup";
import yButton from "@/components/button/button";
import yFiled from "@/components/filed/filed";
import yTabbar from "@/components/tabbar/tabbar";
const Components = {
    yIcon,
    yNavbar,
    yPicker,
    yDatepicker,
    yCheckboxGroup,
    yCheckbox,
    yPopup,
    ySwiperCell,
    yCell,
    yCellgroup,
    yButton,
    yFiled,
    yTabbar
}
Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])
})

Object.keys(Components).forEach(Component => {
    Vue.use(Component);
})

export default Components