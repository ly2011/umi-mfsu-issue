const responseJson = data => ({
  code: 0,
  data
})

const userMenu = [
  // {
  //   id: 0,
  //   name: '首页',
  //   enName: 'Home',
  //   icon: 'icon-home',
  //   url: '/'
  // },
  {
    id: 1,
    name: '概览',
    enName: 'Dashboard',
    icon: 'icon-dashboard',
    url: '/dashboard'
  },
  {
    id: 2,
    name: '表单页',
    enName: 'form',
    icon: 'icon-edit-square',
    url: '/forms',
    children: [
      {
        id: 21,
        name: '基础表单',
        enName: 'Basic Form',
        url: '/forms/basic-form'
      },
      {
        id: 22,
        name: '分步表单',
        enName: 'Step Form',
        url: '/forms/step-form'
      },
      {
        id: 23,
        name: '高级表单',
        enName: 'Advanced Form',
        url: '/forms/advanced-form'
      },
      {
        id: 24,
        name: '进阶表单',
        enName: 'Ref Form',
        url: '/forms/ref-form'
      }
    ]
  },
  {
    id: 3,
    name: '列表',
    enName: 'Table',
    icon: 'icon-table',
    url: '/list',
    children: [
      // {
      //   id: 21,
      //   name: '基础列表',
      //   enName: 'Basic Table',
      //   url: '/list/basic'
      // },
      {
        id: 22,
        name: '查询列表',
        enName: 'Search Table',
        url: '/list/table-list'
      },
      {
        id: 23,
        name: '编辑列表',
        enName: 'Edit Table',
        url: '/list/table-edit'
      },
      {
        id: 231,
        name: '批量编辑列表',
        enName: 'Batch Edit Table',
        url: '/list/batch-table-edit'
      },
      {
        id: 24,
        name: '大列表',
        enName: 'Big Table',
        url: '/list/big',
        children: [
          {
            id: 230,
            name: '大列表-1',
            enName: 'Big Table 1',
            url: '/list/big/1'
          },
          {
            id: 231,
            name: '大列表-2',
            enName: 'Big Table 2',
            url: '/list/big/2'
          },
          {
            id: 232,
            name: '大列表-3',
            enName: 'Big Table 3',
            url: '/list/big/3'
          }
        ]
      },
      {
        id: 25,
        name: '可拖曳宽度列表',
        enName: 'Resizable Table',
        url: '/list/resizable-table'
      },
      {
        id: 26,
        name: '搜索列表',
        enName: 'Search',
        url: '/list/search',
        children: [
          {
            id: 260,
            name: '搜索列表(文章)',
            enName: 'Search Articles',
            url: '/list/search/articles'
          }
        ]
      },
      {
        id: 27,
        name: 'Tabs 列表',
        enName: 'TabTable',
        url: '/list/tab-table',
        children: [
          {
            id: 270,
            name: '基础Tab列表',
            enName: 'Basic Tab Table',
            url: '/list/tab-table/basic'
          },
          {
            id: 271,
            name: '基础Tab列表详情',
            enName: 'Basic Tab Table Detail',
            url: '/list/tab-table/detail'
          }
        ]
      },
      {
        id: 28,
        name: '分类表格',
        enName: 'CategoryTable',
        url: '/list/category-table'
      },
      {
        id: 29,
        name: '高级表格',
        enName: 'AdvancedTable',
        url: '/list/advanced-table'
      }
    ]
  },
  {
    id: 4,
    name: '详情页',
    enName: 'profile',
    icon: 'icon-detail',
    url: '/profile',
    children: [
      {
        id: 41,
        name: '基础详情页',
        enName: 'Basic Profile',
        url: '/profile/basic-profile'
      },
      {
        id: 42,
        name: '高级详情页',
        enName: 'Advanced Profile',
        url: '/profile/advanced-profile'
      }
    ]
  },
  {
    id: 4,
    name: '图表',
    enName: 'chart',
    icon: 'icon-piechart',
    url: '/chart',
    children: [{ id: 41, name: '柱状图', enName: 'bar chart', url: '/chart/bar' }]
  },
  {
    id: 5,
    name: '异常页',
    enName: 'exception',
    icon: 'icon-warning-circle',
    url: '/exception',
    children: [
      {
        id: 51,
        name: '403',
        enName: '403',
        url: '/exception/403'
      },
      {
        id: 52,
        name: '404',
        enName: '404',
        url: '/exception/404'
      },
      {
        id: 53,
        name: '500',
        enName: '500',
        url: '/exception/500'
      }
    ]
  },
  {
    id: 6,
    name: '富文本编辑器',
    enName: 'rich text',
    icon: 'icon-highlight',
    url: '/editor',
    children: [
      {
        id: 61,
        name: 'braft',
        enName: 'braft',
        url: '/editor/braft'
      }
    ]
  },
  {
    id: 7,
    name: '其他',
    enName: 'other',
    icon: 'icon-eye',
    url: '/other',
    children: [
      {
        id: 71,
        name: '图片预览',
        enName: 'image',
        url: '/other/image'
      },
      {
        id: 72,
        name: '个人信息表',
        enName: 'personalInfo',
        url: '/other/personal-info'
      }
    ]
  },
  {
    id: 8,
    name: 'Hooks',
    enName: 'Hooks',
    icon: 'icon-piechart',
    url: '/hooks',
    children: [
      { id: 81, name: 'useModal', enName: 'useModal', url: '/hooks/modal' },
      { id: 82, name: 'useForm', enName: 'useForm', url: '/hooks/form' },
      { id: 83, name: 'useModalForm', enName: 'useModalForm', url: '/hooks/modal-form' },
      { id: 84, name: 'useSearchResult', enName: 'useSearchResult', url: '/hooks/search-result' }
    ]
  }
]
export const userObj = {
  code: 0,
  data: userMenu
}
export default {
  // 支持值为 Object 和 Array
  'GET /api/menu/:usreName': (req, res) => {
    setTimeout(() => {
      res.send(responseJson(userMenu))
    }, 100)
  },
  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    res.end('OK')
  }
}
