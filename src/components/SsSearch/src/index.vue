<!--搜索-->
<template>
    <div class="ss-search-container">
        <!--下拉部分-->
        <el-dropdown trigger="click" class="search-type" @command="handleCommand">
            <span class="el-dropdown-link">
                {{dropName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item
                        v-for="(item) in elListData"
                        :key="item.value"
                        :command="item.value"
                    >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <ss-input
            class="ss-input-container"
            type="search"
            v-model:value="iValue"
            :placeholder="iPlaceholder"
            @keyup.enter="handleSearch"
            @handleSearch="handleSearch"
        />
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch } from "vue";
import SsInput from "../../SsInput/src/index.vue";

//下拉的选项
interface ElDownList {
    value: string;
    name: string;
}
//下拉部分的接口定义
interface ElDataInter {
    elListData: ElDownList[];
    dropVal: string;
    dropName: string;
}
//localstorage存储的名字
const LOCALSTORAGE_TEXT = "ssWebTypeVal";

//输入框
interface ElInput {
    iValue: string;
    iPlaceholder: string;
}

export default defineComponent({
    name: "ss-search",
    components: { SsInput },
    setup() {
        /**
         * 下拉部分
         */
        //下拉部分对应的数据
        const elData: ElDataInter = {
            elListData: [
                {
                    value: "1",
                    name: "百度"
                },
                {
                    value: "2",
                    name: "谷歌"
                }
            ],
            dropName: "",
            dropVal: ""
        };

        //获取localStorage是否保存过搜索引擎
        const localVal = ((data: ElDataInter) => {
            const lcoalS = localStorage.getItem(LOCALSTORAGE_TEXT);
            return lcoalS ? JSON.parse(lcoalS) : data.elListData[0];
        })(elData);

        //根据存储修改显示
        elData.dropName = localVal.name;
        elData.dropVal = localVal.value;

        //定义成响应式对象
        const elDown = reactive(elData);

        //切换下拉时获得对应value值的name属性
        const elDowmName = (arr: ElDownList[], val: string) => {
            for (const item of arr) {
                if (item.value === val) {
                    return item;
                }
            }
            return elData.elListData[0];
        };

        //切换时触发
        function handleCommand(value: string): void {
            //跟上次相同时忽略
            if (value === elDown.dropVal) return;

            elDown.dropVal = elDowmName(elData.elListData, value).value; //切换的值
            elDown.dropName = elDowmName(elData.elListData, value).name; //切换的名字
        }

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

            switch (elDown.dropVal) {
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

        // watch(
        //     () => elInput.iValue,
        //     value => {
        //         console.log(value);
        //     }
        // );

        return {
            ...toRefs(elDown),
            handleCommand,
            ...toRefs(elInput),
            handleSearch
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../../style/color.scss";
@import "../../style/publicStyle.scss";

.ss-search-container {
    width: 100%;
    height: 100%;

    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 0.5rem 0 1.2rem;
    @include flexLayout(flex-start);

    background-color: $gray;
    transition: all 0.2s;

    /deep/ .el-dropdown {
        height: 2.05rem;

        line-height: 2.05rem;
        color: $input_color;
        transition: all 0.2s;
    }

    /deep/ .el-dropdown:hover {
        cursor: pointer;
        color: $main-text;
    }

    .ss-input-container {
        flex: 1;
    }
    // button {
    //     width: 3rem;
    //     height: 100%;
    //     color: $header_color;
    //     border: none;
    //     font-size: 1.3rem;
    //     background-color: transparent;
    //     background-position: -2px 0px;
    //     outline: none;
    // }
    // button:hover {
    //     cursor: pointer;
    //     background-position: -56px 0px;
    // }
}
.ss-search-container:hover {
    background-color: $gray-2;
    cursor: auto;
}
</style>
