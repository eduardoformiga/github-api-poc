import { toLocaleString } from '../../helpers/date.helper'
import { getUserProfile } from '../../services/github.services'

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
    state.user = {
      ...payload,
      updated_at: toLocaleString(payload.updated_at, 'pt-br'),
      created_at: toLocaleString(payload.created_at, 'pt-br')
    }
  },
  clearUser(state) {
    state.user = null
  }
}

const actions = {
  async searchUser({ commit }, user) {
    const result = await getUserProfile(user)
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
