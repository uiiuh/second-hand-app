<template>
    <div>
        <Header></Header>
        <div class="homepage">
            <div class="personal-info">
                <div class="avatar">
                    <img :src="$baseURL+userInfo.avatar" alt="">
                </div>
                <div class="basic-info">
                    <span class="name">{{ userInfo.userName }}</span>
                    <i class="el-icon-female female" v-show="userInfo.sex==='女'"></i>
                    <i class="el-icon-male male" v-show="userInfo.sex==='男'"></i>
                </div>
                <p class="intro">{{ userInfo.intro ? userInfo.intro : '这个人很懒，没有留下简介' }}</p>
            </div>
            <div class="sell">
                <h4 class="sell-text">出售的商品</h4>
                <div class="goods-list clearfix">
                    <ul class="goods-container clearfix" @click="goDetail">
                        <li v-for="(item,index) in goodsList" :key="index" :data-goodsId="item.id">
                            <div class="cover">
                                <img :src="item.pictures[0].fileUrl" alt="">
                            </div>
                            <div class="info">
                                <h4 class="title">{{ item.name }}</h4>
                                <div>
                                    <span class="rmb">¥</span>
                                    <span class="price">{{ item.price }}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <el-empty v-show="goodsList.length==0" description="该用户暂未售卖任何商品"></el-empty>
                <!-- <div v-show="goodsList.length!=0" class="pagination">
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :current-page.sync="pageNo"
                        :page-size="pageSize"
                        :total="total"
                        :page-count="totalPage"
                        @current-page="getGoodsList"
                    >
                    </el-pagination>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PersonalHomepage',
        data() {
            return {
                userId: null,
                userInfo: {},
                goodsList: []
            }
        },
        mounted() {
            this.userId = this.$route.params.id
            // 调接口获取商家信息和售卖的商品
            this.getUserInfo()
        },
        methods: {
            async getUserInfo() {
                const result = await this.$API.reqUserAndProducts(this.userId)
                if(result.code == 200) {
                    const data = result.data
                    this.userInfo = data.userInfo
                    let productsList = data.productsList
                    productsList = productsList.map(item => {
                        const pictures = JSON.parse(item.pictures)
                        item.pictures = pictures
                        return item
                    })
                    this.goodsList = productsList
                }
            },
            // 去到商品详情页
            goDetail(e) {
                console.log(e)
                // 获取被点击的DOM元素
                const target = e.target;
                // 查找最近的父元素<li>
                // closest 方法会从当前元素开始向上查找，如果找到匹配的祖先元素，则返回该元素；如果找不到匹配的祖先元素，则返回 null。
                const liElement = target.closest('li');
                // 如果存在父元素<li>，则获取商品id
                if (liElement) {
                    // 从 li 元素的 data-goodsId 属性中获取商品 ID
                    const goodsId = liElement.dataset.goodsid;
                    console.log('用户点击的商品id为：', goodsId);
                    // 如果商品 ID 存在，则跳转到 Detail 组件，并将商品 ID 作为参数传递
                    if (goodsId) {
                        this.$router.push({
                            name: 'detail',
                            params: { id: goodsId } // 将商品 ID 作为参数传递给 Detail 组件
                        });
                    }
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .homepage {
        margin: 0 auto;
        margin-bottom: 30px;
        width: 85%;
        background-color: #fff;

        .personal-info {
            padding: 20px;
            text-align: center;
            .avatar {
                margin: 0 auto;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                overflow: hidden;

                img {
                    object-fit: fill;
                }
            }

            .basic-info {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
                .female,
                .male {
                    margin-left: 8px;
                    margin-top: 2px;
                    font-weight: 700;
                }
                .female {
                    color: #F56C6C;
                }
                .male {
                    color: #409EFF;
                }
            }
            
            .intro {
                color: #909399;
                font-size: 12px;
            }
        }

        .sell {
            padding-right: 15px;
            padding-left: 30px;
        }
    }
</style>