<template>
    <div :class="['ss-card','loading']">
        <div class="main-img">
            <!-- <img src=""> -->
        </div>
        <h4></h4>
        <div class="description"></div>
        <!-- <div class="next-img">
            <div></div>
            <div></div>
            <div></div>
        </div>-->
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
    setup(props) {
        console.log(1);
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
        width: 13rem;
        height: 13rem;
        border-radius: $borderRadius;
        margin-bottom: 0.5rem;
    }
    .next-img {
        display: flex;
        width: 100%;
        height: 4rem;

        justify-content: space-between;

        & > div {
            width: 4rem;
            height: 4rem;
            margin-right: 0.5rem;
            border-radius: $borderRadius;

            background-color: $gray-2;
        }
        & > div:nth-child(3n) {
            margin-right: 2px;
        }
    }
    h4 {
        width: 100%;

        margin-top: 0.7rem;
        margin-bottom: 0.5rem;
    }
    .description {
        width: 100%;
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
        min-height: 1.5rem;
        animation-delay: 0.05s;
    }
    .description {
        min-height: 3rem;
        animation-delay: 0.06s;
    }
}
</style>
