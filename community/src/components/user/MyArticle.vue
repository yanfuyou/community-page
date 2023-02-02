<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="最热" name="first">
            <!-- 截取一部分文章和资源 -->
            <ArticleList :articles="getLately"></ArticleList>
        </el-tab-pane>
        <el-tab-pane label="文章" name="second">
            <ArticleList :articles="articles"></ArticleList>
        </el-tab-pane>
        <el-tab-pane label="资源" name="third">
            <Sources :sources="sources"></Sources>
        </el-tab-pane>
        <el-tab-pane label="队伍" name="fourth">
            <my-team></my-team>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="five">
            <!-- 截取一部分文章 -->
            <ArticleList :articles="collects"></ArticleList>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import ArticleList from './ArticleList.vue'
import Sources from './Sources.vue'
import MyTeam from '@/components/user/MyTeam.vue'
export default {
    data() {
        return {
            activeName: 'second',
            articles: [],
            sources: [],
            collects: []
        };
    },
    computed: {
        getLately() {
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
        getArticles() {
            return this.articles;
        }
    },
    components: {
        ArticleList,
        Sources,
        MyTeam
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        setArticles() {
            let dto = {
                current: 1,
                size: 20,
                flag: '0',
                userId: this.$route.query.id,
                orders: [
                    {
                        asc: false,
                        column: 'CREATE_TIME'
                    }
                ]
            }
            this.$http.post('article/miniList', dto).then(res => {
                this.articles = res.data.records.records;
                this.childFlag = true;
            })
        },
        setSources() {
            // 获取用户名
            this.$http.get('/user/' + this.$route.query.id).then(userRes => {
                if (userRes.data.code === 2000) {
                    this.$http.get('/material/myMaterial/' + userRes.data.records.id + '/0').then(res => {
                        this.sources = res.data.records;
                    })
                }
            })

        },
        setCollects() {
            let dto = {
                current: 1,
                size: 1000,
                queryParam: {
                    userId: this.$route.query.id,
                    flag: '0'
                }
            }
            this.$http.post('/collect/page', dto).then(res => {
                if (res.data.code === 2000) {
                    this.collects = res.data.records.records;
                }
            })
        }
    },
    created() {
        this.setArticles();
        this.setSources();
        this.setCollects();
    }
};
</script>

<style scoped>
.el-tabs {
    width: 100%;
}

.el-tabs {
    background-color: aliceblue !important;
}
</style>