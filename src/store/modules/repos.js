import axios from 'axios'

export default {
  namespaced: true,
  state: {
    repos: []
  },
  getters: {
    repos(state) {
      return state.repos
    }
  },
  mutations: {
    setRepos(state, payload) {
      state.repos = payload
    }
  },
  actions: {
    async searchRepos({ commit }) {
      await axios
        .get('https://api.github.com/users/eduardoformiga/repos')
        .then(result => commit('setRepos', result.data))
        .catch(console.error)
    }
  }
}
