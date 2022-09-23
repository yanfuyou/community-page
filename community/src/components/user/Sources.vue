<template>
    <div id="article">
        <div id="articleList" v-for="(source,index) in sources" :key="index">
            <el-row>
                <el-col :span="24">
                    <div class="ArticleTitle">
                        <el-tag effect="plain">资源描述</el-tag>{{source.content}}
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="articleContent">
                        <el-tag effect="plain">资源名称</el-tag>{{source.name}}
                        <el-button type="info" round style="margin-left:20px;" size="small">下载</el-button>
                        <el-button type="danger" round size="small" v-if="1 == 1" >删除</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator="|" class="articleFoot">
                        <el-breadcrumb-item>发布时间{{source.updateTime}}</el-breadcrumb-item>
                        <el-breadcrumb-item>下载{{source.downCount}}</el-breadcrumb-item>
                        <el-breadcrumb-item>点赞量{{source.giveCount}}</el-breadcrumb-item>
                        <el-breadcrumb-item>类型{{source.siurceSuffix}}</el-breadcrumb-item>
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
    props: ['sources']
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