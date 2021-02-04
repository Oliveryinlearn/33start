<template>
    <div class="ss-filter"></div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";

interface Filter {
    value: string;
    title: string;
}

export default defineComponent({
    setup() {
        const filter = ref<Filter[]>([
            {
                value: "all",
                title: "全部"
            }
        ]);
        console.log(1);
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

    margin: 1.5rem auto;

    background-color: $white;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02);
}
</style>
