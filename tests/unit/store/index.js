import Vue from 'vue'
import Vuex from 'vuex'
import global from './global'
import repos from './modules/repos'
import starred from './modules/starred'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  ...global,
  modules: {
    repos,
    starred,
    user
  }
})
