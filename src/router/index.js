import Vue from 'vue';
import Router from 'vue-router';

import appRoutes from './routes'; // 系统所有路由

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: {
      name: 'home',
    },
  },
  ...appRoutes,
];
// console.log(routes);
const rootRouter = new Router({
  mode: 'history',
  routes,
});


// rootRouter.beforeEach((to, from, next) => {
//   // do something before enter
// });

// rootRouter.afterEach(() => {
//   // do something after enter
// });

export default rootRouter;
