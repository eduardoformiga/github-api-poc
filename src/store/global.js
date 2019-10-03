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
  }
}

const actions = {
  async setPreference({ commit }, payload) {
    commit('setPreference', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
