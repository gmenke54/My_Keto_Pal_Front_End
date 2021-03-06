import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: '',
    isAuthenticated: false,
    profile: null,
    user: {
      id: null,
      email: null
    },
    day: null,
    dispLabel: false,
    food: {
      days: [],
      name: 'Hover over a food to see details',
      weight: 0.0,
      carbs: 0.0,
      calories: 0.0,
      fat: 0.0,
      protein: 0.0,
      sugar: 0.0,
      fiber: 0.0,
      saturated: 0.0,
      trans: 0.0,
      chol: 0.0,
      sodium: 0.0,
      added_sugar: 0.0,
      chol_dv: 0.0,
      sodium_dv: 0.0
    },
    curCarbs: 0.0,
    curSugar: 0.0,
    curFat: 0.0,
    allDays: null,
    feed: [],
    decimals: 0
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token');
        state.isAuthenticated = true;
      } else {
        state.token = '';
        state.isAuthenticated = false;
      }
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.isAuthenticated = false;
      state.token = '';
      console.log('removing token');
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setProfile(state, payload) {
      state.profile = payload;
    },
    setDay(state, payload) {
      state.day = payload;
    },
    setFood(state, payload) {
      state.food = payload;
    },
    setDispLabel(state, payload) {
      state.dispLabel = payload;
    },
    setCurCarbs(state, payload) {
      state.curCarbs = payload;
    },
    setCurSugar(state, payload) {
      state.curSugar = payload;
    },
    setCurFat(state, payload) {
      state.curFat = payload;
    },
    setAllDays(state, payload) {
      state.allDays = payload;
    },
    setFeed(state, payload) {
      state.feed = payload;
    },
    setDecimals(state, payload) {
      state.decimals = payload;
    }
  },
  actions: {
    async setUserId(state) {
      try {
        const res = await axios.get('api/v1/users/');
        const curUser = {
          id: res.data[0].id,
          email: res.data[0].email
        };
        state.commit('setUser', curUser);
      } catch {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = '';
        state.commit('removeToken');
      }
      const resp = await axios.get(`/profiles/${this.state.user.id}`);
      state.commit('setProfile', resp.data);
    },
    // async setProfile(state){
    //   const resp = await axios.get(`/profiles/${this.state.user.id}`);
    //   state.commit('setProfile', resp.data);
    // },
    async getFeed(state) {
      const posts = await axios.get('/posts');
      let newArr = posts.data.reverse();
      state.commit('setFeed', newArr);
    }
  },
  modules: {}
});
