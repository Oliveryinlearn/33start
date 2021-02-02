import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入日志打印
import log from "./utils/index";

//引入element-plus
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

//全局引入组件
import ssComponents from "./components/index";

createApp(App)
	.use(store)
	.use(router)
	.use(log)
	.use(ElementPlus)
	.use(ssComponents)
	.mount("#app");
