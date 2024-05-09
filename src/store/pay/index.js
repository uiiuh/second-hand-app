const actions = {
    // 需要付款的订单列表
    savePayOrderList({commit},payOrderList) {
        commit('SAVEPAYORDERLIST',payOrderList)
    },
}
const mutations = {
    SAVEPAYORDERLIST(state,payOrderList) {
        console.log('mutations--SAVEPAYORDERLIST')
        state.payOrderList = payOrderList
    },
}
const state = {
    payOrderList: [],    // 需付款的商品列表
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}