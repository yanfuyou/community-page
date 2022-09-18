import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Body from '../components/Body'
// 首页
import Index from '../components/index/Index'
// 登录
import Login from '../components/user/Login'
// 注册
import SignUp from '../components/user/SignUp'
const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index,
        meta: { title: '首页' }
    },
    {
        path: '/user',
        component: Body,
        children: [
            {
                path: 'login',
                component: Login,
                meta: { title: '登录' }
            },
            {
                path: 'signup',
                component: SignUp,
                meta: { title: '注册' }
            }
        ]
    }
]

// 解决路由重复的报红问题-不解决也没影响，看着不舒服
// 获取原型对象的push方法
const orginalPush = VueRouter.prototype.push
// 修改其push方法
VueRouter.prototype.push = function push(location) {
    return orginalPush.call(this, location).catch(err => err);
}

const router = new VueRouter({
    routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
    // 设置页面标题
    document.title = to.meta.title;
    // 放行
    next();
})


export default router
