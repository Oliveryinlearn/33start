import request from "../plugins/request/index";

export function getData(params: any) {
	return request({
		url: "/mock/data.json",
		method: "get",
		params
	});
}

export function getDisCoverData(params: any) {
	return request({
		url: "/mock/discover.json",
		method: "get",
		params
	});
}
