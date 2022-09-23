<template>
    <div id="article">
        <div id="articleList" v-for="(article,index) in articles" :key="index">
            <el-row>
                <el-col :span="24">
                    <div class="ArticleTitle">
                        {{article.title}}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="articleContent">
                        {{article.content}}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator="|" class="articleFoot">
                        <el-breadcrumb-item>发布时间{{article.updateTime}}</el-breadcrumb-item>
                        <el-breadcrumb-item>阅读量{{article.readCount}}</el-breadcrumb-item>
                        <el-breadcrumb-item>点赞量{{article.giveCount}}</el-breadcrumb-item>
                        <el-breadcrumb-item>评论数{{article.commentCount}}</el-breadcrumb-item>
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
    props:['articles']
}
</script>

<style scoped lang="scss">
#article {
    #articleList {
        width: 972px;
        height: 167px;
        margin-left: 20px;
        .articleContent{
            color: #707376;
        }
    }
}
</style>