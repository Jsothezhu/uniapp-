<template>
	<view>
		<!-- 自定义导航 -->
		<!-- #ifdef MP -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 中间 -->
			<input type="text" v-model="keyword"  class="flex-1 bg-light rounded ml-3 px-2" 
			style="height: 65rpx;" placeholder="智能积木"/>
			<!-- 右边· -->
			<view style="width: 85rpx;" class="d-flex a-center j-center"
			@click="search">
				搜索
			</view>
		</view>
		<!-- #endif -->
		<card headTitle="热门搜索" bodyCover="../../static/images/demo/search-banner.png"></card>
	<!-- 多色按钮 -->
		<view class="px-1 mb-2">
			<colorTag  v-for="(item,index) in hot" :key='index'
			:item="item" @click="quickSearch(item.name)"></colorTag>
		</view>
		<!-- 常用分类 -->
		<card headTitle="常用分类" :bodyPadding="false"
		:headBorderBottom="false">
			<view class="px-1 mb-2">
				<colorTag  v-for="(item,index) in cate" :key='index'
				:item="item" :color="false" @click="quickSearch(item.name)"></colorTag>
			</view>
		</card>
		<template v-if="historyList.length > 0">
		<!-- 分割线 -->
		<divider />
		<!-- 搜索记录 -->
		<card headTitle="搜索记录" :bodyPadding="false"
		:headBorderBottom="false">
		<view slot="right" class="font text-primary" @tap="clearHistory">
			清除搜索记录
		</view>
		<uniListItem v-for="(item,index) in historyList" :key="index"
		 :title="item" :showArrow="false" @click="quickSearch(item)"
		 link></uniListItem>
		</card>
		</template>
	</view>
	
</template>

<script>
	import card from "@/components/common/card.vue"
	import colorTag from "@/components/search/color-tag.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	export default {
		components:{
			card,colorTag,uniListItem
		},
		data() {
			return {
				historyList:[],
				keyword:'',
				hot:[
					{name:"领卷中心"},	
					{name:"领卷中心"},
					{name:"领卷中心"},
					{name:"领卷中心1233"},
				],
				cate:[
					{ name:'耳机' },
					{ name:'手机' },
					{ name:'音箱' },
					{ name:'手表' },
					{ name:'配件' },
					{ name:'网关/传感器' },
					{ name:'健康' },
					{ name:'酷玩' },
				],
	
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index===0){
				uni.navigateTo({
					url:'../search-list/search-list',
				})
			}
		},
		//获取关键字
		onNavigationBarSearchInputChanged(e){
			this.keyword = e.text
		},
		//监听提交事件
		onNavigationBarSearchInputConfirmed(){
			this.search()
		},
		//监听搜索按钮
		onNavigationBarButtonTap(){
			this.search()
		},
		onShow() {
			//加载历史记录
			let history = uni.getStorageSync("searchHistory")
			this.historyList = history ? JSON.parse(history) : []
		},
		methods: {
			search(){
				if(this.keyword === ''){
					return uni.showToast({
						title:"关键字不能为空",
						icon:"none"
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
				setTimeout(()=>{
					this.addHistory()
				},500)
				uni.navigateTo({
					url:"../search-list/search-list?keyword="+this.keyword
				})
			},
			//加入搜索记录
			addHistory(){
				let index = this.historyList.indexOf(this.keyword)
				if(index === -1 && this.keyword !== ''){
					//没有添加      
					this.historyList.unshift(this.keyword)
				}else{
					//有，将该搜索记录置顶
					this.historyList.unshift(this.historyList.splice(index,1)[0])
				}
				//移除最后一条
				if(this.historyList.length > 6){
					this.historyList.splice(this.historyList.length-1,1)
				}
				uni.setStorageSync("searchHistory",JSON.stringify(this.historyList))
			},
			//清除搜索记录
			clearHistory(){
				uni.showModal({
					title: '提示',
					content: '是否要清除搜索历史',
					cancelText: '取消',
					confirmText: '清除',
					success: res => {
						if(res.confirm){
							uni.removeStorageSync('serchHistory')
							this.historyList = []
						}
					},
				});
			},
			//彩色块点击搜索
			quickSearch(name){
				this.keyword = name
				this.search()
				setTimeout(()=>{
					this.addHistory()
				},500)
				uni.navigateTo({
					url:"../search-list/search-list?keyword="+this.keyword
				})
			}
		}
	}
</script>

<style>

</style>
