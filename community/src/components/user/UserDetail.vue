<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-avatar shape="square" :size="100" :src="squareUrl"></el-avatar>
                <el-descriptions class="margin-top" :column="2" :size="size" border>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            用户名
                        </template>
                        kooriookami
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            bc
                        </template>
                        18100000000
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            居住地
                        </template>
                        苏州市
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            备注
                        </template>
                        <el-tag size="small">学校</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            联系地址
                        </template>
                        江苏省苏州市吴中区吴中大道 1188 号
                    </el-descriptions-item>
                </el-descriptions>
                </el-col>
            </el-row>
    </div>
</template>

<script>
export default {

    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            sizeList: ["large", "medium", "small"],
            size: ''
        };
    },

    mounted() {

    },

    methods: {

    },
};

</script>

<style scoped>
/* .el-tag{
    display: inline-block;
} */
</style>