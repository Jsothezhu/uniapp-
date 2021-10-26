<template>
	<view>
		<!-- #ifdef MP -->
		<!-- 小程序端自定义导航 -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 左边 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="iconfont icon-xiaoxi"></text>
			</view>
			<!-- 中间 -->
			<view class="flex-1 bg-light text-light-muted rounded" style="height: 65rpx;"
			@click="openSearch">
				<text class="iconfont icon-sousuo mx-2 "></text>
				智能积木
			</view>
			<!-- 右边· -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="iconfont icon-richscan_icon"></text>
			</view>
		</view>
		<!-- #endif -->
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x show-scrollbar=false class="scroll-row border-bottom" style="height: 80upx;"
			:scroll-into-view="scollinto" :scroll-with-animation="true">
			<view class="scroll-row-item px-3" @click="changeTab(index)" style="height: 80upx;line-height: 80upx;"
				v-for="(item,index) in tabBars" :key='index' :class="tabIndex === index ? 'main-text-color':''"
				:id="'tab'+index">
				<text class="font-md">{{item.name}}</text>
			</view>
		</scroll-view>
		<!-- 选项卡对应界面 -->
		<swiper :duration="150" :current="tabIndex" :style="'height:'+scrollH+'px;'" @change="onChangeTab">
			<swiper-item v-for="(item,index) in newitems" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'" @scrolltolower="loadmore(index)">
					<template v-if="item.list.length >0">
						<block v-for="(list,listIndex) in item.list" :key='listIndex'>
							<!-- 轮播图组件 -->
							<swiperImage v-if="list.type==='swiper'" :resdata="list.data" />
							<template v-else-if="list.type==='indexnavs'">
								<!-- 首页分类 -->
								<indexNav :resdata="list.data" />
								<!-- 全局分割线 -->
								<divider />
							</template>
							<template v-else-if="list.type==='threeAdv'">
								<!-- 三图广告 -->
								<threeAdv :resdata="list.data" />
								<divider />
								<!-- 基础卡片组件 -->
								<card headTitle="每日精选" bodyCover="/static/images/demo/demo4.jpg"></card>
							</template>

							<!-- 公共列表组件 750-5=745   372.5 -->
							<view class="row j-sb" v-else-if="list.type === 'list'">
								<block v-for="(item1,key,index1) in list.data" :key="index1">
									<commonList :item='item1' :index="index1"></commonList>
								</block>
							</view>
						</block>

						<!-- 上拉加载更多 -->
						<view class="d-flex a-center j-center text-light-muted font-md py-3">
							{{item.loadtext}}
						</view>
					</template>
					<template v-else-if="item.firstload === 'before'">
						<view class="d-flex j-center a-center pt-5">
							<text class="font-md text-light-muted">加载中</text>
						</view>
					</template>
					<template v-else>
						<!-- 空数据 -->
						<view class="d-flex j-center a-center pt-5">
							<text class="font-md text-light-muted">暂无数据</text>
						</view>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import swiperImage from "@/components/index/swiper-image.vue"
	import indexNav from "@/components/index/index-nav.vue"
	import threeAdv from "@/components/index/three-adv.vue"
	import card from "@/components/common/card.vue"
	import commonList from "@/components/common/common-list.vue"
	import $H from "@/comment/lib/request.js"
	export default {
		components: {
			swiperImage,
			indexNav,
			threeAdv,
			card,
			commonList
		},
		data() {
			return {
				scollinto: "",
				//scroll-into-view滑动到对于的id的一块,用来让上方导航发生改变
				scrollH: 500, //剩余可视高度
				tabIndex: 0,
				tabBars: [],
				//存放页面	
				newitems: [],
			}
		},
		onLoad() {
			//获取可视区域高度
			uni.getSystemInfo({
				success: (res) => {
					//#ifdef MP
					let navbarH = 0
					//#endif
					//#ifndef MP
					let navbarH = uni.upx2px(90)
					//#endif
					this.scrollH = res.windowHeight - navbarH
				}
			})
			//初始化事件
			this.__init()

		},
		/* 监听搜索栏点击 */
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: "../search/search"
			})
		},
		methods: {
			//初始化事件
			__init() {
				$H.get("/index_category/data").then((res) => {
					//获取顶部选项卡
					this.tabBars = res.category
					//根据顶部选项卡生成页面
					let arr = [];
					for (var i = 0; i < this.tabBars.length; i++) {
						let firstload = i === 0 ? 'after' : 'before'
						let obj = {
							list: [],
							//1上拉加载更多 2加载中3没有更多了
							loadtext: "上拉加载更多",
							//首次加载，before加载前 ing加载中
							firstload: firstload
						}
						//获取首屏数据
						if (i === 0) {
							obj.list = res.data;
							obj.firstload = 'after'
						}
						arr.push(obj)
					}
					this.newitems = arr
				})
			},
			//切换选项卡
			changeTab(index) {
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index
				this.scollinto = "tab" + index;
				//防止首屏重复加载
				if (this.newitems[index].firstload === 'after') {
					return;
				}
				this.addData()
			},
			//监听滑动列表
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			//加载数据
			async addData(callback = false) {
				//拿到当前索引
				let index = this.tabIndex;
				let obj = this.newitems[index]
				//拿到当前分类id
				let id = this.tabBars[index].id
				//拿到当前分类的分页数
				let page = Math.ceil(this.newitems[index].list.length / 5) + 1
				//请求前
				if(page === 1){
					obj.loadtext = 'ing'
				}
				//请求数据
				let data = await $H.get('/index_category/' + id + '/data/' + page)
				
				obj.firstload = 'after'
				if (data) {
					//赋值
					obj.list = [...obj.list, ...data]
					obj.loadtext = data.length < 5 ? '没有更多了' : '上拉加载更多'
					//执行回调函数
					if (typeof callback === 'function') {
						callback()
					}
				}
			},
			//上拉加载更多
			loadmore(index) {
				let item = this.newitems[index]
				console.log(item.loitemadtext !== "上拉加载更多")
				//是否可加载状态
				if (item.loitemadtext == "上拉加载更多") {
					return;
				}
				//模拟加载
				item.loadtext = "加载中..."

				this.addData(() => {
					uni.showToast({
						title: "加载成功"
					})
				})
			},
			openSearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			}
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
