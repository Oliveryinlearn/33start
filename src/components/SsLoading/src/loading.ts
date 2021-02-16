// import loading from "./index.vue";
// import { Vue } from "vue-class-component";
// const Dom = Vue.extend(loading);

// const CLASS_NAME = ["ts-hide"];

// //动画持续时间
// const ANIMATE_TIME = 200;
// //是否全屏的字符串
// const FULL_SCREEN = "fullscreen";

// Vue.directive("ts-loading", {
// 	inserted(el: any, binding: any) {
// 		const arg = binding.arg;
// 		const modifiers = binding.modifiers;

// 		//配置参数
// 		let data = {
// 			show: true
// 		};

// 		//动态参数
// 		const direction = (() => {
// 			return arg ? { text: arg } : { text: "加载中" };
// 		})();

// 		//修饰符
// 		const modifiersFull = (() => {
// 			return modifiers[FULL_SCREEN]
// 				? { dirPosition: "fixed" }
// 				: { dirPosition: "absolute" };
// 		})();

// 		data = { ...data, ...direction, ...modifiersFull };

// 		//手动挂载
// 		const loadingDom = new Dom({
// 			data
// 		}).$mount();

// 		el.dom = loadingDom.$el;
// 		//将执行隐藏动画的类名添加到dom上
// 		el.class = CLASS_NAME[0];
// 	},
// 	update(el: any, binding: any) {
// 		if (binding.oldValue === binding.value) return;

// 		//判断是否有隐藏动画类名，有，移除
// 		if (el.dom.className.indexOf(el.class) > 0) {
// 			el.dom.classList.remove(el.class);
// 		}

// 		if (binding.value) {
// 			el.appendChild(el.dom);
// 		} else {
// 			el.dom.classList.add(el.class);

// 			//执行隐藏动画
// 			setTimeout(() => {
// 				const node = document.querySelector(`.${el.class}`);
// 				if (node) {
// 					el.removeChild(node);
// 					el.dom.classList.remove(el.class);
// 				}
// 			}, ANIMATE_TIME);
// 		}
// 	}
// });

// export default loading;
