// 当前这个模块：对API（接口）进行统一管理
// 引入二次封装的axios（带有请求、响应拦截器）
import requests from './request'

// 发请求，因为已经配置了baseURL:'/api'，因此这里不用写前面的/api
// axios发送请求，返回的结果是promise对象

// 发送验证码
export const sendVerificationCode = (email) => requests({url:'/user/sendVerificationCode', method:'post', data:{email}})

// 注册用户
export const registerUser = (userInfo) => requests({ url:'/user/register', method:'post', data: userInfo })

// 登录
export const login = (userInfo) => requests({ url:'/user/login', method:'post', data: userInfo })

// 带着token找服务器要用户信息
export const reqUserInfo = () => requests({url:'/user/getUserInfo',method:'get'})

// 根据用户 ID 获取用户信息
export const reqUserById = (userId) => requests({url:`/user/getUserById?userId=${userId}`,method:'get'})

// 获取商品分类
export const reqCategoryList = () => requests({url:'/goods/getCategoryList',method:'get'})

// 分页查询商品
export const reqSearchGoodsList = (params) => requests({url:'/goods/searchGoods',method:'get',params})

// 获取首页今日上新商品
export const reqNewGoods = () => requests({url:'/goods/getNewGoods',method:'get'})

// 获取商品详情
export const reqGoodsInfo = (id) => requests({url:`/goods/getGoodsById?id=${id}`,method:'get'})

// 发布商品
export const reqReleaseGoods = (goodsInfo) => requests({ url:'/goods/releaseGoods', method:'post', data: goodsInfo })

// 查找用户聊天关系
export const reqChatContacts = (userId) => requests({ url:'/chat/findChatContacts', method:'post', data: {userId} })

// 发送消息
export const reqSendMessage = (messageInfo) => requests({ url:'/chat/sendMessage', method:'post', data: messageInfo })

// 接收消息
export const receiveMessage = (userId) => requests({ url:'/chat/receiveMessage', method:'post', data: {userId} })

// 获取两个用户间全部消息
export const reqAllChatMessages = (userId,contactUserId) => requests({ url:'/chat/getAllChatMessages', method:'post', data: {userId,contactUserId} })

// 生成订单
export const reqCreateOrder = (orderInfo) => requests({ url:'/order/createOrder', method:'post', data: orderInfo })

// 查询订单信息
export const reqOrderInfo = (orderId) => requests({ url:`/order/getOrderById/${orderId}`, method:'get'})

// 查询购物车
export const reqCartInfo = (userId) => requests({ url:`/cart/getCartByUserId/${userId}`, method:'get'})

// 添加至购物车
export const reqAddToCart = (params) => requests({ url:'/cart/addToCart', method:'post',data: params})

// 将商品从购物车中删除
export const reqDeleteCartItem = (params) => requests({ url:'/cart/deleteCartItem', method:'post',data: params})

// 查询用户所有订单
export const reqUserOrders = (userId) => requests({ url:`/order/getUserOrders/${userId}`, method:'get'})

// 取消订单
export const reqCancelOrder = (orderId) => requests({ url:`/order/cancelOrder/${orderId}`, method:'get'})

// 删除订单
export const reqDeleteOrder = (orderId) => requests({ url:`/order/deleteOrder/${orderId}`, method:'get'})

// 添加至收藏夹
export const reqAddToFavorites = (params) => requests({ url:'/favorite/addToFavorites', method:'post',data: params})

// 查询用户收藏级
export const reqUserFavorites = (userId) => requests({ url:`/favorite/getUserFavorites/${userId}`, method:'get'})

// 将商品从收藏夹中删除
export const reqDeleteFavoriteItem = (params) => requests({ url:'/favorite/deleteFavoriteItem', method:'post',data: params})

// 更新用户头像
export const reqUpdateAvatar = (params) => requests({ url:'/user/updateAvatar', method:'post',data: params})

// 更新用户信息（简介、性别）
export const reqUpdateUserInfo = (params) => requests({ url:'/user/updateUserInfo', method:'post',data: params})

// 获取用户发布的所有商品
export const reqUserPublishedGoods = (userId) => requests({ url:`/user/getUserPublishedGoods/${userId}`, method:'get'})

// 修改密码
export const reqChangePassword = (params) => requests({ url:'/user/changePassword', method:'post',data: params})

// 预约商品
export const reqReserveGoods = (params) => requests({ url:'/goods/reserveGoods', method:'post',data: params})




