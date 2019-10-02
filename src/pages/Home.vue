<template>
  <section>
    <main>
      <section class="search">
        <div class="search-input">
          <input
            v-model="userInput"
            class="input"
            placeholder="Filter by username"
            aria-label="Filter by username"
          />
          <font-awesome-icon
            icon="search"
            class="search-icon"
          />
        </div>
        <div class="search-actions">
          <button
            class="button"
            @click="loadRepos"
          >
            <font-awesome-icon
              :icon="['fab','github']"
              class="github-icon"
            />repos
          </button>
          <button
            class="button button--last"
            @click="loadStarred"
          >
            <font-awesome-icon
              icon="star"
              class="star-icon"
            />starred
          </button>
        </div>
      </section>
      <section class="user-card">{{ user.login }}</section>
      <section class="list">
        <p style="color: red;">{{ error }}</p>
        <h2>{{title}}</h2>
        <ul>
          <li
            v-for="(item, index) in itens"
            :key="index"
          >
            <div class="content">
              <span>{{ item.name }}</span>
              <p>{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      userInput: '',
      itens: [],
      title: '',
      loading: false,
      error: ''
    }
  },
  computed: {
    ...mapGetters({
      repos: 'repos/repos',
      starred: 'starred/starred',
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions({
      searchRepos: 'repos/searchRepos',
      searchStarred: 'starred/searchStarred',
      searchUser: 'user/searchUser'
    }),
    async loadRepos() {
      try {
        await this.searchUser(this.userInput)
        await this.searchRepos(this.userInput)
        this.itens = this.repos
        this.title = 'Repos'
        this.error = ''
      } catch ({ message }) {
        console.log(message)
        this.error = '😕 Ops, não foi possível encontrar dados. '
        this.itens = []
        this.title = ''
      }
    },
    async loadStarred() {
      try {
        await this.searchUser(this.userInput)
        await this.searchStarred(this.userInput)
        this.itens = this.starred
        this.title = 'Starred'
        this.error = ''
      } catch ({ message }) {
        console.log(message)
        this.error = '😕 Ops, não foi possível encontrar dados. '
        this.itens = []
        this.title = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  padding: 0.6em;

  .search {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0.8em;

    .search-input {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .search-icon {
      position: absolute;
      left: 1em;
    }

    .input {
      padding: 1em;
      padding-left: 3em;
      border-radius: 0.8em;
      background: #ffffff;
      border: none;
      font-size: 1rem;
      flex-grow: 1;

      &::-webkit-input-placeholder {
        color: #65737e;
      }

      &:-moz-placeholder {
        /* Firefox 18- */
        color: #65737e;
      }

      &::-moz-placeholder {
        /* Firefox 19+ */
        color: #65737e;
      }

      &:-ms-input-placeholder {
        color: #65737e;
      }

      &:hover,
      &:focus,
      &:active {
        outline: none;
        background: #ffffff;
      }
    }

    .button {
      min-width: 7em;
      font-size: 1em;
      background-color: $primary-color;
      border: 0;
      color: white;
      padding: 0.6em 1em;
      margin: 1em 0.6em 0.6em 0;
      cursor: pointer;
      border-radius: 0.4em;

      .star-icon,
      .github-icon {
        padding-right: 0.5em;
      }

      &:hover {
        filter: brightness(40%);
        transition: all 0.5s ease;
      }
    }
  }

  h2 {
    font-size: 0.8em;
    font-weight: bold;
    margin: 0.8em;
    text-transform: uppercase;
  }

  li {
    background-color: white;
    border-radius: 1em;
    padding: 0.8em;
    margin: 0.8em;
    box-shadow: $card-shadow;
    cursor: pointer;
    transition: 0.5s ease-out;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .content {
    padding: 0.6em;
    span {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      padding-bottom: 0.6em;
    }
  }
}

@media only screen and (min-width: 768px) {
  .list {
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    }
  }
}
</style>
