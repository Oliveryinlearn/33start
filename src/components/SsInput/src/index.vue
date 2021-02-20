<template>
    <div class="ss-input">
        <input
            :value="value"
            class="ss-input-content"
            @input="handleInput"
            :placeholder="placeholder"
            v-focus="focus"
        >
        <ss-icon
            v-if="type === 'search'"
            :icon="value?'icon-cha1':'icon-search'"
            @click="handleIcon(value)"
            class="ss-icon-style"
        />
    </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, watch, nextTick } from "vue";
import SsIcon from "../../SsIcon/src/index.vue";

export default defineComponent({
    name: "ss-input",
    emits: ["update:value", "handleSearch"],
    components: {
        SsIcon
    },
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
        },
        focus: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        //触发输入事件
        function handleInput(e: any): void {
            context.emit("update:value", e.target.value);
        }

        function handleIcon(value: string): void {
            if (!value) {
                context.emit("handleSearch");
            } else {
                context.emit("update:value", "");
            }
        }
        return {
            handleInput,
            handleIcon
        };
    },
    directives: {
        focus: {
            mounted(el, binding) {
                //绑定的值
                const val = binding.value;
                if (!val) return;

                nextTick(() => {
                    el.focus();
                });
            },
            updated(el, binding) {
                //绑定的值
                const val = binding.value;
                if (!val) return;
                nextTick(() => {
                    //判断是否已经获取焦点
                    if (el === document.activeElement) return;
                    el.focus();
                });
            }
        }
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
    @include flexLayout();

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

    .ss-icon-style {
        transition: all 0.2s;
    }

    .ss-icon-style:hover {
        cursor: pointer;
        color: $sub-text;
    }
}
</style>
