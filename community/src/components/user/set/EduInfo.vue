<template>
    <el-form ref="form" :model="eduInfo" label-width="80px" class="baseUser">
        <el-form-item label="学校名称">
            <el-input v-model="eduInfo.schName"></el-input>
        </el-form-item>
        <el-form-item label="专业">
            <el-input v-model="eduInfo.major"></el-input>
        </el-form-item>
        <el-form-item label="毕业时间">
            <el-col :span="11">
                <el-date-picker value-format="yyyy年MM月dd日" format="yyyy年MM月dd日" v-model="eduInfo.graTime" type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="学历">
            <el-input v-model="eduInfo.eduBak"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            eduInfo: {
                id: '',
                userId: '',
                schName: '',
                major: '',
                graTime: '',
                eduBak: ''
            }
        }
    },
    computed: {
        ...mapGetters('user', ['getUser']),
    },
    methods: {
        onSubmit() {
            this.eduInfo.userId = this.$store.state.user.user.id;
            this.$http.post('/user/saveEdu', this.eduInfo);
        },
        setEdu() {
            this.$http.get('/user/edu/' + this.getUser.id).then(res => {
                if (res.data.code === 2000 && res.data.records) {
                    this.eduInfo = res.data.records;
                }
            })
        }
    },
    mounted(){
        this.setEdu();
    }

}
</script>
<style scoped>
.baseUser {
    width: 500px;
    margin-left: 100px;
}
</style>