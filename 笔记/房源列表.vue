<template>
    <view class="intention-box" v-for="(item, index) in houseList" :key="index">
        <u-row :gutter="10">
            <!-- 房源图片 -->
            <u-col span="4">
                <u--image width="100%" height="80" :src="`${baseUrl + item.LOGO}`"></u--image>
            </u-col>
            <!-- 房源信息 -->
            <u-col span="8">
                <view class="resource-region">{{ item.FYMC }}</view>
                <view class="resource-info">房源编号：{{ item.FYBH }}</view>
                <view class="resource-info text-overflow">详细地址：{{ item.XXDZ }}</view>
            </u-col>
        </u-row>

        <u-line margin="2vh 0 0 0"></u-line>

        <u-row justify="space-between" class="opr-content" customStyle="margin-bottom: 10px">
            <!-- 最后修改时间 -->
            <u-col span="9">
                <view class="demo-layout bg-purple-light">
                    <p class="time">
                        <text class="iconfont icon-shijian" style="color: #909399;"></text>
                        {{ item.XGSJ }}
                    </p>
                </view>
            </u-col>
            <!-- 审核状态 -->
            <!-- <u-col span="3">
						<view class="audit-status">
							<u-button size="mini" type="primary" text="已登记"></u-button>
						</view>
					</u-col> -->
        </u-row>
    </view>
</template>

<script>
    export default {

    }
</script>

<style>

</style>