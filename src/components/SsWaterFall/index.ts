import ssSearch from "./src/index.vue";

//添加一个install函数
(ssSearch as any).install = function(Vue: any) {
	//注册全局组件
	Vue.component(ssSearch.name, ssSearch);
};
//导出
export default ssSearch;
