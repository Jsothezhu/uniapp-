<template>
	<view class="p-3">
		<coupon v-for="(item,index) in list" :key="index" :item="item" :index="index" @click="getCoupon(item)">
			<text v-if="!item.status">已失效</text>
			<text v-if="item.disabled">已领取</text>
			<text v-else>马上领取</text>
		</coupon>
		<!-- 上拉加载更多 -->
		<view class="d-flex a-center j-center text-light-muted font-md py-3"
		v-if="list.length > 0">
			{{loadtext}}
		</view>
	<no-thing msg="没有优惠劵" v-else></no-thing>
	</view>
</template>

<script>
	import coupon from "@/components/order-conpon/coupon.vue"
	import $H from "@/comment/lib/request.js"
	import noThing from "@/components/common/no-thing.vue"
	export default {
		components: {
			coupon,
			noThing
		},
		data() {
			return {
				page: 1,
				list: [],
				loadtext: "上拉加载更多",
			}
		},
		methods: {
			getData(refresh = false) {
				return new Promise((res, rej) => {
					$H.get('/coupon/' + this.page, {}, {
						token: true
					}).then(result => {
						let list = result.map(item => {
							let time = (new Date()).getTime()
							let status = (item.end_time > time / 1000) || item.status
							return {
								id: item.id,
								title: item.name,
								start_time: item.start_time,
								end_time: item.end_time,
								price: item.value,
								desc: item.desc,
								status, //false以失效
								disabled: (item.coupon_user.length > 0) //true已领取
							}
						})
						this.list =!refresh? [...this.list,...list]:[...list]
						this.loadtext = (result.length === 10)? "上拉加载更多" : "没有更多了"
					}).catch(err => {
						this.page--;
						rej(err)
					})
				})
			},
			//领取优惠劵
			getCoupon(item) {
				$H.post('/getcoupon/' + item.id, {}, {
					token: true
				}).then(res => {
					//状态设为领取状态
					item.disabled = true
					uni.showToast({
						title: "领取成功",
						icon: "none"
					})
				})
			},
			//上拉加载
			onReachBottom(){
				if(this.loadtext === "上拉加载更多"){
					return;
				}
				this.loadtext = "加载中..."
				this.page++;
				this.getData()
			}
		},
		onLoad() {
			this.getData()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData(true).then(res=>{
				uni.stopPullDownRefresh()
			}).catch(
				uni.stopPullDownRefresh()
			)
		}
	}
</script> 

<style>

</style>
