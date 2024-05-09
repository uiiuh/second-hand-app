<template>
    <div class="home-page">
        <Header></Header>
        <div class="home">
            <!-- 搜索框 -->
            <SearchBox></SearchBox>
            <div class="main">
                <!-- 分类 -->
                <ul class="classify-menu">
                    <li 
                        v-for="(item,index) in categoryList"
                        :key="index"
                        @mouseenter="showSubClassifyMenu(index)"
                        @mouseleave="currentMenuIndex = -1"
                    >
                        <!-- 父分类 -->
                        <span class="item">{{ item.categoryName }}</span>
                        <!-- 子分类 -->
                        <!-- 
                            要想动态的绑定style样式，需要把style写成一个对象或数组对象
                            :style="{fontSize: xxx}" 其中xxx是动态值
                        -->
                        <div class="sub-classify-menu" :style="{display: index === currentMenuIndex ? 'block' : 'none'}">
                        <!-- <div class="sub-classify-menu" :style="{display: 'block'}"> -->
                            <div class="sub-item" v-for="(subItem, subIndex) in item.categoryChild" :key="subIndex">
                                <router-link :to="{name: 'search',params:{categoryId:subItem.categoryId}}">{{ subItem.categoryName }}</router-link>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- 轮播图 -->
                <div class="banner">
                    <el-carousel height="350px" trigger="click">
                        <el-carousel-item></el-carousel-item>
                        <el-carousel-item></el-carousel-item>
                        <el-carousel-item></el-carousel-item>
                        <el-carousel-item></el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 用户信息 -->
                <div class="user">
                    <div class="user-avatar">
                        <a href="javascript:;">
                            <img v-show="!userInfo.avatar" src="../../public/images/default_avatar.jpg" alt="">
                            <img v-show="userInfo.avatar" :src="$baseURL+userInfo.avatar" alt="">
                        </a>
                    </div>
                    <h4 class="greeting">
                        <span>{{ userInfo.userName}}</span> {{ greeting }}</h4>
                    <div v-show="!isLogin" class="log-out">
                        <el-button type="primary" class="login" @click="$router.push('login')">登&nbsp;录</el-button>
                        <el-button type="primary" class="register" @click="$router.push('register')">注&nbsp;册</el-button>
                    </div>
                    <div v-show="isLogin" class="logged">
                        <router-link to="/center/myfavorite">
                            <i class="el-icon-star-off"></i>
                            <span>收藏夹</span>
                        </router-link>
                        <!-- <router-link to="/center/mycart">
                            <i class="el-icon-star-off"></i>
                            <span>购物车 </span>
                        </router-link> -->
                        <router-link to="/center/myorder">
                            <i class="el-icon-notebook-2"></i>
                            <span>我的订单</span>
                        </router-link>
                        <router-link to="/sellgoods">
                            <i class="el-icon-circle-plus-outline"></i>
                            <span>发布闲置</span>
                        </router-link>
                    </div>
                    <!-- 公告牌 -->
                    <div class="bulletin-board">
                        <h4 class="title">公告牌</h4>
                        <ul class="notice">
                            <li>
                                <a href="javascript:;">[公告]备战开学季，全物品8折，快来抢购吧</a>
                            </li>
                            <li>
                                <a href="javascript:;">[公告]开学季，全物品8折</a>
                            </li>
                            <li>
                                <a href="javascript:;">[公告]开学季，全物品8折</a>
                            </li>
                            <li>
                                <a href="javascript:;">[公告]开学季，全物品8折</a>
                            </li>
                            <li>
                                <a href="javascript:;">[公告]开学季，全物品8折</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 今日上新 -->
            <div class="new">
                <h3>今日上新</h3>
                <ul v-show="newGoodsList.length!=0" class="goods-container clearfix" @click="goDetail">
                    <li v-for="(item,index) in newGoodsList" :key="index" :data-goodsId="item.id">
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
                <el-empty v-show="newGoodsList.length==0" description="暂无数据"></el-empty>
            </div>
            <!-- 今日推荐 -->
            <div class="like">
                <h3>今日推荐</h3>
                <ul class="goods-container clearfix">
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                    <li>
                        <a href="javascript:;"></a>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import SearchBox from '@/components/SearchBox.vue'
    import Footer from '@/components/Footer'
    import { mapState } from 'vuex'
    import { reqNewGoods } from '@/api'
    export default {
        name: 'Home',
        components: {
            SearchBox,
            Footer
        },
        mounted() {
            const token = localStorage.getItem('token')
            if(token) this.isLogin = true

            // 设置问候语
            this.setGreeting()

            // 获取今日上新商品
            this.getNewGoods()
        },
        data() {
            return {
                isLogin: false,
                greeting: '',
                keyword: '',
                currentMenuIndex: -1,   // 当前一级分类索引值
                newGoodsList: [],    // 今日上新商品列表
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo,
                categoryList: state => state.goods.categoryList,
            }),
        },
        methods: {
            // 设置问候语
            setGreeting() {
                const hour = new Date().getHours()
                // console.log('hour',hour)
                if (hour >= 0 && hour < 12) {
                    this.greeting = '上午好'
                } else if (hour >= 12 && hour < 18) {
                    this.greeting = '下午好'
                } else {
                    this.greeting = '晚上好'
                }
            },

            // 获取今日上新商品
            async getNewGoods() {
                const result = await reqNewGoods()
                if(result.code == 200) {
                    let data = result.data
                    console.log('newgoods',data)
                    data = data.map(item => {
                        item.pictures = JSON.parse(item.pictures)
                        return item
                    })
                    console.log('newgoods',data)
                    this.newGoodsList = data
                }
            },

            // 控制显示哪个二级分类
            showSubClassifyMenu(index) {
                // console.log(index)
                this.currentMenuIndex = index
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
    .home {
        margin: 0 auto;
        // width: 80%;
        width: 1040px;
        // background-color: #fff;

        .main {
            display: flex;
            padding: 0 15px;

            .classify-menu {
                // flex: 1;
                position: relative;
                margin-right: 15px;
                width: 250px;
                height: 350px;
                // background-color: #F7F9FA;
                background-color: #fff;
                border-radius: 15px;

                li {
                    height: 50px;
                    border-bottom: 1px solid #E4E7ED;
                    transition: all .3s;

                    &:hover {
                        background-color: #E7E8FB;
                    }

                    &:first-child {
                        border-top-left-radius: 15px;
                        border-top-right-radius: 15px;
                    }

                    &:last-child {
                        border-bottom-left-radius: 15px;
                        border-bottom-right-radius: 15px;
                        border: none;
                    }

                    .item {
                        display: block;
                        color: #303133;
                        padding: 15px;
                        padding-left: 25px;
                        cursor: default;
                    }

                    .sub-classify-menu {
                        display: none;
                        position: absolute;
                        left: 235px;
                        top: 0;

                        width: 540px;
                        height: 350px;
                        // background-color: #F7F9FA;
                        background-color: #E7E8FB;

                        border-radius: 10px;
                        z-index: 3;
                        transition: all .3s;

                        .sub-item {
                            padding: 15px 30px;
                            font-size: 14px;

                            a:hover {
                                color: #5f479a;
                            }
                        }
                    }
                }
            }

            .banner {
                // flex: 2;
                width: 500px;
                height: 350px;

                .el-carousel__item {
                    border-radius: 15px;
                }

                .el-carousel__item:nth-child(2n) {
                    background-color: #99a9bf;
                }

                .el-carousel__item:nth-child(2n+1) {
                    background-color: #d3dce6;
                }
            }

            .user {
                // flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                margin-left: 15px;
                padding-top: 15px;
                width: 230px;
                height: 350px;
                // background-color: #F7F9FA;
                background-color: #fff;
                border-radius: 15px;

                .user-avatar {
                    width: 65px;
                    height: 65px;
                    // background-color: #E7E8FB;
                    border-radius: 50%;
                    text-align: center;

                    a {
                        display: block;
                        border-radius: 50%;
                        color: #303133;
                        line-height: 65px;

                        img {
                            border-radius: 50%;
                        }
                    }
                }

                .greeting {
                    height: 50px;
                    line-height: 50px;
                }

                .log-out {
                    .login,
                    .register {
                        height: 40px;
                        border: none;
                        transition: all .3s;
                    }

                    .login {
                        background-color: #9085c4;
                        &:hover {
                            background-color: #776da6;
                        }
                    }

                    .register {
                        margin-left: 15px;
                        background-color: #a6a0c4;
                        &:hover {
                            background-color: #8984a1;
                        }
                    }
                }

                .logged {
                    display: flex;
                    align-items: center;
                    height: 50px;

                    a {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 0 8px;
                        transition: all .3s;

                        &:hover {
                            color: #9400b6;
                        }

                        i {
                            font-size: 20px;
                        }

                        span {
                            margin-top: 5px;
                        }
                    }

                    .post-item {
                        width: 40px;
                        height: 40px;
                    }
                }

                .bulletin-board {
                    margin-top: 15px;
                    width: 200px;
                    text-align: left;
                    
                    .notice {
                        li {
                            margin: 5px 0;
                            a {
                                display: block;
                                // 不换行
                                white-space: nowrap;
                                // 超出隐藏
                                overflow: hidden;
                                // 超出部分显示省略号
                                text-overflow: ellipsis;
                                font-size: 14px;
                                transition: all .3s;

                                &:hover {
                                    color: #9400b6;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        .like,
        .new {
            padding: 0 15px;
            h3 {
                margin: 15px 0;
                font-size: 18px;
            }
        }
    }
</style>