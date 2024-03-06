<template>
    <div class="login">
        <div class="login-form">
            <el-form :model="form" label-position="right" label-width="auto">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName" placeholder="请输入 用户名/手机号/邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                // 表单数据对象
                form: {
                    userName: '',
                    password: ''
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .login {
        display: flex;
        justify-content: flex-end;
        padding: 15px 0;
        .login-form {
            margin-right: 190px;
            padding: 15px;
            width: 400px;
            // height: 400px;
            background-color: #E7E8FB;

        }
    }
</style>