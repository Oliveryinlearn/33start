<template>
    <div class="ss-filter">
        <ul class="ss-filter-ul">
            <li
                v-for="item in nav"
                :key="item.value"
                @click="handleClick(item)"
                :class="[{'is-active':item.value===selected}]"
            >
                <span>{{`${item.title}`}}</span>
                <span class="ss-filter-number">{{`${item.number}`}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

//引入类型判断
import { Filter } from "@/type/index";

interface FilterNav {
    nav: Filter[];
    selected: string;
}

export default defineComponent({
    emits: ["handleNav"],
    props: {
        data: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    setup(props, context) {
        //定义筛选列表的内容
        const data: any = {
            nav: props.data, //列表
            selected: props.data[1].value //选中项
        };
        //转成响应式对象
        const dataRet = reactive<FilterNav>(data);
        //切换
        function handleClick(item: Filter): void {
            dataRet.selected = item.value;
            context.emit("handleNav", item);
        }
        return {
            ...toRefs(dataRet),
            handleClick
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
