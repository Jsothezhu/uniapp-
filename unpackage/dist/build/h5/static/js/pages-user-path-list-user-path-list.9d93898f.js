(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-path-list-user-path-list"],{"0930":function(t,e,n){"use strict";n.r(e);var i=n("9a09"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"102c":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"position-absolute d-flex flex-column a-center j-center top-0 left-0 bottom-0 right-0",staticStyle:{"background-color":"#f5f5f5"}},[n("v-uni-image",{staticStyle:{width:"250rpx"},attrs:{src:t.getIcon,mode:"widthFix"}}),n("v-uni-view",{staticStyle:{color:"#b2b2b2"}},[t._v(t._s(t.msg))])],1)},a=[]},"2b58":function(t,e,n){"use strict";n.r(e);var i=n("6a7f"),o=n("fe0f");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);var s,r=n("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"745189c8",null,!1,i["a"],s);e["default"]=u.exports},"36f8":function(t,e,n){"use strict";function i(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],n=!0,i=0;i<e.length-1;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}n("c975"),Object.defineProperty(e,"__esModule",{value:!0}),e.isPC=i},"410b":function(t,e,n){"use strict";n.r(e);var i=n("8e39"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"48b3":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{icon:{type:String,default:"no_comment"},msg:{type:String,default:"还没有待付款订单"}},computed:{getIcon:function(){return"/static/images/nothing/".concat(this.icon,".png")}}};e.default=i},"4f44":function(t,e,n){"use strict";var i=n("e884"),o=n.n(i);o.a},6405:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("5530")),a=i(n("fff4")),s=i(n("f3e0")),r=i(n("aa83")),u=n("2f62"),c=i(n("0253")),l=i(n("6fbf")),f={components:{uniListItem:a.default,uniSwipeAction:s.default,uniSwipeActionItem:r.default,noThing:l.default},data:function(){return{loadtext:"上拉加载更多",page:1,isChoose:!1,options:[{text:"修改",style:{backgroundColor:"#007aff"}},{text:"删除",style:{backgroundColor:"#dd524d"}}]}},computed:(0,o.default)({},(0,u.mapState)({list:function(t){return t.path.list}})),methods:(0,o.default)((0,o.default)({},(0,u.mapMutations)(["delPath","updatePathList"])),{},{getData:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];c.default.get("/useraddresses/"+this.page,{},{token:!0}).then((function(n){var i=1===t.page;t.updatePathList({refresh:i,list:n}),t.loadtext=n.length<10?"没有更多了":"上拉加载更多","function"===typeof e&&(uni.showToast({title:"刷新成功",icon:"none"}),e())})).catch((function(n){"function"===typeof e&&e(),t.page>1&&(t.page--,t.loadtext="上拉加载更多")}))},bindClick:function(t,e){var n=this;switch(t.index){case 0:var i={index:e,item:this.list[e]};i.item.default=0===e&&null!==i.item.last_used_time?1:0,setTimeout((function(){uni.navigateTo({url:"../user-path-edit/user-path-edit?data="+JSON.stringify(i)})}),50);break;case 1:uni.showModal({content:"要删除该收货地址吗？",success:function(t){t.confirm&&c.default.del("/useraddresses/"+n.list[e].id,{},{token:!0}).then((function(t){n.delPath(e),uni.showToast({title:"删除成功"})}))}});break}},choose:function(t){uni.$emit("choosePath",t),uni.navigateBack({delta:1})}}),onLoad:function(t){var e=this;"choose"===t.type&&(this.isChoose=!0),this.getData(),uni.$on("updateUserPathList",(function(){e.page=1,e.getData()}))},onUnload:function(){uni.$off("updateUserPathList")},onNavigationBarButtonTap:function(t){this.isChoose&&0===t.index&&uni.navigateTo({url:"../user-path-edit/user-path-edit"})},onPullDownRefresh:function(){this.page=1,this.getData((function(){uni.stopPullDownRefresh()}))},onReachBottom:function(){"上拉加载更多"===this.loadtext&&(this.loadtext="加载中...",this.page++,this.getData(!1))}};e.default=f},"6a7f":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t._l(t.list,(function(e,i){return[n("uniSwipeAction",[n("uniSwipeActionItem",{attrs:{rightOptions:t.options},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.bindClick(e,i)}}},[n("uniListItem",{attrs:{link:!0},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.choose(e)}}},[n("v-uni-view",{staticClass:"text-secondary"},[n("v-uni-view",{staticClass:"d-flex a-center"},[n("v-uni-text",{staticClass:"main-text-color"},[t._v(t._s(e.name))]),t._v(t._s(e.phone)),0===i&&null!==e.last_used_time?n("v-uni-text",{staticClass:"main-text-color"},[t._v("[默认]")]):t._e()],1),n("v-uni-view",{},[t._v(t._s(e.province)+t._s(e.city)+t._s(e.district))]),n("v-uni-view",{},[t._v(t._s(e.address))])],1)],1)],1)],1)]})),0===t.list.length?n("no-thing",{attrs:{msg:"空空如也"}}):t._e(),n("v-uni-view",{staticClass:"d-flex a-center j-center text-light-muted font-md py-3"},[t._v(t._s(t.loadtext))])],2)},a=[]},"6fbf":function(t,e,n){"use strict";n.r(e);var i=n("102c"),o=n("b82c");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);var s,r=n("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"04625089",null,!1,i["a"],s);e["default"]=u.exports},8850:function(t,e,n){"use strict";var i=function(t){(t.options.wxs||(t.options.wxs={}))["swipe"]=function(t){var e=10;function n(t,e,n,i){var o=i.getState(),a=JSON.parse(t);a&&a.data&&0!==a.data.length&&(o.leftWidth=a.data[0].width,o.rightWidth=a.data[1].width,o.threshold=i.getDataset().threshold,a.show&&"none"!==a.show?c(a.show,i,n):(o.left&&c("none",i,n),f(i)))}function i(t,e){var n=t.instance,i=n.getDataset().disabled,o=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||(n.requestAnimationFrame((function(){n.removeClass("ani"),e.callMethod("closeSwipe")})),o.x=o.left||0,d(t,e))}function o(t,e){var n=t.instance,i=n.getDataset().disabled,o=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||(p(t),"horizontal"===o.direction&&(t.preventDefault&&t.preventDefault(),s(o.x+o.deltaX,n,e)))}function a(t,e){var n=t.instance,i=n.getDataset().disabled,o=n.getState();i=("string"===typeof i?JSON.parse(i):i)||!1,i||u(o.left,n,e)}function s(t,e,n){t=t||0;var i=e.getState(),o=i.leftWidth,a=i.rightWidth;i.left=r(t,-a,o),e.requestAnimationFrame((function(){e.setStyle({transform:"translateX("+i.left+"px)","-webkit-transform":"translateX("+i.left+"px)"})}))}function r(t,e,n){return Math.min(Math.max(t,e),n)}function u(t,e,n){var i=e.getState(),o=i.threshold,a=(i.position,i.isopen||"none"),s=i.leftWidth,r=i.rightWidth;0!==i.deltaX?c("none"===a&&r>0&&-t>o||"none"!==a&&r>0&&r+t<o?"right":"none"===a&&s>0&&t>o||"none"!==a&&s>0&&s-t<o?"left":"none",e,n):c("none",e,n)}function c(t,e,n){var i=e.getState(),o=(i.position,i.leftWidth),a=i.rightWidth,r="";switch(i.isopen=i.isopen?i.isopen:"none",t){case"left":r=o;break;case"right":r=-a;break;default:r=0}i.isopen!==t&&(i.throttle=!0,n.callMethod("change",{open:t})),i.isopen=t,e.requestAnimationFrame((function(){e.addClass("ani"),s(r,e,n)}))}function l(t,n){return t>n&&t>e?"horizontal":n>t&&n>e?"vertical":""}function f(t){var e=t.getState();e.direction="",e.deltaX=0,e.deltaY=0,e.offsetX=0,e.offsetY=0}function d(t){var e=t.instance,n=e.getState();f(e);var i=t.touches[0];h()&&(i=t),n.startX=i.clientX,n.startY=i.clientY}function p(t){var e=t.instance,n=e.getState(),i=t.touches[0];h()&&(i=t),n.deltaX=i.clientX-n.startX,n.deltaY=i.clientY-n.startY,n.offsetY=Math.abs(n.deltaY),n.offsetX=Math.abs(n.deltaX),n.direction=n.direction||l(n.offsetX,n.offsetY)}function h(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],n=!0,i=0;i<e.length-1;i++)if(t.indexOf(e[i])>0){n=!1;break}return n}var v=!1;function b(t,e){h()&&(i(t,e),v=!0)}function w(t,e){h()&&v&&o(t,e)}function g(t,e){h()&&(a(t,e),v=!1)}function m(t,e){h()&&(v=!1)}return t.exports={sizeReady:n,touchstart:i,touchmove:o,touchend:a,mousedown:b,mousemove:w,mouseup:g,mouseleave:m},t.exports}({exports:{}})};e["a"]=i},"8e39":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{}},provide:function(){return{swipeaction:this}},created:function(){this.children=[]},methods:{closeOther:function(t){this.openItem&&this.openItem!==t&&(this.openItem.button.show="none"),this.openItem=t}}};e.default=i},"9a09":function(t,e,n){"use strict";var i=n("4ea4");n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("f28e")),a={mixins:[o.default],props:{show:{type:String,default:"none"},disabled:{type:Boolean,default:!1},autoClose:{type:Boolean,default:!0},threshold:{type:Number,default:20},leftOptions:{type:Array,default:function(){return[]}},rightOptions:{type:Array,default:function(){return[]}}},inject:["swipeaction"]};e.default=a},a081:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".uni-swipe[data-v-0b5a151a]{position:relative;\noverflow:hidden\n}.uni-swipe_box[data-v-0b5a151a]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-shrink:0;flex-shrink:0;\nposition:relative}.uni-swipe_text--center[data-v-0b5a151a]{width:100%;\ncursor:grab\n}.uni-swipe_button-group[data-v-0b5a151a]{\nbox-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;position:absolute;top:0;bottom:0;\ncursor:pointer\n}.button-group--left[data-v-0b5a151a]{left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.button-group--right[data-v-0b5a151a]{right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}.uni-swipe_button[data-v-0b5a151a]{\n\n\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 20px}.uni-swipe_button-text[data-v-0b5a151a]{\n-webkit-flex-shrink:0;flex-shrink:0;\nfont-size:14px}.ani[data-v-0b5a151a]{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-timing-function:cubic-bezier(.165,.84,.44,1);transition-timing-function:cubic-bezier(.165,.84,.44,1)}\n\n\n\n\n\n\n\n\n\n",""]),t.exports=e},aa83:function(t,e,n){"use strict";n.r(e);var i=n("de23"),o=n("0930");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("4f44");var s,r=n("f0c5"),u=n("8850"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"0b5a151a",null,!1,i["a"],s);"function"===typeof u["a"]&&Object(u["a"])(c),e["default"]=c.exports},b0c9:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[t._t("default")],2)},a=[]},b82c:function(t,e,n){"use strict";n.r(e);var i=n("48b3"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},de23:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"uni-swipe"},[n("v-uni-view",{wxsProps:{"change:prop":"btn"},staticClass:"uni-swipe_box",attrs:{"data-threshold":t.threshold,"data-disabled":t.disabled,"change:prop":t.swipe.sizeReady,prop:t.btn},on:{touchstart:function(e){e=t.$handleWxsEvent(e),t.swipe.touchstart(e,t.$getComponentDescriptor())},touchmove:function(e){e=t.$handleWxsEvent(e),t.swipe.touchmove(e,t.$getComponentDescriptor())},touchend:function(e){e=t.$handleWxsEvent(e),t.swipe.touchend(e,t.$getComponentDescriptor())},mousedown:function(e){e=t.$handleWxsEvent(e),t.swipe.mousedown(e,t.$getComponentDescriptor())},mousemove:function(e){e=t.$handleWxsEvent(e),t.swipe.mousemove(e,t.$getComponentDescriptor())},mouseup:function(e){e=t.$handleWxsEvent(e),t.swipe.mouseup(e,t.$getComponentDescriptor())},mouseleave:function(e){e=t.$handleWxsEvent(e),t.swipe.mouseleave(e,t.$getComponentDescriptor())}}},[n("v-uni-view",{staticClass:"uni-swipe_button-group button-group--left"},[t._t("left",t._l(t.leftOptions,(function(e,i){return n("v-uni-view",{key:i,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"},attrs:{"data-button":t.btn},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.appTouchEnd(n,i,e,"left")},click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.onClickForPC(i,e,"left")}}},[n("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF"}},[t._v(t._s(e.text))])],1)})))],2),n("v-uni-view",{staticClass:"uni-swipe_text--center"},[t._t("default")],2),n("v-uni-view",{staticClass:"uni-swipe_button-group button-group--right"},[t._t("right",t._l(t.rightOptions,(function(e,i){return n("v-uni-view",{key:i,staticClass:"uni-swipe_button button-hock",style:{backgroundColor:e.style&&e.style.backgroundColor?e.style.backgroundColor:"#C7C6CD",fontSize:e.style&&e.style.fontSize?e.style.fontSize:"16px"},attrs:{"data-button":t.btn},on:{touchstart:function(e){arguments[0]=e=t.$handleEvent(e),t.appTouchStart.apply(void 0,arguments)},touchend:function(n){arguments[0]=n=t.$handleEvent(n),t.appTouchEnd(n,i,e,"right")},click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.onClickForPC(i,e,"right")}}},[n("v-uni-text",{staticClass:"uni-swipe_button-text",style:{color:e.style&&e.style.color?e.style.color:"#FFFFFF"}},[t._v(t._s(e.text))])],1)})))],2)],1)],1)},a=[]},e884:function(t,e,n){var i=n("a081");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("9214d5ac",i,!0,{sourceMap:!1,shadowMode:!1})},f28e:function(t,e,n){"use strict";n("4160"),n("a434"),n("ac1f"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("36f8"),o={data:function(){return{position:[],button:{},btn:"[]"}},watch:{button:{handler:function(t){this.btn=JSON.stringify(t)},deep:!0},show:function(t){this.autoClose||(this.button?this.button.show=t:this.init())},leftOptions:function(){this.init()},rightOptions:function(){this.init()}},created:function(){void 0!==this.swipeaction.children&&this.swipeaction.children.push(this)},mounted:function(){this.init()},beforeDestroy:function(){var t=this;this.swipeaction.children.forEach((function(e,n){e===t&&t.swipeaction.children.splice(n,1)}))},methods:{init:function(){var t=this;clearTimeout(this.swipetimer),this.swipetimer=setTimeout((function(){t.getButtonSize()}),50)},closeSwipe:function(t){this.autoClose&&this.swipeaction.closeOther(this)},change:function(t){this.$emit("change",t.open);var e=this.button.show;e!==t.open&&(this.button.show=t.open)},appTouchStart:function(t){if(!(0,i.isPC)()){var e=t.changedTouches[0].clientX;this.clientX=e,this.timestamp=(new Date).getTime()}},appTouchEnd:function(t,e,n,o){if(!(0,i.isPC)()){var a=t.changedTouches[0].clientX,s=Math.abs(this.clientX-a),r=(new Date).getTime()-this.timestamp;s<40&&r<300&&this.$emit("click",{content:n,index:e,position:o})}},onClickForPC:function(t,e,n){(0,i.isPC)()&&this.$emit("click",{content:e,index:t,position:n})},getButtonSize:function(){var t=this,e=uni.createSelectorQuery().in(this);e.selectAll(".uni-swipe_button-group").boundingClientRect((function(e){var n="none";n=t.autoClose?"none":t.show,t.button={data:e,show:n}})).exec()}}};e.default=o},f3e0:function(t,e,n){"use strict";n.r(e);var i=n("b0c9"),o=n("410b");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);var s,r=n("f0c5"),u=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"60e0f168",null,!1,i["a"],s);e["default"]=u.exports},fe0f:function(t,e,n){"use strict";n.r(e);var i=n("6405"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a}}]);