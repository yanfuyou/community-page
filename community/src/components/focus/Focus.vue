<template>
    <div>
        <Tags></Tags>
        <Contents></Contents>
    </div>
</template>

<script>
import Tags from '@/components/focus/Tags.vue'
import Contents from '@/components/focus/Contents.vue'
export default {
    data() {
        return {
            tags: ''
        }
    },
    components: {
        Tags,
        Contents
    }
}
</script>

<style lang="scss" scoped>

</style>