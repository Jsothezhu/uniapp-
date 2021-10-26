<template>
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom border-light-secondary">
			<view class="flex-1 d-flex a-center j-center py-2" v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'tabactive' : ''" @tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		<scroll-view scroll-y="true" class="flex-1" style="background: #f5f5f5;">
			<block v-for="(tab,tabi) in tabBars" :key="tabi">
				<view class="position-relative" v-show="tabi==tabIndex">
					<template v-if="tab.list.length > 0">
						<view class="p-3">
							<coupon v-for="(item,index) in tab.list" :key="index" :item="item" :index="index"
							@click="chooseCoupon(item)">
								<text v-if="item.disabled">已使用</text>
								{{item.status ? '去使用' : validText}}
							</coupon>
						</view>
					</template>
					<!-- 默认无 -->
					<template v-else>
						<view class="position-relative border" style="height: 400rpx;">
							<noThing :icon="tab.nothing" :msg="tab.msg"></noThing>
						</view>
					</template>
				</view>
			</block>
		</scroll-view>

	</view>
</template>

<script>
	import noThing from "@/components/common/no-thing.vue"
	import coupon from "@/components/order-conpon/coupon.vue"
	import $H from "@/comment/lib/request.js"
	export default {
		components: {
			noThing,
			coupon
		},
		data() {
			return {
				tabIndex: 0,
				price:0,
				tabBars: [{
						name: '可用',
						nothing: 'no_pay',
						msg: "你还没有可用的优惠卷",
						page:1,
						key:'valid',
						firstLoad:false,//首次加载
						list: [{
								title: "第三季仿微信立减100元",
								start_time: "2039-10-01",
								end_time: "2019-11-10",
								price: 100,
								desc: "满300元使用",
								status: true,
								disabled: false
							}
						],
					},
					{
						name: '已失效',
						nothing: 'no_pay',
						msg: "你还没有优惠卷",
						key:'invalid',
						page:1,
						firstLoad:false,
						list: []
					}
				]
			}
		},
		computed:{
				//当前的页码
				pages(){
					return this.tabBars[this.tabIndex].page
				},
				//是否失效
				isvalid(){
					return this.tabBars[this.tabIndex].key
				},
				validText(){
					return this.tabIndex === 0 ? '不可用' : '已失效'
 				}
			},
		methods: {
			//切换选项卡
			changeTab(index) {
				this.tabIndex = index
				if(!this.tabBars[index].firstLoad){
					this.getData()
				}
			},
			getData(){
				let index = this.tabIndex
				$H.get(`/usercoupon/${this.pages}/${this.isvalid}`,{},{
					token:true
				}).then(res=>{
					this.tabBars[index].list = res.map(item=>{
						let status = (index === 0) && (this.price >=parseFloat(item.coupon.min_price))
						
						return {
							id:item.id,
							title: item.coupon.name,
							start_time: item.coupon.start_time,
							end_time: item.coupon.end_time,
							price: item.coupon.value,
							desc: item.coupon.desc,
							status:status,//优惠劵可不可用
							disabled: item.used,
							type:item.coupon.type
						}
					})
					this.tabBars[index].firstLoad = true
				})
			},
			//选择优惠券
			chooseCoupon(item){
				//已使用
				if(item.disabled){
					return uni.showToast({
						title:"该优惠券已经使用过了",
						icon:"none"
					})
				}
				//已失效或不可用
				if(!item.status){
					return uni.showToast({
						title:"该优惠券"+this.validText,
						icon:"none"
					})
				}
				uni.$emit('couponUser',{
					id:item.id,
					type:item.type,
					value:item.price
				})
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(e) {
			if(e.detail){
				this.price = (JSON.parse(e.detail)).price
			}
			this.getData()
		}
	}
</script>
<style>
	.tabactive {
		border-bottom: 5rpx solid #fd6801;
		color: #fd6801;
	}
</style>
