<template>
    <div id="article">
        <el-empty :image-size="200" v-if="articles.length == 0"></el-empty>
        <div v-else id="articleList" v-for="(article, index) in articles" :key="index"
            @click="dump('/aticle/preview', article.id)">
            <el-row>
                <el-col :span="24">
                    <div class="ArticleTitle">
                        {{ article.articleName }}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="articleContent">
                        {{ article.articleContent | contentFilter }}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator="|" class="articleFoot">
                        <el-breadcrumb-item>发布时间{{ article.createTime | timeFilter }}</el-breadcrumb-item>
                        <el-breadcrumb-item>阅读量{{ article.readCount }}</el-breadcrumb-item>
                        <el-breadcrumb-item>得分{{ article.scoreCount }}</el-breadcrumb-item>
                        <el-breadcrumb-item>评论数{{ article.commCount }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-divider></el-divider>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    filters: {
        timeFilter(val) {
            return val.substring(0, 4) + '-' + val.substring(4, 6) + '-' + val.substring(6, 8) + ' '
                + val.substring(8, 10) + ':' + val.substring(10, 12) + ':' + val.substring(12, 14);
        },
        contentFilter(val) {
            val = val.replaceAll(':', '');
            val = val.replaceAll('#', '');
            val = val.replaceAll('hljs-center', '');
            return val.slice(0,600);
        }
    },
    methods: {
        dump(path, id) {
            this.$router.push({
                path: '/article/preview',
                query: { id }
            })
        }
    },
    props: {
        articles: {
            type: Array,
            default: ()=> {return []}
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