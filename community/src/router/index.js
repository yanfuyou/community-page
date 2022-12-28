import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import Body from '../components/Body'
// 用户
import Index from '../components/index/Index'
import Login from '../components/user/Login'
import SignUp from '../components/user/SignUp'
import UserHome from '../components/user/UserHome'
import Setting from '../components/user/Setting'
// 文章
import Write from '../components/article/Write'
import Preview from '../components/article/Preview'
// 弹幕
import TreeHole from '@/components/hole/TreeHole'
import EnList from '@/components/team/EnList'
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
            }, {
                path: 'userhome',
                component: UserHome,
                meta: { title: '用户主页' }
            },
            {
                path: 'setting',
                component: Setting,
                meta: { title: '设置' }
            }
        ]
    },
    {
        path: '/article',
        component: Body,
        children: [
            {
                path: 'write',
                component: Write,
                meta: { title: '写文章' }
            },
            {
                path: 'preview',
                name: 'preview',
                component: Preview,
                meta: { title: '文章详情' }
            }

        ]
    },
    {
        path: '/hole',
        component: Body,
        children: [
            {
                path: 'tree',
                component: TreeHole,
                meta: { title: '嗨！树洞' }
            }
        ]
    },
    {
        path: '/team',
        component: Body,
        children: [
            {
                path: 'enlist',
                component: EnList,
                meta: { title: '发布保招募信息' }
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
