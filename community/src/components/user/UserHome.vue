<template>
    <div id="box">
        <div id="userHome">
            <el-row id="head">
                <el-col :span="4">
                    <div class="block avatar">
                        <el-avatar :size="100" :src="circleUrl"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="20">
                    <el-row id="user-main">
                        <el-col :span="24">
                            <div id="name">
                                <span>鄢富友</span>
                                <i class="el-icon-time">一年</i>
                                <i style="float:right;margin-right:80px;" class="el-icon-setting" title="设置"></i>


                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-breadcrumb separator="|" style="color:#2b426e !important;">
                                <el-breadcrumb-item>文章数</el-breadcrumb-item>
                                <el-breadcrumb-item>资料数</el-breadcrumb-item>
                                <el-breadcrumb-item>总访问量</el-breadcrumb-item>
                                <el-breadcrumb-item>排名</el-breadcrumb-item>
                                <el-breadcrumb-item>收藏数</el-breadcrumb-item>
                            </el-breadcrumb>
                            <div>
                                <i style="font-size:30px;margin-top:20px;"
                                    class="el-icon-microphone"></i><span>签名</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row>

            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            userComment: {
                total: '60',

            }
        }
    }
}
</script>
<style lang="scss" scoped>
#box {
    width: 100%;
    height: 100%;
    background: url('../../assets/img/skin.gif') repeat #0a0a0a;
    margin: 0;
    padding: 0;

    #userHome {
        height: 800px;
        margin: 50px 300px auto 300px;
    }
}

#head {
    height: 200px;
    background: #8393a5c9;

    #name {
        margin-left: 30px;
        font-size: 24px;
        font-family: "kaiti";
    }
}

.avatar {
    margin-top: 20px;
    margin-left: 50px;
}

#user-main {
    margin-top: 30px;
}

.el-tag {
    margin-top: 20px;
}
</style>