<template>
    <div id="article">
        <div id="articleList" v-for="(article,index) in articles" :key="index">
            <el-row>
                <el-col :span="24">
                    <div class="ArticleTitle article-left">
                        {{article.title}}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="articleContent article-left">
                        {{article.content}}
                    </div>
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
        margin-left: 10px;
        line-height: 20px;
        .articleContent{
            color: #707376;
        }
    }
}
</style>