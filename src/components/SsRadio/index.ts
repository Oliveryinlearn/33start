import ssRadio from "./src/index.vue";

//添加一个install函数
(ssRadio as any).install = function(Vue: any) {
	//注册全局组件
	Vue.component(ssRadio.name, ssRadio);
};
//导出
export default ssRadio;
