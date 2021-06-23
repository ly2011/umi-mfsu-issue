import { useState, useEffect } from 'react'

/**
 * 查询列表
 * @param {Object} config
 */
const useSearchResult = ({ search, autoFirstSearch = true, defaultRequestData }) => {
  const [requestData, setRequestData] = useState()
  const [responseData, setResponseData] = useState()
  const [loading, setLoading] = useState(false)
  const [defaultRequestDataLoading, setDefaultRequestDataLoading] = useState(false)

  const searchFunc = data => {
    setRequestData(data)
    setLoading(true)
    return Promise.resolve(search && search(data))
      .then(response => {
        setResponseData(response)
        setLoading(false)
      })
      .catch(err => {
        console.log('searchFunc: ', err)
        setLoading(false)
      })
  }

  useEffect(() => {
    setDefaultRequestDataLoading(true)
    let value
    if (typeof defaultRequestData === 'function') {
      value = defaultRequestData()
    } else {
      value = defaultRequestData
    }
    Promise.resolve(value)
      .then(data => {
        setRequestData(data)
        setDefaultRequestDataLoading(false)
        if (autoFirstSearch) {
          searchFunc(data)
        }
      })
      .catch(err => {
        console.log('err: ', err)
        setDefaultRequestDataLoading(false)
      })
  }, [])

  return {
    loading,
    requestData,
    setRequestData,
    responseData,
    defaultRequestDataLoading,
    search: searchFunc
  }
}

export default useSearchResult
