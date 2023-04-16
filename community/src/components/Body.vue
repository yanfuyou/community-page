<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a: ''
        }
    }
}
</script>

<style scoped>
div {
    min-height: 800px;
    margin: 0px 0px 60px 0px;
    /* margin: 0; */
    padding: 0;
}
</style>