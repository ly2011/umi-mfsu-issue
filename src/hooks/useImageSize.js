import { useState, useEffect } from 'react'
/**
 *
 * @example
 * import useImageSize from './useImageSize'
 * export default function App () {
 *  const url = 'https://cdn.int64ago.org/ogk39i54.png'
 *  const [width, height] = useImageSize(url)
 *  return (
 *    <div>
 *      <img src={url} width={100} height={100} alt="" />
 *      <div>Natural size: {width} x {height}</div>
 *    </div>
 *  )
 * }
 */
/**
 * 获取图片的宽高
 * @param {String} url 图片路径
 * @return {Array} size 图片的大小 [width, height]
 */
const useImageSize = url => {
  const [size, setSize] = useState([0, 0])

  useEffect(() => {
    if (!url) return
    const img = document.createElement('img')
    img.addEventListener('load', e => {
      const [naturalHeight, naturalWidth] = e.target
      setSize([naturalWidth, naturalHeight])
    })
    img.src = url
  }, [url])

  return size
}

export default useImageSize
