/**
 * 判断是否是数字
 * @param {*} number
 */
export function isNumber(number: number): boolean {
	return Object.prototype.toString.call(number) === "[object Number]";
}

/**
 * 判断是否是一个对象
 * @param {Object} obj 需要判断的目标
 */
export function isObj(obj: object): boolean {
	return Object.prototype.toString.call(obj) === "[object Object]";
}

/**
 * 随机数
 * @param {*} Min 最小值
 * @param {*} Max  最大值
 */
export function randomNum(Min: number, Max: number): number {
	if (!isNumber(Min) || !isNumber(Max) || isNaN(Min) || isNaN(Max)) {
		console.error("随机数的参数必须是一个数字");
	}

	const Range = Max - Min;
	const Rand = Math.random();
	const num = Min + Math.round(Rand * Range); //四舍五入
	return num;
}

interface OptionsType {
	el: string;
	src: string;
	bottom?: number;
}

/**
 * 实现图片懒加载
 */
export class LazyImg {
	options: OptionsType;
	bottom: number;
	constructor(options: OptionsType) {
		this.options = options;

		this.bottom = options.bottom || 30;

		//启用绑定
		this.init();
	}
	init() {
		const options = this.options,
			bottom = this.bottom;

		const el = document.querySelector(options.el);
		if (el === null) return;

		const img = el.querySelectorAll("img");

		/**
		 * 将data-src中的图片路径填入
		 * @param imgArr 由img标签组成的DOM数组
		 */
		function loadImg(imgArr: NodeListOf<HTMLImageElement>) {
			for (const item of imgArr) {
				//获取存储图片地址的自定义自定义属性
				const dataSrc = item.getAttribute(options.src);
				//判断是否存在自定义属性data-src
				if (!dataSrc) continue;

				const imgDomTop = item.getBoundingClientRect().top;

				const visibleBottom =
					window.scrollY + document.documentElement.clientHeight;

				if (imgDomTop + bottom < visibleBottom) {
					item.src = dataSrc;
					//添加过了就移除
					item.removeAttribute(options.src);
					item.onload = () => {
						item.style.opacity = "1";
					};
				}
			}
		}

		loadImg(img);

		function handleScroll() {
			// console.log(img);
			const name = document.querySelector(options.el);
			if (name === null) return;
			const newImg = name.querySelectorAll("img");

			loadImg(newImg);
			// const dom = doc
			// el.
			// _this.loadImg(img);
		}
		//移除
		// el.removeEventListener("scroll", handleScroll);
		//添加
		el.addEventListener("scroll", handleScroll);
	}
	/**
	 * 将data-src中的图片路径填入
	 * @param imgArr 由img标签组成的DOM数组
	 */
	loadImg(imgArr: NodeListOf<HTMLImageElement>) {
		for (const item of imgArr) {
			//获取存储图片地址的自定义自定义属性
			const dataSrc = item.getAttribute(this.options.src);
			//判断是否存在自定义属性data-src
			if (!dataSrc) continue;

			const imgDomTop = item.getBoundingClientRect().top;

			const visibleBottom =
				window.scrollY + document.documentElement.clientHeight;

			if (imgDomTop + this.bottom < visibleBottom) {
				item.src = dataSrc;
				//添加过了就移除
				item.removeAttribute(this.options.src);
				console.log(item);
			}
		}
		// console.log(this.options);
	}
	/**
	 * 添加滚动
	 */
	handleScroll() {
		// const img = this.querySelectorAll("img");
		// console.log(this.querySelectorAll("img"));
		// const aaa = document.querySelector(this.options.el);
		// console.log(img);
		// this.loadImg(img);
	}
	/**
	 *移除滚动
	 */
	removeScroll() {
		// if (!this.elDom) return;
		// this.elDom.removeEventListener("scroll", this.handleScroll);
	}
}

//生成随机图片的网站
export const url = `https://picsum.photos/220/220?random=`;
export const urlArr = `https://picsum.photos/220/96?random=`;

/**
 * 多行文字处理
 * @param {string} content 处理的最大文字数量
 * @param {number} max 处理的最大文字数量
 */
export function maxText(content: string, max: number) {
	const maxNumber = max;

	//判断是否是字符串
	if (typeof content !== "string") {
		console.error("处理内容必须是字符串格式");
		return null;
	}

	//判断长度是否符合要求
	if (content.length < maxNumber) {
		return content;
	} else {
		return content.substring(0, maxNumber) + "...";
	}
}

/**
 * 操作localStorage
 */
export class HandleLocalStroage {
	value: string;
	constructor(value: string) {
		this.value = value;
	}
	/**
	 * 获取存储的
	 */
	getLocalStrage() {
		const getStrage: string | null = localStorage.getItem(this.value);
		//转换
		// const getStrageArr = ;
		return getStrage ? JSON.parse(getStrage) : [];
	}
	/**
	 * 设置
	 */
	setLocalStrage(data: any) {
		const curData: any = this.getLocalStrage();
		let setDataArr = [],
			setJsonStr = null;
		// let setJsonStr = null;
		if (curData.length === 0) {
			//保存一个新数组
			setDataArr.push(data);
			//转成json字符串
			setJsonStr = JSON.stringify(setDataArr);
		} else {
			//将存储的转成数组对象，且添加新内容
			setDataArr = curData.unshift(data);
			//转成json字符串
			setJsonStr = JSON.stringify(setDataArr);
		}

		//存储
		localStorage.setItem(this.value, setJsonStr);
	}
}
