<template>
    <div>
        <el-table :data="tableData" border style="width: 100%;text-align:center;">
            <el-table-column fixed prop="endTime" label="截止日期" nin-width="100">
                <template slot-scope="scope">
                    {{ scope.row.endTime | timeFilter }}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" nin-width="120">
            </el-table-column>
            <el-table-column prop="descr" label="简介" nin-width="120">
            </el-table-column>
            <el-table-column prop="num" label="所需人数" nin-width="120">
            </el-table-column>
            <el-table-column prop="enNum" label="已报名人数" nin-width="300">
            </el-table-column>
            <el-table-column prop="online" label="参赛方式" nin-width="300">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.online == 1">线上</el-tag>
                    <el-tag type="warning" v-else>线下</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" nin-width="100">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.createBy == getUserName" @click="handleClick(scope.row)" type="text"
                        size="small">查看</el-button>
                    <el-button v-else @click="quitTeam(scope.row.relId)" type="text" size="small">退出</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
            <el-table :data="teamer">
                <el-table-column property="name" label="姓名" min-width="150"></el-table-column>
                <el-table-column property="intr" label="自我介绍" min-width="200"></el-table-column>
                <el-table-column property="contact" label="联系方式"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    methods: {
        handleClick(row) {
            this.dialogTableVisible = true
            this.$http.get('/team/getTeamer/' + row.teamId).then(res => {
                // console.log(res.data.records);
                this.teamer = res.data.records;
            })
        },
        setTableData() {
            this.$http.get('/user/' + this.$route.query.id).then(userRes => {
                if (userRes.data.code === 2000) {
                    this.$http.get('/team/getMyTeam/' + userRes.data.records.id).then(res => {
                        // console.log(res.data);
                        this.tableData = res.data.records;
                    })
                }
            })

        },
        quitTeam(id) {
            this.$http.get('/team/delRel/' + id).then(res => {
                this.$notify({
                    message: res.data.msg,
                    offset: 70
                })
                this.setTableData();
            }).catch(err => {
                console.log(err);
            })
        }
    },
    filters: {
        timeFilter(val) {
            return val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8) + ' ' + val.slice(8, 10) + ':' + val.slice(10, 12) + ':' + val.slice(12, 14);
        }
    },
    created() {
        this.setTableData();
    },
    computed: {
        getUserName() {
            return this.$store.getters['user/getUser'].userName;
        }
    },
    data() {
        return {
            tableData: [],
            teamer: [],
            dialogTableVisible: false
        }
    }
}
</script>