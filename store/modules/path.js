export default {
	state:{
		list:[],
	},
	getters:{
		//获取默认地址(订单支付)
		defaultPath:(state)=>{
			return state.list.filter(v=>v.isdefault)
		}
	},
	mutations:{
		//覆盖收货地址
		updatePathList(state,{refresh,list}){
			state.list = refresh? list:[...state.list,...list]
		},
		//创建收货地址
		createPath(state,item){
			state.list.unshift(item)
		},
		//删除收货地址
		delPath(state,index){
			state.list.splice(index,1)
		},
		//修改收货地址
		updataPath(state,{index,item}){
			//在修改的时候需要对象的value一一赋值
			for(let key in item){
				state.list[index][key] = item[key]
			}
		},
		//取消默认地址
		removeDefault(state){
			//对所有地址进行遍历，如果有默认地址就取消
			state.list.forEach(v=>{
				if(v.isdefault){
					v.isdefault = false
				}
			})
		},
	},
	actions:{
		//修改地址
		updatePathAction({commit},obj){
			if(obj.item.isdefault){
				commit('removeDefault');
			}
			commit('updataPath',obj)
		},
		//增加地址
		createPathAction({commit},item){
			if(item.isdefault){
				commit('removeDefault');
			}
			commit('createPath',item)
		}
	}
}