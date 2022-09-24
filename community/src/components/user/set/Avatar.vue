<template>
    <div class="avatar">
        <el-row>
            <el-col :span="3">
                <!-- <div class="block avatar">
                    <el-avatar :size="100" :src="circleUrl"></el-avatar>
                </div> -->
                <div class="avatar-upload">
                    <el-upload action="#" list-type="picture-card" :auto-upload="true" :show-file-list="false">
                        <i slot="default" class="el-icon-upload2"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                    @click="handleDownload(file)">
                                    <i class="el-icon-download"></i>
                                </span>
                                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </div>
            </el-col>
            <el-col :span="21">
                <el-row id="user-main">
                    <el-col :span="24">
                        <div id="name">
                            <i class="el-icon-user">用户名：<span>鄢富友</span></i>
                        </div>
                    </el-col>
                </el-row>
                <el-row id="user-main">
                    <el-col :span="24">
                        <div id="name">
                            <i class="el-icon-time">社龄：<span>一年</span></i>
                        </div>
                    </el-col>
                </el-row>
                <el-row id="user-main">
                    <el-col :span="24">
                        <div id="name">
                            <i class="el-icon-s-promotion">联系方式<span>鄢富友</span></i>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
        }
    },
    methods: {
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        }
    }
}
</script>

<style scoped>
#name {
    margin-top: 5px;
}

#user-main {
    margin-bottom: 10px;
}

.avatar {
    margin-left: 40px;
}

.el-upload--picture-card {
    /* width: 200px;
    height: 200px; */
    border: 0;
}

.avatar-upload {
    width: 50%;
    height: auto;
    background-image: url('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
    text-align: center;
    background-position: center;
}
</style>