<template>
    <div class="taste">
        <el-row>
            <el-col :span="24">
                <el-divider>
                    <el-button round class="my-tag">我的标签</el-button>
                </el-divider>
                <el-tag v-for="(tag, index) in myTags" :key="index" closable :type="tag.type" @close="removeMyTag(tag)">
                    {{tag.name}}
                </el-tag>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-divider>
                    <el-button round>系统标签</el-button>
                </el-divider>
                <el-tag v-for="(tag, index) in systemTags | getDiff" :key="index" :disable-transitions="false" :type="tag.type"
                    @click="addMyTags(tag)">
                    {{tag.name}}
                </el-tag>
                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                    @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-col>
        </el-row>
    </div>
</template>


<style lang="scss">
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
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

.my-tag {
    background-color: #e5eef8;
}

.button-new-tag {
    margin-left: 10px !important;
}
</style>

<script>

export default {
    data() {
        return {
            myTags: [
                // { name: '标签一', type: '' },
                // { name: '标签二', type: 'success' },
                // { name: '标签三', type: 'info' },
                // { name: '标签四', type: 'warning' },
                // { name: '标签五', type: 'danger' }
            ],
            systemTags: [
                { name: '测试的', type: '' },
                { name: '到底', type: 'success' },
                { name: '懂三', type: 'info' },
                { name: '签的四', type: 'warning' },
                { name: '咚咚咚五', type: 'danger' },
                { name: '标签一', type: '' },
                { name: '标签二', type: 'success' },
                { name: '标签三', type: 'info' },
                { name: '标签四', type: 'warning' },
                { name: '标签五', type: 'danger' }
            ],
            inputVisible: false,
            inputValue: ''
        };
    },
    methods: {
        removeMyTag(tag) {
            this.systemTags.push(tag);
            this.myTags.splice(this.myTags.indexOf(tag), 1);
        },
        addMyTags(tag) {
            this.systemTags.splice(this.systemTags.indexOf(tag), 1);
            this.myTags.push(tag);
        },
        // handleClose(tag) {
        //     this.systemTags.splice(this.systemTags.indexOf(tag), 1);
        // },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let tagType = ['', 'success', 'info', 'warning', 'danger'];
            let index = Math.round(Math.random() * 4);
            let inputValue = this.inputValue;
            let tag = {
                name: this.inputValue,
                type: tagType[index]
            }
            if (inputValue) {
                this.systemTags.push(tag);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },
    filters:{
        getDiff(value){
            this.myTags.forEach(item => {
                value.forEach(tag => {
                    if(item.name == tag.name){
                        value.splice(value.indexOf(tag),1);
                    }
                })
            })
            return value;
        }
    }
}
</script>