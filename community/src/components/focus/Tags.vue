<template>
    <el-collapse class="tags" v-model="activeNames">
        <el-collapse-item title="请选择主题标签" name="1">
            <!-- 需要阻止tag的默认行为 -->
            <el-checkbox v-for="tag in systemTags" :key="tag.id" @click.native="addCheck($event,tag.id)"><el-tag :type="tag.labelType">{{ tag.labelName }}</el-tag></el-checkbox>
        </el-collapse-item>
    </el-collapse>
</template>
<script>
export default {
    data() {
        return {
            activeNames: ['1'],
            systemTags: [],
            myCheck: []
        }
    },
    methods: {
        setTags() {
            let dto = {
                flag: '0'
            }
            this.$http.post('/sys/label/getSysLabels', dto).then(res => {
                if (res.data.code == 2000) {
                    this.systemTags = res.data.records;
                }
            })
        },
        addCheck(e,id){
            if(e.target.tagName !== 'INPUT'){
                return
            }
            // 如果数组已经包含表示需要移除
            if(this.myCheck.indexOf(id) != -1){
                this.myCheck.splice(this.myCheck.indexOf(id),1)
            }else{
                this.myCheck.push(id);
            }
            this.$store.dispatch('focus/setCheckedTags',this.myCheck);
        }
    },
    created() {
        this.setTags();
    }
}
</script>

<style lang="scss" scoped>
.tags {
    margin: 20px 200px;
}
</style>