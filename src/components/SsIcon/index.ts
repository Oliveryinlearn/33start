import ssIcon from "./src/index.vue";

//添加一个install函数
(ssIcon as any).install = function(Vue: any) {
	//注册全局组件
	Vue.component(ssIcon.name, ssIcon);
};
//导出
export default ssIcon;
