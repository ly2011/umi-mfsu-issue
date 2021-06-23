# SearchForm


## 使用

```js
import SearchForm from 'components/QueryForm/SearchForm'
import { searchConfig } from './config'

class BasicTable extends React.Component {
  handleSearch = value => {
    console.log(value)
  }

  render () {
    return <SearchForm searchConfig={searchConfig} onSubmit={this.handleSearch} />
  }
}
```