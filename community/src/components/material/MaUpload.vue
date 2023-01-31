<template>
    <div class="material">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form>
                        <el-form-item label="描述">
                            <el-input type="textarea" :rows="5" v-model="material.descr"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-upload class="upload-demo" drag action="" :http-request="handleUploadFile" multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleUploadFile(params) {
            const _file = params.file;
            const isLt2M = _file.size / 1024 / 1024 < 2000;

            if (_file) {
                let param = new FormData();
                param.append('files', _file);
                param.append('bizType', "file");
                // console.log(param.get('articleId'));
                if (!isLt2M) {
                    that.$message.error('请上传2G以下的文件')
                    return false
                }

                this.$http.post('file/upFile', param, { headers: { 'content-type': 'multipart/form-data' } }).then(res => {
                    if (res.data.code === 2000) {
                        this.material.fileId = res.data.records;
                        this.$http.post('/material/upload', this.material).then(res => {
                            this.$message.success({
                                message: res.data.msg,
                                offset: 70
                            })
                            this.$router.go(-1)
                        })
                    }
                    // this.$message.success({
                    //     message: res.data.msg,
                    //     offset: 70
                    // })
                })
            }
        },
    },
    data() {
        return {
            material: {
                descr: ''
            }
        };
    }
}
</script>
<style lang="scss">
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

.material {
    margin-top: 70px !important;
    margin-left: 500px !important;
    height: 400px;
}

.el-upload-list,
.el-upload-list--text {
    display: none;
}
</style>