import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/views/Index';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/team',
      name: 'teams',
      component: () =>
        import(/* webpackChunkName: "teams" */ '@/views/TeamPage'),
    },
    {
      path: '/team/:id',
      name: 'team',
      component: () =>
        import(/* webpackChunkName: "team" */ '@/views/TeamSinglePage'),
    },
    {
      path: '/person',
      name: 'people',
      component: () =>
        import(/* webpackChunkName: "people" */ '@/views/PersonPage'),
    },
    {
      path: '/person/:id',
      name: 'person',
      component: () =>
        import(/* webpackChunkName: "person" */ '@/views/PersonSinglePage'),
    },
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
