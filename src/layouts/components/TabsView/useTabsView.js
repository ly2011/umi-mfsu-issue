import { useReducer } from 'react'
import { createContainer } from 'unstated-next'

const reducer = (state, action) => {
  switch (action.type) {
    case 'setActiveTag':
      return { ...state, activeTagId: action.payload }
    case 'addTag': {
      const { tags } = state
      const nextTag = action.payload
      const prevTag = tags.find(tag => tag.path === nextTag.path)
      if (!prevTag) tags.push(nextTag)
      return { ...state, tags, activeTagId: nextTag.path }
    }
    case 'removeTag': {
      const { tags, activeTagId } = state
      const targetKey = action.payload
      let nextActiveTagId = activeTagId
      // 首页不能被关闭
      if (targetKey === tags[0].path) {
        return { ...state }
      }
      let lastIndex = 0
      tags.forEach((tag, index) => {
        if (tag.path === targetKey) {
          lastIndex = index - 1
        }
      })
      const nextTags = tags.filter(tag => tag.path !== targetKey)
      if (nextTags.length && nextActiveTagId === targetKey) {
        if (lastIndex >= 0) {
          nextActiveTagId = nextTags[lastIndex].path
        } else {
          nextActiveTagId = nextTags[0].path
        }
      }
      return { ...state, tags: nextTags, activeTagId: nextActiveTagId }
    }
    case 'removeAllTag': {
      const { tags } = state
      const params = {
        tags: [tags[0]],
        activeTagId: tags[0].path
      }
      return { ...state, ...params }
    }
    case 'removeOtherTag': {
      const { tags, activeTagId } = state
      const activeTag = tags.find(tag => tag.path === activeTagId)
      const activeIsHome = activeTag.path === tags[0].path
      const nextTags = activeIsHome ? [tags[0]] : [tags[0], activeTag]
      return { ...state, tags: nextTags }
    }
    default:
      return { ...state }
  }
}
const useTabsView = () => {
  // const [tags, setTags] = useState([])
  // const [activeTagId, setActiveTagId] = useState('')

  // const setActiveTag = key => {
  //   setActiveTagId(key)
  // }

  // const addTag = nextTag => {
  //   console.log('tags: ', tags)
  //   const prevTag = tags.find(tag => tag.path === nextTag.path)
  //   const nextTags = [...tags]
  //   if (!prevTag) nextTags.push(nextTag)
  //   setTags(nextTags)
  //   setActiveTagId(nextTag.path)
  // }

  const [state, dispatch] = useReducer(reducer, { tags: [], action: '' })
  const setActiveTag = payload => dispatch({ type: 'setActiveTag', payload })
  const addTag = payload => dispatch({ type: 'addTag', payload })
  const removeTag = payload => dispatch({ type: 'removeTag', payload })
  const removeAllTag = () => dispatch({ type: 'removeAllTag' })
  const removeOtherTag = () => dispatch({ type: 'removeOtherTag' })
  return {
    tags: state.tags,
    activeTagId: state.activeTagId,
    setActiveTag,
    addTag,
    removeTag,
    removeAllTag,
    removeOtherTag
  }
}

// export default useTabsView
export default createContainer(useTabsView)
