<template>
    <div id="write">
        <el-row :gutter="30">
            <el-col :span="6">
                <el-input type="text" placeholder="请输入主题" v-model="title" maxlength="20" show-word-limit>
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-select v-model="labels" multiple placeholder="请选择标签" class="sel">
                    <el-option v-for="item in sysLabels" :key="item.id" :label="item.labelName" :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-upload class="upload-demo" action="upload" :show-file-list="false" :http-request="handleUploadFile"
                    ref="upload" :auto-upload="false" :on-change="handleChange">
                    <el-button size="small" type="primary">附件</el-button>
                </el-upload>
                <!-- 需要做修改 -->
                <span v-if="true" class="fileClass">{{encl.fileName}}</span>
            </el-col>
            <el-col :span="4">
                <!-- <el-button round @click="out">存草稿</el-button> -->
                <el-button round @click="release">发布</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <!-- 预览页面 -->
                <!-- <mavon-editor @imgAdd="$imgAdd" :subfield="false" defaultOpen="preview" :shortCut="false" :toolbars="toolbars" v-model="value" ref="md" class="mavonWrite"></mavon-editor> -->
                <mavon-editor @imgAdd="$imgAdd" :shortCut="false" :toolbars="toolbars" v-model="value" ref="md"
                    class="mavonWrite"></mavon-editor>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
    data() {
        return {
            id: '',
            value: '# 请输入内容',
            title: '',
            encl: {
                id: '',
                fileName: '',
                visitPath: ''
            },
            enclFlag: '0',
            sysLabels: [],
            labels: [],
            cover: '',
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: false, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            }
        }
    },
    watch: {
        labels(newVal, oldVal) {
            console.log(newVal.length);
            if (newVal.length == 5) {
                this.$alert('不能超过五个哦', {
                    confirmButtonText: '确定'
                })
            }
        }
    },
    methods: {
        out() {
            console.log(this.fileList)
            console.log(this.value);
        },
        $imgAdd(pos, $file) {
            // 图片上传接口
            const imageData = new FormData();
            imageData.append("img", $file);
            this.$http.post('/file/upload', imageData).then(res => {
                this.$refs.md.$img2Url(pos, res.data.records.visitPath);
                this.cover = res.data.records.visitPath;
            })
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleUploadFile(params) {
            const _file = params.file;
            const isLt2M = _file.size / 1024 / 1024 < 200;

            if (_file) {
                let param = new FormData();
                param.append('files', _file);
                param.append('bizType', "enclosure");
                param.append('articleId', this.id);
                // console.log(param.get('articleId'));
                if (!isLt2M) {
                    that.$message.error('请上传20M以下的文件')
                    return false
                }

                this.$http.post('file/upFile', param, { headers: { 'content-type': 'multipart/form-data' } }).then(res => {
                    this.$message.success(res.data.msg)
                })
            }
        },
        handleChange(file, fileList) {
            fileList.length = 0;
            fileList.push(file);
            if(fileList.length != 0){
                this.enclFlag = '1'
            }else{
                this.enclFlag = '0'
            }
            this.encl.fileName = fileList[0].name;
        },
        release() {
            if (this.title == null || this.title == "") {
                this.$notify.warning({
                    message: "请输入主题",
                    offset: 70
                })
                return false;
            }
            // 组装标签
            if (this.labels.length == 0) {
                this.$notify.warning({
                    message: "请选择标签",
                    offset: 70
                })
                return false;
            }
            let aLabels = '';
            this.labels.forEach(lab => {
                aLabels += "," + lab;
            })
            this.id = nanoid(30);
            console.log('附件' + this.enclFlag);
            let articleInfo = {
                id: this.id,
                articleName: this.title,
                articleContent: this.value,
                articleLabels: aLabels,
                enclosure: this.enclFlag
            }
            this.submitUpload();
            if (this.cover != '') {
                let articleCover = {
                    articleId: this.id,
                    coverPath: this.cover
                }
                this.$http.post('/article/addCover', articleCover)
            }
            // 先检查是否含有禁用词
            this.$http.post('/sensitive/checkStr',{"sourceStr": articleInfo.articleContent}).then(res => {
                if(res.data.code === 2000 && res.data.records.length > 0){
                    let words = '';
                    res.data.records.forEach(wordObj => {
                        words = words + wordObj.word;
                    })
                    this.$notify({
                        title: '请文明用语',
                        message: words,
                        type: 'warning',
                        offset: 70
                    });
                }else{
                    this.$http.post('/article/release', articleInfo).then(res => {
                        if(res.data.code === 2000){
                            this.$message.success({
                                message: '发布成功',
                                offset: 70
                            })
                            this.$router.go(-1);
                        }
                    });
                }
            });
        }
    },
    created() {
        let labels = [];
        let dto = {
            flag: '0'
        }
        this.$http.post('/sys/label/getSysLabels', dto).then(res => {
            if (res.data.code == 2000) {
                let records = res.data.records;
                records.forEach(label => {
                    let la = {
                        id: label.id,
                        labelName: label.labelName
                    }
                    labels.push(la);
                })
            }
        })
        this.sysLabels = labels;
    }
}
</script>
<style lang="scss">
.el-col {

    .el-input--suffix,
    .el-select__tags {
        width: 170% !important;
    }

    .upload-demo {
        display: inline;
    }

    .el-upload {
        display: inline;
    }

    .fileClass {
        margin-left: 10px;
    }

    i {
        margin-left: 5px;
    }
}

#write {
    margin: 20px 40px auto 40px;
}

.el-message-box {
    z-index: 9999 !important;
}
</style>