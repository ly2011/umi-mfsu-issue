module.exports = {
  navTheme: 'light', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  menu: {
    disableLocal: false
  },
  layoutHeaderHeight: '40px',
  title: 'Lady',
  pwa: false,
  menuIdField: 'id',
  menuCodeField: 'menuCode',
  menuUrlField: 'menuPath',
  menuNameField: 'menuName',
  menuIconField: 'menuIcon',
  cardPaddingBase: '10px',
  tabsHorizontalPaddingRight: '5px',
  modalBodyPaddingRight: '5px',
  goldColor: '#faad14',
  errorColor: '#f5222d',
  successColor: '#52c41a',
  blue5Color: '#40a9ff',
  yellow5Color: '#ffec3d',
  // Your custom iconfont Symbol script Url
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: '//at.alicdn.com/t/font_1432792_0aj86r5jai3.js'
}
