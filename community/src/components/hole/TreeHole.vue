<template>
    <!-- <div class="barrages-drop">
        <vue-baberrage :isShow="barrageIsShow" :barrageList="barrageList" :maxWordCount="maxWordCount"
            :throttleGap="throttleGap" :loop="barrageLoop" :boxHeight="boxHeight" :messageHeight="messageHeight" :hoverLanePause="hoverLanePause">
        </vue-baberrage>
    </div> -->
    <div>
        <div class="barrages-drop">
            <vue-baberrage :isShow="barrageIsShow" :barrageList="barrageList" :maxWordCount="maxWordCount"
                :throttleGap="throttleGap" :loop="barrageLoop" :hoverLanePause="hoverLanePause">
            </vue-baberrage>
        </div>
        <div class="barInput">
            <el-input placeholder="请输入内容" v-model="barMsg.msg" class="input-with-select">
                <el-select v-model="barMsg.private" slot="prepend" placeholder="请选择" >
                    <el-option label="公开" value="0"></el-option>
                    <el-option label="私有" value="1"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-s-promotion" @click="sendBar">保存</el-button>
            </el-input>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Barrages',
    data() {
        return {
            msg: '哇咔咔',
            barrageIsShow: true,
            barrageLoop: true,
            maxWordCount: 1000,
            throttleGap: 5000,
            barrageList: [],
            imgUrl: 'https://iconfont.alicdn.com/p/illus/file/j6xtlDsgsgVO/fb0f499d-1ea5-4962-9baf-17210f6eb503_origin.svg',
            barMsg: {
                id: '',
                private: '0',
                msg: '',
                avatar: '',
                barrageStyle: 'red'
            }
        };
    },
    computed: {
        ...mapGetters('user', ['getUser']),
        avatarUrl() {
            return this.getUser.userAvatar ? this.getUser.userAvatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        }
    },
    mounted() {
        this.addToList();
    },
    methods: {
        sendBar(){
            this.barMsg.avatar = this.avatarUrl;
            console.log(this.barMsg);
        },
        hoverLanePause() {
            console.log("获取焦点");
        },
        addToList() {
            let list = [
                {
                    id: 1,
                    avatar: 'https://iconfont.alicdn.com/p/illus/file/j6xtlDsgsgVO/fb0f499d-1ea5-4962-9baf-17210f6eb503_origin.svg',
                    msg: '是js的超集，功能比js更丰富。写代码的时免不了引入第三方库但是现在的大部分库还是',
                    time: 10,
                    barrageStyle: 'red'
                },
                {
                    id: 2,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 8,
                    barrageStyle: 'green'
                },
                {
                    id: 3,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 10,
                    barrageStyle: 'normal'
                },
                {
                    id: 4,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 5,
                    barrageStyle: 'blue'
                },
                {
                    id: 5,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 6,
                    barrageStyle: 'red'
                },
                {
                    id: 6,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 12,
                    barrageStyle: 'normal'
                },
                {
                    id: 7,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 5,
                    barrageStyle: 'red'
                },
                {
                    id: 8,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 5,
                    barrageStyle: 'normal'
                },
                {
                    id: 9,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 8,
                    barrageStyle: 'red'
                },
                {
                    id: 10,
                    avatar: this.imgUrl,
                    msg: this.msg,
                    time: 10,
                    barrageStyle: 'yellow'
                }
            ];
            list.forEach((v) => {
                this.barrageList.push({
                    id: v.id,
                    avatar: v.avatar,
                    msg: v.msg,
                    time: v.time,
                    // type: MESSAGE_TYPE.NORMAL,
                    barrageStyle: v.barrageStyle
                });
            });
        }
    }
};
</script>

<style lang="less">
.barrages-drop {
    .blue {
        border-radius: 100px;
        background: #e6ff75;
        color: #fff;
    }

    .green {
        border-radius: 100px;
        background: #75ffcd;
        color: #fff;
    }

    .red {
        border-radius: 100px;
        background: #e68fba;
        color: #fff;
    }

    .yellow {
        border-radius: 100px;
        background: #dfc795;
        color: #fff;
    }

    .baberrage-stage {
        position: absolute;
        width: 100%;
        height: 500px;
        overflow: hidden;
        top: 0;
        margin-top: 130px;
    }
}

.el-select .el-input {
    width: 130px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.barInput {
    bottom: 200px;
    width: 80%;
    margin: auto 150px;
    position: fixed;
}
</style>
   