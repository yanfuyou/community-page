<template>
    <div id="footer">
        <el-footer>&copy;&nbsp;&nbsp;yanfuyou</el-footer>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 9999;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
  