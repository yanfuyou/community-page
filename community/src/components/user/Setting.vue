<template>
    <div class="setting">
        <el-tabs type="border-card">
            <el-tab-pane label="头像">
                <Avatar></Avatar>
            </el-tab-pane>
            <el-tab-pane label="基本信息">
                <BaseInfo></BaseInfo>
            </el-tab-pane>
            <el-tab-pane label="教育信息">
                <EduInfo></EduInfo>
            </el-tab-pane>
            <el-tab-pane label="工作信息">
                <WorkInfo></WorkInfo>
            </el-tab-pane>
            <el-tab-pane label="兴趣标签">
                <TasteInfo></TasteInfo>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Avatar from './set/Avatar.vue';
import BaseInfo from './set/BaseInfo.vue';
import EduInfo from './set/EduInfo.vue';
import WorkInfo from './set/WorkInfo.vue';
import TasteInfo from './set/TasteInfo.vue';
export default {
    data() {
        return {};
    },
    comments: {
        Avatar,
        BaseInfo,
        EduInfo,
        WorkInfo,
        TasteInfo
    },
    components: { Avatar, BaseInfo, EduInfo, WorkInfo, TasteInfo }
}
</script>

<style scoped>
.setting{
    margin: 20px 150px 20px 150px;
}
</style>