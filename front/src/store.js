import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const api_url = "http://13.125.241.78:3000/";
// const api_url = "http://127.0.0.1:3000/";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    progress: false,
    dialog: {
      title: '',
      desc: '',
      dialog: false
    },
    d_site: {
      imgOriName: '',
      no: '',
    },
    sites: [],
    site_detail: {
      icon_name: '',
      icon_url: '',
      new_browser_yn: '',
      no: 0,
      site_name: '',
      site_url: '',
    },
    site_add_btn: false,
    header_title: '',
    login_info: {
      id: '',
      password: '',
      is_login: false
    },
  },
  getters: {
    progress: function(state) {
      return state.progress;
    },
    dialog: function(state) {
      return state.dialog;
    },
    d_site: function(state) {
      return state.d_site;
    },
    sites: function(state) {
      return state.sites;
    },
    site_detail: function(state) {
      return state.site_detail;
    },
    site_add_btn: function(state) {
      return state.site_add_btn;
    },
    header_title: function(state) {
      return state.header_title;
    },
    login_info: function(state) {
      return state.login_info;
    },
  },
  mutations: {
    progress: (state, progress) => {
      state.progress = progress;
    },
    dialog: (state, dialog) => {
      state.dialog = dialog;
    },
    d_site: (state, d_site) => {
      state.d_site = d_site;
    },
    sites: (state, sites) => {
      state.sites = sites;
    },
    site_detail: (state, site_detail) => {
      state.site_detail = site_detail;
    },
    site_add_btn: (state, site_add_btn) => {
      state.site_add_btn = site_add_btn;
    },
    header_title: (state, header_title) => {
      state.header_title = header_title;
    },
    login_info: (state, login_info) => {
      state.login_info = login_info;
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
          // console.log(res);
          context.commit('sites', res.data[0]);
        })
      })
    },
    d_site: (context, params) => {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'site/d_site',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data);
        })
      })
    },
    add: (context, params) => {
      return new Promise((resolve, reject) => {
        axios.post( api_url + 'site/add',
          params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
          resolve(res.data[0]);
        })
      })
    },
    update: (context, params) => {
      return new Promise((resolve, reject) => {
        axios.post( api_url + 'site/update',
          params, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
          resolve(res.data[0]);
        })
      })
    },

    login: (context, params) => {
      return new Promise((resolve) => {
        axios({
          method: 'post',
          params: params,
          url: api_url + 'user/login',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data[0]);
        })
      })
    },

    master_info: (context, params) => {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'user/master_info',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data[0][0]);
        })
      })
    },

    master_info_update: (context, params) => {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'user/master_info_update',
          responseType: 'json'
        })
        .then((res) => {
          resolve(res.data[0][0]);
        })
      })
    },

    push_all: (context, params) => {
      return new Promise((resolve) => {
        axios({
          method: 'get',
          params: params,
          url: api_url + 'push/push_all',
          responseType: 'json'
        })
        .then((res) => {
          console.log(res);
        })
      })
    },
  }
})