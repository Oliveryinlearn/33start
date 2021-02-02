import ssInput from "./src/index.vue";

//添加一个install函数
(ssInput as any).install = function(Vue: any) {
	//注册全局组件
	Vue.component(ssInput.name, ssInput);
};
//导出
export default ssInput;
