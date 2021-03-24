<template>
    <div class="discover">
        <!--便签主体-->
        <div class="discover-container">
            <div class="discover-body">
                <div class="ss-op">
                    <button class="add-new" @click="handleDialog(true)">新增任务</button>
                </div>
                <div class="ss-note-container">
                    <ss-note v-for="(item,index) in noteDate" :data="item" :key="index"/>
                </div>
            </div>
        </div>
        <!--底部信息-->
        <ss-footer/>
    </div>
    <!--新增弹窗-->
    <el-dialog title="新增便签" v-model="dialogVisible" width="50%">
        <el-form ref="addForm" :model="formDataMsg" :rules="rulesObj" label-width="120px">
            <el-form-item label="任务标题" prop="title">
                <el-input v-model="formDataMsg.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="任务级别" prop="state">
                <el-select v-model="formDataMsg.state" placeholder="请选择级别">
                    <el-option
                        v-for="(item,index) in stateArr"
                        :label="item.text"
                        :value="item.state"
                        :key="index"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="任务标签" prop="label">
                <el-input v-model="formDataMsg.label" placeholder="请输入内容(以英文','分割')"></el-input>
            </el-form-item>
            <el-form-item label="任务内容" prop="desc">
                <el-input type="textarea" v-model="formDataMsg.desc" placeholder="请输入内容" :rows="5"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAdd">立即创建</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from "vue";
//引入尾部信息
import ssFooter from "@/views/footer/index.vue";
//引入记录卡片
import ssNote from "./components//Note/index.vue";

//请求数据
import { getDisCoverData } from "../../api/data";

//引入类型
import { formData } from "@/type/index";

import { TYPE } from "./data/data";
//引入存储的工具函数
import { HandleLocalStroage } from "@/utils/index";

export default defineComponent({
    components: {
        ssFooter,
        ssNote
    },
    async setup() {
        // 请求数据
        function getDisCoverDataFunc(params: any) {
            return getDisCoverData(params);
        }
        const data: any = await getDisCoverDataFunc({});
        //获取本地缓存
        const discover = new HandleLocalStroage("oliverWebDiscover");

        const noteDate = ref([...data, ...discover.getLocalStrage()]);

        //定义前端获取localStroage里存储的内容
        console.log(noteDate.value);
        // const getStrage: string | null = discover.getLocalStrage();
        // //转换
        // const getStrageArr = getStrage ? JSON.parse(getStrage) : [];
        // const noteDateArr = computed(() => {
        //     return [...noteDate.value, ...getStrageArr];
        // });
        // console.log(data);
        // const locationDis = localStorage.getItem("oliverWebDiscover");
        // if (locationDis) {
        //     console.log(locationDis);
        // }
        // noteDate.value.push();

        //弹窗状态
        const dialogVisible = ref(false);

        //操作弹窗
        function handleDialog(value: boolean) {
            dialogVisible.value = value;
        }

        //表单数据
        const formData: formData = {
            title: "",
            state: "",
            label: "",
            desc: ""
        };
        //表单验证
        const rules = {
            title: [{ required: true, message: "请输入标题", trigger: "blur" }],
            state: [
                { required: true, message: "请选择级别", trigger: "change" }
            ],
            desc: [{ required: true, message: "请输入内容", trigger: "blur" }],
            label: [{ required: true, message: "请输入标签", trigger: "blur" }]
        };
        //响应验证规则
        const rulesObj = ref(rules);

        //任务级别
        const stateArr = ref(TYPE);

        const formDataMsg = ref(formData);

        //设置dom
        const addForm: any = ref(null);

        // 点击添加事件
        function handleAdd() {
            addForm.value.validate((valid: boolean) => {
                if (valid) {
                    //存储内容
                    discover.setLocalStrage(formDataMsg.value);

                    //加入显示
                    noteDate.value.push(formDataMsg.value);

                    //关闭弹窗
                    dialogVisible.value = false;
                } else {
                    console.log("缺少必输项");
                    return false;
                }
            });
        }
        return {
            noteDate,
            dialogVisible,
            handleDialog,
            formDataMsg,
            stateArr,
            rulesObj,
            handleAdd,
            addForm
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "@/style/color.scss";
@import "@/style/theme.scss";

.discover {
    position: relative;

    width: 100%;
    height: 100%;

    .discover-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 2rem;
        left: 0;

        overflow: auto;

        .discover-body {
            position: absolute;
            top: 1.5rem;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);

            width: 90rem;

            .ss-op {
                width: 100%;
                height: 2rem;
                margin-bottom: 1rem;
                text-align: right;

                .add-new {
                    position: relative;

                    padding: 0.4rem 0.8rem;
                    box-sizing: border-box;
                    border-radius: 3px;

                    border: none;
                    font-size: 0.85rem;
                    color: $white;
                    background-color: $green;
                    transition: background-color 0.2s;
                    outline: none;
                }
                .add-new:hover {
                    cursor: pointer;

                    background-color: $green-1;
                }
                .add-new:active {
                    background-color: $green-2;
                }
            }
            .ss-note-container {
                display: flex;
                width: 100%;
                // height: calc(100% - 3rem);
                flex-direction: row;
                flex-wrap: wrap;
            }
        }
    }
}
</style>
