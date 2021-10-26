<template>
	<view class="d-flex border-top border-light-secondary" style="height: 100%; box-sizing: border-box;">

		<loading-plus v-if="beforeReady"></loading-plus>

		<!-- 左侧 -->
		<scroll-view id="leftScroll" scroll-y="true" style="flex: 1; height: 100%;"
			class="border-right border-light-secondary" :scroll-top="leftScrollTop">
			<view class="border-bottom border-light-secondary py-1 left-scroll-item" hover-class="bg-light-secondary"
				v-for="(item,index) in cart" :key="index">
				<view class="py-1 text-center text-light-muted" :class="activeIndex===index ? 'class-active':''"
					@tap="changeCate(index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 右侧 -->
		<scroll-view scroll-y="true" style="flex: 3.5;height: 100%;" :scroll-top="rightScrollTop"
			:scroll-with-animation="true" @scroll="onRightScroll">
			<view class="row right-scroll-item" v-for="(item,index) in list" :key='index'>
				<view class="span24-8 text-center py-2" v-for="(item2,index2) in item.list" :key="index2"
				@click="openDetail(item2)">
					<image :src="item2.cover" style="width: 120upx;height: 120upx;"></image>
					<text class="d-block">{{item2.name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import loading from "@/comment/mixin/loading.js"
	import $H from "@/comment/lib/request.js"
	export default {
		mixins: [loading],
		data() {
			return {
				//是否显示loading
				showloading: true,
				//当前选中
				activeIndex: 0,
				//分类
				cart: [],
				list: [],
				//左侧分类和右侧商品到顶端的距离
				leftDomsTop: [],
				rightDomsTop: [],
				//右边scrolltop高度
				rightScrollTop: 0,
				//分类高度
				cateItemHeight: 0,
				//左边scrolltop高度
				leftScrollTop: 0,
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			//获取节点信息
			getEleInfo(obj = {}) {
				return new Promise((res, rej) => {
					let option = {
						size: obj.size ? true : false,
						rect: obj.rect ? true : false,
						scrollOffset: obj.scrollOffset ? true : false,
					}
					const query = uni.createSelectorQuery().in(this);
					let q = obj.all ? query.selectAll(`.${obj.all}-scroll-item`) : query.select('#leftScroll')
					q.fields(option, data => {
						res(data)
					}).exec();

				})

			},
			async getData() {
				await $H.get('/category/app_category').then(res => {
					let cate = []
					let list = []
					res.forEach(v => {
						cate.push({
							id: v.id,
							name: v.name,
						})
						list.push({
							list: v.app_category_items
						})
					})
					this.cart = cate
					this.list = list
				})
				//隐藏loading,要渲染之后
				this.$nextTick(() => {
					//拿到左右每个分类距离顶部的数组
					this.getEleInfo({
						all: "left",
						size: true,
						rect: true
					}).then(data => {
						this.leftDomsTop = data.map(v => {
							this.cateItemHeight = v.height
							return v.top
						})
					})
					this.getEleInfo({
						all: "right",
						size: false,
						rect: true
					}).then(data => {
						this.rightDomsTop = data.map(v => v.top)
					})
					this.showloading = false
				})
			},
			//点击左边分类
			changeCate(index) {
				this.activeIndex = index;
				//右边scroll-view滚动到对应区块
				this.rightScrollTop = this.rightDomsTop[index];
			},
			//监听右边滚动事件
			async onRightScroll(e) {
				//匹配当前的scrollTop所处的索引,v为数组里的高度,k为索引
				this.rightDomsTop.forEach((v, k) => {
					if (v < e.detail.scrollTop + 3) {
						this.activeIndex = k
						return false
					}
				})
			},
			//打开详情页
			openDetail(item){
				
				uni.navigateTo({
					url:"/pages/detail/detail?datail="+JSON.stringify({
						id:item.goods_id,
						title:item.name
					})
				})
			}
		},
		watch: {
			async activeIndex(newValue, oldValue) {
				//获取scroll-view高度，scrollTop
				let data = await this.getEleInfo({
					size: true,
					scrollOffset: true
				})
				//获取高度和顶端高度
				let H = data.height
				let ST = data.scrollTop
				//当前top值
				//this.leftDomsTop[newValue] = this.cateItemHeight
				//下边超出
				if (this.leftDomsTop[newValue] + this.cateItemHeight > H + ST) {
					return this.leftScrollTop = this.leftDomsTop[newValue] + this.cateItemHeight - H
				}
				//上边超出
				if (ST > this.cateItemHeight) {
					this.leftScrollTop = this.leftDomsTop[newValue]
				}
			}
		}
	}
</script>

<style>
	.class-active {
		border-left: 8upx solid #FD6801;
		color: #FD6801 !important;
	}
</style>
