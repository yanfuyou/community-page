// 引入axios
import axios from "axios"
import store from '@/store'
import router from '@/router'
// 以插件的形式导入axios
export default {
    install: function (vue) {
        // 创建一个axios
        let result = axios.create({
            baseURL: 'http://192.168.2.228:8081/community'
        })
        result.interceptors.request.use(
            config => {
                let token = window.localStorage.getItem("Bearer");
                if (token != null) {
                    config.headers['Authorization'] = token;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        )
        result.interceptors.response.use(
            (res) => {
                const status = Number(res.data.code) || 200;
                if (status === 401) {
                    setTimeout(() => {
                        let user = {
                            id: '',
                            userName: '',
                            userAlias: '',
                            loginFlag: false
                        }
                        store.commit('user/setUser',user);
                        router.push('/user/login');
                    }, '1000');
                }
                if(status === 500){
                    this.$notify.error({
                        message: res.data.msg,
                        offset: 70
                    })
                }
                console.log(res);
                return res;
            },
            (error) => {
                console.log(error);
                return Promise.reject(new Error(error));
            }
        );
        vue.prototype.$http = result
    }
}