<!--搜索-->
<template>
    <div class="ss-search-container">
        <!--下拉部分-->
        <el-dropdown trigger="click" class="search-type" @command="handleCommand">
            <span class="el-dropdown-link">
                {{dropName || ""}}
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
        <!-- <input type="text" v-model='inputContent' v-bind:placeholder='placeholderTxt' @keyup.enter="upFilter">
        <button class="icon iconfont icon-magnifier" @click="upFilter"></button>-->
    </div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from "vue";

//下拉的每一项类型
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

export default defineComponent({
    name: "ss-search",
    setup() {
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
            return lcoalS ? JSON.parse(lcoalS) : elData.elListData[0];
        })(elData);

        //根据存储修改显示
        elData.dropName = localVal.name;
        elData.dropVal = localVal.value;

        const elDown = reactive(elData);

        //切换时触发
        function handleCommand(value: string): void {
            if (value === elDown.dropVal) return;
            elDown.dropVal = value;
            console.log(value);
        }

        //输入框部分
        return {
            ...elDown,
            handleCommand
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
    padding: 0 1.2rem;

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
    input {
        float: left;
        background: none;
        height: 100%;
        width: 14rem;
        box-sizing: border-box;
        padding: 0 1rem 0 1rem;
        border: none;
        font-size: 0.8rem;
        font-weight: inherit;
        color: $input_color;
    }
    input::-webkit-input-placeholder {
        color: $input_placeholder;
    }
    input:focus {
        outline: none;
    }
    button {
        width: 3rem;
        height: 100%;
        color: $header_color;
        border: none;
        font-size: 1.3rem;
        background-color: transparent;
        background-position: -2px 0px;
        outline: none;
    }
    button:hover {
        cursor: pointer;
        background-position: -56px 0px;
    }
}
.ss-search-container:hover {
    background-color: $gray-2;
    cursor: auto;
}
</style>
