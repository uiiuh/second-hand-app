<template>
    <div id="app">
        <!-- <Header></Header> -->
        <router-view></router-view>
    </div>
</template>

<script>
    // import Header from '@/components/Header'
    export default {
        name: 'App',
        // components: {
        //     Header
        // },
        mounted() {
            // 获取商品分类列表：将它放在App组件中，这样只需要发送一次请求，优化性能
            this.$store.dispatch('getCategoryList') 
            // 在组件挂载后检查本地存储中是否存在 token，避免页面刷新后用户信息丢失
            const token = localStorage.getItem('token');
            if (token) {
                // 如果本地存储中存在 token，则表示用户已登录，派发获取用户信息的 action
                this.$store.dispatch('getUserInfo');
            }
        }
    }
</script>

<style lang="less">
    .goods-container {
        margin: 15px 0;
        width: 100%;
        li {
            float: left;
            margin-right: 15px;
            margin-bottom: 15px;
            width: 190px;
            height: 230px;
            // background-color: #F7F9FA;
            background-color: #fff;
            transition: all .2s linear;
            cursor: pointer;

            &:nth-child(5n) {
                margin-right: 0;
            }

            &:hover {
                box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
                transform: translate3d(0, -1px, 0);
            }

            .cover {
                height: 60%;
                text-align: center;
                img {
                    width: auto;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 5px 10px 10px;
                height: 40%;
                // background-color: #fff;
                color: #F56C6C;

                .title {
                    font-size: 16px;
                    font-weight: 400;
                    color: #303133;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* 设置文本显示的行数 */
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .rmb {
                    margin-right: 2px;
                    font-size: 12px;
                }

                .price {
                    font-size: 18px;
                    font-weight: 700;
                }
            }
        }
    }
    .text-overflow {
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 设置文本显示的行数 */
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
