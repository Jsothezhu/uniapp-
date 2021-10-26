<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<uniSwipeAction>
				<uniSwipeActionItem :rightOptions="options" @click="bindClick($event,index)">
					<uniListItem @click="choose(item)" link>
						<view class="text-secondary">
							<view class="d-flex a-center">
								<text class="main-text-color">{{item.name}}</text>
								{{item.phone}}
								<text class="main-text-color"
									v-if="index === 0 && item.last_used_time !== null">[默认]</text>
							</view>
							<view class="">
								{{item.province}}{{item.city}}{{item.district}}
							</view>
							<view class="">
								{{item.address}}
							</view>
						</view>
					</uniListItem>
				</uniSwipeActionItem>
			</uniSwipeAction>
		</block>
		<!-- 没有数据 -->
		<no-thing v-if="list.length === 0" msg="空空如也"></no-thing>
		<!-- 上拉加载更多 -->
		<view class="d-flex a-center j-center text-light-muted font-md py-3">
			{{loadtext}}
		</view>

	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import uniSwipeAction from "@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue"
	import uniSwipeActionItem from "@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue"
	import {
		mapState,
		mapMutations
	} from "vuex"
	import $H from "../../comment/lib/request.js"
	import noThing from "@/components/common/no-thing.vue"
	export default {
		components: {
			uniListItem,
			uniSwipeAction,
			uniSwipeActionItem,
			noThing
		},
		data() {
			return {
				//上拉加载更多，加载中，没有更多了
				loadtext: "上拉加载更多",
				page: 1,
				//是否是从订单支付页面过来的
				isChoose: false,
				options: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		computed: {
			...mapState({
				'list': state => state.path.list
			}),
		},
		methods: {
			...mapMutations(['delPath', 'updatePathList']),
			//获取数据
			getData(callback = false) {
				$H.get('/useraddresses/' + this.page, {}, {
					token: true,
				}).then(res => {
					let refresh = this.page === 1
					this.updatePathList({
						refresh: refresh,
						list: res
					})
					this.loadtext = res.length < 10 ? '没有更多了' : '上拉加载更多'
					if (typeof callback === 'function') {
						uni.showToast({
							title: "刷新成功",
							icon: "none"
						})
						callback()
					}
				}).catch(err => {
					if (typeof callback === 'function') {
						callback()
					}
					if (this.page > 1) {
						//页码回归上一页
						this.page--
						this.loadtext = '上拉加载更多'
					}
				})
			},
			bindClick(value, i) {
				switch (value.index) {
					case 0: //修改
						//拿到选中的信息
						let obj = {
							index: i,
							item: this.list[i]
						};
						//加上是否默认地址
						obj.item.default=(i===0 && obj.item.last_used_time !==null ? 1:0)
						setTimeout(() => {
							uni.navigateTo({
								url: "../user-path-edit/user-path-edit?data=" + JSON.stringify(obj),
							});
						}, 50);
						break
					case 1: //删除
						uni.showModal({
							content: "要删除该收货地址吗？",
							success: (res) => {
								if (res.confirm) {
									//需要id
									$H.del("/useraddresses/"+this.list[i].id,{},{
										token:true
									}).then(res=>{
										this.delPath(i)
										uni.showToast({
											title: "删除成功"
										})										
									})
								};
							}
						})
						break
				}
			},
			//选择收货地址
			choose(item) {
				//通知订单提交页修改收货地址
				uni.$emit('choosePath', item)
				//关闭当前页
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(e) {
			if (e.type === 'choose') {
				this.isChoose = true
			}
			this.getData()
			//注册监听事件
			uni.$on('updateUserPathList',()=>{
				this.page = 1
				this.getData()
			})
		},
		onUnload() {
			uni.$off('updateUserPathList')
		},
		//监听导航栏按钮点击
		onNavigationBarButtonTap(e) {
			//如果是从支付页面
			if (this.isChoose) {
				if (e.index === 0) {
					uni.navigateTo({
						url: "../user-path-edit/user-path-edit"
					})
				}
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page = 1
			this.getData(() => {
				uni.stopPullDownRefresh()
			})
		},
		//上拉加载更多
		onReachBottom() {
			//是否已经处于加载状态
			if (this.loadtext !== "上拉加载更多") return;
			//改变加载状态
			this.loadtext = "加载中..."
			this.page++;
			this.getData(false)
		},

	}
</script>

<style>

</style>
