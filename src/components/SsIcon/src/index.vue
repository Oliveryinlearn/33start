<template>
    <span :class="['icon iconfont icon-style',icon]" v-bind="$attrs"></span>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        icon: {
            type: String,
            default: ""
        }
    },
    name: "ss-icon"
    // setup() {}
});
</script>

<style scoped lang='scss'>
@import "../icon/iconfont.css";
@import "../../style/color.scss";

.icon-style {
    width: 24px;
    height: 24px;

    color: $header_color;
    line-height: 24px;
    text-align: center;
}
</style>
