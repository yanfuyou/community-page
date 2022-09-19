<template>
    <div id="out">
        <el-container id="one-con">
            <el-aside width="400px">
                <UserDetail></UserDetail>
            </el-aside>
            <el-container>
                <el-main>
                    <el-row :gutter="10">
                        <el-col :span="6">
                            <el-input type="text" placeholder="请输入主题" v-model="title" maxlength="20" show-word-limit>
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-select v-model="value1" multiple placeholder="请选择标签">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="10">
                            <span v-if="true" class="fileClass">下载附件<i class="el-icon-delete-solid"></i></span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <mavon-editor :subfield="false" :editable="false" :toolbarsFlag="false"
                                defaultOpen="preview" :shortCut="false" v-model="value" ref="md" class="mavonWrite">
                            </mavon-editor>
                        </el-col>
                    </el-row>
                </el-main>
                <!-- <el-footer>Footer</el-footer> -->
            </el-container>
        </el-container>
    </div>
</template>

<script>
import UserDetail from '../user/UserDetail.vue'
export default {
    data() {
        return {
            value: '::: hljs-center\n\n# 文本\n\n:::\n',
            title: '',
            value1: '',
            options: []
        }
    },
    components: {
        UserDetail
    }
}
</script>

<style>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

#out {
    height: 98%;
}

#one-con {
    height: 100%;
}
</style>