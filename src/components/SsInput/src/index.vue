<template>
    <div class="ss-input">
        <input
            :value="value"
            class="ss-input-content"
            @input="handleInput"
            :placeholder="placeholder"
        >
    </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, watch } from "vue";

export default defineComponent({
    name: "ss-inpput",
    emits: ["update:value", "input"],
    props: {
        value: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: "请输入内容"
        },
        type: {
            type: String,
            default: "text"
        }
    },
    setup(props, context) {
        //触发输入事件
        function handleInput(e: any): void {
            context.emit("update:value", e.target.value);
        }

        // const inputVal = computed({
        //     get: value => {
        //         return value;
        //     },
        //     set: value => {
        //         console.log(value);
        //         context.emit("update:value", value);
        //     }
        // });

        return {
            // inputVal
            handleInput
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../../style/color.scss";
@import "../../style/publicStyle.scss";

.ss-input {
    position: relative;
    width: 100%;
    height: 100%;

    .ss-input-content {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 1rem 0 1rem;

        border: none;
        background: none;
        font-size: 0.9rem;
        font-weight: inherit;
        color: $main-text;
    }
    .ss-input-content::-webkit-input-placeholder {
        color: $input_color;
    }
    .ss-input-content:focus {
        outline: none;
    }
}
</style>
