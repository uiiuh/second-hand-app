import { reqUserInfo,reqUpdateAvatar,reqUpdateUserInfo } from '@/api'

const actions = {
    // 获取用户信息
    async getUserInfo({commit}) {
        console.log('action--getUserInfo')
        const result = await reqUserInfo()
        console.log(result);
        if(result.code == 200) {
            commit('GETUSERINFO',result.data)
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 更新用户头像
    async updateUserAvatar({commit,state,dispatch},avatarFileName) {
        // console.log(avatarFileName);
        let params = {
            userId: state.userInfo.userId,
            avatarFileName
        }
        const result = await reqUpdateAvatar(params)
        if(result.code == 200) {
            dispatch('getUserInfo')
        }
    },
    // 修改用户个人资料
    async modifyUserInfo({commit,state,dispatch},vm) {
        let changedUserInfo = state.userInfo
        console.log('changedUserInfo--',changedUserInfo);
        const result = await reqUpdateUserInfo(changedUserInfo)
        if(result.code == 200) {
            dispatch('getUserInfo')
            vm.$message.success('修改成功')
        }
    }
}
const mutations = {
    GETUSERINFO(state,userInfo) {
        console.log('mutations--GETUSERINFO')
        state.userInfo = userInfo
    },
}
const state = {
    // token令牌，从本地存储中取
    token: localStorage.getItem('token'),
    userInfo: {},   // 用户信息
}
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters
}