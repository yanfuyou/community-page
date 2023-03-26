<template>
    <div>
        <el-empty description="去找队友吧" :image-size="200" v-if="teamList.length == 0">
            <template v-slot:image>
                <img src="@/assets/img/empty/emptyTeam.png">
            </template>
        </el-empty>
        <el-collapse>
            <el-collapse-item v-model="activeName" accordion v-for="(team, index) in teamList" :key="index"
                :title="team.name" :name="index">
                <el-form ref="form" label-width="80px" size="medium">
                    <el-form-item label="赛事名称">
                        <el-input v-model="team.name" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="赛事链接">
                        <el-link v-if="team.url" type="success" :href="team.url" target="_blank">{{
                            team.url
                        }}</el-link>
                        <el-link v-else disable>暂无</el-link>
                    </el-form-item>
                    <el-form-item label="时间区间">
                        <el-col :span="11">
                            <el-date-picker v-model="team.startTime" value-format="yyyyMMddHHmmSS" type="datetime"
                                readonly>
                            </el-date-picker>
                        </el-col>
                        <el-col :span="11">
                            <el-date-picker v-model="team.endTime" value-format="yyyyMMddHHmmSS" type="datetime"
                                readonly>
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="队伍描述">
                        <el-input type="textarea" :rows="2" readonly v-model="team.descr">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所需人数">
                        <el-input-number v-model="team.num" :min="1" :max="10" label="所需人数"
                            :disabled="true"></el-input-number>
                    </el-form-item>
                    <el-form-item label="参与方式">
                        <el-radio-group v-model="team.online" size="medium">
                            <el-radio border label="1" disabled>线下</el-radio>
                            <el-radio border label="2" disabled>线上</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button @click="signUp(team)">我要报名</el-button>
                        <i v-if="getUser.id != null && getUser.id != ''" class="el-icon-warning-outline" title="举报"
                                                @click="handleAcc(team.id, 'team')"></i>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <div class="draw">
            <el-drawer title="提交报名!" :before-close="handleEnroll" :visible.sync="dialog" direction="rtl"
                custom-class="demo-drawer" ref="drawert">
                <div class="demo-drawer__content">
                    <el-form :model="teamUser">
                        <el-form-item label="姓名" :label-width="formLabelWidth">
                            <el-input v-model="teamUser.name"></el-input>
                        </el-form-item>
                        <el-form-item label="自我介绍" :label-width="formLabelWidth">
                            <el-input type="textarea" :rows="3" v-model="teamUser.intr"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" :label-width="formLabelWidth">
                            <el-input v-model="teamUser.contact" placeholder="如123123(自行注明是电话或者微信等)"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="demo-drawer__footer">
                        <el-button @click="cancelForm">取 消</el-button>
                        <el-button type="primary" @click="$refs.drawert.closeDrawer()" :loading="loading">{{
                            loading?
                        '提交中 ...'
                                : '确 定'
                        }}</el-button>
                    </div>
                </div>
            </el-drawer>
        </div>
        <el-drawer title="举报!" :before-close="doAcc" :visible.sync="accDialog" direction="rtl"
            custom-class="demo-drawer" ref="drawer">
            <div class="demo-drawer__content">
                <el-form :model="temp">
                    <el-form-item label="理由" label-width="80px">
                        <el-input type="textarea" :rows="3" v-model="temp.reason"></el-input>
                    </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="accDialog = false">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{
                        loading?
                    '提交中 ...'
                            : '确 定'
                    }}</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            activeName: '0',
            // 页码
            current: 1,
            teamList: [],
            // 抽屉数据
            table: false,
            dialog: false,
            loading: false,
            teamUser: {
                intr: '',
                contact: '',
                name: '',
                teamId: '',
                userId: ''
            },
            formLabelWidth: '80px',
            accDialog: false,
            temp: {
                relId: null,
                reason: null,
                bizType: null
            },
            loading: false
        };
    },
    computed: {
        ...mapGetters('user', ['getUser'])
    },
    methods: {
        signUp(team) {
            this.dialog = true;
            this.teamUser.teamId = team.id;
        },
        handleEnroll() {
            if (this.loading) {
                return;
            }
            this.$confirm('确定要提交报名吗？')
                .then(_ => {
                    this.loading = true;
                    // 执行提交操作
                    this.teamUser.userId = this.$store.getters['user/getUser'].id;
                    this.$http.post('/team/addRel', this.teamUser).then(res => {
                        if (res.data.code === 2000) {
                            this.$notify.success({
                                message: '报名成功',
                                offset: 70
                            })
                            this.loading = false;
                            this.dialog = false;
                        }
                    }).catch(err => {
                        this.loading = false;
                        console.log(err);
                    })
                }).catch(_ => { });
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
        },
        setTeamList() {
            let teamDto = {
                current: this.current,
                size: 15,
                queryParam: {
                    flag: 0
                }
            }
            this.$http.post('/team/list', teamDto).then(res => {
                if (res.data.code === 2000) {
                    this.teamList = res.data.records.records;
                    this.current = res.data.records.currend;
                }
            }).catch(err => {
                console.log(err);
            })
        },
        handleAcc(relId, bizType) {
            this.temp.relId = null
            this.temp.reason = null
            this.temp.bizType = null
            this.temp.relId = relId
            this.temp.bizType = bizType
            this.accDialog = true
        },
        doAcc() {
            if (this.loading) {
                return;
            }
            if(this.temp == ''){
                this.$message.warning({message:'理由不能为空',offset:70})
                return false;
            }
            this.$confirm('确定要举报吗？')
                .then(_ => {
                    this.loading = true;
                    this.$http.post('/accusation/add', this.temp).then(res => {
                        if (res.data.code === 2000) {
                            this.$message.success({
                                message: res.data.msg,
                                offset: 70
                            })
                            this.loading = false;
                            this.accDialog = false;
                        }
                    }).catch(err => {
                        this.loading = false;
                        console.log(err);
                    })
                }).catch(_ => { });
        }
    },
    created() {
        this.setTeamList();
    }
}
</script>

<style lang="scss" scoped>
.draw {
    .demo-drawer {
        padding-top: 70px;
    }

}
</style>