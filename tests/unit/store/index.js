import Vue from 'vue'
import Vuex from 'vuex'
import global from './global'
import repos from './modules/repos'
import starred from './modules/starred'
import user from './modules/user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  ...global,
  modules: {
    repos,
    starred,
    user
  }
})

export const clearStore = () => {
  store.dispatch('clear')
  store.dispatch('user/clearUser')
  store.dispatch('repos/clearRepos')
  store.dispatch('starred/clearStarred')
}
