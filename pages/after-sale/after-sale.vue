<template>
	<view>
		<divider></divider>
		<card headTitle="申请售后的产品">
			<view class="d-flex a-center px-3 py-2">
				<image src="../../static/images/demo/cate_01.png" mode="widthFix"
				style="width:100rpx ;height:100rpx ;"></image>
				<view class="flex-1 ml-">
					<view class="font-lg">商品名称</view>
					<view class="font-md text-light-muted">维修服务:剩余111天</view>
				</view>
			</view>
		</card>
		<divider></divider>
		<card headTitle="服务类型" bodyPadding >
			<zcmradioGroup :label="label1" 
			:selected.sync='label1.selected'></zcmradioGroup>
		</card>
		<divider></divider>
		<card headTitle="问题描述" bodyPadding >
			<view class="position-relative">
				<textarea placeholder="请详细描述一下你遇到的问题"
				 :maxlength="maxlength" style="width: 100%;height: 300rpx;"
				 class="border rounded"  v-model="content" />
				<view class="position-absolute text-light-muted font" 
				style="right: 5rpx;bottom:5rpx;"
				:class="remain >= 0 ? 'text-light-muted' : 'text-danger'">
				{{content.length}}/{{maxlength}}</view>
			</view>
		</card>
		<view class="p-3">
			<view class="rounded main-bg-color text-white text-center py-3" 
			hover-class="main-bg-hover-color">
			下一步</view>
		</view>
	</view>
	
</template>

<script>
	import card from "@/components/common/card.vue"
	import zcmradioGroup from "@/components/common/radio-group.vue"
	export default {
		components:{
			card,
			zcmradioGroup
		},
		data() {
			return {
				label1:{
					selected:0,
					list:[
						{name:"电子发票"}
					],
				},
				//问题描述
				content:'',
				maxlength:50,
			}
		},
		computed:{
			//剩余可以输入字符
			remain(){
				return this.maxlength - this.content.length
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
