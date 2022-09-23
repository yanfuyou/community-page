<template>
    <div id="out">
        <el-container id="one-con">
            <el-aside style="background-color:aliceblue" width="400px">
                <UserDetail></UserDetail>
            </el-aside>
            <el-container>
                <el-main>
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-input type="text" placeholder="请输入主题" v-model="title" maxlength="20" show-word-limit>
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="value1" multiple placeholder="请选择标签">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10">
                            <span v-if="true" class="fileClass">下载附件<i class="el-icon-delete-solid"></i></span>
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
                            <el-empty description="暂无评论" v-if="this.comments.length==0"></el-empty>
                            <el-card class="box-card" style="line-height:5px" v-else>
                                <div slot="header" class="clearfix">
                                    <el-badge :value="this.comments.length" class="item">
                                        <el-button size="small">评论</el-button>
                                    </el-badge>
                                    <el-button style="float: right; padding: 0px" type="text" @click="writeComment"><i
                                            class="el-icon-edit"></i>写评论
                                    </el-button>
                                </div>
                                <div v-for="(comment,index) in comments" :key="index" class="text item">
                                    <el-avatar :size="30"
                                        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'">
                                    </el-avatar>
                                    {{comment.msg }}
                                </div>
                            </el-card>
                        </el-col>
                        <!-- 用来写评论 -->
                        <el-dialog title="评论" :visible.sync="dialogVisible">
                            <el-input type="textarea" :rows="3" placeholder="不超过两百字哦。" v-model="commentVal">
                            </el-input>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import UserDetail from '../user/UserDetail.vue'
export default {
    data() {
        return {
            value: '::: hljs-center\n\n# 文本\n\n:::\n',
            title: '',
            value1: '',
            options: [],
            // 写评论标识
            dialogVisible: false,
            // 输入的评论信息
            commentVal: '',
            // 评论信息
            comments: [
                {
                    // 发言人
                    UserId: '鄢富友',
                    // 信息
                    msg: '这是一条评论',
                    // 时间
                    createTime: '2022-09-20',
                    // 子评论
                    childComments: [
                        {
                            // 发言人
                            UserId: '鄢富友',
                            // 信息
                            msg: '这是二条评论',
                            // 时间
                            createTime: '2022-09-20',
                            // 子评论
                            childComments: []
                        }
                    ]
                },
                {
                    // 发言人
                    UserId: '鄢富友',
                    // 信息
                    msg: '这是一条评论',
                    // 时间
                    createTime: '2022-09-20',
                    // 子评论
                    childComments: [
                        {
                            // 发言人
                            UserId: '鄢富友',
                            // 信息
                            msg: '这是二条评论',
                            // 时间
                            createTime: '2022-09-20',
                            // 子评论
                            childComments: []
                        }
                    ]
                }
            ]
        }
    },
    components: {
        UserDetail
    },
    methods: {
        writeComment() {
            this.dialogVisible = true;
        }
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