import Vue from 'vue'
import Vuex from 'vuex'
import repos from './modules/repos'
import starreds from './modules/starreds'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    repos,
    starreds
  }
})
