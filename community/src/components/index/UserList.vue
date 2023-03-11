<template>
    <div class="userList">
        <el-empty description="快去注册吧" :image-size="200" v-if="users.length == 0">
            <template v-slot:image>
                <img src="@/assets/img/empty/emptyUser.png">
            </template>
        </el-empty>
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="item" v-for="(user, index) in users" :key="index">
                    <el-avatar :size="40"
                        :src="user.userAvatar" @click.native="dump('/user/userHome',user.id)"></el-avatar>
                    <p>{{ user.userAlias }}: {{ user.userSign | signFilter }}</p>
                    <hr>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default ({
    filters: {
        signFilter(val) {
            if (!val || val == '') {
                return '签名暂无...';
            }
            return val;
        }
    },
    methods:{
        dump(path,id) {
            console.log(id);
            this.$router.push({
                path: path,
                query: {
                    id: id
                }
            })
        }
    },
    data() {
        return {
        }
    },
    props: {
        users: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
})
</script>

<style scoped lang="less">
.item {
    text-align: center;

    p {
        margin-top: 5px
    }
}
</style>