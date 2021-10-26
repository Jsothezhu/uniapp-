<template>
	<view>
		<uniStatusBar />
		<view class="d-flex a-center j-sb py-2 px-3 text-light-muted">
			<view class="iconfont icon-shanchu1" @tap="goBack"></view>
			<view class="font-md" @click="forget">忘记密码</view>
		</view>
		<view class="p-5">
			<view class="font-big mb-5">密码登录</view>
			<input type="text" class="border-bottom mb-4 uni-input px-0" placeholder="请输入手机号/邮箱/账号"
				placeholder-class="text-light-muted" @focus="focus('username')" @blur="blur('username')"
				:class="focusClass.username ? 'input-border-color' : ''" v-model="username" />
			<input type="text" class="border-bottom mb-4 uni-input px-0" placeholder="请输入密码"
				placeholder-class="text-light-muted" @focus="focus('password')" @blur="blur('password')"
				:class="focusClass.password ? 'input-border-color' : ''" v-model="password" />
			<view class="py-2 w-100 d-flex a-center j-center main-bg-color text-white rounded font-md mb-4" 
			hover-class="main-bg-hover-color" @click="submit">
				登录</view>
			<label class="checkbox d-flex a-center" @click="check = !check">
				<checkbox :checked="check" />
				<text class="text-light-muted font">已阅读并同意xxx协议</text>
			</label>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from "@/components/uni-ui/uni-status-bar/uni-status-bar.vue"
	import $H from "@/comment/lib/request.js"
	import {mapMutations} from "vuex"
	export default {
		components: {
			uniStatusBar
		},
		data() {
			return {
				username: "",
				password: "",
				check: true,
				//验证规则
				rules: {
					username: [/* {
						rule: /^[a-zA-Z]\w{5,17}$/,
						msg: "账号必须字母开头，长度在6-18之间，只能包含字母、数字和下划线"
					} */],
					password: [/* {
						rule: /^.{5,20}$/,
						msg: "密码长度必须为5-20个字符"
					} */]
				},
				focusClass: {
					username: false,
					password: false,
				}

			}
		},
		methods: {
			...mapMutations(['login']),
			goBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			//忘记密码
			forget() {

			},
			//表单验证
			validate(key) {
				var check = true
				this.rules[key].forEach((v) => {
					//验证失败
					if (!(v.rule).test(this[key])) {
						uni.showToast({
							title: v.msg,
							icon: 'none'
						});
						check = false
						return false
					}
				})
				return check
			},
			//提交表单
			submit() {
				if (!this.check) {
					return uni.showToast({
						title: "请先阅读xxx协议",
						icon: "none"
					})
				}
				//验证用户名
				if (!this.validate('username')) return;
				//验证密码
				if (!this.validate('password')) return;
				
				/* uni.showLoading({
					title: "登录中...",
					mask: true
				}); */
				$H.post('/login',{
					username:this.username,
					password:this.password
				}).then(res=>{
					//状态存储
					this.login(res)
					//刷新购物车(app.vue)
					uni.$emit('updateCart')
					uni.showToast({
						title: '登录成功',
						icon:"none"
					});
					uni.navigateBack({
						delta:1
					})
					console.log(res)
				})
				
			},
			focus(key) {
				this.focusClass[key] = true
			},
			blur(key) {
				this.focusClass[key] = false
			}
		}
	}
</script>

<style>

</style>
