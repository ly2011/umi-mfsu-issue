import React, { useEffect, useMemo } from 'react'
import { connect } from 'dva'
import { history, withRouter } from 'umi'
import { Tabs } from 'antd'
import pathToRegexp from 'path-to-regexp'
import usePrevious from '@/hooks/usePrevious'
import { treeToArray } from 'utils/arrayToTree'
import TabsViewHook from './useTabsView'
import TabsViewAction from './TabsViewAction'

const { TabPane } = Tabs

// eslint-disable-next-line
function searchPathIdAndName(childrenPathname, originalMenuData) {
  function getPathIdAndName (path, menuData, parent) {
    let result
    menuData.forEach(item => {
      // match prefix iteratively
      if (pathToRegexp(`${item.url}(.*)`).test(path)) {
        if (!parent && item.name) {
          result = [item.url, item.name]
        } else if (parent && !parent.component && item.name) {
          // create new tab if item has name and item's parant route has not component
          result = [item.url, item.name]
        }
        // get children pathIdAndName recursively
        if (item.children) {
          result = getPathIdAndName(path, item.children, item) || result
        }
      }
    })
    return result
  }

  return getPathIdAndName(childrenPathname, originalMenuData, null) || ['404', 'Error']
}

const TagsView = ({ menuData, location, children }) => {
  const { tags, activeTagId, setActiveTag: setNextActiveTag, addTag: addNextTag, removeTag: removeNextTag } = TabsViewHook.useContainer()
  const menuList = useMemo(() => treeToArray(menuData), [menuData])
  const prevActiveTagId = usePrevious(activeTagId)

  const setActiveTag = key => {
    // dispatch({
    //   type: 'tabsView/setActiveTag',
    //   payload: key
    // })
    setNextActiveTag(key)
  }

  const addTag = menu => {
    const params = {
      path: menu.url,
      name: menu.name,
      id: menu.id,
      content: menu.content,
      closable: menu.closable
    }
    addNextTag(params)
  }

  // const addTag = menu =>
  //   dispatch({
  //     type: 'tabsView/addTag',
  //     payload: {
  //       path: menu.url,
  //       name: menu.name,
  //       id: menu.id,
  //       content: menu.content,
  //       closable: menu.closable
  //     }
  //   })

  const removeTag = key => {
    // dispatch({
    //   type: 'tabsView/removeTag',
    //   payload: key
    // })
    removeNextTag(key)
  }

  const handleTabSwitch = key => {
    setActiveTag(key)
  }

  const handleTabEdit = (targetKey, action) => {
    if (action === 'remove') {
      removeTag(targetKey)
    }
  }

  useEffect(() => {
    // console.log('pathname  ====> : ', location.pathname)
    if (menuList.length) {
      const menu = menuList.find(item => item.url === location.pathname)
      // console.log('menu: ', menu, location.pathname)
      if (menu) {
        // TODO: 初始化首页(会造成死循环)
        const home = menuList[0]
        addTag({ ...home, content: children, closable: false })
        // 初始化当前页
        // 在store中，重复标签将被忽略
        addTag({ ...menu, content: children, closable: true })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, menuList])

  useEffect(() => {
    // console.log('activeTagId: ', activeTagId, prevActiveTagId)
    // 如果当前标签ID变更，push一个新路径
    if (prevActiveTagId !== activeTagId) {
      const tag = tags.find(item => item.path === activeTagId) || tags[0]
      // console.log('tag: ', tag)
      history.push(tag.path)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTagId, prevActiveTagId])

  return (
    <div>
      <Tabs
        tabBarStyle={{ margin: 0 }}
        onChange={handleTabSwitch}
        activeKey={activeTagId}
        type="editable-card"
        hideAdd
        animated={false}
        onEdit={handleTabEdit}
        tabBarExtraContent={<TabsViewAction />}
      >
        {tags.map(tag => (
          <TabPane tab={tag.name} key={tag.path} closable={tag.closable}>
            {tag.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default withRouter(
  connect(({ auth: { menu: menuData } }) => ({
    menuData
  }))(TagsView)
)
