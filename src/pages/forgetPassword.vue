<template>
    <div>
        <Header></Header>
        <div class="change-password">
            <el-form ref="ruleForm" :model="form" :rules="rules" label-position="right" label-width="auto" size="small">
                <el-form-item prop="userName">
                    <span slot="label">
                        用户名:
                    </span>
                    <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <span slot="label">
                        密码:
                    </span>
                    <el-input type="password" v-model="form.newPassword" placeholder="请输入密码" show-password></el-input>
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
            <el-button type="primary" class="change-button" @click="changePassword">确&nbsp;&nbsp;认&nbsp;&nbsp;修&nbsp;&nbsp;改</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'forgetPassword',
        data() {
            return {
                form: {
                    userName: '',    // 用户名
                    newPassword: '',    // 密码
                    confirmPassword: '',    // 确认密码
                    email: '',     // 手机号
                    code: '',    // 验证码
                },
                // 表单验证规则
                rules: {
                    userName: {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    newPassword: [
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
                                if (value != this.form.newPassword) {
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
                    const result = await this.$API.sendVerificationCode(this.form.email)
                    console.log(result)
                    if(result.code == 200) {
                        console.log('发送成功')
                        this.$message.success('发送成功')
                        // 设置按钮文本和状态
                        this.codeStatu = 'send'
                        this.codeMsg = this.codeStatus.send

                        const data = result.data
                        // console.log(data)
                        this.form.code = String(data.code)
                    }
                }
            },
            // 修改密码
            async changePassword() {
                let passCheck = false
                // 校验整个表单
                this.$refs.ruleForm.validate((pass) => {
                    console.log(pass)
                    passCheck = pass
                })
                console.log(this.form);
                if(passCheck) {
                    const result = await this.$API.reqForgetPassword(this.form)
                    if(result.code == 200) {
                        this.$message.success('密码修改成功')
                        localStorage.clear()
                        this.$router.push('/login')
                    }
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .change-password {
        margin: 0 auto;
        margin-top: 40px;
        padding: 45px;
        width: 450px;
        background-color: #fff;
        border-radius: 5px;
        text-align: center;

        .send-code {
            color: #9EA3F3;
        }

        .change-button {
            margin-top: 10px;
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