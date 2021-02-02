export default {
	install(Vue: any) {
		/**
		 * 全局混入
		 */
		Vue.mixin({
			methods: {
				/**
				 * 打印错误日志
				 * @param msg 日志信息
				 */
				error(msg: string): void {
					console.error(msg);
				},
				/**
				 * 打印警告日志
				 * @param msg 日志信息
				 */
				warn(msg: string): void {
					console.warn(msg);
				}
			}
		});
	}
};
