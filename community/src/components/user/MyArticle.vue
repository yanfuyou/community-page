<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="最热" name="first">
            <!-- 截取一部分文章和资源 -->
            <ArticleList :articles="getLately"></ArticleList>
        </el-tab-pane>
        <el-tab-pane label="文章" name="second">
            <ArticleList :articles="getArticles"></ArticleList>
        </el-tab-pane>
        <el-tab-pane label="资源" name="third">
            <Sources :sources="sources"></Sources>
        </el-tab-pane>
        <el-tab-pane label="队伍" name="fourth">
            <my-team></my-team>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="five">
            <!-- 截取一部分文章 -->
            <ArticleList :articles="getColletions"></ArticleList>
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
            sources: [
                {
                    id: '001',
                    name: '一个小小的资源',
                    content: '一段小小小小小的源代码',
                    downPath: '暂留，应该不需要的',
                    siurceSuffix: 'pdf',
                    downCount: '1000',
                    updateTime: '2022-29-01',
                    giveCount: '100'
                },
                {
                    id: '002',
                    name: 'java教.xlsx',
                    content: 'java永远滴神',
                    downPath: '暂留，应该不需要的',
                    siurceSuffix: 'pdf',
                    downCount: '1000',
                    updateTime: '2022-29-01',
                    giveCount: '100'
                }
            ]
        };
    },
    computed: {
        getLately() {
            // 需要使用深拷贝赋值
            let latelys = JSON.parse(JSON.stringify(this.articles));
            if (latelys.length > 0) {
                // 按阅读量排序
                for(let i = 0; i < latelys.length; i++){
                    for(let j = 0; j < latelys.length - i - 1; j++){
                        if(latelys[j].readCount < latelys[j + 1].readCount){
                            const temp = latelys[j];
                            latelys[j] = latelys[j+1];
                            latelys[j+1] = temp;
                        }
                    }
                }
            }
            return latelys;
        },
        getColletions() {
            let collections = [];
            if (this.articles.length > 0) {
                collections.push(this.articles[3]);
                collections.push(this.articles[4]);
                collections.push(this.articles[2]);
            }
            return collections;
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
            })
        }
    },
    created() {
        this.setArticles();
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