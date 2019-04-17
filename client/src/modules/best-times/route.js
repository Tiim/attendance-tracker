const children = [
  {
    path: 'best-times/add',
    name: 'best-tiems-add',
    component: () => import('./views/Add'),
  },
];

const root = {
  path: '/best-times',
  name: 'best-times',
  component: () => import('./views/Main'),
  children,
};

export default root;
