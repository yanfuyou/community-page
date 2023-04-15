<template>
    <el-row class="contents" :gutter="20">
        <el-col :span="18">
            <div class="grid-content bg-purple">学而时习之，不亦说乎!</div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="文章" name="first">
                    <ArticleList :articles="articles"></ArticleList>
                </el-tab-pane>
                <el-tab-pane label="资源" name="second">
                    <Sources :sources="sources"></Sources>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">有朋自远方来！</div>
            <UserList :users="users"></UserList>
        </el-col>
    </el-row>

</template>

<script>
import { mapGetters } from 'vuex'
import ArticleList from '@/components/user/ArticleList.vue'
import Sources from '@/components/user/Sources.vue'
import UserList from '@/components/index/UserList.vue'
export default {
    created() {
        this.searchVal = this.$route.query.searchVal;
        this.setUsers();
        // 触底刷新
        let firstPage = 1;
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
                // 下一批数据加载需要在十秒之后
                if(now - lastTime > 10 * 1000){
                    console.log('获取新数据');
                    if(firstPage == 1){
                        this.articles = [];
                        this.sources = [];
                    }
                    let nextPage = firstPage++;
                    let dto = {
                        current: nextPage,
                        size: 30,
                        queryParam: {
                            labelForSearch: this.checkedTags,
                            articleContent: this.searchVal
                        }
                    }
                        // 设置文章
                    this.$http.post('/article/search', dto).then(res => {
                        if (res.data.code === 2000) {
                            this.articles = this.articles.concat(res.data.records.records);
                            this.articles = this.articles.filter((obj,index) => this.articles.findIndex(item => item.id === obj.id) === index );
                        }
                    })
                    // 设置资源
                    let maDto = {
                        current: nextPage,
                        size: 30,
                        queryParam: {
                            flag: '0',
                            descr: this.searchVal
                        }
                    }
                    this.$http.post('/material/list', maDto).then(res => {
                        if (res.data.code === 2000) {
                            this.sources = this.sources.concat(res.data.records.records);
                            this.sources = this.sources.filter((obj,index) => this.sources.findIndex(item => item.id === obj.id) === index );
                        }
                    })
                    lastTime = now;
                }
            }
        }
    },
    methods: {
        setUsers() {
            let dto = {
                current: 1,
                orders: [
                    {
                        asc: false,
                        column: "articleCount"
                    }
                ],
                queryParam: {
                    flag: 0
                },
                size: 10
            }
            this.$http.post('/user/userMini',dto).then(res => {
                if(res.data.code === 2000){
                    this.users = res.data.records.records;
                }
            })
        }
    },
    data() {
        return {
            activeName: 'first',
            checkedTags: [],
            articles: [],
            sources: [],
            searchVal: '',
            users: []
        }
    },
    components: {
        ArticleList,
        Sources,
        UserList
    },
    computed: {
        ...mapGetters('focus', ['getCheckedTags']),
        getSearchVal() {
            return this.$route.query.searchVal;
        }
    },
    watch: {
        'getCheckedTags': {
            handler(val) {
                this.checkedTags = val;
                let dto = {
                    current: 1,
                    size: 30,
                    queryParam: {
                        labelForSearch: this.checkedTags,
                        articleContent: this.searchVal
                    }
                }
                // 设置文章
                this.$http.post('/article/search', dto).then(res => {
                    if (res.data.code === 2000) {
                        this.articles = res.data.records.records;
                    }
                })
                // 设置资源
                let maDto = {
                    current: 1,
                    size: 30,
                    queryParam: {
                        flag: '0',
                        descr: this.searchVal
                    }
                }
                this.$http.post('/material/list', maDto).then(res => {
                    if (res.data.code === 2000) {
                        this.sources = res.data.records.records;
                    }
                })

            },
            deep: true,
            immediate: true
        },
        'getSearchVal': {
            handler(val) {
                this.searchVal = val;
                // console.log(this.searchVal);
                let dto = {
                    current: 1,
                    size: 30,
                    queryParam: {
                        labelForSearch: this.checkedTags,
                        articleContent: this.searchVal
                    }
                }
                // 设置文章
                this.$http.post('/article/search', dto).then(res => {
                    if (res.data.code === 2000) {
                        this.articles = res.data.records.records;
                    }
                })
                // 设置资源
                let maDto = {
                    current: 1,
                    size: 30,
                    queryParam: {
                        flag: '0',
                        descr: this.searchVal
                    }
                }
                this.$http.post('/material/list', maDto).then(res => {
                    if (res.data.code === 2000) {
                        this.sources = res.data.records.records;
                    }
                })

            },
            deep: true,
            immediate: true
        },
        activeName(val) {
            this.$store.commit('focus/setActiveName', val);
        }
    }
}
</script>

<style lang="scss" scoped>
.el-row {
    // margin-bottom: 20px;

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
    text-align: center;
    font-family: "STLiti";
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.contents {
    margin: 10px 150px !important;
}
</style>