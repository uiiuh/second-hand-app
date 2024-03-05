// 引入 vue-router
import VueRouter from "vue-router";

// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Center from '@/pages/Center'
import Message from '@/pages/Message'

export default new VueRouter({
    // 配置路由规则
    routes: [
        // 设置路由重定向
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/logo',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/message',
            component: Message
        },
        {
            path: '/center',
            component: Center
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        
    ]
})