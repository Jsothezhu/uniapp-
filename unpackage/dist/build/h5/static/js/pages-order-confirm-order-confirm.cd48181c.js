(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-confirm-order-confirm"],{"17f0":function(t,i,e){"use strict";e.r(i);var n=e("8fe4"),o=e("2c1d");for(var r in o)"default"!==r&&function(t){e.d(i,t,(function(){return o[t]}))}(r);var a,s=e("f0c5"),u=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"25f124fa",null,!1,n["a"],a);i["default"]=u.exports},"2c1d":function(t,i,e){"use strict";e.r(i);var n=e("c079"),o=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(i,t,(function(){return n[t]}))}(r);i["default"]=o.a},3277:function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return r})),e.d(i,"a",(function(){return n}));var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticStyle:{background:"#F5F5F5","min-height":"100%"}},[e("v-uni-view",{staticClass:"main-bg-color text-white d-flex a-center px-3",staticStyle:{height:"250rpx"},attrs:{"hover-class":"main-bg-hover-color"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openPathList.apply(void 0,arguments)}}},[e("v-uni-view",[t.path?[e("v-uni-view",{staticClass:"font-lg font-weight d-flex a-center"},[t._v(t._s(t.path.name)+" "+t._s(t.path.phone)),t.path.isdefault?e("v-uni-view",{staticClass:"border border-white rounded px-1 font ml-2"},[t._v("默认")]):t._e()],1),e("v-uni-view",{staticClass:"font"},[t._v(t._s(t.path.province)+" "+t._s(t.path.city)+" "+t._s(t.path.district)+" "+t._s(t.path.address))])]:[e("v-uni-view",{staticClass:"font-lg font-weight d-flex a-center"},[t._v("请选择收货地址")])]],2),e("v-uni-view",{staticClass:"iconfont icon-you ml-auto"})],1),e("v-uni-view",{staticStyle:{"border-top-left-radius":"25rpx","border-top-right-radius":"25rpx","margin-top":"-25rpx",overflow:"hidden"}},[e("v-uni-view",{staticClass:"bg-white"},[e("uniListItem",{attrs:{showArrow:!0,showBadge:!0}},[e("v-uni-view",{staticClass:"d-flex a-center"},t._l(t.goodsList,(function(t,i){return e("v-uni-image",{key:i,staticClass:"rounded mr-2",staticStyle:{width:"100rpx",height:"100rpx"},attrs:{src:t.cover}})})),1),e("v-uni-view",{attrs:{slot:"rightContent"},slot:"rightContent"},[t._v("共"+t._s(t.goodsList.length)+"件")])],1),e("uniListItem",{attrs:{title:"商品总价",showBadge:!0}},[e("v-uni-view",{attrs:{slot:"rightContent"},slot:"rightContent"},[e("price",{attrs:{price:20,color:"text-dark"}})],1)],1),e("uniListItem",{attrs:{title:"运费",showBadge:!0}},[e("v-uni-view",{attrs:{slot:"rightContent"},slot:"rightContent"},[t._v("包邮")])],1),e("uniListItem",{attrs:{title:"优惠券",showArrow:!0,showBadge:!0,link:!0},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openOrderCoupon.apply(void 0,arguments)}}},[e("v-uni-view",{class:t.couponCount>0?"main-text-color":"text-light-muted",attrs:{slot:"rightContent"},slot:"rightContent"},[t.coupon.id>0?e("v-uni-text",[t._v(t._s(0===t.coupon.type?"-"+t.coupon.value+"元":t.coupon.value+"折"))]):e("v-uni-text",[t._v(t._s(0===t.couponCount?"无可用":t.couponCount+"张可用"))])],1)],1),e("uniListItem",{attrs:{showArrow:!0,showBadge:!0}},[e("v-uni-text",{staticClass:"main-text-color"},[t._v("小计")]),e("v-uni-view",{staticClass:"text-light-muted",attrs:{slot:"rightContent"},slot:"rightContent"},[e("price",{attrs:{price:t.price}})],1)],1),e("divider"),e("uniListItem",{attrs:{title:"发票",showArrow:!0,showBadge:!0,link:!0},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openOrderInvoice.apply(void 0,arguments)}}},[e("v-uni-view",{attrs:{slot:"rightContent"},slot:"rightContent"},[t._v("电子发票-个人")])],1)],1)],1),e("v-uni-view",{staticClass:"position-fixed d-flex a-center j-end border bottom-0 left-0 right-0 bg-white p-2"},[t._v("合计："),e("price",{staticClass:"mt-2",attrs:{price:t.price}}),e("v-uni-view",{staticClass:"ml-2 px-1 py-1 main-bg-color text-white",staticStyle:{"border-radius":"50rpx"},attrs:{"hover-class":"main-bg-hover-color"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openPayMethods.apply(void 0,arguments)}}},[t._v(t._s(t.loading?"加载中":"去支付"))])],1)],1)},r=[]},"3e58":function(t,i,e){"use strict";(function(t){var n=e("4ea4");e("7db0"),e("a15b"),e("d81d"),e("b680"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=n(e("5530")),r=n(e("fff4")),a=n(e("17f0")),s=n(e("0253")),u=e("2f62"),c={components:{uniListItem:r.default,price:a.default},data:function(){return{loading:!1,path:!1,items:[],couponCount:0,coupon:{id:0,type:0,value:0},order_id:0}},computed:(0,o.default)((0,o.default)((0,o.default)({},(0,u.mapState)({list:function(t){return t.cart.list}})),(0,u.mapGetters)(["defaultPath","totalPrice"])),{},{goodsList:function(){var t=this;return this.items.map((function(i){return t.list.find((function(t){return t.id===i}))}))},price:function(){return 0===this.coupon.id?this.totalPrice:0===this.coupon.type?this.totalPrice-this.coupon.value:this.totalPrice*(this.coupon.value/10).toFixed(2)}}),methods:{openPathList:function(){uni.navigateTo({url:"../user-path-list/user-path-list?type=choose"})},openOrderInvoice:function(){uni.navigateTo({url:"../order-invoice/order-invoice"})},openPayMethods:function(){var i=this;if(!this.loading){if(!this.path)return uni.showToast({title:"请选择收货地址",icon:"none"});var e={user_addresses_id:this.path.id,items:this.items.join(",")};this.loading=!0,this.coupon.id>0&&(e.coupon_user_id=this.coupon.id),s.default.post("/order",e,{token:!0}).then((function(t){i.loading=!1,uni.navigateTo({url:"../pay-methods/pay-methods?detail="+JSON.stringify({id:t.id,price:t.total_price})}),i.order_id=t.id,uni.$emit("updateCart")})).catch((function(e){i.loading=!1,t("log",token," at pages/order-confirm/order-confirm.vue:178"),t("log",e," at pages/order-confirm/order-confirm.vue:179"),uni.showToast({title:"创建订单失败",icon:"none"})})),uni.navigateTo({url:"../pay-methods/pay-methods"})}},openOrderCoupon:function(){uni.navigateTo({url:"../order-coupon/order-coupon?detail="+JSON.stringify({price:this.totalPrice})})},getCouponCount:function(){var t=this;s.default.post("/coupon_count",{price:this.totalPrice},{token:!0}).then((function(i){t.couponCount=i})).catch((function(t){uni.showToast({title:"获取可用的优惠券数量",icon:"none"})}))}},onLoad:function(t){var i=this;if(!t.detail)return uni.showToast({title:"请选择要下单的商品",icon:"none"}),uni.navigateBack({delta:1});this.items=JSON.parse(t.detail),this.defaultPath.length&&(this.path=this.defaultPath[0]),uni.$on("choosePath",(function(t){i.path=t})),uni.$on("couponUser",(function(t){i.coupon=t})),this.getCouponCount()},onShow:function(){this.order_id>0&&uni.redirectTo({url:"../order-detail/order-detail?id="+this.order_id})},onUnload:function(){uni.$off("choosePath"),uni.$off("couponUser")}};i.default=c}).call(this,e("0de9")["log"])},"8fe4":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return r})),e.d(i,"a",(function(){return n}));var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"d-flex a-self-start font-md line-h",class:t.priceSize+" "+t.color},[e("v-uni-text",{staticClass:"a-self-start font-sm",class:t.unitSize},[t._v("￥")]),t._v(t._s(t.price))],1)},r=[]},c079:function(t,i,e){"use strict";e("a9e3"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={props:{priceSize:{type:String,default:"font-md"},unitSize:{type:String,default:"font-sm"},color:{type:String,default:"main-text-color"},price:[Number,String]}};i.default=n},d378:function(t,i,e){"use strict";e.r(i);var n=e("3277"),o=e("d6b7");for(var r in o)"default"!==r&&function(t){e.d(i,t,(function(){return o[t]}))}(r);var a,s=e("f0c5"),u=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"1f6d08e3",null,!1,n["a"],a);i["default"]=u.exports},d6b7:function(t,i,e){"use strict";e.r(i);var n=e("3e58"),o=e.n(n);for(var r in n)"default"!==r&&function(t){e.d(i,t,(function(){return n[t]}))}(r);i["default"]=o.a}}]);