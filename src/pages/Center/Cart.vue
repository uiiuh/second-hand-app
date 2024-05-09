<template>
    <div>
        <div class="cart">
            <h4 class="title">全部商品</h4>
            <ul>
                <li class="goods-card" v-for="(item,index) in productList" :key="index">
                    <input type="checkbox" class="check-box" v-model="checked" :value="item.id">
                    <div class="card-container">
                        <img :src="item.pictures[0].fileUrl" alt="">
                        <div class="info">
                            <h4 class="text-overflow">{{ item.name }}</h4>
                            <span class="text-overflow">{{ item.desc }}</span>
                        </div>
                        <div class="price">￥{{ item.price }}</div>
                        <div class="delivery">{{ item.deliveryMethod }}</div>
                    </div>
                    <i class="el-icon-delete delete" @click="deleteGoods(item.id)">删除</i>
                </li>
            </ul>
            <el-empty v-show="productList.length==0" description="您尚未添加商品至购物车~"></el-empty>
            <div v-show="productList.length!=0" class="account">
                <div class="total">
                    <span>共 {{ productList.length ? productList.length : null }} 件商品，已选 {{ totalSelect }} 件商品，合计：</span>
                    <span class="price">￥{{ totalPrice }}</span>
                </div>
                <el-button type="success" class="confirm-buy" @click="goTrade">结算</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'Cart',
        data() {
            return {
                cartInfo: {},
                checked: []
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            }),
            totalSelect() {
                return this.checked.length
            },
            totalPrice() {
                let price = 0
                this.productList.forEach(item => {
                    if(this.checked.includes(item.id)) {
                        price = price + item.price
                    }
                })
                return price
            },
            buyGoodsList() {
                let selectGoodsList = []
                this.productList.forEach(item => {
                    if(this.checked.includes(item.id)) {
                        selectGoodsList.push(item)
                    }
                })
                return selectGoodsList
            },
            productList() {
                return this.cartInfo.productList ? this.cartInfo.productList : []
            }
        },
        mounted() {
            this.getCartInfo()
        },
        methods: {
            async getCartInfo() {
                const result = await this.$API.reqCartInfo(this.userInfo.userId)
                if(result.code == 200) {
                    let data = result.data
                    if(data.productList) {
                        let productList = JSON.parse(data.productList)
                        productList = productList.map(item => {
                            item.pictures = JSON.parse(item.pictures)
                            return item
                        })
                        data.productList = productList
                    }
                    this.cartInfo = data
                }
            },
            goTrade() {
                this.$store.dispatch('saveBuyGoodsList',this.buyGoodsList)
                this.$router.push('/trade')
            },
            async deleteGoods(goodsId) {
                const params = {
                    cartId: this.cartInfo.cartId,
                    deletedProductId: goodsId
                }
                console.log(params);
                const result = await this.$API.reqDeleteCartItem(params)
                if(result.code == 200) {
                    // this.$router.push('cart')
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getCartInfo()
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .cart {
        width: 90%;
        min-height: 420px;
        margin: 0 auto;
        padding: 15px;
        background-color: #fff;

        .title {
            margin-bottom: 15px;
        }

        .goods-card {
            display: flex;
            align-items: center;
            padding: 0 15px;
            height: 120px;
            border: 1px solid #DCDFE6;
            border-top: none;
            background-color: #fff;
            transition: all .3s;
            overflow: hidden;

            &:first-child {
                border-top: 1px solid #DCDFE6;
            }

            &:hover {
                background-color: #f5f7fa;
            }

            .check-box {
                margin-right: 15px;
                width: 15px;
                height: 20px;
                cursor: pointer;
            }

            .card-container {
                flex: 1;
                display: flex;
                align-items: center;

                img {
                    // height: 100px;
                    // width: auto;
                    width: 100px;
                    // height: auto;
                    object-fit: contain;
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

            .delete {
                cursor: pointer;
                padding: 0 10px;

                &:hover {
                    color: #409EFF;
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

            .confirm-buy {
                font-size: 16px;
            }
        }
    }
</style>