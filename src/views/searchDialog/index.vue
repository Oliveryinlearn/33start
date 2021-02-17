<template>
    <div class="el-dialog-style">
        <el-dialog :model-value="dialogVisible" :before-close="cancelDialog" width="60%">
            <div class="search-container">
                <div class="search-body">
                    <ss-input
                        type="search"
                        v-model:value="iValue"
                        :placeholder="iPlaceholder"
                        @keyup.enter="handleSearch"
                        @handleSearch="handleSearch"
                    />
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs } from "vue";

//输入框
interface ElInput {
    iValue: string;
    iPlaceholder: string;
}

export default defineComponent({
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    emits: ["cancel"],
    setup(props, content) {
        function cancelDialog() {
            content.emit("cancel");
        }
        const showDialog = ref(props.dialogVisible);

        /**
         * 输入框部分
         */
        const elInput = reactive<ElInput>({
            iValue: "",
            iPlaceholder: "请输入搜索内容"
        });

        function handleSearch(): void {
            const text: string = elInput.iValue;
            const searchEnginesContent = {
                baidu: `https://www.baidu.com/s?wd='${text}'`,
                google: `https://www.google.com/search?q=${text}&oq=${text}`
            };

            window.open(searchEnginesContent.baidu);
        }
        return {
            cancelDialog,
            showDialog,
            ...toRefs(elInput),
            handleSearch
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../../style/color.scss";

.search-container {
    width: 100%;
    height: 4.2rem;

    border-radius: 4px;
    padding: 0.5rem;
    box-sizing: border-box;

    background: rgba(255, 255, 255, 0.5);

    .search-body {
        width: 100%;
        height: 3.2rem;

        border-radius: 2px;
        background: $white;
        box-sizing: border-box;
        padding-right: 1rem;
    }
}
.el-dialog-style /deep/ .el-dialog {
    background: none;
    box-shadow: none;
    -webkit-box-shadow: none;
}
</style>
