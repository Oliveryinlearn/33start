import ssLoading from "./src/index.vue";

//添加一个install函数
(ssLoading as any).install = function(Vue: any) {
	//注册全局组件
	Vue.component(ssLoading.name, ssLoading);
};
//导出
export default ssLoading;
