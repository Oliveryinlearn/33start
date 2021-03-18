<template>
    <div :class="['ss-card']" :style="{'top':`${data.top}rem`,'left':`${data.left}rem`}">
        <div class="main-img">
            <image-src-arr v-if="data.children&&data.children.length>1" :data="data"></image-src-arr>
            <image-src v-else :data="data"></image-src>
        </div>
        <h4>{{data.title}}</h4>
        <div class="description">{{data.info}}</div>
    </div>
</template>

<script lang='ts'>
import imageSrc from "./components/imageSrc.vue";
import imageSrcArr from "./components/imageSrcArr.vue";

import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    components: { imageSrc, imageSrcArr },
    setup(props) {
        const test: any = ref(null);

        /**
         * 监听DOM是否进入视窗
         */
        onMounted(() => {
            // console.log(test.value.getAttribute("data-src"));
            // test.value.onload = function() {
            //     console.log(1);
            // };
        });

        return {
            test
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../../../../../style/color.scss";

//引入loading
@import "./style/index.scss";

$borderRadius: 4px;
.ss-card {
    position: absolute;

    width: 14.165rem;
    padding-bottom: 1rem;
    border-radius: $borderRadius;

    background-color: $white;
    box-sizing: border-box;
    transition: all 0.2s;
    box-shadow: 0px 2px 10px $gray-3;
    break-inside: avoid; //避免在主体框中插入任何中断（页面，列或区域）。

    .main-img {
        width: 14.165rem;
        min-height: 14.165rem;
        border-radius: $borderRadius;
        margin-bottom: 0.5rem;
    }
    h4 {
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;

        margin-top: 0.7rem;
        margin-bottom: 0.2rem;
        box-sizing: border-box;
        padding-left: 0.8rem;

        color: $main-text;
        font-weight: bold;
        font-size: 0.95rem;
    }
    .description {
        width: 100%;

        box-sizing: border-box;
        padding: 0 0.8rem;
        height: 3rem;

        color: $t-level-text;
        line-height: 1.4rem;
        font-size: 0.8rem;
    }
}
.ss-card:hover {
    cursor: default;

    box-shadow: 0 10px 30px rgba(175, 175, 175, 0.3);
}
</style>
