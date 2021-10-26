<template>
	<view class="p-2">
		<view class="font-lg">{{detail.title}}</view>
		<view class="font text-light-muted mb-3 line-h-sm">
			{{detail.desc}}
		</view>
		<price :price="showPrice" priceSize="font-lg" unitSize="font"></price>
	</view>
</template>

<script>
	import price from "../../components/common/price.vue"
	export default{
		components:{
			price
		},
		props:['detail','showPrice']
	}
</script>

<style>
</style>
