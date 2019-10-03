import axios from 'axios'

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
  }
}

const actions = {
  async searchStarred({ commit, dispatch }, user) {
    const result = await axios.get(
      `https://api.github.com/users/${user}/starred`
    )
    commit('setStarred', result.data)
    dispatch('setPreference', 'starred', { root: true })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
