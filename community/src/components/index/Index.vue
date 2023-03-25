<template>
    <div id="index">
        <el-row :gutter="20">
            <el-col :span="13">
                <i class="el-icon-tickets type"><span>头条</span></i>
            </el-col>
            <el-col :span="5">
                <el-col :span="13">
                    <i class="el-icon-document type"><span>资料</span></i>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="13">
                    <i class="el-icon-video-camera type"><span>视频</span></i>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="one">
            <el-col :span="8" class="one">
                <Car></Car>
            </el-col>
            <el-col :span="5" class="one">
                <Hot></Hot>
            </el-col>
            <el-col :span="5" class="one">
                <HeadLine :head-mas="headMas"></HeadLine>
            </el-col>
            <el-col :span="6" class="one">
                <el-empty description="管理员暂未发布" :image-size="200" v-if="sources.length == 0">
                    <template v-slot:image>
                        <img src="@/assets/img/empty/emptyVideo.png">
                    </template>
                </el-empty>
                <el-carousel :autoplay="false" height="250px">
                    <el-carousel-item v-for="(video, index) in videos" :key="index">
                        <video height="250px" controls object-fit="contain" :src="video.visitPath"></video>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="最新" name="first">
                        <ArticleList :articles="articles"></ArticleList>
                    </el-tab-pane>
                    <el-tab-pane label="热榜" name="second">
                        <ArticleList :articles="getHots"></ArticleList>
                    </el-tab-pane>
                    <el-tab-pane label="高效" name="third">
                        <!-- 资料内容 -->
                        <Sources :sources="sources"></Sources>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="平台推荐" name="fourth">
                        <ArticleList></ArticleList>
                    </el-tab-pane> -->
                </el-tabs>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple team">
                    <i class="el-icon-document type"><span>队伍招募</span></i>
                    <!-- 引入队伍列表 -->
                    <TeamList></TeamList>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <i class="el-icon-user type"><span>活跃用户</span></i>
                    <!-- 导入用户信息 -->
                    <UserList :users="users"></UserList>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// 跑马灯
import Car from './Car.vue'
// 热搜列表
import Hot from './Hot.vue'
// 头条列表
import HeadLine from './HeadLIne.vue'
// 文章列表
import ArticleList from '@/components/user/ArticleList'
// 资料列表
import Sources from '@/components/user/Sources'
// 队伍列表
import TeamList from '@/components/team/TeamList.vue'
// 用户列表
import UserList from '@/components/index/UserList.vue'
export default {
    data() {
        return {
            activeName: 'first',
            articles: [],
            hots: [],
            sources: [],
            users: [],
            videos: [],
            headMas: []
        }
    },
    components: {
        Car,
        Hot,
        HeadLine,
        ArticleList,
        Sources,
        TeamList,
        UserList
    },
    computed: {
        getHots() {
            // 需要使用深拷贝赋值
            let latelys = JSON.parse(JSON.stringify(this.articles));
            if (latelys.length > 0) {
                // 按阅读量排序
                for (let i = 0; i < latelys.length; i++) {
                    for (let j = 0; j < latelys.length - i - 1; j++) {
                        if (latelys[j].readCount < latelys[j + 1].readCount) {
                            const temp = latelys[j];
                            latelys[j] = latelys[j + 1];
                            latelys[j + 1] = temp;
                        }
                    }
                }
            }
            return latelys;
        },
    },
    methods: {
        setArticles() {
            let dto = {
                current: 1,
                size: 30,
                flag: '0',
                orders: [
                    {
                        asc: false,
                        column: 'CREATE_TIME'
                    }
                ]
            }
            this.$http.post('article/miniList', dto).then(res => {
                this.articles = res.data.records.records;
            })
        },
        setSources() {
            let maDto = {
                current: 1,
                size: 30,
                orders: [
                    {
                        asc: true,
                        column: 'DOWNLOAD_NUM'
                    }
                ],
                queryParam: {
                    flag: '0'
                }
            }
            this.$http.post('/material/list', maDto).then(res => {
                if (res.data.code === 2000) {
                    this.sources = res.data.records.records;
                }
            })
        },
        setUsers() {
            let dto = {
                current: 1,
                orders: [
                    {
                        asc: false,
                        column: "commentCount"
                    }
                ],
                queryParam: {
                    flag: 0
                },
                size: 6
            }
            this.$http.post('/user/userMini', dto).then(res => {
                if (res.data.code === 2000) {
                    this.users = res.data.records.records;
                }
            })
        },
        setVideos() {
            let dto = {
                current: 1,
                size: 10,
                orders: [
                    {
                        asc: true,
                        column: 'CREATE_TIME'
                    }
                ],
                queryParam: {
                    flag: '0',
                    bizType: 'video'
                }
            }
            this.$http.post('/file/videoList', dto).then(res => {
                if (res.data.code === 2000) {
                    this.videos = res.data.records.records;
                }
            })
        },
        setHeadMas() {
            let dto = {
                current: 1,
                size: 4,
                orders: [
                    {
                        asc: true,
                        column: 'CREATE_TIME'
                    }
                ],
                queryParam: {
                    flag: '0'
                }
            }
            this.$http.post('/material/list', dto).then(res => {
                // console.log(res.data);
                if (res.data.code === 2000) {
                    this.headMas = res.data.records.records;
                }
            })
        }
    },
    created() {
        this.setArticles();
        this.setSources();
        this.setUsers();
        this.setVideos();
        this.setHeadMas();
    }
}
</script>

<style lang="scss">
#index {
    margin: 30px 20px auto 20px;
}

.type {
    font-size: 20px;
    margin-left: 20px;

    span {
        margin-left: 10px;
    }
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

.one {
    height: 300px;
}

.team {
    border: black dashed 1px;
    background: none;
}
</style>
