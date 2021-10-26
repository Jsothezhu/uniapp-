<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-5 my-3">
			<text class="iconfont icon-iconfontxuanzhong4 main-text-color line-h" style="font-size: 180rpx;"></text>
			<text class="text-dark font-lg">支付成功</text>
		</view>
		<view class="px-5">
			<view class=" main-bg-color text-white text-center font-md w-100 py-2 mt-3 rounded"
				hover-class="main-bg-hover-color" @click="openDetail">
				查看订单
			</view>
			<view class=" border text-center font-md w-100 py-2 mt-3 rounded" @click="openIndex" hover-class="bg-light">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0
			}
		},
		methods: {
			openIndex(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			openDetail(){
				uni.navigateBack({
					delta:1
				})
			}
		},
	}
</script>

<style>

</style>
