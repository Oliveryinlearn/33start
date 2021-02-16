<template>
    <div :class="['ss-card',{'loading':!data}]" @click="handleUrl(data.url)">
        <div class="main-img loading">
            <img :src="imgShowSrc(data.img)">
            <!-- <img> -->
        </div>
        <h4>{{data.title}}</h4>
        <div class="description">{{data.info}}</div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        data: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    setup() {
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
            return require(`../../../assets/images/${src}`);
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
@import "../../../style/color.scss";

$borderRadius: 4px;
.ss-card {
    position: relative;
    top: 0;

    width: 14.165rem;
    height: 20rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    padding: 0.5rem;

    border-radius: $borderRadius;

    background-color: $white;
    box-sizing: border-box;
    transition: all 0.2s;

    .main-img {
        width: 13.165rem;
        height: 13.165rem;
        border-radius: $borderRadius;
        margin-bottom: 0.5rem;
        img {
            width: 100%;
            height: 100%;
        }
        img[src=""],
        img:not([src]) {
            opacity: 0;
        }
    }
    h4 {
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;

        margin-top: 0.7rem;
        margin-bottom: 0.2rem;
        box-sizing: border-box;
        padding-left: 4px;

        color: $main-text;
        font-weight: bold;
        font-size: 0.95rem;
    }
    .description {
        width: 100%;

        box-sizing: border-box;
        padding: 0 4px;

        color: $t-level-text;
        line-height: 1.4rem;
        font-size: 0.8rem;
    }
}
.ss-card:hover {
    cursor: pointer;
    top: -2px;
    box-shadow: 0 10px 30px rgba(175, 175, 175, 0.2);
}
.ss-card.loading {
    h4,
    .main-img,
    .description {
        background-color: $gray-2;

        background: linear-gradient(
                100deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 60%
            )
            $gray;
        background-size: 200% 100%;
        background-position-x: 120%;

        animation: 1s loading ease-in-out infinite;
    }
    @keyframes loading {
        to {
            background-position-x: -20%;
        }
    }
    h4 {
        animation-delay: 0.05s;
    }
    .description {
        min-height: 3rem;
        animation-delay: 0.06s;
    }
}
.ss-card {
    .loading {
        background-color: $gray-2;

        background: linear-gradient(
                100deg,
                rgba(255, 255, 255, 0) 40%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 60%
            )
            $gray;
        background-size: 200% 100%;
        background-position-x: 120%;

        animation: 1s loading ease-in-out infinite;
    }
    @keyframes loading {
        to {
            background-position-x: -20%;
        }
    }
}
</style>
