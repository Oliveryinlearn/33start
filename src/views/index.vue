<template>
    <div class="ss-home">
        <!--导航-->
        <nav-view/>

        <!--内容-->
        <div class="ss-container" @dblclick.self="handleSearch(true)">
            <!--内容筛选-->
            <filter-view @handleNav="handleNav" :data="navData"/>
            <div class="ss-content" ref="sSContent" @dblclick.self="handleSearch(true)">
                <div class="card-container">
                    <!--内容显示组件-->
                    <card-container :data="cardData" @showDialog="handleSearch(true)"></card-container>
                </div>
            </div>
        </div>

        <!--尾部信息-->
        <div class="ss-footer">
            尹竹群 版权所有 ©www.752746873.com &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ICP备案号：
            <a
                href="http://www.beian.miit.gov.cn"
            >苏ICP备14047197号-5</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工信部备案管理系统网址：
            <a
                href="http://www.beian.miit.gov.cn"
            >www.beian.miit.gov.cn</a>
        </div>

        <!--搜索-->
        <!-- <el-dialog title="提示" v-model="isShowDialog" width="60%">
        </el-dialog>-->
        <search-dialog :dialogVisible="isShowDialog" @cancel="handleSearch(false)"></search-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from "vue";
//引入导航
import NavView from "./navView/index.vue";
//引入筛选
import FilterView from "./filterView/index.vue";
//引入内容显示
import CardContainer from "./content/index.vue";
import SearchDialog from "./searchDialog/index.vue";
//请求数据
import { getData } from "../api/data";
import BScroll from "better-scroll";

//内容
interface DataChildrenType {
    title: string;
    img: string;
    info: string;
    url: string;
}
//请求到的数据类型
interface DataType {
    title: string;
    type: string;
    children: DataChildrenType[];
}
//标题的数据
interface NavType {
    title: string;
    number: number;
    value: string;
    children: DataChildrenType[];
}

//排除在外的类别
const OUT_TOTAL = ["commonly"];
export default defineComponent({
    components: {
        NavView,
        FilterView,
        CardContainer,
        SearchDialog
    },
    async setup() {
        //卡片容器
        const sSContent = ref(null);
        //初始化卡牌容器
        onMounted(() => {
            const dom: any = sSContent.value;
            new BScroll(dom, {
                click: true,
                mouseWheel: true
            });
        });

        // 请求数据
        function getDataFunc(params: any) {
            return getData(params);
        }
        const data: any = await getDataFunc({});

        //添加全部
        data.unshift({
            title: "全部",
            type: "all",
            children: data.reduce((prev: any, cur: DataType) => {
                //判断当前类别是否存在于需要排除的数组内
                return OUT_TOTAL.indexOf(cur.type) > -1
                    ? prev
                    : [...prev, ...cur.children];
            }, [])
        });

        //请求到的数据转成
        const navDataList = (list: DataType[]): NavType[] => {
            return list.map(el => {
                return {
                    title: el.title,
                    number: el.children.length,
                    value: el.type,
                    children: el.children
                };
            });
        };
        const navDataArr = navDataList(data);

        //定义响应式标题对象
        const navData = ref<NavType[]>(navDataArr);

        //定义响应式内容
        const cardData = ref<DataChildrenType[]>(data[1].children);

        //切换标题
        function handleNav(value: NavType): void {
            cardData.value = value.children;
        }

        const isShowDialog = ref(false);

        //显示搜索
        function handleSearch(value: boolean): void {
            console.log(1);
            isShowDialog.value = value;
        }
        return {
            handleNav,
            navData,
            cardData,
            sSContent,
            isShowDialog,
            handleSearch
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "../style/color.scss";
//公共样式
@import "../style/publicStyle.scss";
//主题
@import "../style/theme.scss";
//引入
.ss-home {
    position: relative;

    width: 100%;
    height: 100%;

    .ss-container {
        position: absolute;
        top: 3.25rem;
        right: 0;
        bottom: 2rem;
        left: 0;

        background-color: $gray;

        .ss-content {
            position: absolute;
            top: 6.875rem;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: hidden;

            .card-container {
                width: 90rem;
                // height: 20rem;
                margin: 0 auto;
            }
        }
    }

    .ss-footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;

        height: 2rem;

        background-color: $gray;
        text-align: center;
        color: $t-bottom-text;
        font-size: 0.75rem;
        a {
            color: $t-bottom-text;
        }
    }
}
</style>


