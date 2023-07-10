import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated : false,
    token : '',
    user_id_forgot : '',
    code_forgot : '',
    
  },
  getters: {
  },
  mutations: {
    onStart(state) {
      let token = localStorage.getItem("user_email")
      if (token) {
        state.isAuthenticated = true
        state.token = token
      } else {
        state.isAuthenticated = false
        state.token = ''
      }
    },
    // login(state, token) {
    //   if (token) {
    //     localStorage.setItem("token", token)
    //     state.isAuthenticated = true
    //     state.token = token
    //   } else {
    //     localStorage.removeItem("token")
    //     state.isAuthenticated = false
    //     state.token = ''
    //   }
    // },
    // logout(state){
    //   localStorage.removeItem("token")
    //   state.isAuthenticated = false
    //   state.token = ''
    // },
  },
  actions: {
  },
  modules: {
  }
})
