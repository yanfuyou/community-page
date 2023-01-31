<template>
    <div id="article">
        <el-empty :image-size="200" v-if="sources.length == 0"></el-empty>
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
                        <el-button type="info" round style="margin-left:20px;" size="small" @click="download(source.visitPath,source.fileName)">下载</el-button>
                        <el-button type="danger" round size="small" @click="remove(source.id)">删除</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator="|" class="articleFoot">
                        <el-breadcrumb-item>发布时间{{source.updateTime}}</el-breadcrumb-item>
                        <el-breadcrumb-item>下载量{{source.downCount}}</el-breadcrumb-item>
                        <!-- <el-breadcrumb-item>点赞量{{source.giveCount}}</el-breadcrumb-item> -->
                        <!-- <el-breadcrumb-item>类型{{source.siurceSuffix}}</el-breadcrumb-item> -->
                    </el-breadcrumb>
                    <el-divider></el-divider>
                </el-col>
            </el-row>
        </div>
        
    </div>
</template>

<script>
export default {
    created(){
        // console.log(this.sources);
    },
    methods:{
        download(url,fileName){
            this.$down.myDownLoad(url,fileName);
        },
        remove(id){
            this.$http.get('/material/remove/' + id).then(res => {
                // console.log(res.data);
                this.$forceUpdate();
            })
        }
    },
    data() {
        return {
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