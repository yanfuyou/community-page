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
                            <el-input type="text" readonly="" v-model="title" show-word-limit />
                        </el-col>
                        <el-col :span="3">
                            <el-button v-if="delFlag == true" size="mini" round @click="remove">删除</el-button>
                            <el-button v-if="delFlag == true && type=='review'" size="mini" round @click="type='write'">修改</el-button>
                            <el-button v-if="delFlag == true && type=='write'" size="mini" round @click="updateContent">保存</el-button>
                        </el-col>
                        <el-col v-if="getUser.id != null && getUser.id != ''" :span="1">
                            <i class="el-icon-warning-outline" title="举报" @click="handleAcc(articleId, 'article')"></i>
                        </el-col>
                        <el-col :span="6">
                            <el-tag v-for="tag in tags" :key="tag.id" type="tag.labelType">{{ tag.labelName }}</el-tag>
                        </el-col>
                        <el-col :span="7">
                            <span v-if="encl.downPath != null && encl.downPath != ''" class="fileClass" @click="downFile">
                                <el-tag type="info" effect="dark">附件</el-tag>{{ encl.fileName | nameFilter }}<i
                                    class="el-icon-download"></i>
                            </span>
                        </el-col>
                        <el-col :span="3" v-if="getUser.id">
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
                            <mavon-editor v-if="type=='review'" :subfield="false" :editable="false" :toolbarsFlag="false"
                                defaultOpen="preview" :shortCut="false" v-model="value" ref="md" class="mavonWrite">
                            </mavon-editor>
                            <mavon-editor v-if="type=='write'" @imgAdd="$imgAdd" :shortCut="false" :toolbars="toolbars" v-model="value" ref="md"
                            class="mavonWrite"></mavon-editor>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
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
                                            {{ data.updateBy }}:
                                            {{ data.content }}
                                            <i  v-if="getUser.id != '' || getUser.id != null" class="el-icon-chat-line-round" title="回复"
                                                @click="showDialog('1', data.commentId)"></i>
                                            <i class="el-icon-delete" title="删除"
                                                v-if="data.createBy == getUser.userName"
                                                @click="delComment(data.commentId)"></i>
                                            <i v-if="getUser.id != null && getUser.id != ''" class="el-icon-warning-outline" title="举报"
                                                @click="handleAcc(data.commentId, 'comment')"></i>
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
        <el-drawer title="举报!" :before-close="handleClose" :visible.sync="accDialog" direction="rtl"
            custom-class="demo-drawer" ref="drawer">
            <div class="demo-drawer__content">
                <el-form :model="temp">
                    <el-form-item label="理由" label-width="80px">
                        <el-input type="textarea" :rows="3" v-model="temp.reason"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="accDialog = false">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{
                        loading?
                    '提交中 ...'
                            : '确 定'
                    }}</el-button>
                </div>
            </div>
        </el-drawer>
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
            },
            delFlag: false,
            accDialog: false,
            temp: {
                relId: null,
                reason: null,
                bizType: null
            },
            loading: false,
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: false, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            },
            type: 'review'
        }
    },
    components: {
        UserDetail,
        Tree
    },
    filters: {
        nameFilter(val) {
            return val.slice(0, 10) + '...'
        }
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
            if(this.comment.content == ''){
                this.$message.warning({message:'评论不能为空',offset:70})
                return false;
            }
            // 先检查是否含有禁用词
            this.$http.post('/sensitive/checkStr',{"sourceStr": this.comment.content}).then(res => {
                if(res.data.code === 2000 && res.data.records.length > 0){
                    let words = '';
                    res.data.records.forEach(wordObj => {
                        words = words + wordObj.word;
                    })
                    this.$notify({
                        title: '请文明用语',
                        message: words,
                        type: 'warning',
                        offset: 70
                    });
                }else{
                    this.$http.post('/comment/release', this.comment).then(() => {
                        this.dialogVisible = false;
                        // 置空内容
                        this.comment.content = '';
                        this.updateCommentList();
                    });
                }
            });
        },
        getDetail(id) {
            this.$http.get('/article/getArticleInfo/' + id).then(res => {
                if (res.data.code === 2000) {
                    this.title = res.data.records.articleName;
                    this.value = res.data.records.articleContent;
                    this.userId = res.data.records.userId;
                    this.articleId = res.data.records.id;
                    if(res.data.records.createBy == this.$store.getters['user/getUser'].userName){
                        this.delFlag = true
                    }
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
                            if (res.data.code === 2000 && res.data.records) {
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
            if (this.getUser.id) {
                this.$http.get('/collect/collected/' + this.getUser.id + '/' + this.$route.query.id).then(res => {
                    if (res.data.records) {
                        this.collect.id = res.data.records
                        this.collect.flag = true
                    } else {
                        this.collect.id = ''
                        this.collect.flag = false
                    }
                })
            }
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
        },
        readPlus(id) {
            // 阅读量加一
            this.$http.get('/article/readPlusOne/' + id);
        },
        remove(){
            this.$http.get('/article/remove/' + this.$route.query.id).then(res => {
                if(res.data.code === 2000){
                    this.$notify.success({
                        message: res.data.msg,
                        offset: 70
                    })
                    this.$router.go(-1);
                }
            })
        },
        handleAcc(relId, bizType) {
            this.temp.relId = null
            this.temp.reason = null
            this.temp.bizType = null
            this.temp.relId = relId
            this.temp.bizType = bizType
            this.accDialog = true
        },
        handleClose() {
            if (this.loading) {
                return;
            }
            if(this.temp.reason == null ){
                this.$message.warning({message:'理由不能为空',offset:70})
                return false;
            }
            this.$confirm('确定要举报吗？')
                .then(_ => {
                    this.loading = true;
                    this.$http.post('/accusation/add', this.temp).then(res => {
                        if (res.data.code === 2000) {
                            this.$message.success({
                                message: res.data.msg,
                                offset: 70
                            })
                            this.loading = false;
                            this.accDialog = false;
                        }
                    }).catch(err => {
                        this.loading = false;
                        console.log(err);
                    })
                }).catch(_ => { });
        },
        $imgAdd(pos, $file) {
            // 图片上传接口
            const imageData = new FormData();
            imageData.append("img", $file);
            this.$http.post('/file/upload', imageData).then(res => {
                this.$refs.md.$img2Url(pos, res.data.records.visitPath);
            })
        },
        updateContent(){
            let dto = {
                id: this.articleId,
                articleContent: this.value
            }
            this.$http.post('/article/updateContent',dto).then(res => {
                this.$message.success({message:'修改成功',offset:70})
            })
            this.type = 'review';
        }
    },
    created() {
        let id = this.$route.query.id;
        this.getDetail(id);
        this.collected();
        this.readPlus(id);
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