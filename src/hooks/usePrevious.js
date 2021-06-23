import { useRef, useEffect } from 'react'

/**
 * 获取前一个值
 * @param {*} value
 */
export default function usePrevious (value) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
