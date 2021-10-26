<template>
	<!-- 左边w373 h530 -->
	<!-- 右边w373 h263 边h2-->
	<view class="d-flex">
		<image :src="resdata[0].src" lazy-load
		style="width: 373upx;height: 530upx;border-right:2upx solid #f5f5f5;"></image>
		<view class="d-flex flex-column">
			<image :src="resdata[1].src" 
			style="width: 375upx; height: 263upx;border-bottom: 2upx solid #f5f5f5;"
			/>
			<image :src="resdata[2].src" 
			style="width: 375upx; height: 263upx;border-bottom: 2upx solid #f5f5f5;"
			/>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			resdata:Object
		},
		computed:{
		
		}
	}
</script>

<style>
</style>
