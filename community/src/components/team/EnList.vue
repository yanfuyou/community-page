<template>
    <div class="enList">
        <el-form ref="form" :model="teamInfo" label-width="80px" size="medium">
            <el-form-item label="赛事名称">
                <el-input v-model="teamInfo.name" placeholder="赛事名称"></el-input>
            </el-form-item>
            <el-form-item label="赛事链接">
                <el-input v-model="teamInfo.url" placeholder="如果有..."></el-input>
            </el-form-item>
            <el-form-item label="时间区间">
                <el-col :span="11">
                    <el-date-picker v-model="teamInfo.startTime" type="datetime" placeholder="选择开始时间">
                    </el-date-picker>
                </el-col>
                <el-col :span="11">
                    <el-date-picker v-model="teamInfo.endTime" type="datetime" placeholder="选择结束时间">
                    </el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="队伍描述">
                <el-input type="textarea" :rows="2" placeholder="请输入内容（400字）" v-model="teamInfo.desc">
                </el-input>
            </el-form-item>
            <el-form-item label="所需人数">
                <el-input-number v-model="teamInfo.num" :min="1" :max="10" label="所需人数"></el-input-number>
            </el-form-item>
            <el-form-item label="参与方式">
                <el-radio-group v-model="teamInfo.onLine" size="medium">
                    <el-radio border label="1">线下</el-radio>
                    <el-radio border label="2">线上</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">立即招募</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            teamInfo: {
                name: '',
                url: '',
                startTime: '',
                endTime: '',
                onLine: '1',
                num: 1,
                desc: ''
            }
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
};
</script>

<style lang="scss" scoped>
.enList {
    width: 500px;
    margin: 20px 500px;
}
</style>