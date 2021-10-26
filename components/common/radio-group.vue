<template>
	<view class="row">
		<view class="span-24-8 px-2 mb-2" v-for="(item,index) in label.list" :key="index">
			<view class="rounded px-2 py-1 bg-light-secondary font-md text-center border" :class="label.selected===index? 'redio-active' : ''" @tap="changeRadio(index)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: Object,
		},
		methods: {
			changeRadio(index) {
				this.$emit("update:selected", index)
			}
		}
	}
</script>

<style>
	.redio-active {
		background: #FCE0D5 !important;
		color: #EB7320 !important;
		border-color: #EB7320;

	}
</style>
