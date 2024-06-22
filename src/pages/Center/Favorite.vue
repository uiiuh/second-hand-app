<template>
    <div>
        <div class="favorite">
            <div class="header">
                <h4 class="title">全部收藏</h4>
                <span @click="clearAll">清空收藏夹</span>
            </div>
            <ul class="favorite-list">
                <li v-for="(item,index) in favoriteList" :key="index" class="favorite-card">
                    <div class="card-container">
                        <img :src="item.pictures[0].fileUrl" alt="">
                        <div class="info" @click="goDetail(item.id)">
                            <h4 class="text-overflow">{{ item.name }}</h4>
                            <span class="text-overflow">{{ item.desc }}</span>
                        </div>
                        <div class="price">￥{{ item.price }}</div>
                        <div class="delivery">{{ item.deliveryMethod }}</div>
                    </div>
                    <i class="el-icon-star-off delete" @click="cancelFavorite(item.id)">取消收藏</i>
                </li>
            </ul>
            <el-empty v-show="favoriteList.length==0" description="您尚未收藏商品~"></el-empty>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'Favorite',
        data() {
            return {
                favoriteInfo: {}
            }
        },
        mounted() {
            this.getUserFavorites()
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            }),
            favoriteList() {
                return this.favoriteInfo.productList ? this.favoriteInfo.productList : []
            }
        },
        methods: {
            async getUserFavorites() {
                const result = await this.$API.reqUserFavorites(this.userInfo.userId)
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
                    this.favoriteInfo = data
                }
            },
            async cancelFavorite(goodsId) {
                const params = {
                    favoriteId: this.favoriteInfo.favoriteId,
                    deletedProductId: goodsId
                }
                console.log(params);
                const result = await this.$API.reqDeleteFavoriteItem(params)
                if(result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.getUserFavorites()
                }
            },
            // 清空收藏夹
            async clearAll() {
                this.$confirm('是否确认清空收藏夹?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$API.reqClearFavorites(this.favoriteInfo.favoriteId).then(
                        res => {
                            // console.log(res)
                            if(res.code == 200) {
                                this.$message.success('清空成功')
                                this.getUserFavorites()
                            }else {
                                this.$message.error(res.message)
                            }
                        }
                    )
                })
            },

            // 去到详情页
            goDetail(goodsId) {
                this.$router.push({
                    name: 'detail',
                    params: { id: goodsId } // 将商品 ID 作为参数传递给 Detail 组件
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .favorite {
        margin: 0 auto;
        margin-bottom: 50px;
        width: 90%;
        min-height: 400px;
        padding: 15px;
        background-color: #fff;

        .title {
            margin-bottom: 15px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            span {
                cursor: pointer;
                &:hover {
                    color: #409EFF;
                }
            }
        }

        .favorite-card {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 0 15px;
            height: 120px;
            border: 1px solid #DCDFE6;
            background-color: #fff;
            transition: all .3s;
            overflow: hidden;

            &:hover {
                background-color: #f5f7fa;
            }

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
                    width: 40%;
                    cursor: pointer;

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
    }
</style>