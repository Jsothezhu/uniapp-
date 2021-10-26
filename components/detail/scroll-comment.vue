<template>
	<view class="p-2">
		<scroll-view scroll-x="true" class="scroll-row">
			<view class="scroll-row-item rounded bg-light-secondary mr-3 p-2" style="width: 620rpx;height: 480rpx;"
				v-for="(item,index) in comments" :key="index">
				<view class="d-flex a-center mb-1">
					<image :src="item.userpic" mode="widthFix" style="width: 70rpx;height: 70rpx;"
						class="rounded-circle"></image>
					<view class="ml-2">
						<text class="font-md line-h">{{item.username}}</text>
						<text class="d-block line-h text-light-muted">{{item.create_time | formatTime}}</text>
					</view>
					<view class="iconfont icon-dianzan text-light-muted font pl-1 ml-auto">{{item.good_num}}</view>
				</view>
				<text class="d-block font-md mb-2">
					{{item.context}}
				</text>
				<view class="row">
					<view class="span24-8 px-2" v-for="(img,i) in item.imglist" :key="i">
						<image :src="img" mode="widthFix" style="height:115rpx;"></image>
					</view>

				</view>
			</view>
		</scroll-view>
			<view class="d-flex j-center py-2 mt-2 text-primary bg-light"
			@click="open">
				更多评论 <view class="iconfont icon-you"></view>
			</view>

	</view>
</template>

<script>
	import $T from "@/comment/lib/time.js"
	export default {
		props: ["comments",'goods_id'],
		filters: {
			formatTime(value) {
				return $T.gettime(value)
			}
		},
		methods:{
			open(){
				uni.navigateTo({
					url: '/pages/detail-comment/detail-comment?id='+this.goods_id,
				});
			}
		}
	}
</script>

<style>
</style>
