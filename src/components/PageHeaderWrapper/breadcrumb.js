import React from 'react'
import pathToRegexp from 'path-to-regexp'
import { Link } from 'umi'
import { urlToList } from 'utils/pathTools'

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender = (route, params, routes, paths) => {
  const last = routes.indexOf(route) === routes.length - 1
  // console.log('itemRender - paths: ', paths[paths.length - 1])
  let curPath = paths[paths.length - 1] || ''
  curPath = curPath && curPath.startsWith('/') ? curPath : `/${curPath}`
  return last && curPath ? <span>{route.breadcrumbName}</span> : <Link to={curPath}>{route.breadcrumbName}</Link>
}

export const getBreadcrumb = (breadcrumbNameMap, url) => {
  let breadcrumb = breadcrumbNameMap[url]
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(item => {
      if (pathToRegexp(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item]
      }
    })
  }
  return breadcrumb || {}
}

const conversionFromLocation = (location, breadcrumbNameMap, props) => {
  const { home } = props
  // Convert the url to an array
  const pathSnippets = urlToList(location.pathname)
  // console.log('pathSnippets => ', pathSnippets)
  // Loop data mosaic routing
  const extraBreadcrumbItems = pathSnippets
    .map(url => {
      const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url)
      if (currentBreadcrumb.inherited) {
        return null
      }
      const { name } = currentBreadcrumb
      const { hideInBreadcrumb } = currentBreadcrumb
      return name && !hideInBreadcrumb
        ? {
            path: url,
            breadcrumbName: name
          }
        : null
    })
    .filter(item => item !== null)
  // Add home breadcrumbs to your head if defined
  if (home) {
    extraBreadcrumbItems.unshift({
      path: '/',
      breadcrumbName: home
    })
  }
  // console.log('extraBreadcrumbItems: ', extraBreadcrumbItems);
  return extraBreadcrumbItems
}
/**
 * 将参数转化为面包屑
 * @param {Object} props
 */
export const conversionBreadcrumbList = props => {
  const { breadcrumbNameMap, location } = props
  // 根据 location 生成 面包屑
  // Generate breadcrumbs based on location
  if (location && location.pathname) {
    return {
      routes: conversionFromLocation(location, breadcrumbNameMap, props),
      itemRender
    }
  }
  return {}
}
