import React, { Component } from 'react'
import { history } from 'umi'

class IndexTable extends Component {
  componentDidMount () {
    history.replace('/list/table-list')
  }

  render () {
    return <div></div>
  }
}

export default IndexTable
