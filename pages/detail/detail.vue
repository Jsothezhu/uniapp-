<template>
	<view>
		<!-- 商品详情大图 -->
		<swiperImage :resdata="banners" height="750" :preview="true"></swiperImage>
		<!-- 基础详情 -->
		<baseInfo :detail="detail" :show-price="showPrice"></baseInfo>
		<!-- 滚动商品特性 w170 h110 -->
		<scrollAttrs :baseAttrs="baseAttrs"></scrollAttrs>
		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-light-secondary">
				<uni-list-item v-if="detail.sku_type === 1">
					<view class="d-flex" @tap="show('attr')">
						<text class="mr-2 text-muted">已选</text>
						<text>{{checkedSkus}}</text>
					</view>
				</uni-list-item>
				<uni-list-item @click="goToCoupon" link>
					<view class="d-flex">
						<text class="mr-2 text-muted">优惠劵</text>
						<text class="main-text-color">马上领取</text>
					</view>
				</uni-list-item>
				<uni-list-item>
					<view class="d-flex" @click="show('express')">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京</text>
						<text class="main-text-color">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item>
					<view @tap="show('servive')" class="d-flex">
						<view class="d-flex a-center">
							<view class="text-muted font d-flex a-center mr-2">
								<view class="iconfont icon-finish main-text-color"></view>
								小米直营
							</view>
						</view>
						<view class="d-flex a-center">
							<view class="text-muted font d-flex a-center mr-2">
								<view class="iconfont icon-finish main-text-color"></view>
								小米直营
							</view>
						</view>
						<view class="d-flex a-center">
							<view class="text-muted font d-flex a-center mr-2">
								<view class="iconfont icon-finish main-text-color"></view>
								七天无理由退货
							</view>
						</view>
					</view>

				</uni-list-item>
			</view>
		</view>
		<!-- 横向滚动评论 -->
		<scrollComment :goods_id="detail.id" :comments="comments"></scrollComment>
		<!-- 商品详情 -->
		<view class="py-4">
			<uParse className="uparse" :content="context" @preview="preview" @navigate="navigate"></uParse>
		</view>
		<!-- 为你推荐 -->
		<card headTitle="为你推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<commonList v-for="(item,index) in hotList" :key="index" :item="item" :index="index"
				type="redirectTo"></commonList>
			</view>
		</card>
		<!-- 底部操作条 -->
		<view style="height: 100rpx;"></view>
		<bottomBtn @show="show('attr')"></bottomBtn>
		<!-- 弹出框 -->
		<!-- 属性筛选框 -->
		<commonPopup :popupClass="popup.attr" @hide="hide('attr')">
			<!-- 价格部分 -->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix" style="width: 180rpx; height: 180rpx;"
					class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font" :price="showPrice"></price>
					<text class="d-block">{{checkedSkus}}</text>
				</view>
			</view>
			<!-- 表单部分 -->
			<scroll-view scroll-y class='w-100' style="height: 660rpx;">
				<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false"
					v-for="(item,index) in selects" :key="index">
					<zcmradioGroup :label="item" :selected.sync='item.selected'></zcmradioGroup>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :max="maxStock" :value="detail.num" @change="detail.num = $event">
					</uni-number-box>
				</view>
				<!--按钮  -->
			</scroll-view>
			<view class="text-white font-md d-flex a-center j-center" :hover-class="maxStock !==0 ? 'main-bg-hover-color':''"
				style="height: 100rpx; margin-left: -20rpx; margin-right: -20rpx;"
				 :class="maxStock === 0?'bg-secondary':'main-bg-color'" @tap.stop="addCart">
				{{maxStock === 0 ? '暂无库存':'加入购物车'}}
			</view>
		</commonPopup>
		<!-- 收货地址模态框 -->
		<commonPopup :popupClass="popup.express" @hide="hide('express')">
			<view class="d-flex j-center a-center font-md border-bottom border-light-secondary" style="height: 100rpx;">
				收货地址
			</view>
			<scroll-view scroll-y class='w-100' style="height: 835rpx;">
				<uni-list-item direction="column" v-for="(item,index) in pathList" showArrow :key="index">
					<view class="iconfont icon-dingwei font-weight">{{item.name}}</view>
					<view class="font text-light-muted">{{item.path}} {{item.detailPath}}</view>
				</uni-list-item>
			</scroll-view>
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx; margin-left: -20rpx; margin-right: -20rpx;" @tap="openCreatePath">
				选择新的地址
			</view>
		</commonPopup>
		<!-- 服务说明 -->
		<commonPopup :popupClass="popup.servive" @hide="hide('servive')">
			<view class="d-flex j-center a-center font-md border-bottom border-light-secondary" style="height: 100rpx;">
				服务说明
			</view>
			<scroll-view scroll-y class='w-100' style="height: 835rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-1"></view>
						小米自营
					</view>
					<text class="text-light-muted font pl-4">
						不管就2323
					</text>
				</view>
			</scroll-view>
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx; margin-left: -20rpx; margin-right: -20rpx;" @tap="hide('servive')">
				确定
			</view>
		</commonPopup>
	</view>
</template>
<script>
	import swiperImage from "@/components/index/swiper-image.vue"
	import baseInfo from "@/components/detail/base-info.vue"
	import scrollAttrs from "@/components/detail/scroll-attrs.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import scrollComment from "@/components/detail/scroll-comment.vue"
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue"
	import card from "@/components/common/card.vue"
	import commonList from "@/components/common/common-list.vue"
	import bottomBtn from "@/components/detail/bottom-btn.vue"
	import commonPopup from "@/components/common/common-popup.vue"
	import price from "@/components/common/price.vue"
	import zcmradioGroup from "@/components/common/radio-group.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import $H from "@/comment/lib/request.js"

	import {
		mapMutations,
		mapState
	} from "vuex"
	export default {
		components: {
			swiperImage,
			baseInfo,
			scrollAttrs,
			uniListItem,
			scrollComment,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			zcmradioGroup,
			uniNumberBox
		},
		data() {
			return {
				/* 商品属性选择列表 */
				selects: [],
				/* 是否弹出 */
				popup: {
					attr: 'none',
					express: "none",
					servive: 'none',
				},
				banners: [],
				detail: {
					id: "20",
					title: "小米MiX3",
					desc: "磁动力滑盖全面屏/前后期间AI双设",
					cover: "/static/images/demo/list/1.jpg",
					pprice: 3500,
					num: 1,
					max: 100
				},
				baseAttrs: [],
				comments: [],
				hotList: [],
				/* 富文本内容 */
				context: "",
			}
		},
		/* 监听页面返回事件 */
		onBackPress() {
			//关闭模态框
			for (let key in this.popup) {
				if (this.popup[key] !== 'none') {
					this.hide(key)
					this.popup[key]
					return true;
				}
			}

		},
		computed: {
			...mapState({
				pathList: state => state.path.list
			}),
			//选中的sku
			checkedSkus() {
				let checkedSkus = this.selects.map(v => {
					return v.list[v.selected].name
				})
				return checkedSkus.join(',')
			},
			//选中skus的索引
			checkedSkusIndex() {
				if (!Array.isArray(this.detail.goodsSkus)) {
					return -1
				}
				//通过索引找到和选中内容相同的skustext
				let index = this.detail.goodsSkus.findIndex((item) => {
					return item.skusText === this.checkedSkus
				})
				return index
			},
			//显示价格
			showPrice() {
				//单规格
				if (this.detail.sku_type === 0) {
					return this.detail.stock
				}
				//拿到选中的skus组成的字符串
				if (this.checkedSkusIndex < 0) {
					return this.detail.min_price || 0.00
				}

				return this.detail.goodsSkus[this.checkedSkusIndex].pprice
			},
			//最大库存
			maxStock() {
				if (Array.isArray(this.detail.goodsSkus)) {
					return 100
				}
				return this.detail.goodsSkus[this.checkedSkusIndex].stock || 100
			}
		},
		methods: {
			...mapMutations([
				'addGoodsToCart'
			]),
			//初始化方法
			async __init(data) {
				await $H.get('/goods/' + data.id).then(res => {
					//轮播图
					this.banners = res.goodsBanner.map(v => {
						return {
							src: v.url
						}
					})
					//初始化基本信息
					this.detail = res
					//修改页面标题
					uni.setNavigationBarTitle({
						title: res.title
					})
					//滚动商品属性
					this.baseAttrs = res.goodsAttrs.map(v => {
						return {
							icon: "icon-cpu",
							title: v.name,
							desc: v.value,
						}
					})
					//热门评论
					this.comments = res.hotComments.map(v => {
						return {
							id: v.id,
							user_id: v.user.id,
							userpic: v.user.avatar,
							username: v.user.nickname,
							create_time: v.review_time,
							good_num: v.goods_num,
							context: v.review.data,
							imglist: v.review.image
						}
					})
					//商品详情
					this.context = res.content
					//热门推荐
					this.hotList = res.hotList.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							pprice: v.min_oprice,
							oprice: v.min_price
						}
					})
					if (this.detail.sku_type === 1) {
						//商品规格
						this.selects = res.goodsSkusCard.map(v => {
							let list = v.goodsSkusCardValue.map(v1 => {
								return {
									id: v1.id,
									name: v1.value
								}
							})
							return {
								id: v.id,
								title: v.name,
								selected: 0,
								list: list
							}
						})
						//商品规格（匹配价格）
						this.detail.goodsSkus.forEach(item => {
							let arr = []
							for (let key in item.skus) {
								arr.push(item.skus[key].value)
								//把数组转化为逗号的字符串
							}
							item.skusText = arr.join(',')
						})
					}
				}).catch((e) => {
					console.log(e);
				})
			},
			preview(src, e) {
				console.log("src:" + src)
			},
			navigate(href, e) {
				uni.showModal({
					content: "点击链接",
					showCancel: false
				})
			},
			//点击跳转创建地址
			openCreatePath() {
				uni.navigateTo({
					url: '../user-path-edit/user-path-edit'
				})
				this.hide('express')
			},
			/* 是否隐藏弹窗 */
			hide(key) {
				this.popup[key] = "hide"
				setTimeout(() => {
					this.popup[key] = 'none'
				}, 200)
			},
			show(key) {
				this.popup[key] = "show"
			},
			/* 加入购物车 */
			addCart() {
				//没有库存
				if(this.maxStock === 0){
					return;
				}
				$H.post('/cart',{
					shop_id:this.detail.sku_type === 0 ? this.detail.id : 
					this.detail.goodsSkus[this.checkedSkusIndex].id,
					skus_type:this.detail.sku_type,
					num:this.detail.num
					},{
					token:true
				}).then(res=>{
					//通知购物车页面更新数据
					uni.$emit("updateCart")
					/* //组织数据
					let goods = this.detail
					goods['checked'] = false
					goods['attrs'] = this.selects
					//加入购物车
					this.addGoodsToCart(goods) */
					//隐藏筛选框
					this.hide('attr')
					//成功提示
					uni.showToast({
						title: "提交成功"
					})
				})
				
			},
			//进入领取优惠劵页面
			goToCoupon(){
				//验证登录后再领取
				this.navigateTo({
					url:"../coupon/coupon",
				})
			}
		},
		onLoad(e) {

			if (e.datail) {
				//拿到参数装换为对象
				this.__init(JSON.parse(e.datail))
			}
		}
	}
</script>

<style>
	.uparse .p {
		padding: 0 !important;
	}

	.uparse view {
		line-height: 0 !important;
	}
</style>
