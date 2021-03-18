<template>
    <div class="image-src-arr">
        <div
            :class="['arr-item-style','loading',{'top-style':index===0}]"
            v-for="(item,index) in data.children"
            :key="index"
            @click="handleUrl(item.url)"
        >
            <div class="label-style">{{item.title}}</div>
            <div class="bg-cover"></div>
            <img :data-src="imgShowSrc(data.img)" ref="imgDom">
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { randomNum, urlArr } from "@/utils";

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    setup(props) {
        /**
         * 点击快捷方式后的跳转
         * @params {String} value 点击对应的值
         */
        function handleUrl(url: string): void {
            //是否有值
            if (url === "") return;
            //打开页签
            window.open(url);
        }

        /**
         * 获取图片路径
         */
        function imgShowSrc(src: string) {
            // return require(`../../../../../../assets/images/${src}`);
            return urlArr + randomNum(1, 100);
        }

        return {
            handleUrl,
            imgShowSrc
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "@/style/color.scss";

@import "../style/index.scss";

$borderRadius: 4px;
.image-src-arr {
    position: relative;

    width: 100%;
    height: auto;
    .arr-item-style {
        position: relative;

        width: 100%;
        height: 8rem;
        overflow: hidden;
    }
    .arr-item-style.top-style {
        border-radius: $borderRadius $borderRadius 0 0;
    }

    img {
        position: relative;

        width: 100%;
        height: 100%;
        border-radius: $borderRadius $borderRadius 0 0;

        opacity: 0;
        transition: opacity 0.2s;
    }
    .label-style {
        position: absolute;
        // top: 0.5rem;
        // left: 0.5rem;

        max-width: 10rem;
        padding: 0.3rem 0.5rem;

        background-color: #f2544a;
        color: $white;
        font-size: 12px;

        z-index: 2;
    }
    .bg-cover {
        position: absolute;

        width: 100%;
        height: 100%;
        border-radius: $borderRadius $borderRadius 0 0;

        background-color: rgba(0, 0, 0, 0.1);
        transition: background-color 0.2s;
        z-index: 1;
    }

    .bg-cover:hover {
        cursor: pointer;

        background-color: rgba(0, 0, 0, 0.3);
    }
}
</style>
