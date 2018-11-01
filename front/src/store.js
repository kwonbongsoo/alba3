import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const api_url = "http://127.0.0.1:3000/";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    progress: false,
  },
  getters: {
    progress: function(state) {
      return state.progress
    },
  },
  mutations: {
    progress: (state, progress) => {
      state.progress = progress
    },
  },
  actions: {
    l_site: (context, params) => {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'site/l_site',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data);
        })
      })
    },
  }
})