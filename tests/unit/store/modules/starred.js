import { getStarredByUser } from '../../mocks/github.mock.services'

const state = {
  starred: []
}

const getters = {
  starred(state) {
    return state.starred
  }
}

const mutations = {
  setStarred(state, payload) {
    state.starred = payload
  },
  clearStarred(state) {
    state.starred = []
  }
}

const actions = {
  async searchStarred({ commit, dispatch }, user) {
    const result = await getStarredByUser(user)
    commit('setStarred', result)
    dispatch('setPreference', 'starred', { root: true })
  },
  clearStarred({ commit }) {
    commit('clearStarred')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
