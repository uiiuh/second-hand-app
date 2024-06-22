<template>
    <div>
        <Header></Header>
        <div class="center">
            <div class="left">
                <ul class="menu" @click="setStyle">
                    <li class="active" ref="defaultItem">
                        <router-link to="/center/personal">个人资料</router-link>
                    </li>
                    <li>
                        <router-link to="/center/myorder">我的订单</router-link>
                    </li>
                    <li>
                        <router-link to="/center/mycart">我的购物车</router-link>
                    </li>
                    <li>
                        <router-link to="/center/myfavorite">我的收藏</router-link>
                    </li>
                    <li>
                        <router-link to="/center/mypublished">我发布的商品</router-link>
                    </li>
                    <li>
                        <router-link to="/center/changepassword">修改密码</router-link>
                    </li>
                </ul>
                <el-button type="text" class="log-out" @click="logOut">退出登录</el-button>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Center',
        data() {
            return {
                preItem: null
            }
        },
        mounted() {
            this.preItem = this.$refs.defaultItem
        },
        methods: {
            setStyle(e) {
                // console.dir(e.target)
                let target = e.target;

                // 先去掉上一个点击的 li 标签的类名
                if(this.preItem) {
                    this.preItem.className = ''
                }
                // 再找到这次点击的 li 标签
                while (target && target.nodeName.toLowerCase() != 'li') {
                    target = target.parentNode
                }
                // 保存这次点击的元素
                this.preItem = target;
                // 更改样式
                target.className = 'active'
            },
            // 退出登录
            logOut() {
                this.$confirm('是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.clear()
                    this.$store.dispatch('logOut')
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    this.$router.push('/home')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退出登录'
                    });          
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .center {
        display: flex;
        border: 1px solid #E4E7ED;

        margin: 0 auto;
        margin-top: 25px;
        width: 80%;
        min-height: 420px;
        background-color: #fff;

        .left {
            border-right: 1px solid #E4E7ED;
        }

        .menu {
            width: 200px;
            // border-right: 1px solid #E4E7ED;

            li {
                cursor: pointer;

                &.active {
                    background-color: #E7E8FB;
                    a {
                        color: #5f479a;
                    }
                }
                
                a {
                    display: block;
                    padding: 15px 15px 15px 20px;
                    width: 100%;
                    height: 100%;
                }
                
            }

        }

        .right {
            flex: 1;
        }
    }
    .log-out {
        padding: 15px 15px 15px 20px;
        font-size: 16px;
        color: #303133;

        &:hover {
            color: #5f479a;
        }
    }
</style>