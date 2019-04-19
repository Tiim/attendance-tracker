import Vue from 'vue';
import Router from 'vue-router';
import attendance from '../modules/attendance/route';
import home from '../modules/home/route';
import login from '../modules/login/route';
import raceResults from '../modules/race-results/route';

Vue.use(Router);

const modules = [home, attendance, login, raceResults];

export default new Router({
  mode: 'history',
  routes: [
    ...modules,
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
