<template>
    <div id="article">
        <el-empty description="等待分享中。。。" :image-size="200" v-if="sources.length == 0">
            <template v-slot:image>
                <img src="@/assets/img/empty/emptyMa.png">
            </template>
        </el-empty>
        <div v-else id="articleList" v-for="(source,index) in sources" :key="index">
            <el-row>
                <el-col :span="24">
                    <div class="ArticleTitle">
                        <el-tag effect="plain">资源描述</el-tag>{{source.descr}}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="articleContent">
                        <el-tag effect="plain">资源名称</el-tag>{{source.fileName}}
                        <el-button type="info" round style="margin-left:20px;" size="small" @click="download(source.id,source.visitPath,source.fileName)">下载</el-button>
                        <el-button v-if="source.createBy == userName" type="danger" round size="small" @click="remove(source.id)">删除</el-button>
                        <i v-if="getUser.id != null && getUser.id != ''" class="el-icon-warning-outline" title="举报" @click="handleAcc(source.id, 'file')"></i>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator="|" class="articleFoot">
                        <el-breadcrumb-item>发布时间{{source.updateTime | timeFilter}}</el-breadcrumb-item>
                        <el-breadcrumb-item>下载量{{source.downloadNum}}</el-breadcrumb-item>
                        <!-- <el-breadcrumb-item>点赞量{{source.giveCount}}</el-breadcrumb-item> -->
                        <!-- <el-breadcrumb-item>类型{{source.siurceSuffix}}</el-breadcrumb-item> -->
                    </el-breadcrumb>
                    <el-divider></el-divider>
                </el-col>
            </el-row>
        </div>
        <el-drawer title="举报!" :before-close="doAcc" :visible.sync="accDialog" direction="rtl"
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
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters('user', ['getUser'])
    },
    filters:{
        timeFilter(val) {
            return val.substring(0, 4) + '-' + val.substring(4, 6) + '-' + val.substring(6, 8) + ' '
                + val.substring(8, 10) + ':' + val.substring(10, 12) + ':' + val.substring(12, 14);
        }
    },
    methods:{
        download(id,url,fileName){
            // 增加下载量
            this.$http.get('/material/downloadCount/' + id);
            this.$down.myDownLoad(url,fileName);
        },
        remove(id){
            this.$http.get('/material/remove/' + id).then(res => {
                this.$message.success({
                    message: res.data.msg,
                    offset: 70
                })
                this.$forceUpdate();
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
        doAcc() {
            if (this.loading) {
                return;
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
        }
    },
    data() {
        return {
            userName: this.$store.getters['user/getUser'].userName,
            accDialog: false,
            temp: {
                relId: null,
                reason: null,
                bizType: null
            },
            loading: false
        }
    },
    props: {
        sources: {
            type: Array,
            default: ()=>{return []}
        }
    }
}
</script>

<style scoped lang="scss">
#article {
    #articleList {
        width: 972px;
        height: 167px;
        margin-left: 20px;

        .articleContent {
            color: #707376;
        }
    }
}
</style>