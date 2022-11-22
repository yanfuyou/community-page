<template>
    <el-tree :data="comments" :props="defaultProps" :default-expand-all="true">
        <!-- <div></div> -->
    </el-tree>
</template>

<script>
export default {
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'createBy'
            }
        };
    },
    methods: {
    },
    props: ['comments']
};
</script>
