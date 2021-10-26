<template>
	<view style="background: #f5f5f5;">
		<view class="d-flex flex-column j-center a-center py-5 my-3">
			<image src="../../static/images/demo/cate_02.png" mode="widthFix"
			style="width: 100rpx; height: 100rpx;"></image>
			<view class="text-light-muted font-md">
				xxx商城 1.0.0
			</view>
		</view>
		<view class="bg-white">
			<uniListItem title="版本更新" showArrow></uniListItem>
			<uniListItem title="版本更新" showArrow></uniListItem>
			<uniListItem title="版本更新" showArrow></uniListItem>
			<uniListItem title="版本更新" showArrow></uniListItem>
			<uniListItem title="版本更新" showArrow></uniListItem>
			<uniListItem title="版本更新" showArrow></uniListItem>
			<uniListItem title="版本更新" showArrow></uniListItem>			
		</view>
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components:{
			uniListItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
