<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//初始化登录状态
			this.$store.commit("initUser")
			//更新购物车数据
			this.$store.dispatch("updateCartList")
			//监听购物车更新
			uni.$on('updateCartList',()=>{
				this.$store.dispatch('updateCartList')
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 官方组件库 */
	@import "./comment/uni.css";
	/* 动画库 */
	@import "./comment/animate.css";
	/* 图标库 */
	@import "./comment/icon.css";
	/* ui基础库 */
	@import "./comment/zcm-main.css";
	@import "./comment/common.css";
	
</style>
