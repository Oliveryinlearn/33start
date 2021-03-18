import { App } from "vue";

import ssSearch from "./SsSearch/index";
import ssInput from "./SsInput/index";
import ssRadio from "./SsRadio/index";
import ssIcon from "./SsIcon/index";
import ssLoading from "./SsLoading/index";

const components = [ssSearch, ssInput, ssRadio, ssIcon, ssLoading];

//全局注册
const install = function(Vue: App) {
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
	ssIcon,
	ssLoading
};
