<template>
	<view class="animate__animated animate__fadeIn">
		<!-- 排序筛选 -->
		<view class="d-flex border-top border-bottom a-center position-fixed bg-white left-0 right-0" 
		style="height: 100upx; z-index: 100;">
			<view class="flex-1 d-flex a-center j-center font-md" v-for="(item,index) in screen.list" :key="index"
				@tap="changeScreen(index)">
				<text :class="screen.currentIndex===index? 'main-text-color':'text-muted'">{{item.name}}</text>
				<!-- 箭头 -->
				<view>
					<view class="iconfont icon-paixu-shengxu line-h0"
						:class="item.status === 1? 'main-text-color':'text-light-muted'"></view>
					<view class="iconfont icon-paixu-jiangxu line-h0"
						:class="item.status === 2? 'main-text-color':'text-light-muted'" />
				</view>
			</view>
			<view class="flex-1 d-flex a-center j-center main-text-color" @tap="showDrawer">
				筛选
			</view>
			<!-- 抽屉 -->
			<uni-drawer ref="showRight" mode="right" @change="closeDrawer" :width="230">
				<!-- 上方卡片 -->
				<card headTitle="价格服务" :headBorderBottom="false" style="margin-top: 40px;" :headTitleWeight="false">
					<!-- 单选按钮组 -->
					<zcmradioGroup :label="label" :selected.sync='label.selected'>
					</zcmradioGroup>
				</card>
				<!-- 按钮 -->
				<view class="d-flex position-fixed bottom-0 right-0 w-100">
					<view class="flex-1 main-bg-color text-white font-md py-2 text-center"
						hover-class="main-bg-hover-color" @click="confirm()">确定</view>
					<view class="flex-1 font-md py-2 text-center" hover-class="bg-light-secondary" @click="reset">重置
					</view>
				</view>
			</uni-drawer>
		</view>
		<view style="height: 100rpx;"></view><!-- 占位 -->
		<!-- 列表 -->
		<block v-for="(item,index) in list" :key='index'>
			<searchList :item="item" :index="index"></searchList>
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
	const demo = [{
			title: "真无线路呵呵",
			titlepic: "../../static/images/demo/demo6.jpg",
			desc: "真无线路呵呵",
			pprice: 100,
			comment_num: 1300,
			good_num: "98%"
		},
		{
			title: "真无线路呵呵",
			titlepic: "../../static/images/demo/demo6.jpg",
			desc: "真无线路呵呵",
			pprice: 100,
			comment_num: 1300,
			good_num: "98%"
		},
		{
			title: "真无线路呵呵",
			titlepic: "../../static/images/demo/demo6.jpg",
			desc: "真无线路呵呵",
			pprice: 100,
			comment_num: 1300,
			good_num: "98%"
		},
	]
	import uniDrawer from "@/components/uni-ui/uni-drawer/uni-drawer.vue"
	import card from "@/components/common/card.vue"
	import zcmradioGroup from "@/components/common/radio-group.vue"
	import searchList from "@/components/search-list/search-list.vue"
	import $H from "@/comment/lib/request.js"
	import noThing from "@/components/common/no-thing.vue"
	export default {
		components: {
			uniDrawer,
			card,
			zcmradioGroup,
			searchList,
			noThing
		},
		data() {
			return {
				//上拉加载更多，加载中，没有更多了
				loadtext: "上拉加载更多",
				page: 1,
				keyword: "",
				list: [],
				showRight: false,
				screen: {
					currentIndex: 0,
					list: [{
							name: "综合",
							status: 1,
							key: "all"
						},
						{
							name: "销量",
							status: 0,
							key: "sale_count"
						},
						{
							name: "价格",
							status: 0,
							key: "min_price"
						},
					]
				},
				label: {
					selected: 0,
					list: [{
							name: "不限",
							rule: false,
							value: false
						},
						{
							name: "0-50",
							rule: "between",
							value: "0,50"
						},
						{
							name: "50-100",
							rule: "between",
							value: "50,100"
						},
						{
							name: "100-500",
							rule: "between",
							value: "100,500"
						},
						{
							name: "500-1000",
							rule: "between",
							value: "500,1000"
						},
						{
							name: "大于1000",
							rule: ">",
							value: "1000"
						},
					]
				},
				//抽屉选项
				condition: {},
				oldSelected: 0,
			}
		},
		computed: {
			//排序相关
			options() {
				let obj = this.screen.list[this.screen.currentIndex]
				let value = obj.status === 1 ? 'asc' : 'desc'
				return {
					[obj.key]: value
				}
				//等价于all:asc
			},
		},
		methods: {
			//在该页面搜索时初始化搜索
			initSearch(){
				this.label.selected = 0
				this.condition={}
				this.page=1
			},
			//点击打开抽屉
			showDrawer() {
				if (this.showRight == false) {
					this.$refs.showRight.open();
				}
				this.oldSelected = this.label.selected
			},
			changeScreen(index) {
				//判断当前点击是否已经是激活状态
				let oldIndex = this.screen.currentIndex;
				let oldItem = this.screen.list[oldIndex];
				if (oldIndex == index) {
					oldItem.status = oldItem.status === 1 ? 2 : 1
					this.getData()
					return
				}
				let newitem = this.screen.list[index]
				//移除激活状态
				oldItem.status = 0;
				this.screen.currentIndex = index
				//增加激活状态
				newitem.status = 1;
				//重新加载数据
				this.getData()
				//小米
			},
			//组织筛选条件
			getCondition() {
				let item = this.label.list[this.label.selected]
				//如果有值就使用值，如果没有就赋值为空
				this.condition = (item.rule && item.value) ? {
					price: item.rule + "," + item.value
				} : {}
			},
			//重置
			reset() {
				this.condition = {}
				//选项回到不限
				this.label.selected = 0
				//获取数据
				this.getData()
				//关闭抽屉
				this.$refs.showRight.close();
			},
			//提交筛选条件
			confirm() {
				//组织数据筛选条件
				this.getCondition()
				//获取数据
				this.getData()
				//关闭抽屉
				this.showRight = false
				this.$refs.showRight.close()
			},
			//关闭抽屉不确定
			closeDrawer() {
				//恢复原来的值
				this.label.selected = this.oldSelected
				//this.oldSelected = 0
			},
			//加载数据
			getData(refresh = true, callback = false) {
				let page = refresh ? 1 : this.page
				$H.post('/goods/search', {
					title: this.keyword,
					page: this.page,
					//解构参数
					...this.options,
					//筛选
					...this.condition,
				}).then((res) => {
					let list = this.format(res)
					this.list = refresh ? [...list] : [...this.list, ...list]
					//恢复加载状态
					this.loadtext = res.length < 10 ? "没有更多了" : "上拉加载更多"
					if (typeof callback === 'function') {
						callback()
					}
				})
			},
			//格式化
			format(res) {
				return res.map(item => {
					let good_num = item.comments_count === 0 ? 0 : (item.comments_good_count / item
						.comments_count) * 100
					return {
						id: item.id,
						title: item.title,
						titlepic: item.cover,
						desc: item.desc,
						pprice: item.min_price,
						comment_num: item.comments_count,
						good_num: good_num.toFixed(2) + '%'
					}
				})
			},
			search() {
				if (this.keyword === '') {
					return uni.showToast({
						title: "关键字不能为空",
						icon: "none"
					})
				}
				//#ifdef APP-PLUS
				//app端
				plus.key.hideSoftKeybord()
				//#endif
				//#ifndef APP-PLUS
				//隐藏软键盘
				uni.hideKeyboard()
				//#endif
				this.initSearch()
				
			},
			addHistory() {
				//拿到本地的搜索历史
				let history = uni.getStorageInfoSync("searchHistory")
				history ? JSON.parse(history) : []
				//判断之前是否有搜索记录
				let index = history.indexOf(this.keyword)
				if (index === -1 && this.keyword !== '') {
					//没有添加      
					this.history.unshift(this.keyword)
				} else {
					//有，将该搜索记录置顶
					this.history.unshift(this.history.splice(index, 1)[0])
				}
				uni.setStorageSync("searchHistory", JSON.stringify(this.history))
			},
	},
			onLoad(e) {
				this.keyword = e.keyword
				//加载数据
				this.getData()
			},
			onReachBottom() {
				//是否已经处于加载状态
				if (this.loadtext !== "上拉加载更多") return;
				//改变加载状态
				this.loadtext = "加载中..."
				this.page++;
				this.getData(false)
			},
			onPullDownRefresh() {
				this.getData(true, () => {
					uni.showToast({
						title: "刷新成功",
						icon: "none"
					})
					uni.stopPullDownRefresh()
				})
			},
			onNavigationBarSearchInputChanged(e) {
				this.keyword = e.text
			},
			onNavigationBarSearchInputConfirmed() {
				
				this.search()
				this.getData()
			},
			onNavigationBarButtonTap() {
				this.label.selected = 0
				this.search()
				this.getData()
			}
	}
</script>

<style>

</style>
