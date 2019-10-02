import axios from 'axios'

const state = {
  user: {
    login: ''
  }
}

const getters = {
  user(state) {
    return state.user
  }
}

const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

const actions = {
  async searchUser({ commit }, user) {
    const result = await axios.get(`https://api.github.com/users/${user}`)
    commit('setUser', result.data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
