// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Center from '@/pages/Center/Center'
import Message from '@/pages/Message'
import Detail from '@/pages/Detail'
import SellGoods from '@/pages/SellGoods'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'

export default [
    {
        path: '/logo',
        name: 'logo',
        component: Home
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/search/:keyword?/:categoryId?',
        name: 'search',
        component: Search
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/message/:id?',
        name: 'message',
        component: Message,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/center',
        name: 'center',
        component: Center,
        meta: {
            requiresAuth: true,
        },
        // 二级路由
        children: [
            {
                name: 'personal',
                path: 'personal',   // 二级路由可以不用写 ' / '
                component: () => import('@/pages/Center/Personal'),
            },
            {
                name: 'myorder',
                path: 'myorder',
                component: () => import('@/pages/Center/Order'),
            },
            {
                name: 'myfavorite',
                path: 'myfavorite',
                component: () => import('@/pages/Center/Favorite'),
            },
            {
                name: 'mycart',
                path: 'mycart',
                component: () => import('@/pages/Center/Cart'),
            },
            {
                name: 'mypublished',
                path: 'mypublished',
                component: () => import('@/pages/Center/Published'),
            },
            {
                name: 'changepassword',
                path: 'changepassword',
                component: () => import('@/pages/Center/ChangePassword'),
            },
            {
                // 路由重定向
                path: '/center',
                redirect: '/center/personal'  // 注意这里路径要写全
            }
        ],
    },
    {
        path: '/sellgoods',
        name: 'sellgoods',
        component: SellGoods,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/trade',
        name: 'trade',
        component: Trade,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/pay',
        name: 'pay',
        component: Pay,
        meta: {
            requiresAuth: true,
        }
    },
    // 设置路由重定向
    {
        path: '/',
        redirect: '/home'
    },
]
