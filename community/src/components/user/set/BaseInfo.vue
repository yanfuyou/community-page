<template>
    <el-form ref="form" :model="user" label-width="80px" class="baseUser">
        <el-form-item label="用户昵称">
            <el-input v-model="user.alias"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="用户ID">
            <el-input v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
            <el-col :span="11">
                <el-date-picker v-model="user.birthday" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="user.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="想说">
            <el-input v-model="user.sign"></el-input>
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
            user: {
                id: '',
                name: '',
                alias: '',
                birthday: '',
                sex: '',
                sign: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style scoped>
.baseUser{
    width: 500px;
    margin-left: 100px;
}
</style>