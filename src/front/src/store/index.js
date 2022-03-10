import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'; //axios 호출

import OauthService from "@/services/oauth.service.js";

import Jwt from "@/common/jwt";

Vue.use(Vuex)
Vue.prototype.$axios = axios; //전역변수로 설정 컴포넌트에서 this.$axios 호출할 수 있음

const store = new Vuex.Store({
  state: {
    token: '',  // acdess token
    refreshToken: '',  // refresh token
    userId: null,
    email: null,
    isAuthenticated: !!Jwt.getAccessToken(), // 인증여부
    overlayShow: false
  },
  mutations: {
    LOGIN: function (state, data) {
      state.token = data.token
      state.userId = data.userId
      state.email = data.email
      state.isAuthenticated = true
      Jwt.saveAccessToken(data.token)
      Jwt.saveRefreshToken(data.token)
    },
    LOGOUT: function (state) {
      state.token = null
      state.userId = null
      state.email = null
      state.isAuthenticated = false
      Jwt.destroyAccessToken()
    },
    startSpinner(state){
      state.overlayShow = true
    },
    endSpinner(state){
      state.overlayShow = false
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    },
  },
  actions: {
    LOGIN({ commit }, { email, password }) {
      return OauthService.login({
        email: email,
        password: password
      }).then(
        response => {
          commit("LOGIN", {
            token: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            userId: response.data.userId,
            email: email
          });
          return response;
        },
        error => {
          return error.response;
        }
      )
    },
    LOGOUT({ commit }) {
      commit("LOGOUT");
      return true;
    },
      
  },
  modules: {
    
  }

})

export default store;

