const env = process.env.NODE_ENV;
import globalConfig from "../public/config/globalConfig";

const Setting = {
	/**
	 * 基础配置
	 * */
	// 接口请求地址
	apiBaseURL:
		env === "development" ? globalConfig.baseApiUrl : globalConfig.baseURL,
	// 数据模拟api请求地址给
	mockBaseURL:
		env === "development" ? globalConfig.mockApiUrl : globalConfig.baseURL,
	defaultSelected: new Date().getHours() < 18 ? "office" : "commonly"
};

export default Setting;
