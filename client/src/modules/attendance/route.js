const children = [
  {
    path: 'team',
    name: 'attendance-teams',
    component: () => import('./views/TeamPage'),
  },
  {
    path: 'team/:id',
    name: 'attendance-team',
    component: () => import('./views/TeamSinglePage'),
  },
  {
    path: 'person',
    name: 'attendance-people',
    component: () => import('./views/PersonPage'),
  },
  {
    path: 'person/:id',
    name: 'attendance-person',
    component: () => import('./views/PersonSinglePage'),
  },
  {
    path: 'event/:id',
    name: 'attendance-event',
    component: () => import('./views/EventSinglePage'),
  },
  {
    path: 'manage',
    name: 'attendance-manage',
    component: () => import('./views/ManagePage'),
  },
];

const root = {
  path: '/attendance',
  name: 'attendance',
  component: () => import('./views/Main'),
  children,
};

export default root;
