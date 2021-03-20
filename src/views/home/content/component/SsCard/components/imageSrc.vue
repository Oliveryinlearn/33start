<template>
    <div :class="['image-src','loading']" @click="handleUrl(data.url)">
        <!-- <div class="label-style">{{data.title}}</div> -->
        <div class="bg-cover"></div>
        <img :data-src="imgShowSrc(data.img)" ref="imgDom">
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, watch } from "vue";
import { randomNum } from "@/utils";
import { setTimeout } from "timers";

const url = `https://picsum.photos/220/220?random=`;

const BOTTOM_IMG_LOADING = 100; //对即将进入视窗的图片距离进行修正

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

        //当前image的DOM
        const imgDom: any = ref(null);

        /**
         * 获取图片路径
         */
        function imgShowSrc(src: string) {
            // return require(`../../../../../../assets/images/${src}`);
            return url + randomNum(1, 100);
        }

        /**
         * 监听数据是否发生变化
         */
        watch(
            () => props.data,
            value => {
                imgDom.value.style.opacity = 0;
            }
        );

        return {
            handleUrl,
            imgShowSrc,
            imgDom
        };
    }
});
</script>

<style scoped lang='scss'>
//基本色
@import "@/style/color.scss";

@import "../style/index.scss";
$borderRadius: 4px;

.image-src {
    position: relative;

    width: 14.165rem;
    height: 14.165rem;
    border-radius: $borderRadius;
    margin-bottom: 0.5rem;
    .label-style {
        position: absolute;

        max-width: 10rem;
        padding: 0.3rem 0.5rem;

        background-color: #f2544a;
        color: $white;
        font-size: 12px;

        z-index: 1;
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

    img {
        position: relative;

        width: 100%;
        height: 100%;
        border-radius: $borderRadius $borderRadius 0 0;

        opacity: 0;
        transition: opacity 0.2s;
    }

    // img[src=""],
    // img:not([src]) {
    //     opacity: 0;
    // }
}
.image-src.loadedImg {
    .bg-cover {
        position: absolute;

        width: 100%;
        height: 100%;
        border-radius: $borderRadius $borderRadius 0 0;

        // background-color: rgba(0, 0, 0, 0.1);
        z-index: 1;
    }
    img {
        opacity: 1;
    }
}
</style>
