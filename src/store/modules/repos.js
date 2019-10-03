import { getReposByUser } from '../../services/github.services'

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
  async searchRepos({ commit, dispatch }, user) {
    const result = await getReposByUser(user)
    commit('setRepos', result.data)
    dispatch('setPreference', 'repos', { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
