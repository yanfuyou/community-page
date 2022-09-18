<template>
  <div id="app">
    <Nav></Nav>
    <Body></Body>
    <Foot></Foot>
  </div>
</template>

<script>
import Nav from './components/Nav';
import Body from './components/Body'
import Foot from './components/Foot'
export default {
  name: 'App',
  components: {
    Nav,
    Body,
    Foot
  },
  mounted(){
    // this.$http.get('/user/user/0d9516e0ce31487aaeef3190eaff4ce1').then(res => console.log(res));
    // console.log(this.$store.state.user.userName);
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('user')) {
      this.$store.commit('user/setUser',JSON.parse(sessionStorage.getItem('user')))
    }

    // 页面刷新时，将vuex里的信息保存到sessionStorage
    // 在页面刷新时先触发beforeunload事件
    window.addEventListener('beforeunload', () => {
      const user = this.$store.state.user.user;
      sessionStorage.setItem('user', JSON.stringify(user))
    })
  }
}
</script>
