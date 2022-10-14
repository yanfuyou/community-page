<template>
    <div class="taste">
        <el-row>
            <el-col :span="24">
                <el-divider>
                    <el-button round class="my-tag">我的标签</el-button>
                </el-divider>
                <el-tag v-for="(tag, index) in myTags" :key="index" closable :type="tag.labelType"
                    @close="removeMyTag(tag)">
                    {{tag.labelName}}
                </el-tag>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-divider>
                    <el-button round>系统标签</el-button>
                </el-divider>
                <el-tag v-for="(tag, index) in systemTags" :key="index" :disable-transitions="false"
                    :type="tag.labelType" @click="addMyTags(tag)">
                    {{tag.labelName}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                    @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-col>
        </el-row>
    </div>
</template>


<style lang="scss">
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.my-tag {
    background-color: #e5eef8;
}

.button-new-tag {
    margin-left: 10px !important;
}
</style>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            myTags: [],
            systemTags: [],
            inputVisible: false,
            inputValue: ''
        };
    },
    computed: {
        ...mapGetters('user', ['getUser'])
    },
    methods: {
        removeMyTag(tag) {
            this.systemTags.push(tag);
            this.myTags.splice(this.myTags.indexOf(tag), 1);
            let dto = {
                userId: this.getUser.id,
                labelId: tag.id
            }
            this.$http.post('/user/delLabel/', dto)
        },
        addMyTags(tag) {
            this.systemTags.splice(this.systemTags.indexOf(tag), 1);
            this.myTags.push(tag);
            let labelUrl = '/user/saveLabel/' + this.getUser.id + '/' + tag.id;
            this.$http.get(labelUrl)
        },
        // handleClose(tag) {
        //     this.systemTags.splice(this.systemTags.indexOf(tag), 1);
        // },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let tagType = ['', 'success', 'info', 'warning', 'danger'];
            let index = Math.round(Math.random() * 4);
            let inputValue = this.inputValue;
            let labelInfo = {
                labelName: this.inputValue,
                labelType: tagType[index]
            }
            if (inputValue) {
                this.systemTags.push(labelInfo);
                this.$http.post('/sys/label/save', labelInfo).then(res => {
                    this.$message.success(res.data.msg);
                    this.setSysTags();
                })
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        setSysTags() {
            this.setMyTags();
            let dto = {
                flag: '0'
            }
            this.$http.post('/sys/label/getSysLabels', dto).then(res => {
                if (res.data.code == 2000) {
                    let records = res.data.records;
                    this.myTags.forEach(m => {
                        records.forEach(s => {
                            if(m.id == s.id){
                                records.splice(this.systemTags.indexOf(tag), 1);
                            }
                        });
                    })
                    this.systemTags = records;
                }
            })
        },
        setMyTags() {
            let userId = this.getUser.id;
            this.$http.get('/user/getUserLabels/' + userId).then(res => {
                if (res.data.code == 2000) {
                    this.myTags = res.data.records;
                }
            })
        }
    },
    mounted() {
        this.setSysTags();
    }
}
</script>