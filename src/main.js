import Vue from 'vue';
import VueHead from 'vue-head';

import './styles/app.less';
import './utils/ui';
import './utils/error';
import App from './App';
import router from './router';
import store from './store';
import { DEBUG } from './config';

Vue.config.productionTip = DEBUG;

Vue.use(VueHead);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
