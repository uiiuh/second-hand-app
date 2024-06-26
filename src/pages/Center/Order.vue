<template>
    <div>
        <div class="order">
            <h4 class="title">全部订单</h4>
            <ul class="order-list">
                <li v-for="(item,index) in orderList" :key="index" class="order-card">
                    <div class="header">
                        <span>{{ formatDateTime(item.createTime) }}</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;订单号：{{ item.id }}</span>
                        <span class="states">{{ item.status }}</span>
                    </div>
                    <div class="main">
                        <div class="card-container">
                            <img :src="item.goodsInfo.pictures[0].fileUrl" alt="">
                            <div class="info">
                                <h4 class="text-overflow">{{ item.goodsInfo.name }}</h4>
                                <span class="text-overflow">{{ item.goodsInfo.desc }}</span>
                            </div>
                            <div class="price">￥{{ item.goodsInfo.price }}</div>
                            <div class="delivery">
                                {{ item.goodsInfo.deliveryMethod }}
                                <div v-show="item.goodsInfo.deliveryMethod==='买家自取'" style="padding: 5px 0">自提地址：{{item.goodsInfo.address}}</div>
                            </div>
                        </div>
                        <div class="handle-btn">
                            <button class="pay" v-show="item.status==='未支付'" @click="goPay(item)">立即付款</button>
                            <button class="confirm" v-show="item.status==='已支付'" @click="confirmReceipt(item.id)">确认收货</button>
                            <button class="cancel" v-show="item.status!='已完成' && item.status!='已评论' && item.status!='已取消'" @click="cancelOrder(item.id)">取消订单</button>
                            <button class="delete" v-show="item.status=='已取消'" @click="deleteOrder(item.id)">删除订单</button>
                            <button class="confirm" v-show="item.status=='已完成'" @click="comment(item.id)">去评论</button>
                            <button class="confirm" v-show="item.status=='已评论'" @click="checkComment(item.id)">查看评论</button>
                        </div>
                    </div>
                </li>
            </ul>
            <el-empty v-show="orderList.length==0" description="您尚未生成订单~"></el-empty>
            <!-- 发布评论 -->
            <el-dialog
                title="发表评论"
                :visible="commentDialog"
                width="50%"
                class="comment-dialog"
                @close="cancelAddComment"
            >
                <el-form ref="addForm" :model="form" :rules="rules" label-position="right" label-width="auto" size="small">
                    <el-form-item label="评论内容" prop="comment">
                        <el-input type="textarea" v-model="form.comment" autosize></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelAddComment">取 消 发 表</el-button>
                    <el-button type="primary" @click="addComment">确 定 发 表</el-button>
                </div>
            </el-dialog>
            <!-- 查看评论 -->
            <el-dialog
                title="评论内容"
                :visible="checkDialog"
                width="45%"
                @close="checkDialog=false;commentContent=''"
                class="check-dialog"
            >
                <p>{{ commentContent }}</p>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'Order',
        data() {
            return {
                orderList: [],
                commentDialog: false,
                // 评论
                form: {
                    orderId: null,
                    comment: '',
                },
                rules: {
                    comment: {
                        required: true,
                        message: '请输入评论内容',
                        trigger: 'blur'
                    }
                },
                checkDialog: false,   //查看评论
                commentContent: '',    // 查看已评论的内容
            }
        },
        mounted() {
            this.getOrders()
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            }),
        },
        methods: {
            async getOrders() {
                const result = await this.$API.reqUserOrders(this.userInfo.userId)
                if(result.code == 200) {
                    let data = result.data
                    data = data.map(item => {
                        item.goodsInfo = JSON.parse(item.goodsInfo)
                        return item
                    })
                    this.orderList = data
                }
            },

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

            // 去付款
            goPay(orderInfo) {
                console.log(orderInfo);
                this.$store.dispatch('savePayOrderList',[orderInfo])
                this.$router.push('/pay')
            },

            // 取消订单
            async cancelOrder(orderId) {
                const result = await this.$API.reqCancelOrder(orderId)
                if(result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '取消成功'
                    })
                    this.getOrders()
                }
            },

            //  删除订单、
            async deleteOrder(orderId) {
                console.log(orderId);
                const result = await this.$API.reqDeleteOrder(orderId)
                if(result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getOrders()
                }
            },

            // 确认收货
            async confirmReceipt(orderId) {
                console.log('orderId确认收货',orderId);
                const result = await this.$API.reqConfirmOrderReceived(orderId)
                if(result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '已确认收货'
                    })
                    this.getOrders()
                }
            },

            // 评论
            comment(orderId) {
                console.log(orderId);
                this.form.orderId = orderId
                this.commentDialog = true
            },

            // 取消发表评论
            cancelAddComment() {
                this.commentDialog = false
                this.form.orderId = null
                this.form.comment = ''
            },

            // 确定发表评论
            async addComment() {
                let passCheck = false
                // 校验整个表单
                this.$refs.addForm.validate((pass) => {
                    console.log(pass)
                    passCheck = pass
                })
                if(passCheck) {
                    console.log(this.form);
                    const result = await this.$API.reqUpdateProductComment(this.form)
                    if(result.code == 200) {
                        this.commentDialog = false
                        this.$message.success('发表成功')
                        this.getOrders()
                    }else {
                        this.$message.error('发表失败')
                    }
                }
            },

            // 查看评论
            async checkComment(orderId) {
                console.log(orderId);
                const result = await this.$API.reqViewProductComment(orderId)
                if(result.code == 200) {
                    this.commentContent = result.data
                    this.checkDialog = true
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .order {
        margin: 0 auto;
        margin-bottom: 50px;
        width: 90%;
        min-height: 400px;
        padding: 15px;
        background-color: #fff;

        .title {
            margin-bottom: 15px;
        }

        .order-card {
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