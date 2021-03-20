<template>
    <div class="ss-home">
        <!--导航-->
        <nav-view/>
        <!--主体-->
        <suspense>
            <div class="ss-content-blog">
                <router-view v-slot="{Component}">
                    <keep-alive>
                        <component :is="Component"/>
                    </keep-alive>
                </router-view>
            </div>
        </suspense>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

//引入导航
import NavView from "./navView/index.vue";

export default defineComponent({
    components: {
        NavView
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

    .ss-content-blog {
        position: absolute;
        top: 3.25rem;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: $gray;
    }
}
</style>


