<template>
    <div id="index">
        <el-row :gutter="20">
            <el-col :span="13">
                <i class="el-icon-tickets type"><span>头条</span></i>
            </el-col>
            <el-col :span="5">
                <el-col :span="13">
                    <i class="el-icon-document type"><span>资料</span></i>
                </el-col>
            </el-col>
            <el-col :span="6">
                <el-col :span="13">
                    <i class="el-icon-video-camera type"><span>视频</span></i>
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="one">
            <el-col :span="8" class="one">
                <Car></Car>
            </el-col>
            <el-col :span="5" class="one">
                <Hot></Hot>
            </el-col>
            <el-col :span="5" class="one">
                <HeadLine></HeadLine>
            </el-col>
            <el-col :span="6" class="one">
                <!-- <div class="grid-content bg-purple">广告</div> -->
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// 跑马灯
import Car from './Car.vue'
// 热搜列表
import Hot from './Hot.vue'
// 头条列表
import HeadLine from './HeadLIne.vue'
export default {
    data() {
        return {}
    },
    components: {
        Car,
        Hot,
        HeadLine
    }
}
</script>

<style lang="scss">
#index {
    margin: 30px 20px auto 20px;
}

.type {
    font-size: 20px;
    margin-left: 20px;

    span {
        margin-left: 10px;
    }
}

.el-row {
    margin-bottom: 20px;

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
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}

.one {
    height: 300px;
}
</style>
  