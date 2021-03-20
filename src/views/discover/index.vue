<template>
    <div class="discover">
        <!--便签主体-->
        <div class="discover-container">
            <div class="discover-body"></div>
        </div>
        <!--底部信息-->
        <ss-footer/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
//引入尾部信息
import ssFooter from "@/views/footer/index.vue";

export default defineComponent({
    components: {
        ssFooter
    },
    setup() {
        // console.log("发现");
    }
});
</script>

<style scoped lang='scss'>
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
