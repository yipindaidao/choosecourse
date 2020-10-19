import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: JSON.parse(localStorage.getItem('user')),
    permission: [],
  },
  mutations: {
    setCurrentUser(state,payload) {
      state.currentUser = payload
      // 清空permisson
      state.permission = []
      localStorage.setItem("user",JSON.stringify(payload))
    },
    setPermission(state,payload) {
      state.permission = payload
    },
    setUserRoutes(state,payload) {
      state.userRoutes = payload
    }
  },
  actions: {
    getPermission(context,payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/api/permission.json').then((res) => {
          var dt = res.data.data
          var ary = dt[payload.role]
          context.commit('setPermission',ary)
          resolve(ary)
        }).catch((error) => {})
      })
    },
    // setLoginUser(context,payload) {
    //   context.commit('setCurrentUser',payload)
    // }
  },
  modules: {
  }
})
