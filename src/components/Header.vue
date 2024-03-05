<template>
    <header class="header">
        <el-menu
            class="menu"
            mode="horizontal"
            default-active="home"
            background-color="#E7E8FB"
            text-color="#9EA3F3"
            active-text-color="#5f479a"
            router
        >
            <a href="javascript:;" class="logo">校园二手交易平台</a>
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="message">消息中心</el-menu-item>
            <el-menu-item index="center">我的</el-menu-item>
            <el-menu-item index="login">登录</el-menu-item>
            <el-menu-item index="register">注册</el-menu-item>
        </el-menu>
    </header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return {
                
            }
        },
        mounted() {
            // console.log(this.$route)
            // console.log(this.$router)
        },
        methods: {
        }
    }
</script>

<style scoped lang="less">
    .header {
        background-color: #E7E8FB;
    }
    .menu {
        padding: 0 20px;
        width: 80%;
        margin: 0 auto;
        display: flex;
        .logo {
            padding: 0 20px;
            flex: 1;
            line-height: 60px;
            color: #9EA3F3;
        }
    }
</style>