const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home/Home'); // 首页
const Admin = () => import(/* webpackChunkName: "admin" */ '@/views/Admin/Admin'); // 数据录入
const NotFound = () => import(/* webpackChunkName: "404" */ '@/views/NotFound/NotFound'); // 404

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
  },
  // 404 路由永远在最后
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];
