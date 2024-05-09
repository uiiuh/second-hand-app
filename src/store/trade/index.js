const actions = {
    // 存储要购买的物品列表
    saveBuyGoodsList({commit},buyGoodsList) {
        commit('SAVEBUYGOODSLIST',buyGoodsList)
    },
}
const mutations = {
    SAVEBUYGOODSLIST(state,buyGoodsList) {
        console.log('mutations--SAVEBUYGOODSLIST')
        state.buyGoodsList = buyGoodsList
    },
}
const state = {
    buyGoodsList: [],    // 需购买的商品列表
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}