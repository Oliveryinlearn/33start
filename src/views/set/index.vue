<template>
    <div class="ss-setting-container">
        <div class="ss-setting-main">
            <h2>基本设置</h2>
            <ul class="set">
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
    setup() {
        console.log("测试");
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

.ss-setting-container {
    position: relative;

    width: 100%;
    height: 100%;
    .ss-setting-main {
        position: absolute;
        top: 20px;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        overflow: auto;

        width: 60rem;
        // background-color: $white;
        h2 {
            font-size: 1rem;
            color: $main-text;
        }
    }
}
</style>
