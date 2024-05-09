//引入vuex-persist并配置
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

import Vue from 'vue'
import Vuex from 'vuex'

// 使用Vuex插件，引入的Vuex是一个对象
Vue.use(Vuex)

// actions：响应组件中的动作，可以书写自己的业务逻辑，处理异步
// mutations：用于操作state中的数据
// state：仓库存储数据
// getters:对state中的数据进行加工，可以理解为计算属性

// 引入小仓库
import user from './user'
import goods from './goods'
import trade from './trade'
import pay from './pay'

// 对外暴露Store的实例对象
export default new Vuex.Store({
    // 模块化
    modules: {
        user,
        goods,
        trade,
        pay
    },
    plugins: [vuexLocal.plugin]
})