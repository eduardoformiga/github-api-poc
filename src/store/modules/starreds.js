import axios from 'axios'

export default {
  namespaced: true,
  state: {
    starreds: []
  },
  getters: {
    starreds(state) {
      return state.starreds
    }
  },
  mutations: {
    setStarreds(state, payload) {
      state.starreds = payload
    }
  },
  actions: {
    async searchStarreds({ commit }) {
      await axios
        .get('https://api.github.com/users/eduardoformiga/starred')
        .then(result => commit('setStarreds', result.data))
        .catch(console.error)
    }
  }
}
