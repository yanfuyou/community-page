<template>
    <div id="box">
        <div id="userHome">
            <el-row id="head">
                <el-col :span="4">
                    <div class="block avatar">
                        <el-avatar :size="100" :src="user.baseInfo.userAvatar"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="20">
                    <el-row id="user-main">
                        <el-col :span="24">
                            <div id="name">
                                <span>{{user.baseInfo.userAlias}}</span>
                                <i class="el-icon-time">{{getTime}}</i>
                                <i style="float:right;margin-right:80px;" class="el-icon-setting" title="设置"
                                    @click="dump('/user/setting')">设置</i>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <!-- <el-breadcrumb separator="|" style="color:#2b426e !important;">
                                <el-breadcrumb-item>文章数：{{user.report.artSum | scoreFilter}}</el-breadcrumb-item>
                                <el-breadcrumb-item>资料数：</el-breadcrumb-item>
                                <el-breadcrumb-item>总访问量：{{user.report.readSum | scoreFilter}}</el-breadcrumb-item>
                                <el-breadcrumb-item>排名：</el-breadcrumb-item>
                                <el-breadcrumb-item>收藏数：{{user.report.followSum | scoreFilter}}</el-breadcrumb-item>
                            </el-breadcrumb> -->
                            <div>
                                <i style="font-size:30px;margin-top:20px;"
                                    class="el-icon-microphone"></i><span>{{user.baseInfo.userSign}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>
                <el-container style="height: auto; border: 1px solid #eee">
                    <el-aside width="300px" style="background-color: rgb(238, 241, 246);">
                        <el-row class="left fra">
                            <el-col :span="24">
                                <div class="grid-content bg-purple-dark">
                                    <el-button type="success" plain size="mini">全部：{{user.score.all | scoreFilter}}分</el-button>
                                    <el-button type="warning" plain size="mini">当月：{{user.score.thisMonth | scoreFilter}}分</el-button>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="left">
                            <el-col :span="24">
                                <div class="grid-content bg-purple-dark">
                                    <el-tag v-for="(tag,index) in user.tags" :key="index" :type="tag.labelType">{{tag.labelName}}</el-tag>
                                    <!-- <el-tag type="success">标签二</el-tag>
                                    <el-tag type="info">标签三</el-tag>
                                    <el-tag type="warning">标签四</el-tag>
                                    <el-tag type="danger">标签五</el-tag> -->
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="left">
                            <el-col :span="24">
                                <div class="grid-content bg-purple-dark">
                                    <Deg :articles="degArticles"></Deg>
                                </div>
                            </el-col>
                        </el-row>
                    </el-aside>
                    <el-container>
                        <MyArticle></MyArticle>
                    </el-container>
                </el-container>
            </el-row>
        </div>
    </div>
</template>

<script>
import MyArticle from './MyArticle.vue'
import Deg from './Deg.vue'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            userComment: {
                total: '60',

            },
            user: {
                baseInfo: {},
                report:{},
                score: {},
                tags: {}
            }
        }
    },
    components: {
        MyArticle,
        Deg
    },
    computed: {
        ...mapGetters('user',['getUser']),
        getTime(){
            let create = this.user.baseInfo.createTime + '';
            let year = create.substring(0,4);
            let month = create.substring(4,6);
            let day = create.substring(6,8);
            return year + '/' + month + '/' + day;
        },
        degArticles() {
            let articles = [
                {
                    id: '002',
                    title: '史上最全的JAVA语言模块（ModulGo1.19）',
                    content: 'go语言一直到1.10，都是使用GOPATH设置开始，引入了新的Go模块管理机制（go modules），不过一直到1.15，默认的模块管理方式仍然是GOPATH，直到Go1.16开始，将默认的模块管理方式改成了go modules，在这种工作模式下，每一个模块都必须使用go.mod文件指定模块的位置。',
                    updateTime: '2022-09-23',
                    leaels: '01,02,03',
                    readCount: '100',
                    giveCount: '23',
                    commentCount: '10'
                },
                {
                    id: '002',
                    title: '史上最全的JAVA语言模块（M理详解（基于Go1.19）',
                    content: 'go语言一直到1.10，都是使用GOPATH设但从1.11开始，引入了新的Go模块管理机制（go modules），不过一直到1.15，默认的模块管理方式仍然是GOPATH，直到Go1.16开始，将默认的模块管理方式改成了go modules，在这种工作模式下，每一个模块都必须使用go.mod文件指定模块的位置。',
                    updateTime: '2022-09-23',
                    leaels: '01,02,03',
                    readCount: '100',
                    giveCount: '23',
                    commentCount: '10'
                }
            ];
            articles.forEach(article => {
                if (article.title.length > 10) {
                    article.title = article.title.substr(0, 10) + '...';
                }
                if (article.content.length > 50) {
                    article.content = article.content.substr(0, 50) + '...';
                }
            })
            return articles;
        }
    },
    methods: {
        dump(path) {
            this.$router.push(path);
        },
        setBasic(){
            this.$http.get('/user/' + this.$route.query.id).then(res => {
                if(res.data.code === 2000){
                    this.user.baseInfo = res.data.records;
                }
            })
        },
        setReport(){
            // this.$http.get('/userArt/getReport/' + this.$route.query.id).then(res => {
            //     if(res.data.code === 2000){
            //         this.user.report = res.data.records;
            //     }
            // })
        },
        setUserScore(){
            this.$http.post('/user/score?userId=' + this.$route.query.id).then(res => {
                let score = res.data.records;
                this.user.score.all = score.all;
                this.user.score.thisMOnth = score.thisMonth;
            })
        },
        setTags(){
            this.$http.get('/user/getUserLabels/' + this.$route.query.id).then(res => {
                this.user.tags = res.data.records;
            })
        }
    },
    filters:{
      scoreFilter(val){
        if(val){
            return val;
        }else{
            return 0;
        }
      }  
    },
    mounted(){
        this.setBasic();
        this.setReport();
        this.setUserScore();
        this.setTags();
    }
}
</script>
<style lang="scss" scoped>
#box {
    width: 100%;
    height: 100%;
    background: url('../../assets/img/skin.gif') repeat #0a0a0a;
    margin: 0;
    padding: 0;

    #userHome {
        min-height: 800px;
        margin: 10px 200px auto 200px;
        padding: 0px;
    }
}

// #tags {
//     background-color: aliceblue;
// }

.el-header {
    // background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}

.el-aside {
    background-color: rgba(108, 118, 135, 1);
    color: #333;
    opacity: 0.5;

    .fra {
        margin-top: 10px;
    }

    .left {
        line-height: 50px;
    }
}

#head {
    height: 170px;
    background: #8393a5c9;

    #name {
        margin-left: 30px;
        font-size: 24px;
        font-family: "kaiti";
    }
}

.avatar {
    margin-top: 20px;
    margin-left: 50px;
}

#user-main {
    margin-top: 30px;
}

.el-tag {
    margin-top: 20px;
    margin-left: 10px;
}
</style>