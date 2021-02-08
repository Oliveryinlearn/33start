import ssSearch from "./SsSearch/index";
import ssInput from "./SsInput/index";
import ssRadio from "./SsRadio/index";
import ssIcon from "./SsIcon/index";

const components = [ssSearch, ssInput, ssRadio, ssIcon];

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
	ssInput,
	ssRadio,
	ssIcon
};
