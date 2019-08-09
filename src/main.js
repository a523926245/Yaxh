import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import httpRequest from "./utils/httpRequest.js";
import publicMixin from "./mixin/mixin";

import Toast from "./components/toast/index.js";

Vue.prototype.$toast = Toast;

Vue.config.productionTip = false;
// 混入全局
Vue.mixin(publicMixin)

Vue.prototype.$http = httpRequest;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
