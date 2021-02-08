<template>
    <div>1</div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { radioType } from "../type";

export default defineComponent({
    name: "ss-radio",
    props: {
        type: {
            type: String,
            default: "button"
        }
    },
    setup(props) {
        // const type: radioType = props.type;
        // const componentType = ref<radioType>(type);

        console.log(1);
        return {
            // componentType
        };
    }
});
</script>

<style scoped lang='scss'>
</style>
