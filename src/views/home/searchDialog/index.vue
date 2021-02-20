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
                        :focus="true"
                    />
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRefs, watch } from "vue";

//输入框
interface ElInput {
    iValue: string;
    iPlaceholder: string;
}

//localstorage存储的名字
const LOCALSTORAGE_TEXT = "ssWebTypeVal";
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
            iPlaceholder: ""
        });

        function handleSearch(): void {
            const text: string = elInput.iValue;

            const searchType: string | null = localStorage.getItem(
                LOCALSTORAGE_TEXT
            ); //当前搜索浏览器类型的localStorage值

            const searchEnginesContent = {
                baidu: `https://www.baidu.com/s?wd='${text}'`,
                google: `https://www.google.com/search?q=${text}&oq=${text}`
            };

            if (searchType === null) {
                window.open(searchEnginesContent.baidu);
            } else {
                const searchTypeObj = JSON.parse(searchType);
                switch (searchTypeObj.value) {
                    case "1": //百度
                        window.open(searchEnginesContent.baidu);
                        break;
                    case "2": //谷歌
                        window.open(searchEnginesContent.google);
                        break;
                    default:
                        //其他，百度
                        window.open(searchEnginesContent.baidu);
                        break;
                }
            }
        }

        //监听弹窗显示，判断其显示的文字
        watch(
            () => props.dialogVisible,
            newVal => {
                if (!newVal) return;

                //获得的浏览器类型值
                const curLocalPlaceholder = localStorage.getItem(
                    LOCALSTORAGE_TEXT
                );
                //提示文字
                const baiduText = "百度一下，你就知道",
                    googleText = "Don't be evil",
                    defaultText = "请输入搜索内容";

                if (curLocalPlaceholder === null) {
                    elInput.iPlaceholder = baiduText;
                } else {
                    const curSearchTypeObj = JSON.parse(curLocalPlaceholder);
                    elInput.iPlaceholder =
                        curSearchTypeObj.value === "1"
                            ? baiduText
                            : curSearchTypeObj.value === "2"
                            ? googleText
                            : defaultText;
                }

                // console.log(searchTypeObj);
            }
        );
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
@import "../../../style/color.scss";

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
