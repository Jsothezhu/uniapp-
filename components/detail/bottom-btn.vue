<template>
	<view class="d-flex a-stretch bg-white position-fixed left-0 bottom-0 right-0"
	style="height: 100rpx; z-index: 100;">
		<view class="d-flex flex-column a-center j-center line-h-sm flex-1" hover-class="bg-light-secondary">
			<view class="iconfont icon-xihuan text-muted" ></view>
			收藏
		</view>
		<view class="d-flex flex-column a-center j-center line-h-sm flex-1 position-relative" hover-class="bg-light-secondary">
			<view class="iconfont icon-gouwuche text-muted" @tap="ToCart"></view>
			<view class="position-absolute" style="left: 100rpx; top:0;"
			v-if="cartCount === '99+' || cartCount > 0">
				<uni-badge :text="cartCount" type="error" size="small"></uni-badge>
			</view>			
			购物车
		</view>
		<view class="d-flex flex-column a-center j-center main-bg-color text-white"
		 hover-class="main-bg-hover-color" style="flex: 2.5;"
		 @tap="$emit('show')">
			加入购物车
		</view>
	</view>	
</template>

<script>
	import uniBadge from "@/components/uni-ui/uni-badge/uni-badge.vue"
	import {mapGetters} from "vuex"
	export default{
		components:{
			uniBadge
		},
		computed:{
			...mapGetters(['cartCount'])
		},
		methods:{
			ToCart(){
				uni.switchTab({
					url:'../../pages/cart/cart'
				})
			}
			
		}
	}
</script>

<style>
</style>
