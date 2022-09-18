// 引入axios
import axios from "axios"

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
        vue.prototype.$http = result
    }
}