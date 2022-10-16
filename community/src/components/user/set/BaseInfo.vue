<template>
    <el-form ref="form" :model="user" label-width="80px" class="baseUser">
        <el-form-item label="用户名">
            <el-input v-model="user.userName" readonly="" class="username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
            <el-input v-model="user.userAlias"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="user.userEmail" class="username"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户ID">
            <el-input v-model="user.id"></el-input>
        </el-form-item> -->
        <el-form-item label="出生日期">
            <el-col :span="11">
                <el-date-picker v-model="user.birthday" type="date" placeholder="选择日期" value-format="yyyy年MM月dd日" format="yyyy年MM月dd日">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="user.userSex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="想说">
            <el-input v-model="user.userSign"></el-input>
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
            user: {
                id: '',
                userName: '',
                userAlias: '',
                userEmail: '',
                birthday: '',
                userSex: '',
                userSign: ''
            }
        }
    },
    computed: {
        ...mapGetters('user', ['getUser']),
    },
    methods: {
        onSubmit() {
            this.user.id = this.getUser.id;
            console.log(this.user);
            this.$http.post('/user/update',this.user);
        },
        setBasic(){
            this.$http.get('/user/' + this.getUser.id).then(res => {
                if(res.data.code === 2000){
                    this.user = res.data.records;
                }
            })
        }
    },
    mounted(){
        this.setBasic();
    }
}
</script>
<style scoped lang="scss">
.baseUser {
    width: 500px;
    margin-left: 100px;
}

.username>.el-input__inner {
    background-color: rgb(173, 186, 187) !important;
}
</style>