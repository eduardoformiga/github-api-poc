const state = {
  preference: ''
}

const getters = {
  preference(state) {
    return state.preference
  }
}

const mutations = {
  setPreference(state, payload) {
    state.preference = payload
  },
  clear(state) {
    state.preference = ''
  }
}

const actions = {
  async setPreference({ commit }, payload) {
    commit('setPreference', payload)
  },
  clear({ commit }) {
    commit('clear')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
