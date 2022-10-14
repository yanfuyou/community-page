<template>
    <div class="avatar">
        <el-row>
            <el-col :span="3">
                <div class="block avatar">
                    <el-avatar :size="100" :src="avatarUrl"></el-avatar>

                </div>
            </el-col>
            <el-col :span="11">
                <el-row id="user-main">
                    <el-col :span="24">
                        <div id="name">
                            <i class="el-icon-user">用户名：<span>鄢富友</span></i>
                        </div>
                    </el-col>
                </el-row>
                <el-row id="user-main">
                    <el-col :span="24">
                        <div id="name">
                            <i class="el-icon-time">社龄：<span>一年</span></i>
                        </div>
                    </el-col>
                </el-row>
                <el-row id="user-main">
                    <el-col :span="24">
                        <div id="name">
                            <i class="el-icon-s-promotion">联系方式<span>鄢富友</span></i>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="10">
                <el-upload class="upload-demo" drag action="" multiple :show-file-list="false"
                    :http-request="uploadAvatar">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">换个头像吧</div>
                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            // avatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            upFlag: false
        }
    },
    computed: {
        ...mapGetters('user', ['getUser']),
        avatarUrl() {
            return this.getUser.userAvatar ? this.getUser.userAvatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        }
    },
    methods: {
        uploadAvatar(avatarFile) {
            let fileA = new FormData();
            fileA.append('files', avatarFile.file);
            fileA.append('bizType', 'avatar')
            this.$http.post('/file/upFile', fileA).then(res => {
                if (res.data.code === 2000) {
                    // location.reload();
                    // this.$router.go(0)
                }
            })
        }
    }
}
</script>

<style scoped>
#name {
    margin-top: 5px;
}

#user-main {
    margin-bottom: 10px;
}

.avatar {
    margin-left: 40px;
}

.upload-demo {
    height: 100px;
}
</style>