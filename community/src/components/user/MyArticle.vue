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
        <el-tab-pane label="队伍" name="fourth" v-if="getUser.id == currentUserId">
            <my-team></my-team>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="five">
            <ArticleList :articles="collects"></ArticleList>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import ArticleList from './ArticleList.vue'
import Sources from './Sources.vue'
import MyTeam from '@/components/user/MyTeam.vue'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            activeName: 'second',
            articles: [],
            sources: [],
            collects: [],
            currentUserId: ''
        };
    },
    computed: {
        ...mapGetters('user',['getUser']),
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
        setArticles(page) {
            let dto = {
                current: page,
                size: 30,
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
                this.articles = this.articles.concat(res.data.records.records);
                this.childFlag = true;
            })
        },
        setSources() {
            // 获取用户名
            this.$http.get('/user/' + this.$route.query.id).then(userRes => {
                if (userRes.data.code === 2000) {
                    this.$http.get('/material/myMaterial/' + userRes.data.records.userName + '/0').then(res => {
                        this.sources = res.data.records;
                    })
                }
            })

        },
        setCollects(page) {
            let dto = {
                current: page,
                size: 30,
                queryParam: {
                    userId: this.$route.query.id,
                    flag: '0'
                }
            }
            this.$http.post('/collect/page', dto).then(res => {
                if (res.data.code === 2000) {
                    this.collects = this.collects.concat(res.data.records.records);
                }
            })
        }
    },
    created() {
        let firstPage = 1;
        this.setArticles(firstPage);
        this.setSources();
        this.setCollects(firstPage);
        this.currentUserId = this.$route.query.id;
        // 触底刷新
        let lastTime = 0;
        window.onscroll = ()=>{
            // 窗口实际高度
            let windowH = document.documentElement.scrollHeight;
            // 元素在屏幕上的可见区域高度
            let documentH = document.documentElement.clientHeight;
            // 获取或设置元素内容的垂直滚动像素数
            let scrollH = document.documentElement.scrollTop;
            if(documentH + scrollH + 5 >= windowH){
                let now = Date.now()
                let nextPage = firstPage++
                // 下一批数据加载需要在十秒之后
                if(now - lastTime > 10 * 1000){
                    console.log('获取新数据');
                    this.setArticles(nextPage);
                    this.setCollects(nextPage);
                    lastTime = now;
                }
            }
        }
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