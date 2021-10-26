<template>
	<view class="p-2">
		<!-- 标题 -->
		<view class="font-lg text-dark my-3 px-2">{{detail.title}}</view>
		<!-- 内容 -->
		<view>内容</view>
		<uParse className="uparse" :content="context" @preview="preview"
		@navigate="navigate"></uParse>
	</view>
</template>

<script>
	var htmlString=`<p>
		<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp" alt="">
		<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp" alt="">
		<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp" alt="">
		<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp" alt="">
		<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp" alt="">
	</p>`
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue"
	export default {
		components:{
			uParse
		},
		data() {
			return {
				detail:{},
				context:htmlString,
			}
		},
		methods: {
			preview(src ,e){
				console.log("src:"+src)
			},
			navigate(href,e){
				uni.showModal({
					content:"点击链接",
					showCancel:false
				})
			},
		},
		onLoad(e){
			if(!e.detail){
				return uni.navigateBack({
					delta:1
				});
			}
			//初始化数据
			this.detail = JSON.parse(e.detail)
			//设置页面标题
			uni.setNavigationBarTitle({
				title:this.detail.title
			})
		}
	}
</script>

<style>

</style>
