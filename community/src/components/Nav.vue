<template>
  <div style="height:60px" id="top">
    <div id="head">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item id="tag" index="0">
          <el-button class="button-new-tag" size="small" @click="dump('/index')">交流社区</el-button>
        </el-menu-item>
        <el-menu-item index="1" @click="dump('/index')">首页</el-menu-item>
        <el-menu-item index="2">聚焦</el-menu-item>
        <el-menu-item index="3">兴趣</el-menu-item>
        <el-submenu index="4">
          <template slot="title">学习</template>
          <el-menu-item index="4-1">文学</el-menu-item>
          <el-menu-item index="4-2">理学</el-menu-item>
          <el-menu-item index="4-3">工学</el-menu-item>
        </el-submenu>
        <el-menu-item index="5" @click="dump('/article/preview')">消息中心</el-menu-item>
        <el-menu-item id="search">
          <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select">
            <el-select v-model="type" slot="prepend" placeholder="请选择">
              <el-option label="全部" value="1"></el-option>
              <el-option label="餐厅名" value="2"></el-option>
              <el-option label="订单号" value="3"></el-option>
              <el-option label="用户电话" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-menu-item>
        <el-menu-item id="user" v-if="getUser.loginFlag == false">
          <el-button type="success" plain @click="dump('/user/signup')">注册</el-button>
          <el-button type="primary" plain @click="dump('/user/login')">登录</el-button>
        </el-menu-item>
        <el-menu-item id="user" v-else>
          <div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar :src="avatar.src"></el-avatar>
              </span>
              <i class="el-icon-edit write"><span @click="dump('/article/write')">写文章</span></i>
              <el-dropdown-menu slot="dropdown">
                <el-badge :value="2" class="item" type="warning">
                  <el-dropdown-item icon="el-icon-bell">消息</el-dropdown-item>
                </el-badge>
                <!-- <el-dropdown-item icon="el-icon-bell">消息</el-dropdown-item> -->
                <el-dropdown-item icon="el-icon-circle-plus">收藏</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid"><span @click="logout">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      searchVal: '',
      type: '全部',
      avatar: {
        flag: false,
        src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
      }
    };
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {
      console.log("类别：", this.type, "值：", this.searchVal)
    },
    dump(path) {
      this.$router.push(path);
    },
    logout() {
      let user = {
        id: '',
        userName: '',
        userAlias: '',
        loginFlag: false
      }
      this.$store.commit('user/setUser', user);
    }
  },
};
</script>

<style>
#head {
  width: 100%;
  /* 固定导航栏 */
  position: fixed;
  z-index: 9999;
}

#top {
  width: 100%;
}

#search {
  width: 500px;
  margin-left: 400px;
}

.write {
  margin-left: 30px;
}

.el-select .el-input {
  width: 130px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-button--primary {
  margin-left: 0 !important;
}

#user {
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}

.item {
  margin-top: 5px;
  margin-right: 5px;
}

#tag {
  margin-left: 110px;
}
</style>
