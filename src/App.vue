<template>
  <div id="nav">
    <router-link to="/" class="router-link"><i class="bi bi-house-door-fill"></i> Home</router-link> |
    <router-link to="/bot/add" class="router-link"><i class="bi bi-plus-square-fill"></i> Hinzufügen</router-link>
  </div>
    <router-view />
  
</template>

<script>
  export default {
    name: 'App',
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Botify'
    }
  }
  
</script>

<style>
  body {
    margin: 0 !important;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c2424;
    background-color: #fff;
    font-family: "Lucida Sans Typewriter", "Lucida Console", Monaco, "Bitstream Vera Sans Mono", monospace;
  }

#nav {
  padding: 20px;
  background: #674747;
  color: #EEEEEE;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: #EEEEEE;
}

.router-link.active {
  border-bottom: solid 1px #fff
}

.page-title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.logo {
  font-size: 28px;
}



@media only screen and (max-width: 1000px) {
  #nav {
    padding: 6%;

  }

  #nav a {
  font-size: 20px;
}

}
</style>
