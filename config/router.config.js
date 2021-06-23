export default [
  // app
  {
    path: '/',
    component: '../layouts',
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'icon-dashboard',
        component: './Chart/Bar'
      },
      // list
      {
        path: '/list',
        icon: 'icon-table',
        name: 'list',
        routes: [
          {
            path: '/list/',
            name: 'indexTable',
            component: './List/index'
          },
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList'
          },
          {
            path: '/list/big/1',
            name: 'bigtable1',
            component: './List/BigTable'
          },
        ]
      },
    ]
  }
]
