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
    height: 800px;
    margin: 10px 20px auto 20px;
}
</style>