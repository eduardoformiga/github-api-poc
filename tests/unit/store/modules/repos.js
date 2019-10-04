import { getReposByUser } from '../../mocks/github.mock.services'

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
  },
  clearRepos(state) {
    state.repos = []
  }
}

const actions = {
  async searchRepos({ commit, dispatch }, user) {
    const result = await getReposByUser(user)
    commit('setRepos', result)
    dispatch('setPreference', 'repos', { root: true })
  },
  clearRepos({ commit }) {
    commit('clearRepos')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
