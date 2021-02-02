<template>
    <div class="ss-home">
        <!--导航-->
        <nav-view/>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
//引入导航
import NavView from "./navView/index.vue";

export default defineComponent({
    components: {
        NavView
    },
    setup(props: object, context: object) {
        // const list:
        // console.log(props, context);
    }
});
</script>

<style scoped lang='scss'>
.ss-home {
    position: relative;

    width: 100%;
    height: 100%;
}
</style>


