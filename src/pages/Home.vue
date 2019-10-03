<template>
  <section>
    <main>
      <section class="search">
        <div class="search__container">
          <input
            v-model="userInput"
            class="search__input"
            :placeholder="localeLabel('input')"
            :aria-label="localeLabel('input')"
          />
          <font-awesome-icon
            icon="search"
            class="search__icon"
          />
        </div>
        <div class="search__actions">
          <button
            class="search__button"
            @click="loadRepos"
          >
            <font-awesome-icon
              :icon="['fab','github']"
              class="search__button--icon"
            />
            {{localeLabel('repos')}}
          </button>
          <button
            class="search__button"
            @click="loadStarred"
          >
            <font-awesome-icon
              icon="star"
              class="search__button--icon"
            />
            {{localeLabel('starred')}}
          </button>
        </div>
      </section>
      <section
        v-if="hasError"
        class="errors"
      >
        <p>{{ errorHandler.handleMessage() }}</p>
      </section>
      <section
        v-if="hasUser"
        class="results"
      >
        <h2>{{localeLabel('user')}}</h2>
        <section
          class="user-card"
          @click="redirectDetailsPage"
        >
          <img
            class="user-card__avatar"
            :src="user.avatar_url"
            :alt="localeLabel('imgAlt')"
          />
          <div class="user-card__content">
            <h1>{{ user.name }}</h1>
            <p>
              <span>{{localeLabel('login')}}</span>
              {{ user.login }}
            </p>
          </div>
        </section>
        <h2>{{ preference }}</h2>
        <section>
          <ul class="results__list">
            <li
              v-for="(item, index) in itens"
              :key="index"
            >
              <div class="results__item">
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
import messages from '../helpers/messages'

export default {
  name: 'Home',
  data() {
    return {
      userInput: '',
      itens: [],
      errorHandler: null
    }
  },
  computed: {
    ...mapGetters({
      repos: 'repos/repos',
      starred: 'starred/starred',
      user: 'user/user',
      preference: 'preference'
    }),
    hasUser() {
      return !!this.user
    },
    hasError() {
      return !!this.errorHandler
    }
  },
  mounted() {
    this.getPreferences()
  },
  methods: {
    ...mapActions({
      searchRepos: 'repos/searchRepos',
      searchStarred: 'starred/searchStarred',
      searchUser: 'user/searchUser',
      clearUser: 'user/clearUser'
    }),
    localeLabel(param) {
      const _base = 'home'
      return messages[_base][param]
    },
    async loadRepos() {
      try {
        this.clearUser()
        await this.searchUser(this.userInput)
        await this.searchRepos(this.userInput)
        this.itens = this.repos
        this.errorHandler = null
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
        this.errorHandler = null
      } catch (e) {
        this.handleError(e)
      }
    },
    handleError(e) {
      this.errorHandler = new ErrorHandler(e)
    },
    redirectDetailsPage() {
      this.$router.push({ path: `/details` })
    },
    getPreferences() {
      this.itens =
        this.preference === 'repos'
          ? this.repos
          : this.preference === 'starred'
          ? this.starred
          : []
      this.userInput = this.user && this.user.login ? this.user.login : ''
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

    .search__container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .search__icon {
      position: absolute;
      left: 1em;
    }

    .search__input {
      padding: 1em;
      padding-left: 3em;
      border-radius: 0.8em;
      background: $white;
      border: none;
      font-size: 1rem;
      flex-grow: 1;

      &::-webkit-input-placeholder {
        color: $placeholder-color;
      }

      &:-moz-placeholder {
        /* Firefox 18- */
        color: $placeholder-color;
      }

      &::-moz-placeholder {
        /* Firefox 19+ */
        color: $placeholder-color;
      }

      &:-ms-input-placeholder {
        color: $placeholder-color;
      }

      &:hover,
      &:focus,
      &:active {
        outline: none;
        background: $white;
      }
    }

    .search__button {
      min-width: 7em;
      font-size: 1em;
      background-color: $primary-color;
      border: 0;
      color: $white;
      padding: 0.6em 1em;
      margin: 1em 0.6em 0.6em 0;
      cursor: pointer;
      border-radius: 0.4em;

      .search__button--icon {
        padding-right: 0.5em;
      }

      &:hover {
        filter: brightness(40%);
        transition: all 0.5s ease;
      }
    }
  }

  .errors {
    font-size: 1rem;
    font-weight: bold;
    color: $error-color;
    background-color: $white;
    border-radius: 1em;
    padding: 0.8em;
    margin: 0.8em;
    box-shadow: $card-shadow;
  }

  .user-card {
    display: grid;
    grid-template-columns: 100px auto;
    background-color: $white;
    border-radius: 1em;
    padding: 0.8em;
    margin: 0.8em;
    box-shadow: $card-shadow;
    cursor: pointer;
    transition: 0.5s ease-out;

    &:hover {
      transform: translateY(-5px);
    }

    .user-card__avatar {
      width: 100%;
      border-radius: 50%;
    }

    .user-card__content {
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
    background-color: $white;
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

  .results__item {
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
  .results__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  }
}
</style>
