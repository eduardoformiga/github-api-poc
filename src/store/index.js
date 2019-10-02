import Vue from 'vue'
import Vuex from 'vuex'
import repos from './modules/repos'
import starred from './modules/starred'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    repos,
    starred
  }
})
