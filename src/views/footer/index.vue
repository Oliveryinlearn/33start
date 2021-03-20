<template>
    <!--尾部信息-->
    <div class="ss-footer">
        尹竹群 版权所有 ©www.752746873.com &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ICP备案号：
        <a
            href="https://beian.miit.gov.cn"
        >苏ICP备14047197号-5</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;工信部备案管理系统网址：
        <a
            href="https://beian.miit.gov.cn"
        >https://beian.miit.gov.cn</a>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped lang='scss'>
//基本色
@import "../../style/color.scss";
//公共样式
@import "../../style/publicStyle.scss";
//主题
@import "../../style/theme.scss";
.ss-footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;

    height: 2rem;
    line-height: 2rem;

    background-color: $gray;
    text-align: center;
    color: $t-bottom-text;
    font-size: 0.7rem;
    a {
        color: $t-bottom-text;
    }
    a:hover {
        color: $main-text;
    }
}
</style>
