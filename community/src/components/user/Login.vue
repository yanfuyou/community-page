<template>
    <div class="one">
        <img class="studyImg" src="@/assets/img/svg/study.png">
        <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="formStyle">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="user.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
                <el-input type="password" v-model="user.userPassword"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verification" id="verification" @keyup.enter.native="submitForm(user)">
                <el-row>
                    <el-col :span="12">
                        <el-input id="codeIn" v-model="user.verification"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <div id="code-img"><span title="点击刷新" @click="setCode">{{ codeNum }}</span></div>
                    </el-col>
                </el-row>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(user)">登录</el-button>
                <el-button @click="resetForm('user')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                userName: '',
                userPassword: '',
                verification: '',
                codeUid: '',
                codeFlag: '1'
            },
            codeNum: '',
            rules: {
                userName: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                userPassword: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
                ],
                verification: [
                    { required: true, message: '验证码不能为空', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(user) {
            // console.log(user);
            if (user.userName == '' || user.userPassword == '' || user.verification == '') {
                this.$notify.error({
                    message: '请检查输入信息'
                })
            }
            this.$http.post('user/login', user).then(res => {
                if (res.data.code == 2000) {
                    let user = {
                        id: res.data.records.userId,
                        userName: res.data.records.userName,
                        userAlias: res.data.records.userAlias,
                        userAvatar: res.data.records.userAvatar,
                        loginFlag: true,
                        roles: [],
                        permissions: []
                    }
                    window.localStorage.setItem("Bearer", res.data.records.tokenId);
                    this.$http.get('/user/getInfo').then(roleInfo => {
                        const { roles, permission } = roleInfo.data.records
                        user.roles = roles
                        if (!roles || roles.length <= 0) {
                            this.$message.error({
                                message: '请等待初始化角色',
                                offset: 70
                            })
                        } else {
                            let permissions = []
                            roles.forEach(role => {
                                permissions = permissions.concat(permission[role])
                            })
                            user.permissions = permissions
                        }
                    })
                    this.$store.commit('user/setUser', user);
                    this.$router.push('/index')
                    this.$notify.success({
                        message: res.data.msg,
                        offset: 70
                    })
                }
            }).catch(error => {
                this.$notify.error({
                    message: "系统异常",
                    offset: 70
                })
            })
            this.setCode();
        },
        resetForm(user) {
            this.$refs[user].resetFields();
        },
        setCode() {
            // 设置验证码
            this.$http.get('code/num').then(res => {
                this.codeNum = res.data.records.codeNum;
                this.user.codeUid = res.data.records.uid;
            })
        }
    },
    created() {
        // 设置验证码
        this.$http.get('code/num').then(res => {
            this.codeNum = res.data.records.codeNum;
            this.user.codeUid = res.data.records.uid;
        })

    }
}
</script>

<style scoped>
.formStyle {
    margin: 200px 500px auto auto;
    width: 450px;
    float: right;
}

#code-img {
    margin-left: 20px;
    font-size: 24px;
    text-align: center;
    background-image: url(../../assets/img/codeBg.png);
}
.studyImg{
    margin: 100px auto auto 400px;
    width: 450px;
    float: left;
}
</style>