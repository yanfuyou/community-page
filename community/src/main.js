import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// axios
import axios from './axios'
Vue.use(ElementUI);
Vue.use(axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
