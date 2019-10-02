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
      <section
        v-if="!hasUser"
        class="errors"
      >
        <p style="color: red;">{{ errorMessage }}</p>
      </section>
      <section
        v-if="hasUser"
        class="results"
      >
        <h2>{{userTitle}}</h2>
        <section class="user-card">
          <img
            class="user-card--avatar"
            :src="user.avatar_url"
            alt="Avatar da conta do Github"
          />
          <div class="user-card--content">
            <h1>{{ user.name }}</h1>
            <p>
              <span>Login:</span>
              {{ user.login }}
            </p>
          </div>
        </section>
        <h2>{{listTitle}}</h2>
        <section class="list">
          <ul>
            <li
              v-for="(item, index) in itens"
              :key="index"
            >
              <div class="content">
                <h1>{{ item.name }}</h1>
                <p>{{ item.description }}</p>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </main>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { ErrorHandler } from '../helpers/ErrorHandler'

export default {
  name: 'Home',
  data() {
    return {
      userInput: 'programadorabordo',
      itens: [],
      listTitle: '',
      userTitle: '',
      loading: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      repos: 'repos/repos',
      starred: 'starred/starred',
      user: 'user/user'
    }),
    hasUser() {
      return !!this.user
    }
  },
  methods: {
    ...mapActions({
      searchRepos: 'repos/searchRepos',
      searchStarred: 'starred/searchStarred',
      searchUser: 'user/searchUser',
      clearUser: 'user/clearUser'
    }),
    async loadRepos() {
      try {
        this.clearUser()
        await this.searchUser(this.userInput)
        await this.searchRepos(this.userInput)
        this.itens = this.repos
        this.listTitle = 'Repos'
        this.userTitle = 'User'
        this.errorMessage = ''
      } catch (e) {
        this.handleError(e)
      }
    },
    async loadStarred() {
      try {
        this.clearUser()
        await this.searchUser(this.userInput)
        await this.searchStarred(this.userInput)
        this.itens = this.starred
        this.listTitle = 'Starred'
        this.userTitle = 'User'
        this.errorMessage = ''
      } catch (e) {
        this.handleError(e)
      }
    },
    handleError(e) {
      const errorHandler = new ErrorHandler(e)
      this.errorMessage = errorHandler.handleMessage()
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

  .user-card {
    display: grid;
    grid-template-columns: 100px auto;
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

    .user-card--avatar {
      width: 100%;
      border-radius: 50%;
    }

    .user-card--content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 0.5em;

      h1 {
        font-weight: bold;
      }
      p {
        font-size: 0.8rem;

        span {
          font-weight: bold;
        }
      }
    }
  }

  h2 {
    font-size: 0.8em;
    font-weight: bold;
    margin: 1.2em 0.8em 0.8em;
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
