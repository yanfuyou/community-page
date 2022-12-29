import Vue from "vue";
import Vuex from "vuex";
// 用户相关
import user from './module/user'
// 首页相关
import homePage from './module/homePage'
// 聚焦
import focus from './module/focus'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        msg: '鄢富友测试的'
    },
    getters: {

    },
    mutations: {

    },
    modules: {
        user: user,
        homePage: homePage,
        focus: focus
    }
})

export default store
