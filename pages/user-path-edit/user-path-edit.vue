<template>
	<view>
		<divider></divider>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">收货人: </view>
			<input type="text" class="px-1 font-md flex-1" v-model="form.name" />
		</view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">手机号码: </view>
			<input type="text" class="px-1 font-md flex-1" v-model="form.phone"/>
		</view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">邮编: </view>
			<input type="text" class="px-1 font-md flex-1" v-model="form.zip"/>
		</view>
		<divider></divider>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">所在地区: </view>
			<input type="text" class="px-1 font-md flex-1" disabled 
			@click="showMulLinkageThreePicker()" placeholder="请选择所在地区"
			:value="path"/>
			<!-- 三级联动 -->
			<mpvueCityPicker :themeColor="themeColor"
			:pickerValueDefault="packValue"
			ref="mpvueCityPicker"
			@onConfirm="onConfirm"
			></mpvueCityPicker>
		</view>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">详细地址: </view>
			<input type="text" class="px-1 font-md flex-1" v-model="form.address" />
		</view>
		<divider></divider>
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">设为默认地址: </view>
			<switch :checked="form.default" class="ml-auto"  @change="form.default = $event.detail.value ? 1 : 0"/>
		</view>
		<view class="p-3">
			<view class="text-center w-100 main-bg-color text-white font-md rounded py-2"
			hover-class="main-bg-hover-color" @click="submit()">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from "@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"
	import {mapActions} from "vuex"
	import $H from "../../comment/lib/request.js"
	export default {
		components:{
			mpvueCityPicker
		},
		data() {
			return {
				isedit:false,//是否为创建
				themeColor:'#007aff',
				//默认选中的
				packValue:[0,0,1],
				index:-1,//默认修改的对象的索引
				form:{
					zip:"",
					name:"",
					province:"",
					city:"",
					district:"",
					address:"",
					phone:"",
					default:0,
				}
			}
		},
		computed:{
			path(){
				if(this.form.province){
					return this.form.province+'-'+ this.form.city+'-'+this.form.district
				}
			}
		},
		onLoad(e){
			if(e.data){
				//修改地址，加载拿到数据
				let result = JSON.parse(e.data)
				this.form = result.item
				this.index = result.index
				this.isedit = true
				uni.setNavigationBarTitle({
					title:"修改收货地址"
				})
			}
		},
		//监听返回关闭三级联动
		onBackpress(){
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerChange();
				return true
			}
		},
		//页面卸载之后
		onUnload(){
			if(this.$refs.mpvueCityPicker.showPicker){
				this.$refs.mpvueCityPicker.pickerChange();
			}
		},
		methods: {
			...mapActions(['updatePathAction','createPathAction']),
			//三级联动确定
			onConfirm(e){
				//切割
				let arr = e.label.split('-')
				this.form.province = arr[0]
				this.form.city = arr[1]
				this.form.district = arr[2]
				this.packValue = e.value
			},
			//显示三级联动
			showMulLinkageThreePicker(){
				this.$refs.mpvueCityPicker.show()
			},
			//提交
			submit(){
				//验证表单
				//修改
				if(this.isedit){
					$H.post('/useraddresses/'+this.form.id,this.form,{
						token:true
					}).then(res=>{
						this.updatePathAction({
						index:this.index,
						item:this.form
					});
					uni.showToast({title:'修改成功'})
					uni.navigateBack({delta:1})
					}).catch((err)=>{
						console.log(JSON.stringify('/useraddersses/'));
					})
					uni.$emit('updateUserPathList')
					return;
					
				}
				//创建
				$H.post('/useraddresses',this.form,{
					token:true
				}).then(res=>{
					this.createPathAction(this.form)
					uni.showToast({title:'创建成功'})
				//返回上一页
					uni.navigateBack({delta:1})
				})
			},
		}
	}
</script>

<style>
page{
	background: #EEEEEE;
}
</style>
