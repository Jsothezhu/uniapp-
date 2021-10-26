export default{
	//mixin会把data注入到组件里
	data(){
		return {
			beforeReady:true,
		}
	},
	//onready则会合并
	onReady() {
		setTimeout(()=>{
			this.beforeReady = false
		},500)
	},
}