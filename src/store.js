import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const rootStore = new Vuex.Store({
  state: {
    loading: false,
    types: {
      picture: {
        color: '#314855',
        text: '图片',
      },
      ebook: {
        color: '#00B2CA',
        text: '电子书',
      },
      literature: {
        color: '#FF7F11',
        text: '文献',
      },
      language: {
        color: '#79ceb8',
        text: '语言',
      },
      tool: {
        color: '#AB81CD',
        text: '工具',
      },
      resource: {
        color: '#73EEDC',
        text: '资源',
      },
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});


// 初始化 rootStore
// ;(initialStore() {
//   // rootStore.commit('{MUTATION_NAME}');
//   // rootStore.dispatch('{ACTION_NAME}');
// })()

export default rootStore;
