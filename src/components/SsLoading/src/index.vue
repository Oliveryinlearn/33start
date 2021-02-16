<template>
    <div
        class="ts-loading"
        :style="{'top': top, 'left': left, 'width': width, 'height': height, 'position': dirPosition||position}"
        v-if="showLoading||show"
    >
        <div class="container">
            <div class="loader4"></div>
            <div class="text">{{loadingText||text}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ts-loading",
    data() {
        return {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            show: false,
            text: "加载中",
            dirPosition: ""
        };
    },
    props: {
        showLoading: {
            type: Boolean,
            default: false
        },
        loadingText: {
            type: String,
            default: ""
        },
        position: {
            type: String,
            default: "absolute"
        }
    }
};
</script>

<style scoped>
.ts-loading {
    /* color: #5E54EC; */
    background-color: rgba(255, 255, 255, 0.6);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.2s;
    opacity: 1;
    z-index: 99;
    -webkit-animation: show_loader 0.2s ease-in-out;
    animation: show_loader 0.2s ease-in-out;
}
.ts-loading.ts-hide {
    opacity: 0;
}
@keyframes show_loader {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes show_loader {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.ts-loading .container {
    width: 60px;
    height: 60px;
    position: absolute;
    display: inline-block;
    top: 50%;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999999999999;
}
.ts-loading .loader4 {
    width: 25px;
    height: 25px;
    display: inline-block;
    padding: 0px;
    border-radius: 100%;
    border: 4px solid;
    color: rgba(45, 140, 240, 1);
    border-bottom-color: rgba(0, 0, 0, 0.1);
    color: rgba(45, 140, 240, 1);
    border-right-color: rgba(0, 0, 0, 0.1);
    -webkit-animation: ts_loader4 0.8s ease-in-out infinite;
    animation: ts_loader4 0.8s ease-in-out infinite;
}
@keyframes ts_loader4 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes ts_loader4 {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
.ts-loading .text {
    font-size: 12px;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: rgba(45, 140, 240, 1);
    /* color: #5E54EC; */
}
</style>
