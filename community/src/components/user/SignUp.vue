<template>
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="formStyle">
        <el-form-item label="用户名" prop="userName">
            <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="userName">
            <el-input v-model="user.userAlias"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
            <el-input type="password" v-model="user.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword">
            <el-input type="password" v-model="user.rePassword"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(user)">注册</el-button>
            <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        // 自定义校验规则
        let rePassword = (rule, value, callback) => {
            if(this.user.userPassword != this.user.rePassword){
                return callback(new Error('密码不一致'));
            }else{
                callback()
            }
            
        };
        return {
            user: {
                userName: '',
                userAlias: '',
                userPassword: '',
                rePassword: ''
            },
            rules: {
                userName: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                userPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                ],
                rePassword: [
                    { validator: rePassword, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(user) {
            console.log(user);
            if (user.userName == '' || user.userPassword == '') {
                this.$notify.error({
                    message: '请检查输入信息'
                })
            }
            this.$http.post('user/signup', user).then(res => {
                if (res.data.code == 2000) {
                    console.log(res);
                    this.$notify.success({
                        message: res.data.msg
                    })
                } else {
                    this.$notify.error({
                        message: res.data.msg
                    })
                }
            }).catch(error => {
                this.$notify.error({
                    message: "系统异常"
                })
            })
            this.setCode();
        },
        resetForm(user) {
            this.$refs[user].resetFields();
        }
    }
}
</script>

<style scoped>
.formStyle {
    margin: 200px auto auto 600px;
    width: 450px;
    position: fixed;
}
</style>