<template>
    <div class="ss-home">
        <!--导航-->
        <nav-view/>

        <!--内容-->
        <div class="ss-container">
            <!--内容筛选-->
            <filter-view/>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
//引入导航
import NavView from "./navView/index.vue";
import FilterView from "./filterView/index.vue";

export default defineComponent({
    components: {
        NavView,
        FilterView
    },
    setup(props: object, context: object) {
        // const list:
        // console.log(props, context);
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
.ss-home {
    position: relative;

    width: 100%;
    height: 100%;

    .ss-container {
        position: absolute;
        top: 3.25rem;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: $gray;
    }
}
</style>


