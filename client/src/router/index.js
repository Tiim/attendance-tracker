import Vue from 'vue';
import Router from 'vue-router';
import attendance from '../modules/attendance/route';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    attendance,
    {
      path: '/404',
      name: '404',
      component: () =>
        import(/* webpackChunkName: "404" */ '@/views/NotFoundPage'),
    },
    {
      path: '*',
      redirect: { name: '404' },
    },
  ],
});
