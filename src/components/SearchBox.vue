<template>
    <div class="search-input">
        <el-input v-model="keyword" placeholder="请输入关键字" clearable @input="updateKeyword">
            <el-button slot="append" type="primary" icon="el-icon-search" class="search-button" @click="goSearch">搜索</el-button>
        </el-input>
    </div>
</template>

<script>
    export default {
        name: 'SearchBox',
        props: ['searchKeyword'],
        data() {
            return {
                keyword: this.searchKeyword
            }
        },
        mounted() {
            // 这里也要触发事件
            this.$emit('searchGoods',this.keyword)
        },
        methods: {
            updateKeyword() {
                this.$emit('updateKeyword',this.keyword)
            },
            goSearch() {
                this.$emit('searchGoods',this.keyword)
                this.$router.push({
                    name: 'search',
                    params: {
                        keyword: this.keyword || undefined
                    }
                })
            }
        }

    }
</script>

<style scoped lang="less">
    .search-input {
        padding: 15px;
        text-align: end;
        .el-input-group {
            width: 50%;
        }
        ::v-deep .el-input__inner {
            border-color: #e7e8fb;
            &:hover {
                border-color: #c9cbe5;
            }
            &:focus {
                box-shadow: 0 0 1px 1px rgb(231, 232, 251);
                outline: 0;
            }
        }
        .search-button {
            background-color: #7b5acb;
            color: #fff;
            border-radius: 0;
            transition: all .3s;

            &:hover {
                background-color: #51388f;
            }
        }
        .hot-search {
            display: flex;
            width: 50%;

            li {
                padding: 10px;
            }

            a {
                color: #606266;
                transition: all .3s;
                &:hover {
                    color: #c21fde;
                }
            }
        }
    }
</style>