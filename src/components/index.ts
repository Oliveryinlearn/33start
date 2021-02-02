import ssSearch from "./Search/index";
import ssInput from "./Input/index";

const components = [ssSearch, ssInput];

//全局注册
const install = function(Vue: any) {
	components.forEach(component => {
		Vue.component(component.name, component);
	});
};

export { ssSearch, ssInput };

export default {
	install,
	ssSearch,
	ssInput
};
