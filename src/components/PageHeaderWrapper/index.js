import React from 'react'
import { PageHeader, Tabs } from 'antd'
import { connect } from 'dva'
import classNames from 'classnames'
import { conversionBreadcrumbList } from './breadcrumb'
import styles from './index.less'

const PageHeaderWrapper = props => {
  const { children, wrapperClassName } = props

  const renderPageHeader = (content, extraContent) => {
    if (!content && !extraContent) {
      return null
    }
    return (
      <div className={styles.detail}>
        <div className={styles.main}>
          <div className={styles.row}>
            {content && <div className={styles.content}>{content}</div>}
            {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
          </div>
        </div>
      </div>
    )
  }

  const renderFooter = ({ tabList, tabActiveKey, onTabChange, tabBarExtraContent }) =>
    (tabList && tabList.length ? (
      <Tabs
        className={styles.tabs}
        activeKey={tabActiveKey}
        onChange={key => {
          if (onTabChange) {
            onTabChange(key)
          }
        }}
        tabBarExtraContent={tabBarExtraContent}
      >
        {tabList.map(item => (
          <Tabs.TabPane tab={item.tab} key={item.key}></Tabs.TabPane>
        ))}
      </Tabs>
    ) : null)

  const defaultPageHeaderRender = () => {
    const { title, content, pageHeaderRender, breadcrumb, showBreadcrumb = true, extraContent, ...restProps } = props
    if (pageHeaderRender) {
      return pageHeaderRender(props)
    }
    // const pageHeaderTitle = title
    let pageHeaderBreadcrumb = null
    if (showBreadcrumb) {
      pageHeaderBreadcrumb =
        breadcrumb ||
        conversionBreadcrumbList({
          ...restProps,
          home: <span>首页</span>
        })
    }
    return (
      <PageHeader
        ghost={false}
        title={false}
        {...restProps}
        breadcrumb={pageHeaderBreadcrumb}
        className={styles.pageHeader}
        footer={renderFooter(restProps)}
      >
        {renderPageHeader(content, extraContent)}
      </PageHeader>
    )
  }

  return (
    // <div style={{ margin: '-24px -24px 0' }} className={classNames(wrapperClassName, styles.main)}>
    <div className={classNames(wrapperClassName, styles.main)}>
      {defaultPageHeaderRender()}
      {children ? <div className={styles['children-content']}>{children}</div> : null}
    </div>
  )
}
export default connect(({ auth }) => ({
  menu: auth.menu,
  breadcrumbNameMap: auth.breadcrumbNameMap
}))(PageHeaderWrapper)
