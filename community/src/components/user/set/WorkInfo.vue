<template>
    <el-form ref="form" :model="workInfo" label-width="80px" class="baseUser">
        <el-form-item label="公司名称">
            <el-input v-model="workInfo.comName"></el-input>
        </el-form-item>
        <el-form-item label="职位">
            <el-input v-model="workInfo.posName"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
            <el-input v-model="workInfo.address"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
            <el-col :span="11">
                <el-date-picker v-model="workInfo.inTime" type="date" placeholder="选择日期" value-format="yyyy年MM月dd日"
                    format="yyyy年MM月dd日">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            workInfo: {
                id: '',
                usreId: '',
                comName: '',
                posName: '',
                address: '',
                inTime: ''
            }
        }
    },
    methods: {
        onSubmit() {
            this.workInfo.userId = this.$store.state.user.user.id;
            this.$http.post('/user/saveWork', this.workInfo);
        },
        setWork() {
            this.$http.get('/user/work/' + this.$store.state.user.user.id).then(res => {
                if (res.data.code === 2000 && res.data.records.id) {
                    this.workInfo = res.data.records;
                }
            })
        }
    },
    mounted(){
        this.setWork();
    }
}
</script>
<style scoped>
.baseUser {
    width: 500px;
    margin-left: 100px;
}
</style>