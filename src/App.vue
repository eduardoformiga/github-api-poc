<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="navbar">
          <router-link
            to="/"
            class="logo"
          >Github View</router-link>
        </div>
        <div class="hero">
          <div class="subtitle">Bem vindo ao Github view! 👋 Procure o que cada usuário está fazendo</div>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

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

    .navbar {
      display: flex;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;

      a {
        color: white;
        text-decoration: none;
      }
    }

    .hero {
      background-color: $primary-color;
      color: white;
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
