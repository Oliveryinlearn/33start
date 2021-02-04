<template>
    <home-view/>
</template>
<script lang='ts'>
import { Vue, Options } from "vue-class-component";

import HomeView from "./views/index.vue";

@Options({
    components: { HomeView }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
#app {
    width: 100%;
    height: 100%;
}
</style>
