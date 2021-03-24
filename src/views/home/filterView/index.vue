<template>
    <div class="ss-filter">
        <ul class="ss-filter-ul">
            <li
                v-for="item in navList"
                :key="item.value"
                @click="handleClick(item)"
                :class="[{'is-active':item.selected}]"
            >
                <span>{{`${item.title}`}}</span>
                <span class="ss-filter-number">{{`${item.number}`}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, computed, watch } from "vue";

//引入类型判断
import { Filter, FilterNav, NavType } from "@/type/index.ts";
import { useStore } from "vuex";

import setting from "@/setting";

export default defineComponent({
    emits: ["handleNav"],
    setup(props, context) {
        const store = useStore();

        //设置默认选项
        // console.log(setting.defaultSelected);
        store.commit("data/setNavSelected", setting.defaultSelected);

        //获得标题
        const navList = computed(() => {
            return store.getters["data/getNavList"];
        });

        //过滤出selected对应的标签
        function filterNav(arr: NavType[], val: string) {
            return arr.filter(el => {
                return el.value === val;
            });
        }

        //监听选中项
        watch(
            () => store.getters["data/getSelected"],
            val => {
                const navData = filterNav(navList.value, val);

                context.emit("handleNav", navData[0]);
                // console.log(navData);
            },
            {
                immediate: true
            }
        );
        //定义筛选列表的内容
        // const data: any = {
        //     nav: navList.value, //列表
        //     selected: props.data[1].value //选中项
        // };

        //转成响应式对象
        // const dataRet = reactive<FilterNav>(data);

        //切换
        function handleClick(item: Filter): void {
            //更新到vuex保存
            store.commit("data/setNavSelected", item.value);

            // context.emit("handleNav", item);
        }

        return {
            // ...toRefs(dataRet),
            handleClick,
            navList
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../../../style/color.scss";
//公共样式
@import "../../../style/publicStyle.scss";
//主题
@import "../../../style/theme.scss";

.ss-filter {
    width: 90rem;
    height: 3.875rem;
    @include flexLayout(flex-start);
    margin: 1.5rem auto;
    box-sizing: border-box;
    padding: 0 3rem;

    background-color: $white;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02);

    .ss-filter-ul {
        width: 100%;
        @include flexLayout(flex-start);

        font-size: 0.92rem;
        color: $main-text;
        li {
            position: relative;
            top: 0;

            height: 100%;
            margin-right: 3.5rem;
            padding: 0.8rem 0;
            // flex: 1;

            color: $main-text;
            text-align: center;
            transition: all 0.2s;

            .ss-filter-number {
                margin-left: 0.5rem;

                color: $t-level-text;
                font-size: 0.8rem;
            }
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
}
</style>
