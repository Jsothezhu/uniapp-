<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-5 my-3">
			<text class="text-light-muted font-md">支付金额</text>
			<price :price="detail.price" style="margin: auto;" priceSize="font-lg" unitSize="font-md"></price>
		</view>
		<!-- 支付方式 -->
		<view class="px-5">
			<radio-group @change="change">
			<label v-for="(item,index) in options" :key="index">
				<uniListItem :leftIcon="item.icon" :title="item.title" showBadge showExtraIcon
					leftIconStyle="font-size: 60rpx;" :note="item.note">
					<radio slot="right" :value="item.value" color="#FD6801" />
				</uniListItem>
			</label>
			<label>
				<uniListItem leftIcon="icon-weixinzhifu text-success" title="微信支付" showBadge showExtraIcon
					leftIconStyle="font-size: 60rpx;">
					<radio slot="right" value="1" color="#FD6801" 
					:checked="payMethod === item.value"/>
				</uniListItem>
			</label>
			</radio-group>
			<view class=" main-bg-color text-white text-center font-md w-100 py-2 mt-3 rounded"
			hover-class="main-bg-hover-color" @tap="submit()">
			{{loading? '支付中...':'确认支付'}}
			</view>

		</view>
	</view>
</template>

<script>
	import price from "@/components/common/price.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import $H from "@/comment/lib/request.js"
	export default {
		components: {
			price,
			uniListItem
		},
		data() {
			return {
				loading:false,
				detail:{
					id:0,
					price:0
				},
				payMethod:"alipay",
				options:[{
					title:"支付宝支付",
					note:"推荐使用支付宝支付",
					icon:"icon-zhifubao text-primary",
					value:"alipay"
				},{
					title:"微信支付",
					note:"",
					icon:"icon-weixinzhifu text-success",
					value:"wxpay"
				}]
			}
		},
		methods: {
			//支付
			submit(){
				//防止重复支付
				if(this.loading) return;
				this.loading = true
				$H.get('/payment/'+this.detail.id+'/'+this.payMethod,{},{
					token:true,
					native:true
				}).then(res=>{
					console.log(res);
					//支付接口
					uni.requestPayment({
						provider: this.payMethod,
						orderInfo: res.data,
						success: res => {
							//重定向防止重复支付
							uni.redirectTo({
								url: '../pay-result/pay-result',
							});
							console.log(JSON.stringify(res));
						},
						fail: () => {
							uni.showModal({
								title: '提示',
								content: '支付失败',
								showCancel: false,
							});
						},
					});
					this.loading = false
				}).catch(err=>{
					this.loading = false
					console.log(err);
					uni.showToast({
						title:"支付失败",
						icon:'none'
					})
				})
				uni.navigateTo({
					url:"../pay-result/pay-result"
				})
			},
			//切换支付方式
			change(e){
				this.payMethod = e.detail.value
			}
		},
		onLoad(e) {
			if(!e.detail){
				return uni.showToast({
					title:'支付失败',
					icon:'none'
				})
			}
			this.detail = JSON.parse(e.detail)
		}
	}
</script>

<style>

</style>
