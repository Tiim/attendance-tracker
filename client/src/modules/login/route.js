const children = [];

const root = {
  path: '/login',
  name: 'login',
  component: () => import('./views/Main'),
  children,
};

export default root;
