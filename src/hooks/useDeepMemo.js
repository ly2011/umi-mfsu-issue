import { useRef } from 'react'
import isEqual from 'lodash/isEqual'

/**
 * @example
 * import useDeepMemo from './useDeepMemo'
 * const userDeep = useDeepMemo(() => user. [user])
 */

/**
 * 缓存函数执行结果，根据deps来决定是否重新计算，更新缓存
 * @param {Function} memoFn 需要缓存的函数
 * @param {Array | String} deps 更新函数结果的依赖，类型任意
 */
const useDeepMemo = (memoFn, deps) => {
  const ref = useRef()

  // NOTE: 首次调用，或再次调用深度比较 current.deps 与当前 deps 是否一致，不一致，则发起请求
  if (!ref.current || !isEqual(deps, ref.current.deps)) {
    ref.current = { deps, value: memoFn }
  }

  return ref.current.value
}

export default useDeepMemo
