//导航切换类型
export interface Filter {
	value: string;
	title: string;
	number: number;
	children: DataChildrenType[];
	selected: boolean;
}

//内容
export interface DataChildrenType {
	title: string;
	img: string;
	info: string;
	url: string;
}

//请求到的数据类型
export interface DataType {
	title: string;
	type: string;
	children: DataChildrenType[];
}

//标题的数据
export interface NavType {
	title: string;
	number: number;
	value: string;
	selected: boolean;
	children: DataChildrenType[];
}

//导航
export interface FilterNav {
	nav: Filter[];
	selected: string;
}

//便签类型
export interface DiscoverType {
	state: string;
	text: string;
}

//便签表单
export interface formData {
	title: string;
	state: string;
	desc: string;
	label: string;
}

//便签类型
export interface LabelType {
	title: string;
	id: string;
}
