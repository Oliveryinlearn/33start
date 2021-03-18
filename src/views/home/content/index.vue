<template>
    <div class="ss-card-container" @dblclick.self="showSearch">
        <ss-card v-for="(item,index) in data" :key="index" :data="item"/>
    </div>
</template>

<script lang='ts'>
import { defineComponent, watch } from "vue";

import SsCard from "./component/SsCard/index.vue";

import { wateVNode, DataType } from "@/components/SsWaterFall/ts/vNode";

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
        //监听渲染的数据
        watch(
            () => props.data,
            value => {
                //对数据进行转化，转成虚拟节点
                const data: any = value;

                const vm = wateVNode(data);
            }
        );
        //显示弹出
        function showSearch(): void {
            content.emit("showDialog");
        }
        return {
            showSearch
        };
    }
    // mounted() {
    //     console.log(this.data);
    // }
});
</script>

<style scoped lang='scss'>
.ss-card-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 0;
}
</style>
