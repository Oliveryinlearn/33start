/**
 * 自动引入所有vuex模块
 */
const files = require.context("./modules", false, /\.ts$/);
const modules: any = {};

//读取文件内容并加入modules
files.keys().forEach(key => {
	const file: string = key.replace(/\.\/|\.ts/g, "");
	modules[file] = files(key).default;
});

export default {
	// namespaced: true,
	modules
};
