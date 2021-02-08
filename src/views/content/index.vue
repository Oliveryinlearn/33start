<template>
    <div class="ss-card-container">
        <ss-card/>
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
    setup() {
        console.log(1);
    }
});
</script>

<style scoped lang='scss'>
.ss-card-container {
    position: relative;

    width: 100%;
    display: flex;
    & > div:nth-child(6n) {
        margin-right: 0;
    }
}
</style>
