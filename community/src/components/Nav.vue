<template>
  <div style="height:60px" id="top">
    <div id="head">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item id="tag" index="0">
          <el-button class="button-new-tag" size="small" @click="dump('/index')">交流社区</el-button>
        </el-menu-item>
        <el-menu-item index="1" @click="dump('/index')">首页</el-menu-item>
        <el-menu-item index="2" @click="dump('/focus/focusPage')">聚焦</el-menu-item>
        <el-menu-item v-if="handlePermission('/hole/tree')" index="5" @click="dump('/hole/tree')">嗨！树洞</el-menu-item>
        <el-menu-item id="search">
          <el-input placeholder="请输入内容" v-model="searchVal" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-menu-item>
        <el-menu-item id="user" v-if="getUser.loginFlag == false">
          <el-button type="success" plain @click="dump('/user/signup')">注册</el-button>
          <el-button type="primary" plain @click="dump('/user/login')">登录</el-button>
        </el-menu-item>
        <el-menu-item id="user" v-else>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar :src="getUser.userAvatar"></el-avatar>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-bell" v-if="handlePermission('/user/userhome')"
                  @click.native="dump('/user/userhome?id=' + getUser.id)">主页</el-dropdown-item>
                <el-dropdown-item v-if="handlePermission('/user/setting')" icon="el-icon-setting"
                  @click.native="dump('/user/setting')">设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid"><span @click="pwdDialog = true">修改密码</span></el-dropdown-item>
                <el-dropdown-item icon="el-icon-user-solid"><span @click="logout">退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <i v-if="handlePermission('/article/write')" class="el-icon-edit write"><span
                @click="dump('/article/write')">写文章</span></i>
            <i v-if="handlePermission('/team/enlist')" class="el-icon-medal-1 write"><span
                @click="dump('/team/enlist')">找队员</span></i>
            <i v-if="handlePermission('/material/upload')" class="el-icon-receiving write"><span
                @click="dump('/material/upload')">传资料</span></i>
          </div>
        </el-menu-item>
      </el-menu>
    </div>
    <el-dialog title="修改密码" :visible.sync="pwdDialog" style="height: 550px;">
      <el-form :model="pwdDto">
        <el-form-item label="旧密码" label-width="120px">
          <el-input type="password" v-model="pwdDto.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="120px">
          <el-input type="password" v-model="pwdDto.newPwd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pwdDialog = false">取 消</el-button>
        <el-button type="primary" @click="changePwd">确 定</el-button>
      </div>
    </el-dialog>
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
      },
      pwdDto: {
        userId: '',
        oldPwd: '',
        newPwd: ''
      },
      pwdDialog: false
    };
  },
  computed: {
    ...mapGetters('user', ['getUser', 'getPermissions'])
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    search() {
      // console.log( this.searchVal)

      this.$router.push({
        path: '/focus/focusPage',
        query: { searchVal: this.searchVal }
      });
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
      window.localStorage.removeItem("Bearer");
      this.dump('/index');
    },
    handlePermission(path) {
      // 页面权限判断
      if (this.getPermissions && this.getPermissions.length > 0) {
        return this.getPermissions.includes(path)
      } else {
        return false
      }
    },
    changePwd(){
      this.pwdDto.userId = this.getUser.id;
      if(this.pwdDto.oldPwd == '' || this.pwdDto.newPwd == ''){
        this.$message.warning({message:'请检查输入项',offset:70});
        return false;
      }
      this.$http.post('/user/changePwd',this.pwdDto).then(res => {
        if(res.data.code === 2000){
          this.$message.success({message:'修改成功',offset:70});
          this.pwdDialog = false;
        }else{
          this.$message.warning({message:'修改成功',offset:70});
        }
      })
    }
  }
};
</script>
<!-- 原本没有scoped 因为.el-button--primary加的 -->
<style scoped>
.el-badge {
  margin-bottom: 0px;
}

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
  margin-left: 40px;
}

.write {
  margin-left: 30px;
  padding-left: 20px;
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
}</style>
