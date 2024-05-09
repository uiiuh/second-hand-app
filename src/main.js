import Vue from 'vue'
// 全局引入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import * as API from '@/api'

// 使用饿了么ui
Vue.use(ElementUI)

// 引入 vue-router
import VueRouter from 'vue-router'
// 引入 router
import router from '@/router'
// 使用 VueRouter 插件
Vue.use(VueRouter)

// 引入仓库
import store from '@/store'

// 将Header注册为全局组件
import Header from './components/Header.vue';
Vue.component('Header', Header)

// 关闭生产提示
Vue.config.productionTip = false

// 设置 baseURL：用于访问服务器端资源
Vue.prototype.$baseURL = 'http://127.0.0.1:3007';

new Vue({
  render: h => h(App),
  // 配置路由，全局都会有 $router 和 $route 属性（不论是路由组件还是非路由组件）
  router,
  // 注册仓库：组件实例的身上会多一个$store属性
  store,
  // 安装全局事件总线
  beforeCreate() {
      Vue.prototype.$bus = this,
      // 将API挂载到Vue原型上，这样就可以通过this.$API访问到接口了
      Vue.prototype.$API = API
  },
}).$mount('#app')
