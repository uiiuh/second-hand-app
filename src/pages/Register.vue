<template>
    <div class="register">
        <div class="register-form">
            <!-- 注册表单 -->
            <el-form :model="form" label-position="right" label-width="auto" size="small">
                <el-form-item>
                    <span slot="label" class="txt">
                        用户名:
                    </span>
                    <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <span slot="label" class="txt">
                        密码:
                    </span>
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <span slot="label" class="txt">
                        确认密码:
                    </span>
                    <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <span slot="label" class="txt">
                        手机号:
                    </span>
                    <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <span slot="label" class="txt">
                        验证码:
                    </span>
                    <el-input v-model="form.code" placeholder="请输入手机验证码"></el-input>
                </el-form-item>
                <el-form-item size="medium">
                    <el-button type="primary" class="register-button">注&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                form: {
                    userName: '',    // 用户名
                    password: '',    // 密码
                    confirmPassword: '',    // 确认密码
                    phone: '',     // 手机号
                    code: '',    // 验证码

                }
            }
        }
    }
</script>

<style scoped lang="less">
    .register {
        display: flex;
        justify-content: center;
        padding: 15px 0;
        .register-form {
            padding: 15px;
            width: 400px;
            background-color: #E7E8FB;

            .txt {
                color: #5f479a;
            }

            .register-button {
                width: 100%;
                border: none;
                transition: all .3s;
                background-color: #7e62c2;

                &:hover {
                    background-color: #6c54a7;
                }
            }
        }
    }
</style>