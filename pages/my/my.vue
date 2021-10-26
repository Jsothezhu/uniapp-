<template>
	<view>
		<!-- 在第一次加载时页面白屏 -->
		<loading-plus v-if="beforeReady"></loading-plus>
		<view class="position-relative d-flex a-center" style="height: 320rpx;">
			<!-- 消息列表 -->
			<view class="iconfont icon-xiaoxi position-absolute text-white"
				style="font-size: 50rpx; top: 75rpx; right: 20rpx;z-index: 100;" @click="navigate('msg-list',true)">
			</view>
			<image src="../../static/images/bg.jpg" style="height: 320rpx; width: 100%;"></image>

			<view class="d-flex a-center position-absolute left-0 right-0" style="bottom: 50rpx;">
				<image :src="loginStatus ? userInfo.avatar : '../../static/images/demo/demo6.jpg'"
					style="height: 145rpx; width: 145rpx; border: 5rpx solid;" class="rounded-circle border-light ml-4">
				</image>
				<view class="ml-2 text-white font-md" @click="openLogin">{{loginStatus ? userInfo.nickname : "登录/注册"}}
				</view>
				<view class="d-flex a-center j-center a-self-end ml-auto px-2" style="height: 70rpx;background: #ffd43f;
				color: #cc4A00; border-top-left-radius: 40rpx;border-bottom-left-radius:40rpx;">
					<view class="line-h iconfont icon-huangguan mr-1"></view>
					会员积分 0.00
				</view>
			</view>
		</view>
		<!-- 图标分类 -->
		<card headTitle='1'>
			<view slot="title" class="d-flex a-center j-sb w-100">
				<text class="font-md font-weight">我的订单</text>
				<view class="text-secondary font" @tap="navigate('order',true)">
					全部订单<text class="iconfont icon-you font"></text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view class="flex-1 d-flex flex-column a-center j-center py-3" hover-class="bg-light-secondary"
					v-for="(item,index) in orders" :key='index'>
					<view class="iconfont icon-cpu font-lg line-h" :class="item.icon"
					@click="openOrder(item)"></view>
					<view>{{item.name}}</view>
				</view>
			</view>
		</card>
		<divider></divider>
		<uniListItem title='小米会员' showExtraIcon leftIcon="icon-VIP" leftIconStyle="color:#fd8f2e;"></uniListItem>
		<uniListItem title='会员中心' showExtraIcon leftIcon="icon-huangguan" leftIconStyle="color:#fcbe2d;"></uniListItem>
		<uniListItem title='服务中心' showExtraIcon leftIcon="icon-service" leftIconStyle="color:#fa6c5e;"></uniListItem>
		<uniListItem title='小米之家' showExtraIcon leftIcon="icon-home" leftIconStyle="color:#fe8b42;"></uniListItem>
		<uniListItem title='更多功能' showExtraIcon leftIcon="icon-gengduo" leftIconStyle="color:#9ed45a;"></uniListItem>
		<divider></divider>
		<uni-list-item title='更多设置' showExtraIcon leftIcon="icon-icon_set_up" leftIconStyle="color:#808c98;"
			@click="navigate('user-set')" link></uni-list-item>

	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import loading from "@/comment/mixin/loading.js"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import {
		mapState
	} from "vuex"
	export default {
		mixins: [loading],
		components: {
			card,
			uniListItem
		},
		data() {
			return {
				orders:[{
					name:"待付款",
					icon:"icon-wallet_icon",
					index:1
				},
				{
					name:"待收货",
					icon:"icon-daishouhuo",
					index:2
				},
				{
					name:"待评价",
					icon:"icon-pinglun",
					index:3
				},
				{
					name:"待退款",
					icon:"icon-buoumaotubiao46",
					index:4
				}]
			}
		},
		computed: {
			...mapState({
				loginStatus: state => state.user.loginStatus,
				userInfo: state => state.user.userInfo
			})
		},
		methods: {
			navigate(path, check = false) {
				if (!path) return
				if (check) {
					return this.navigateTo({
						url: `/pages/${path}/${path}`
					})
				}
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				})
			},
			openLogin() {
				if (!this.loginStatus) {
					uni.navigateTo({
						url: "../login/login"
					})
				}

			},
			openOrder(item){
				if(item.index){
					this.navigateTo({
						url:"/pages/order/order?tabIndex="+item.index
					})					
				}
			}
		},
		onReady() {
			setTimeout(() => {
				this.beforeReady = false
			}, 500)
		}
	}
</script>

<style>

</style>
