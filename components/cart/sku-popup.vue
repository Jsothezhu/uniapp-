<template>
	<commonPopup :popupClass="popupshow" @hide="doHidePopup">
		<!-- 价格部分 -->
		<view class="d-flex a-center" style="height: 275rpx;">
			<image :src="popupData.cover" mode="widthFix" style="width: 180rpx; height: 180rpx;"
				class="border rounded"></image>
			<view class="pl-2">
				<price priceSize="font-lg" unitSize="font" :price="showPrice"></price>
				{{checkedSkus}}
			</view>
		</view>
		<!-- 表单部分 -->
		<scroll-view scroll-y class='w-100' style="height: 660rpx;">
			<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false"
				v-for="(item,index) in popupData.selects" :key="index">
				<zcmradioGroup :label="item" :selected.sync='item.selected'></zcmradioGroup>
			</card>
			<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
				<text>购买数量</text>
				<uni-number-box :min="1" :value="popupData.item.num" @change="popupData.item.num = $event"></uni-number-box>
			</view>
		</scroll-view>
		<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color"
			style="height: 100rpx; margin-left: -20rpx; margin-right: -20rpx;" @tap.stop="doHidePopup">
			确定
		</view>
	</commonPopup>
</template>

<script>
	import price from "@/components/common/price.vue"
	import commonPopup from "@/components/common/common-popup.vue"
	import zcmradioGroup from "@/components/common/radio-group.vue"
	import card from "@/components/common/card.vue"
	import uniNumberBox from "../../components/uni-ui/uni-number-box/uni-number-box.vue"
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from "vuex"
	export default{
		components:{
			commonPopup,
			price,
			zcmradioGroup,
			card,
			uniNumberBox
		},
		computed:{
			...mapState({
				popupshow: state => state.cart.popupShow,
				popupData: state => state.cart.popupData
			}),
			//选中的sku
			checkedSkus() {
				let checkedSkus = this.popupData.selects.map(v => {
					return v.list[v.selected].name
				})
				return checkedSkus.join(',')
			},
			//选中skus的索引
			checkedSkusIndex() {
				if(!this.popupData.goods_skus){
					return
				}
				//通过索引找到和选中内容相同的skustext
				let index = this.popupData.goods_skus.findIndex((item) => {
					return item.skusText === this.checkedSkus
				})
				return index
			},
			//显示价格
			showPrice() {
				//拿到选中的skus组成的字符串
				if (this.checkedSkusIndex < 0) {
					return this.popupData.item.pprice || 0.00
				}
			
				return this.popupData.goods_skus[this.checkedSkusIndex].pprice
			},
		},
		methods:{
			...mapActions([
				'doHidePopup',
			]),
		},
		created() {
			console.log(this.popupData);
		}
	}
</script>

<style>
</style>
