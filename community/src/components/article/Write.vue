<template>
    <div id="write">
        <el-row :gutter="50">
            <el-col :span="6">
                <el-input type="text" placeholder="请输入主题" v-model="title" maxlength="20" show-word-limit>
                </el-input>
            </el-col>
            <el-col :span="8">
                <el-select v-model="value1" multiple placeholder="请选择标签" class="sel">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="4">
                <el-button round @click="out">存草稿</el-button>
                <el-button round @click="out">发布</el-button>
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
export default {
    data() {
        return {
            value: '# 文本',
            title: '',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value1: [],
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
    methods: {
        out() {
            console.log(this.value);
        },
        $imgAdd(pos, $file) {
            // 图片上传接口
            const imageData = new FormData();
            imageData.append("img", $file);
            this.$http.post('/file/upload', imageData).then(res => {
                console.log(res);
                this.$refs.md.$img2Url(pos, res.data.records.visitPath);
            }).catch(error => {
                console.log(error);
                alert("系统异常");
            })
        }
    }
}
</script>
<style lang="scss">
.el-col {
    .el-input--suffix,.el-select__tags {
        width: 220% !important;
    }
}
#write{
    // margin-top: 20px;
    // padding-top: 20px;
    // position: fixed;
}
</style>