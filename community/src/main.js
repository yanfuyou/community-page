import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// markdown编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// axios
import axios from './common/js/axios'
// 公共的下载函数
import down from './common/js/down'
// 弹幕
import {vueBaberrage} from 'vue-baberrage'

Vue.use(ElementUI);
Vue.use(axios);
Vue.use(mavonEditor);
Vue.use(vueBaberrage);

Vue.prototype.$down=down;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
