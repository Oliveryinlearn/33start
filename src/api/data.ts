import request from "../plugins/request/index";

export function getData(params: any) {
	return request({
		url: "/mock/data.json",
		method: "get",
		params
	});
}
