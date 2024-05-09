<template>
    <div>
        <Header></Header>
        <div class="search">
            <div class="search-panel">
                <SearchBox :searchKeyword="keyword" @searchGoods="getGoodsList" @updateKeyword="getKeyword"/>
                <div class="classify-panel">
                    <div class="classify-item" v-for="(item,index) in categoryList" :key="index">
                        <h4>{{ item.categoryName }}</h4>
                        <ul>
                            <li v-for="(subItem,subIndex) in item.categoryChild" :key="subIndex" @click="setCategoryId(subItem.categoryId)" :class="{active: categoryId==subItem.categoryId}">{{ subItem.categoryName }}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="goods-list clearfix">
                <ul class="goods-container clearfix" @click="goDetail">
                    <li v-for="(item,index) in goodsList" :key="index" :data-goodsId="item.id">
                        <div class="cover">
                            <img :src="item.pictures[0].fileUrl" alt="">
                        </div>
                        <div class="info">
                            <h4 class="title">{{ item.name }}</h4>
                            <div>
                                <span class="rmb">¥</span>
                                <span class="price">{{ item.price }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <el-empty v-show="goodsList.length==0" description="暂无数据"></el-empty>
            <div v-show="goodsList.length!=0" class="pagination">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="pageNo"
                    :page-size="pageSize"
                    :total="total"
                    :page-count="totalPage"
                    @current-page="getGoodsList"
                >
                </el-pagination>
            </div>
        </div>    
    </div>
</template>

<script>
    import SearchBox from '@/components/SearchBox'
    import { reqCategoryList } from '@/api'
    export default {
        name: 'Search',
        components: {
            SearchBox
        },
        data() {
            return {
                categoryList: [],
                keyword: '',
                pageNo: 1,
                pageSize: 10,
                goodsList: [],
                total: null,
                categoryId: null,
            }
        },
        beforeMount() {
            this.keyword = this.$route.params.keyword
            this.categoryId = this.$route.params.categoryId
        },
        mounted() {
            this.getCategoryList()
        },
        computed: {
            totalPage() {
                return Math.floor(this.total/this.pageSize)
            }
        },
        watch: {
            pageNo() {
                this.getGoodsList(this.keyword)
            }
        },
        methods: {
            async getCategoryList() {
                const result = await reqCategoryList()
                if(result.code == 200) {
                    this.categoryList = result.data
                }
            },
            getKeyword(keyword) {
                console.log('emit');
                this.keyword = keyword
            },
            async getGoodsList(keyword) {
                this.keyword = keyword
                let params = {
                    keyword: this.keyword,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }
                if(this.categoryId) params.categoryId = this.categoryId
                console.log('params--',params)
                // console.log('$API',this.$API)
                if((this.keyword != undefined && this.keyword.trim() != '') || this.categoryId) {
                    const result = await this.$API.reqSearchGoodsList(params)
                    if(result.code == 200) {
                        let data = result.data
                        data = data.map(item => {
                            const pictures = JSON.parse(item.pictures)
                            item.pictures = pictures
                            return item
                        })
                        this.goodsList = data
                        this.total = result.total
                    }
                }
            },
            setCategoryId(categoryId) {
                this.categoryId = categoryId
                // console.log(categoryId);
                this.getGoodsList(this.keyword)
            },
            // 去到商品详情页
            goDetail(e) {
                console.log(e)
                // 获取被点击的DOM元素
                const target = e.target;
                // 查找最近的父元素<li>
                // closest 方法会从当前元素开始向上查找，如果找到匹配的祖先元素，则返回该元素；如果找不到匹配的祖先元素，则返回 null。
                const liElement = target.closest('li');
                // 如果存在父元素<li>，则获取商品id
                if (liElement) {
                    // 从 li 元素的 data-goodsId 属性中获取商品 ID
                    const goodsId = liElement.dataset.goodsid;
                    console.log('用户点击的商品id为：', goodsId);
                    // 如果商品 ID 存在，则跳转到 Detail 组件，并将商品 ID 作为参数传递
                    if (goodsId) {
                        this.$router.push({
                            name: 'detail',
                            params: { id: goodsId } // 将商品 ID 作为参数传递给 Detail 组件
                        });
                    }
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .search-input {
        text-align: center;
    }
    .search {
        margin: 0 auto;
        width: 80%;

        .search-panel {
            padding: 20px 0;
            background-color: #fff;
            .classify-panel {
                // height: 200px;

                .classify-item {
                    display: flex;
                    padding-top: 10px;
                    color: #303133;
                    font-size: 14px;

                    h4 {
                        width: 100px;
                        text-align: right;
                    }

                    ul {
                        display: flex;
                        flex: 1;
                        flex-wrap: wrap;
                        margin-left: 15px;

                        li {
                            padding: 0 10px;
                            margin-bottom: 10px;
                            font-weight: lighter;
                            cursor: pointer;

                            &:hover {
                                color: #5f479a;
                                font-weight: 600;
                            }
                        }
                        .active {
                            color: #5f479a;
                            font-weight: 600;
                        }
                    }
                }
            }
        }

        .info {
            background-color: #fff;
        }
    }
    .pagination {
        margin-bottom: 50px;
        text-align: center;
    }
    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #5f479a;
    }

    ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #7b5acb;
        color: #fff;
    }
</style>