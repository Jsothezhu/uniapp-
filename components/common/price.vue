<template>
	<view class="d-flex a-self-start font-md line-h"
	:class="priceSize+' '+color">
		<text class="a-self-start font-sm" :class="unitSize">￥</text>{{price}}
	</view>
</template>

<script>
	export default{
		props:{
			priceSize:{
				type:String,
				default:"font-md"
			},
			unitSize:{
				type:String,
				default:"font-sm"
			},
			color:{
				type:String,
				default:"main-text-color"
			},
			price:[Number,String]
		}
	}
</script>

<style>
</style>
