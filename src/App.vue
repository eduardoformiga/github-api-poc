<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="container__navbar">
          <router-link to="/">{{ localeLabel('title') }}</router-link>
        </div>
        <div class="container__hero">
          <div>{{ localeLabel('subTitle') }}</div>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
import messages from './helpers/messages'

export default {
  methods: {
    localeLabel(param) {
      const _base = 'app'
      return messages[_base][param]
    }
  }
}
</script>

<style lang="scss">
#app {
  background-color: $background-color;
  min-height: 100vh;
  font-family: Helvetica, Arial, sans-serif;
}

header {
  background: $primary-color;
  padding: 2em 0 1em 0;
  text-align: center;

  .container {
    margin: 0 auto;
    width: 90%;

    .container__navbar {
      display: flex;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;

      a {
        color: $white;
        text-decoration: none;
      }
    }

    .container__hero {
      background-color: $primary-color;
      color: $white;
      text-align: center;
      padding: 1.5em 0;
    }
  }
}

@media only screen and (min-width: 768px) {
  body {
    font-size: 1.2 rem;
  }
}
</style>
