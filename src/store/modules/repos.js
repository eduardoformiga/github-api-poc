import axios from 'axios'

const state = {
  repos: []
}

const getters = {
  repos(state) {
    return state.repos
  }
}

const mutations = {
  setRepos(state, payload) {
    state.repos = payload
  }
}

const actions = {
  async searchRepos({ commit }, user) {
    const result = await axios.get(`https://api.github.com/users/${user}/repos`)
    commit('setRepos', result.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
