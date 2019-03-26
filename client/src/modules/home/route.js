const children = [];

const root = {
  path: '/',
  name: 'home',
  component: () => import('./views/Main'),
  children,
};

export default root;
