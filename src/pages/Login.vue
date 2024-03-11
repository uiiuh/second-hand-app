<template>
    <div class="login">
        <div class="login-form">
            <!-- 登录表单 -->
            <el-form :model="form" label-position="right" label-width="auto" size="small">
                <el-form-item>
                    <!-- 去掉el-form-item 的 label 属性，添加 span 标签，并设置 slot="label"。这样写就可以自定义 label 中的文字、样式等等（因为不能直接通过添加类名去设置样式） -->
                    <span slot="label" class="txt">
                        用户名:
                    </span>
                    <el-input v-model="form.userName" placeholder="请输入 用户名/手机号/邮箱"></el-input>
                </el-form-item>
                <el-form-item class="password">
                    <span slot="label" class="txt">
                        密码:
                    </span>
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <!-- 忘记密码 -->
                <el-form-item class="forget">
                    <a href="javascript:;" class="forget-password">忘记密码?</a>
                </el-form-item>
                <el-form-item size="medium">
                    <!-- 按钮的样式可以直接通过添加类名设置样式 -->
                    <el-button type="primary" class="register-button">注&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
                    <el-button type="primary" class="login-button">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
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
                    userName: '',    // 用户名
                    password: ''    // 密码
                }
            }
        },
    }
</script>

<style scoped lang="less">
    .login {
        display: flex;
        justify-content: center;
        padding: 15px 0;
        .login-form {
            // margin-right: 190px;
            padding: 15px;
            width: 400px;
            // height: 400px;
            background-color: #E7E8FB;

            .txt {
                color: #5f479a;
            }

            .password {
                margin-bottom: 0;
            }

            .forget {
                margin-bottom: 10px;
                text-align: end;
                .forget-password {
                    font-size: 14px;
                    color: #7e62c2;
                    transition: all .3s;

                    &:hover {
                        color: #6c54a7;
                    }
                }
            }
            

            .login-button,
            .register-button {
                width: 45%;
                border: none;
                transition: all .3s;
                background-color: #7e62c2;

                &:hover {
                    background-color: #6c54a7;
                }
            }

            .login-button {
                margin-left: 34px;
            }

        }
    }
</style>