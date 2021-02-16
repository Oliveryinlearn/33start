const env = process.env.NODE_ENV;
import globalConfig from "../public/config/globalConfig";

const Setting = {
	/**
	 * 基础配置
	 * */
	// 路由模式，可选值为 history 或 hash
	routerMode: "history",
	// 接口请求地址
	apiBaseURL:
		env === "development" ? globalConfig.baseApiUrl : globalConfig.baseURL,
	// 数据模拟api请求地址给
	mockBaseURL:
		env === "development" ? globalConfig.mockApiUrl : globalConfig.baseURL
};

export default Setting;
