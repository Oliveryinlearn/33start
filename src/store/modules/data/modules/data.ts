//引入类型
import { DataType } from "../../../../type/index";

export default {
	namespaced: true,
	state: {
		homeCardData: {},
		selected: "commonly"
	},
	getters: {
		getHomeCardData(state: any) {
			return state.homeCardData;
		},
		getNavList(state: any) {
			const data: DataType[] = state.homeCardData;
			return data.map(el => {
				return {
					title: el.title,
					number: el.children.length,
					value: el.type,
					selected: state.selected === el.type ? true : false,
					children: el.children
				};
			});
		},
		getSelected(state: any) {
			return state.selected;
		}
	},
	mutations: {
		setCardData(state: any, data: DataType[]) {
			state.homeCardData = data;
		},
		/**
		 * 保存当前选中的页签
		 * @param state
		 * @param selected 点击的页签
		 */
		setNavSelected(state: any, selected: string) {
			state.selected = selected;
		}
	},
	actions: {
		/**
		 * 保存卡片数据
		 * @param context
		 * @param data 数据
		 */
		setHomeData(context: any, data: DataType[]) {
			const { commit } = context;
			commit("setCardData", data);
		}
	}
};
