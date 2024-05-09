import { reqCategoryList } from '@/api'

const actions = {
    // 获取商品分类表
    async getCategoryList({commit}) {
        console.log('action--getCategoryList')
        const result = await reqCategoryList()
        console.log(result);
        if(result.code == 200) {
            commit('CATEGORYLIST',result.data)
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
}
const mutations = {
    CATEGORYLIST(state,categoryList) {
        console.log('mutations--CATEGORYLIST')
        state.categoryList = categoryList
    },
}
const state = {
    categoryList: []
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}