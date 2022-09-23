<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="最近" name="first">
            <!-- 截取一部分文章和资源 -->
            <ArticleList :articles="getLately"></ArticleList>
        </el-tab-pane>
        <el-tab-pane label="文章" name="second">
            <ArticleList :articles="articles"></ArticleList>
        </el-tab-pane>
        <el-tab-pane label="资源" name="third">
            <Sources :sources="sources"></Sources>
        </el-tab-pane>
        <el-tab-pane label="视频" name="fourth">定时任务补偿</el-tab-pane>
        <el-tab-pane label="收藏" name="five">
            <!-- 截取一部分文章 -->
            <ArticleList :articles="getColletions"></ArticleList>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import ArticleList from './ArticleList.vue'
import Sources from './Sources.vue'
export default {
    data() {
        return {
            activeName: 'second',
            articles: [
                {
                    id: '001',
                    title: '史上最全的Go语言模块（Module）管理详解（基于Go1.19）',
                    content: 'go语言一直到1.10，都是使用GOPATH设置模块搜索路径，但从1.11开始，引入了新的Go模块管理机制（go modules），不过一直到1.15，默认的模块管理方式仍然是GOPATH，直到Go1.16开始，将默认的模块管理方式改成了go modules，在这种工作模式下，每一个模块都必须使用go.mod文件指定模块的位置。',
                    updateTime: '2022-09-23',
                    leaels: '01,02,03',
                    readCount: '100',
                    giveCount: '23',
                    commentCount: '10'
                },
                {
                    id: '002',
                    title: '史上最全的JAVA语言模块（解（基于Go1.19）',
                    content: 'go语言一直到1.10，都是使用GOPATH设索路径，但从1.11开始，引入了新的Go模块管理机制（go modules），不过一直到1.15，默认的模块管理方式仍然是GOPATH，直到Go1.16开始，将默认的模块管理方式改成了go modules，在这种工作模式下，每一个模块都必须使用go.mod文件指定模块的位置。',
                    updateTime: '2022-09-23',
                    leaels: '01,02,03',
                    readCount: '100',
                    giveCount: '23',
                    commentCount: '10'
                },
                {
                    id: '002',
                    title: '史上最全的JAVA语言于Go1.19）',
                    content: 'go语言一直到1.10，都是使用GOPATH设置模块搜索路径，但从1.1（go modules），不过一直到1.15，默认的模块管理方式仍然是GOPATH，直到Go1.16开始，将默认的模块管理方式改成了go modules，在这种工作模式下，每一个模块都必须使用go.mod文件指定模块的位置。',
                    updateTime: '2022-09-23',
                    leaels: '01,02,03',
                    readCount: '100',
                    giveCount: '23',
                    commentCount: '10'
                },
                {
                    id: '002',
                    title: '史上最全的JAVA语言模块（Modu.19）',
                    content: 'go语言一直到1.10，都是使搜索路径，但从1.11开始，引入了新的Go模块管理机制（go modules），不过一直到1.15，默认的模块管理方式仍然是GOPATH，直到Go1.16开始，将默认的模块管理方式改成了go modules，在这种工作模式下，每一个模块都必须使用go.mod文件指定模块的位置。',
                    updateTime: '2022-09-23',
                    leaels: '01,02,03',
                    readCount: '100',
                    giveCount: '23',
                    commentCount: '10'
                },
                {
                    id: '002',
                    title: '史上最全的JAVA语言模块（Modulo1.19）',
                    content: 'go语言一直到1.10，都是使11开始，引入了新的Go模块管理机制（go modules），不过一直到1.15，默认的模块管理方式仍然是GOPATH，直到Go1.16开始，将默认的模块管理方式改成了go modules，在这种工作模式下，每一个模块都必须使用go.mod文件指定模块的位置。',
                    updateTime: '2022-09-23',
                    leaels: '01,02,03',
                    readCount: '100',
                    giveCount: '23',
                    commentCount: '10'
                },
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
            ],
            sources:[
                {
                    id:'001',
                    name:'一个小小的资源',
                    content:'一段小小小小小的源代码',
                    downPath:'暂留，应该不需要的',
                    siurceSuffix:'pdf',
                    downCount:'1000',
                    updateTime:'2022-29-01',
                    giveCount:'100'
                },
                {
                    id:'002',
                    name:'java教.xlsx',
                    content:'java永远滴神',
                    downPath:'暂留，应该不需要的',
                    siurceSuffix:'pdf',
                    downCount:'1000',
                    updateTime:'2022-29-01',
                    giveCount:'100'
                }
            ]
        };
    },
    computed:{
        getLately(){
            let latelys = [];
            latelys.push(this.articles[0]);
            latelys.push(this.articles[4]);
            latelys.push(this.articles[2]);
            return latelys;
        },
        getColletions(){
            let collections = [];
            collections.push(this.articles[3]);
            collections.push(this.articles[4]);
            collections.push(this.articles[2]);
            return collections;
        }
    },
    components: {
        ArticleList,
        Sources
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
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