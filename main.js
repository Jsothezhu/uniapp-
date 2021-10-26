import Vue from 'vue'
import App from './App'
import store from "./store"
import $U from './comment/lib/util.js'

Vue.config.productionTip = false

Vue.prototype.$store=store
//权限跳转
Vue.prototype.navigateTo = (options)=>{
	//判断用户是否登录
	if(!store.state.user.loginStatus){
		uni.showToast({
			title:"请先登录",
			icon:"none"
		})
		return uni.navigateTo({
			url:'/pages/login/login'
		})
	}
	uni.navigateTo(options)
}
//更新tabbar角标
Vue.prototype.$U = $U



//引入全局组件
import divider from "components/common/divder.vue"
Vue.component('divider',divider);
//引入全局加载动画
import loadingPlus from "comment/mixin/loading-plus.vue"
Vue.component('loading-plus',loadingPlus);

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
