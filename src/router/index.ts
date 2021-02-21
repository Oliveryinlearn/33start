import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/index.vue";

import setting from "../setting";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/discover",
		name: "discover",
		component: () => import("../views/discover/index.vue")
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	// history: createWebHistory(setting.routerMode),
	routes
});

export default router;
