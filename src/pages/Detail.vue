<template>
    <div>
        <Header></Header>
        <div class="detail">
            <div class="header">
                <div class="shop">
                    <img :src="$baseURL+sellerInfo.avatar" alt="" class="shop-avatar">
                    <span class="shop-name">{{ sellerInfo.userName }}</span>
                </div>
                <div>
                    <button class="shop-button" @click="contactSeller(sellerInfo.userId)">联系商家</button>
                    <button class="shop-button">查看主页</button>
                </div>
            </div>
            <div class="goods-info">
                <div class="goods-banner">
                    <el-carousel height="350px">
                        <el-carousel-item v-for="(item,index) in goodsInfo.pictures" :key="index">
                            <div class="pictures">
                                <img :src="item.fileUrl" alt="">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="main">
                    <div class="goods-basic">
                        <h3>{{ goodsInfo.name }}</h3>
                        <span class="rmb">¥</span>
                        <span class="price">{{ goodsInfo.price }}</span>
                        <div class="delivery">
                            <span>配送方式：</span>
                            <span>{{ goodsInfo.deliveryMethod }}</span>
                        </div>
                        <p>{{ goodsInfo.desc }}</p>
                    </div>
                    <button class="shop-button buy-button" @click="goTrade">立即购买</button>
                    <button class="shop-button buy-button" @click="addToCart">加入购物车</button>
                    <i class="el-icon-star-off star" @click="addToFavorite"></i>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import { reqGoodsInfo, reqUserById } from '@/api'
    import { mapState } from 'vuex';
    export default {
        name: 'Detail',
        data() {
            return {
                goodsInfo: {},    // 商品信息
                sellerInfo: {},    // 商家信息
            }
        },
        mounted() {
            // 拿到商品id
            const goodsId = this.$route.params.id
            console.log(goodsId);
            // 根据 id 获取商品详情
            this.getGoodsInfo(goodsId)
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            })
        },
        methods: {
            // 获取商品信息
            async getGoodsInfo(goodsId) {
                // 发请求获取数据
                const result = await reqGoodsInfo(goodsId)
                if(result.code == 200) {
                    let data = result.data
                    data.pictures = JSON.parse(data.pictures)
                    this.goodsInfo = data

                    // 获取商家信息
                    this.getUserById(data.userId)
                }
            },
            
            // 获取卖家信息
            async getUserById(userId) {
                const result = await reqUserById(userId)
                if(result.code == 200) {
                    this.sellerInfo = result.data
                }
            },

            // 联系卖家
            contactSeller(userId) {
                // 跳转到消息路由，并将卖家用户id传过去
                this.$router.push({
                    name: 'message',
                    params: { id: userId } // 将商品 ID 作为参数传递给 Detail 组件
                });
            },

            // 点击购买去到订单页
            goTrade() {
                // 将商品信息传递给订单组件
                // 注意：触发事件时，事件要存在才行，而buyGoodsList事件在trade组件挂载时才绑定好。\
                // 所以这里添加一个异步
                // setTimeout(()=>{
                //     let goodsList = []
                //     goodsList.push(this.goodsInfo)
                //     this.$bus.$emit('buyGoodsList',goodsList)
                // },0)
                // 还是采用Vuex吧
                if(this.userInfo.userId) {
                    let goodsList = []
                    goodsList.push(this.goodsInfo)
                    this.$store.dispatch('saveBuyGoodsList',goodsList)
                    this.$router.push('/trade')
                }else {
                    this.$message({
                        type: 'warning',
                        message: '请先登录'
                    })
                    this.$router.push('/login')
                }
            },

            // 添加至购物车
            async addToCart() {
                if(this.userInfo.userId) {
                    // 发请求
                    const params = {
                        productId: this.goodsInfo.id,
                        userId: this.userInfo.userId
                    }
                    console.log(params);
                    const result = await this.$API.reqAddToCart(params)
                    if(result.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '加入成功'
                        })
                    }else if(result.code == 400) {
                        this.$message({
                            type: 'error',
                            message: result.message
                        })
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先登录'
                    })
                    this.$router.push('/login')
                }
            },

            // 添加至收藏夹
            async addToFavorite() {
                if(this.userInfo.userId) {
                    // 发请求
                    const params = {
                        productId: this.goodsInfo.id,
                        userId: this.userInfo.userId
                    }
                    console.log(params);
                    const result = await this.$API.reqAddToFavorites(params)
                    if(result.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '收藏成功'
                        })
                    }else if(result.code == 400) {
                        this.$message({
                            type: 'error',
                            message: result.message
                        })
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请先登录'
                    })
                    this.$router.push('/login')
                }
            }
        },
    }
</script>

<style>
    body {
        background-color: #f4f4f4;
    }
</style>
<style scoped lang="less">
    .detail {
        width: 80%;
        margin: 15px auto;

        .shop-button {
            margin-left: 10px;
            padding: 0 20px;
            width: 100px;
            height: 35px;
            background-color: #7b5acb;
            border: none;
            border-radius: 17px;
            color: #fff;
            text-align: center;
            line-height: 35px;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                background-color: #51388f;
            }
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            height: 60px;
            background-color: #fff;
            border-radius: 15px;

            .shop {
                cursor: pointer;
                .shop-avatar {
                    width: 40px;
                    height: 40px;
                }

                .shop-name {
                    margin-left: 10px;
                    font-size: 18px;
                }
            }
        }

        .goods-info {
            display: flex;
            margin-top: 15px;
            padding: 15px;
            background-color: #fff;
            border-radius: 15px;

            .goods-banner {
                width: 300px;
                background-color: #f4f4f4;
                border-radius: 15px;

                .pictures {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    img {
                        width: 100%;
                        height: auto;
                    }
                }
            }

            .main {
                flex: 1;
                margin-left: 20px;

                .goods-basic {
                    height: 310px;

                    h3 {
                        margin-bottom: 15px;
                        font-size: 22px;
                    }

                    .price,
                    .rmb {
                        color: #F56C6C;
                    }

                    .price {
                        font-size: 25px;
                    }

                    .delivery {
                        margin: 15px 0;
                    }
                }

                .buy-button {
                    margin-left: 0;
                    margin-right: 15px;
                    width: 150px;
                    height: 46px;
                    border-radius: 23px;
                    line-height: 46px;
                    font-size: 14px;
                }

                .star {
                    font-size: 28px;
                    vertical-align: middle;
                    margin-left: 20px;
                    color: #7b5acb;
                    cursor: pointer;
                }
            }
        }
    }
</style>