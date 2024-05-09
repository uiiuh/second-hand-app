<template>
    <div class="register">
        <!-- 头部 -->
        <Header></Header>

        <!-- 注册表单 -->
        <div class="register-form">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-position="right" label-width="auto" size="small">
                <el-form-item prop="userName">
                    <span slot="label">
                        用户名:
                    </span>
                    <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <span slot="label">
                        密码:
                    </span>
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <span slot="label">
                        确认密码:
                    </span>
                    <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码" show-password></el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <span slot="label">
                        邮箱:
                    </span>
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <span slot="label">
                        验证码:
                    </span>
                    <el-input v-model="form.code" placeholder="请输入邮箱验证码">
                        <template slot="append">
                            <el-button type="primary" class="send-code" @click="sendCode" :loading="codeStatu==='sending'" :disabled="codeStatu != 'unsend'">{{ codeMsg }}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="register-button" @click="register">注&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
        </div>
    </div>
</template>

<script>
    import { sendVerificationCode, registerUser } from '@/api'
    export default {
        name: 'Register',
        data() {
            return {
                form: {
                    userName: '',    // 用户名
                    password: '',    // 密码
                    confirmPassword: '',    // 确认密码
                    email: '',     // 手机号
                    code: '',    // 验证码
                },
                // 表单验证规则
                rules: {
                    userName: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        // {
                        //     // 自定义校验函数
                        //     validator(rule, value, callback) {
                        //         if (!/^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]{3,17}$/.test(value)) {
                        //             return callback(new Error('用户名只能由中英文字符、数字或下划线组成，长度为4~18位，首字符不能为数字或特殊字符。'))
                        //         }
                        //     }
                        // }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        }
                    ],
                    confirmPassword: [
                        {
                            required: true,
                            message: '请再次输入密码',
                            trigger: 'blue'
                        },
                        {
                            validator: (rule, value, callback) => {
                                // if (this.form.password != '' && value != this.form.password) {
                                if (value != this.form.password) {
                                    callback(new Error('两次输入密码不一致!'))
                                } else {
                                    callback()
                                }
                            }
                        }
                    ],
                    email: [
                        {
                            required: true,
                            message: '请输入邮箱',
                            trigger: 'blur'
                        },
                        {
                            type: 'email',
                            message: '邮箱格式不正确！',
                            trigger: 'change'
                        }
                    ],
                    code: {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }
                },
                codeStatus: {
                    unsend: '发送验证码',
                    sending: '发送中',
                    send: '已发送',
                },
                codeStatu: 'unsend',
                codeMsg: '发送验证码'
            }
        },
        methods: {
            // 发送验证码
            async sendCode() {
                let isEmailPass = false
                this.$refs.ruleForm.validateField('email',errorMessage => {
                    console.log(errorMessage)
                    if(errorMessage === '') isEmailPass = true
                })
                console.log(isEmailPass)
                // 发送验证码
                if(isEmailPass) {
                    // 设置按钮文本和状态
                    this.codeStatu = 'sending'
                    this.codeMsg = this.codeStatus.sending
                    // 调用接口
                    const result = await sendVerificationCode(this.form.email)
                    console.log(result)
                    if(result.code == 200) {
                        console.log('发送成功')
                        // 设置按钮文本和状态
                        this.codeStatu = 'send'
                        this.codeMsg = this.codeStatus.send

                        const data = result.data
                        // console.log(data)
                        this.form.code = String(data.code)
                    }
                }
            },

            // 注册账号
            async register() {
                let passCheck = false
                // 校验整个表单
                this.$refs.ruleForm.validate((pass) => {
                    console.log(pass)
                    passCheck = pass
                })
                // 校验全部通过
                const result = await registerUser(this.form)
                console.log(result)
                if(result.code == 200) {
                    console.log('注册成功')
                    // 注册成功，则跳转到首页
                    this.$router.push({
                        name: 'login'
                    })
                }
            }
        },
        watch: {
            'form.userName'() {
                this.$refs.ruleForm.validateField('userName')
            },
            'form.password'() {
                this.$refs.ruleForm.validateField('password')
            },
            'form.confirmPassword'() {
                this.$refs.ruleForm.validateField('confirmPassword')
            },
            'form.email'() {
                this.$refs.ruleForm.validateField('email')
            },
            'form.code'() {
                this.$refs.ruleForm.validateField('code')
            },
        }
    }
</script>

<style scoped lang="less">
    .register {
        .register-form {
            margin: 0 auto;
            margin-top: 50px;
            padding: 45px;
            width: 450px;
            background-color: #fff;
            border-radius: 5px;

            .send-code {
                color: #9EA3F3;
            }
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
</style>