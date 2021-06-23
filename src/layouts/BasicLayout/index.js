import React from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import Media from 'react-media'
import DocumentTitle from 'react-document-title'
import logo from 'assets/logo.svg'
import SiderMenu from 'components/SiderMenu'
import getPageTitle from 'utils/getPageTitle'
import { layoutHeaderHeight } from '@/defaultSettings'
import HeaderLayout from './header'
import TabsViewHook from '../components/TabsView/useTabsView'
import TabsView from '../components/TabsView'
import styles from './index.less'

const { Content } = Layout

const BasicLayout = props => {
  const {
    dispatch,
    children,
    location: { pathname },
    menu,
    breadcrumbNameMap,
    isMobile = false,
    fixedHeader = false
  } = props

  const contentStyle = !fixedHeader ? { paddingTop: 0 } : {}
  const getLayoutStyle = () => null

  const handleMenuCollapse = payload => {
    dispatch &&
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload
      })
  }

  const layout = (
    <Layout className={styles['layout-page']}>
      <HeaderLayout menu={menu} logo={logo} isMobile={isMobile} handleMenuCollapse={handleMenuCollapse} {...props} />
      <Layout style={{ ...getLayoutStyle(), minHeight: `calc(100vh - ${layoutHeaderHeight})` }}>
        <SiderMenu logo={logo} theme="light" onCollapse={handleMenuCollapse} menu={menu} isMobile={isMobile} {...props} />
        <Content className={styles['layout-page-content']} style={contentStyle}>
          <TabsViewHook.Provider>
            <TabsView menuData={menu} isMobile={isMobile} collapsed={props.collapsed}></TabsView>
            <div>{children}</div>
          </TabsViewHook.Provider>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>我就是传说中的尾巴</Footer> */}
      </Layout>
    </Layout>
  )

  return (
    <>
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>{layout}</DocumentTitle>
    </>
  )
}

export default connect(({ auth, global }) => ({
  menu: auth.menu,
  breadcrumbNameMap: auth.breadcrumbNameMap,
  collapsed: global.collapsed
}))(props => <Media query="(max-width: 599px)">{isMobile => <BasicLayout {...props} isMobile={isMobile} />}</Media>)
