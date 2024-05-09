<template>
    <div>
        <Header></Header>
        <div class="pay">
            <div class="header">
                <div class="success">
                    <i class="el-icon-circle-check success-icon"></i>
                    <span>订单提交成功，请您及时付款，以便尽快收到商品~~</span>
                </div>
                <div class="tips">请您在提交订单24小时之内完成支付，超时订单会自动取消。</div>
                <!-- <span>您的订单号为：<span class="order-id">{{ pay }}</span></span> -->
                <span>应付金额：<span class="price">￥{{ totalPrice }}</span></span>
            </div>
            <div class="code-box">
                <h4>请使用微信扫码支付</h4>
                <!-- 是一个图片 -->
                <img src="../../public/images/default_avatar.jpg" alt="">
                <p>扫一扫快速付款</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'Pay',
        data() {
            return {
                // orderId: null,
                // orderInfo: {}
            }
        },
        mounted() {
            // this.orderId = this.$route.query.orderId
            // this.getOrderInfo()
        },
        computed: {
            ...mapState({
                payOrderList: state => state.pay.payOrderList || []
            }),
            totalPrice() {
                let price = 0
                this.payOrderList.forEach(item => {
                    price = price + item.totalPrice
                })
                return price
            }
        },
        methods: {
            // async getOrderInfo() {
            //     const result = await this.$API.reqOrderInfo(this.orderId)
            //     if(result.code == 200) {
            //         this.orderInfo = result.data
            //     }
            // }
        }
    }
</script>

<style scoped lang="less">
    .pay {
        margin: 50px auto;
        padding: 25px;
        width: 60%;
        background-color: #fff;
        color: #303133;

        .header {
            .success {
                display: flex;
                align-items: center;
                font-weight: 700;
                .success-icon {
                    margin-right: 5px;
                    color: #67C23A;
                    font-size: 30px;
                    font-weight: 700;
                }
            }
            .tips {
                margin: 15px 0;
            }
            .order-id,
            .price {
                font-weight: 700;
                font-size: 18px;
            }
            .price {
                color: #F56C6C;
            }
        }

        .code-box {
            margin-top: 25px;
            text-align: center;
            img {
                margin: 20px 0;
                width: 115px;
                height: 115px;
            }
            p {
                color: #ccc;
                font-size: 14px;
            }
        }
    }
</style>