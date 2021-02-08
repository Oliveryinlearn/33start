<template>
    <div class="ss-home">
        <!--导航-->
        <nav-view/>

        <!--内容-->
        <div class="ss-container">
            <!--内容筛选-->
            <filter-view @handleNav="handleNav"/>
            <div class="ss-content" ref="sSContent">
                <div class="card-container">
                    <!--内容显示组件-->
                    <card-container></card-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
//引入导航
import NavView from "./navView/index.vue";
//引入筛选
import FilterView from "./filterView/index.vue";
//引入内容显示
import CardContainer from "./content/index.vue";

export default defineComponent({
    components: {
        NavView,
        FilterView,
        CardContainer
    },
    setup(props, context) {
        // const list:
        // console.log(props, context);
        function handleNav(value: string): void {
            console.log(value);
        }

        return {
            handleNav
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../style/color.scss";
//公共样式
@import "../style/publicStyle.scss";
//主题
@import "../style/theme.scss";
//引入
.ss-home {
    position: relative;

    width: 100%;
    height: 100%;

    .ss-container {
        position: absolute;
        top: 3.25rem;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: $gray;

        .ss-content {
            position: absolute;
            top: 6.875rem;
            right: 0;
            bottom: 0;
            left: 0;

            .card-container {
                width: 90rem;
                // height: 20rem;
                margin: 0 auto;
            }
        }
    }
}
</style>


