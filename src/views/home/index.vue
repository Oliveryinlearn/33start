<template>
    <div class="ss-home-container">
        <!--内容-->
        <div class="ss-container" @dblclick.self="handleSearch(true)">
            <!--内容筛选-->
            <filter-view @handleNav="handleNav"/>
            <div class="ss-content" ref="sSContent" @dblclick.self="handleSearch(true)">
                <div class="card-container">
                    <!--内容显示组件-->
                    <card-container :data="cardData" @showDialog="handleSearch(true)"></card-container>
                </div>
            </div>
        </div>
        <ss-footer/>
        <!--搜索-->
        <search-dialog :dialogVisible="isShowDialog" @cancel="handleSearch(false)"></search-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted, nextTick } from "vue";
//引入筛选
import FilterView from "./filterView/index.vue";
//引入内容显示
import CardContainer from "./content/index.vue";
import SearchDialog from "./searchDialog/index.vue";
//请求数据
import { getData } from "../../api/data";
import BScroll from "better-scroll";

//引入vuex
import { useStore } from "vuex";

//引入类型
import { DataChildrenType, DataType, NavType } from "../../type/index";

//引入懒加载
import { LazyImg } from "@/utils/index";

//排除在外的类别
const OUT_TOTAL = ["commonly", "office"];
//引入尾部信息
import ssFooter from "@/views/footer/index.vue";

export default defineComponent({
    components: {
        FilterView,
        CardContainer,
        SearchDialog,
        ssFooter
    },
    async setup() {
        //卡片容器
        const sSContent = ref(null);
        //使用vuex
        const store = useStore();
        // let bsDom: any = null;

        //初始化better-scroll
        // function initScroll(): void {
        //     bsDom = null;
        //     const dom: any = sSContent.value;
        //     console.log(dom);
        //     dom.childNodes[0].removeAttribute("style");
        //     console.log(dom.childNodes[0]);
        //     bsDom = new BScroll(dom, {
        //         click: true,
        //         mouseWheel: true
        //     });
        //     console.log(bsDom);
        // }

        /**
         * 判断DOM是否在视窗内
         */
        // function checkImg() {
        //     //检测dom上是否有data-src属性
        //     function loadImg() {
        //         //获取img的DOM对象
        //         const DOM_TAR = imgDom.value;
        //         //获取dom上的自定义属性data-src
        //         const dataSrc = DOM_TAR.getAttribute("data-src");
        //         //判断是否存在自定义属性data-src
        //         if (!dataSrc) return;

        //         const imgDomTop = DOM_TAR.getBoundingClientRect().top;

        //         const visibleBottom =
        //             window.scrollY + document.documentElement.clientHeight;
        //     }

        //     //加载图片
        //     loadImg();
        // }

        //监听滚动条
        // function handleScroll() {
        //     console.log(dom.querySelectorAll("img"));
        // }

        //初始化卡牌容器
        // onMounted(() => {
        //     //选择dom
        //     // dom = document.querySelector(".ss-container");
        //     // dom.addEventListener("scroll", handleScroll);
        // });

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

        //存储卡片数据
        store.dispatch("data/setHomeData", data);

        //请求到的数据转成
        // const navDataList = (list: DataType[]): NavType[] => {
        //     return list.map(el => {
        //         return {
        //             title: el.title,
        //             number: el.children.length,
        //             value: el.type,
        //             children: el.children
        //         };
        //     });
        // };
        // const navDataArr = navDataList(data);

        //定义响应式标题对象
        // const navData = ref<NavType[]>(navDataArr);

        //初始化默认显示的卡片
        // const getterStoreNav = store.getters["data/getNavList"].filter(
        //     (el: NavType) => {
        //         return el.selected;
        //     }
        // );
        const cardData = ref<DataChildrenType[]>([]);

        //切换标题
        function handleNav(value: NavType): void {
            cardData.value = value.children;

            //挂载后执行图片懒加载
            nextTick(() => {
                //绑定懒加载
                new LazyImg({
                    el: ".ss-container",
                    src: "data-src" //存储图片路径的自定义属性
                });
            });
        }

        const isShowDialog = ref(false);

        //显示搜索
        function handleSearch(value: boolean): void {
            isShowDialog.value = value;
        }
        return {
            handleNav,
            // navData,
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
@import "../../style/color.scss";
//公共样式
@import "../../style/publicStyle.scss";
//主题
@import "../../style/theme.scss";

.ss-home-container {
    position: relative;

    width: 100%;
    height: 100%;

    .ss-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 2rem;
        left: 0;

        overflow: auto;

        .ss-content {
            position: absolute;
            top: 6.875rem;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);

            width: 90rem;

            .card-container {
                // width: 100%;
                // height: 1000px;
                width: 90rem;
                height: 100%;

                // // height: 20rem;
                // margin: 0 auto;
            }
        }
    }
}
</style>
