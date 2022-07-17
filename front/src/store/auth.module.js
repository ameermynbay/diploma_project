import AuthService from '../services/auth.service';
const user = JSON.parse(localStorage.getItem('user'));
export const auth = {
  namespaced: true,
  state() {
    return {
      loggedIn: user != null ? true : false,
      status: 0
    }
  },
  getters: {
    getLogged: (state) => state.loggedIn,
    getStatus: (state) => state.status
  },
  mutations: {
    LOGIN(state, status) {
      state.loggedIn = status;
      state.status = 200;

    },
    loginFailure(state) {
      state.loggedIn = false;
      state.status = 401;
      state.user = null;
    },
    logout(state) {
      state.loggedIn = false;
      this.user = null;
    },
    registerSuccess(state) {
      state.loggedIn = true;
    },
    registerFailure(state) {
      state.loggedIn = false;
    },
    refreshToken(state, accessToken) {
      state.loggedIn = true;
      state.user = { ...state.user, accessToken: accessToken };
    }
  },
  actions: {
    async login({commit}, data) {
      const st = await AuthService.login(data);
      if(st == 200) {
        commit("LOGIN", true);
      } else if (st == 401) {
        commit("loginFailure")
        return;
      }
      //     .then(
      //   response => {
      //     console.log(response)
      //     commit("LOGIN", true);
      //     return Promise.resolve(response);
      //   },
      //   error => {
      //     return Promise.reject(error);
      //   }
      // )
    },
    logout({commit}) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user.email, user.password, user.name, user.date, user.gender).then(
        response => {
          commit('registerSuccess', user);
          return Promise.resolve(response);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    // refreshToken({ commit }, accessToken) {
    //   // commit('refreshToken', accessToken);
    // }
  },
};