<template>
    <div class="personal-info">
        <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:3007/api/upload/uploadFile"
            :show-file-list="false"
            :limit="10"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
        >
            <img v-if="userInfo.avatar" :src="$baseURL+userInfo.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <i class="el-icon-edit edit-avatar"></i>
        </el-upload>
        <ul class="user-info">
            <li>
                <div class="item-left">
                    用户名：<span>{{ userInfo.userName }}</span>
                </div>
                <div class="item-right"></div>
            </li>
            <li>
                <div class="item-left">
                邮箱：<span>{{ userInfo.email }}</span>
                </div>
                <div class="item-right"></div>
            </li>
            <li>
                <div class="item-left">
                    简介：<span>{{ userInfo.intro }}</span>
                </div>
                <div class="item-right">
                    <i class="el-icon-edit edit-intro" @click="introModify=true"></i>
                </div>
            </li>
            <li>
                <div class="item-left">
                    性别：
                    <el-radio v-model="userInfo.sex" label="男">男</el-radio>
                    <el-radio v-model="userInfo.sex" label="女">女</el-radio>
                </div>
                <div class="item-right"></div>
            </li>
            <li>
                <div class="item-left">
                    收货地址：<span>{{ userInfo.shippingAddress }}</span>
                </div>
                <div class="item-right">
                    <i class="el-icon-edit edit-intro" @click="addressModify=true"></i>
                </div>
            </li>
        </ul>
        <!-- 修改简介弹出框 -->
        <el-dialog
            :visible="introModify"
            title="修改简介"
            @open="intro=''"
        >
            <el-input
                type="textarea"
                :rows="4"
                :maxlength="200"
                show-word-limit
                resize="none"
                placeholder="请输入您的简介"
                v-model="intro"
            >
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="introModify=false">取 消</el-button>
                <el-button @click="confimModifyIntro" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改收货地址弹出框 -->
        <el-dialog
            :visible="addressModify"
            title="修改收货地址"
            @open="address=''"
        >
            <el-input
                type="textarea"
                :rows="4"
                :maxlength="500"
                show-word-limit
                resize="none"
                placeholder="请输入收获地址"
                v-model="address"
            >
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addressModify=false">取 消</el-button>
                <el-button @click="confimModifyAddress" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <el-button type="primary" class="modify" @click="modifyUserInfo">确认修改</el-button>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: 'Personal',
        data() {
            return {
                sex: null,
                introModify: false,
                intro: '',
                addressModify: false,
                address: ''
            }
        },
        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            })
        },
        methods: {
            // 文件上传前
            beforeUpload(file) {
                // console.log(file)
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                this.$message.error('只能上传 jpg 或 png 格式的图片!');
                }
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isJPG && isLt2M;
            },
            // 文件上传成功
            handleSuccess(e, file) {
                console.log('file---',file)
                const result = file.response
                console.log('result---',result)
                if(result.code == 200) {
                    this.$store.dispatch('updateUserAvatar',result.data.fileName)
                }
            },
            // 确认修改修改简介
            confimModifyIntro() {
                this.userInfo.intro = this.intro
                this.introModify = false
            },
            // 确认修改收货地址
            confimModifyAddress() {
                this.userInfo.shippingAddress = this.address
                this.addressModify = false
            },
            // 确认修改个人信息
            modifyUserInfo() {
                console.log(this.userInfo);
                this.$store.dispatch('modifyUserInfo',this)
            }
        }
    }
</script>

<style scoped lang="less">
    .personal-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        padding: 25px 0;
        
        ::v-deep .el-upload {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
        }
        .avatar-uploader {

            img {
                object-fit: fill;
            }
            position: relative;

            .edit-avatar {
                position: absolute;
                bottom: 5px;
                right: 0;
                display: block;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.3);
                text-align: center;
                line-height: 20px;
            }
        }

        .user-info {
            width: 400px;
            li {
                display: flex;
                padding: 12px 0;
                border-bottom: 1px solid #E4E7ED;

                .item-left {
                    width: 350px;
                }

                .item-right {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .edit-intro {
                        cursor: pointer;

                        &:hover {
                            color: #409EFF;
                        }
                    }

                    
                }
            }
        }

        .modify {
            margin-top: 15px;
            width: 120px;
            border: none;
            transition: all .3s;
            background-color: #7e62c2;

            &:hover {
                background-color: #6c54a7;
            }
        }

        ::v-deep .el-dialog__body {
            padding: 10px 20px;
        }

        .intro-input {
            display: block;
            width: 100%;
            height: 100px;
            border: 1px solid #E4E7ED;
        }


    }
</style>