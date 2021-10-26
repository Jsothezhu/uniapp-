<template>
	<view>
		<swiper indicator-dots autoplay :interval="3000" :duration="200" circular :style="getStyle">
			<block v-for="(item,key,index) in resdata" :key="index">
				<swiper-item>
					<view class="swiper-item" @tap="event(item,index)">
						<image :src="item.src" lazy-load :style="getStyle"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		computed: {
			getStyle() {
				return `height:${this.height}rpx`;
			},
			//获取图片地址,而不是对象
			getUrls() {
				return this.resdata.map((v) => v.src)
			}
		},
		props: {
			resdata: {
				type: Object / Array,
				default: ()=>{}
			},
			height: {
				type: String,
				default: "350"
			},
			preview: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			/* 预览图片接口 */
			event(item, index) {
				if (this.preview) {
					return uni.previewImage({
						current: index,
						urls: this.getUrls,
						indicator: "default"
					})
				}
			}
		}
}
</script>

<style>

</style>
