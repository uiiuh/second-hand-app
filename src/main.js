import Vue from 'vue'
import App from './App.vue'

// 引入 vue-router
import VueRouter from 'vue-router'
// 引入 router
import router from '@/router'
// 使用 VueRouter 插件
Vue.use(VueRouter)

// 按需引入 饿了么ui 组件
import { Menu,MenuItem,Carousel,CarouselItem,Input,Button,Form,FormItem,} from 'element-ui'
// 全局注册饿了么组件
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)

// 关闭生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 配置 router配置项
  router: router
}).$mount('#app')
