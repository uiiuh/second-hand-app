<template>
    <div class="search">
        <el-input v-model="keyword" placeholder="请输入关键字" clearable>
            <el-button slot="append" type="primary" icon="el-icon-search" class="search-button">搜索</el-button>
        </el-input>
        <!-- <ul class="hot-search">
            <li><a href="javascript:;">111</a></li>
            <li><a href="javascript:;">222</a></li>
            <li><a href="javascript:;">333</a></li>
            <li><a href="javascript:;">444</a></li>
            <li><a href="javascript:;">555</a></li>
            <li><a href="javascript:;">666</a></li>
        </ul> -->
    </div>
</template>

<script>
    export default {
        name: 'SearchBox',
        data() {
            return {
                keyword: ''
            }
        }

    }
</script>

<style scoped lang="less">
    .search {
        margin: 0 auto;
        margin-bottom: 10px;
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