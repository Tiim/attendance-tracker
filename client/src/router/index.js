import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/Index';
import TeamPage from '@/components/TeamPage';
import TeamSinglePage from '@/components/TeamSinglePage';
import PersonPage from '@/components/PersonPage';
import PersonSinglePage from '@/components/PersonSinglePage';
import NotFoundPage from '@/components/NotFoundPage';

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
      component: TeamPage,
    },
    {
      path: '/team/:id',
      name: 'team',
      component: TeamSinglePage,
    },
    {
      path: '/person',
      name: 'people',
      component: PersonPage,
    },
    {
      path: '/person/:id',
      name: 'person',
      component: PersonSinglePage,
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundPage,
    },
    {
      path: '*',
      redirect: { name: '404' },
    },
  ],
});
