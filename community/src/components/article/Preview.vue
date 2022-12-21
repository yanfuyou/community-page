<template>
    <div id="out">
        <el-container id="one-con">
            <el-aside style="background-color:aliceblue" width="400px">
                <UserDetail :userId="userId" :articleId="articleId"></UserDetail>
            </el-aside>
            <el-container>
                <el-main>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-input type="text" readonly="" v-model="title" show-word-limit>
                            </el-input>
                        </el-col>
                        <el-col :span="7">
                            <el-tag v-for="tag in tags" :key="tag.id" type="tag.labelType">{{ tag.labelName }}</el-tag>
                        </el-col>
                        <el-col :span="8">
                            <span v-if="encl.downPath != ''" class="fileClass" @click="downFile">
                                <el-tag type="info" effect="dark">附件</el-tag>{{ encl.fileName }}<i
                                    class="el-icon-download"></i>
                            </span>
                        </el-col>
                        <el-col :span="3">
                            <el-tag type="info" v-if="!collect.flag" @click="addCollect">
                                <i class="el-icon-star-off">收藏</i>
                            </el-tag>
                            <el-tag v-else @click="removeCollect">
                                <i class="el-icon-star-on">已收藏</i>
                            </el-tag>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <mavon-editor :subfield="false" :editable="false" :toolbarsFlag="false"
                                defaultOpen="preview" :shortCut="false" v-model="value" ref="md" class="mavonWrite">
                            </mavon-editor>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-card class="box-card" style="line-height:5px; margin-bottom: 50px;">
                                <div slot="header" class="clearfix">
                                    <el-badge :value="''" class="item">
                                        <el-button size="small">评论</el-button>
                                    </el-badge>
                                    <el-button style="float: right; padding: 0px" type="text"
                                        @click="showDialog('2', '0')"><i class="el-icon-edit"></i>写评论
                                    </el-button>
                                </div>
                                <!-- 树状评论 -->
                                <!-- <Tree :comments="comments"></Tree> -->
                                <el-empty description="暂无评论" v-if="this.comments.length == 0"></el-empty>
                                <el-tree :data="comments" :default-expand-all="true" :expand-on-click-node="false"
                                    v-else>
                                    <span slot-scope="{data}">
                                        <span>
                                            <!-- <el-avatar :size="20"
                                            :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'">
                                        </el-avatar> -->
                                            {{ data.createBy }}:
                                            {{ data.content }}<i class="el-icon-chat-line-round" title="回复"
                                                @click="showDialog('1', data.commentId)"></i>
                                            <i class="el-icon-delete" title="删除"
                                                v-if="data.createBy == getUser.userAlias"
                                                @click="delComment(data.commentId)"></i>
                                        </span>
                                    </span>
                                </el-tree>
                            </el-card>

                        </el-col>
                        <!-- 用来写评论 -->
                        <el-dialog title="评论" :visible.sync="dialogVisible">
                            <el-input type="textarea" :rows="3" placeholder="不超过两百字哦。" v-model="comment.content">
                            </el-input>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="releaseComment()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserDetail from '../user/UserDetail.vue'
import Tree from './Tree.vue'
export default {
    data() {
        return {
            value: '',
            title: '',
            tags: [],
            encl: {
                downPath: ''
            },
            userId: '',
            articleId: '',
            // 写评论标识
            dialogVisible: false,
            comment: {
                parentId: '',
                content: '',
                bizType: '',
                articleId: ''
            },
            // 输入的评论信息
            commentVal: '',
            parentId: '',
            // 评论信息
            comments: [],
            collect: {
                id: ' ',
                flag: false,
            }
        }
    },
    components: {
        UserDetail,
        Tree
    },
    computed: {
        ...mapGetters('user', ['getUser'])
    },
    methods: {
        showDialog(bizType, parentId) {
            this.dialogVisible = true;
            this.comment.parentId = parentId;
            this.comment.bizType = bizType;
            this.comment.articleId = this.articleId;
        },
        releaseComment() {
            this.$http.post('/comment/release', this.comment).then(() => {
                this.dialogVisible = false;
                // 置空内容
                this.comment.content = '';
                this.updateCommentList();
            });
        },
        getDetail(id) {
            this.$http.get('/article/getArticleInfo/' + id).then(res => {
                if (res.data.code === 2000) {
                    this.title = res.data.records.articleName;
                    this.value = res.data.records.articleContent;
                    this.userId = res.data.records.userId;
                    this.articleId = res.data.records.id;
                    // 标签id
                    let labelIds = res.data.records.articleLabels.split(',');
                    labelIds.splice(0, 1);
                    let dto = {
                        flag: '0',
                        ids: labelIds
                    }
                    this.$http.post('/sys/label/getSysLabels', dto).then(res => {
                        if (res.data.code === 2000) {
                            this.tags = res.data.records;
                        }
                    })
                    // 附件
                    if (res.data.records.enclosure === '1') {
                        this.$http.get('/article/enclInfo/' + res.data.records.id).then(res => {
                            if (res.data.code === 2000) {
                                this.encl = res.data.records;
                            }
                        })
                    }
                    // 评论
                    this.updateCommentList();
                }
            })
        },
        updateCommentList() {
            this.$http.get('/comment/getCommentTree/' + this.articleId).then(res => {
                this.comments = res.data.records;
            })
        },
        delComment(commentId) {
            this.$http.get('/comment/del/' + commentId).then(() => this.updateCommentList());
        },
        downFile() {
            this.$down.myDownLoad(this.encl.downPath, this.encl.fileName);
        },
        addRead() {
            this.$http.post('')
        },
        delCollect() {
            this.$http.delete('/collect/del/' + this.collect.id)
        },
        addCollect() {
            let info = {
                userId: this.getUser.id,
                relId: this.$route.query.id,
                bizType: '1',
            }
            this.$http.post('/collect/save', info).then(res => {
                if (res.data.code === 2000) {
                    this.collected()
                }
            })

        },
        collected() {
            this.$http.get('/collect/collected/' + this.getUser.id + '/' + this.$route.query.id).then(res => {
                if (res.data.records) {
                    this.collect.id = res.data.records
                    this.collect.flag = true
                }else{
                    this.collect.id = ''
                    this.collect.flag = false
                }
            })
        },
        removeCollect() {
            let info = {
                id: this.collect.id,
                flag: '1'
            }
            this.$http.post('/collect/save', info).then(res => {
                if (res.data.code === 2000) {
                    this.collected()
                }
            })
        }
    },
    created() {
        let id = this.$route.query.id;
        this.getDetail(id);
        this.collected()
    }
}
</script>

<style lang="scss">
.el-dialog__wrapper,
.el-dialog {
    height: 400px;
    line-height: 0;
}

.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

#out {
    height: 98%;
    margin: 10px 50px auto 50px;
}

#one-con {
    height: 100%;
}

.el-card__header {
    height: 36px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    text-align: left;
}
</style>