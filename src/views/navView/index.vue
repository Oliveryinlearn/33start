<!--导航栏-->
<template>
    <div class="nav">
        <div class="nav-container">
            <!--左侧选项-->
            <ul :class="['nav-ul-container']">
                <li
                    v-for="(item,index) in nav"
                    :key="index"
                    :class="[{'is-active':selectedNav===item}]"
                    @click="handleNav(item)"
                >{{item}}</li>
            </ul>
            <!--搜索组件-->
            <div class="search-container">
                <ss-search/>
            </div>
            <!--右侧部分-->
            <div class="right-container">
                <div class="nav-style setting-icon" @click="handleNav('setting')">
                    <ss-icon icon="icon-home"/>
                </div>
                <div class="nav-style setting-user" @click="handleNav('user')">
                    <ss-icon icon="icon-ziyuan"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance } from "vue";
//引入类型
import { navList } from "./types/type";
//引入路由函数
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default defineComponent({
    setup(props: object, context: object) {
        //初始化路由
        const router = useRouter();

        const nav: navList[] = ["首页", "便签"];

        const curRoute = window.location.pathname;

        const navCur = curRoute === "/discover" ? nav[1] : nav[0];

        const selectedNav = ref<navList>(navCur);

        /**
         * 点击nav上的标签触发事件
         * @params {String} value 点击对应的值
         */
        function handleNav(value: navList): void {
            //预处理，如果点击对tab跟上次一致，返回
            if (selectedNav.value === value) return;
            selectedNav.value = value;

            switch (selectedNav.value) {
                case nav[0]:
                    router.push({
                        path: "/"
                    });
                    break;
                case nav[1]:
                    router.push({
                        path: "/discover"
                    });
                    break;
                case "setting":
                    router.push({
                        path: "/setting"
                    });
                    break;
                case "user":
                    ElMessage.warning({
                        message: "抱歉，当前还不支持用户登录",
                        type: "warning"
                    });
                    break;
            }
        }

        return {
            nav,
            selectedNav,
            handleNav
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../../style/color.scss";
//公共样式
@import "../../style/publicStyle.scss";
//主题
@import "../../style/theme.scss";

$navHeight: 3.25rem;
.nav {
    position: relative;

    width: 100%;
    height: $navHeight;
    // padding: 0 3rem;
    box-sizing: border-box;
    @include flexLayout();

    border-bottom: 1px solid $borderLine;
    .nav-container {
        width: 90rem;
        height: 100%;
        @include flexLayout(space-between);
    }
    .right-container,
    .nav-ul-container {
        position: relative;

        width: 12rem;
        height: 100%;
    }
    .nav-ul-container {
        @include flexLayout(flex-start);
        li {
            position: relative;
            top: 0;

            height: 100%;
            padding: 0 1.2rem;
            line-height: $navHeight;

            color: $main-text;
            font-size: 0.85rem;

            transition: all 0.2s;
        }
        li:hover {
            top: -2px;

            color: $main-theme-color;

            cursor: pointer;
        }
        li.is-active {
            color: $main-theme-color;
        }
    }
    .search-container {
        position: relative;

        width: calc(100% - 24rem);
        height: 2.05rem;
    }
    .right-container {
        @include flexLayout(flex-end);

        .nav-style {
            width: 2.05rem;
            height: 2.05rem;

            // background-color: $gray;
            border-radius: 50%;

            text-align: center;
            line-height: 2.2rem;

            span {
                font-size: 1.2rem;
                color: $t-level-text;
            }
        }
        .nav-style:hover {
            cursor: pointer;
            span {
                color: $t-level2-text;
            }
        }
        .nav-style.setting-icon {
            margin-right: 0.5rem;
        }
    }
}
</style>
