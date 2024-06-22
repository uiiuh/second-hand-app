<template>
    <div>
        <Header></Header>
        <div class="payment-result">
            <!-- 支付成功/失败 -->
            <div >
                <div class="title pay-success" v-show="payResult==='success'">
                    <i class="el-icon-circle-check success-icon"></i>
                    <h4>恭喜您，订单支付成功！</h4>
                </div>
                <div class="title pay-fail" v-show="payResult==='fail'">
                    <i class="el-icon-circle-close fail-icon"></i>
                    <h4>订单支付失败！请到我的订单中继续支付</h4>
                </div>
                <el-button type="info" size="medium" class="check" @click="checkOrder">查看订单</el-button>
                <el-button type="primary" size="medium" class="shopping" @click="goShopping">继续购物</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PaymentResult',
        data() {
            return {
                payResult: ''
            }
        },
        mounted() {
            this.payResult = this.$route.query.payResult
        },
        methods: {
            checkOrder() {
                this.$router.push('/center/myorder')
            },
            goShopping() {
                this.$router.push('/home')
            }
        }
    }
</script>

<style scoped lang="less">
    .payment-result {
        padding: 50px 150px;
        margin: 20px auto;
        height: 400px;
        width: 80%;
        background-color: #fff;
    }
    .title {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        .success-icon,
        .fail-icon {
            margin-right: 5px;
            font-size: 30px;
            font-weight: 700;
        }

        .success-icon {
            color: #67C23A;
        }

        .fail-icon {
            color: #F56C6C;
        }
    }
    .shopping {
        border: none;
        transition: all .3s;
        background-color: #7e62c2;

        &:hover {
            background-color: #6c54a7;
        }
    }
</style>