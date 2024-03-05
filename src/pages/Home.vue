<template>
    <div class="home">
        <!-- 搜索框 -->
        <SearchBox></SearchBox>
        <div class="main">
            <ul class="classify-menu">
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
                <li>111</li>
            </ul>
            <div class="banner">
                <el-carousel trigger="click">
                    <el-carousel-item>111</el-carousel-item>
                    <el-carousel-item>222</el-carousel-item>
                    <el-carousel-item>333</el-carousel-item>
                    <el-carousel-item>444</el-carousel-item>
                </el-carousel>
            </div>
            <div class="user">用户信息&精灵图</div>
        </div>
        <div>111</div>
        <div>222</div>
        <div>333</div>
        <div>444</div>
    </div>
</template>

<script>
    import SearchBox from '@/components/SearchBox.vue'
    export default {
        name: 'Home',
        components: {
            SearchBox
        },
        data() {
            return {
                keyword: ''
            }
        }
    }
</script>

<style scoped lang="less">
    .home {
        margin: 10px auto;
        width: 80%;
        .main {
            display: flex;
            .classify-menu {
                flex: 1;
                padding: 20px;
                background-color: #F7F9FA;
                margin-right: 10px;
                border-radius: 15px;
                li {
                    margin-bottom: 15px;
                }
            }
            .banner {
                flex: 2;
                .el-carousel__item:nth-child(2n) {
                    background-color: #99a9bf;
                }
                .el-carousel__item:nth-child(2n+1) {
                    background-color: #d3dce6;
                }
            }
            .user {
                flex: 1;
            }
        }
        
    }
</style>