<template>
    <el-row class="contents" :gutter="20">
        <el-col :span="18">
            <div class="grid-content bg-purple">学而时习之，不亦说乎!</div>
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="文章" name="first">
                    <!-- <ArticleList :articles="articles"></ArticleList> -->
                </el-tab-pane>
                <el-tab-pane label="资源" name="second">
                    <!-- <ArticleList :articles="getHots"></ArticleList> -->
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">有朋自远方来！</div>
        </el-col>
    </el-row>

</template>

<script>
export default {
    data() {
        return {
            activeName:'first'
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