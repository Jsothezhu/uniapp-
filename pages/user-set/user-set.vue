<template>
	<view>
		<card v-if="loginStatus" headTitle="账号管理" bodyStyle="background:#ffffff;">
			<uni-list-item title="个人资料" link></uni-list-item>
			<uni-list-item title="收货地址" 
			@click="navigate('user-path-list')" link></uni-list-item>
		</card>
		<card :headTitle="item.label" bodyStyle="background:#ffffff;"
		v-for="(item,index) in list" :key="index">
			<uni-list-item :title="list.title" showArrow link v-for="(list,listIndex) in item.value"
			:key='listIndex' @click="navigate(list.path)"></uni-list-item>
		</card>
		<view class="p-3" v-if="loginStatus">
			<button type="default" class="bg-white"
			@click="logoutEvent()">退出登录</button>
		</view>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue"
	import $H from "../../comment/lib/request.js"
	import {mapState,mapMutations} from "vuex"
	export default {
		components:{
			card,
			uniListItem
		},
		data() {
			return {
				list:[
					{
						label:"关于",
						value:[
							{title:"关于商城",path:"about"},
							{title:"意见反馈",path:""},
							{title:"协议规则",path:""},
							{title:"资质证件",path:""},
							{title:"用户协议",path:""},
							{title:"隐私政策",path:""},
						]
					}
				]
			}
		},
		computed:{
			...mapState({
				token:state=>state.user.token,
				loginStatus:state=>state.user.loginStatus
			})
		},
		methods: {
			...mapMutations(['logout','clearCart']),
			//退出登录
			logoutEvent(){
				//清除服务端token
				$H.post('/logout',{},{
					token:true,//是否需要token
					toast:false//不需要提示
				}).then((res)=>{
					this.logout()
					//清空购物车
					this.clearCart()
					uni.showToast({
						title:"退出成功",
						icon:"none"
					})
					uni.navigateBack({
						delta:1
					})
				}).catch(err=>{
					console.log(err);
				})
			},
			navigate(path){
				if(!path) return
				uni.navigateTo({
					url: `/pages/${path}/${path}`,
				});
			}
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
