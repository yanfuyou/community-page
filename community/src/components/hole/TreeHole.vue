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
                <el-select v-model="barMsg.pub" slot="prepend" placeholder="请选择">
                    <el-option label="公开" value="1"></el-option>
                    <el-option label="私有" value="0"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-s-promotion" @click="sendBar">保存</el-button>
            </el-input>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
const BAR_STYLE = ['blue', 'green', 'red', 'rellow', 'palevioletred']
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
            imgUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            barMsg: {
                pub: '1',
                msg: ''
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
        sendBar() {
            // 发送
            this.$http.post('/hole/update', this.barMsg)
        },
        hoverLanePause() {
            console.log("获取焦点");
        },
        addToList() {
            let list = []
            this.$http.post('/hole/page', { "current": 1, "size": 10000, "orders": [{ "column": 't.CREATE_TIME', "asc": false }], "queryParam": { "flag": 0, "pub": '1' } }).then(res => {
                if (res.data.code === 2000) {
                    list = res.data.records.records
                    list.forEach((v) => {
                        v.barrageStyle = BAR_STYLE[parseInt(Math.random() * BAR_STYLE.length, 10)]
                        this.barrageList.push({
                            id: v.id,
                            avatar: v.avatar,
                            msg: v.msg,
                            time: v.time,
                            barrageStyle: v.barrageStyle
                        });
                    });
                };
            })
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

    .palevioletred {
        border-radius: 100px;
        background: #D87093;
        color: #fff;
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
   