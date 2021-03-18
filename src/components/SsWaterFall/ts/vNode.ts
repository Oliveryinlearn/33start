//传入data的children的类型
interface DataChildType {
	title: string;
	url: string;
}
//传入的数据格式
export interface DataType {
	img?: string;
	info: string;
	title: string;
	url: string;
	top?: number;
	left?: number;
	children?: DataChildType[];
}

//返回的虚拟dom的格式
// interface VNodeType {}

const CARE_NUMBER = {
	single: 14.165,
	multiple: 8
};
const COLUMN = 6,
	title = 2.4,
	des = 3,
	space = 1,
	cardBottom = 1;

/**
 * 返回添加距离后的DOM数据
 * @param data 未处理的数据
 */
export const wateVNode = (data: DataType[]) => {
	// console.log(data[0]);
	const position = new Array(COLUMN);
	// console.log(position);

	for (let i = 0; i < data.length; i++) {
		//判断当前的卡片属于那一列
		const index: number = i % COLUMN;
		//判断当前属于哪一行
		const curColumn: number = Math.floor(i / COLUMN);

		//计算当前卡片的高度
		const children = data[i].children;
		let itemHeight = 0; //卡片高度
		if (children && children.length > 1) {
			itemHeight =
				children.length * CARE_NUMBER.multiple + title + des + cardBottom;
		} else {
			itemHeight = CARE_NUMBER.single + title + des + cardBottom;
		}

		//计算卡片距离顶部的高度
		data[i].top = curColumn === 0 ? 0 : position[index];

		//累计保存当前列距离顶部的高度：累计高度+卡片高度+间隔
		position[index] =
			(position[index] ? position[index] : 0) + itemHeight + space;

		//计算距离左侧的距离
		let itemLeft = 0;
		itemLeft = CARE_NUMBER.single * index + space * index;

		data[i].left = itemLeft;
	}
	return data;
};
