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

// 格式化时间函数
function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  // 使用Date对象的方法获取年、月、日、小时、分钟和秒
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并且确保两位数格式
  const day = date.getDate().toString().padStart(2, '0'); // 确保两位数格式
  const hours = date.getHours().toString().padStart(2, '0'); // 确保两位数格式
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 确保两位数格式
  const seconds = date.getSeconds().toString().padStart(2, '0'); // 确保两位数格式

  // 构建所需的日期时间格式字符串
  const formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  // 返回格式化后的日期时间字符串
  return formattedDateTime;
}
// 挂载到Vue原型上
Vue.prototype.$formatDateTime = formatDateTime

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
