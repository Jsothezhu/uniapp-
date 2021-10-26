<template>
	<view class="card" :style="cardStyle">
		<!-- head -->
		<view v-if="showhead" class="p-2 main-border-color d-flex a-center j-sb" :class="getHeadClass">
			<slot v-if="headTitle" name="title">
				<text class="font-md" :class="headTitleWeight?'font-weight':''">{{headTitle}}</text>
			</slot>
			<slot name="right"></slot>
		</view>
		<!-- body -->
		<view :class="getBodyClass" :style="bodyStyle">
			<image v-if="bodyCover" :src="bodyCover" mode="widthFix" />
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//body样式
			bodyStyle: String,
			//头部标题
			headTitle: String,
			//封面图
			bodyCover: String,
			//是否显示头部
			showhead: {
				type: Boolean,
				default: true
			},
			//是否显示下边线
			headBorderBottom: {
				type: Boolean,
				default: true
			},
			//是否给body加padding
			bodyPadding: {
				type: Boolean,
				default: false,
			},
			//标题是否加粗
			headTitleWeight: {
				type: Boolean,
				default: true,
			},
			//卡片背景色
			cardStyle: {
				type: String,
				default: ""
			}
		},
		computed: {
			getHeadClass() {
				let BorderBottom = this.headBorderBottom ? 'border-bottom' : ''
				return `${BorderBottom}`
			},
			getBodyClass() {
				let padding = this.bodyPadding ? 'p-2' : ''
				return `${padding}`
			}
		}
	}
</script>

<style>

</style>
