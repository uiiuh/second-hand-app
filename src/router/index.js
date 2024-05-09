import Vue from 'vue'
// 引入路由
import VueRouter from "vue-router";
// 引入路由配置信息模块
import routes from './routes'

// 使用VueRouter
Vue.use(VueRouter)

// 引入仓库
import store from '@/store'

// console.log(VueRouter.prototype.push)
// 备份原始的push 和 replace
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

// 重写 push 和 replace
VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log(this)  // 指向 VueRouter构造函数的实例对象
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)  // 调用originPush方法，并修改originPush方法的this指向，同时给originPush传递参数
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 创建并暴露router
const router = new VueRouter({
    // 将路由配置信息设置为一个模块，更简洁
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // x控制的是水平方向滚动条的位置，y:0 垂直方向始终滚动到顶部
        return { x: 0, y: 0 }
    }
})

// 全局前置路由守卫 —— 解决身份验证问题
router.beforeEach((to, from, next) => {
    // 检查用户是否已登录
    const loggedIn = isLoggedIn();
    
    // 如果目标路由需要进行身份验证
    if (to.meta.requiresAuth) {
        // 如果用户未登录，则重定向到登录页面
        if (!loggedIn) {
            Vue.prototype.$message({
                message: '请先登录',
                type: 'warning',
                duration: 1500
            });
            next('/login');
            return;
        }
    }

    // 如果用户已登录，则放行路由
    next();
});

// 判断用户是否已登录的函数
function isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
}

export default router;