import axios from "axios";
import Setting from "../../setting";

// 创建一个错误
function errorCreate(msg: string) {
	const err = new Error(msg);
	throw err;
}

// 创建一个 axios 实例
const service = axios.create({
	baseURL: Setting.apiBaseURL,
	timeout: 1000000, // 请求超时时间
	headers: {
		"Content-Type": "application/json"
	}
});

// 请求拦截器
service.interceptors.request.use(
	config => {
		// 约定: 如果header里面isMock字段为true，表明是模拟数据, 会请求easy-mock模拟接口服务
		config.baseURL = config.headers["isMock"]
			? Setting.mockBaseURL
			: Setting.apiBaseURL;
		// 获取Content-Type, 匹配特殊请求方式
		const contentType = config.headers["Content-Type"];

		config.method === "get" || contentType === "multipart/form-data"
			? (config.params = { ...config.params })
			: (config.data = JSON.stringify({ ...config.data }));

		// 在请求发送之前做一些处理
		// const token = util.cookies.get('token') || "";
		// 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
		// config.headers['token'] = token;
		return config;
	},
	error => {
		// 发送失败
		console.log(error);
		Promise.reject(error);
	}
);
// 响应拦截器
service.interceptors.response.use(
	response => {
		// dataAxios 是 axios 返回数据中的 data
		const dataAxios = response.data;
		// 这个状态码是和后端约定的
		const { code, msgCode } = dataAxios;
		// 如果msgCode有值，说明后台抛出异常，需要在拦截器捕获
		if (msgCode) {
			if (msgCode == 404 || msgCode == 500) {
				errorCreate(`系统异常`);
			} else {
				errorCreate(`[ code: ${msgCode} ] ${dataAxios.msg}`);
			}
		} else {
			// 根据 code 进行判断
			if (code === undefined) {
				// 如果没有 code 代表这不是项目后端开发的接口
				return dataAxios;
			} else {
				// 有 code 代表这是一个后端接口 可以进行进一步的判断
				switch (code) {
					case 10000:
						// [ 示例 ] code === 0 代表没有错误
						return dataAxios.data;
					default:
						// 不是正确的 code
						errorCreate(`[ code: ${dataAxios.code} ]:${dataAxios.msg}`);
						break;
				}
			}
		}
	},
	error => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = "请求错误";
					break;
				case 401:
					error.message = "未授权，请登录";
					break;
				case 403:
					error.message = "拒绝访问";
					break;
				case 404:
					error.message = `请求地址出错: ${error.response.config.url}`;
					break;
				case 408:
					error.message = "请求超时";
					break;
				case 500:
					error.message = "服务器内部错误";
					break;
				case 501:
					error.message = "服务未实现";
					break;
				case 502:
					error.message = "网关错误";
					break;
				case 503:
					error.message = "服务不可用";
					break;
				case 504:
					error.message = "网关超时";
					break;
				case 505:
					error.message = "HTTP版本不受支持";
					break;
				default:
					break;
			}
		}
		return Promise.reject(error);
	}
);

export default service;
