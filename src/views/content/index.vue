<template>
    <div class="ss-card-container" @dblclick.self="showSearch">
        <ss-card v-for="(item,index) in data" :key="index" :data="item"/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

import SsCard from "./component/SsCard.vue";

export default defineComponent({
    name: "ss-card-container",
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        SsCard
    },
    emits: ["showDialog"],
    setup(props, content) {
        //显示弹出
        function showSearch(): void {
            content.emit("showDialog");
        }
        return {
            showSearch
        };
    }
});
</script>

<style scoped lang='scss'>
.ss-card-container {
    position: relative;

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    & > div:nth-child(6n) {
        margin-right: 0;
    }
}
</style>
