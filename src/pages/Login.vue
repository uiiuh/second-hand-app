<template>
    <div class="login">
        <!-- 头部 -->
        <Header></Header>

        <!-- 登录表单 -->
        <div class="login-form">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-position="right" label-width="auto" size="small">
                <el-form-item prop="userName">
                    <!-- 去掉el-form-item 的 label 属性，添加 span 标签，并设置 slot="label"。这样写就可以自定义 label 中的文字、样式等等（因为不能直接通过添加类名去设置样式） -->
                    <span slot="label" class="txt">
                        用户名:
                    </span>
                    <el-input v-model="form.userName" placeholder="请输入用户名 / 邮箱"></el-input>
                </el-form-item>
                <el-form-item class="password" prop="password">
                    <span slot="label" class="txt">
                        密码:
                    </span>
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <!-- 忘记密码 -->
                <el-form-item class="forget">
                    <!-- <a href="javascript:;" class="forget-password">忘记密码?</a> -->
                    <router-link to="/forgetpassword" class="forget-password">忘记密码?</router-link>
                </el-form-item>
            </el-form>
            <!-- 按钮的样式可以直接通过添加类名设置样式 -->
            <el-button type="primary" class="login-button" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
            <div class="register">
                <router-link to="/register">立即注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { login } from '@/api/index'
    export default {
        name: 'Login',
        data() {
            return {
                // 表单数据对象
                form: {
                    userName: '',    // 用户名
                    password: ''    // 密码
                },
                rules: {
                    userName: {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    password: {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                }
            }
        },
        methods: {
            async login() {
                let passCheck = false
                // 校验整个表单
                this.$refs.ruleForm.validate((pass) => {
                    console.log(pass)
                    passCheck = pass
                })
                console.log(passCheck)
                // 校验全部通过
                const result = await login(this.form)
                console.log(result)
                if(result.code == 200) {
                    console.log('登录成功')
                    this.$message({
                        type: 'success',
                        message: '登录成功',
                        duration: 1000
                    })
                    // 将 token 存入本地
                    localStorage.setItem('token', result.data.token)
                    // 获取用户信息
                    this.$store.dispatch('getUserInfo')
                    this.$router.push('/home');
                }else {
                    this.$message.error(result.message)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        .login-form {
            margin: 0 auto;
            margin-top: 50px;
            padding: 45px;
            width: 450px;
            background-color: #fff;
            border-radius: 5px;

            .password {
                margin-bottom: 0;
            }

            .forget {
                margin-bottom: 10px;
                text-align: end;
            }

            .forget-password,
            .register a {
                font-size: 14px;
                color: #7e62c2;
                transition: all .3s;

                &:hover {
                    color: #6c54a7;
                }
            }

            .register {
                margin-top: 10px;
                text-align: right;
            }

            .login-button {
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