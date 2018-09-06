<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <a href="/table">跳转路由</a> -->
    <router-link class="router2" to='/table'><h1><a href="#">跳转路由</a></h1></router-link>

    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '主界面在/table路由下'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
