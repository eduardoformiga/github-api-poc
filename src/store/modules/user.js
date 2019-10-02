import axios from 'axios'

const state = {
  user: null
}

const getters = {
  user(state) {
    return state.user
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  clearUser(state) {
    state.user = null
  }
}

const actions = {
  async searchUser({ commit }, user) {
    const result = await axios.get(`https://api.github.com/users/${user}`)
    commit('setUser', result.data)
  },
  clearUser({ commit }) {
    commit('clearUser')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
