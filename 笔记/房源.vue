<template>
    <!-- 房源管理页面 -->
    <view class="content-page">
        <scroll-view style="height: 95vh;" :scroll-y="true" refresher-enabled="true" @refresherrefresh="OnRefresh"
            :refresher-triggered="trigger" refresher-threshold="100" @scrolltolower="loadMore">
            <view v-if="!inited" class="loading">加载中...</view>
            <!-- 没有找到您想要的内容 -->
            <view v-if="inited && houseList.length === 0">
                <u-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png" text="没有找到您想要的内容"
                    marginTop="5vh"></u-empty>
            </view>

            <!-- 房源列表 -->
            <view class="intention-box" v-for="(item, index) in houseList" :key="index">
                <view class="card-top">
                    <view class="img">
                        <u--image width="100%" height="100" :src="`${baseUrl + item.LOGO}`" radius="5"></u--image>
                    </view>
                    <view class="card-content">
                        <view class="resource-region">{{ item.FYMC }}</view>
                        <view class="resource-info">房源编号：{{ item.FYBH }}</view>
                        <view class="resource-info">详细地址：{{ item.XXDZ }}</view>
                    </view>
                </view>
                <u-line margin="1vh 0"></u-line>
                <view class="card-bottom">
                    <view class="time">
                        <text class="iconfont icon-shijian" style="color: #909399;"></text>
                        <text style="color: #909399;font-size: 24rpx;">{{ item.XGSJ }}</text>
                    </view>
                </view>
            </view>

            <view class="load-more" v-if="!isAllLoad && isBottom">加载中...</view>
            <view v-if="houseList.length != 0 && isAllLoad" class="nomore">没有更多了</view>
        </scroll-view>
    </view>
</template>

<script>
import config from '../../common/config.js'
export default {
    data() {
        return {
            houseList: [],    // 房源数据列表
            params: {
                pageNo: '1', // 当前页码
                pageSize: '5', // 每页数量
            },
            inited: false, // 数据是否成功从服务器返回
            trigger: false, // 下拉刷新状态
            total: 0, // 数据总数
            isBottom: false,
            baseUrl: '',     // 图片基础路径
        }
    },
    computed: {
        totalPage() { // 总页数
            return Math.ceil(this.total / this.params.pageSize * 1)
        },
        isAllLoad() { // 是否已全部加载完毕
            return this.houseList.length === this.total ? true : false
        },
    },
    onLoad() {
        this.baseUrl = config.uploadUrl + 'dingdian/rlease'
        this.getHouseList() // 获取房源数据列表
    },
    methods: {
        // 获取房源数据列表
        getHouseList() {
            this.$u.api.getResource(this.params).then(
                res => {
                    if (res.code === 200) {
                        this.trigger = false
                        this.isBottom = false
                        this.inited = false
                        this.houseList = this.houseList.concat(res.rows)
                        this.total = res.total // 存储数据总数
                        this.inited = true // 数据成功返回
                    }
                },
                err => {
                    console.log('获取失败')
                }
            )
        },

        // 滚动到底部获取更多数据
        loadMore() {
            // console.log('到底部了');
            this.isBottom = true
            this.params.pageNo = String(this.params.pageNo * 1 + 1)
            if (this.params.pageNo * 1 > this.totalPage) {
                // console.log('没有更多数据了');
            } else {
                this.getHouseList()
            }
        },

        // 下拉刷新
        OnRefresh() {
            // console.log('下拉刷新了')
            this.trigger = true // 下拉刷新状态
            this.inited = false
            this.total = 0 // 置空
            this.params.pageNo = '1' // 回到第一页
            this.houseList = [] // 置空列表
            this.getHouseList() // 重新获取数据
        },
    }
}
</script>

<style scoped lang="less">
@import url('../../static/iconfont/iconfont.css');

.content-page {
    background-color: #f0f1f5;
    height: 100vh;
    padding: 1.5vh 1vh 1vh 1vh;
}

::v-deep .u-reset-button::after {
    border: none;
}

.intention-box {
    margin-bottom: 1vh;
    padding: 1vh;
    background: white;
    border-radius: 5px;

    .card-top {
        display: flex;
        align-items: center;

        .img {
            flex: 1;
        }

        .card-content {
            flex: 2;
            margin-left: 1vh;
            // 设置文字显示异常
            word-break: break-all;

            .resource-region {
                font-size: 30rpx;
                margin-bottom: 1vh;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .resource-info {
                font-size: 28rpx;
                margin-bottom: 1vh;
                color: #909399;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
    }

    .time {
        display: flex;
        align-items: center;
    }
}

.load-more,
.nomore {
    color: #9E9E9E;
    font-size: 28rpx;
    text-align: center;
}

.loading {
    color: #9E9E9E;
    text-align: center;
    padding-top: 2vh;
}
</style>
