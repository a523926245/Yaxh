import Vue from 'vue'
import yIcon from "./icon/icon.vue";
import yNavbar from "./navbar/navbar.vue";
import yPicker from "./datePicker/picker.vue";
import yDatepicker from "./datePicker/datePicker.vue";
import yCheckboxGroup from "./checkboxgroup/checkboxgroup.vue";
import yCheckbox from "./checkbox/checkbox.vue";
import yPopup from "./popup/popup.vue"
import ySwiperCell from "./swiper_cell/swiper_cell.vue";
import yCell from "./cell/cell.vue";
import yCellgroup from "./cellGroup/cellGroup.vue";
import yButton from "./button/button.vue";
import yFiled from "./filed/filed.vue";
import yTabbar from "./tabbar/tabbar.vue";
import yToast from "./toast/index.js";
import yDialog from "./dialog/index.js";
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
Vue.prototype.$toast = yToast;
Vue.prototype.$dialog = yDialog;
let MyPlugin = {
	version: '1.0.0'
};

MyPlugin.install = function(Vue) {
	if (this.installed) return;
	Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name])
})
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	MyPlugin.install(window.Vue);
}

Vue.use(MyPlugin)

export default MyPlugin
// Object.keys(Components).forEach(name => {
//     Vue.component(name, Components[name])
// })
// export default Components;
// const install = (Vue) =>{
//     Object.keys(Components).forEach(Component => {
//         Vue.use(Component);
//     })
// }

// export default {
//     install,
//     ...Components
// }