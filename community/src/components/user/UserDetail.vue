<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div @click="dump('/user/userhome')">
                    <el-avatar id="avatar" shape="square" :size="100" :src="user.userAvatar"></el-avatar>
                </div>
                <el-descriptions class="margin-top" :column="2" border>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-zoom-in"></i>
                            用户名
                        </template>
                        {{user.userAlias}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user-solid"></i>
                            性别
                        </template>
                        <el-tag v-if="user.userSex == 1" size="small">男</el-tag>
                        <el-tag v-if="user.userSex == 0" size="small">男</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-chat-line-round"></i>
                            邮箱
                        </template>
                        {{user.userEmail}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-plus"></i>
                            生日
                        </template>
                        {{user.birthday}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-microphone"></i>
                            一言
                        </template>
                        {{user.userSign}}
                    </el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-rate v-model="value" :max="10" @change="change()"></el-rate>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            sizeList: ["large", "medium", "small"],
            user: {
                id: '',
                userName: '',
                userAlias: '',
                userEmail: '',
                birthday: '',
                userSex: '',
                userSign: '',
                userAvatar: ''
            },
            // 评分用的
            value: 0,
            iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
        };
    },
    watch: {
        userId() {
            this.$http.get('/user/' + this.userId).then(res => {
                if (res.data.code === 2000) {
                    this.user = res.data.records;
                }
            })
        },
        articleId() {
            this.$http.get('score/getArtScore/' + this.userId + '/' + this.articleId).then(res => {
                if (res.data.code === 2000) {
                    // 防止给number类型复制string报错
                    if(res.data.records[0]){
                        this.value = res.data.records[0].score * 1;
                    }
                }
            })
        }
    },
    methods: {
        change() {
            let score = {
                userId: this.userId,
                articleId: this.articleId,
                score: this.value
            }
            this.$http.post('/score/addScore', score)
        },
        dump(path) {
            this.$router.push({
                path: path,
                query: {
                    id: this.userId
                }
            })
        }
    },
    props: ['userId', 'articleId']
};

</script>

<style scoped>
.el-aside {
    line-height: 20px !important;
}

#avatar {
    margin-top: 20px;
}
</style>