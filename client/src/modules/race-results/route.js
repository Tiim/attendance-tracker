const children = [
  {
    path: 'race-results/add',
    name: 'race-results-add',
    component: () => import('./views/Add'),
  },
];

const root = {
  path: '/race-results',
  name: 'race-results',
  component: () => import('./views/Main'),
  children,
};

export default root;
