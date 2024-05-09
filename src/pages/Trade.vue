<template>
    <div>
        <Header></Header>
        <div class="trade">
            <div class="header">确&nbsp;&nbsp;&nbsp;&nbsp;认&nbsp;&nbsp;&nbsp;&nbsp;订&nbsp;&nbsp;&nbsp;&nbsp;单</div>
            <div class="address-card">
                <div>如果配送方式是卖家配送，则点击跳转到收货地址。算了，这个不严谨</div>
            </div>
            <div class="goods">
                <div class="title">商品清单</div>
                <ul>
                    <li class="goods-card" v-for="(item,index) in buyGoodsList" :key="index">
                        <img :src="item.pictures[0].fileUrl" alt="">
                        <div class="info">
                            <h4 class="text-overflow">{{ item.name }}</h4>
                            <span class="text-overflow">{{ item.desc }}</span>
                        </div>
                        <div class="price">￥{{ item.price }}</div>
                        <div class="delivery">{{ item.deliveryMethod }}</div>
                    </li>
                </ul>
            </div>
            <div class="account">
                <div class="total">
                    <span>共{{ buyGoodsList.length }}件商品，合计：</span>
                    <span class="price">￥{{ totalPrice }}</span>
                </div>
                <el-button type="success" icon="el-icon-check" class="confirm-buy" @click="goPay">确认购买</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {  mapState } from 'vuex';
    export default {
        name: 'Trade',
        data() {
            return {
                goodsId: null,
            }
        },
        mounted() {
            // console.log('Trade component mounted'); // 添加日志打印
            // 绑定事件
            // this.$bus.$on('buyGoodsList',this.getGoodsList)
        },
        computed: {
            ...mapState({
                buyGoodsList: state => state.trade.buyGoodsList,
                userInfo: state => state.user.userInfo
            }),
            totalPrice() {
                let price = 0
                this.buyGoodsList.forEach(item => {
                    price+=item.price
                })
                return price
            }
        },
        methods: {
            async goPay() {
                // 要先生成订单，拿到订单号后再进行跳转
                const buyGoodsList = this.buyGoodsList
                let orderSuccessArr = []
                for(let i = 0; i < buyGoodsList.length; i++) {
                    const orderInfo = {
                        purchaserId: this.userInfo.userId,
                        address: '123',
                        goodsInfo: buyGoodsList[i],
                        totalPrice: buyGoodsList[i].price
                    }
                    let result = await this.$API.reqCreateOrder(orderInfo)
                    if(result.code == 200) {
                        const orderInfo = result.data
                        orderSuccessArr.push(orderInfo)
                    }else {
                        this.$message({
                            type: 'error',
                            message: '生成失败',
                            duration: 1000
                        })
                    }
                }
                if(orderSuccessArr.length === buyGoodsList.length) {
                    this.$store.dispatch('savePayOrderList',orderSuccessArr)
                    this.$router.push('/pay')
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .trade {
        margin: 30px auto;
        width: 60%;
        background-color: #fff;

        .header {
            height: 50px;
            background-color: #E7E8FB;
            color: #9EA3F3;
            text-align: center;
            line-height: 50px;
        }

        .address-card {
            margin-bottom: 15px;
        }

        .goods {
            padding: 0 20px;
            .title {
                font-weight: 700;
                margin-bottom: 10px;
            }
            .goods-card {
                display: flex;
                align-items: center;
                padding: 5px 20px;
                border: 1px solid #DCDFE6;
                border-top: none;
                background-color: #fff;
                transition: all .3s;

                &:first-child {
                    border-top: 1px solid #DCDFE6;
                }

                &:hover {
                    background-color: #f5f7fa;
                }

                img {
                    width: 100px;
                    height: auto
                }

                .info {
                    margin: 0 15px;
                    width: 50%;

                    h4 {
                        margin-bottom: 5px;
                    }
                }

                .price,
                .delivery {
                    flex: 1;
                    text-align: center;
                }
            }
        }

        .account {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 20px;

            .total {
                .price {
                    margin-right: 20px;
                    color: #F56C6C;
                    font-size: 20px;
                    font-weight: 700;
                }
            }
        }

        .confirm-buy {
            font-size: 16px;
        }
    }
</style>