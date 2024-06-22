<template>
    <div>
        <Header></Header>
        <div class="sell-goods">
            <div class="title">发&nbsp;&nbsp;&nbsp;&nbsp;布&nbsp;&nbsp;&nbsp;&nbsp;闲&nbsp;&nbsp;&nbsp;&nbsp;置</div>
            <div class="form">
                <el-form ref="ruleForm" :model="form" :rules="rules" label-width="auto">
                    <el-form-item label="商品名称：" prop="name">
                        <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品类别：" prop="categoryId">
                        <div class="category">
                            <el-cascader
                                v-model="form.categoryId"
                                :options="categoryList"
                                :props="optionsProps"
                                @change="handleChange"
                            >
                            </el-cascader>
                        </div>
                    </el-form-item>
                    <el-form-item label="商品价格：" prop="price">
                        <el-input type="number" v-model.number="form.price" placeholder="请输入商品价格" min="0" max="99999999" :step="form.price % 1 === 0 ? 1 : (form.price * 10 % 1 === 0 ? 0.1 : 0.01)">
                            <span slot="suffix" class="price-slot">元</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品描述：" prop="desc">
                        <el-input 
                            type="textarea"
                            v-model="form.desc"
                            placeholder="请输入内容"
                            :autosize="{ minRows: 2, maxRows: 5}"
                            maxlength="500"
                            show-word-limit
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="发货方式：" prop="deliveryMethod">
                        <el-select v-model="form.deliveryMethod" placeholder="请选择发货方式">
                            <el-option v-for="(item,index) in deliveryList" :key="index" :label="item.deliveryName" :value="item.deliveryName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="自取地点：" prop="address" v-show="form.deliveryMethod=='买家自取'">
                        <el-input 
                            type="textarea"
                            v-model="form.address"
                            placeholder="请输入自取地点"
                            :autosize="{ minRows: 2, maxRows: 5}"
                            maxlength="200"
                            show-word-limit
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="商品图片：" prop="pictures">
                        <el-upload
                            action="http://127.0.0.1:3007/api/upload/uploadFile"
                            multiple
                            list-type="picture-card"
                            :limit="10"
                            :on-exceed="handleExceed"
                            :before-upload="beforeUpload"
                            :on-success="handleSuccess"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <el-button type="primary" class="submit-button" @click="releaseGoods">发&nbsp;&nbsp;&nbsp;&nbsp;布</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { reqReleaseGoods } from '@/api'
    export default {
        name: 'SellGoods',
        data() {
            return {
                form: {
                    name: '',
                    categoryId: null,
                    price: null,
                    desc: '',
                    deliveryMethod: '',
                    pictures: [],
                    address: ''
                },
                rules: {
                    name: [
                        { 
                            required: true,
                            message: '请输入商品名称',
                            trigger: 'blur'
                        },
                        {
                            min: 1,
                            max: 50,
                            message: '商品吗名称长度应为 1 到 50 个字符',
                            trigger: 'change'
                        }
                    ],
                    categoryId: {
                        required: true,
                        message: '请选择商品类别',
                        trigger: 'blur',
                    },
                    price: [
                        {
                            required: true,
                            type: 'number',
                            message: '请输入商品价格',
                            trigger: 'blur'
                        },
                    ],
                    desc: {
                        required: true,
                        message: '请输入商品描述',
                        trigger: 'blur'
                    },
                    deliveryMethod: {
                        required: true,
                        message: '请选择配送方式',
                        trigger: 'blur'
                    },
                    pictures: {
                        required: true,
                        message: '请上传商品图片',
                        trigger: 'blur'
                    },
                    address: {
                        validator: (rule, value, callback) => {
                            if (this.form.deliveryMethod == '买家自取' && !this.form.address) {
                                callback(new Error('请输入自提地点'))
                            } else {
                                callback()
                            }
                        }
                    }
                },
                
                // 上传的文件列表
                fileList: [],

                // 级联选择器配置项
                optionsProps: {
                    expandTrigger: 'hover',
                    value: 'categoryId',
                    label: 'categoryName',
                    children: 'categoryChild',
                    emitPath: false
                },

                deliveryList: [
                    {
                        deliveryName: '卖家配送',
                        deliveryId: 1
                    },
                    {
                        deliveryName: '买家自取',
                        deliveryId: 2
                    },
                    {
                        deliveryName: '协商交易地点',
                        deliveryId: 3
                    },
                ]
            }
        },
        computed: {
            ...mapState({
                categoryList: state => state.goods.categoryList,
            })
        },
        watch: {
            'form.categoryId'() {
                this.$refs.ruleForm.validateField('categoryId')
            },
            'form.price'() {
                this.$refs.ruleForm.validateField('price')
            },
            'form.desc'() {
                this.$refs.ruleForm.validateField('desc')
            },
            'form.deliveryMethod'() {
                this.$refs.ruleForm.validateField('deliveryMethod')
            },
            'form.pictures'() {
                this.$refs.ruleForm.validateField('pictures')
            },
        },
        methods: {
            handleExceed(files, fileList) {
                this.$message.warning('最多选择 10 张图片');
            },
            // 文件上传前
            beforeUpload(file) {
                // console.log(file)
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                this.$message.error('只能上传 jpg 或 png 格式的图片!');
                }
                if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 10MB!');
                }
                return isJPG && isLt2M;
            },
            // 文件上传成功
            handleSuccess(e, file) {
                console.log('file---',file)
                const result = file.response
                console.log('result---',result)
                if(result.code == 200) {
                    const { fileName, fileUrl } = result.data
                    // this.fileList.push({
                    //     fileName,
                    //     fileUrl,
                    //     uid: file.uid
                    // })
                    this.form.pictures.push({
                        fileName,
                        fileUrl,
                        uid: file.uid
                    })
                }
            },
            // 文件移除
            handleRemove(file, fileList) {
                console.log('handleRemove')
                console.log('file---',file)
                console.log('fileList---',fileList)
                // this.fileList = this.fileList.filter(item => item.uid != file.uid)
                this.form.pictures = this.form.pictures.filter(item => item.uid != file.uid)
            },

            // 联级
            handleChange(value) {
                console.log(value);
            },

            // 发布商品
            async releaseGoods() {
                let passCheck = false
                // 校验整个表单
                this.$refs.ruleForm.validate((pass) => {
                    console.log(pass)
                    passCheck = pass
                })
                console.log(passCheck)
                // 校验全部通过
                const result = await reqReleaseGoods(this.form)
                console.log(result)
                if(result.code == 200) {
                    console.log('发布成功')
                    // 发布成功，则跳转到首页
                    this.$message.success('发布成功，请等待管理员审核')
                    this.$router.push('/home')
                }else {
                    this.$message.error(result.error)
                }
            }
        }
    }
</script>

<style>
    body {
        background-color: #f4f4f4;
    }
</style>
<style scoped lang="less">
    .sell-goods {
        margin: 30px auto;
        width: 50%;
        background-color: #fff;

        .title {
            height: 40px;
            background-color: #E7E8FB;
            color: #9EA3F3;
            text-align: center;
            line-height: 40px;
        }

        .form {
            padding: 30px 45px;
        }

        ::v-deep .el-upload--picture-card {
            width: 80px;
            height: 80px;
            font-size: 16px;
            line-height: 80px;

            .el-icon-plus {
                font-size: 16px;
            }

            .el-upload-list__item {
                width: 80px;
                height: 80px;
            }
        }

        ::v-deep .el-upload-list--picture-card {
            .el-upload-list__item {
                width: 80px;
                height: 80px;
            }
        }

        .price-slot {
            padding-right: 5px;
        }

        .el-cascader,
        .el-select {
            width: 100%;
        }

        ::v-deep .el-textarea .el-input__count {
            background-color: transparent;
            bottom: -32px;
            right: 0;
        }

        .submit-button {
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