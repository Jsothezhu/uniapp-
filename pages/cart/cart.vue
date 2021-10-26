<template>
	<view style="background: #f5f5f5;">
		<!-- 在第一次加载时页面白屏 -->
		<loading-plus v-if="beforeReady"></loading-plus>
		<uni-nav-bar :rightText="isEdit?'完成':'编辑'" title="购物车" statusBar :shadow="false" :fixed="true"
			@clickRight="isEdit = !isEdit"></uni-nav-bar>
		<!-- 购物车为空 -->
		<view class="py-5 d-flex a-center j-center bg-white" v-if="disableSelectAll">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50upx;"></view>
			<text class="text-light-muted mx-2">购物车为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">
				去逛逛
			</view>
		</view>
		<!-- 购物车商品列表 -->
		<view class="bg-white px-2" v-else>
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item,index) in list"
				:key="index">
				<label class="radio d-flex a-center flex-shrink" style="width: 80upx;height: 80upx;"
					@click="selectItem(index)">
					<radio :value="string(item.id)" :checked="item.checked" :disabled="disableSelectAll"
						color="#fd6801" />
				</label>
				<image :src="item.cover" mode="widthFix" style="height: 150upx;width: 150upx;"
					class="border border-light-secondary rounded p-2"></image>
				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">
						{{item.title}}
					</view>
					<!-- 属性规格 -->
					<view class="d-flex text-light-muted mb-1" :class="isEdit? 'p-1 bg-light-secondary mb-2':''"
						@tap.stop="showPopup(index,item)" v-if="item.skus_type === 1">
						{{item.skusText}}

						<view class="iconfont icon-bottom font ml-auto" v-if="isEdit"></view>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price :price="item.pprice"></price>
						<view class="a-self-end">
							<uniNumberBox :min="item.minnum" :value="item.num" :max="item.maxnum"
								@change="changeNum($event,item,index)"></uniNumberBox>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="text-center main-text-color font-md font-weight mt-5">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary mb-3 pt-3">
			<view style="background: #f5f5f5; z-index: 2;" class="px-2 position-absolute">
				买了的人还买了</view>
			<view class="position-absolute" style="height: 1px;left: 0; right: 0; background-color: #ddd;">

			</view>
		</view>
		<!-- 为你推荐 -->
		<view class="row j-sb bg-white">
			<commonList v-for="(item,index) in hotList" :key="index" :item="item" :index="index"></commonList>
		</view>

		<!-- 合计和收藏 -->
		<view style="height: 200upx;background:white;"></view>
		<view class="d-flex position-fixed left-0 right-0 border-top border-light-secondary a-stretch bg-white"
			style="height: 100upx;z-index: 1000;bottom: 119upx;">
			<label class="radio d-flex a-center flex-shrink" style="width: 120upx" @click="doSelectAll">
				<radio color="#fd6801" :checked="checkedAll" />
			</label>
			<template v-if="isEdit == true">
				<view class="flex-1 d-flex a-center j-center font-md main-bg-color text-white">
					移入收藏
				</view>
				<view class="flex-1 d-flex a-center j-center bg-danger text-white font-md"
					hover-class="main-bg-hover-color" @tap="doDelGoods">
					删除
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center j-center font-md">
					合计 <price :price="totalPrice" style="margin-top: 15px;"></price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md"
					hover-class="main-bg-hover-color" @tap="orderConfirm">
					结算
				</view>
			</template>
		</view>

		<!-- 属性筛选框 -->
		<sku-popup></sku-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import loading from "@/comment/mixin/loading.js"
	import price from "@/components/common/price.vue"
	import uniNumberBox from "../../components/uni-ui/uni-number-box/uni-number-box.vue"
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from "vuex"
	import commonList from "@/components/common/common-list.vue"
	import $H from "@/comment/lib/request.js"
	import skuPopup from "@/components/cart/sku-popup.vue"
	export default {
		mixins: [loading],
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			commonList,
			skuPopup
		},
		data() {
			return {
				isEdit: false,
				hotList: [],
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				selectedList: state => state.cart.selectedList
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				'disableSelectAll'
			]),
			string() {
				return (id) => {
					return id.toString()
				}
			},
		},
		methods: {
			changeNum(e, item, index) {
				//如果num本来就是这个数量就不去请求后端
				if (item.num === e) return
				uni.showLoading({
					title: "加载中..."
				})
				$H.post('/cart/updatenumber/' + item.id, {
					num: e
				}, {
					token: true
				}).then(res => {
					console.log(res);
					item.num = e
					uni.hideLoading()
				})
			},
			//订单结算
			orderConfirm() {
				if (this.selectedList.length === 0) {
					return uni.showToast({
						title: "请选择结算的商品",
						icon: 'none'
					})
				}
				uni.navigateTo({
					url: '../order-confirm/order-confirm?detail=' + JSON.stringify(this.selectedList)
				});
			},
			...mapActions([
				'doSelectAll',
				'doShowPopup',
				'doDelGoods',
				'updateCartList'
			]),
			...mapMutations([
				'selectItem',
				'initCartList',
				'unselectAll',
			]),
			showPopup(index, item) {
				if (!this.isEdit) {
					return;
				}
				$H.get('/cart/' + item.id + '/sku', {}, {
					token: true
				}).then(res => {
					//购物车商品规格
					//把字符串分割开
					let check = item.skusText.split(',')
					res.selects = res.goods_skus_card.map((v, i) => {
						let selected = 0
						let list = v.goods_skus_card_value.map((v1, i1) => {
							//如果选择的那一项和所有规格的遍历的一项相同就把该索引赋值
							if (check[i] === v1.value) {
								selected = i1
							}
							return {
								id: v1.id,
								name: v1.value
							}
						})
						return {
							id: v.id,
							title: v.name,
							selected,
							list: list
						}
					})
					//商品规格（匹配价格）
					res.goods_skus.forEach(item => {
						let arr = []
						for (let key in item.skus) {
							arr.push(item.skus[key].value)
							//把数组转化为逗号的字符串
						}
						item.skusText = arr.join(',')
					})
					if (this.isEdit) {
						this.doShowPopup({
							index,
							data: res
						})

					}
				})
			},
			//获取数据
			getData() {
				//获取购物车数据
				this.updateCartList().then(res => {
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
				//获取热门推荐
				$H.get('/goods/hotlist').then(res => {
					this.hotList = res.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							pprice: v.min_oprice,
							oprice: v.min_price
						}
					})
				})
			}
		},
		onLoad() {
			this.getData()
			//监听购物车更新
			uni.$on("updateCart", () => {
				this.getData()
			})
		},
		beforeDestroy() {
			uni.$off('updateCart')
		},
		onPullDownRefresh() {
			this.getData()
		}
	}
</script>

<style>

</style>
