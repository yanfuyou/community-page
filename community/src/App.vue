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
  }
}
</script>
