<template>
    <div class="published">
        <h4 class="title">全部商品</h4>
        <ul class="published-list">
            <li v-for="(item,index) in publishedList" :key="index" class="published-card">
                <div class="header">
                    <span>{{ formatDateTime(item.approvalTime) }}</span>
                    <span class="states">{{ item.status }}</span>
                </div>
                <div class="main">
                    <div class="card-container">
                        <img :src="item.pictures[0].fileUrl" alt="">
                        <div class="info">
                            <h4 class="text-overflow">{{ item.name }}</h4>
                            <span class="text-overflow">{{ item.desc }}</span>
                        </div>
                        <div class="price">￥{{ item.price }}</div>
                        <div class="delivery">{{ item.deliveryMethod }}</div>
                    </div>
                    <div class="handle-btn">
                        <!-- <button class="pay" v-show="item.status==='未支付'" @click="goPay(item)">立即付款</button>
                        <button class="confirm" v-show="item.status==='已支付'">确认收货</button>
                        <button class="cancel" v-show="item.status!='已确认收货' && item.status!='已取消'" @click="cancelOrder(item.id)">取消订单</button>
                        <button class="delete" v-show="item.status=='已取消'" @click="deleteOrder(item.id)">删除订单</button> -->
                    </div>
                </div>
            </li>
        </ul>
        <el-empty v-show="publishedList.length==0" description="您尚未出售商品~"></el-empty>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'Published',
        data() {
            return {
                publishedList: []
            }
        },
        mounted() {
            this.getUserPublishedGoods()
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            })
        },
        methods: {
            // 格式化时间
            formatDateTime(dateTimeString) {
                const date = new Date(dateTimeString);

                // 使用Date对象的方法获取年、月、日、小时、分钟和秒
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并且确保两位数格式
                const day = date.getDate().toString().padStart(2, '0'); // 确保两位数格式
                const hours = date.getHours().toString().padStart(2, '0'); // 确保两位数格式
                const minutes = date.getMinutes().toString().padStart(2, '0'); // 确保两位数格式
                const seconds = date.getSeconds().toString().padStart(2, '0'); // 确保两位数格式

                // 构建所需的日期时间格式字符串
                const formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

                // 返回格式化后的日期时间字符串
                return formattedDateTime;
            },
            // 获取用户发布的商品
            async getUserPublishedGoods() {
                const result = await this.$API.reqUserPublishedGoods(this.userInfo.userId)
                if(result.code == 200) {
                    let data = result.data
                    data = data.map(item => {
                        item.pictures = JSON.parse(item.pictures)
                        return item
                    })
                    this.publishedList = data
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .published {
        margin: 0 auto;
        margin-bottom: 50px;
        width: 90%;
        min-height: 420px;
        padding: 15px;
        background-color: #fff;

        .title {
            margin-bottom: 15px;
        }

        .published-card {
            display: flex;
            flex-direction: column;
            margin: 15px 0;
            height: 150px;
            border: 1px solid #DCDFE6;
            background-color: #fff;
            transition: all .3s;
            overflow: hidden;

            .header {
                display: flex;
                height: 35px;
                line-height: 35px;
                padding-left: 15px;
                background-color: #f5f7fa;

                .states {
                    flex: 1;
                    font-weight: 700;
                    text-align: right;
                    padding-right: 35px;
                    
                }
            }

            .main {
                display: flex;
                height: 115px;
                padding-left: 15px;

                .card-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    img {
                        width: 100px;
                        object-fit: contain;
                    }
                    .info {
                        margin: 0 15px;
                        width: 45%;

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

                .handle-btn {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 120px;
                    text-align: center;

                    button {
                        margin: 8px 0;
                        border: none;
                        outline: none;
                        background-color: transparent;
                        cursor: pointer;
                    }

                    .pay,
                    .confirm {
                        color: #409EFF;
                    }

                    .cancel {
                        color: #E6A23C;
                    }
                }
            }
        }
    }
</style>